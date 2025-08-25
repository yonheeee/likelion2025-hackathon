import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/user/receipt/UserRecipt.css";

import SectionCard from "./SectionCard";
import Field from "./Field";
import IdentityFields from "./IdentityFields";
import PhotoUploader from "./PhotoUploader";
import PageHeader from "../../PageHeader.jsx";

import UserIcon from "../../../image/User/receipt/usericon.svg";
import LocationIcon from "../../../image/User/main/location.svg";
import PhotoIcon from "../../../image/User/receipt/photoicon.svg";
import WriteIcon from "../../../image/User/receipt/writeicon.svg";
import Plus from "../../../image/User/receipt/plus.svg";
// 민원 접수
export default function ComplaintCreate() {
  const navigate = useNavigate();

  const [identity, setIdentity] = useState({ name: "", phone: "" });
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [photos, setPhotos] = useState([]); // 여러 장 업로드 가능
  const [category, setCategory] = useState("");
  const [chips, setChips] = useState([]);

  const allCategories = [
    "환경/청소",
    "시설물 파손/관리",
    "교통/주정차",
    "안전/위험",
    "생활 불편",
    "기타/행정",
  ];

  const valid =
    identity.name && identity.phone && region && title && detail.length >= 5;

  // 지역 목록 API 호출
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await fetch("/api/regions/seosan");
        if (!res.ok) throw new Error("지역 목록 불러오기 실패");
        const data = await res.json();
        setRegions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRegions();
  }, []);

  // 민원 접수 API 호출
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. 사진 업로드 (있을 경우만)
      let uploadedUrls = [];
      if (photos && photos.length > 0) {
        const formData = new FormData();
        photos.forEach((file) => formData.append("files", file));

        const uploadRes = await fetch("/api/attachments/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("사진 업로드 실패");
        uploadedUrls = await uploadRes.json();
      }

      // 2. 민원 접수
      const complaintBody = {
        title: title,
        userName: identity.name,
        phoneNumber: identity.phone,
        content: detail,
        address: region,
        category: category || "OTHERS_ADMIN", // 기본값
        imageUrls: uploadedUrls,
      };

      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complaintBody),
      });

      if (!res.ok) throw new Error("민원 접수 실패");
      const data = await res.json();

      alert("민원이 정상적으로 접수되었습니다.");
      navigate("/usercheck"); // 접수 후 본인확인 페이지로 이동
    } catch (err) {
      console.error(err);
      alert("민원 접수 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className="report-page">
      <PageHeader
        title="민원 접수하기"
        subtitle="민원사항을 자세히 작성해주세요"
      />

      <form onSubmit={handleSubmit}>
        {/* 개인정보 */}
        <SectionCard title="개인정보" icon={UserIcon}>
          <IdentityFields value={identity} onChange={setIdentity} />
        </SectionCard>

        {/* 민원발생 지역 */}
        <SectionCard title="민원발생 지역" icon={LocationIcon}>
          <Field label="지역선택" required>
            <div className="select-wrap">
              <select
                className="select"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              >
                <option value="" disabled>
                  지역을 선택해주세요
                </option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="select-arrow" aria-hidden></span>
            </div>
          </Field>
        </SectionCard>

        {/* 사진 업로드 */}
        <SectionCard title="현장사진" icon={PhotoIcon}>
          <Field label="사진 첨부">
            <PhotoUploader value={photos} onChange={setPhotos} multiple />
          </Field>
        </SectionCard>

        {/* 민원 내용 */}
        <SectionCard title="민원 내용" icon={WriteIcon}>
          <Field label="제목" required>
            <input
              className="input"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Field>

          <Field label="상세 내용" required>
            <textarea
              className="textarea"
              placeholder="민원 내용을 자세히 작성해주세요."
              maxLength={500}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              required
            />
            <div className="textarea-foot">
              <p className="helper">
                상세하게 작성될수록 더 빠른 처리가 가능합니다
              </p>
              <div className="textarea-right">
                <span className="limit">{detail.length} / 500</span>
                <button className="ai-btn" type="button">
                  AI 작성
                </button>
              </div>
            </div>
          </Field>
        </SectionCard>

        {/* 카테고리 선택 */}
        <div className="chips">
          {chips.map((c) => (
            <div
              key={c}
              className={`chip ${category === c ? "active" : ""}`}
              onClick={() => setCategory(category === c ? "" : c)}
            >
              {c}
              <span
                className="chip-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  setChips(chips.filter((chip) => chip !== c));
                  if (category === c) setCategory("");
                }}
              >
                ✕
              </span>
            </div>
          ))}

          <div className="chip add">
            <button className="plus-btn" type="button">
              <img src={Plus} alt="추가" style={{ width: "16px", height: "16px" }} />
            </button>

            <select
              className="category-select"
              onChange={(e) => {
                const c = e.target.value;
                if (c) {
                  if (!chips.includes(c)) setChips([...chips, c]);
                  setCategory(c);
                }
                e.target.value = "";
              }}
            >
              {allCategories
                .filter((c) => !chips.includes(c))
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="submit-bar">
          <button className="submit-btn" type="submit" disabled={!valid}>
            민원 접수하기
          </button>
        </div>
      </form>
    </main>
  );
}
