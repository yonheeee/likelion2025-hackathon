// src/jsx/common/IdentityFields.jsx
import React from "react";

const formatPhone = (v) =>
  v.replace(/[^\d]/g, "")
   .replace(/(^\d{3})(\d{0,4})(\d{0,4}).*/, (_, a, b, c) =>
     [a, b, c].filter(Boolean).join("-")
   );

export default function IdentityFields({
  value = { name: "", phone: "" },
  onChange,
  required = true,
}) {
  const set = (k) => (e) =>
    onChange?.({ ...value, [k]: k === "phone" ? formatPhone(e.target.value) : e.target.value });

  return (
    <>
      <div className="form-row">
        <label className="label">
          이름 {required && <span className="req">*</span>}
        </label>
        <input
          className="input"
          placeholder="이름을 입력해주세요"
          value={value.name}
          onChange={set("name")}
          required={required}
        />
      </div>

      <div className="form-row">
        <label className="label">
          전화번호 {required && <span className="req">*</span>}
        </label>
        <input
          className="input"
          type="tel"
          inputMode="numeric"
          placeholder="010 - 0000 - 0000"
          value={value.phone}
          onChange={set("phone")}
          pattern="\d{3}-\d{3,4}-\d{4}"
          required={required}
        />
      </div>
    </>
  );
}
