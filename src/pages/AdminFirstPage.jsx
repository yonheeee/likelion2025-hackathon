/* 요소들을 병합하고 하나의 페이지로 구성하여 컴포넌트 제작 */
import React from "react";
import Header from "../adminfirstjsx/Header";
import AdminAuthForm from "../adminfirstjsx/AdminAuthForm";
import InfoBox from "../adminfirstjsx/InfoBox";

export default function AdminFirstPage() {
  return (
    <div className="admin-auth-page">
      <Header />
      <AdminAuthForm />
      <InfoBox />
    </div>
  );
}
