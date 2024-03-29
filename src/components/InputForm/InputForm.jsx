import React from "react";
import "./InputForm.css";
const InputForm = (props) => {
  const { data, setData, type, placeholder,disabled } = props;
  return (
    <>
      <div className="inputForm">
        <input
        className="input"
        autoComplete="off"
        disabled={disabled}
          type={type}
          placeholder={placeholder}
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
    </>
  );
};

export default InputForm;
