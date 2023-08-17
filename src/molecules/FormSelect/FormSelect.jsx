import React, { useState } from "react";
import "./FormSelect.css";

const FormSelect = (props) => {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const {
    value,
    placeholder,
    required,
    width,
    message,
    errMessage,
    onChange,
    options,
    name,
    id,
    pattern,
    formErrors,
    ...selectProps
  } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);

    // Check validity and set isValid state
    if (pattern && value) {
      setIsValid(new RegExp(pattern).test(value));
    }
  };

  const showError = formErrors[name] || (required && !value);

  return (
    <div
      className={`formSelect ${focused || value ? "focused" : ""}`}
      style={{ width: `${width}%` }}
    >
      <div
        className={`input-container ${value || focused ? "focused" : ""} ${
          !isValid ? "invalid" : ""
        }`}
      >
        <select
          {...selectProps}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          name={name}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
     {!isValid && (
        <span className="errorMessage" style={{ color: "rgb(231, 77, 88)" }}>
          {errMessage}
        </span>
      )}
      {showError && (
        <span className="errorMessage" style={{ color: "rgb(231, 77, 88)" }}>
          {showError}
        </span>
      )}
      <span className="message">{message}</span>
    </div>
  );
};

export default FormSelect;
