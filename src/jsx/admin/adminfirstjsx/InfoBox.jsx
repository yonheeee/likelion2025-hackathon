/* 관리자페이지 관련 설명을 서술해놓은 컴포넌트(로직 구현 없음.) */
import React from "react";
import "../../../css/admin/adminfirstcss/InfoBox.css";
import warningImg from "../../../image/admin/warning.png"; // 느낌표 이미지

export default function InfoBox() {
  return (
    <div className="info-box-container">
      <div className="info-box">
        <div className="info-title">
          <img 
            src={warningImg} 
            alt="느낌표 이미지" 
            className="info-image" 
          />
          <div className="info-title-text" style={{fontWeight: '400'}}>관리자 권한 안내</div>
        </div>

        <div className="info-desc" style={{fontWeight: '400'}}>
          관리자 계정으로 로그인하면 모든 민원을 조회하고<br/>관리할 수 있습니다.
        </div>
      </div>
    </div>
  );
}

