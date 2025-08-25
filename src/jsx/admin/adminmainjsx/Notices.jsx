import React, { useEffect, useState } from "react";
import "../../../css/admin/adminmaincss/Notices.css";
import aibtn from "../../../image/admin/AIbtn.png";
import pointicon from "../../../image/admin/pointIcon.png";
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

  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 👉 실제 fetch 대신 더미 사용
    setTimeout(() => {
      setItems(dummyComplaints);
      setTotalCount(dummyComplaints.length);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="notices-container">
        <p>불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="notices-container">
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
            <div
              key={n.id}
              className="notice-card"
              onClick={() =>
                navigate("/admin/details", { state: { complaintId: n.id } })
              }
              style={{ cursor: "pointer" }}
            >
              <div className="notice-header">
                <strong>{n.title}</strong>
                <span className="notice-date">{dateText}</span>
              </div>

              <div className="notice-main">
                <p>{n.content}</p>
                {/* 👉 버튼 대신 그냥 이미지 */}
                <img
                  src={aibtn}
                  alt="AI 요약"
                  style={{ display: "block", width: "40px", height: "40px" }}
                />
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

        <div
          className="notice-separator"
          onClick={() => navigate("/admin/complaints")}
          style={{ cursor: "pointer" }}
        >
          <p>전체 목록 보기 ({totalCount}건) &#10132;</p>
        </div>
      </div>
    </div>
  );
}
