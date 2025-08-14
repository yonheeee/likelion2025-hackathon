import React from "react";
import { Link } from "react-router-dom";
import "../../../../css/ComplaintsSummaryCard.css";

// 카테고리 → 톤 클래스 매핑(간단 규칙)
const toneClass = (cat = "") => {
  if (/시설|파손|관리/.test(cat)) return "tone-indigo";
  if (/교통|주정차|도로/.test(cat)) return "tone-blue";
  if (/환경|청소|미화/.test(cat)) return "tone-green";
  return "tone-slate";
};

const ComplaintsSummaryCard = ({
  total = 0,
  trend = 0,                    // 예: -4.33
  items = [],                   // [{ name, date, content, location, category, status? }]
  moreTo = "/complaints",
}) => {
  const trendUp = trend >= 0;
  const trendText = `${trendUp ? "+" : ""}${trend}%`;

  return (
    <section className="cs-card">
      <div className="cs-head">
        <div className="cs-caption">전체 민원 수</div>
        <div className={`cs-trend ${trendUp ? "up" : "down"}`}>
          {trendUp ? "▲" : "▼"} {trendText}
        </div>
      </div>

      <div className="cs-total">{Number(total).toLocaleString()}</div>

      <ul className="cs-list">
        {items.map((it, i) => (
          <li key={i} className="cs-item">
            <div className="cs-item-head">
              <h4 className="cs-name">{it.name}</h4>
              {it.status && <span className="cs-badge">{it.status}</span>}
            </div>

            <div className="cs-date">{it.date}</div>
            <p className="cs-content">{it.content}</p>

            <div className="cs-foot">
              <div className="cs-location">
                <svg viewBox="0 0 24 24" className="cs-pin" aria-hidden="true">
                  <path d="M12 22s7-5.33 7-12a7 7 0 0 0-14 0c0 6.67 7 12 7 12z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span>{it.location}</span>
              </div>
              <span className={`cs-category ${toneClass(it.category)}`}>{it.category}</span>
            </div>
          </li>
        ))}
      </ul>

      <Link to={moreTo} className="cs-more">
        전체 민원 목록 보기 ({items.length}건) →
      </Link>
    </section>
  );
};

export default React.memo(ComplaintsSummaryCard);
