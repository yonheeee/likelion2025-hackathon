import React from "react";
import "../admindetailcss/ComplaintInfoCard.css";
import compInfo from "../images/compInfo.png"; 
import AIbtn2 from "../images/AIbtn2.png";

export default function ComplaintInfoCard() {
  return (
    <div className="complaint-card">
      <div className="complaint-header">
        <span className="complaint-icon"><img src={compInfo} alt="민원 정보 아이콘"/></span>
        <span className="complaint-title">민원 정보</span>
      </div>

      <div className="complaint-body">
        <h4 className="complaint-subtitle">제목</h4>
        <h3 className="complaint-main-title">공원시설의 문제</h3>
        <p className="complaint-text">
          서산 중앙공원 산책로를 이용하다가 바닥이 심하게 파손된 구간을 발견했습니다. 
          위치는 중앙공원 내 체육시설을 지나 연못 쪽으로 가는 산책로 중간쯤입니다. 
          보도블록이 여러 개 들떠 있고, 한 부분은 아예 깨져서 구멍처럼 파여 있어요.
        </p>
        <p className="complaint-text">
          최근 비가 와서 물이 고여있는데, 바닥이 울퉁불퉁해서 지나가기 불편하고 
          특히 밤에는 어두워서 발을 헛디뎌 넘어질까 봐 매우 위험합니다. 
          아이들이 뛰어다니다 다칠까 봐 걱정도 됩니다.
        </p>
        <p className="complaint-text">
          시민들이 안전하게 산책로를 이용할 수 있도록 빠른 시일 내에 보수 부탁드립니다.
        </p>
      </div>

      <div className="complaint-footer">
        <img 
          src="/images/sample.png" 
          alt="민원 이미지" 
          className="complaint-image" 
        />
        <div className="complaint-tags">
          <span className="tag blue">시설물 파손/관리</span>
          <img src = {AIbtn2} alt="AI 요약 버튼" className="ai-btn" />
        </div>
      </div>

      <div className="complaint-meta">
        <p>작성자명<h5>김멋사</h5></p>
        <p className="number">전화번호<h5>010-0000-0000</h5></p>
      </div>
    </div>
  );
}
