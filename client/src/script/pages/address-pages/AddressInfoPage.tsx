import "../../../css/InfoPage.css";
import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMainRef, useScrollToMain } from "../../context/MainRefContext";
import { getUserList, User } from "../../interfaces/User";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/AuthContext";
import { FaAngleLeft } from "react-icons/fa";
import {
  Address,
  AddressRequest,
  deleteAddress,
  getAddressById,
  updateAddress,
} from "../../interfaces/Address";

const AddressInfoPage = () => {
  const [formData, setFormData] = useState<Address>({} as Address);
  const [mode, setMode] = useState<"info" | "update">("info");
  const { refreshAccessToken, accessToken } = useAuth();
  const location = useLocation();
  const id = location.pathname.split("/").pop() as string;
  const ICON_SIZE = 20;

  const { data, isLoading: isLoadingAddress } = useQuery<Address>({
    queryFn: async () => {
      let token = accessToken;
      if (!token) {
        token = await refreshAccessToken();
        if (!token) {
          throw new Error("Unable to refresh access token");
        }
      }
      return getAddressById(id, token);
    },
    queryKey: ["address", id],
  });

  const { data: userList, isLoading: isLoadingUserList } = useQuery<User[]>({
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

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const navigate = useNavigate();
  const mainRef = useMainRef();
  useScrollToMain();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name } = e.target;
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { responsible_user_name, ...filteredData } = formData;
    const addressRequest = { ...filteredData } as AddressRequest;
    console.log(addressRequest);
    const result = await updateAddress(id, addressRequest, token);
    if (result) {
      console.log("created address successfully");
      setMode("info");
    } else console.log("failed to create address");
  }

  async function handleDelete(
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
    const result = await deleteAddress(id, token);
    if (result) {
      navigate("/address-dashboard");
    }
  }

  const InfoMode = (): ReactNode => {
    return (
      <div className="info-body">
        <div className="long-info">
          <div className="info-header">Tên phòng: </div>
          <p>{formData.name}</p>
        </div>
        <div className="long-info">
          <div className="info-header">Tên tòa nhà: </div>
          <p>{formData.building}</p>
        </div>
        <div className="long-info">
          <div className="info-header">Người chịu trách nhiệm: </div>
          <p>{`${formData.responsible_user_name} - ${
            userList?.find((user) => user._id === formData.responsible_user)
              ?.userid
          }`}</p>
        </div>

        <div className="button-container">
          <button className="update-btn" onClick={() => setMode("update")}>
            Cập nhật thông tin
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Xóa địa chỉ phòng
          </button>
        </div>
      </div>
    );
  };

  const UpdateMode = (): ReactNode => {
    return (
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
            className="dropdown"
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
            Lưu thông tin
          </button>
          <button className="cancel-btn" onClick={() => setMode("info")}>
            Hủy cập nhật
          </button>
        </div>
      </form>
    );
  };

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
          <h1 className="title">
            {mode === "info" ? "Thông Tin" : "Cập Nhật"} Người Dùng
          </h1>
          {isLoadingAddress || isLoadingUserList ? (
            <Loader />
          ) : mode === "info" ? (
            InfoMode()
          ) : (
            UpdateMode()
          )}
        </div>
      </div>
    </main>
  );
};

export default AddressInfoPage;
