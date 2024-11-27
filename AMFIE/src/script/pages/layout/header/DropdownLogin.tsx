import "../../../../css/Header.css";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DropdownLogin = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <div className="dropdown">
          <button>
            <FaUserCircle className="user-icon" size={30} />
            <p>{user.email}</p>
          </button>
          <ul className="dropdown-menu">
            <li onClick={() => navigate("#")}>
              <p>Trang cá nhân</p>
            </li>
            <li
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <p>Đăng xuất</p>
            </li>
          </ul>
        </div>
      ) : (
        <button onClick={() => navigate("/login")}>Đăng nhập</button>
      )}
    </>
  );
};

export default DropdownLogin;
