// ReportSection.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import "../adminmaincss/ReportSection.css";
import Monthreport from "../images/monthreport.png";
import Dayreport from "../images/dayreport.png";

/** === .env (CRA) === */
const API_BASE  = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
const ADMIN_PW  = process.env.REACT_APP_ADMIN_PASSWORD || "hanseo";

/* -------------------------------------------
   공통: 숫자 유틸
------------------------------------------- */
const pad2 = (n) => String(n).padStart(2, "0");

/* -------------------------------------------
   휠 피커 (iOS 스타일) - 재사용 가능
------------------------------------------- */
function WheelPicker({ items, value, onChange, itemHeight = 40, ariaLabel }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const idx = items.findIndex((it) => String(it.value) === String(value));
    const el = containerRef.current;
    if (!el || idx < 0) return;
    el.scrollTo({ top: idx * itemHeight, behavior: "smooth" });
  }, [value, items, itemHeight]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timeoutId;

    const snap = () => {
      const nearestIndex = Math.round(el.scrollTop / itemHeight);
      const clamped = Math.max(0, Math.min(nearestIndex, items.length - 1));
      const v = items[clamped]?.value;
      el.scrollTo({ top: clamped * itemHeight, behavior: "smooth" });
      setTimeout(() => onChange?.(v), 80);
    };

    const onScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(snap, 100);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(timeoutId);
    };
  }, [items, itemHeight, onChange]);

  return (
    <div className="wheel">
      <div
        className="wheel-guides"
        style={{ top: itemHeight, height: itemHeight }}
        aria-hidden="true"
      />
      <div
        className="wheel-list"
        ref={containerRef}
        style={{ maxHeight: itemHeight * 3 }}
        role="listbox"
        aria-label={ariaLabel}
      >
        <div style={{ height: itemHeight }} />
        {items.map((it) => (
          <div
            key={it.value}
            className={
              String(it.value) === String(value) ? "wheel-item selected" : "wheel-item"
            }
            style={{ height: itemHeight, lineHeight: `${itemHeight}px` }}
            role="option"
            aria-selected={String(it.value) === String(value)}
            onClick={() => onChange?.(it.value)}
          >
            {it.label}
          </div>
        ))}
        <div style={{ height: itemHeight }} />
      </div>
    </div>
  );
}

