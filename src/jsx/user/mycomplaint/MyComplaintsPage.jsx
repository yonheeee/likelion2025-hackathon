import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // axios import
import MyComplaintItem from "./MyComplaintItem";
import PageHeader from "../../PageHeader.jsx";
import "../../../css/user/mycomplaint/MyComplaintsPage.css";

export default function MyComplaintsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. 민원 목록을 state로 관리하여 삭제 시 업데이트 가능하게 변경
  const [complaints, setComplaints] = useState(location.state?.complaints || []);
  const [user, setUser] = useState({ name: "", phone: "" });

  useEffect(() => {
    const storedName = sessionStorage.getItem('userName');
    const storedPhone = sessionStorage.getItem('phoneNumber');

    if (storedName && storedPhone) {
      setUser({ name: storedName, phone: storedPhone });
    } else {
      alert("인증 정보가 없습니다. 다시 본인확인을 진행해주세요.");
      navigate("/user-check"); 
    }
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm("정말로 이 민원을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://13.125.98.203/api/complaints/my/${id}`, {
          params: {
            userName: user.name,
            phoneNumber: user.phone,
          }
        });
        
        setComplaints(prevComplaints => prevComplaints.filter(c => c.id !== id));
        alert("민원이 성공적으로 삭제되었습니다.");

      } catch (err) {
        console.error("민원 삭제 실패:", err);
        alert("민원 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="mycomplaint-page">
      <PageHeader
        title="내 민원"
        subtitle={user.name ? `${user.name}님이 접수한 민원 목록` : "내가 쓴 민원입니다"}
      />
      <div className="mycomplaint-container">
        {complaints.length > 0 ? (
          complaints.map((c) => (
            <MyComplaintItem
              key={c.id}
              complaint={c} 
              onDelete={() => handleDelete(c.id)} 
            />
          ))
        ) : (
          <p className="no-complaints">등록된 민원이 없습니다.</p>
        )}
      </div>
    </div>
  );
}