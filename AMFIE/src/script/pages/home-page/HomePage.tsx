import { Link } from "react-router-dom";
import "../../../css/HomePage.css";
import homepagebg from "../../../assets/homepagebg.png";

const HomePage = () => {
  return (
    <main className="homepage">
      <div className="homepage-content">
        <h1>ĐẠI HỌC SƯ PHẠM KỸ THUẬT TP.HCM</h1>
        <h2>Phần Mềm Quản Lý Tài Sản, Thiết Bị, Dụng Cụ</h2>
        <h2>Khoa Đào Tạo Quốc Tế</h2>
        <Link to="/asset-dashboard" className="go-to-dashboard-btn">
          Đến bảng điều khiển
        </Link>
      </div>
      <img className="bg-image" src={homepagebg} />
    </main>
  );
};

export default HomePage;
