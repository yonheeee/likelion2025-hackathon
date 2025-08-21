import React, { useEffect, useState } from "react";
import "../adminmaincss/CategoryLinks.css";
import plant from "../images/plant.png";
import building from "../images/building.png";
import car from "../images/car.png";
import shield from "../images/shield.png";
import life from "../images/life.png";
import etc from "../images/etc.png";
import { useNavigate } from "react-router-dom";

export default function CategoryLinks() {
  const navigate = useNavigate();
  const [complaintCounts, setComplaintCounts] = useState({});

  // 백엔드 연결 상태
  const [apiStatus, setApiStatus] = useState({
    state: "idle",     // 'idle' | 'loading' | 'ok' | 'error'
    took: null,        // ms
    error: null,       // string
    checkedAt: null,   // Date
  });

  const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
  const ADMIN_PW = process.env.REACT_APP_ADMIN_PASSWORD || "hanseo";

  const categories = [
    { name: "환경/청소",       icon: plant,    color: "first",  category: "environment" },
    { name: "시설물 파손/관리", icon: building, color: "second", category: "facility"   },
    { name: "교통/주정차",     icon: car,      color: "third",  category: "traffic"    },
    { name: "안전/위험",       icon: shield,   color: "fourth", category: "safety"     },
    { name: "생활 불편",       icon: life,     color: "fifth",  category: "life"       },
    { name: "기타/행정",       icon: etc,      color: "sixth",  category: "etc"        },
  ];

  // 민원 수 불러오기
  const loadCounts = async (signal) => {
    const start = performance.now();
    setApiStatus({ state: "loading", took: null, error: null, checkedAt: null });

    try {
      const res = await fetch(`${BASE_URL}/api/admin/complaints/categories`, {
        method: "GET",
        headers: {
          PASSWORD: ADMIN_PW,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        signal,
      });

      if (!res.ok) throw new Error(`API 오류: ${res.status}`);

      const arr = await res.json();
      console.info("[CategoryLinks] 카테고리 응답:", arr);

      const map = arr.reduce((acc, { category, count }) => {
        switch (category) {
          case "ENVIRONMENT_CLEANING":  acc.environment = count; break;
          case "FACILITY_DAMAGE":       acc.facility   = count; break;
          case "TRAFFIC_PARKING":       acc.traffic    = count; break;
          case "SAFETY_RISK":           acc.safety     = count; break;
          case "LIVING_INCONVENIENCE":  acc.life       = count; break;
          case "OTHERS_ADMIN":          acc.etc        = count; break;
          default: break;
        }
        return acc;
      }, {
        environment: 0,
        facility: 0,
        traffic: 0,
        safety: 0,
        life: 0,
        etc: 0,
      });

      setComplaintCounts(map);

      const took = Math.round(performance.now() - start);
      setApiStatus({
        state: "ok",
        took,
        error: null,
        checkedAt: new Date(),
      });
    } catch (err) {
      if (err.name === "AbortError") return;
      const took = Math.round(performance.now() - start);
      console.error("민원 수 불러오기 실패:", err);
      setApiStatus({
        state: "error",
        took,
        error: err.message || String(err),
        checkedAt: new Date(),
      });
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    loadCounts(ac.signal);
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRetry = () => {
    const ac = new AbortController();
    loadCounts(ac.signal);
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  // 상태 뱃지 스타일
  const badgeBase = {
    marginLeft: 8,
    fontSize: 12,
    padding: "2px 8px",
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  };
  const badgeStyles = {
    idle:   { ...badgeBase, background: "#eef0f2", border: "1px solid #dde1e6", color: "#333" },
    loading:{ ...badgeBase, background: "#fff3cd", border: "1px solid #ffe69c", color: "#7a5b00" },
    ok:     { ...badgeBase, background: "#d1e7dd", border: "1px solid #badbcc", color: "#0f5132" },
    error:  { ...badgeBase, background: "#f8d7da", border: "1px solid #f5c2c7", color: "#842029" },
  };

  return (
    <div className="category-wrapper">
      <h3 className="category-title" style={{ display: "flex", alignItems: "center" }}>
        카테고리별 민원
        <span
          style={badgeStyles[apiStatus.state] || badgeStyles.idle}
          aria-live="polite"
          title={
            apiStatus.checkedAt
              ? `마지막 확인: ${apiStatus.checkedAt.toLocaleString()}`
              : undefined
          }
        >
          {apiStatus.state === "loading" && "백엔드 연결 확인 중..."}
          {apiStatus.state === "ok" && `연결 성공${apiStatus.took != null ? ` (${apiStatus.took}ms)` : ""}`}
          {apiStatus.state === "error" && `연결 실패${apiStatus.took != null ? ` (${apiStatus.took}ms)` : ""}`}
          {apiStatus.state !== "loading" && (
            <button
              type="button"
              onClick={handleRetry}
              style={{
                marginLeft: 6,
                fontSize: 12,
                cursor: "pointer",
                background: "transparent",
                border: "none",
                textDecoration: "underline",
                padding: 0,
              }}
            >
              재시도
            </button>
          )}
        </span>
      </h3>

      <div className="category">
        {categories.map((cat) => {
          const count = complaintCounts[cat.category] ?? 0;
          return (
            <button
              key={cat.category}
              className={`category-card ${cat.color}`}
              onClick={() => handleCategoryClick(cat.category)}
              style={{ cursor: "pointer",
                border: "none",
               }}
            >
              <span>
                {cat.name}
                <p>{count}건의 미처리 민원이 있습니다</p>
              </span>
              <img src={cat.icon} alt={cat.name} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
