import React, { useEffect, useRef, useState } from "react";
import "../adminmaincss/Notices.css";
import aibtn from "../images/AIbtn.png";
import pointicon from "../images/pointIcon.png";
import { useNavigate } from "react-router-dom";

// API 서버 (관리자 백엔드)
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
// AI 서버 (요약 전용 백엔드)
const AI_BASE_URL = process.env.REACT_APP_AI_BASE_URL || "http://localhost:8090";

// ISO 타임스탬프의 초과 정밀도(>ms) 잘라내기
const parseIsoUpToMillis = (iso) => {
  if (!iso || typeof iso !== "string") return null;
  const trimmed = iso.replace(/(\.\d{3})\d+$/, "$1");
  const d = new Date(trimmed);
  return isNaN(d) ? null : d;
};

// 카테고리 라벨
const categoryLabel = (c) => {
  switch (c) {
    case "ENVIRONMENT_CLEANING":
      return "환경/청소";
    case "FACILITY_DAMAGE":
      return "시설물 파손/관리";
    case "TRAFFIC_PARKING":
      return "교통/주정차";
    case "SAFETY_RISK":
      return "안전/위험";
    case "LIVING_INCONVENIENCE":
      return "생활 불편";
    case "OTHERS_ADMIN":
      return "기타/행정";
    default:
      return c ?? "분류 없음";
  }
};

