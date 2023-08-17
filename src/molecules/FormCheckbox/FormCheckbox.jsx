import React, { useState } from "react";
import "./FormCheckbox.css";

const FormCheckbox = ({
  label,
  name,
  required,
  value,
  onChange,
  formErrors,
  errMessage,
  validated,
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const checked = e.target.checked;
    onChange({ target: { name, type: "checkbox", checked, value: checked } });
    setTouched(true);
  };

  const handleFocus = () => {
    setFocused(true);
  };


  // Check if the checkbox has been touched (blurred) before showing the error
  const showError =
    (formErrors[name] && (!validated || touched)) || // Show if there's a form error and not validated or touched
    (required && ((!value && touched) || (focused && !value)));

  return (
    <div className="container">
      <div className={`inputs ${focused ? "focused" : ""}`}>
        <label>
          <input
            type="checkbox"
            name={name}
            checked={value}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {required ? (
            <span>
              {label}
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
            label
          )}
        </label>
      </div>
      <div className="error">
        {showError && !value && (
          <span>{errMessage || "This field is required"}</span>
        )}
      </div>

    </div>
  );
};

export default FormCheckbox;


