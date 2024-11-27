import "../../../css/DashboardPage.css";
import { getAssetList } from "../../interfaces/Asset";
import { useQuery } from "@tanstack/react-query";
import { useMainRef, useScrollToMain } from "../../context/MainRefContext";
import Table from "../../components/Table";
import { assetTableColumns } from "../../utils/tableColumns";

const AssetDashboardPage = () => {
  const mainRef = useMainRef();
  useScrollToMain();

  const { data: assetList, isLoading } = useQuery({
    queryFn: () => getAssetList(),
    queryKey: ["assetList"],
  });

  return (
    <main className="dashboard-page" ref={mainRef}>
      <div className="title">Danh Sách Tài Sản</div>
      {isLoading || typeof assetList === "undefined" ? (
        <>Loading...</>
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
