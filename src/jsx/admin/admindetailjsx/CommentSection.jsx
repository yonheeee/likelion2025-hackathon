import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/admin/admindetailcss/CommentSection.css";
import chatImg from "../../../image/admin/chat.png";

/** === .env (CRA) === */
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
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
  if (!dateString) return "";
  const d = toDateSafely(dateString) ?? new Date(dateString);
  if (isNaN(d)) return dateString;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default function CommentSection({ complaintId, title = "코멘트" }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [reason, setReason] = useState("LAW_POLICY"); // 명세 기준 사유코드
  const [detail, setDetail] = useState("");

  const maxLen = 500;
  const len = text.length;
  const disabled = len === 0 || len > maxLen;

  const navigate = useNavigate();

  /** 코멘트 목록 불러오기 */
  useEffect(() => {
    if (!complaintId) return;
    const ctrl = new AbortController();

    async function fetchComments() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${BASE_URL}/api/admin/complaints/${complaintId}/comments`,
          {
            headers: { PASSWORD: ADMIN_PW },
            signal: ctrl.signal,
          }
        );
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            throw new Error("접근이 거부되었습니다. 관리자 비밀번호(PASSWORD) 헤더를 확인하세요.");
          }
          throw new Error(`코멘트 목록 조회 실패 (${res.status})`);
        }
        const data = await res.json();
        // 방어적 파싱: 배열 또는 {comments: []}
        const list = Array.isArray(data)
          ? data
          : (Array.isArray(data.comments) ? data.comments : []);
        setComments(list);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "코멘트를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
    return () => ctrl.abort();
  }, [complaintId]);

  /** 코멘트 전송 */
  const handleSend = async () => {
    if (disabled || !complaintId) return;
    try {
      setLoading(true);
      setError(null);
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
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error("코멘트 권한 오류: PASSWORD 헤더를 확인하세요.");
        }
        throw new Error(`코멘트 전송 실패 (${res.status})`);
      }
      // 보통은 새 코멘트를 반환한다고 가정. 아니라면 재조회로 대체
      const created = await res.json().catch(() => null);

      if (created && (created.id || created.content)) {
        setComments((prev) => [...prev, created]);
      } else {
        // 반환 형식이 없거나 다르면 목록 재조회
        const listRes = await fetch(
          `${BASE_URL}/api/admin/complaints/${complaintId}/comments`,
          { headers: { PASSWORD: ADMIN_PW } }
        );
        if (listRes.ok) {
          const data = await listRes.json();
          const list = Array.isArray(data)
            ? data
            : (Array.isArray(data.comments) ? data.comments : []);
          setComments(list);
        }
      }
      setText("");
    } catch (err) {
      alert("코멘트 전송 실패: " + (err.message || "네트워크 오류"));
    } finally {
      setLoading(false);
    }
  };

  /** 반려 처리 */
  const confirmReject = async () => {
    if (!complaintId) return;
    try {
      setLoading(true);
      setError(null);
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
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error("반려 권한 오류: PASSWORD 헤더를 확인하세요.");
        }
        throw new Error(`반려 처리 실패 (${res.status})`);
      }
      alert("민원이 성공적으로 반려되었습니다.");
      setSheetOpen(false);
      setDetail("");
      navigate("/admin/main"); // 필요에 따라 라우트 조정
    } catch (err) {
      alert("반려 실패: " + (err.message || "네트워크 오류"));
    } finally {
      setLoading(false);
    }
  };

  /** ESC로 닫기 + 스크롤 제어 */
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSheetOpen(false);

    if (sheetOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      // 시트 열릴 때 기본값 초기화
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
            <li key={c.id ?? `${c.author}-${c.createdAt ?? c.date}`}>
              <div className="cmt-item">
                <div className="cmt-avatar">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="#6c8bff" strokeWidth="1.5" />
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
                      {c.author ?? c.writer ?? "관리자"}
                      <span className="cmt-role">
                        ({c.role ?? c.roleName ?? "관리자"})
                      </span>
                    </div>
                    <div className="cmt-date">
                      {formatDate(c.createdAt ?? c.date)}
                    </div>
                  </div>
                  <p className="cmt-text">{c.content}</p>
                </div>
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
            disabled={disabled || loading}
            title={disabled ? "내용을 입력하세요" : ""}
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
          <form className="reject-form" onSubmit={(e) => e.preventDefault()}>
            {/* 라디오 버튼 */}
            {[
              ["LAW_POLICY", "관련 법령 및 규정 불일치 (법적/정책적 불가)"],
              ["DUPLICATE", "기존 민원과 동일/유사 (중복 민원)"],
              ["INSUFFICIENT_INFO", "정보 부족 또는 내용 불분명 (처리 불가)"],
              ["OUT_OF_SCOPE", "관할 행정기관 외의 사안 (관할 이송 불가 시)"],
              ["PRIVATE_CONFLICT", "사적 분쟁 또는 개인적 이해관계 (공공성 결여)"],
              ["INAPPROPRIATE", "욕설, 비방, 허위 사실 유포 등 부적절한 내용"],
              ["ALREADY_RESOLVED", "이미 처리 완료된 사안 (재검토 불필요)"],
              ["OTHER", "기타"],
            ].map(([val, label]) => (
              <label key={val} className="reject-option">
                <input
                  type="radio"
                  name="reason"
                  value={val}
                  checked={reason === val}
                  onChange={(e) => setReason(e.target.value)}
                />
                <span>{label}</span>
              </label>
            ))}

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
            disabled={loading}
          >
            반려하기
          </button>
        </div>
      </div>
    </>
  );
}
