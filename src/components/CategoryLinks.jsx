import React from "react";
import "../styles/CategoryLinks.css";
import plant from "../images/plant.png";
import building from "../images/building.png";
import car from "../images/car.png";
import shield from "../images/shield.png";
import life from "../images/life.png";
import etc from "../images/etc.png";

export default function CategoryLinks() {
  const categories = [
    { name: "환경/청소", icon: plant, color: "first" },
    { name: "시설물 파손/관리", icon: building, color: "second" },
    { name: "교통/주정차", icon: car, color: "third" },
    { name: "안전/위험", icon: shield, color: "fourth" },
    { name: "생활 불편", icon: life, color: "fifth" },
    { name: "기타/행정", icon: etc, color: "sixth" },
  ];

  return (
    <div className="category-wrapper">
      <h3 className="category-title">카테고리별 민원</h3>
      <div className="category">
        {categories.map((cat, idx) => (
          <div key={idx} className={`category-card ${cat.color}`}>
            <span>{cat.name}</span>
            <img src={cat.icon} alt={cat.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
