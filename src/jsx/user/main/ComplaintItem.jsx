import React from "react";
import "../../../css/user/main/ComplaintItem.css";

const ComplaintItem = ({ 
  title, 
  date, 
  content, 
  location, 
  status = "접수", 
  actionButton 
}) => {
  return (
    <div className="complaint-item">
      <div className="complaint-header">
        <h4 className="complaint-title">{title}</h4>
        <span className="complaint-status">{status}</span>
      </div>
      
      <div className="complaint-date">{date}</div>
      <p className="complaint-content">{content}</p>
      
      <div className="complaint-footer">
        <div className="complaint-location">
          <svg viewBox="0 0 24 24" className="location-icon" aria-hidden="true">
            <path d="M12 22s7-5.33 7-12a7 7 0 0 0-14 0c0 6.67 7 12 7 12z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <span>{location}</span>
        </div>
        {actionButton && (
          <button className="complaint-action-btn">{actionButton}</button>
        )}
      </div>
    </div>
  );
};

export default ComplaintItem;
