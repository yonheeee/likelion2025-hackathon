import React, { useEffect, useRef, useState } from "react";
import "../adminmaincss/Notices.css";
import aibtn from "../images/AIbtn.png";
import pointicon from "../images/pointIcon.png";
import { useNavigate } from "react-router-dom";

// --- 더미 데이터 (명세서 형식에 맞춤) ---
const dummyComplaints = [
  {
    id: 1,
    title: "보도블럭 파손",
    content: "산책로 보도블럭이 들떠 있어 보행 불편",
    address: "서산시 중앙로 123",
    categories: ["FACILITY_DAMAGE"],
    createdAt: "2025-08-01T10:30:00.000Z",
    status: "PENDING",
    rejectionReason: null,
    imageUrls: [],
    userName: "홍길동",
  },
  {
    id: 2,
    title: "불법 주정차",
    content: "아파트 입구 불법주차로 차량 통행 곤란",
    address: "서산시 동문동 45-2",
    categories: ["TRAFFIC_PARKING"],
    createdAt: "2025-08-02T15:20:00.000Z",
    status: "PENDING",
    rejectionReason: null,
    imageUrls: [],
    userName: "김철수",
  },
  {
    id: 3,
    title: "가로등 고장",
    content: "야간에 가로등 불이 꺼져서 위험",
    address: "서산시 해미면 99-12",
    categories: ["SAFETY_RISK"],
    createdAt: "2025-08-05T20:10:00.000Z",
    status: "PENDING",
    rejectionReason: null,
    imageUrls: [],
    userName: "이영희",
  },
];

// --- 날짜 변환 함수 ---
const parseIsoUpToMillis = (iso) => {
  if (!iso || typeof iso !== "string") return null;
  const trimmed = iso.replace(/(\.\d{3})\d+$/, "$1");
  const d = new Date(trimmed);
  return isNaN(d) ? null : d;
};

// --- 카테고리 라벨 ---
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

  // --- 바텀시트 상태 ---
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetForId, setSheetForId] = useState(null);
  const [sheetText, setSheetText] = useState("");
  const [sheetLoading, setSheetLoading] = useState(false);

  // 요약 캐시
  const [summaries, setSummaries] = useState({});
  const aiControllers = useRef({});

  // --- 스와이프 다운 상태 ---
  const [dragStartY, setDragStartY] = useState(null);
  const [dragTranslateY, setDragTranslateY] = useState(0);

  useEffect(() => {
    // 👉 실제 fetch 대신 더미 사용
    setTimeout(() => {
      setItems(dummyComplaints);
      setTotalCount(dummyComplaints.length);
      setLoading(false);
    }, 800);
  }, []);

  // 바텀시트 열기 + AI 요약
  const openSheetWithSummary = async (n) => {
    setSheetForId(n.id);
    setSheetText("");
    setSheetOpen(true);

    if (summaries[n.id]) {
      setSheetText(summaries[n.id]);
      return;
    }

    try {
      setSheetLoading(true);
      // --- 실제 API 연동 시 summaryXXX 필드 받아오기 ---
      // const res = await fetch(`${BASE_URL}/api/admin/complaints/${n.id}/ai-summary`, { ... })
      // const data = await res.json();

      // --- 더미 요약 ---
      const data = {
        location: n.address,
        phenomenon: n.content,
        problem: "도로 파손으로 인한 보행 불편",
        risk: "안전사고 우려",
        request: "빠른 조치 필요",
      };

      const summaryText = `
📍 위치: ${data.location}
⚡ 현상: ${data.phenomenon}
❗ 문제: ${data.problem}
🚨 위험: ${data.risk}
✅ 요청: ${data.request}
      `;

      setSummaries((prev) => ({ ...prev, [n.id]: summaryText }));
      setSheetText(summaryText);
    } catch (err) {
      console.error(err);
      setSheetText("❌ 요약을 불러오지 못했습니다.");
    } finally {
      setSheetLoading(false);
    }
  };

  const closeSheet = () => {
    setSheetOpen(false);
    setSheetForId(null);
    setSheetText("");
    setSheetLoading(false);
    setDragStartY(null);
    setDragTranslateY(0);
  };

  const handleProcessClick = () => {
    if (sheetForId == null) return;
    setSheetOpen(false);

    // 👉 details 페이지로 complaintId 전달
    navigate("/admin/details", {
      state: { complaintId: sheetForId },
    });
  };

  // --- 스와이프 핸들러 ---
  const handleTouchStart = (e) => {
    setDragStartY(e.touches[0].clientY);
    setDragTranslateY(0);
  };
  const handleTouchMove = (e) => {
    if (dragStartY === null) return;
    const delta = e.touches[0].clientY - dragStartY;
    if (delta > 0) setDragTranslateY(delta);
  };
  const handleTouchEnd = () => {
    if (dragTranslateY > 100) closeSheet();
    else {
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
                  <img src={pointicon} alt="Point Icon" className="point-icon" />
                  <p>{n.address}</p>
                  <div className="blue-box">
                    <p>{categoryLabel(n.categories?.[0])}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="notice-separator" onclick={() => navigate("/admin/complaints")} style={{ cursor: "pointer" }}>
            <p>전체 목록 보기 ({totalCount}건) &#10132;</p>
          </div>
        </div>
      </div>

      {/* AI 요약 바텀시트 */}
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
          {!sheetLoading && sheetForId != null && (
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
