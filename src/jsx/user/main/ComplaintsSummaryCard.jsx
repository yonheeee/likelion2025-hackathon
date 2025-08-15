import React from "react";
import { Link } from "react-router-dom";
import "../../../css/user/main/ComplaintsSummaryCard.css";
import ComplaintItem from "./ComplaintItem";

const ComplaintsSummaryCard = ({ total, change, changeType, complaintsList = [] }) => {
  return (
    <div className="complaints-summary-card">
      <div className="summary-content">
        <h3 className="summary-title">전체 민원 수</h3>
        <div className="summary-value">{total.toLocaleString()}</div>
        <div className={`summary-change ${changeType}`}>
          {changeType === 'increase' ? '+' : ''}{change}
          <span className="change-arrow">
            {changeType === 'increase' ? '▲' : '▼'}
          </span>
        </div>
      </div>
      
      <div className="complaints-list">
        {complaintsList.map((complaint, index) => (
          <ComplaintItem key={index} {...complaint} />
        ))}
        
        <Link to="/complaints" className="view-all-link">
          전체 민원 목록 보기 ({complaintsList.length}건) →
        </Link>
      </div>
    </div>
  );
};

export default ComplaintsSummaryCard;
