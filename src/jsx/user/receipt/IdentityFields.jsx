import React from "react";

// 전화번호에서 `-`를 제거한 숫자만 반환하는 함수
const formatPhone = (v) =>
    v.replace(/[^\d]/g, "") // 숫자만 남기고 나머지 제거
        .replace(/(^\d{3})(\d{0,4})(\d{0,4}).*/, (_, a, b, c) =>
            [a, b, c].filter(Boolean).join("-") // 전화번호를 -로 구분된 형식으로 변환
        );

export default function IdentityFields({
                                           value = { name: "", phone: "" },
                                           onChange,
                                           required = true,
                                       }) {
    const set = (k) => (e) =>
        onChange?.({
            ...value,
            [k]: k === "phone" ? e.target.value.replace(/[^\d]/g, "") : e.target.value, // 전화번호에서 - 제거하고 숫자만 저장
        });

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
                    placeholder="010-0000-0000"
                    value={formatPhone(value.phone)}
                    onChange={set("phone")}
                    pattern="\d{3}-\d{3,4}-\d{4}"
                    required={required}
                />
            </div>
        </>
    );
}

