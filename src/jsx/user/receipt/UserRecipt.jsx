import { useState } from "react";
import "../../../css/user/receipt/UserRecipt.css"
import { useNavigate } from "react-router-dom";
import SectionCard from "./SectionCard";
import Field from "./Field";
import IdentityFields from "./IdentityFields";
import PhotoUploader from "./PhotoUploader";

export default function ComplaintCreate() {
  const navigate = useNavigate();

  const goBack = () => {
    // 뒤로 갈 기록이 없을 때는 홈으로 폴백
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };
  const [identity, setIdentity] = useState({ name: "", phone: "" });
  const [region, setRegion] = useState("");
  const [title, setTitle]   = useState("");
  const [detail, setDetail] = useState("");
  const [photo, setPhoto]   = useState(null);
  const [category, setCategory] = useState("");

  const regions = ["서울", "경기", "인천", "부산", "전남"];
  const chips = ["환경/청소", "시설물 파손/관리", "교통/주정차"];

  const valid =
    identity.name && identity.phone && region && title && detail.length >= 5;

  return (
    <main className="report-page">
      {/* 상단 타이틀 */}
      <header className="rph">
      <button
        type="button"
        className="rph-back"
        onClick={goBack}
        aria-label="뒤로가기"
      >
        ←
      </button>
        <div>
          <h1 className="rph-title">민원 접수하기</h1>
          <p className="rph-sub">민원사항을 자세히 작성해주세요</p>
        </div>
      </header>

      {/* 개인정보 */}
      <SectionCard title="개인정보" icon="person">
        <IdentityFields value={identity} onChange={setIdentity} />
      </SectionCard>

      {/* 지역 */}
      <SectionCard title="민원발생 지역" icon="location">
        <Field label="지역선택" required>
          <div className="select-wrap">
            <select className="select" value={region} onChange={(e)=>setRegion(e.target.value)} required>
              <option value="" disabled>지역을 선택해주세요</option>
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <span className="select-arrow" aria-hidden>▾</span>
          </div>
        </Field>
      </SectionCard>

      {/* 현장사진 */}
      <SectionCard title="현장사진" icon="camera">
        <Field label="사진 첨부">
          <PhotoUploader value={photo} onChange={setPhoto} />
        </Field>
      </SectionCard>

      {/* 민원 내용 */}
      <SectionCard title="민원 내용" icon="pencil">
        <Field label="제목" required>
          <input className="input" placeholder="제목을 입력해주세요." value={title}
            onChange={(e)=>setTitle(e.target.value)} required/>
        </Field>

        <Field label="상세 내용" required helper="상세하게 작성될수록 더 빠른 처리가 가능합니다">
          <textarea className="textarea" placeholder="민원 내용을 자세히 작성해주세요."
            maxLength={500} value={detail} onChange={(e)=>setDetail(e.target.value)} required />
          <div className="textarea-foot">
            <span className="limit">{detail.length} / 500</span>
            <button className="ai-btn" type="button">AI 작성</button>
          </div>
        </Field>
      </SectionCard>

      {/* 카테고리 칩 */}
      <div className="chips">
        {chips.map(c => (
          <button key={c} type="button"
            className={`chip ${category===c ? "active" : ""}`}
            onClick={()=>setCategory(category===c ? "" : c)}>
            {c}
          </button>
        ))}
        <button className="chip add" type="button">＋</button>
      </div>

      {/* 하단 고정 제출 버튼 */}
      <div className="submit-bar">
        <button className="submit-btn" disabled={!valid}>민원 접수하기</button>
      </div>
    </main>
  );
}
