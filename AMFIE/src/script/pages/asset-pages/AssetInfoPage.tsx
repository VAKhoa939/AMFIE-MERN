import "../../../css/InfoPage.css";
import { useEffect, useState } from "react";
import {
  Asset,
  columnHeaderList,
  defaultAsset,
  deleteAsset,
  getAssetById,
  updateAsset,
} from "../../interfaces/Asset";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMainRef, useScrollToMain } from "../../context/MainRefContext";

const AssetInfoPage = () => {
  const [formData, setFormData] = useState<Asset>(defaultAsset);
  const [mode, setMode] = useState<string>("info");
  const location = useLocation();
  const id = location.pathname.split("/").pop() as string;

  const { data: asset, isLoading } = useQuery({
    queryFn: async () => getAssetById(id),
    queryKey: ["asset", id],
  });

  useEffect(() => {
    if (asset) setFormData(asset);
  }, [asset]);

  const navigate = useNavigate();
  const mainRef = useMainRef();
  useScrollToMain();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name } = e.target;
    const value =
      typeof e.target.value === "number"
        ? Number(e.target.value)
        : e.target.value;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    updateAsset(id, formData);
    setMode("info");
  }

  function renderInfo() {
    return (
      <div className="content">
        {Object.entries(formData).map(
          ([key, value], id) =>
            key !== "__v" &&
            key !== "history" && (
              <div key={key}>
                <p>{columnHeaderList[id]}:</p>
                <p>{value || "Không có"}</p>
              </div>
            )
        )}
        <div />
        <button onClick={() => setMode("update")}>Cập nhật</button>
        <button
          onClick={() => {
            deleteAsset(id);
            navigate("/user-dashboard");
          }}
        >
          Xóa tài sản
        </button>
      </div>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit} className="content">
        {Object.entries(formData).map(
          ([key, value], id) =>
            key !== "__v" &&
            key !== "history" && (
              <div key={key}>
                <p>{columnHeaderList[id]}:</p>
                {key === "note" ? (
                  <textarea name={key} value={value} onChange={handleChange} />
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    readOnly={key === "id"}
                  />
                )}
              </div>
            )
        )}
        <div></div>
        <input type="submit" value="Lưu" />
        <button onClick={() => setMode("info")}>Hủy</button>
      </form>
    );
  }

  return (
    <main ref={mainRef} className="asset-info-background">
      <div className="container">
        <Link to={"/user-dashboard"}>Trở về</Link>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>{mode === "update" ? renderForm() : renderInfo()}</>
        )}
      </div>
    </main>
  );
};

export default AssetInfoPage;
