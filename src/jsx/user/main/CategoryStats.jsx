// CategoryStats.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../css/user/main/CategoryStats.css";

import { ReactComponent as Environment } from "../../../image/User/main/environment.svg";
import { ReactComponent as Facility }    from "../../../image/User/main/facility.svg";
import { ReactComponent as Traffic }     from "../../../image/User/main/traffic.svg";
import { ReactComponent as Safe }        from "../../../image/User/main/safe.svg";
import { ReactComponent as Inconvince }  from "../../../image/User/main/inconvince.svg";
import { ReactComponent as Etc }         from "../../../image/User/main/etc.svg";

const api = axios.create({
  baseURL: "http://13.125.98.203/api",
  timeout: 10000,
});

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

const withAlpha = (hex, a = 0.12) => {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  const v = parseInt(n, 16);
  const r = (v >> 16) & 255, g = (v >> 8) & 255, b = v & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const CategoryStats = ({ filterCategory = null }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategoryStats = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/complaints/categorystat", { signal: controller.signal });

        let mapped = (data || []).map((c) => {
          const mapInfo = CATEGORY_MAP[c.category] || CATEGORY_MAP.OTHERS_ADMIN;
          const percent = typeof c.valuePercent === "number" ? c.valuePercent : 0;
          return {
            category:   c.category,
            name:       mapInfo.name,
            percentage: `${percent.toFixed(1)}%`,
            changeType: c.up ? "increase" : "decrease",
            icon:       mapInfo.icon,
            color:      mapInfo.color,
          };
        });

        if (filterCategory) {
          mapped = mapped.filter((c) => c.category === filterCategory);
        }

        setCategoryData(mapped);
      } catch (e) {
        if (!axios.isCancel(e)) {
          console.error(e);
          setErr("카테고리별 현황을 불러오지 못했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryStats();
    return () => controller.abort();
  }, [filterCategory]);

  if (loading) return <section className="category-stats">로딩 중...</section>;
  if (err)     return <section className="category-stats" style={{color:"#ef4444"}}>{err}</section>;

  return (
    <section className="category-stats">
      <div className="category-grid">
        {categoryData.map((c, i) => {
          const Icon = ICONS[c.icon] || Etc;
          const rowBg  = withAlpha(c.color, 0.10);
          const isUp   = c.changeType === "increase";
          return (
            <div key={`${c.category}-${i}`} className="category-item" style={{ backgroundColor: rowBg }}>
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

        {categoryData.length === 0 && (
          <div className="category-empty">카테고리 데이터가 없습니다.</div>
        )}
      </div>
    </section>
  );
};

export default CategoryStats;
export { Environment, Facility, Traffic, Safe, Inconvince, Etc };
