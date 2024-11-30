import "../../../../css/Header.css";
import uteFullName from "../../../../assets/uteFullName.png";
import DropdownLogin from "./DropdownLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const showUTEFullLogo =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";
  return (
    <header>
      <div className="header-section">
        <button onClick={() => navigate("/")}>Trang chủ</button>
        <button onClick={() => navigate("/asset-dashboard")}>
          Bảng điều khiển
        </button>
        <DropdownLogin />
      </div>
      {showUTEFullLogo && (
        <div className="logo-section">
          <Link to="/">
            <img className="ute-img" src={uteFullName} />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
