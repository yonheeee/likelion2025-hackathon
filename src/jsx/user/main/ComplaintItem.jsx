import React from "react";
import "../../../css/user/main/ComplaintItem.css";
import LocationIcon from "../../../image/User/main/location.svg";
// 민원카드
export default function ComplaintItem({
  title,
  date,
  content,
  location,
  status = "접수",
  category,
  children,
}) {
  // 상태별 색상 매핑 (디자인 기준 수정)
  const statusStyles = {
    접수: { bg: "#FEF3C7", color: "#92400E", border: "#FDE68A" },   // 노랑
    처리중: { bg: "#DBEAFE", color: "#1E40AF", border: "#BFDBFE" }, // 파랑
    완료: { bg: "#D1FAE5", color: "#065F46", border: "#A7F3D0" },   // 초록
  };

  const s = statusStyles[status] || statusStyles["접수"];

  return (
    <div className="complaint-item">
      {/* 헤더 */}
      <div className="complaint-header">
        <div className="complaint-title-row">
          <h4 className="complaint-title">{title}</h4>
          {date && <span className="complaint-date">{date}</span>}
        </div>
        <span
          className="complaint-status"
          style={{
            background: s.bg,
            color: s.color,
            border: `1px solid ${s.border}`,
          }}
        >
          {status}
        </span>
      </div>

      {/* 본문 */}
      <p className="complaint-content">{content}</p>

      {/* 푸터 */}
      <div className="complaint-footer">
        <div className="complaint-location">
          <img
            src={LocationIcon}
            alt="위치"
            className="location-icon"
            aria-hidden="true"
          />
          <span>{location}</span>
        </div>

        {/* 카테고리 태그 */}
        {category && (
          <span className="complaint-category">{category}</span>
        )}

        {/* 추가 버튼 같은 children */}
        {children}
      </div>
    </div>
  );
}
