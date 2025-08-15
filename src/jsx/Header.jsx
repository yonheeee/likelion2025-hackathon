import "../css/Header.css";
import Logo from "../image/logo.svg";
const Header = () => {
  return (
    <header className="hdr">
      <div className="hdr__inner">
        <div className="brand">
          <div className="brand__box">로고</div>
    
          <img src={Logo} alt="서비스 로고" className="brand__img" />
          
        </div>
        {/* 우측 공간(알림/설정 등 필요시 배치) */}
        <div className="hdr__spacer" />
      </div>
    </header>
  );
};

export default Header;