import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";
import Aurora from "./components/Aurora";

// Assets from the public directory are served at the root path in Vite.
// We removed the relative imports because Vite expects public assets 
// to be referenced directly via root path (e.g., "/kartik_qr.png").

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
  { value: "classic", label: "Classic", amount: 150 },
  { value: "premium", label: "Premium", amount: 250 },
];

const UPI_ID = "kartiksunil14@oksbi";

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

  // Submission guard
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message: string }

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), type === 'error' ? 8000 : 5000);
  };

  // UPI copy
  const [isUpiCopied, setIsUpiCopied] = useState(false);
  const copyUpiId = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(UPI_ID);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = UPI_ID;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setIsUpiCopied(true);
      setTimeout(() => setIsUpiCopied(false), 1800);
    } catch {
      showToast('error', 'Could not copy UPI ID. Please copy it manually.');
    }
  };

  // Accordion state: expanded by default on desktop, collapsed on mobile
  const [openAccordions, setOpenAccordions] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 900) {
      return { tickets: true, instructions: true, payment: true };
    }
    return { tickets: false, instructions: false, payment: false };
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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

    // Prevent double submission
    if (isSubmitting || hasSubmitted) return;

    if (!isPersonalInfoFilled()) {
      showToast('error', 'Please fill all required personal and college details.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('error', 'Please enter a valid email address.');
      return;
    }

    // Validate contact number (at least 10 digits)
    if (!/^\d{10,}$/.test(formData.contact)) {
      showToast('error', 'Please enter a valid 10-digit contact number.');
      return;
    }

    if (!formData.ticketType || !formData.amount || !formData.senderName || !formData.senderName.trim() || !screenshotData) {
      showToast('error', 'Please complete payment details and upload a screenshot.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = { ...formData, screenshot: screenshotData, action: 'create' };
      if (payload.collegeType === 'djsce') {
        payload.collegeName = 'D.J. Sanghvi';
      }

      const response = await fetch('https://script.google.com/macros/s/AKfycbyedMQqm2f80lfir2cmxmRI_dFARNhrA57elkkdwvlzvpoUCQ3CP_ZGJtqxbRXzLnBmEQ/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      let data;
      try {
        data = await response.json();
      } catch (parseErr) {
        throw new Error("Server returned an invalid response. Please try again.");
      }

      if (data.result === 'success') {
        showToast('success', '\u2705 Registration submitted successfully! Your seat has been reserved.');
        setHasSubmitted(true);
        setFormData(DEFAULT_FORM_DATA);
        setScreenshotData(null);
        setScreenshotPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        localStorage.removeItem('registrationProgress');
      } else {
        showToast('error', '\u274c Error: ' + (data.message || 'Something went wrong.') + ' Contact Support: 9619560224 / 9145671250');
      }
    } catch (err) {
      console.error("Error registering:", err);
      showToast('error', '\u274c Registration failed: ' + err.message + '. Need help? Call/WhatsApp: 9619560224 / 9145671250');
    } finally {
      setIsSubmitting(false);
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
    <>
      <div className="ted-register-container">
        {/* Aurora WebGL Background */}
        <div className="aurora-bg">
          <Aurora
            colorStops={["#3d0000", "#8B0000", "#3d0000"]}
            amplitude={0.8}
            blend={0.4}
            speed={0.4}
          />
        </div>

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

              <div className="event-theme">
                <span className="theme-label">THE QUIET THRESHOLD</span>
              </div>

              <p className="description">
                Beyond silence lies transformation.
                The Quiet Threshold is a space where subtle shifts become powerful turning points — where ideas emerge, perspectives evolve, and new beginnings take shape.
              </p>

              <div className="event-details">
                <div className="detail-item">
                  <span className="label">DATE</span>
                  <span className="value">21-04-2026</span>
                </div>
              </div>

              {/* Accordion: Tickets */}
              <div className="info-accordion">
                <button
                  type="button"
                  className={`accordion-header ${openAccordions.tickets ? 'open' : ''}`}
                  onClick={() => toggleAccordion('tickets')}
                >
                  <span>🎟️ Tickets</span>
                  <span className="accordion-chevron">{openAccordions.tickets ? '−' : '+'}</span>
                </button>
                {openAccordions.tickets && (
                  <div className="accordion-body">
                    <div className="ticket-info-card">
                      <div className="ticket-info-name">Classic Pass – ₹150</div>
                      <ul className="ticket-info-perks">
                        <li>Entry to the event</li>
                        <li>TEDx goodies included</li>
                      </ul>
                    </div>
                    <div className="ticket-info-card">
                      <div className="ticket-info-name">Premium Pass – ₹250</div>
                      <ul className="ticket-info-perks">
                        <li>Entry to the event</li>
                        <li>Meal included</li>
                        <li>TEDx goodies included</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion: Important Instructions */}
              <div className="info-accordion">
                <button
                  type="button"
                  className={`accordion-header ${openAccordions.instructions ? 'open' : ''}`}
                  onClick={() => toggleAccordion('instructions')}
                >
                  <span>⚠️ Important Instructions</span>
                  <span className="accordion-chevron">{openAccordions.instructions ? '−' : '+'}</span>
                </button>
                {openAccordions.instructions && (
                  <div className="accordion-body">
                    <ul className="instruction-list">
                      <li>Please ensure that the <strong>"Sender Name"</strong> field is filled correctly while submitting payment details.</li>
                      <li>Refer to the <strong>"View Sample"</strong> section for guidance before completing your payment.</li>
                      <li>A screenshot of the payment confirmation must be uploaded to complete your registration.</li>
                      <li>Outside food and beverages are strictly prohibited inside the venue.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion: Payment Details */}
              <div className="info-accordion">
                <button
                  type="button"
                  className={`accordion-header ${openAccordions.payment ? 'open' : ''}`}
                  onClick={() => toggleAccordion('payment')}
                >
                  <span>💳 Payment Details</span>
                  <span className="accordion-chevron">{openAccordions.payment ? '−' : '+'}</span>
                </button>
                {openAccordions.payment && (
                  <div className="accordion-body">
                    <p className="payment-info-text">
                      Scan the QR code using any UPI app to proceed with payment.
                      After completing the transaction, enter the required details below and upload your payment proof.
                    </p>
                    <div className="support-box" style={{ marginTop: '15px', padding: '15px', border: '1px solid rgba(235, 0, 40, 0.4)', backgroundColor: 'rgba(235, 0, 40, 0.05)', borderRadius: '8px' }}>
                      <p style={{ margin: 0, fontSize: '0.95rem', color: '#fff', lineHeight: '1.5' }}>
                        <strong style={{ color: '#eb0028', display: 'block', marginBottom: '6px', fontSize: '1.05rem' }}>📞 Need Help?</strong>
                        In case of any registration issues, contact Support (Call or WhatsApp):<br />
                        <strong style={{ color: '#eb0028' }}>9619560224</strong> / <strong style={{ color: '#eb0028' }}>9145671250</strong>
                      </p>
                    </div>
                  </div>
                )}
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
                  { label: "Contact Number", type: "tel", field: "contact", inputMode: "numeric", pattern: "[0-9]*" },
                  { label: "Email ID", type: "email", field: "email" },
                ].map((field, i) => (
                  <div className="field-wrapper" key={field.field} style={{ "--index": i }}>
                    <input
                      type={field.type}
                      inputMode={field.inputMode || undefined}
                      pattern={field.pattern || undefined}
                      className={formData[field.field] ? "has-value" : ""}
                      value={formData[field.field]}
                      onChange={(e) => handleChange(field.field, e.target.value)}
                    />
                    <label>{field.label}</label>
                    <div className="underline"></div>
                    {/* Inline validation hints */}
                    {field.field === 'contact' && formData.contact && !/^\d+$/.test(formData.contact) && (
                      <p className="field-error">Please enter digits only</p>
                    )}
                    {field.field === 'email' && formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                      <p className="field-error">Please enter a valid email</p>
                    )}
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
                {formData.collegeType === "djsce" && (
                  <>
                    <div className="field-wrapper scale-in" style={{ "--index": 0 }}>
                      <select
                        className={formData.branch ? "has-value" : ""}
                        value={formData.branch}
                        onChange={(e) => handleChange('branch', e.target.value)}
                      >
                        <option value="" disabled hidden></option>
                        <option value="COMPS">COMPS</option>
                        <option value="IT">IT</option>
                        <option value="CSEDS">CSEDS</option>
                        <option value="EXTC">EXTC</option>
                        <option value="AIML">AIML</option>
                        <option value="AIDS">AIDS</option>
                        <option value="MECH">MECH</option>
                        <option value="ICB">ICB</option>
                      </select>
                      <label>Branch</label>
                      <div className="underline"></div>
                    </div>

                    {[
                      { label: "Roll Number", type: "text", field: "rollNumber" },
                      { label: "SAP ID", type: "text", field: "sapId", inputMode: "numeric", pattern: "[0-9]*" },
                    ].map((field, i) => (
                      <div className="field-wrapper scale-in" key={field.field} style={{ "--index": i + 1 }}>
                        <input
                          type={field.type}
                          inputMode={field.inputMode || undefined}
                          pattern={field.pattern || undefined}
                          className={formData[field.field] ? "has-value" : ""}
                          value={formData[field.field]}
                          onChange={(e) => handleChange(field.field, e.target.value)}
                        />
                        <label>{field.label}</label>
                        <div className="underline"></div>
                      </div>
                    ))}
                  </>
                )}

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
                        src="/kartik_qr.png"
                        alt="TEDxDJSCE payment QR"
                        className="payment-qr-image"
                        loading="lazy"
                      />
                      <div className="upi-copy-row">
                        <div className="upi-copy-text-wrap">
                          <span className="upi-copy-label">UPI ID</span>
                          <span className="upi-copy-id">{UPI_ID}</span>
                        </div>
                        <button
                          type="button"
                          className={`upi-copy-btn ${isUpiCopied ? "copied" : ""}`}
                          onClick={copyUpiId}
                          aria-label="Copy UPI ID"
                        >
                          {isUpiCopied ? "Copied" : "Copy"}
                        </button>
                      </div>
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

                    <div className="field-wrapper" style={{ "--index": 1 }}>
                      <input
                        type="text"
                        className={formData.senderName ? "has-value" : ""}
                        value={formData.senderName}
                        onChange={(e) => handleChange('senderName', e.target.value)}
                      />
                      <label>Sender Name</label>
                      <div className="underline"></div>
                      <p className="field-note">The name of the person from whose account the payment was made.</p>
                    </div>

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

                    <button onClick={handleSubmit} className="prime-button" disabled={isSubmitting || hasSubmitted}>
                      <span>{hasSubmitted ? 'SUBMITTED \u2713' : isSubmitting ? 'SUBMITTING...' : 'RESERVE SEAT'}</span>
                      <div className="button-blob"></div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification toast-${toast.type}`}>
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close" onClick={() => setToast(null)}>✕</button>
        </div>
      )}
    </>
  );
};

export default RegisterPage;