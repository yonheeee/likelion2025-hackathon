import React from "react";
import "../../../css/user/main/RegionalStats.css";

const RegionalStats = () => {
  // API 호출 예시 (나중에 실제 API 호출로 대체)
  const fetchRegionalData = async () => {
    // 실제 API 호출 시: return await fetch('/api/regional/stats').then(res => res.json());
    return [
      {
        name: "서울",
        count: 5361,
        percentage: 45,
        change: 15,
        changeType: "increase",
        color: "#87CEEB" // 하늘색
      },
      {
        name: "경기",
        count: 2857,
        percentage: 35,
        change: 63,
        changeType: "decrease",
        color: "#DDA0DD" // 연한 보라색
      },
      {
        name: "인천",
        count: 2857,
        percentage: 18,
        change: 5,
        changeType: "increase",
        color: "#FFA500" // 주황색
      },
      {
        name: "부산",
        count: 2857,
        percentage: 25,
        change: 13,
        changeType: "increase",
        color: "#FFB6C1" // 연한 붉은색
      },
      {
        name: "전남",
        count: 2857,
        percentage: 32,
        change: 7,
        changeType: "increase",
        color: "#90EE90" // 연한 녹색
      }
    ];
  };

  // 현재는 기본값 사용 (나중에 useState와 useEffect로 API 호출)
  const regionalData = [
    {
      name: "서울",
      count: 5361,
      percentage: 65,
      change: 1.5,
      changeType: "increase",
      color: "#87CEEB" // 하늘색
    },
    {
      name: "경기",
      count: 2857,
      percentage: 35,
      change: 6.3,
      changeType: "decrease",
      color: "#DDA0DD" // 연한 보라색
    },
    {
      name: "인천",
      count: 2857,
      percentage: 18,
      change: 5,
      changeType: "increase",
      color: "#FFA500" // 주황색
    },
    {
      name: "부산",
      count: 2857,
      percentage: 25,
      change: 1.3,
      changeType: "increase",
      color: "#FFB6C1" // 연한 붉은색
    },
    {
      name: "전남",
      count: 2857,
      percentage: 32,
      change: 7,
      changeType: "increase",
      color: "#90EE90" // 연한 녹색
    }
  ];

  return (
    <div className="regional-stats">
      <h3 className="regional-title">지역별 현황 (Top 5)</h3>
      
      <div className="regional-content">
        {/* 파이 차트 */}
        <div className="pie-chart">
          <svg viewBox="0 0 100 100" className="chart-svg">
            {regionalData.map((region, index) => {
              const total = regionalData.reduce((sum, r) => sum + r.percentage, 0);
              const startAngle = regionalData
                .slice(0, index)
                .reduce((sum, r) => sum + (r.percentage / total) * 360, 0);
              const angle = (region.percentage / total) * 360;
              
              const x1 = 50 + 35 * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = 50 + 35 * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = 50 + 35 * Math.cos((startAngle + angle - 90) * Math.PI / 180);
              const y2 = 50 + 35 * Math.sin((startAngle + angle - 90) * Math.PI / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              return (
                <path
                  key={region.name}
                  d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={region.color}
                  stroke="#fff"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>

        {/* 지역별 상세 데이터 */}
        <div className="regional-list">
          {regionalData.map((region) => (
            <div key={region.name} className="regional-item">
              <div className="regional-info-left">
                <div className="regional-color" style={{ backgroundColor: region.color }}></div>
                <div className="regional-name">{region.name}</div>
              </div>
              <div className="regional-info-right">
                <div className="regional-main-stats">
                  <span className="regional-count">{region.count.toLocaleString()} 건</span>
                  <span className={`regional-change ${region.changeType}`}>
                    {region.change}% {region.changeType === "increase" ? "▲" : "▼"}
                  </span>
                </div>
                <div className="regional-overall-percentage">
                  {region.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionalStats;