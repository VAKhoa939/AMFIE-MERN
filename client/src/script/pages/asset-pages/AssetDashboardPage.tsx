import "../../../css/DashboardPage.css";
import { getAssetList } from "../../interfaces/Asset";
import { useQuery } from "@tanstack/react-query";
import { useMainRef, useScrollToMain } from "../../context/MainRefContext";
import Table from "../../components/Table";
import { assetTableColumns } from "../../utils/tableColumns";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/AuthContext";
import { getUserList, User } from "../../interfaces/User";
import { Address, getAddressList } from "../../interfaces/Address";

const AssetDashboardPage = () => {
  const mainRef = useMainRef();
  const { refreshAccessToken, accessToken } = useAuth();
  useScrollToMain();

  const { data: userList, isLoading: isLoadingUser } = useQuery({
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

  const { data: addressList, isLoading: isLoadingAddress } = useQuery({
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

  const { data: assetList, isLoading: isLoadingAsset } = useQuery({
    queryFn: async () => {
      let token = accessToken;
      if (!token) {
        token = await refreshAccessToken();
        if (!token) {
          throw new Error("Unable to refresh access token");
        }
      }
      return getAssetList(token, userList as User[], addressList as Address[]);
    },
    queryKey: ["assetList", addressList],
    enabled: !!addressList && addressList.length > 0,
  });

  return (
    <main className="dashboard-page" ref={mainRef}>
      <div className="title">Danh Sách Tài Sản</div>
      {isLoadingAsset ||
      isLoadingAddress ||
      isLoadingUser ||
      typeof assetList === "undefined" ? (
        <Loader />
      ) : (
        <Table
          data={assetList}
          columns={assetTableColumns}
          baseURL="/asset-dashboard"
        />
      )}
    </main>
  );
};

export default AssetDashboardPage;
