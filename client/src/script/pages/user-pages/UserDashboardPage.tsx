import Table from "../../components/Table";
import "../../../css/DashboardPage.css";
import { useQuery } from "@tanstack/react-query";
import { useMainRef, useScrollToMain } from "../../context/MainRefContext";
import { getUserList } from "../../interfaces/User";
import { userTableColumns } from "../../utils/tableColumns";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/AuthContext";

const UserDashboardPage = () => {
  const mainRef = useMainRef();
  const { refreshAccessToken, accessToken } = useAuth();
  useScrollToMain();

  const { data: userList, isLoading } = useQuery({
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

  return (
    <main className="dashboard-page" ref={mainRef}>
      <div className="title">Danh Sách Người Dùng</div>
      {isLoading || typeof userList === "undefined" ? (
        <Loader />
      ) : (
        <Table
          data={userList}
          columns={userTableColumns}
          baseURL="/user-dashboard"
        />
      )}
    </main>
  );
};

export default UserDashboardPage;
