import "../../../css/InfoPage.css";
import { useState } from "react";
import { Asset, AssetRequest, createAsset } from "../../interfaces/Asset";
import { useMainRef, useScrollToMain } from "../../context/MainRefContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUserList, User } from "../../interfaces/User";
import { Address, getAddressList } from "../../interfaces/Address";
import { useQuery } from "@tanstack/react-query";
import { FaAngleLeft } from "react-icons/fa";
import Loader from "../../components/Loader";
import { convertToNumber, formatPrice } from "../../utils/formatPrice";

const CreateAssetPage = () => {
  const [formData, setFormData] = useState<Asset>({} as Asset);
  const { refreshAccessToken, accessToken } = useAuth();
  const ICON_SIZE = 20;

  const navigate = useNavigate();
  const mainRef = useMainRef();
  useScrollToMain();

  const { data: userList, isLoading: isLoadingUserList } = useQuery({
    queryFn: async () => {
      let token = accessToken;
      if (!token) {
        token = await refreshAccessToken();
        if (!token) {
          throw new Error("Unable to refresh access token");
        }
      }
      return getUserList(token);
    },
    queryKey: ["userList"],
  });

  const { data: addressList, isLoading: isLoadingAddressList } = useQuery({
    queryFn: async () => {
      let token = accessToken;
      if (!token) {
        token = await refreshAccessToken();
        if (!token) {
          throw new Error("Unable to refresh access token");
        }
      }
      return getAddressList(token, userList as User[]);
    },
    queryKey: ["addressList", userList],
    enabled: !!userList && userList.length > 0,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name } = e.target;
    const value =
      typeof e.target.value === "number"
        ? Number(e.target.value)
        : e.target.value;
    if (e.target.className.includes("input-price")) {
      const price = convertToNumber(value as string);

      setFormData((prevState) => ({
        ...prevState,
        [name]: price,
        [name + "_formatted"]: formatPrice(price),
      }));
    } else setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.name === "responsible_user") {
      if (typeof userList === "undefined") return;
      const { name, _id } = userList.find(
        (user) => user._id === e.target.value
      ) as User;
      setFormData((prevState) => ({
        ...prevState,
        responsible_user: _id,
        responsible_user_name: name,
      }));
    } else if (e.target.name === "location") {
      if (typeof addressList === "undefined") return;
      const { room_id, _id } = addressList.find(
        (address) => address._id === e.target.value
      ) as Address;
      setFormData((prevState) => ({
        ...prevState,
        location: _id,
        location_code: room_id,
      }));
    }
  }

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    let token = accessToken;
    if (!token) {
      token = await refreshAccessToken();
      if (!token) {
        throw new Error("Unable to refresh access token");
      }
    }

    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      unit_price_formatted,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      origin_price_formatted,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      remaining_value_formatted,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      responsible_user_name,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      responsible_user_userid,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      location_code,
      ...filteredData
    } = formData;
    const assetRequest = { ...filteredData } as AssetRequest;
    console.log(assetRequest);
    const result = await createAsset(assetRequest, token);
    if (result) {
      console.log("created address successfully");
      navigate("/asset-dashboard");
    } else console.log("failed to create address");
  }

  return (
    <main ref={mainRef} className="info-page">
      <div className="container">
        <div className="layout">
          <div
            className="back-button"
            onClick={() => navigate("/asset-dashboard")}
          >
            <FaAngleLeft size={ICON_SIZE} />
            <p>Trở về</p>
          </div>
          <h1 className="title">Tạo Tài Sản Mới</h1>
          {isLoadingUserList || isLoadingAddressList ? (
            <Loader />
          ) : (
            <form className="info-body">
              <div className="long-info">
                <div className="info-header">Tên tài sản: </div>
                <input
                  type="text"
                  name="asset_name"
                  value={formData.asset_name}
                  onChange={handleChange}
                />
              </div>
              <div className="long-info">
                <div className="info-header">Mã tài sản: </div>
                <input
                  type="text"
                  name="asset_code"
                  value={formData.asset_code}
                  onChange={handleChange}
                />
              </div>
              <div className="normal-info">
                <div className="info-container">
                  <div className="info-header">Năm sử dụng:</div>
                  <input
                    type="number"
                    name="year_of_use"
                    value={formData.year_of_use}
                    onChange={handleChange}
                  />
                </div>
                <div className="info-container">
                  <div className="info-header">Số lượng:</div>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div className="info-container">
                  <div className="info-header">Đơn giá (đơn vị: VNĐ):</div>
                  <input
                    type="text"
                    name="unit_price"
                    className="input-price"
                    value={formData.unit_price_formatted}
                    onChange={handleChange}
                  />
                </div>
                <div className="info-container">
                  <div className="info-header">Nguyên giá (đơn vị: VNĐ):</div>
                  <input
                    type="text"
                    name="origin_price"
                    className="input-price"
                    value={formData.origin_price_formatted}
                    onChange={handleChange}
                  />
                </div>
                <div className="info-container">
                  <div className="info-header">Số lượng thực tế:</div>
                  <input
                    type="number"
                    name="real_count"
                    value={formData.real_count}
                    onChange={handleChange}
                  />
                </div>
                <div className="info-container">
                  <div className="info-header">
                    Phần trăm hao mòn (đơn vị: %):
                  </div>
                  <input
                    type="number"
                    name="depreciation_rate"
                    value={formData.depreciation_rate}
                    onChange={handleChange}
                  />
                </div>
                <div className="info-container">
                  <div className="info-header">
                    Nguyên giá còn lại (đơn vị: VNĐ):
                  </div>
                  <input
                    type="text"
                    name="remaining_value"
                    className="input-price"
                    value={formData.remaining_value_formatted}
                    onChange={handleChange}
                  />
                </div>
                <div className="info-container">
                  <div className="info-header">Đề nghị thanh lý:</div>
                  <input
                    type="suggested_disposal"
                    name="position"
                    value={formData.suggested_disposal}
                    onChange={handleChange}
                  />
                </div>
                <div className="info-container">
                  <div className="info-header">Địa chỉ phòng: </div>
                  <select
                    id="dropdown"
                    name="location"
                    onChange={handleSelect}
                    aria-placeholder="Chọn địa chỉ phòng"
                  >
                    {addressList?.map((address) => (
                      <option value={address._id}>{address.room_id}</option>
                    ))}
                  </select>
                </div>
                <div className="info-container">
                  <div className="info-header">Người chịu trách nhiệm: </div>
                  <select
                    id="dropdown"
                    name="responsible_user"
                    onChange={handleSelect}
                    aria-placeholder="Chọn người chịu trách nhiệm"
                  >
                    {userList?.map((user) => (
                      <option
                        value={user._id}
                      >{`${user.name} - ${user.userid}`}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="long-info">
                <div className="info-header">Quy cách, đặc điểm tài sản: </div>
                <textarea
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleChange}
                />
              </div>
              <div className="long-info">
                <div className="info-header">Ghi chú: </div>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                />
              </div>
              <div className="button-container">
                <button className="submit-btn" onClick={handleSubmit}>
                  Tạo tài sản
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default CreateAssetPage;
