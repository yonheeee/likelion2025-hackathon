/* 요소들을 병합하고 하나의 페이지로 구성하여 컴포넌트 제작 */
import React from "react";
import Header from "../admindetailjsx/Header";
import Title from "../admindetailjsx/Title";
import ComplaintInfoCard from "../admindetailjsx/ComplaintInfoCard";
import HistoryCard from "../admindetailjsx/HistoryCard";
import CommentSection from "../admindetailjsx/CommentSection";

export default function AdmindetailsPage() {
  const complaintId = 1; // 추후 router params나 state로 대체 가능

  return (
    <div className="admin-auth-page">
      <Header />
      <Title />
      <ComplaintInfoCard complaintId={complaintId}/>
      <HistoryCard complaintId={complaintId}/>
      <CommentSection complaintId={complaintId}/>
    </div>
  );
}

