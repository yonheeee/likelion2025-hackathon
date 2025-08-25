import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import PageHeader from "../../PageHeader.jsx";
import SectionCard from "../receipt/SectionCard.jsx";
import IdentityFields from "../receipt/IdentityFields.jsx";

import UserIcon from "../../../image/User/receipt/usericon.svg";
import "../../../css/user/check/UserCheck.css";

export default function UserCheck() {
  const [info, setInfo] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!info.name || !info.phone) {
      setError("이름과 전화번호를 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get('http://13.125.98.203/api/complaints/my', {
        params: {
          userName: info.name,
          phoneNumber: info.phone,
        }
      });

      sessionStorage.setItem('userName', info.name);
      sessionStorage.setItem('phoneNumber', info.phone);
      
      navigate("/mycomplaint", { state: { complaints: response.data.complaints } });

    } catch (err) {
      console.error("민원 조회 실패:", err);
      if (err.response && err.response.status === 404) {
        setError("입력하신 정보와 일치하는 민원이 없습니다.");
      } else {
        setError("조회 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="receiptcheck-page">
        <PageHeader
            title="내 민원 조회하기"
            subtitle="본인 확인 후 접수하신 민원을 확인하실 수 있습니다."
        />

        <SectionCard title="본인확인" icon={UserIcon}>
          <form onSubmit={handleSubmit}>
            <IdentityFields value={info} onChange={setInfo} />

          {error && <p className="error-message">{error}</p>}

         
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? '확인 중...' : '본인확인'}
          </button>
        </form>
      </SectionCard>

        <div className="notice-box">
          <div className="notice-title">안내사항</div>
          <ul>
            <li>민원 접수를 해야 입력한 정보와 정확한 일치 시 조회가 가능합니다.</li>
            <li>본인 확인은 내가 쓴 민원 확인을 위한 필수 절차입니다.</li>
          </ul>
        </div>
      </div>
      <div className="notice-box">
        <div className="notice-title">안내사항</div>
        <ul>
          <li>민원 접수를 해야 입력한 정보와 정확한 일치 시 조회가 가능합니다.</li>
          <li>본인 확인은 내가 쓴 민원 확인을 위한 필수 절차입니다.</li>
        </ul>
      </div>
    </div>
  );
}