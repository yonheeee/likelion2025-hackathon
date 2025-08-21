import React from "react";
import "../../../css/user/receipt/SectionCard.css";

const SectionCard = ({ title, icon, children }) => (
  <section className="receipt-card">
    <div className="card-title">
    <img src={icon} alt={`${title} 아이콘`} className="card-icon" />
      <span>{title}</span>
    </div>
    {children}
  </section>
);

export default React.memo(SectionCard);
