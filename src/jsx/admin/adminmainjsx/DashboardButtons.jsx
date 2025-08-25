import React from "react";
import "../../../css/admin/adminmaincss/DashboardButtons.css";
import firstbtn from "../../../image/admin/firstbtn.png";
import secondbtn from "../../../image/admin/secondbtn.png";
import sirenImg from "../../../image/admin/siren.png";
import groupImg from "../../../image/admin/group.png";
import { useNavigate } from "react-router-dom";

export default function DashboardButtons() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-section">
        <h3 className="dash-title">관리자 대시보드</h3>
        <p className="subtitle">접수된 민원을 확인하고 처리하세요</p>
          <div style={{width: '90%', margin: '0 5% 5% 5%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div className="btn1" onClick={() => navigate("/admin/sorted")}>
              <img src={sirenImg} alt="접수된 민원" style={{width: '36px', height: '40px', marginTop: '10px'}}/>
              <p>긴급 민원</p>
            </div>
            <div className="btn2" onClick={() => navigate("/admin/sorted")}>
              <img src={groupImg} alt="처리된 민원" style={{width: '55px', height: '40px', marginTop: '10px'}}/>
              <p>다발 민원</p>
            </div>
          </div>
      </div>
    </div>
  );
}
