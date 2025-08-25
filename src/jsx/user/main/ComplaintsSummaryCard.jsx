import "../../../css/user/main/ComplaintsSummaryCard.css";
import { Link } from "react-router-dom"; 
import ComplaintItem from "./ComplaintItem";
// 민원요약
const ComplaintsSummaryCard = ({ total, change, changeType, complaintsList = [] }) => {
  return (
    <div className="complaints-summary-card">
      {/* This wrapper helps align items with Flexbox */}
      <div className="summary-header">
        <div className="summary-main-info">
          <h3 className="summary-title">전체 민원 수</h3>
          <div className="summary-value">{total.toLocaleString()}</div>
        </div>
        <div className={`summary-change ${changeType}`}>
          <span className="change-arrow">
            {changeType === 'increase' ? '▲' : '▼'}
          </span>
      
          {changeType === 'decrease' ? '-' : ''}{change}
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