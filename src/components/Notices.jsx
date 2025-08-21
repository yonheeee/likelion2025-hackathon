import React from "react";

export default function Notices() {
  const notices = [
    { title: "오류문", content: "OO시청 홈페이지 서버 점검 예정입니다.", date: "2025-08-10" },
    { title: "프로모션", content: "여름 특별 이벤트 진행 안내", date: "2025-08-01" }
  ];

  return (
    <div className="notice-section">
      <h3 className="section-title">오늘의 민원처리현황</h3>
      <span className="notice-count">25,960</span>
      {notices.map((n, idx) => (
        <div key={idx} className="notice-card">
          <div className="notice-header">
            <strong>{n.title}</strong>
            <button className="view-btn">상세보기</button>
          </div>
          <p>{n.content}</p>
        </div>
      ))}
    </div>
  );
}
