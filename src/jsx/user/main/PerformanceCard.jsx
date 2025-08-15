import React from "react";
import "../../../css/user/main/PerformanceCard.css";

const PerformanceCard = ({ title, value, change, changeType = "increase" }) => {
  return (
    <div className="performance-card">
      <div className="performance-content">
        <div className="performance-title">{title}</div>
        <div className="performance-value">{value}</div>
        <div className={`performance-change ${changeType}`}>
          {changeType === "increase" ? "+" : "-"}{change}
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;
