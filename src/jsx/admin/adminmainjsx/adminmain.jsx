/* 요소들을 병합하고 하나의 페이지로 구성하여 컴포넌트 제작 */
import React from "react";
import Header from "./Header";
import DashboardButtons from "./DashboardButtons";
import CategoryLinks from "./CategoryLinks";
import ReportSection from "./ReportSection";
import Notices from "./Notices";

export default function Adminmain() {
  return (
    <div className="admin-auth-page">
      <Header />
      <DashboardButtons />
      <CategoryLinks />
      <ReportSection />
      <Notices />
    </div>
  );
}
