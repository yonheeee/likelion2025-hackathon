import React from "react";
import { useLocation} from "react-router-dom";
import MyComplaintItem from "./MyComplaintItem";
import PageHeader from "../../PageHeader.jsx";
import "../../../css/user/mycomplaint/MyComplaintsPage.css";
// 내 민원 불러오기
export default function MyComplaintsPage() {
  const location = useLocation();

  // UserCheck에서 넘어온 데이터
  const complaints = location.state?.complaints || [];
  const user = location.state?.user;

  return (
    <div className="mycomplaint-page">
      <PageHeader
        title="내 민원"
        subtitle={user ? `${user.name}님이 접수한 민원 목록` : "내가 쓴 민원입니다"}
      />

      <div className="mycomplaint-container">
        {complaints.length > 0 ? (
          complaints.map((c) => (
            <MyComplaintItem
              key={c.id}
              title={c.title}
              date={new Date(c.createdAt).toLocaleDateString("ko-KR")}
              content={c.content}
              location={c.address}
              status={c.status}
              category={c.category}
              onCancel={() => alert(`${c.title} 민원을 취소하시겠습니까?`)}
            />
          ))
        ) : (
          <p className="no-complaints">등록된 민원이 없습니다.</p>
        )}
      </div>

    </div>
  );
}
