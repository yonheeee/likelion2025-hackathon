/* 화면 상단 */
import React, { use } from "react";
import { useNavigate } from "react-router-dom"; 
import logoImage from "../images/brandlogo.png"
import "../styles/Header.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <>
    <div className="header">
      <div className="logo">
        <img src={logoImage} alt="로고 이미지" 
        className="logoimg"/>
      </div>
    </div>
    </>
  );
}
