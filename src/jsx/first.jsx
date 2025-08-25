import React from "react";
import { Link } from "react-router-dom";
import "../css/First.css";

import Logo from "../image/logo.svg";
import User from "../image/First/user.svg";
import Manager from "../image/First/manager.svg";
import UserArrow from "../image/First/user-arrow.svg";
import ManagerArrow from "../image/First/manager-arrow.svg";

const First = () => {
  return (
    <main className="firstpage">
      <div className="first-inner">

        <header className="first-header" aria-label="서비스 소개">
          <img src={Logo} alt="서비스 로고" className="logo-img" />
            <h1 className="title">온민원</h1>
            <p className="subtitle">쉽고 빠른 민원서비스</p>
        </header>

        <nav className="user-selection" aria-label="역할 선택">
          <Link to="/user" className="select-card user" role="button">
            <img src={User} alt="사용자 아이콘" />

            <div className="card-text">
              <div className="card-title">일반 사용자</div>
              <div className="card-desc">
                민원을 접수하고 조회할 수 있습니다
              </div>
            </div>

            <div className="arrow-wrap">
              <img src={UserArrow} alt="사용자 화살표" className="arrow"/>
            </div>
            
          </Link>

          {/* 관리자 */}
          <Link to="/admin" className="select-card admin" role="button">
            <img src={Manager} alt="관리자 아이콘" />

            <div className="card-text">
              <div className="card-title">관리자</div>
              <div className="card-desc">
                접수된 민원을 관리하고 처리할 수 있습니다
              </div>
            </div>

            <div className="arrow-wrap" aria-hidden="true">
              <img src={ManagerArrow} alt="관리자 아이콘" className="arrow"/>
            </div>
          </Link>
        </nav>

        {/* 하단 안내 */}
        <footer className="first-footer" aria-label="문의 안내">
          <div className="footer-title">문의사항은 고객센터로 연락주세요</div>
          <div className="footer-desc">근무시간 : 평일 09:00 ~ 18:00</div>
        </footer>
      </div>
    </main>
  );
};

export default First;
