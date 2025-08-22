/* 화면 상단의 로고를 표시하고 홈화면으로 진행되는 화살표의 네비게이트를 수행하는 컴포넌트 */
import React, { use } from "react";
import { useNavigate } from "react-router-dom"; //화살표 클릭시 홈화면 이동에 사용
import "../adminfirstcss/Header.css";
import arrowImg from "../images/arrow.png"; //화살표 이미지
import logoImg from "../images/brandlogo.png"; //로고 이미지

export default function Header() {
  const navigate = useNavigate();

  const handleback = () => {
    navigate("/") /* 홈화면 경로 입력 */
  }
  return (
    <>
    <div className="header">
      <div className="logo">
        <img src={logoImg} alt="로고 이미지" 
        className="logoimg"/>
      </div>
    </div>
    <button className="back-btn" onClick={handleback}> {/*화살표 이미지*/}
      <img src={arrowImg} alt="화살표 이미지" 
      className="arrowimg"/> 
    </button>
    </>
  );
}