/* -------------------------------------------
   날짜 휠 (연/월/일 조합)
------------------------------------------- */
function WheelDatePicker({ mode, onChangeYM, onChangeYMD }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  const years = useMemo(() => {
    const arr = [];
    const start = today.getFullYear() - 10;
    const end = today.getFullYear();
    for (let y = start; y <= end; y++) arr.push({ value: y, label: `${y}년` });
    return arr;
  }, [today]);

  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const m = i + 1;
        return { value: m, label: `${m}월` };
      }),
    []
  );

  const daysInMonth = useMemo(() => {
    const dim = new Date(year, month, 0).getDate();
    return Array.from({ length: dim }, (_, i) => {
      const d = i + 1;
      return { value: d, label: `${d}일` };
    });
  }, [year, month]);

  useEffect(() => {
    const dim = new Date(year, month, 0).getDate();
    if (day > dim) setDay(dim);
  }, [year, month, day]);

  useEffect(() => {
    if (mode === "monthly") {
      onChangeYM?.(`${year}-${pad2(month)}`);
    } else {
      onChangeYMD?.(`${year}-${pad2(month)}-${pad2(day)}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, day, mode]);

  return (
    <div className="wheel-date">
      <WheelPicker ariaLabel="연 선택" items={years} value={year} onChange={setYear} />
      <WheelPicker ariaLabel="월 선택" items={months} value={month} onChange={setMonth} />
      {mode === "daily" && (
        <WheelPicker ariaLabel="일 선택" items={daysInMonth} value={day} onChange={setDay} />
      )}
    </div>
  );
}

/* -------------------------------------------
   메인 섹션
------------------------------------------- */
export default function ReportSection() {
  const [sheetOpen, setSheetOpen]   = useState(false);
  const [reportType, setReportType] = useState(null); // 'monthly' | 'daily'

  const [selectedYM, setSelectedYM]   = useState("");     // YYYY-MM
  const [selectedYMD, setSelectedYMD] = useState("");     // YYYY-MM-DD

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  /* 바텀시트 열기 */
  const handleOpenSheet = (type) => {
    setReportType(type);
    setError(null);
    setLoading(false);
    setSelectedYM("");
    setSelectedYMD("");
    setSheetOpen(true);
  };

  /* 닫기 */
  const closeSheet = () => {
    setSheetOpen(false);
    setReportType(null);
    setSelectedYM("");
    setSelectedYMD("");
    setError(null);
    setLoading(false);
  };

  /* ESC 로 닫기 */
  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e) => e.key === "Escape" && closeSheet();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheetOpen]);

  /* 버튼 클릭 시에만 호출 → 링크 받으면 바로 다운로드(또는 이동) */
  const fetchReportByDate = async ({ ym, ymd }) => {
    setLoading(true);
    setError(null);
    try {
      let endpoint = "";
      if (reportType === "monthly") {
        if (!ym) throw new Error("월을 먼저 선택해주세요.");
        endpoint = `${API_BASE}/api/admin/report/monthly?yearMonth=${encodeURIComponent(ym)}`;
      } else if (reportType === "daily") {
        if (!ymd) throw new Error("날짜를 먼저 선택해주세요.");
        endpoint = `${API_BASE}/api/admin/report/daily?day=${encodeURIComponent(ymd)}`;
      } else {
        throw new Error("리포트 유형을 확인할 수 없습니다.");
      }

      const res = await fetch(endpoint, {
        headers: { PASSWORD: ADMIN_PW },
      });
      if (!res.ok) throw new Error(`리포트 링크 가져오기 실패 (${res.status})`);
      const data = await res.json(); // { url, filename? }

      // 성공: 바로 다운로드/이동 실행
      const url = data?.url;
      if (!url) throw new Error("유효한 리포트 URL이 없습니다.");

      // 파일 다운로드 트리거 (가능하면 파일명 유지)
      const a = document.createElement("a");
      a.href = url;
      a.download = data.filename || (reportType === "monthly" ? "monthly-report.pdf" : "daily-report.pdf");
      document.body.appendChild(a);
      a.click();
      a.remove();

      // 시트 닫기
      closeSheet();

    } catch (err) {
      setError(err.message || "리포트를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    const ym  = reportType === "monthly" ? selectedYM  : null;
    const ymd = reportType === "daily"   ? selectedYMD : null;
    await fetchReportByDate({ ym, ymd });
  };

  return (
    <>
      <div className="report-wrapper">
        <div className="titles">
          <h4 className="title">분석 리포트</h4>
          <p className="subtitle">자동으로 보고서 발행</p>
        </div>

        <div className="buttons">
          {/* 월간 */}
          <div
            className="report-btn1"
            onClick={() => handleOpenSheet("monthly")}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpenSheet("monthly")}
            aria-label="월간 리포트 선택"
          >
            <div className="mini-box1">
              <img src={Monthreport} alt="월간 리포트" />
            </div>
            <h3>월간 리포트</h3>
            <p>이번달 민원 현황</p>
          </div>

          {/* 일간(주간 표기 유지) */}
          <div
            className="report-btn2"
            onClick={() => handleOpenSheet("daily")}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpenSheet("daily")}
            aria-label="주간 리포트 선택"
          >
            <div className="mini-box2">
              <img src={Dayreport} alt="주간 리포트" />
            </div>
            <div className="report-text">
              <h3>주간 리포트</h3>
              <p>오늘 민원 현황</p>
            </div>
          </div>
        </div>
      </div>

      {/* === 오버레이 & 바텀시트 === */}
      <div
        className={`sheet-overlay ${sheetOpen ? "open" : ""}`}
        onClick={closeSheet}
        aria-hidden={!sheetOpen}
      />
      <div
        className={`ai-sheet report-sheet ${sheetOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!sheetOpen}
      >
        <div className="ai-sheet-handle" />

        <div className="ai-sheet-header">
          <h4>{reportType === "monthly" ? "월간 리포트" : "주간(일간) 리포트"}</h4>
          <button className="ai-sheet-close" onClick={closeSheet} aria-label="닫기">
            ×
          </button>
        </div>

        <div className="ai-sheet-body">
          {/* iOS 스타일 휠 날짜 선택 */}
          <div className="ai-summary-text" style={{ marginBottom: 8 }}>
            <p>{reportType === "monthly" ? "월을 선택하세요" : "날짜를 선택하세요"}</p>
          </div>

          <WheelDatePicker
            mode={reportType === "monthly" ? "monthly" : "daily"}
            onChangeYM={setSelectedYM}
            onChangeYMD={setSelectedYMD}
          />

          {/* 상태만 표시 (링크/파일명은 표시하지 않음) */}
          {loading && <p className="ai-status" style={{ marginTop: 10 }}>리포트 준비 중…</p>}
          {error && <p className="ai-error" style={{ marginTop: 10 }}>❌ {error}</p>}
        </div>

        <div className="ai-sheet-footer">
          <button
            className="process-btn"
            onClick={handleDownload}
            disabled={
              loading ||
              (reportType === "monthly" ? !selectedYM : !selectedYMD)
            }
            title={
              reportType === "monthly"
                ? (!selectedYM ? "월을 먼저 선택하세요" : "")
                : (!selectedYMD ? "날짜를 먼저 선택하세요" : "")
            }
          >
            다운로드
          </button>
        </div>
      </div>
    </>
  );
}
