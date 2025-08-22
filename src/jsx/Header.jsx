import "../css/Header.css";
import Logo from "../image/logo.svg";
const Header = () => {

  return (
    <header className="hdr">
      <div className="header-container" style={{margin: '0'}}>
          <img src={Logo} alt="서비스 로고" className="brand__img" />
          <div className="logo-name">온민원</div>
        </div>
    </header>
  );
};

export default Header;