import React from "react";
import "../../../css/user/main/CategoryStats.css";

const CategoryStats = () => {
  // API 호출 예시 (나중에 실제 API 호출로 대체)
  const fetchCategoryData = async () => {
    // 실제 API 호출 시: return await fetch('/api/category/stats').then(res => res.json());
    return [
      {
        name: "환경/청소",
        percentage: "4.5%",
        change: "4.5%",
        changeType: "increase",
        icon: "leaf",
        color: "#10B981"
      },
      {
        name: "시설물 파손/관리",
        percentage: "4.5%",
        change: "4.5%",
        changeType: "decrease",
        icon: "building",
        color: "#F59E0B"
      },
      {
        name: "교통/주정차",
        percentage: "25.8%",
        change: "25.8%",
        changeType: "increase",
        icon: "car",
        color: "#3B82F6"
      },
      {
        name: "안전/위험",
        percentage: "8.3%",
        change: "8.3%",
        changeType: "increase",
        icon: "shield",
        color: "#EF4444"
      },
      {
        name: "생활 불편",
        percentage: "12.6%",
        change: "12.6%",
        changeType: "decrease",
        icon: "person",
        color: "#8B5CF6"
      },
      {
        name: "기타/행정",
        percentage: "3.2%",
        change: "3.2%",
        changeType: "decrease",
        icon: "list",
        color: "#6B7280"
      }
    ];
  };

  // 현재는 기본값 사용 (나중에 useState와 useEffect로 API 호출)
  const categoryData = [
    {
      name: "환경/청소",
      percentage: "4.5%",
      change: "4.5%",
      changeType: "increase",
      icon: "leaf",
      color: "#10B981"
    },
    {
      name: "시설물 파손/관리",
      percentage: "4.5%",
      change: "4.5%",
      changeType: "decrease",
      icon: "building",
      color: "#F59E0B"
    },
    {
      name: "교통/주정차",
      percentage: "25.8%",
      change: "25.8%",
      changeType: "increase",
      icon: "car",
      color: "#3B82F6"
    },
    {
      name: "안전/위험",
      percentage: "8.3%",
      change: "8.3%",
      changeType: "increase",
      icon: "shield",
      color: "#EF4444"
    },
    {
      name: "생활 불편",
      percentage: "12.6%",
      change: "12.6%",
      changeType: "decrease",
      icon: "person",
      color: "#8B5CF6"
    },
    {
      name: "기타/행정",
      percentage: "3.2%",
      change: "3.2%",
      changeType: "decrease",
      icon: "list",
      color: "#6B7280"
    }
  ];

  const getIcon = (iconType) => {
    switch (iconType) {
      case "leaf":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      case "building":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z"/>
          </svg>
        );
      case "car":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
          </svg>
        );
      case "shield":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
        );
      case "person":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        );
      case "list":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="category-stats">
      <h3 className="category-title">카테고리별 민원 현황</h3>
      
      <div className="category-grid">
        {categoryData.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-icon" style={{ color: category.color }}>
              {getIcon(category.icon)}
            </div>
            <div className="category-info">
              <div className="category-name">{category.name}</div>
              <div className="category-percentage">{category.percentage}</div>
            </div>
            <div className={`category-change ${category.changeType}`}>
              {category.change} {category.changeType === "increase" ? "▲" : "▼"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryStats;
