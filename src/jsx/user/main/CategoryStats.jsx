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
    // 아이콘 자리만 만들어둠 (나중에 실제 아이콘으로 교체)
    return (
      <div className="icon-placeholder">
        {/* 아이콘 자리 */}
      </div>
    );
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
