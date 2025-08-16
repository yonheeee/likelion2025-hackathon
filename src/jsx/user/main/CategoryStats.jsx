import React from "react";
import "../../../css/user/main/CategoryStats.css";

// 경로/대소문자는 실제 폴더명에 맞춰주세요
import { ReactComponent as Environment } from "../../../image/User/main/environment.svg";
import { ReactComponent as Facility }    from "../../../image/User/main/facility.svg";
import { ReactComponent as Traffic }     from "../../../image/User/main/traffic.svg";
import { ReactComponent as Safe }        from "../../../image/User/main/safe.svg";
import { ReactComponent as Inconvince }  from "../../../image/User/main/inconvince.svg";
import { ReactComponent as Etc }         from "../../../image/User/main/etc.svg";

const ICONS = {
  environment: Environment,
  facility:    Facility,
  traffic:     Traffic,
  safe:        Safe,
  inconvince:  Inconvince,
  etc:         Etc,
};

// HEX → rgba (옅은 배경용)
const withAlpha = (hex, a = 0.12) => {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  const v = parseInt(n, 16);
  const r = (v >> 16) & 255, g = (v >> 8) & 255, b = v & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const CategoryStats = () => {
  const categoryData = [
    { name: "환경/청소",       percentage: "4.5%",  changeType: "increase", icon: "environment", color: "#10B981" },
    { name: "시설물 파손/관리", percentage: "4.5%",  changeType: "decrease", icon: "facility",    color: "#F59E0B" },
    { name: "교통/주정차",     percentage: "25.8%", changeType: "increase", icon: "traffic",     color: "#3B82F6" },
    { name: "안전/위험",       percentage: "8.3%",  changeType: "increase", icon: "safe",        color: "#EF4444" },
    { name: "생활 불편",       percentage: "12.6%", changeType: "decrease", icon: "inconvince",  color: "#8B5CF6" },
    { name: "기타/행정",       percentage: "3.2%",  changeType: "decrease", icon: "etc",         color: "#6B7280" },
  ];

  return (
    <section className="category-stats">
      <h3 className="category-title">카테고리별 민원 현황</h3>

      <div className="category-grid">
        {categoryData.map((c, i) => {
          const Icon = ICONS[c.icon] || Etc;
          const rowBg  = withAlpha(c.color, 0.10); // 행 전체 옅은 배경
          const iconBg = withAlpha(c.color, 0.22); // 아이콘 캡슐 배경
          const isUp   = c.changeType === "increase";
          return (
            <div key={i} className="category-item" style={{ backgroundColor: rowBg }}>
              <div className="category-icon" style={{color: c.color }}>
                <Icon className="cat-icon" aria-hidden />
              </div>

              <div className="category-info">
                <div className="category-name">{c.name}</div>
                {/* 중앙 큰 퍼센트는 왼쪽 디자인에 없어서 제거 */}
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
