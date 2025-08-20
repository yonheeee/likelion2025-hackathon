import React from "react";
import "../admindetailcss/title.css";
import arrowimg from "../images/arrow.png";
import { useNavigate } from "react-router-dom";

export default function Title() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/main");
  }

  return (
    <div className="title">
      <img src={arrowimg} alt="arrow" onClick={handleClick} style={{cursor: "pointer"}}/>
      <h3>민원 처리하기</h3>
      </div>
  );
}