import "../../../css/Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import uteLogo from "../../../assets/ute-logo.png";
import { FaWarehouse, FaUserCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface Props {
  children: JSX.Element;
}

const Navbar = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const showNavbar =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/register";
  const ICON_SIZE = 30;

  return showNavbar ? (
    <div className="ams-body">
      <nav className="navbar-bg">
        <div className="navbar-container">
          <div className="ute-logo" onClick={() => navigate("/")}>
            <img src={uteLogo} />
            <h1>HCMUTE</h1>
          </div>
          <ul className="navbar-menu">
            <li
              className={
                location.pathname.startsWith("/asset-dashboard") ? "active" : ""
              }
              onClick={() => navigate("/asset-dashboard")}
            >
              <FaWarehouse size={ICON_SIZE} />
              <p>Tài sản</p>
            </li>
            <li
              className={
                location.pathname.startsWith("/address-dashboard")
                  ? "active"
                  : ""
              }
              onClick={() => navigate("/address-dashboard")}
            >
              <FaLocationDot size={ICON_SIZE} />
              <p>Địa chỉ phòng</p>
            </li>
            <li
              className={
                location.pathname.startsWith("/user-dashboard") ? "active" : ""
              }
              onClick={() => navigate("/user-dashboard")}
            >
              <FaUserCircle size={ICON_SIZE} />
              <p>Người dùng</p>
            </li>
          </ul>
        </div>
      </nav>
      {props.children}
    </div>
  ) : (
    <>{props.children}</>
  );
};

export default Navbar;
