// ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // 페이지 최상단으로 이동
  }, [pathname]);

  return null;
}
