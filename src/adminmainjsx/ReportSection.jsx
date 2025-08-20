// ReportSection.js
import React from "react";
import "../adminmaincss/ReportSection.css";
import Monthreport from "../images/monthreport.png";
import Dayreport from "../images/dayreport.png";

export default function ReportSection() {
  const downloadPDF = async (type) => {
    try {
      // 백엔드 API 호출 (예: /api/report/latest?type=monthly)
      const res = await fetch(`http://localhost:8080/api/report/latest?type=${type}`);
      if (!res.ok) throw new Error("리포트 링크 가져오기 실패");
      const { url, filename } = await res.json();

      // 실제 다운로드 실행
      const link = document.createElement("a");
      link.href = url;
      link.download = filename || `${type}-report.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("리포트를 불러올 수 없습니다: " + err.message);
    }
  };

  return (
    <div className="report-wrapper">
      <div className="titles">
        <h4 className="title">분석 리포트</h4>
        <p className="subtitle">자동으로 보고서 발행</p>
      </div>
      <div className="buttons">
        <div className="report-btn1" onClick={() => downloadPDF("monthly")} style={{ cursor: "pointer" }}>
          <div className="mini-box1">
            <img src={Monthreport} alt="월간 리포트" />
          </div>
          <h3>월간 리포트</h3>
          <p>이번달 민원 현황</p>
        </div>

        <div className="report-btn2" onClick={() => downloadPDF("daily")} style={{ cursor: "pointer" }}>
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
