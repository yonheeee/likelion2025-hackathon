import React from "react";
import "../../../css/user/receipt/Field.css";

const Field = ({ label, required, helper, children }) => (
  <div className="form-row">
    <label className="label">
      {label} {required && <span className="req">*</span>}
    </label>
    {children}
    {helper && <p className="helper">{helper}</p>}
  </div>
);

export default React.memo(Field);
