import React from "react";
import "../styles/ReportSection.css";
import Monthreport from "../images/monthreport.png";
import Dayreport from "../images/dayreport.png";
import { useNavigate } from "react-router-dom";

export default function ReportSection() {
  const navigate = useNavigate();

  return (
    <div className="report-wrapper">
      <div className="titles">
        <h4 className="title">분석 리포트</h4>
        <p className="subtitle">자동으로 보고서 발행</p>
      </div>
      <div className="buttons">
        {/* 월간 리포트 버튼 */}
        <div
          className="report-btn1"
          onClick={() => navigate("/report/monthly")} // 페이지 주소
          style={{ cursor: "pointer" }}
        >
          <div className="mini-box1">
            <img src={Monthreport} alt="월간 리포트" />
          </div>
          <h3>월간 리포트</h3>
          <p>이번달 민원 현황</p>
        </div>

        {/* 일간 리포트 버튼 */}
        <div
          className="report-btn2"
          onClick={() => navigate("/report/daily")} // 페이지 주소
          style={{ cursor: "pointer" }}
        >
          <div className="mini-box2">
            <img src={Dayreport} alt="일간 리포트" />
          </div>
          <div className="report-text">
            <h3>일간 리포트</h3>
            <p>오늘 민원 현황</p>
          </div>
        </div>
      </div>
    </div>
  );
}
