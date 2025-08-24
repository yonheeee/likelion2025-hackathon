import React from "react";
import "../../../css/user/main/ComplaintItem.css";
import LocationIcon from "../../../image/User/main/location.svg";
import { CATEGORY_MAP, STATUS_MAP } from "../../common/categoryStatusMap"; 

const MyComplaintItem = ({ complaint, onDelete }) => {
  const statusInfo = STATUS_MAP[complaint.status] || { label: "기타", bg: "#E5E7EB", color: "#4B5563" };
  const categoryLabel = CATEGORY_MAP[complaint.category] || "기타";
  
  const handleEdit = () => {
    alert(`'${complaint.title}' 민원 수정 기능은 구현 예정입니다.`);
  };

  return (
    <div className="complaint-item">
      <div className="complaint-header">
        <div className="complaint-title-row">
          <h4 className="complaint-title">{complaint.title}</h4>
          <span className="complaint-date">
            {new Date(complaint.createdAt).toLocaleDateString("ko-KR")}
          </span>
        </div>
        <span
          className="complaint-status"
          style={{ background: statusInfo.bg, color: statusInfo.color }}
        >
          {statusInfo.label}
        </span>
      </div>
      <p className="complaint-content">{complaint.content}</p>
      <div className="complaint-footer">
        <div className="complaint-location">
          <img src={LocationIcon} alt="" className="location-icon" />
          <span>{complaint.address}</span>
        </div>
        <div className="footer-right">
            <span className="complaint-category">{categoryLabel}</span>
            <div className="action-buttons">
                <button onClick={handleEdit} className="edit-btn">수정</button>
                <button onClick={onDelete} className="delete-btn">삭제</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MyComplaintItem;