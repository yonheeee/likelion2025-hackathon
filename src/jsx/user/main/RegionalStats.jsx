import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../css/user/main/RegionalStats.css";

const COLORS = ["#87CEEB", "#DDA0DD", "#FFA500", "#FFB6C1", "#90EE90"];

const api = axios.create({
  baseURL: "http://13.125.98.203/api",
  timeout: 10000,
});

const RegionalStats = () => {
  const [regionalData, setRegionalData] = useState([]);
  const [pieData, setPieData] = useState({ total: 0, slices: [] });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchRegionalTop5 = async () => {
      try {
        const { data } = await api.get("/complaints/region-top5", { signal: controller.signal });
        setRegionalData(
          (data || []).map((r, idx) => ({
            name: r.region,
            count: r.count ?? 0,
            percentage: typeof r.percent === "number" ? Number(r.percent.toFixed(1)) : 0,
            change: typeof r.deltaPercent === "number" ? Number(r.deltaPercent.toFixed(1)) : 0,
            changeType: r.up ? "increase" : "decrease",
            color: COLORS[idx % COLORS.length],
          }))
        );
      } catch (e) {
        if (!axios.isCancel(e)) setErr("지역 Top5 데이터를 불러오지 못했습니다.");
      }
    };

    const fetchPieChart = async () => {
      try {
        const { data } = await api.get("/complaints/piechart", { signal: controller.signal });
        setPieData({
          total: Number(data?.total ?? 0),
          slices: Array.isArray(data?.slices) ? data.slices : [],
        });
      } catch (e) {
        if (!axios.isCancel(e)) {
          setErr((prev) => prev || "파이차트 데이터를 불러오지 못했습니다.");
          setPieData({ total: 0, slices: [] });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRegionalTop5();
    fetchPieChart();

    return () => controller.abort();
  }, []);

  const total = Number(pieData?.total ?? 0);
  const slices = Array.isArray(pieData?.slices) ? pieData.slices : [];

  return (
    <div className="regional-stats">
      <h3 className="regional-title">지역별 현황 (Top 5)</h3>

      <div className="regional-content">
        <div className="pie-chart">
          {total > 0 && slices.length > 0 ? (
            <svg viewBox="0 0 100 100" className="chart-svg" role="img" aria-label="지역별 파이차트">
              {(() => {
                const nonZero = slices.filter(s => s.value > 0);
                if (nonZero.length === 1 && nonZero[0].value === total) {
                  return (
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill={COLORS[0]}
                      stroke="#fff"
                      strokeWidth="1"
                    />
                  );
                }

                
                let accAngle = 0; 
                return slices.map((slice, index) => {
                  const angle = (slice.value / total) * 360;
                  if (slice.value === 0) return null;

                  const startAngle = accAngle;
                  const endAngle = accAngle + angle;
                  accAngle = endAngle;

                  const rad = 35;
                  const toXY = (deg) => {
                    const r = (deg - 90) * Math.PI / 180;
                    return [50 + rad * Math.cos(r), 50 + rad * Math.sin(r)];
                  };

                  const [x1, y1] = toXY(startAngle);
                  const [x2, y2] = toXY(endAngle);
                  const largeArcFlag = angle > 180 ? 1 : 0;

                  return (
                    <path
                      key={`${slice.name}-${index}`}
                      d={`M 50 50 L ${x1} ${y1} A ${rad} ${rad} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#fff"
                      strokeWidth="1"
                    />
                  );
                });
              })()}
            </svg>
          ) : (
            <div className="pie-chart-empty">데이터 없음</div>
          )}
        </div>

    
        <div className="regional-list">
          {regionalData.map((region) => (
            <div key={region.name} className="regional-item">
              <div className="regional-info-left">
                <div
                  className="regional-color"
                  style={{ backgroundColor: region.color }}
                />
                <div className="regional-name">{region.name}</div>
              </div>

              <div className="regional-info-right">
                <div className="regional-main-stats">
                  <span className="regional-count">
                    {region.count.toLocaleString()} 건
                  </span>
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
