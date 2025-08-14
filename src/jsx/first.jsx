import React from "react";
import { Link } from "react-router-dom";
import "../css/First.css";

// 로고 이미지가 있다면 주석 해제해서 사용하세요.
// import Logo from "../../images/Logo.svg";

const First = () => {
  return (
    <main className="firstpage">
      <div className="first-inner">

        {/* 로고 & 타이틀 */}
        <header className="first-header" aria-label="서비스 소개">
          <div className="logo-box" aria-hidden="true">
            {/* 로고 파일이 있으면 아래를 사용하고 .logo-box는 숨기세요 */}
            {/* <img src={Logo} alt="서비스 로고" className="logo-img" /> */}
            <span>로고</span>
          </div>

          <h1 className="title">간편민원접수</h1>
          <p className="subtitle">쉽고 빠른 민원서비스</p>
        </header>

        {/* 선택 카드 */}
        <nav className="user-selection" aria-label="역할 선택">
          {/* 일반 사용자 */}
          <Link to="/user" className="select-card user" role="button">
            <div className="icon-wrap">
              {/* 사람 아이콘 - 외부 이미지 없이 바로 사용 가능한 SVG */}
              <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                <circle cx="12" cy="8" r="3" />
                <path d="M4 20a8 8 0 0 1 16 0" />
              </svg>
            </div>

            <div className="card-text">
              <div className="card-title">일반 사용자</div>
              <div className="card-desc">
                민원을 접수하고 조회할 수 있습니다
              </div>
            </div>

            <div className="arrow-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="arrow">
                <path d="M8 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* 관리자 */}
          <Link to="/admin" className="select-card admin" role="button">
            <div className="icon-wrap">
              {/* 톱니 아이콘 */}
              <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
                <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                <path d="M19.4 15a7.9 7.9 0 0 0 .1-1 7.9 7.9 0 0 0-.1-1l2-1.5-2-3.4-2.3.9a7.6 7.6 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7.6 7.6 0 0 0-1.7 1l-2.3-.9-2 3.4 2 1.5a7.9 7.9 0 0 0-.1 1 7.9 7.9 0 0 0 .1 1l-2 1.5 2 3.4 2.3-.9c.5.4 1.1.7 1.7 1l.3 2.5h4l.3-2.5c.6-.3 1.2-.6 1.7-1l2.3.9 2-3.4-2-1.5z" />
              </svg>
            </div>

            <div className="card-text">
              <div className="card-title">관리자</div>
              <div className="card-desc">
                접수된 민원을 관리하고 처리할 수 있습니다
              </div>
            </div>

            <div className="arrow-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="arrow">
                <path d="M8 5l7 7-7 7" />
              </svg>
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
