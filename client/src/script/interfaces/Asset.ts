import { formatPrice } from "../utils/formatPrice";
import { Address, getAddressById } from "./Address";
import { getUserById, User } from "./User";

export interface Asset {
  _id: string;
  asset_id: string;
  asset_code: string;
  asset_name: string;
  specifications: string;
  year_of_use: number;
  quantity: number;
  unit_price: number;
  origin_price: number;
  real_count: number;
  depreciation_rate: number;
  remaining_value: number;
  location: string;
  responsible_user: string;
  suggested_disposal: string;
  note: string;
  __v: string;
  history: number;
  unit_price_formatted: string;
  origin_price_formatted: string;
  remaining_value_formatted: string;
  responsible_user_name: string;
  responsible_user_userid: string;
  location_code: string;
}

export type AssetRequest = Omit<
  Asset,
  | "unit_price_formatted"
  | "origin_price_formatted"
  | "remaining_value_formatted"
  | "responsible_user_name"
  | "responsible_user_userid"
  | "location_code"
>;

const HANDLE_ASSET_URL = import.meta.env.VITE_API_URL + "/asset";

export async function getAssetList(
  token: string,
  userList: User[],
  addressList: Address[]
) {
  const res = await fetch(`${HANDLE_ASSET_URL}`, {
    headers: { token: `Bearer ${token}` },
  });
  const data: Asset[] = await res.json();
  data.forEach((asset) => {
    asset.unit_price_formatted = formatPrice(asset.unit_price);
    asset.origin_price_formatted = formatPrice(asset.origin_price);
    asset.remaining_value_formatted = formatPrice(asset.remaining_value);
    asset.responsible_user_name =
      userList.find((user) => user._id === asset.responsible_user)?.name ||
      "N/A";
    asset.location_code =
      addressList.find((address) => address._id === asset.location)?.room_id ||
      "N/A";
  });
  console.log(data);
  return data;
}

export async function getAssetById(id: string, token: string) {
  const res = await fetch(`${HANDLE_ASSET_URL}/${id}`, {
    headers: { token: `Bearer ${token}` },
  });
  const data = await res.json();
  data.unit_price_formatted = formatPrice(data.unit_price);
  data.origin_price_formatted = formatPrice(data.origin_price);
  data.remaining_value_formatted = formatPrice(data.remaining_value);

  const responsible_user = await getUserById(data.responsible_user, token);
  data.responsible_user_name = responsible_user.name;
  data.responsible_user_userid = responsible_user.userid;
  const address = await getAddressById(data.location, token);
  data.location_name = address.room_id;
  console.log(data);
  return data;
}

export async function createAsset(asset: AssetRequest, token: string) {
  try {
    const requestInit: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
      body: JSON.stringify(asset),
    };
    const res = await fetch(`${HANDLE_ASSET_URL}`, requestInit);
    const data = await res.json();
    console.log(data);
    return res.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateAsset(
  id: string,
  asset: AssetRequest,
  token: string
) {
  try {
    const requestInit: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
      body: JSON.stringify(asset),
    };
    const res = await fetch(`${HANDLE_ASSET_URL}/${id}`, requestInit);
    const data = await res.json();
    console.log(data);
    return res.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteAsset(id: string, token: string) {
  try {
    const requestInit: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    };
    const res = await fetch(`${HANDLE_ASSET_URL}/${id}`, requestInit);
    const data = await res.json();
    console.log(data);
    return res.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
}
