import React, { useEffect, useState } from "react";
import "../../../css/admin/adminmaincss/Notices.css";
import aibtn from "../../../image/admin/AIbtn.png";
import pointicon from "../../../image/admin/pointIcon.png";
import { useNavigate } from "react-router-dom";

/** === .env (CRA) === */
const API_BASE  = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
const ADMIN_PW  = process.env.REACT_APP_ADMIN_PASSWORD || "hanseo";

/* ----- 유틸: ISO ns/us → ms 로 잘라서 Date 파싱 ----- */
const parseIsoUpToMillis = (iso) => {
  if (!iso || typeof iso !== "string") return null;
  // 소수점 이하가 3자리 초과(마이크로초 등)면 3자리로 슬라이스
  const trimmed = iso.replace(/(\.\d{3})\d+$/, "$1");
  const d = new Date(trimmed);
  return isNaN(d) ? null : d;
};

/* ----- 카테고리 라벨 ----- */
const categoryLabel = (c) => {
  switch (c) {
    case "ENVIRONMENT_CLEANING": return "환경/청소";
    case "FACILITY_DAMAGE":      return "시설물 파손/관리";
    case "TRAFFIC_PARKING":      return "교통/주정차";
    case "SAFETY_RISK":          return "안전/위험";
    case "LIVING_INCONVENIENCE": return "생활 불편";
    case "OTHERS_ADMIN":         return "기타/행정";
    default:                     return c ?? "분류 없음";
  }
};

export default function Notices() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    async function fetchPending() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/admin/complaints/pending`, {
          method: "GET",
          headers: { PASSWORD: ADMIN_PW },
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(`미처리 민원 조회 실패 (${res.status})`);

        const data = await res.json();
        const list = Array.isArray(data?.complaints) ? data.complaints : [];
        const count = typeof data?.totalCount === "number" ? data.totalCount : list.length;

        // 최신 생성일 내림차순
        const sorted = [...list].sort((a, b) => {
          const da = parseIsoUpToMillis(a.createdAt)?.getTime() ?? 0;
          const db = parseIsoUpToMillis(b.createdAt)?.getTime() ?? 0;
          return db - da;
        });

        setItems(sorted);
        setTotalCount(count);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message || "목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchPending();
    return () => ctrl.abort();
  }, []);

  if (loading) {
    return (
      <div className="notices-container">
        <p>불러오는 중...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="notices-container">
        <p className="notice-error">❌ {error}</p>
      </div>
    );
  }

  return (
    <div className="notices-container">
      <div className="notice-section">
        <h3 className="section-title">접수된 미처리 민원</h3>
        <span className="notice-count">{totalCount}</span>

        {items.map((n) => {
          const created = parseIsoUpToMillis(n.createdAt);
          const dateText = created
            ? created.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })
            : "날짜 없음";

          return (
            <div
              key={n.id}
              className="notice-card"
              onClick={() => navigate("/admin/details", { state: { complaintId: n.id } })}
              style={{ cursor: "pointer" }}
            >
              <div className="notice-header">
                <strong>{n.title}</strong>
                <span className="notice-date">{dateText}</span>
              </div>

              <div className="notice-main">
                <p>{n.content}</p>
                <img
                  src={aibtn}
                  alt="AI 요약"
                  style={{ display: "block", width: "40px", height: "40px" }}
                />
              </div>

              <div className="line" />

              <div className="bottom-section">
                <img src={pointicon} alt="Point Icon" className="point-icon" />
                <p>{n.address}</p>
                <div className="blue-box">
                  <p>{categoryLabel(n.category)}</p>
                </div>
              </div>
            </div>
          );
        })}

        <div
          className="notice-separator"
          onClick={() => navigate("/admin/complaints")}
          style={{ cursor: "pointer" }}
        >
          <p>전체 목록 보기 ({totalCount}건) &#10132;</p>
        </div>
      </div>
    </div>
  );
}
