import React, { useEffect, useState } from "react";
import "../../../css/admin/admindetailcss/HistoryCard.css";
import clockImg from "../../../image/admin/clock.png";
import checkImg from "../../../image/admin/ok.png";
import plusImg from "../../../image/admin/plus.png";
import loadImg from "../../../image/admin/loading.png";

/** === .env (CRA) === */
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
const ADMIN_PW = process.env.REACT_APP_ADMIN_PASSWORD || "hanseo";

/** 마이크로초(>ms) 포함 ISO → ms(3자리)로 잘라 Date 생성 */
const toDateSafely = (iso) => {
  if (!iso || typeof iso !== "string") return null;
  const trimmed = iso.replace(/(\.\d{3})\d+$/, "$1");
  const d = new Date(trimmed);
  return isNaN(d) ? null : d;
};

/** 날짜 포맷: YYYY-MM-DD (파싱 실패 시 원문 반환) */
const formatDate = (dateString) => {
  if (!dateString) return null;
  const d = toDateSafely(dateString);
  if (!d) return dateString;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default function HistoryCard({ complaintId }) {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!complaintId) return;
    const ctrl = new AbortController();

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_BASE}/api/admin/complaints/${complaintId}/history`,
          {
            headers: { PASSWORD: ADMIN_PW },
            signal: ctrl.signal,
          }
        );
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            throw new Error("접근이 거부되었습니다. 관리자 비밀번호(PASSWORD) 헤더를 확인하세요.");
          }
          throw new Error(`이력 조회 실패 (${res.status})`);
        }
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "처리 이력을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [complaintId]);

  if (loading) return <p className="loading">이력 불러오는 중...</p>;
  if (error) return <p className="error">❌ {error}</p>;
  if (!history) return <p className="empty">처리 이력을 찾을 수 없습니다.</p>;

  const steps = [
    { key: "receivedDate",   label: "민원 접수" },
    { key: "assignedDate",   label: "담당자 확인 및 배정" },
    { key: "processingDate", label: "처리중" },
    { key: "completedDate",  label: "처리완료" },
  ];

  // 가장 최근 완료된 단계 (null/undefined가 아닌 값을 완료로 간주)
  const latestStep = [...steps].reverse().find((s) => history[s.key] != null);

  // 뱃지 상태 결정
  let statusBadge = "접수 대기";
  if (latestStep) {
    if (latestStep.key === "receivedDate") statusBadge = "접수";
    else if (latestStep.key === "assignedDate" || latestStep.key === "processingDate") statusBadge = "처리중";
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
          const done = history[step.key] != null;
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
