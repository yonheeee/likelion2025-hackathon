import React, { useEffect, useRef } from "react";
import "../../../css/user/receipt/PhotoUploader.css";

import Photo from "../../../image/User/receipt/photo.svg"
// 사진등록
const PhotoUploader = ({ value, onChange }) => {
  const inputRef = useRef(null);

  const pick = (files) => {
    const f = files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    onChange(url);
  };

  useEffect(() => () => { if (value) URL.revokeObjectURL(value); }, [value]);

  return (
    <div
      className="upload-area"
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { e.preventDefault(); pick(e.dataTransfer.files); }}
    > 
      {value ? (
        <img src={value} alt="선택한 사진 미리보기" className="preview" />
      ) : (
        <div className="upload-hint">
          <img src={Photo} alt="사진 아이콘" className="upload-icon" />
          <div>사진을 선택하세요</div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => pick(e.target.files)}
      />
    </div>
  );
};

export default React.memo(PhotoUploader);
