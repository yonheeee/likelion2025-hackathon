import React from "react";
import "../../../css/admin/adminmaincss/DashboardButtons.css";
import firstbtn from "../../../image/admin/firstbtn.png";
import secondbtn from "../../../image/admin/secondbtn.png";
import { useNavigate } from "react-router-dom";

export default function DashboardButtons() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-section">
        <h3 className="dash-title">관리자 대시보드</h3>
        <p className="subtitle">접수된 민원을 확인하고 처리하세요</p>
          <div style={{width: '90%', margin: '0 5% 5% 5%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <img src={firstbtn} alt="긴급 민원" className="btn1"
                 onClick={() => navigate("**긴급 민원을 눌렀을 때 이동할 경로**")}
                 style={{cursor: "pointer"}}/>
            <img src={secondbtn} alt="다발 민원" className="btn2"
                 onClick={() => navigate("**다발 민원을 눌렀을 때 이동할 경로**")}
                 style={{cursor: "pointer"}}/>
          </div>
      </div>
    </div>
  );
}
