/* 요소들을 병합하고 하나의 페이지로 구성하여 컴포넌트 제작 */
import React from "react";
import AdminAuthForm from "./AdminAuthForm";
import InfoBox from "./InfoBox";

export default function AdminFirstPage() {
  return (
    <div className="admin-auth-page">
      <AdminAuthForm />
      <InfoBox />
    </div>
  );
}
