import { useNavigate } from "react-router-dom";
import "../../../css/HomePage.css";
import homepagebg from "../../../assets/homepagebg.png";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <main className="homepage">
      <div className="homepage-content">
        <h1>ĐẠI HỌC SƯ PHẠM KỸ THUẬT TP.HCM</h1>
        <h2>Phần Mềm Quản Lý Tài Sản, Thiết Bị, Dụng Cụ</h2>
        <h2>Khoa Đào Tạo Quốc Tế</h2>
        <button
          className="go-to-dashboard-btn"
          onClick={() => navigate("/asset-dashboard")}
        >
          Đến bảng điều khiển
        </button>
      </div>
      <img className="bg-image" src={homepagebg} />
    </main>
  );
};

export default HomePage;
