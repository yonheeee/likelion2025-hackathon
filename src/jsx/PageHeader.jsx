import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/PageHeader.css";
import BackArrow from "../image/backarrow.svg";

const PageHeader = ({ title, subtitle, hideBack=false, backTo, onBack, right=null }) => {
    const navigate = useNavigate();

    const goBack = () => {
        if (onBack) return onBack();
        if (backTo) return navigate(backTo);
        if (window.history.length > 1) navigate(-1);
        else navigate("/");
    };

    return (
        <div className="ph" style={{marginBottom: '1rem'}}>
            {!hideBack && (
                <button type="button" className="ph-back" onClick={goBack} aria-label="뒤로가기">
                    <img src={BackArrow} alt="" className="ph-back-ic" aria-hidden />
                </button>
            )}
            <div className="ph-texts">
                <h1 className="ph-title">{title}</h1>
                {/*{subtitle && <p className="ph-sub">{subtitle}</p>}*/}
            </div>
            {right && <div className="ph-right">{right}</div>}
        </div>
    );
};

export default PageHeader;

