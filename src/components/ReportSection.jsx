import React from "react";
import "../styles/ReportSection.css"

export default function ReportSection() {
  return (
    <div className="report-wrapper">
        <div className="titles">
            <h4 className="title">분석 리포트</h4>
            <p className="subtitle">자동으로 보고서 발행</p>
        </div>
      <div className="buttons">
        <div className="report-btn1">
            <h3>월간 리포트</h3>
        </div>
        <div className="report-btn2">
            <h3>일간 리포트</h3>
        </div>
      </div>
    </div>
  );
}
