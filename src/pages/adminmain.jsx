/* 요소들을 병합하고 하나의 페이지로 구성하여 컴포넌트 제작 */
import React from "react";
import Header from "../adminmainjsx/Header";
import DashboardButtons from "../adminmainjsx/DashboardButtons";
import CategoryLinks from "../adminmainjsx/CategoryLinks";
import ReportSection from "../adminmainjsx/ReportSection";
import Notices from "../adminmainjsx/Notices";

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
