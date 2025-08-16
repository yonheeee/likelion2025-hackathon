import React from "react";
import "../../../css/user/main/ComplaintItem.css";
import LocationIcon from "../../../image/User/main/location.svg";

const ComplaintItem = ({
  title,
  date,
  content,
  location,
  status = "접수",
  category,
}) => {
  return (
    <div className="complaint-item">
      <div className="complaint-header">
        <div className="complaint-title-row">
          <h4 className="complaint-title">{title}</h4>
          {date && <span className="complaint-date">{date}</span>}
        </div>
        {status && <span className="complaint-status">{status}</span>}
      </div>

      <p className="complaint-content">{content}</p>

      <div className="complaint-footer">
        <div className="complaint-location">
          <img src={LocationIcon} alt="" className="location-icon" aria-hidden="true" />
          <span>{location}</span>
        </div>

        {category && <span className="complaint-category">{category}</span>}
      </div>
    </div>
  );
};

export default ComplaintItem;
