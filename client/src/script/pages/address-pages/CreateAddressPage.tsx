import "../../../css/InfoPage.css";
import { useMainRef, useScrollToMain } from "../../context/MainRefContext";
import { useAuth } from "../../context/AuthContext";
import { FaAngleLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Address,
  AddressRequest,
  createAddress,
} from "../../interfaces/Address";
import { useQuery } from "@tanstack/react-query";
import { getUserList, User } from "../../interfaces/User";
import Loader from "../../components/Loader";

const CreateAddressPage = () => {
  const [formData, setFormData] = useState<Address>({} as Address);
  const { refreshAccessToken, accessToken } = useAuth();
  const ICON_SIZE = 20;

  const navigate = useNavigate();
  const mainRef = useMainRef();
  useScrollToMain();

  const { data: userList, isLoading } = useQuery<User[]>({
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
    queryKey: ["user"],
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name } = e.target;
    const value =
      typeof e.target.value === "number"
        ? Number(e.target.value)
        : e.target.value;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    if (typeof userList === "undefined") return;
    const { name, _id } = userList.find(
      (user) => user._id === e.target.value
    ) as User;
    console.log(name, _id);
    setFormData((prevState) => ({
      ...prevState,
      responsible_user: _id,
      responsible_user_name: name,
    }));
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { responsible_user_name, ...filteredData } = formData;
    const addressRequest = { ...filteredData } as AddressRequest;
    console.log(addressRequest);
    const result = await createAddress(addressRequest, token);
    if (result) {
      console.log("created address successfully");
      navigate("/address-dashboard");
    } else console.log("failed to create address");
  }

  return (
    <main ref={mainRef} className="info-page">
      <div className="container">
        <div className="layout">
          <div
            className="back-button"
            onClick={() => navigate("/address-dashboard")}
          >
            <FaAngleLeft size={ICON_SIZE} />
            <p>Trở về</p>
          </div>
          <h1 className="title">Tạo Địa Chỉ Phòng Mới</h1>
          {isLoading ? (
            <Loader />
          ) : (
            <form className="info-body">
              <div className="long-info">
                <div className="info-header">Tên phòng: </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="long-info">
                <div className="info-header">Tên tòa nhà: </div>
                <input
                  type="text"
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                />
              </div>
              <div className="long-info">
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
              <div className="button-container">
                <button className="submit-btn" onClick={handleSubmit}>
                  Tạo địa chỉ phòng
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default CreateAddressPage;
