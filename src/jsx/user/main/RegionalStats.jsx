import React, { useEffect, useState } from "react";
import "../../../css/user/main/RegionalStats.css";

const COLORS = ["#87CEEB", "#DDA0DD", "#FFA500", "#FFB6C1", "#90EE90"];

const RegionalStats = () => {
  const [regionalData, setRegionalData] = useState([]);
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    const fetchRegionalTop5 = async () => {
      try {
        const res = await fetch("/api/complaints/region-top5");
        if (!res.ok) throw new Error("지역 Top5 데이터 불러오기 실패");
        const data = await res.json();

        setRegionalData(
          data.map((r, idx) => ({
            name: r.region,
            count: r.count,
            percentage: r.percent,
            change: r.deltaPercent,
            changeType: r.up ? "increase" : "decrease",
            color: COLORS[idx % COLORS.length],
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPieChart = async () => {
      try {
        const res = await fetch("/api/complaints/piechart");
        if (!res.ok) throw new Error("파이차트 데이터 불러오기 실패");
        const data = await res.json();
        setPieData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRegionalTop5();
    fetchPieChart();
  }, []);

  if (!regionalData.length || !pieData) return <div>로딩 중...</div>;

  return (
    <div className="regional-stats">
      <h3 className="regional-title">지역별 현황 (Top 5)</h3>

      <div className="regional-content">
        {/* 파이 차트 */}
        <div className="pie-chart">
          <svg viewBox="0 0 100 100" className="chart-svg">
            {pieData.slices.map((slice, index) => {
              const total = pieData.total;
              const startAngle = pieData.slices
                .slice(0, index)
                .reduce((sum, s) => sum + (s.value / total) * 360, 0);
              const angle = (slice.value / total) * 360;

              const x1 = 50 + 35 * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = 50 + 35 * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = 50 + 35 * Math.cos((startAngle + angle - 90) * Math.PI / 180);
              const y2 = 50 + 35 * Math.sin((startAngle + angle - 90) * Math.PI / 180);

              const largeArcFlag = angle > 180 ? 1 : 0;

              return (
                <path
                  key={slice.name}
                  d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={COLORS[index % COLORS.length]}
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
                <div
                  className="regional-color"
                  style={{ backgroundColor: region.color }}
                ></div>
                <div className="regional-name">{region.name}</div>
              </div>
              <div className="regional-info-right">
                <div className="regional-main-stats">
                  <span className="regional-count">
                    {region.count.toLocaleString()} 건
                  </span>
                  <span className={`regional-change ${region.changeType}`}>
                    {region.change}%{" "}
                    {region.changeType === "increase" ? "▲" : "▼"}
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
