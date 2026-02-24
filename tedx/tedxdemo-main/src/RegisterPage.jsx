import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    branch: "",
    rollNumber: "",
    sapId: "",
    contact: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyd5VmAy0HYe05MvR62mccNAWf7_J-iwSabCxAEhmScdnLxc6heKHEWg9bDC4xtbdOIdw/exec', {
        method: 'POST',
        mode: 'no-cors', // Apps Script handles no-cors for simple POSTs
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, action: 'create' })
      });

      // Since we use no-cors, we can't check response.ok, but the submission will go through
      alert("✅ Registration details submitted! (Please check the sheet)");
      // Reset form
      setFormData({
        fullName: "",
        branch: "",
        rollNumber: "",
        sapId: "",
        contact: "",
        email: "",
      });
    } catch (err) {
      console.error("Error registering:", err);
      alert("❌ Registration failed. Please try again.");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="ted-register-container">
      {/* Animated Background Circles */}
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <div className="circle circle-4"></div>
      <div className="circle circle-5"></div>
      <div className="circle circle-6"></div>

      <div className="main-content">
        {/* Left Side: Branding/Impact */}
        <div className="brand-section">
          <div className="brand-content">
            <h1 className="reveal-text">
              <span className="letter letter-t">T</span>
              <span className="letter letter-e">E</span>
              <span className="letter letter-d">D</span>
              <span className="letter letter-x">x</span>
              <span className="letter letter-d2">D</span>
              <span className="letter letter-j">J</span>
              <span className="letter letter-s">S</span>
              <span className="letter letter-c">C</span>
              <span className="letter letter-e2">E</span>
            </h1>
            <p className="description">
              Beyond sight lies insight. <br />
              Second Sight is a journey into hidden perspectives. <br />
              Where vision transforms into understanding.
            </p>
            <div className="event-details">
              <div className="detail-item">
                <span className="label">EVENT</span>
                <span className="value">SECOND SIGHT</span>
              </div>
              <div className="detail-item">
                <span className="label">DATE</span>
                <span className="value">11-03-2026</span>
              </div>
            </div>

            <div className="admin-access-container">
              <Link to="/login" className="admin-login-btn">
                Admin Login
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="form-section">
          <div className="form-inner">
            <h2 className="form-title">Registration</h2>

            <div className="luxury-form">
              {[
                { label: "Full Name", type: "text", field: "fullName" },
                { label: "Branch", type: "text", field: "branch" },
                { label: "Roll Number", type: "text", field: "rollNumber" },
                { label: "SAP ID", type: "text", field: "sapId" },
                { label: "Contact Number", type: "tel", field: "contact" },
                { label: "Email ID", type: "email", field: "email" },
              ].map((field, i) => (
                <div className="field-wrapper" key={i} style={{ "--index": i }}>
                  <input
                    type={field.type}
                    className={formData[field.field] ? "has-value" : ""}
                    value={formData[field.field]}
                    onChange={(e) => handleChange(field.field, e.target.value)}
                    onFocus={() => setFocusedField(i)}
                    onBlur={() => setFocusedField(null)}
                  />
                  <label>{field.label}</label>
                  <div className="underline"></div>
                </div>
              ))}

              <button onClick={handleSubmit} className="prime-button">
                <span>RESERVE SEAT</span>
                <div className="button-blob"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
