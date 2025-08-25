import React from "react";
import "../../../css/user/main/ComplaintsSummaryCard.css";
import loc from "../../common/ComplaintLoc.svg"; // 🔹 동일 아이콘 사용
import { CATEGORY_MAP, STATUS_MAP } from "../../common/categoryStatusMap"; 

const MyComplaintItem = ({ complaint, onDelete }) => {
  const statusInfo =
    STATUS_MAP[complaint.status] || {
      label: "기타",
      color: "#000000",
      background: "#eeeeee"
    };
  const categoryLabel = CATEGORY_MAP[complaint.category] || "기타/행정";

  const handleEdit = () => {
    alert(`'${complaint.title}' 민원 수정 기능은 구현 예정입니다.`);
  };

  return (
    <li
      className="complaint-card"
      style={{
        width: "90%",
        padding: "1.15rem 1.1rem",
        border: "0.8px solid #BFBFBF",
        background:
          "linear-gradient(180deg, rgba(238,245,255,0.5) 0%, rgba(245,238,255,0.5) 100%)",
        listStyle: "none",
        borderRadius: "12px",
      }}
    >
      {/* 헤더 */}
      <div
        className="card-header"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <p
          className="complaint-title"
          style={{
            color: "#000000",
            fontSize: "1rem",
            fontWeight: 600,
            margin: 0
          }}
        >
          {complaint.title}
          <span
            className="complaint-date"
            style={{
              color: "#5C5C5C",
              fontSize: "0.63rem",
              fontWeight: "400",
              marginLeft: "0.5rem"
            }}
          >
            {complaint.createdAt
              ? new Date(complaint.createdAt).toLocaleDateString("ko-KR")
              : ""}
          </span>
        </p>
        <p
          className="status-text"
          style={{
            color: statusInfo.color,
            backgroundColor: statusInfo.background,
            minWidth: "33px",
            height: "19px",
            padding: "2px 6px",
            margin: 0,
            borderRadius: "30px",
            fontSize: "0.65rem",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {statusInfo.label}
        </p>
      </div>

      {/* 본문 미리보기 */}
      <p
        className="complaint-content"
        style={{
          textAlign: "left",
          fontSize: "12px",
          color: "#5C5C5C",
          padding: "10px 0 0 0",
          margin: "0 0 10px 0",
          lineHeight: 1.5
        }}
      >
        {(complaint.content || "").length > 60
          ? `${complaint.content.slice(0, 60)}...`
          : complaint.content}
      </p>

      {/* 구분선 */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <span
          style={{
            display: "block",
            width: "20rem",
            height: "0.05rem",
            backgroundColor: "#BFBFBF",
            margin: "0.5rem 0"
          }}
        />
      </div>

      {/* 푸터 */}
      <div
        className="card-footer"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "8px"
        }}
      >
        {/* 주소 */}
        <span
          className="complaint-address"
          style={{
            color: "#5C5C5C",
            fontSize: "0.8rem",
            display: "flex",
            alignItems: "center",
            margin: 0
          }}
        >
          <img
            style={{
              width: "19px",
              height: "19px",
              marginRight: "5px",
              display: "inline-block"
            }}
            src={loc}
            alt="loc"
          />
          {complaint.address}
        </span>

        {/* 카테고리 + 액션버튼 */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <button
            className="status-btn"
            style={{
              fontSize: "10px",
              border: "none",
              backgroundColor: "#2563EB",
              color: "#FFFFFF",
              borderRadius: "30px",
              padding: "4px 8px"
            }}
          >
            {categoryLabel}
          </button>

          {/* 수정/삭제 */}
          <div className="action-buttons" style={{ display: "flex", }}>
            
            <button
              onClick={onDelete}
              className="delete-btn"
              style={{
                fontSize: "11px",
                padding: "3px 6px",
                border: "1px solid #DC2626",
                borderRadius: "30px",
                background: " #DC2626",
                color: "#fff"
              }}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MyComplaintItem;