export default function Notices() {
  const navigate = useNavigate();

  const getProcessPath = (id) => `/complaints/${id}/process`;

  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 바텀시트 상태 ---
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetForId, setSheetForId] = useState(null);
  const [sheetText, setSheetText] = useState("");
  const [sheetLoading, setSheetLoading] = useState(false);
  const [sheetError, setSheetError] = useState(null);

  // 요약 캐시 (같은 카드 재요청 방지)
  const [summaries, setSummaries] = useState({}); // { [id]: string }
  const aiControllers = useRef({}); // { [id]: AbortController }

  // --- 스와이프 다운 상태 ---
  const [dragStartY, setDragStartY] = useState(null);
  const [dragTranslateY, setDragTranslateY] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${BASE_URL}/api/admin/complaints/pending`, {
          method: "GET",
          headers: {
            PASSWORD: process.env.REACT_APP_ADMIN_PASSWORD || "hanseo",
            Accept: "application/json",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
          signal: controller.signal,
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            throw new Error(
              `인증 실패 (PASSWORD 헤더 확인 필요, status: ${res.status})`
            );
          }
          throw new Error(`요청 실패 (status: ${res.status})`);
        }

        const data = await res.json();
        const nextItems = Array.isArray(data?.complaints)
          ? data.complaints
          : [];
        const nextTotal = Number.isFinite(data?.totalCount)
          ? data.totalCount
          : nextItems.length;

        setItems(nextItems);
        setTotalCount(nextTotal);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message || String(e));
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  // 바텀시트 열기 + 요약 요청(or 캐시 사용)
  const openSheetWithSummary = async (n) => {
    setSheetForId(n.id);
    setSheetError(null);
    setSheetText("");
    setSheetOpen(true); // 먼저 열어서 모션 시작

    // 캐시가 있으면 즉시 표시
    if (summaries[n.id]) {
      setSheetText(summaries[n.id]);
      return;
    }

    // 이전 요청 취소
    if (aiControllers.current[n.id]) aiControllers.current[n.id].abort();
    const controller = new AbortController();
    aiControllers.current[n.id] = controller;

    setSheetLoading(true);
    try {
      const res = await fetch(`${AI_BASE_URL}/api/ai/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: n.id,
          title: n.title,
          content: n.content,
          address: n.address,
          category: n.category,
          createdAt: n.createdAt,
        }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`요약 요청 실패 (status: ${res.status})`);

      const data = await res.json();
      const summary = data?.summary || "요약 결과가 비어 있습니다.";
      setSummaries((prev) => ({ ...prev, [n.id]: summary }));
      setSheetText(summary);
    } catch (e) {
      if (e.name !== "AbortError") setSheetError(e.message || String(e));
    } finally {
      setSheetLoading(false);
    }
  };

  // 바텀시트 닫기
  const closeSheet = () => {
    setSheetOpen(false);
    setSheetForId(null);
    setSheetText("");
    setSheetError(null);
    setSheetLoading(false);
    setDragStartY(null);
    setDragTranslateY(0);
  };

  // ESC로 닫기 + 바디 스크롤 잠금
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSheetOpen(false);
    if (sheetOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const handleProcessClick = () => {
    if (sheetForId == null) return;
    setSheetOpen(false);
    navigate(getProcessPath(sheetForId), {
      state: {
        summary: summaries[sheetForId] || sheetText || "",
      },
    });
  };

  // --- 스와이프 다운 핸들러 ---
  const handleTouchStart = (e) => {
    setDragStartY(e.touches[0].clientY);
    setDragTranslateY(0);
  };

  const handleTouchMove = (e) => {
    if (dragStartY === null) return;
    const delta = e.touches[0].clientY - dragStartY;
    if (delta > 0) {
      setDragTranslateY(delta);
    }
  };

  const handleTouchEnd = () => {
    if (dragTranslateY > 100) {
      closeSheet();
    } else {
      setDragStartY(null);
      setDragTranslateY(0);
    }
  };

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
        <div className="notice-section">
          <h3 className="section-title">접수된 미처리 민원</h3>
          <span className="notice-count">-</span>
          <div className="notice-error">
            <p style={{ color: "#b00020" }}>
              데이터를 불러오지 못했습니다: {error}
            </p>
            <p style={{ fontSize: 12, opacity: 0.8 }}>
              (확인: 서버 실행 여부, 경로/포트, CORS 설정, PASSWORD 헤더)
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {sheetOpen && (
        <div className="sheet-overlay" onClick={closeSheet} aria-hidden="true" />
      )}

      <div className={`notices-container ${sheetOpen ? "blurred" : ""}`}>
        <div className="notice-section">
          <h3 className="section-title">접수된 미처리 민원</h3>
          <span className="notice-count">{totalCount}</span>

          {items.map((n) => {
            const created = parseIsoUpToMillis(n.createdAt);
            const dateText = created
              ? created.toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "날짜 없음";

            return (
              <div key={n.id} className="notice-card">
                <div className="notice-header">
                  <strong>{n.title}</strong>
                  <span className="notice-date">{dateText}</span>
                </div>

                <div className="notice-main">
                  <p>{n.content}</p>

                  <button
                    type="button"
                    className="ai-button"
                    onClick={() => openSheetWithSummary(n)}
                    title="AI 요약 보기"
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    <img src={aibtn} alt="AI 요약" style={{ display: "block" }} />
                  </button>
                </div>

                <div className="line" />

                <div className="bottom-section">
                  <img
                    src={pointicon}
                    alt="Point Icon"
                    className="point-icon"
                  />
                  <p>{n.address}</p>
                  <div className="blue-box">
                    <p>{categoryLabel(n.category)}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="notice-separator">
            <p>전체 목록 보기 ({totalCount}건) &#10132;</p>
          </div>
        </div>
      </div>

      <div
        className={`ai-sheet ${sheetOpen ? "open" : ""} ${
          dragStartY !== null ? "dragging" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="aiSheetTitle"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: dragTranslateY
            ? `translateY(${dragTranslateY}px)`
            : "translateY(0)",
        }}
      >
        <div className="ai-sheet-handle" />
        <div className="ai-sheet-header">
          <h4 id="aiSheetTitle">AI 요약</h4>
          <button
            className="ai-sheet-close"
            onClick={closeSheet}
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        <div className="ai-sheet-body">
          {sheetLoading && <p className="ai-status">요약 중...</p>}
          {sheetError && <p className="ai-error">요약 실패: {sheetError}</p>}
          {!sheetLoading && !sheetError && sheetForId != null && (
            <pre className="ai-summary-text">
              {sheetText || summaries[sheetForId] || ""}
            </pre>
          )}
        </div>

        <div className="ai-sheet-footer">
          <button
            type="button"
            className="process-btn"
            onClick={handleProcessClick}
            disabled={sheetLoading || sheetForId == null}
            title="이 민원 처리 페이지로 이동"
          >
            처리하기
          </button>
        </div>
      </div>
    </>
  );
}
