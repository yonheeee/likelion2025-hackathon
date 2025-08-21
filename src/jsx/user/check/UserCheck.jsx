import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../PageHeader.jsx";
import SectionCard from "../receipt/SectionCard.jsx";
import IdentityFields from "../receipt/IdentityFields.jsx";

import UserIcon from "../../../image/User/receipt/usericon.svg"; // 사람 아이콘
import "../../../css/user/check/UserCheck.css";

export default function UserCheck() {
  const [info, setInfo] = useState({ name: "", phone: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("제출 데이터:", info);

    const success = true; 
    if (success) {
      navigate("/my-complaints"); 
    } else {
      alert("본인 확인에 실패했습니다. 다시 시도해주세요.");
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

          <button type="submit" className="submit-btn">
            본인확인
          </button>
        </form>
      </SectionCard>

      <div className="notice-box">
        <div className="notice-title">안내사항</div>
        <ul>
          <li>민원 접수를 해야 입력한 정보와 정확한 일치 시 조회가 가능합니다.</li>
          <li>본인 확인은 내/가 쓴 민원 확인을 위한 필수 절차입니다.</li>
        </ul>
      </div>
    </div>
  );
}
