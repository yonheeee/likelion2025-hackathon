/* 요소들을 병합하고 하나의 페이지로 구성하여 컴포넌트 제작 */
import React from "react";
import ComplaintInfoCard from "../admindetailjsx/ComplaintInfoCard";
import HistoryCard from "../admindetailjsx/HistoryCard";
import CommentSection from "../admindetailjsx/CommentSection";

import { useLocation } from "react-router-dom";

export default function AdmindetailsPage() {
  const location = useLocation();
  const complaintId = location.state?.complaintId ?? 1; // 기본값 1

  return (
    <div className="admin-auth-page">
      <ComplaintInfoCard complaintId={complaintId}/>
      <HistoryCard complaintId={complaintId}/>
      <CommentSection complaintId={complaintId}/>
    </div>
  );
}
