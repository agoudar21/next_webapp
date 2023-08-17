"use client";

import { useState } from "react";
import styles from "./page.module.css";
import FormCheckbox from "@/molecules/FormCheckbox/FormCheckbox";
import FormInput from "@/molecules/FormInput/formInput";

const App = () => {
  const [values, setValues] = useState({
    cardName: "",
    cardNumber: "",
    agree: false,
  });

  const inputs = [
    {
      id: 1,
      name: "cardName",
      field: "input",
      width: 100,
      type: "text",
      message: "Please enter the name as it appears on your payment card.",
      errMessage: "Please enter a valid name",
      placeholder: "Name on card",
      pattern: "^[A-Za-z]{4,16}$",
      required: true,
    },
    {
      id: 2,
      name: "cardNumber",
      field: "input",
      width: 100,
      type: "number",
      message: "This is the long number on the front of your card",
      errMessage: "Please enter a valid payment card number",
      placeholder: "Please enter your full payment card number",
      pattern: "^[0-9]{10}$",
      required: true,
    },
    {
      id: 3,
      name: "agree",
      field: "checkbox",
      width: 100,
      type: "checkbox",
      errMessage:
        "If you don’t confirm that you are happy for us to process your data you will not be able to access your account, and you will no longer receive communications from us.",
      label:
        "I agree to abide by the Conditions of Use, Privacy Policy and Terms of Use.",
      required: true,
    },
  ];

  const [formErrors, setFormErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormErrors = {};

    inputs.forEach((input) => {
      if (input.required && !values[input.name]) {
        newFormErrors[input.name] = "This field is required";
      }
    });

    setFormErrors(newFormErrors);

    if (Object.keys(newFormErrors).length === 0) {
      console.log("Form submitted with values:", values);
      setValidated(true);
      setValues({
        cardName: "",
        cardNumber: "",
        agree: false,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({ ...values, [name]: value });

    // This is to Handle checkbox change separately
    if (type === "checkbox") {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: checked,
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }

    if (
      formErrors[name] &&
      value &&
      inputs.find((input) => input.name === name) &&
      (value || checked)
    ) {
      const newFormErrors = { ...formErrors };
      delete newFormErrors[name];
      setFormErrors(newFormErrors);
    }
  };

  return (
    <div className={styles.app}>
      {/* <h1  >Create your account Here!!</h1> */}
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.formHeader}>Verify</h1>
          {inputs.map((input) =>
            // Render FormCheckbox component
            input.field === "checkbox" ? (
              <div className={styles.components} key={input.id}>
                <FormCheckbox
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={handleChange}
                  formErrors={formErrors}
                  validated={validated}
                />
              </div>
            ) : (
              // Render FormInput component
              <div className={styles.components} key={input.id}>
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={handleChange}
                  formErrors={formErrors}
                />
              </div>
            )
          )}
          <button className={styles.btn}>Verify</button>
          <div className={styles.information}>
            <span style={{ fontWeight: "700" }}>Important Information:</span>
            <p>
              We need this information in order to link the card to your
              account. Your information is secure and will never be passed on to
              third parties.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
