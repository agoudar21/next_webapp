"use client";

import { useState } from "react";
import styles from "./page.module.css";
import FormSelect from "@/molecules/FormSelect/FormSelect";
import FormCheckbox from "@/molecules/FormCheckbox/FormCheckbox";
import FormInput from "@/molecules/FormInput/formInput";

const App = () => {
  const [values, setValues] = useState({
    title: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    checkMobile: "",
    Residence: "",
    address: "",
    city: "",
    postcode: "",
    agree: false,
  });

  const inputs = [
    {
      id: 1,
      name: "title",
      field: "select",
      width: 48,
      message: "title",
      errMessage: "Please select a valid month",
      placeholder: "title",
      required: true,
      options: [
        { label: "Mr", value: "mr" },
        { label: "Mrs", value: "mrs" },
        { label: "Ms", value: "ms" },
        { label: "Miss", value: "miss" },
        { label: "Dr", value: "dr" },
        { label: "Prof", value: "prof" },
      ],
    },
    {
      id: 2,
      name: "firstName",
      field: "input",
      width: 100,
      type: "text",
      message: "Please enter the name as it appears on your payment card.",
      errMessage: "Please enter a valid name",
      placeholder: "First name",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "lastName",
      field: "input",
      width: 100,
      type: "text",
      message: "This is the long number on the front of your card",
      errMessage:
        "Please enter your last name / surname in Latin characters (a-z) and avoid using accented characters and punctuation marks (e.g. ü, á, ‘, -)",
      placeholder: "Please enter your full payment card number",
      pattern: "^[A-Za-z]{1,16}$",
      required: true,
    },
    {
      id: 4,
      name: "phoneNumber",
      field: "input",
      width: 100,
      type: "number",
      message: "Please include your country code, e.g. UK is +44",
      errMessage: "Please enter your primary phone number",
      placeholder: "Phone numbmer",
      pattern: "^[0-9]{10}$",
      required: true,
    },
    {
      id: 5,
      name: "year",
      field: "select",
      width: 48,
      message: "Select expiration year",
      errMessage: "Please select a valid year",
      placeholder: "Select year",
      required: true,
      options: [
        { label: "2023", value: "2023" },
        { label: "2024", value: "2024" },
        { label: "2025", value: "2025" },
        { label: "2026", value: "2026" },
        { label: "2027", value: "2027" },
        { label: "2028", value: "2028" },
        { label: "2029", value: "2029" },
        { label: "2030", value: "2030" },
        { label: "2031", value: "2031" },
        { label: "2032", value: "2032" },
        { label: "2033", value: "2033" },
        { label: "2034", value: "2034" },
        { label: "2035", value: "2035" },
        { label: "2036", value: "2036" },
        // more year options
      ],
    },
    {
      id: 6,
      name: "country",
      field: "select",
      width: 48,
      message: "Please select a country",
      errMessage: "Please select a country",
      placeholder: "Country",
      required: true,
      options: [
        { label: "India", value: "India" },
        { label: "United Kingdom", value: "UK" },
        { label: "The united States", value: "USA" },
        { label: "Japan", value: "Japan" },
        { label: "Scotland", value: "Scotland" },
        { label: "Russia", value: "Russia" },
        // more country options
      ],
    },
    {
      id: 7,
      name: "address",
      field: "input",
      width: 100,
      type: "text",
      message: "",
      errMessage: "",
      placeholder: "Address line 1",
      pattern: "",
      required: true,
    },
    {
      id: 8,
      name: "city",
      field: "input",
      width: 100,
      type: "text",
      message: "",
      errMessage: "",
      placeholder: "City",
      pattern: "",
      required: true,
    },
    {
      id: 9,
      name: "postcode",
      field: "input",
      width: 100,
      type: "text",
      message: "",
      errMessage: "",
      placeholder: "ZIP / Postcode",
      pattern: "",
      required: true,
    },
    {
      id: 10,
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
        cvv: "",
        month: "",
        year: "",
        country: "",
        address: "",
        city: "",
        postcode: "",
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
            // Render FormSelect component
            input.field === "select" ? (
              <div className={styles.components} key={input.id}>
                <FormSelect
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={handleChange}
                  formErrors={formErrors}
                />
              </div>
            ) : input.field === "checkbox" ? (
              // Render FormCheckbox component
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
          <button className={styles.btn}>Validate</button>
          <div className={styles.information}>
            <span style={{ fontWeight: "700" }}>Important Information:</span> To
            verify your eligibility, after registration you may see a temporary
            charge in your payment card transaction history. This is solely a
            “pending” transaction and your card will NOT be charged. After your
            eligibility is verified, the pending amount will be removed (usually
            within 10 business days).
            <p>
              By providing your payment card information you consent to the use
              of such information by LoungeKey and your issuing bank for
              verification purposes and in connection with the services in
              accordance with our Terms of Use, Conditions of Use and Privacy
              Notice.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
