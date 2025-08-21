import React, { useEffect, useState } from "react";
import "../admindetailcss/HistoryCard.css";
import clockImg from "../images/clock.png";
import checkImg from "../images/ok.png";
import plusImg from "../images/plus.png";
import loadImg from "../images/loading.png";

export default function HistoryCard({ complaintId }) {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
  const ADMIN_PW = process.env.REACT_APP_ADMIN_PASSWORD || "hanseo";

  useEffect(() => {
    if (!complaintId) return;

    async function fetchHistory() {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/complaints/${complaintId}/history`, {
          headers: { PASSWORD: ADMIN_PW }
        });
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
  }, [complaintId, BASE_URL, ADMIN_PW]);

  if (loading) return <p className="loading">이력 불러오는 중...</p>;
  if (error) return <p className="error">❌ {error}</p>;
  if (!history) return <p className="empty">처리 이력을 찾을 수 없습니다.</p>;

  // API에서 내려주는 데이터 구조 예시
  // history = {
  //   receivedDate: "2025-08-20",
  //   assignedDate: "2025-08-21",
  //   processingDate: null,
  //   completedDate: null
  // }

  const steps = [
    { key: "receivedDate", label: "민원 접수" },
    { key: "assignedDate", label: "담당자 확인 및 배정" },
    { key: "processingDate", label: "처리중" },
    { key: "completedDate", label: "처리완료" },
  ];

  // 가장 최근 완료된 단계 (뱃지에 표시용)
  const latestStep = steps
    .slice()
    .reverse()
    .find((s) => history[s.key] !== null);

  const statusBadge = latestStep ? latestStep.label : "접수 대기";

  return (
    <section className="hc-card" aria-labelledby="hcTitle">
      {/* 상단 헤더 */}
      <div className="hc-header">
        <div className="hc-header-left">
          <span className="hc-clock" aria-hidden="true">
            <img src={clockImg} alt="시계 아이콘" />
          </span>
          <h2 id="hcTitle" className="hc-title">처리이력</h2>
        </div>
        <span className="hc-badge">{statusBadge}</span>
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
                  <img src={loadImg} alt="로딩 이미지" className="hc-connector" />
                )}
              </div>

              {/* 오른쪽 본문 */}
              <div className="hc-body">
                <div className="hc-label">{step.label}</div>
                {done && <div className="hc-date">{history[step.key]}</div>}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
