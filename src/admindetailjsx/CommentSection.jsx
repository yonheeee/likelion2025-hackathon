import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 메인 페이지 이동을 위해 추가
import "../admindetailcss/CommentSection.css";
import chatImg from "../images/chat.png";

export default function CommentSection({ complaintId, title = "코멘트" }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [reason, setReason] = useState("LAW_POLICY"); // API 명세서 기준
  const [detail, setDetail] = useState("");

  const maxLen = 500;
  const len = text.length;
  const disabled = len === 0 || len > maxLen;

  const navigate = useNavigate(); // ✅ 메인 페이지 이동에 사용

  // ===============================
  // 🔹 원래 백엔드 연동 부분
  // const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
  // const ADMIN_PW = process.env.REACT_APP_ADMIN_PASSWORD || "hanseo";
  // ===============================

  // 코멘트 목록 불러오기
  useEffect(() => {
    // 🔹 더미데이터 사용
    const dummyComments = [
      {
        id: 1,
        author: "관리자",
        role: "관리자",
        date: "2025-08-20",
        content: "안녕하세요. 제보해 주셔서 감사합니다. 확인 중입니다."
      },
      {
        id: 2,
        author: "담당자",
        role: "담당자",
        date: "2025-08-21",
        content: "현장 확인을 진행했습니다. 추가 조치 예정입니다."
      }
    ];
    setComments(dummyComments);

    // 🔹 원래는 이렇게 fetch
    /*
    if (!complaintId) return;
    async function fetchComments() {
      try {
        setLoading(true);
        const res = await fetch(
          `${BASE_URL}/api/admin/complaints/${complaintId}/comments`,
          { headers: { PASSWORD: ADMIN_PW } }
        );
        if (!res.ok) throw new Error(`API 요청 실패 (${res.status})`);
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
    */
  }, [complaintId]);

  // 코멘트 전송
  const handleSend = async () => {
    if (disabled || !complaintId) return;

    // 🔹 더미데이터 모드에서는 로컬에 추가
    const newComment = {
      id: Date.now(),
      author: "관리자",
      role: "관리자",
      date: new Date().toISOString().slice(0, 10),
      content: text.trim(),
    };
    setComments((prev) => [...prev, newComment]);
    setText("");

    // 🔹 원래는 이렇게 POST
    /*
    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/complaints/${complaintId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            PASSWORD: ADMIN_PW,
          },
          body: JSON.stringify({ content: text.trim() }),
        }
      );
      if (!res.ok) throw new Error(`코멘트 전송 실패 (${res.status})`);
      const newComment = await res.json();
      setComments((prev) => [...prev, newComment]);
      setText("");
    } catch (err) {
      alert("코멘트 전송 실패: " + err.message);
    }
    */
  };

  // 반려 확인
  const confirmReject = async () => {
    if (!complaintId) return;

    // 🔹 더미 모드에서는 alert 후 메인 페이지 이동
    alert(`(더미) 민원 반려 처리됨\n사유: ${reason}\n세부내용: ${detail}`);
    setSheetOpen(false);
    setDetail("");
    navigate("/admin/main"); // ✅ 메인 페이지 이동

    // 🔹 원래는 이렇게 POST 요청 (DB에서 삭제 ❌, 상태만 반려로 업데이트)
    /*
    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/complaints/${complaintId}/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            PASSWORD: ADMIN_PW,
          },
          body: JSON.stringify({ reason, detail: detail.trim() }),
        }
      );
      if (!res.ok) throw new Error(`반려 처리 실패 (${res.status})`);
      alert("민원이 성공적으로 반려되었습니다.");
      setSheetOpen(false);
      setDetail("");
      navigate("/"); // ✅ 메인 페이지 이동
    } catch (err) {
      alert("반려 실패: " + err.message);
    }
    */
  };

  // ESC로 닫기 + 스크롤 제어
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSheetOpen(false);

    if (sheetOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      setReason("LAW_POLICY");
      setDetail("");
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const SendIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 11.5 21 3l-8.5 18-2.5-7.5L3 11.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      {sheetOpen && (
        <div
          className="cmt-overlay"
          onClick={() => setSheetOpen(false)}
          aria-hidden="true"
        />
      )}

      <section
        className={`cmt-card ${sheetOpen ? "blurred" : ""}`}
        aria-labelledby="cmtTitle"
      >
        {/* 헤더 */}
        <div className="cmt-header">
          <span className="cmt-title-icon">
            <img src={chatImg} alt="말풍선 이미지" />
          </span>
          <h3 id="cmtTitle" className="cmt-title">
            {title}
          </h3>
        </div>

        {/* 코멘트 리스트 */}
        {loading && <p className="loading">불러오는 중...</p>}
        {error && <p className="error">❌ {error}</p>}
        <ul className="cmt-list">
          {comments.map((c) => (
            <li key={c.id} className="cmt-item">
              <div className="cmt-avatar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="#6c8bff"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M4 20c1.7-3.4 5-5 8-5s6.3 1.6 8 5"
                    stroke="#6c8bff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="cmt-bubble">
                <div className="cmt-bubble-head">
                  <div className="cmt-name">
                    {c.author}
                    <span className="cmt-role">({c.role})</span>
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
          <label className="cmt-new-label" htmlFor="cmtTextarea">
            새 코멘트 작성
          </label>
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
            <span className={`cmt-count ${len > maxLen ? "over" : ""}`}>
              {len}/{maxLen}
            </span>
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

      {/* 반려 버튼 */}
      <div className={`cmt-reject-wrap ${sheetOpen ? "blurred" : ""}`}>
        <button
          type="button"
          className="cmt-reject-btn"
          onClick={() => setSheetOpen(true)}
        >
          반려하기
        </button>
      </div>

      {/* 바텀시트: 반려 */}
      <div
        className={`reject-sheet ${sheetOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rejectTitle"
      >
        <div className="reject-handle" />
        <div className="reject-header">
          <h4 id="rejectTitle">민원을 반려하시겠습니까?</h4>
          <button
            className="reject-close"
            onClick={() => setSheetOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        <div className="reject-body">
          <form className="reject-form">
            {/* 라디오 버튼 */}
            <label className="reject-option">
              <input
                type="radio"
                name="reason"
                value="LAW_POLICY"
                checked={reason === "LAW_POLICY"}
                onChange={(e) => setReason(e.target.value)}
              />
              <span>관련 법령 및 규정 불일치 (법적/정책적 불가)</span>
            </label>
            <label className="reject-option">
              <input
                type="radio"
                name="reason"
                value="DUPLICATE"
                checked={reason === "DUPLICATE"}
                onChange={(e) => setReason(e.target.value)}
              />
              <span>기존 민원과 동일/유사 (중복 민원)</span>
            </label>
            <label className="reject-option">
              <input
                type="radio"
                name="reason"
                value="INSUFFICIENT_INFO"
                checked={reason === "INSUFFICIENT_INFO"}
                onChange={(e) => setReason(e.target.value)}
              />
              <span>정보 부족 또는 내용 불분명 (처리 불가)</span>
            </label>
            <label className="reject-option">
              <input
                type="radio"
                name="reason"
                value="OUT_OF_SCOPE"
                checked={reason === "OUT_OF_SCOPE"}
                onChange={(e) => setReason(e.target.value)}
              />
              <span>관할 행정기관 외의 사안 (관할 이송 불가 시)</span>
            </label>
            <label className="reject-option">
              <input
                type="radio"
                name="reason"
                value="PRIVATE_CONFLICT"
                checked={reason === "PRIVATE_CONFLICT"}
                onChange={(e) => setReason(e.target.value)}
              />
              <span>사적 분쟁 또는 개인적 이해관계 (공공성 결여)</span>
            </label>
            <label className="reject-option">
              <input
                type="radio"
                name="reason"
                value="INAPPROPRIATE"
                checked={reason === "INAPPROPRIATE"}
                onChange={(e) => setReason(e.target.value)}
              />
              <span>욕설, 비방, 허위 사실 유포 등 부적절한 내용</span>
            </label>
            <label className="reject-option">
              <input
                type="radio"
                name="reason"
                value="ALREADY_RESOLVED"
                checked={reason === "ALREADY_RESOLVED"}
                onChange={(e) => setReason(e.target.value)}
              />
              <span>이미 처리 완료된 사안 (재검토 불필요)</span>
            </label>
            <label className="reject-option">
              <input
                type="radio"
                name="reason"
                value="OTHER"
                checked={reason === "OTHER"}
                onChange={(e) => setReason(e.target.value)}
              />
              <span>기타</span>
            </label>

            {reason === "OTHER" && (
              <textarea
                className="reject-textarea"
                placeholder="내용을 입력하세요"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            )}
          </form>
        </div>

        <div className="reject-actions">
          <button
            type="button"
            className="reject-cancel"
            onClick={() => setSheetOpen(false)}
          >
            취소
          </button>
          <button
            type="button"
            className="reject-confirm"
            onClick={confirmReject}
          >
            반려하기
          </button>
        </div>
      </div>
    </>
  );
}
