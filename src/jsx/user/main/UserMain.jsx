import React from "react";
import "../../../css/UserMain.css"; // ← 경로에 역슬래시(\) 말고 슬래시(/)!

// 액션 카드 하나
const ActionCard = ({ tone = "blue", title, desc, to = "#" , icon = "pen" }) => (
  <a href={to} className={`action-card ${tone}`}>
    <div className="action-text">
      <div className="action-title">{title}</div>
      <div className="action-desc">{desc}</div>
    </div>
    <div className="action-icon" aria-hidden>
      {icon === "pen" ? (
        <svg viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
          <path d="M20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.3a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.84z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      )}
    </div>
  </a>
);

const UserMain = () => {
  return (
    <main className="user-main">
      <div className="section-head">
        <h2 className="section-title">민원현황</h2>
        <p className="section-sub">민원 접수 및 처리 상황을 확인하세요</p>
      </div>

      <div className="quick-actions">
        <ActionCard
          tone="blue"
          title="민원 접수하기"
          desc="새로운 민원을 접수할 수 있습니다."
          to="/complaints/new"
          icon="pen"
        />
        <ActionCard
          tone="orange"
          title="내 민원 조회하기"
          desc="내가 쓴 민원을 조회할 수 있습니다"
          to="/complaints/mine"
          icon="search"
        />
      </div>
    </main>
  );
};

export default UserMain;
