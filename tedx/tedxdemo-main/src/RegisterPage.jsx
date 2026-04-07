import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

const DEFAULT_FORM_DATA = {
  fullName: "",
  contact: "",
  email: "",
  collegeType: "",
  collegeName: "",
  branch: "",
  rollNumber: "",
  sapId: "",
  ticketType: "",
  amount: "",
  transactionId: "",
  senderName: "",
};

const TICKET_OPTIONS = [
  { value: "classic", label: "Classic", amount: 100 },
  { value: "premium", label: "Premium", amount: 200 },
];

const RegisterPage = () => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('registrationProgress');
    if (saved) {
      try {
        return { ...DEFAULT_FORM_DATA, ...JSON.parse(saved) };
      } catch (e) { }
    }
    return DEFAULT_FORM_DATA;
  });

  useEffect(() => {
    localStorage.setItem('registrationProgress', JSON.stringify(formData));
  }, [formData]);
  const [screenshotData, setScreenshotData] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const fileInputRef = React.useRef(null);

  const isPersonalInfoFilled = () => {
    if (!formData.fullName || !formData.email || !formData.contact || !formData.collegeType) return false;
    if (formData.collegeType === "djsce") {
      if (!formData.branch || !formData.sapId || !formData.rollNumber) return false;
    } else if (formData.collegeType === "other") {
      if (!formData.collegeName) return false;
    }
    return true;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshotData(reader.result);
      setScreenshotPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setScreenshotPreview(null);
    setScreenshotData(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPersonalInfoFilled()) {
      alert("Please fill all required personal and college details.");
      return;
    }
    if (!formData.ticketType || !formData.amount || !formData.transactionId || !formData.transactionId.trim() || !formData.senderName || !formData.senderName.trim() || !screenshotData) {
      alert("Please complete payment details and upload a screenshot.");
      return;
    }

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyedMQqm2f80lfir2cmxmRI_dFARNhrA57elkkdwvlzvpoUCQ3CP_ZGJtqxbRXzLnBmEQ/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...formData, screenshot: screenshotData, action: 'create' })
      });

      let data;
      try {
        data = await response.json();
      } catch (parseErr) {
        throw new Error("Server returned HTML or invalid JSON. It might be an authorization error.");
      }

      if (data.result === 'success') {
        alert("✅ Your Details Submitted Successfully.!");
        setFormData(DEFAULT_FORM_DATA);
        setScreenshotData(null);
        setScreenshotPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        localStorage.removeItem('registrationProgress');
      } else {
        alert("❌ Error from Google: " + (data.message || JSON.stringify(data)));
      }
    } catch (err) {
      console.error("Error registering:", err);
      alert("❌ Registration failed: " + err.message);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTicketSelect = (ticketValue) => {
    const selectedTicket = TICKET_OPTIONS.find((option) => option.value === ticketValue);
    if (!selectedTicket) return;
    setFormData((prev) => ({
      ...prev,
      ticketType: selectedTicket.value,
      amount: String(selectedTicket.amount),
    }));
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
                <span className="value">10-03-2026</span>
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
              {/* 1. Base Personal Info */}
              {[
                { label: "Full Name", type: "text", field: "fullName" },
                { label: "Contact Number", type: "tel", field: "contact" },
                { label: "Email ID", type: "email", field: "email" },
              ].map((field, i) => (
                <div className="field-wrapper" key={field.field} style={{ "--index": i }}>
                  <input
                    type={field.type}
                    className={formData[field.field] ? "has-value" : ""}
                    value={formData[field.field]}
                    onChange={(e) => handleChange(field.field, e.target.value)}
                  />
                  <label>{field.label}</label>
                  <div className="underline"></div>
                </div>
              ))}

              {/* 2. College Selection Toggle */}
              <div className="radio-wrapper" style={{ "--index": 3 }}>
                <div className="radio-title">Select College</div>
                <div className="radio-group">
                  <div className="radio-option">
                    <input
                      type="radio" id="col-djsce" name="college" value="djsce"
                      checked={formData.collegeType === 'djsce'}
                      onChange={(e) => handleChange('collegeType', e.target.value)}
                    />
                    <label htmlFor="col-djsce" className="radio-label">D.J. Sanghvi</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio" id="col-other" name="college" value="other"
                      checked={formData.collegeType === 'other'}
                      onChange={(e) => handleChange('collegeType', e.target.value)}
                    />
                    <label htmlFor="col-other" className="radio-label">Other</label>
                  </div>
                </div>
              </div>

              {/* 3. Conditional College Info */}
              {formData.collegeType === "djsce" && [
                { label: "Branch", type: "text", field: "branch" },
                { label: "Roll Number", type: "text", field: "rollNumber" },
                { label: "SAP ID", type: "text", field: "sapId" },
              ].map((field, i) => (
                <div className="field-wrapper scale-in" key={field.field} style={{ "--index": 0 }}>
                  <input
                    type={field.type}
                    className={formData[field.field] ? "has-value" : ""}
                    value={formData[field.field]}
                    onChange={(e) => handleChange(field.field, e.target.value)}
                  />
                  <label>{field.label}</label>
                  <div className="underline"></div>
                </div>
              ))}

              {formData.collegeType === "other" && [
                { label: "College Name", type: "text", field: "collegeName" },
              ].map((field, i) => (
                <div className="field-wrapper scale-in" key={field.field} style={{ "--index": 0 }}>
                  <input
                    type={field.type}
                    className={formData[field.field] ? "has-value" : ""}
                    value={formData[field.field]}
                    onChange={(e) => handleChange(field.field, e.target.value)}
                  />
                  <label>{field.label}</label>
                  <div className="underline"></div>
                </div>
              ))}

              {/* 4. Payment Section (Appears ONLY if forms filled) */}
              {isPersonalInfoFilled() && (
                <div className="payment-section scale-in">
                  <div className="section-divider">
                    <span>Payment Details</span>
                  </div>

                  <div className="payment-qr-card">
                    <div className="payment-qr-head">
                      <span className="payment-qr-title">Scan QR To Pay</span>
                      <span className="payment-qr-subtitle">Use any UPI app</span>
                    </div>
                    <img
                      src="/meet_qr.jpeg"
                      alt="TEDxDJSCE payment QR"
                      className="payment-qr-image"
                      loading="lazy"
                    />
                  </div>

                  <div className="ticket-selector" style={{ "--index": 1 }}>
                    <div className="ticket-title">Select Pass Type</div>
                    <div className="ticket-options">
                      {TICKET_OPTIONS.map((option) => (
                        <button
                          type="button"
                          key={option.value}
                          className={`ticket-option-btn ${formData.ticketType === option.value ? "active" : ""}`}
                          onClick={() => handleTicketSelect(option.value)}
                        >
                          <span>{option.label}</span>
                          <strong>Rs. {option.amount}</strong>
                        </button>
                      ))}
                    </div>
                    {formData.ticketType && (
                      <p className="selected-amount">Amount to pay: Rs. {formData.amount}</p>
                    )}
                  </div>

                  {[
                    { label: "Transaction ID", type: "text", field: "transactionId" },
                    { label: "Sender Name", type: "text", field: "senderName" },
                  ].map((field, i) => (
                    <div className="field-wrapper" key={field.field} style={{ "--index": 1 + i }}>
                      <input
                        type={field.type}
                        className={formData[field.field] ? "has-value" : ""}
                        value={formData[field.field]}
                        onChange={(e) => handleChange(field.field, e.target.value)}
                      />
                      <label>{field.label}</label>
                      <div className="underline"></div>
                    </div>
                  ))}

                  {/* Image Upload Dropbox */}
                  <div
                    className="field-wrapper dropbox-wrapper"
                    style={{ "--index": 3 }}
                  >
                    <div className="dropbox-header">
                      <span className="static-label">Payment Screenshot</span>
                      <button type="button" className="view-sample-btn" onClick={(e) => { e.preventDefault(); setShowSample(!showSample); }}>
                        {showSample ? "Hide Sample" : "View Sample"}
                      </button>
                    </div>

                    {showSample && (
                      <div className="sample-image-container">
                        <img src="/sample_image.jpg" alt="Sample payment screenshot" className="sample-image-preview" loading="lazy" />
                        <p className="sample-hint">Please ensure Transaction ID and Amount are clearly visible.</p>
                      </div>
                    )}

                    <div
                      className={`dropbox-container ${isDragging ? 'dragging' : ''} ${screenshotPreview ? 'has-image' : ''}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />

                      {screenshotPreview ? (
                        <div className="image-preview">
                          <img src={screenshotPreview} alt="Preview" />
                          <div className="remove-image-btn" onClick={removeImage}>✕</div>
                        </div>
                      ) : (
                        <div className="dropbox-placeholder">
                          <svg className="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 16L12 11M12 11L17 16M12 11V21M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 7.0128 15.8773 7.03752C14.6596 4.14811 11.8385 2 8.5 2C4.35786 2 1 5.35786 1 9.5C1 11.6667 1.918 13.626 3.4 14.9669" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p>Drag & Drop or <span className="browse-text">Click to browse</span></p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button onClick={handleSubmit} className="prime-button">
                    <span>RESERVE SEAT</span>
                    <div className="button-blob"></div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;