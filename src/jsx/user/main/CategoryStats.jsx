import React, { useEffect, useState } from "react";
import "../../../css/user/main/CategoryStats.css";

import { ReactComponent as Environment } from "../../../image/User/main/environment.svg";
import { ReactComponent as Facility }    from "../../../image/User/main/facility.svg";
import { ReactComponent as Traffic }     from "../../../image/User/main/traffic.svg";
import { ReactComponent as Safe }        from "../../../image/User/main/safe.svg";
import { ReactComponent as Inconvince }  from "../../../image/User/main/inconvince.svg";
import { ReactComponent as Etc }         from "../../../image/User/main/etc.svg";
// 카테고리 상태
const ICONS = {
  environment: Environment,
  facility:    Facility,
  traffic:     Traffic,
  safe:        Safe,
  inconvince:  Inconvince,
  etc:         Etc,
};

const CATEGORY_MAP = {
  ENVIRONMENT_CLEANING: { name: "환경/청소",       icon: "environment", color: "#10B981" },
  FACILITY_DAMAGE:      { name: "시설물 파손/관리", icon: "facility",    color: "#F59E0B" },
  TRAFFIC_PARKING:      { name: "교통/주정차",     icon: "traffic",     color: "#3B82F6" },
  SAFETY_RISK:          { name: "안전/위험",       icon: "safe",        color: "#EF4444" },
  LIVING_INCONVENIENCE: { name: "생활 불편",       icon: "inconvince",  color: "#8B5CF6" },
  OTHERS_ADMIN:         { name: "기타/행정",       icon: "etc",         color: "#6B7280" },
};

// HEX → rgba (옅은 배경용)
const withAlpha = (hex, a = 0.12) => {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  const v = parseInt(n, 16);
  const r = (v >> 16) & 255, g = (v >> 8) & 255, b = v & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

// CategoryStats.jsx
const CategoryStats = ({ filterCategory = null }) => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        const res = await fetch("/api/complaints/categorystat");
        if (!res.ok) throw new Error("카테고리 데이터 불러오기 실패");
        const data = await res.json();

        let mapped = data.map((c) => {
          const mapInfo = CATEGORY_MAP[c.category] || CATEGORY_MAP.OTHERS_ADMIN;
          return {
            category: c.category,
            name: mapInfo.name,
            percentage: `${c.valuePercent}%`,
            changeType: c.up ? "increase" : "decrease",
            icon: mapInfo.icon,
            color: mapInfo.color,
          };
        });

        // ✅ 특정 카테고리만 필터링
        if (filterCategory) {
          mapped = mapped.filter((c) => c.category === filterCategory);
        }

        setCategoryData(mapped);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategoryStats();
  }, [filterCategory]);

  return (
    <section className="category-stats">
      <div className="category-grid">
        {categoryData.map((c, i) => {
          const Icon = ICONS[c.icon] || Etc;
          const rowBg  = withAlpha(c.color, 0.10);
          const isUp   = c.changeType === "increase";
          return (
            <div key={i} className="category-item" style={{ backgroundColor: rowBg }}>
              <div className="category-icon" style={{ color: c.color }}>
                <Icon className="cat-icon" aria-hidden />
              </div>

              <div className="category-info">
                <div className="category-name">{c.name}</div>
              </div>

              <div className={`category-change ${isUp ? "increase" : "decrease"}`}>
                <span className="arrow" aria-hidden>{isUp ? "▲" : "▼"}</span>
                <span className="value">{c.percentage}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};


export default CategoryStats;
export { Environment, Facility, Traffic, Safe, Inconvince, Etc };
