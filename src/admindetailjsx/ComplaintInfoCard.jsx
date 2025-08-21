import React, { useEffect, useState } from "react";
import "../admindetailcss/ComplaintInfoCard.css";
import compInfo from "../images/compInfo.png"; 
import AIbtn2 from "../images/AIbtn2.png";

export default function ComplaintInfoCard({ complaintId }) {
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 환경변수
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
  const ADMIN_PW = process.env.REACT_APP_ADMIN_PASSWORD || "hanseo";

  useEffect(() => {
    if (!complaintId) return; // id가 없으면 요청 안함

    async function fetchComplaint() {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/complaints/${complaintId}`, {
          headers: { PASSWORD: ADMIN_PW }
        });

        if (!res.ok) throw new Error(`API 요청 실패 (${res.status})`);

        const data = await res.json();
        setComplaint(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchComplaint();
  }, [complaintId, BASE_URL, ADMIN_PW]);

  if (loading) return <p className="loading">불러오는 중...</p>;
  if (error) return <p className="error">❌ {error}</p>;
  if (!complaint) return <p className="empty">민원 데이터를 찾을 수 없습니다.</p>;

  return (
    <div className="complaint-card">
      {/* 헤더 */}
      <div className="complaint-header">
        <span className="complaint-icon"><img src={compInfo} alt="민원 정보 아이콘"/></span>
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
        {complaint.imageUrls && complaint.imageUrls.length > 0 ? (
          complaint.imageUrls.map((url, idx) => (
            <img 
              key={idx}
              src={url.startsWith("http") ? url : `${BASE_URL}${url}`} 
              alt={`민원 이미지 ${idx + 1}`} 
              className="complaint-image" 
            />
          ))
        ) : (
          <p className="no-image">첨부 이미지 없음</p>
        )}

        <div className="complaint-tags">
          <span className="tag blue">{complaint.category}</span>
          <img src={AIbtn2} alt="AI 요약 버튼" className="ai-btn" />
        </div>
      </div>

      {/* 작성자 정보 */}
      <div className="complaint-meta">
        <p>작성자명 <h5>{complaint.userName}</h5></p>
        <p className="number">전화번호 <h5>{complaint.phoneNumber}</h5></p>
      </div>
    </div>
  );
}
