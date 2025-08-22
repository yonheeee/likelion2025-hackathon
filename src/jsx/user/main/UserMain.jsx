import React, { useEffect, useState } from "react";
import "../../../css/user/main/UserMain.css";
import ComplaintsSummaryCard from "./ComplaintsSummaryCard";
import PerformanceCard from "./PerformanceCard";
import RegionalStats from "./RegionalStats";
import CategoryStats from "./CategoryStats";
import NavigateHeader from '../../PageHeader.jsx';

import CheckIcon from "../../../image/User/main/checkicon.svg";
import ReceiptIcon from "../../../image/User/main/receipticon.svg";

const ActionCard = ({ tone = "blue", title, desc, to = "#", icon = "pen" }) => (
  <a href={to} className={`action-card ${tone}`}>
    <div className="action-text">
      <div className="action-title">{title}</div>
      <div className="action-desc">{desc}</div>
    </div>
    <div className="action-icon" aria-hidden>
      {icon === "pen" ? (
        <img src={ReceiptIcon} alt="접수 아이콘" />
      ) : (
        <img src={CheckIcon} alt="조회 아이콘" />
      )}
    </div>
  </a>
);

const UserMain = () => {
  const [complaintsData, setComplaintsData] = useState(null);
  const [complaintsList, setComplaintsList] = useState([]);
  const [performanceData, setPerformanceData] = useState(null);
  const [regionalData, setRegionalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ 민원 전체 목록
        const res = await fetch("http://localhost:8080/api/complaints");
        const complaints = await res.json();

        setComplaintsList(complaints);
        setComplaintsData({
          total: complaints.length,
          change: "+5%", // TODO: 백에서 제공하면 교체
          changeType: "increase",
        });

        // ✅ 성과 지표
        const [rateRes, timeRes] = await Promise.all([
          fetch("http://localhost:8080/api/complaints/resolution-rate"),
          fetch("http://localhost:8080/api/complaints/avg-handle-time"),
        ]);

        const rate = await rateRes.json();
        const time = await timeRes.json();

        setPerformanceData({
          processingRate: {
            value: `${rate.ratePercent}%`,
            change: `${rate.deltaPercent}%`,
            changeType: rate.up ? "increase" : "decrease",
          },
          avgProcessingTime: {
            value: `${time.days}일`,
            change: `${time.deltaDays}일`,
            changeType: time.up ? "increase" : "decrease",
          },
        });

        // ✅ 지역 TOP5
        const regionRes = await fetch("http://localhost:8080/api/complaints/region-top5");
        const regionData = await regionRes.json();

        setRegionalData(
          regionData.map((r, idx) => ({
            name: r.region,
            count: r.count,
            percentage: r.percent,
            change: r.deltaPercent,
            changeType: r.up ? "increase" : "decrease",
            color: ["#87CEEB", "#DDA0DD", "#FFA500", "#FFB6C1", "#90EE90"][idx % 5],
          }))
        );
      } catch (err) {
        console.error("⚠️ API 호출 실패 → 더미데이터 사용:", err);

        // --- 더미 데이터 ---
        const dummyComplaints = [
          {
            id: 1,
            title: "도로 파손",
            content: "횡단보도 앞 도로에 큰 파손이 있습니다.",
            status: "접수",
            category: "시설물 파손/관리",
            address: "서산시 해미면",
            createdAt: "2025-08-20T10:00:00",
          },
          {
            id: 2,
            title: "불법 주정차",
            content: "시장 앞에 불법 주정차 차량이 많습니다.",
            status: "처리중",
            category: "교통/주정차",
            address: "서산시 동문동",
            createdAt: "2025-08-21T14:30:00",
          },
        ];

        const dummyPerformance = {
          processingRate: { value: "75%", change: "+5%", changeType: "increase" },
          avgProcessingTime: { value: "3일", change: "-1일", changeType: "decrease" },
        };

        const dummyRegional = [
          { name: "해미면", count: 10, percentage: 25, change: "+2%", changeType: "increase", color: "#87CEEB" },
          { name: "동문동", count: 7, percentage: 18, change: "-1%", changeType: "decrease", color: "#DDA0DD" },
          { name: "부석면", count: 5, percentage: 12, change: "0%", changeType: "none", color: "#FFA500" },
        ];

        // --- 상태 세팅 ---
        setComplaintsList(dummyComplaints);
        setComplaintsData({ total: dummyComplaints.length, change: "+10%", changeType: "increase" });
        setPerformanceData(dummyPerformance);
        setRegionalData(dummyRegional);
      }
    };

    fetchData();
  }, []);

  if (!complaintsData || !performanceData) return <div>로딩 중...</div>;

  return (
    <main className="user-main">
      {/* 헤더 */}
      <NavigateHeader title="민원현황" backTo="/home"/> {/* Navigate Arrow */}

      {/* 빠른 액션 */}
      <div className="quick-actions">
        <ActionCard tone="blue" title="민원 접수하기" desc="새로운 민원을 접수할 수 있습니다." to="/userrecipt" icon="pen" />
        <ActionCard tone="orange" title="내 민원 조회하기" desc="내가 쓴 민원을 조회할 수 있습니다." to="/usercheck" icon="search" />
      </div>

      {/* 민원 요약 */}
      <div className="complaints-summary">
        <ComplaintsSummaryCard
          total={complaintsData.total}
          change={complaintsData.change}
          changeType={complaintsData.changeType}
          complaintsList={complaintsList}
        />
      </div>

      <div className="performance-metrics">
        <PerformanceCard
          title="민원 처리율"
          value={performanceData.processingRate.value}
          change={performanceData.processingRate.change}
          changeType={performanceData.processingRate.changeType}
        />
        <PerformanceCard
          title="평균 처리시간"
          value={performanceData.avgProcessingTime.value}
          change={performanceData.avgProcessingTime.change}
          changeType={performanceData.avgProcessingTime.changeType}
        />
      </div>

      <CategoryStats />
      <RegionalStats regionalData={regionalData} />
    </main>
  );
};

export default UserMain;
