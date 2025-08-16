import React from "react";

const SectionCard = ({ title, icon, children }) => (
  <section className="receipt-card">
    <div className="card-title">
      <span className={`card-icon ${icon}`} aria-hidden />
      <span>{title}</span>
    </div>
    {children}
  </section>
);

export default React.memo(SectionCard);
