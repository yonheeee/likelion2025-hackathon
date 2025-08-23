import React from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../PageHeader.jsx";
import complaints from "../../common/dummydata.js";
import "../../../css/user/catagory/UserCatagory.css";

// 아이콘 import
import {
  Environment,
  Facility,
  Traffic,
  Safe,
  Inconvince,
  Etc,
} from "../../user/main/CategoryStats.jsx";

const CATEGORY_META = {
  TRAFFIC_PARKING: { label: "교통/주정차", icon: Traffic, progress: 25.8 },
  FACILITY_DAMAGE: { label: "시설물 파손/관리", icon: Facility, progress: 40.2 },
  SAFETY_RISK: { label: "안전/위험", icon: Safe, progress: 12.7 },
  ENVIRONMENT_CLEANING: { label: "환경/청소", icon: Environment, progress: 31.5 },
  LIVING_INCONVENIENCE: { label: "생활/불편", icon: Inconvince, progress: 18.0 },
  OTHERS_ADMIN: { label: "기타/행정", icon: Etc, progress: 5.2 },
};

const STATUS_MAP = {
  PENDING: { label: "접수", color: "#A65F00", background: "#FFEDD5" },
  IN_PROGRESS: { label: "진행중", color: "#009921", background: "#CFF5D7" },
  COMPLETED: { label: "완료", color: "#2B62EC", background: "#DBE8FF" },
  REJECTED: { label: "반려", color: "#D70000", background: "#FEF2F2" },
};

export default function CategoryComplaintPage() {
  const { categoryCode } = useParams();

  // ✅ 지금은 FACILITY_DAMAGE 고정, 나중에 주석 해제하면 params 값 사용 가능
  // const normalizedCode = String(categoryCode).toUpperCase();
  const normalizedCode = "FACILITY_DAMAGE"; // <- 지금은 테스트 고정

  const meta = CATEGORY_META[normalizedCode] || CATEGORY_META.OTHERS_ADMIN;
  const IconComp = meta.icon;

  // ✅ 첫 번째 카테고리가 현재 카테고리와 일치하는 민원만 가져오기
  const filteredComplaints = complaints.filter(
    (item) =>
      Array.isArray(item.categories) &&
      String(item.categories[0]).toUpperCase() === normalizedCode
  );

  return (
    <div className="category-page">
      <PageHeader title="카테고리별 민원목록" backTo="/complaints" />

      {/* 카테고리 요약 */}
      <div className="category-summary">
        <div className="category-summary-left">
          <div className="category-summary-icon">
            <IconComp style={{ width: 22, height: 22, color: "#fff" }} />
          </div>
          <p className="category-summary-label">{meta.label}</p>
        </div>
        <span className="category-summary-progress">▲ {meta.progress} %</span>
      </div>

      {/* 민원 리스트 */}
      <ul style={{ padding: 0, margin: 0 }}>
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((item) => {
            const statusInfo = STATUS_MAP[item.status] || {
              label: "기타",
              color: "#000",
              background: "#eee",
            };

            return (
              <li
                key={item.id}
                className="complaint-card"
                style={{
                  width: "90%",
                  margin: "1rem auto",
                  padding: "1.15rem 1.1rem",
                  border: "0.8px solid #BFBFBF",
                  background:
                    "linear-gradient(180deg, rgba(238,245,255,0.5) 0%, rgba(245,238,255,0.5) 100%)",
                  listStyle: "none",
                }}
              >
                {/* 헤더 */}
                <div
                  className="card-header"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    className="complaint-title"
                    style={{
                      color: "#000",
                      fontSize: "1rem",
                      fontWeight: "600",
                      margin: 0,
                    }}
                  >
                    {item.title}
                    <span
                      className="complaint-date"
                      style={{
                        color: "#5C5C5C",
                        fontSize: "0.63rem",
                        fontWeight: "400",
                        marginLeft: "0.5rem",
                      }}
                    >
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </p>

                  <p
                    className="status-text"
                    style={{
                      color: statusInfo.color,
                      backgroundColor: statusInfo.background,
                      width: "33px",
                      height: "19px",
                      padding: "2px",
                      margin: 0,
                      borderRadius: "30px",
                      fontSize: "0.65rem",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {statusInfo.label}
                  </p>
                </div>

                {/* 본문 */}
                <p
                  className="complaint-content"
                  style={{
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "#5C5C5C",
                    padding: "10px 0 0 0",
                    margin: "0 0 10px 0",
                  }}
                >
                  {item.content
                    ? item.content.length > 60
                      ? item.content.slice(0, 60) + "..."
                      : item.content
                    : "내용이 없습니다."}
                </p>

                {/* 구분선 */}
                <div
                  style={{ width: "100%", display: "flex", justifyContent: "center" }}
                >
                  <span
                    style={{
                      display: "block",
                      width: "288px",
                      height: "0.8px",
                      backgroundColor: "#BFBFBF",
                      margin: "8px 0",
                    }}
                  ></span>
                </div>

                {/* 하단 */}
                <div
                  className="card-footer"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
                  <span
                    className="complaint-address"
                    style={{
                      color: "#5C5C5C",
                      fontSize: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                      margin: 0,
                    }}
                  >
                    <img
                      style={{
                        width: "19px",
                        height: "19px",
                        padding: 0,
                        marginRight: "5px",
                        display: "inline-block",
                      }}
                      src={require("../../common/ComplaintLoc.svg")}
                      alt="loc"
                    />
                    {item.address}
                  </span>
                  <button
                    className="status-btn"
                    style={{
                      fontSize: "10px",
                      margin: 0,
                      border: "none",
                      backgroundColor: "#2563EB",
                      color: "#FFFFFF",
                      borderRadius: "50px",
                      padding: "4px 8px",
                    }}
                  >
                    {meta.label}
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <p className="no-complaints">해당 카테고리의 민원이 없습니다.</p>
        )}
      </ul>

    </div>
  );
}
