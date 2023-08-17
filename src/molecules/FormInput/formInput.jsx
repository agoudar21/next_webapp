import React, { useState } from "react";
import "./FormInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState(true); 
  const {
    value,
    width,
    placeholder,
    required,
    message,
    errMessage,
    onChange,
    name,
    pattern,
    formErrors,
    ...inputProps 
  } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);

    if (pattern && value) {
      setIsValid(new RegExp(pattern).test(value));
    }
  };

  const showError = formErrors[name] || (required && !value);

  return (
    <div
      className={`formInput ${focused || value ? "focused" : ""}`}
      style={{ width: `${width}%` }}
    >
      <div
        className={`input-container ${value || focused ? "focused" : ""} ${
          !isValid ? "invalid" : ""
        }`}
      >
        <input
          {...inputProps} 
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          name={name}
        />
        <label className={`placeholder ${value || focused ? "focused" : ""}`}>
          {required ? (
            <span>
              {placeholder}
              <span
                style={{
                  color: "#00af41",
                  fontSize: "1.3rem",
                  fontWeight: "800",
                }}
              >
                *
              </span>
            </span>
          ) : (
            placeholder
          )}
        </label>
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
      <span className="message-input">{message}</span>
    </div>
  );
};

export default FormInput;