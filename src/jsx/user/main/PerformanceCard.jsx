import React from "react";
import "../../../css/user/main/PerformanceCard.css";

const PerformanceCard = ({ title, value, change, changeType = "increase" }) => {
  const isUp = changeType === "increase";
  return (
    <div className="performance-card">
      <div className="performance-left">
        <div className="performance-title">{title}</div>
        <div className="performance-value">{value}</div>
      </div>

      <div className={`performance-change ${isUp ? "increase" : "decrease"}`}>
        <span className="arrow" aria-hidden>{isUp ? "▲" : "▼"}</span>
        <span className="change-text">{change}</span>
      </div>
    </div>
  );
};

export default PerformanceCard;
