/* 요소들을 병합하고 하나의 페이지로 구성하여 컴포넌트 제작 */
import React from "react";
import Header from "../admindetailjsx/Header";
import Title from "../admindetailjsx/Title";

export default function Admindetails() {
  return (
    <div className="admin-auth-page">
      <Header />
      <Title />
    </div>
  );
}
