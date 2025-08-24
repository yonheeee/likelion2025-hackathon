import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../css/user/main/UserMain.css";
import ComplaintsSummaryCard from "./ComplaintsSummaryCard";
import PerformanceCard from "./PerformanceCard";
import RegionalStats from "./RegionalStats";
import CategoryStats from "./CategoryStats";

import CheckIcon from "../../../image/User/main/checkicon.svg";
import ReceiptIcon from "../../../image/User/main/receipticon.svg";

const BASE = "http://13.125.98.203/api";

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
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setError("");
        
        const listPromise = axios.get(`${BASE}/complaints`, {
          signal: controller.signal,
        });

       
        const ratePromise = axios.get(`${BASE}/complaints/resolution-rate`, {
          signal: controller.signal,
        });
        const timePromise = axios.get(`${BASE}/complaints/avg-handle-time`, {
          signal: controller.signal,
        });

        const [listRes, rateRes, timeRes] = await Promise.all([
          listPromise,
          ratePromise,
          timePromise,
        ]);

        const list = Array.isArray(listRes.data) ? listRes.data : [];
        setComplaintsList(list);

        setComplaintsData({
          total: list.length,
          change: null,
          changeType: null,
        });

        const ratePercent = Number(rateRes?.data?.ratePercent ?? 0);
        const deltaPercent = Number(rateRes?.data?.deltaPercent ?? 0);
        const rateUp = !!rateRes?.data?.up;

        const days = Number(timeRes?.data?.days ?? 0);
        const deltaDays = Number(timeRes?.data?.deltaDays ?? 0);
        const timeUp = !!timeRes?.data?.up;

        setPerformanceData({
          processingRate: {
            value: `${ratePercent.toFixed(1)}%`,
            change: `${deltaPercent.toFixed(1)}%`,
            changeType: rateUp ? "increase" : "decrease",
          },
          avgProcessingTime: {
            value: `${days.toFixed(1)}일`,
            change: `${deltaDays.toFixed(1)}일`,
            changeType: timeUp ? "increase" : "decrease",
          },
        });
      } catch (e) {
        
        const isCanceled =
          (axios.isCancel && axios.isCancel(e)) ||
          e?.code === "ERR_CANCELED" ||
          e?.name === "CanceledError";
        if (!isCanceled) {
          console.error(e);
          setError("대시보드 데이터를 불러오는 중 문제가 발생했습니다.");
        }
      }
    })();

    return () => controller.abort();
  }, []);

  if (!complaintsData || !performanceData) return <div>로딩 중...</div>;

  return (
    <main className="user-main">
      <h1 className="user-main-header">민원현황</h1>

      <div className="quick-actions">
        <ActionCard tone="blue"   title="민원 접수하기"  desc="새로운 민원을 접수할 수 있습니다." to="/userrecipt" icon="pen" />
        <ActionCard tone="orange" title="내 민원 조회하기" desc="내가 쓴 민원을 조회할 수 있습니다." to="/usercheck" icon="search" />
      </div>

      {error && (
        <div style={{ color: "#ef4444", marginBottom: 12 }}>{error}</div>
      )}

      
      <div className="complaints-summary">
        <ComplaintsSummaryCard
          total={complaintsData.total}
          change={complaintsData.change}          
          changeType={complaintsData.changeType} 
          complaintsList={complaintsList.slice(0, 2)} 
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
      <RegionalStats />
    </main>
  );
};

export default UserMain;
