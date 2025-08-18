import React from "react";
import "../admindetailcss/title.css";
import arrowimg from "../images/arrow.png";

export default function Title() {
  return (
    <div className="title">
      <img src={arrowimg} alt="arrow" />
      <h3>민원 처리하기</h3>
      </div>
  );
}