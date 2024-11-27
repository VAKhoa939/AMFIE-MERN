import "../../../css/InfoPage.css";
import { useState } from "react";
import {
  AssetCreate,
  columnHeaderList,
  createAsset,
  defaultAsset,
} from "../../interfaces/Asset";
import { useMainRef, useScrollToMain } from "../../context/MainRefContext";
import { Link } from "react-router-dom";

const CreateAssetPage = () => {
  const [formData, setFormData] = useState<AssetCreate>(defaultAsset);
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(createAsset(formData));
  }

  return (
    <main ref={mainRef} className="asset-info-background">
      <div className="container">
        <Link to={"/user-dashboard"}>Trở về</Link>
        <form onSubmit={handleSubmit} className="content">
          {Object.entries(formData).map(([key, value], id) => (
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
                />
              )}
            </div>
          ))}

          <div>
            <input type="submit" value="Tạo" />
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateAssetPage;
