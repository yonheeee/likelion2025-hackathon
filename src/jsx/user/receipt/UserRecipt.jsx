import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/user/receipt/UserRecipt.css";
import axios from "axios";

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


import Photo from "../../../image/User/receipt/photo.svg";
axios.defaults.baseURL = "http://13.125.98.203/api";

export default function ComplaintCreate() {
  const navigate = useNavigate();

  const [identity, setIdentity] = useState({ name: "", phone: "" });
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [photos, setPhotos] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [category, setCategory] = useState("");
  const [chips, setChips] = useState([]);

  const [isLoadingRegions, setIsLoadingRegions] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allCategories = [
    "환경/청소",
    "시설물 파손/관리",
    "교통/주정차",
    "안전/위험",
    "생활 불편",
    "기타/행정",
  ];

  const CATEGORY_ENUM_MAP = useMemo(
    () => ({
      "환경/청소": "ENVIRONMENT_CLEANING",
      "시설물 파손/관리": "FACILITY_DAMAGE",
      "교통/주정차": "TRAFFIC_PARKING",
      "안전/위험": "SAFETY_RISK",
      "생활 불편": "LIVING_INCONVENIENCE",
      "기타/행정": "OTHERS_ADMIN",
    }),
    []
  );

  const valid =
    identity.name && identity.phone && region && title && detail.length >= 5;


  useEffect(() => {
    const loadRegions = async () => {
      try {
        setIsLoadingRegions(true);
        const { data } = await axios.get("/regions/seosan");
        setRegions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        alert("지역 목록 불러오기 실패");
      } finally {
        setIsLoadingRegions(false);
      }
    };
    loadRegions();
  }, []);

  const ensurePhotosUploaded = async () => {
    if (uploadedUrls.length > 0 && uploadedUrls.length === photos.length) {
      return uploadedUrls;
    }
    if (!photos || photos.length === 0) return [];

    try {
      setIsUploading(true);
      const formData = new FormData();
      photos.forEach((file) => formData.append("files", file));

      const { data } = await axios.post("/attachments/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedUrls(data);
      return data;
    } catch (err) {
      console.error(err);
      alert("사진 업로드 실패");
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const handleAICompose = async () => {
    try {
      setIsComposing(true);
      const urls = await ensurePhotosUploaded();

      const { data } = await axios.post("/complaints/ai/compose", {
        content: detail || "",
        imageUrls: urls,
      });

      if (data?.title) setTitle(data.title);
      if (data?.docMarkdown) setDetail(data.docMarkdown);
    } catch (err) {
      console.error(err);
      alert("AI 작성 실패");
    } finally {
      setIsComposing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const urls = await ensurePhotosUploaded();

      const enumValue =
        CATEGORY_ENUM_MAP[category] || "OTHERS_ADMIN";

      const body = {
        title,
        userName: identity.name,
        phoneNumber: identity.phone,
        content: detail,
        address: region,
        category: enumValue,
        imageUrls: urls,
      };

      await axios.post("/complaints", body);

      alert("민원이 정상적으로 접수되었습니다.");
      navigate("/usercheck");
    } catch (err) {
      console.error(err);
      alert("민원 접수 실패");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="report-page">
      <PageHeader title="민원 접수하기" subtitle="민원사항을 자세히 작성해주세요" />

      <form onSubmit={handleSubmit}>
        {/* 개인정보 */}
        <SectionCard title="개인정보" icon={UserIcon}>
          <IdentityFields value={identity} onChange={setIdentity} />
        </SectionCard>

        <SectionCard title="민원발생 지역" icon={LocationIcon}>
          <Field label="지역선택" required>
            <div className="select-wrap">
              <select
                className="select"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
                disabled={isLoadingRegions}
              >
                <option value="" disabled>
                  {isLoadingRegions ? "불러오는 중..." : "지역을 선택해주세요"}
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

        <SectionCard title="현장사진" icon={PhotoIcon}>
          <Field label="사진 첨부">
            <PhotoUploader
              className="upload-hint"
              img src={Photo} alt="사진 아이콘"
              사진을 선택하세요
              value={photos}
              onChange={(f) => {
                setPhotos(f);
                setUploadedUrls([]);
              }}
              multiple
            />
          </Field>
        </SectionCard>

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
              <p className="helper">상세하게 작성될수록 더 빠른 처리가 가능합니다</p>
              <div className="textarea-right">
                <span className="limit">{detail.length} / 500</span>
                <button
                  className="ai-btn"
                  type="button"
                  onClick={handleAICompose}
                  disabled={isComposing}
                >
                  {isComposing ? "AI 작성 중..." : "AI 작성"}
                </button>
              </div>
            </div>
          </Field>
        </SectionCard>

        {/* 카테고리 칩 */}
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
              <img src={Plus} alt="추가" style={{ width: 16, height: 16 }} />
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

        <div className="submit-bar">
          <button
            className="submit-button"
            type="submit"
            disabled={!valid || isSubmitting}
          >
            {isSubmitting ? "접수 중..." : "민원 접수하기"}
          </button>
        </div>
      </form>
    </main>
  );
}
