import React, { useState } from "react";
import "./LoanForm.css";

function LoanForm() {
  const [formData, setFormData] = useState({
    loan_amount: "",
    loan_type: "",
    employment_details: "",
    aadhar_no: "",
    pan_no: "",
    bank_details: "",
    account_no: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://your-flask-backend-url/submit", {
        // Replace this URL with your actual Flask backend endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // Handle response as needed
      console.log("Form submitted successfully:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Loan Amount:</label>
        <input
          type="text"
          name="loan_amount"
          value={formData.loan_amount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Loan Type:</label>
        <input
          type="text"
          name="loan_type"
          value={formData.loan_type}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Employment Details:</label>
        <input
          type="text"
          name="employment_details"
          value={formData.employment_details}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Aadhar Number:</label>
        <input
          type="text"
          name="aadhar_no"
          value={formData.aadhar_no}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>PAN Number:</label>
        <input
          type="text"
          name="pan_no"
          value={formData.pan_no}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Bank Details:</label>
        <input
          type="text"
          name="bank_details"
          value={formData.bank_details}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Account Number:</label>
        <input
          type="text"
          name="account_no"
          value={formData.account_no}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoanForm;
