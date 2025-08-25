/* 관리자 암호와 인증버튼으로 구성되어 있는 핵심 기능 컴포넌트 (.jsx 완성본) */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동
import "../../../css/admin/adminfirstcss/AdminAuthForm.css";
import gearImg from "../../../image/admin/gear.png"; // 기어 이미지
import minicircleImg from "../../../image/admin/minicircle.png"; // 미니 서클 이미지
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export default function AdminAuthForm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);

  useEffect(() => {
    // 전역 baseURL 1회 설정
    axios.defaults.baseURL = BASE_URL;

    // 언마운트 시 진행 중 요청 취소(현재 네트워크 호출은 없지만 안전망으로 유지)
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  // 인증 버튼 클릭/폼 제출 시
  const handleAuth = async (e) => {
    e.preventDefault(); // Enter 제출/기본 새로고침 방지

    if (loading) return; // 중복 제출 가드

    const pw = password.trim();
    if (!pw) {
      alert("암호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      // ▼▼▼ 핵심 변경: 비번 저장 + 전역 헤더 주입 ▼▼▼
      // 1) 브라우저 세션 저장(탭/창 생명주기)
      sessionStorage.setItem("ADMIN_PASSWORD", pw);

      // 2) 이후 모든 axios 요청에 자동으로 PASSWORD 헤더 포함
      axios.defaults.headers.common["PASSWORD"] = pw; // 서버가 기대하는 대문자 키

      // 3) 필요 시 사전 검증용 핑 (엔드포인트 있을 때만)
      await axios.get("/api/admin/complaints/categories");

      alert("인증 성공!");
      navigate("/admin/main");
      // ▲▲▲ 핵심 변경 끝 ▲▲▲
    } catch (error) {
      console.error(error);

      // 실패 시 세션/헤더 정리
      sessionStorage.removeItem("ADMIN_PASSWORD");
      delete axios.defaults.headers.common["PASSWORD"];

      if (error && error.code === "ECONNABORTED") {
        alert("요청이 시간 초과되었습니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert("인증 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  return (
    <div className="auth-container">
      <div className="icon-circle">
        <span className="gear-icon">
          <img src={gearImg} className="gearimg" alt="기어" />
          <img src={minicircleImg} className="minicircleimg" alt="미니 원" />
        </span>
      </div>
      <h2 className="auth-title">관리자 인증</h2>
      <p className="sub-text">관리자 권한이 필요합니다</p>

      {/* form onSubmit으로 Enter 키 동작 지원 */}
      <form className="input-container" onSubmit={handleAuth}>
        <p>관리자 암호</p>
        <input
          type="password"
          placeholder="암호를 입력해주세요"
          className="input-box"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "인증 중..." : "인증하기"}
        </button>
      </form>
    </div>
  );
}
