import React, { useEffect, useState, useCallback } from "react";
import "../../../css/admin/admindetailcss/ComplaintInfoCard.css";
import compInfo from "../../../image/admin/compInfo.png";
import AIbtn2 from "../../../image/admin/AIbtn2.png";
import starImg from "../../../image/admin/star.png";

/** === 카테고리 라벨 === */
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

/** === .env (CRA) === */
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
const AI_BASE  = process.env.REACT_APP_AI_BASE_URL  || API_BASE; // 분리되면 .env만 수정
const ADMIN_PW = process.env.REACT_APP_ADMIN_PASSWORD || "hanseo";

/** 상대경로 이미지 → 절대경로 보정 */
const toAbsoluteUrl = (u) => {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  const base = API_BASE.replace(/\/$/, "");
  const path = u.replace(/^\//, "");
  return `${base}/${path}`;
};

export default function ComplaintInfoCard({ complaintId }) {
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  // === 바텀시트 & AI 요약 상태 ===
  const [sheetOpen, setSheetOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError]     = useState(null);
  const [aiSummary, setAiSummary] = useState(null);

  /** 상세 조회 (명세서: GET /api/admin/complaints/{id}) */
  useEffect(() => {
    if (!complaintId) return;
    const ctrl = new AbortController();

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/admin/complaints/${complaintId}`, {
          headers: { PASSWORD: ADMIN_PW },
          signal: ctrl.signal,
        });
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            throw new Error("접근이 거부되었습니다. 관리자 비밀번호(PASSWORD) 헤더를 확인하세요.");
          }
          throw new Error(`상세 조회 실패 (${res.status})`);
        }
        const data = await res.json();
        setComplaint(data);
      } catch (e) {
        if (e.name === "AbortError") return;
        setError(e?.message || "민원 상세를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [complaintId]);

  /** AI 요약 호출 (명세서: POST /api/admin/complaints/{id}/ai-summary, 빈 바디 가능) */
  const callAiSummary = useCallback(async () => {
    if (!complaintId) return;
    setAiLoading(true);
    setAiError(null);
    setAiSummary(null);
    try {
      const res = await fetch(`${AI_BASE}/api/admin/complaints/${complaintId}/ai-summary`, {
        method: "POST",
        headers: {
          PASSWORD: ADMIN_PW,          // AI 서버에서 불필요하면 제거 가능
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error("AI 요약 권한 오류: PASSWORD 헤더를 확인하세요.");
        }
        throw new Error(`AI 요약 실패 (${res.status})`);
      }
      const data = await res.json();
      setAiSummary(data);
    } catch (e) {
      if (e.name === "AbortError") return;
      setAiError(e?.message || "AI 요약 호출 중 오류가 발생했습니다.");
    } finally {
      setAiLoading(false);
    }
  }, [complaintId]);

  /** AI 버튼 클릭 → 시트 오픈 + 요약 호출 */
  const handleOpenSheet = () => {
    setSheetOpen(true);
    void callAiSummary();
  };

  /** 바텀시트 닫기 */
  const closeSheet = () => setSheetOpen(false);

  /** ESC 로 닫기 + 바텀시트 열릴 때 body 스크롤 잠금 */
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSheetOpen(false);
    if (sheetOpen) {
      window.addEventListener("keydown", onKey);
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = original;
      };
    }
  }, [sheetOpen]);

  if (loading)     return <p className="loading">불러오는 중...</p>;
  if (error)       return <p className="error">❌ {error}</p>;
  if (!complaint)  return <p className="empty">민원 데이터를 찾을 수 없습니다.</p>;

  const firstCategory = complaint.category ?? complaint.categories?.[0];

  return (
    <>
      <div className={`complaint-card ${sheetOpen ? "blurred" : ""}`}>
        {/* 헤더 */}
        <div className="complaint-header">
          <span className="complaint-icon">
            <img src={compInfo} alt="민원 정보 아이콘" />
          </span>
          <span className="complaint-title">민원 정보</span>
        </div>

        {/* 본문 */}
        <div className="complaint-body">
          <h4 className="complaint-subtitle">제목</h4>
          <h3 className="complaint-main-title">{complaint.title}</h3>
          <p className="complaint-text">{complaint.content}</p>
          <p className="complaint-text">📍 {complaint.address}</p>
        </div>

        {/* 푸터 */}
        <div className="complaint-footer">
          {Array.isArray(complaint.imageUrls) && complaint.imageUrls.length > 0 ? (
            complaint.imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={toAbsoluteUrl(url)}
                alt={`민원 이미지 ${idx + 1}`}
                className="complaint-image"
              />
            ))
          ) : (
            <p className="no-image">첨부 이미지 없음</p>
          )}

          <div className="complaint-tags">
            <span className="tag blue">{categoryLabel(firstCategory)}</span>

            {/* === AI 요약 버튼 === */}
            <img
              src={AIbtn2}
              alt="AI 요약 버튼"
              className="ai-btn"
              onClick={handleOpenSheet}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        {/* 작성자 정보 */}
        <div className="complaint-meta">
          <p>
            작성자명 <h5>{complaint.userName}</h5>
          </p>
          <p className="number">
            전화번호 <h5>{complaint.phoneNumber}</h5>
          </p>
        </div>
      </div>

      {/* === 오버레이 & 바텀시트 === */}
      <div
        className={`sheet-overlay ${sheetOpen ? "open" : ""}`}
        onClick={closeSheet}
        aria-hidden={!sheetOpen}
      />
      <div
        className={`ai-sheet ${sheetOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!sheetOpen}
      >
        <div className="ai-sheet-handle" />

        <div className="ai-sheet-header">
          <img src={starImg} alt="별 몽둥이 이미지" className="starImg" />
          <h4>요약하기</h4>
          <button className="ai-sheet-close" onClick={closeSheet} aria-label="닫기">
            ×
          </button>
        </div>

        <div className="ai-sheet-body">
          {aiLoading && <p className="ai-status">요약 생성 중…</p>}
          {aiError && <p className="ai-error">❌ {aiError}</p>}

          {!aiLoading && !aiError && aiSummary && (
            <div className="ai-summary-text">
              {[
                ["📌 위치", aiSummary.location],
                ["🔍 현상", aiSummary.phenomenon],
                ["⚠️ 문제", aiSummary.problem],
                ["🚨 위험", aiSummary.risk],
                ["🛠 요청", aiSummary.request],
              ]
                .filter(([, v]) => !!v)
                .map(([k, v]) => (
                  <p key={k}>
                    <strong>{k}:</strong> {v}
                  </p>
                ))}
            </div>
          )}
        </div>

        <div className="ai-sheet-footer">
          <button className="process-btn" onClick={closeSheet}>
            처리하기
          </button>
        </div>
      </div>
    </>
  );
}
