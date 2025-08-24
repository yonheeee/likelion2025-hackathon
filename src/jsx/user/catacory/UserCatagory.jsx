import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../PageHeader.jsx";
import "../../../css/user/catagory/UserCatagory.css";

import { CATEGORY_MAP, STATUS_MAP } from "../../common/categoryStatusMap.js";
import loc from "../../common/ComplaintLoc.svg";
import {
  Environment,
  Facility,
  Traffic,
  Safe,
  Inconvince,
  Etc,
} from "../../user/main/CategoryStats.jsx";

const API_BASE = "http://13.125.98.203/api";

const ICON_BY_CODE = {
  TRAFFIC_PARKING: Traffic,
  FACILITY_DAMAGE: Facility,
  SAFETY_RISK: Safe,
  ENVIRONMENT_CLEANING: Environment,
  LIVING_INCONVENIENCE: Inconvince,
  OTHERS_ADMIN: Etc,
};

const CATEGORY_COLOR = {
  TRAFFIC_PARKING: "#3B82F6",
  FACILITY_DAMAGE: "#F59E0B",
  SAFETY_RISK: "#EF4444",
  ENVIRONMENT_CLEANING: "#10B981",
  LIVING_INCONVENIENCE: "#8B5CF6",
  OTHERS_ADMIN: "#6B7280",
};

const normalizeCategoryCode = (raw) => {
  if (!raw) return null;
  const key = String(raw).trim().toUpperCase();
  const alias = {
    "TRAFFIC-PARKING": "TRAFFIC_PARKING",
    "FACILITY-DAMAGE": "FACILITY_DAMAGE",
    "SAFETY-RISK": "SAFETY_RISK",
    "ENVIRONMENT-CLEANING": "ENVIRONMENT_CLEANING",
    "LIVING-INCONVENIENCE": "LIVING_INCONVENIENCE",
    "기타": "OTHERS_ADMIN",
    "기타/행정": "OTHERS_ADMIN",
  };
  const normalized = alias[key] || key;
  return CATEGORY_MAP[normalized] ? normalized : null;
};

const hexToRGBA = (hex, alpha = 1) => {
  const h = hex.replace("#", "");
  const v = parseInt(h, 16);
  const r = (v >> 16) & 255;
  const g = (v >> 8) & 255;
  const b = v & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function UserCatagory() {
  const { categoryCode } = useParams();
  const navigate = useNavigate();

  const code = useMemo(
    () => normalizeCategoryCode(categoryCode) ?? "FACILITY_DAMAGE",
    [categoryCode]
  );

 
  const label = CATEGORY_MAP[code] || CATEGORY_MAP.FACILITY_DAMAGE;
  const color = CATEGORY_COLOR[code] || CATEGORY_COLOR.FACILITY_DAMAGE;
  const IconComp = ICON_BY_CODE[code] || Etc;

  const cardBg = hexToRGBA(color, 0.12);
  const chipBg = hexToRGBA(color, 0.95);
  const chipShadow = hexToRGBA(color, 0.35);

  const [statsMap, setStatsMap] = useState({}); 
  const [list, setList] = useState([]);        
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr("");

    const fetchStats = axios.get(`${API_BASE}/complaints/categorystat`);
    const fetchList  = axios.get(`${API_BASE}/complaints/categorylist`, {
      params: { category: code, status: "ALL", days: 30 },
    });

    Promise.all([fetchStats, fetchList])
      .then(([sRes, lRes]) => {
        if (!alive) return;

        const map = {};
        (sRes.data || []).forEach((row) => {
          const k = String(row.category || "").toUpperCase();
          map[k] = { valuePercent: Number(row.valuePercent ?? 0), up: !!row.up };
        });
        setStatsMap(map);

        setList(Array.isArray(lRes.data) ? lRes.data : []);
      })
      .catch((e) => {
        console.error(e);
        if (alive) setErr("데이터를 불러오는 중 오류가 발생했어요.");
      })
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [code]);

  const progress = statsMap[code]?.valuePercent ?? 0;
  const isUp = !!statsMap[code]?.up;

  return (
    <div className="category-page">
      <PageHeader title="카테고리별 민원목록" backTo="/complaints" />

      <div className="catagory-background">
        <div
          style={{
            margin: "12px 16px",
            padding: "12px 14px",
            background: cardBg,
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40, height: 40, borderRadius: 12,
                background: chipBg, boxShadow: `0 6px 14px ${chipShadow}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <IconComp style={{ width: 22, height: 22, color: "#fff" }} />
            </div>
            <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "#111827" }}>
              {label}
            </p>
          </div>
        

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              aria-hidden
              style={{ color, fontSize: 12, fontWeight: 700, transform: "translateY(-1px)" }}
            >
              {isUp ? "▲" : "▼"}
            </span>
            <span style={{ color, fontSize: "0.9rem", fontWeight: 700 }}>
              {progress} %
            </span>
          </div>
        </div>
      </div>

      <div className="catacory-complaint-container">
        {loading ? (
          <p style={{ textAlign: "center", color: "#6b7280", marginTop: 16 }}>불러오는 중…</p>
        ) : err ? (
          <p style={{ textAlign: "center", color: "#ef4444", marginTop: 16 }}>{err}</p>
        ) : list.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6b7280", marginTop: 16 }}>
            해당 카테고리의 민원이 없습니다.
          </p>
        ) : (
          <ul style={{ padding: 0, margin: 0 }}>
            {list.map((item) => {
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
                    borderRadius: 12,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(`/user/detail/${item.id}`)
                  }
                >
                
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p
                      style={{
                        color: "#000",
                        fontSize: "1rem",
                        fontWeight: 700,
                        margin: 0,
                        display: "flex",
                        alignItems: "baseline",
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      {item.title}
                      <span
                        style={{
                          color: "#5C5C5C",
                          fontSize: "0.63rem",
                          fontWeight: 400,
                        }}
                      >
                        {new Date(item.createdAt).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </span>
                    </p>

                    <p
                      style={{
                        color: statusInfo.color,
                        backgroundColor: statusInfo.background,
                        minWidth: 33,
                        height: 22,
                        padding: "2px 8px",
                        margin: 0,
                        borderRadius: 999,
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {statusInfo.label}
                    </p>
                  </div>

                  <p style={{ fontSize: 12, color: "#5C5C5C", margin: "10px 0" }}>
                    {item.content?.length > 60
                      ? `${item.content.slice(0, 60)}...`
                      : item.content || "내용이 없습니다."}
                  </p>

                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <span style={{ display: "block", width: 288, height: 1, backgroundColor: "#BFBFBF", margin: "8px 0" }} />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                    <span style={{ color: "#5C5C5C", fontSize: "0.8rem" }}>
                      <img src={loc} alt="loc" style={{ width: 18, height: 18 }} />
                      {item.address}
                    </span>

                    <button
                      style={{
                        fontSize: 10,
                        border: "none",
                        backgroundColor: "#2563EB",
                        color: "#fff",
                        borderRadius: 999,
                        padding: "6px 10px",
                        fontWeight: 700,
                      }}
                    >
                      {label}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        </div>
    </div>
  );
}
