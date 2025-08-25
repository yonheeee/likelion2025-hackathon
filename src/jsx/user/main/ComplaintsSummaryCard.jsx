import React, { useState, useCallback } from "react";
import "../../../css/user/main/ComplaintsSummaryCard.css";
import { Link } from "react-router-dom";
import EntireComplaintLists from "../../common/EntireComplaintLists.jsx"; 

const ComplaintsSummaryCard = ({
  change = null,
  changeType = null,   
  isAdmin = false,    
  listLimit = 2,       
}) => {
  const [total, setTotal] = useState(0);
  const showChange = typeof change === "number" && changeType;

  const handleLoaded = useCallback((count) => {
    setTotal(count);
  }, []);

  return (
    <div className="complaints-summary-card">
      <div className="summary-header">
        <div className="summary-main-info">
          <h3 className="summary-title">전체 민원 수</h3>
          <div className="summary-value">{Number(total || 0).toLocaleString()}</div>
        </div>

        {showChange && (
          <div className={`summary-change ${changeType}`}>
            <span className="change-arrow">
              {changeType === 'increase' ? '▲' : '▼'}
            </span>
            {changeType === 'decrease' ? '-' : ''}{change}
          </div>
        )}
      </div>

      <ul className="complaints-list" style={{ padding: 0, margin: 0 }}>
        <EntireComplaintLists
          isAdmin={isAdmin}
          limit={listLimit}
          onLoaded={handleLoaded} 
        />

        <Link to="/user/entire" className="view-all-link">
          전체 민원 목록 보기 ({Number(total || 0).toLocaleString()}건) →
        </Link>
      </ul>
    </div>
  );
};

export default ComplaintsSummaryCard;
