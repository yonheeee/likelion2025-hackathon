import React from "react";
import { Link } from "react-router-dom";
import "../../../css/user/main/UserMain.css";
import ComplaintsSummaryCard from "./ComplaintsSummaryCard";
import ComplaintItem from "./ComplaintItem";
import PerformanceCard from "./PerformanceCard";
import RegionalStats from "./RegionalStats";
import CategoryStats from "./CategoryStats";

// 액션 카드 하나
const ActionCard = ({ tone = "blue", title, desc, to = "#" , icon = "pen" }) => (
  <a href={to} className={`action-card ${tone}`}>
    <div className="action-text">
      <div className="action-title">{title}</div>
      <div className="action-desc">{desc}</div>
    </div>
    <div className="action-icon" aria-hidden>
      {icon === "pen" ? (
        <svg viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
          <path d="M20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.3a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.84z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      )}
    </div>
  </a>
);

const UserMain = () => {
  // API 호출 예시 (나중에 실제 API 호출로 대체)
  const fetchComplaintsData = async () => {
    // 실제 API 호출 시: return await fetch('/api/complaints/summary').then(res => res.json());
    return {
      total: 25960,
      change: "43.3%",
      changeType: "decrease"
    };
  };

  const fetchComplaintsList = async () => {
    // 실제 API 호출 시: return await fetch('/api/complaints/list').then(res => res.json());
    return [
      {
        title: "포트홀",
        date: "2020년 6월 20일",
        content: "000로 20번길 앞 도로에 커다란 포트홀이 생겼습니다. 출근할 때마다 지나다니는데 차가 일렁거리고 혹시 사고라도 남자와 너무...",
        location: "서산시 해미면",
        status: "접수",
        actionButton: "시설물 특산관리"
      },
      {
        title: "포트홀",
        date: "2005년 6월 20일",
        content: "00020년 도로에 커다란 포트홀이 생겼습니다. 출근할 때마다 지나다니는데 차가 덜렁거리고 혹시 사고라도 날까봐 너무...",
        location: "서산시 해미면",
        status: "접수",
        actionButton: "교통주자"
      }
    ];
  };

  const fetchPerformanceData = async () => {
    // 실제 API 호출 시: return await fetch('/api/performance').then(res => res.json());
    return {
      processingRate: {
        value: "75.6%",
        change: "5.1%",
        changeType: "increase"
      },
      avgProcessingTime: {
        value: "3.2일",
        change: "0.8일",
        changeType: "decrease"
      }
    };
  };

  const fetchRegionalData = async () => {
    // 실제 API 호출 시: return await fetch('/api/regional/stats').then(res => res.json());
    return [
      {
        name: "서울",
        count: 5361,
        percentage: 45,
        change: 15,
        changeType: "increase",
        color: "#87CEEB"
      },
      {
        name: "경기",
        count: 2857,
        percentage: 35,
        change: 63,
        changeType: "decrease",
        color: "#DDA0DD"
      },
      {
        name: "인천",
        count: 2857,
        percentage: 18,
        change: 5,
        changeType: "increase",
        color: "#FFA500"
      },
      {
        name: "부산",
        count: 2857,
        percentage: 25,
        change: 13,
        changeType: "increase",
        color: "#FFB6C1"
      },
      {
        name: "전남",
        count: 2857,
        percentage: 32,
        change: 7,
        changeType: "increase",
        color: "#90EE90"
      }
    ];
  };

  // 현재는 기본값 사용 (나중에 useState와 useEffect로 API 호출)
  const complaintsData = {
    total: 25960,
    change: "43.3%",
    changeType: "decrease"
  };

  const complaintsList = [
    {
      title: "포트홀",
      date: "2020년 6월 20일",
      content: "000로 20번길 앞 도로에 커다란 포트홀이 생겼습니다. 출근할 때마다 지나다니는데 차가 일렁거리고 혹시 사고라도 남자와 너무...",
      location: "서산시 해미면",
      status: "접수",
      actionButton: "시설물 특산관리"
    },
    {
      title: "포트홀",
      date: "2005년 6월 20일",
      content: "00020년 도로에 커다란 포트홀이 생겼습니다. 출근할 때마다 지나다니는데 차가 덜렁거리고 혹시 사고라도 날까봐 너무...",
      location: "서산시 해미면",
      status: "접수",
      actionButton: "교통주자"
    }
  ];

  const performanceData = {
    processingRate: {
      value: "75.6%",
      change: "5.1%",
      changeType: "increase"
    },
    avgProcessingTime: {
      value: "3.2일",
      change: "0.8일",
      changeType: "decrease"
    }
  };

  const regionalData = [
    {
      name: "서울",
      count: 5361,
      percentage: 45,
      change: 15,
      changeType: "increase",
      color: "#87CEEB"
    },
    {
      name: "경기",
      count: 2857,
      percentage: 35,
      change: 63,
      changeType: "decrease",
      color: "#DDA0DD"
    },
    {
      name: "인천",
      count: 2857,
      percentage: 18,
      change: 5,
      changeType: "increase",
      color: "#FFA500"
    },
    {
      name: "부산",
      count: 2857,
      percentage: 25,
      change: 13,
      changeType: "increase",
      color: "#FFB6C1"
    },
    {
      name: "전남",
      count: 2857,
      percentage: 32,
      change: 7,
      changeType: "increase",
      color: "#90EE90"
    }
  ];

  return (
    <main className="user-main">
      {/* 헤더 섹션 */}
      <div className="section-head">
        <h2 className="section-title">민원현황</h2>
        <p className="section-sub">대원점수 및 처리 상황을 확인하세요</p>
      </div>

      {/* 액션 버튼 섹션 */}
      <div className="quick-actions">
        <ActionCard
          tone="blue"
          title="민원 접수하기"
          desc="새로운 민원을 접수할 수 있습니다."
          to="/complaints/new"
          icon="pen"
        />
        <ActionCard
          tone="orange"
          title="내 민원 조회하기"
          desc="내가 쓴 민원한 소회선 수 있습니다"
          to="/complaints/mine"
          icon="search"
        />
      </div>

             {/* 민원 요약 섹션 */}
       <div className="complaints-summary">
         <ComplaintsSummaryCard 
           total={complaintsData.total} 
           change={complaintsData.change} 
           changeType={complaintsData.changeType} 
         />
         
         <div className="complaints-list">
           {complaintsList.map((complaint, index) => (
             <ComplaintItem key={index} {...complaint} />
           ))}
           
           <Link to="/complaints" className="view-all-link">
             전체 인원 목록 보기 ({complaintsList.length}건) →
           </Link>
         </div>
       </div>

       {/* 성과 지표 섹션 */}
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

               {/* 카테고리별 현황 섹션 */}
        <CategoryStats />

        {/* 지역별 현황 섹션 */}
        <RegionalStats />
      </main>
  );
};

export default UserMain;
