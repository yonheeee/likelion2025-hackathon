import React, { useEffect, useState } from "react";
import "../../../css/admin/admindetailcss/HistoryCard.css";
import clockImg from "../../../image/admin/clock.png";
import checkImg from "../../../image/admin/ok.png";
import plusImg from "../../../image/admin/plus.png";
import loadImg from "../../../image/admin/loading.png";

export default function HistoryCard({ complaintId }) {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===============================
  // 🔹 날짜 포맷팅 함수 (YYYY-MM-DD만)
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const d = new Date(dateString);
    if (isNaN(d)) return dateString; // 파싱 실패 시 원본 그대로
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  // ===============================

  useEffect(() => {
    if (!complaintId) return;

    // 🔹 더미데이터 (ISO 형식)
    const dummyHistory = {
      receivedDate: "2025-08-20T12:00:00",
      assignedDate: "2025-08-21T09:30:00",
      processingDate: "2025-08-22T14:10:00",
      completedDate: null, // 아직 완료 안 된 상태
    };

    setTimeout(() => {
      setHistory(dummyHistory);
      setLoading(false);
    }, 500);

    // ===============================
    // 🔹 원래는 이렇게 fetch 했음 (배포 시 환경변수 사용 권장)
    /*
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const ADMIN_PW = process.env.REACT_APP_ADMIN_PASSWORD;

    async function fetchHistory() {
      try {
        const res = await fetch(
          `${BASE_URL}/api/admin/complaints/${complaintId}/history`,
          {
            headers: { PASSWORD: ADMIN_PW },
          }
        );
        if (!res.ok) throw new Error(`API 요청 실패 (${res.status})`);

        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
    */
    // ===============================
  }, [complaintId]);

  if (loading) return <p className="loading">이력 불러오는 중...</p>;
  if (error) return <p className="error">❌ {error}</p>;
  if (!history) return <p className="empty">처리 이력을 찾을 수 없습니다.</p>;

  const steps = [
    { key: "receivedDate", label: "민원 접수" },
    { key: "assignedDate", label: "담당자 확인 및 배정" },
    { key: "processingDate", label: "처리중" },
    { key: "completedDate", label: "처리완료" },
  ];

  // 가장 최근 완료된 단계
  const latestStep = steps
    .slice()
    .reverse()
    .find((s) => history[s.key] !== null);

  // 뱃지 상태 결정
  let statusBadge = "접수 대기";
  if (latestStep) {
    if (latestStep.key === "receivedDate") statusBadge = "접수";
    else if (
      latestStep.key === "assignedDate" ||
      latestStep.key === "processingDate"
    )
      statusBadge = "처리중";
    else if (latestStep.key === "completedDate") statusBadge = "완료";
  }

  return (
    <section className="hc-card" aria-labelledby="hcTitle">
      {/* 상단 헤더 */}
      <div className="hc-header">
        <div className="hc-header-left">
          <span className="hc-clock" aria-hidden="true">
            <img src={clockImg} alt="시계 아이콘" />
          </span>
          <h2 id="hcTitle" className="hc-title">
            처리이력
          </h2>
        </div>

        {/* 상태 뱃지 */}
        <span
          className="hc-badge"
          style={
            statusBadge === "처리중"
              ? { backgroundColor: "#CFF5D7", color: "#009921" }
              : statusBadge === "완료"
              ? { backgroundColor: "#DBE8FF", color: "#2B62EC" }
              : {}
          }
        >
          {statusBadge}
        </span>
      </div>

      {/* 타임라인 */}
      <ol className="hc-timeline">
        {steps.map((step, i) => {
          const done = history[step.key] !== null;
          const isLast = i === steps.length - 1;
          return (
            <li key={step.key} className={`hc-item ${done ? "done" : "todo"}`}>
              {/* 왼쪽 아이콘 + 세로 점선 */}
              <div className="hc-rail">
                <div className={`hc-bullet ${done ? "is-done" : "is-todo"}`}>
                  <img
                    src={done ? checkImg : plusImg}
                    alt={done ? "완료 아이콘" : "대기 아이콘"}
                    style={{ width: "2rem", height: "2rem" }}
                  />
                </div>
                {!isLast && (
                  <img
                    src={loadImg}
                    alt="로딩 이미지"
                    className="hc-connector"
                  />
                )}
              </div>

              {/* 오른쪽 본문 */}
              <div className="hc-body">
                <div className="hc-label">{step.label}</div>
                {done && (
                  <div className="hc-date">
                    {formatDate(history[step.key])}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
