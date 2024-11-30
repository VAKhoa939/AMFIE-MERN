import "../../../css/InfoPage.css";
import { useMainRef, useScrollToMain } from "../../context/MainRefContext";
import { createUser, User } from "../../interfaces/User";
import { useAuth } from "../../context/AuthContext";
import { FaAngleLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUserPage = () => {
  const [formData, setFormData] = useState<User>({} as User);
  const { refreshAccessToken, accessToken } = useAuth();
  const ICON_SIZE = 20;

  const navigate = useNavigate();
  const mainRef = useMainRef();
  useScrollToMain();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name } = e.target;
    const value =
      typeof e.target.value === "number"
        ? Number(e.target.value)
        : e.target.value;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    let token = accessToken;
    if (!token) {
      token = await refreshAccessToken();
      if (!token) {
        throw new Error("Unable to refresh access token");
      }
    }
    const result = await createUser(formData, token);
    if (result) console.log("succeed");
    else console.log("failed");
  }

  return (
    <main ref={mainRef} className="info-page">
      <div className="container">
        <div className="layout">
          <div
            className="back-button"
            onClick={() => navigate("/user-dashboard")}
          >
            <FaAngleLeft size={ICON_SIZE} />
            <p>Trở về</p>
          </div>
          <h1 className="title">Tạo Tài Khoản Mới</h1>
          <form className="info-body">
            <div className="long-info">
              <div className="info-header">Tên tài khoản: </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="normal-info">
              <div className="info-container">
                <div className="info-header">Email:</div>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="info-container">
                <div className="info-header">Số điện thoại:</div>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="info-container">
                <div className="info-header">Chức vụ:</div>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="button-container">
              <button className="submit-btn" onClick={handleSubmit}>
                Tạo tài khoản
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateUserPage;
