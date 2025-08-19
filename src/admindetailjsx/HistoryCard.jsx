import React from "react";
import "../admindetailcss/HistoryCard.css";
import clockImg from "../images/clock.png"; 
import checkImg from "../images/ok.png";
import plusImg from "../images/plus.png";
import loadImg from "../images/loading.png";

export default function HistoryCard({
  title = "처리이력",
  statusBadge = "접수",
  items = [
    { label: "민원 접수", date: "2025년 8월 20일", done: true },
    { label: "담당자 확인 및 배정", date: "", done: false },
  ],
}) {
  return (
    <section className="hc-card" aria-labelledby="hcTitle">
      {/* 상단 헤더 */}
      <div className="hc-header">
        <div className="hc-header-left">
          <span className="hc-clock" aria-hidden="true">
            <img src={clockImg} alt="시계 아이콘"/>
          </span>
          <h2 id="hcTitle" className="hc-title">{title}</h2>
        </div>
        <span className="hc-badge">{statusBadge}</span>
      </div>

      {/* 타임라인 */}
      <ol className="hc-timeline">
        {items.map((it, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className={`hc-item ${it.done ? "done" : "todo"}`}>
              {/* 왼쪽 아이콘 + 세로 점선 */}
              <div className="hc-rail">
                <div className={`hc-bullet ${it.done ? "is-done" : "is-todo"}`}>
                  <img
                    src={it.done ? checkImg : plusImg}  // ✅ done 여부에 따라 이미지 교체
                    alt={it.done ? "완료 아이콘" : "대기 아이콘"}
                    style={{ width: "2rem", height: "2rem" }}
                  />
                </div>
                {!isLast && <img src={loadImg} alt="로딩 이미지" className="hc-connector"/>}
              </div>

              {/* 오른쪽 본문 */}
              <div className={`hc-body ${it.label === "담당자 확인 및 배정" ? "shift-down" : ""}`}>
  <div className="hc-label">{it.label}</div>
  {it.date ? <div className="hc-date">{it.date}</div> : null}
</div>

            </li>
          );
        })}
      </ol>
    </section>
  );
}
