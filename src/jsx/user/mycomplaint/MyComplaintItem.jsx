import React from "react";
import "../../../css/user/main/ComplaintItem.css";
import LocationIcon from "../../../image/User/main/location.svg";

const statusStyles = {
  접수: { bg: "#FEF3C7", color: "#92400E", border: "#FDE68A" },   // 노랑
  처리중: { bg: "#DBEAFE", color: "#1E40AF", border: "#BFDBFE" }, // 파랑
  완료: { bg: "#D1FAE5", color: "#065F46", border: "#A7F3D0" },   // 초록
};

const MyComplaintItem = ({
  title,
  date,
  content,
  location,
  status,
  category,
}) => {
  const style = statusStyles[status] || statusStyles["접수"];

  return (
    <div className="complaint-item">
      <div className="complaint-header">
        <div className="complaint-title-row">
          <h4 className="complaint-title">{title}</h4>
          {date && <span className="complaint-date">{date}</span>}
        </div>
        {status && (
          <span
            className="complaint-status"
            style={{
              background: style.bg,
              color: style.color,
              border: `1px solid ${style.border}`,
            }}
          >
            {status}
          </span>
        )}
      </div>

      <p className="complaint-content">{content}</p>

      <div className="complaint-footer">
        <div className="complaint-location">
          <img
            src={LocationIcon}
            alt=""
            className="location-icon"
            aria-hidden="true"
          />
          <span>{location}</span>
        </div>

        {category && <span className="complaint-category">{category}</span>}
      </div>
    </div>
  );
};

export default MyComplaintItem;
