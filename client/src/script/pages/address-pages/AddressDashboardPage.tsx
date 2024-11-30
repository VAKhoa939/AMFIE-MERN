import "../../../css/DashboardPage.css";
import { useQuery } from "@tanstack/react-query";
import { useMainRef, useScrollToMain } from "../../context/MainRefContext";
import Table from "../../components/Table";
import { addressTableColumns } from "../../utils/tableColumns";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/AuthContext";
import { getAddressList } from "../../interfaces/Address";
import { getUserList, User } from "../../interfaces/User";

const AddressDashboardPage = () => {
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

  return (
    <main className="dashboard-page" ref={mainRef}>
      <div className="title">Danh Sách Địa Chỉ Phòng</div>
      {isLoadingUser ||
      isLoadingAddress ||
      typeof addressList === "undefined" ? (
        <Loader />
      ) : (
        <Table
          data={addressList}
          columns={addressTableColumns}
          baseURL="/address-dashboard"
        />
      )}
    </main>
  );
};

export default AddressDashboardPage;
