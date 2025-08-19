import React, { useMemo, useState } from "react";
import "../admindetailcss/CommentSection.css";
import chatImg from "../images/chat.png";

export default function CommentSection({
  title = "코멘트",
  comments = [
    {
      id: 1,
      author: "박영희",
      role: "책임자",
      date: "2025-08-20",
      content:
        "접수해주신 서산 중앙공원 산책로 파손 민원이 접수되었습니다. 현재 담당 부서인 ‘공원녹지과’에 해당 민원이 배정되었으며, 조속히 현장을 확인하고 처리 방안을 모색하도록 하겠습니다.",
    },
    {
      id: 2,
      author: "김철수",
      role: "관리자",
      date: "2025-08-21",
      content:
        "민원을 접수했습니다. 현장 확인 후 빠른 시일 내에 처리하도록 하겠습니다.",
    },
  ],
  maxLen = 500,
  onSend,          // (text) => void
  onReject,        // () => void
}) {
  const [text, setText] = useState("");
  const len = text.length;
  const disabled = len === 0 || len > maxLen;

  const handleSend = () => {
    if (disabled) return;
    onSend?.(text.trim());
    setText("");
  };

  const TitleIcon = useMemo(
    () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3Z" stroke="#4776ff" strokeWidth="1.6" />
        <path d="M12 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" stroke="#4776ff" strokeWidth="1.6" />
      </svg>
    ),
    []
  );

  const SendIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 11.5 21 3l-8.5 18-2.5-7.5L3 11.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <>
    <section className="cmt-card" aria-labelledby="cmtTitle">
      {/* 헤더 */}
      <div className="cmt-header">
        <span className="cmt-title-icon"><img src={chatImg} alt="말풍선 이미지"/></span>
        <h3 id="cmtTitle" className="cmt-title">{title}</h3>
      </div>

      {/* 코멘트 리스트 */}
      <ul className="cmt-list">
        {comments.map((c) => (
          <li key={c.id} className="cmt-item">
            <div className="cmt-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#6c8bff" strokeWidth="1.5"/>
                <path d="M4 20c1.7-3.4 5-5 8-5s6.3 1.6 8 5" stroke="#6c8bff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            <div className="cmt-bubble">
              <div className="cmt-bubble-head">
                <div className="cmt-name">
                  {c.author}<span className="cmt-role">({c.role})</span>
                </div>
                <div className="cmt-date">{c.date}</div>
              </div>
              <p className="cmt-text">{c.content}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* 입력 */}
      <div className="cmt-new">
        <label className="cmt-new-label" htmlFor="cmtTextarea">새 코멘트 작성</label>
        <div className="cmt-input-wrap">
          <textarea
            id="cmtTextarea"
            className="cmt-textarea"
            placeholder="민원자에게 코멘트를 작성하세요"
            maxLength={maxLen}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="cmt-new-footer">
          <span className={`cmt-count ${len > maxLen ? "over" : ""}`}>{len}/{maxLen}</span>
        </div>

        <button
          type="button"
          className={`cmt-send ${disabled ? "disabled" : ""}`}
          onClick={handleSend}
          disabled={disabled}
        >
          <span className="cmt-send-icon">{SendIcon}</span>
          코멘트 전송
        </button>
      </div>
    </section>
    {/* 반려하기 */}
      <div className="cmt-reject-wrap">
        <button type="button" className="cmt-reject-btn" onClick={() => onReject?.()}>
          반려하기
        </button>
      </div>
      </>
  );
}
