/* 관리자 암호와 인증버튼으로 구성되어 있는 핵심 기능 컴포넌트(프론트엔드 Mock 인증) */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동
import "../../../css/admin/adminfirstcss/AdminAuthForm.css";
import gearImg from "../../../image/admin/gear.png"; // 기어 이미지
import minicircleImg from "../../../image/admin/minicircle.png"; // 미니 서클 이미지

// const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export default function AdminAuthForm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Mock 인증 함수 ---
  const mockAuth = (password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (password === "hanseo") {
          resolve({ success: true });
        } else {
          resolve({ success: false });
        }
      }, 800); // 0.8초 후 응답 시뮬레이션
    });
  };

  // 인증 버튼 클릭 시
  const handleAuth = async () => {
    if (!password.trim()) { 
      alert("암호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      // --- 실제 백엔드 API 호출 부분 (주석 처리) ---
      /*
      const res = await axios.post(
        `${BASE_URL}/api/admin/login`,
        {},
        {
          headers: {
            PASSWORD: password,
          },
        }
      );
      if (res.status === 200) {
        alert("인증 성공!");
        navigate("/admin/main");
      } else {
        alert("암호가 틀렸습니다.");
      }
      */

      // --- Mock 인증 사용 ---
      const res = await mockAuth(password);
      if (res.success) {
        alert("인증 성공!");
        navigate("/admin/main"); // 성공 시 이동
      } else {
        alert("암호가 틀렸습니다.");
      }

    } catch (error) {
      console.error(error);
      alert("인증 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="icon-circle">
        <span className="gear-icon">
          <img src={gearImg} className="gearimg" alt="기어" /> {/*style={{width: '118px', height: '118px'}}*/}
          <img src={minicircleImg} className="minicircleimg" alt="미니 원"/>
        </span>
      </div>
      <h2 className="auth-title">관리자 인증</h2>
      <p className="sub-text">관리자 권한이 필요합니다</p>

      <div className="input-container">
        <p>관리자 암호</p>
        <input
          type="password"
          placeholder="암호를 입력해주세요"
          className="input-box"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submit-btn" onClick={handleAuth} disabled={loading}>
          {loading ? "인증 중..." : "인증하기"}
        </button>
      </div>
    </div>
  );
}
