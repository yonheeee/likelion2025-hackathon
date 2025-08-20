import React, { useEffect, useState } from "react";
import "../admindetailcss/ComplaintInfoCard.css";
import compInfo from "../images/compInfo.png"; 
import AIbtn2 from "../images/AIbtn2.png";

// --- 카테고리 라벨 변환 ---
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

export default function ComplaintInfoCard({ complaintId }) {
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 환경변수 (백엔드 주소 / 관리자 비밀번호)
  // const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
  // const ADMIN_PW = process.env.REACT_APP_ADMIN_PASSWORD || "hanseo";

  useEffect(() => {
    if (!complaintId) return;

    async function fetchComplaint() {
      try {
        // 👉 백엔드 연동 시
        /*
        const res = await fetch(`${BASE_URL}/api/admin/complaints/${complaintId}`, {
          headers: { PASSWORD: ADMIN_PW }
        });

        if (!res.ok) throw new Error(`API 요청 실패 (${res.status})`);

        const data = await res.json();
        setComplaint(data);
        */

        // 👉 더미 데이터 (프론트 확인용)
        const dummyData = {
          title: "가로등 고장 신고",
          content: "우리 동네 가로등이 밤에 켜지지 않습니다. 빠른 수리 부탁드립니다.",
          address: "서울특별시 강남구 테헤란로 123",
          imageUrls: ["https://via.placeholder.com/150"],
          categories: ["FACILITY_DAMAGE"],
          userName: "홍길동",
          phoneNumber: "010-1234-5678"
        };
        setComplaint(dummyData);

      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchComplaint();
  }, [complaintId]);

  if (loading) return <p className="loading">불러오는 중...</p>;
  if (error) return <p className="error">❌ {error}</p>;
  if (!complaint) return <p className="empty">민원 데이터를 찾을 수 없습니다.</p>;

  return (
    <div className="complaint-card">
      {/* 헤더 */}
      <div className="complaint-header">
        <span className="complaint-icon">
          <img src={compInfo} alt="민원 정보 아이콘"/>
        </span>
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
              src={url}
              alt={`민원 이미지 ${idx + 1}`} 
              className="complaint-image" 
            />
          ))
        ) : (
          <p className="no-image">첨부 이미지 없음</p>
        )}

        <div className="complaint-tags">
          <span className="tag blue">
            {categoryLabel(complaint.categories?.[0])}
          </span>
          <img src={AIbtn2} alt="AI 요약 버튼" className="ai-btn" />
        </div>
      </div>

      {/* 작성자 정보 */}
      <div className="complaint-meta">
        <p>
          작성자명 <h5>{complaint.userName}</h5>
        </p>
        <p className="number">
          전화번호 <h5>{complaint.phoneNumber}</h5>
        </p>
      </div>
    </div>
  );
}
