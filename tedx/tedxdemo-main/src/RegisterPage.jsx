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

              <div className="registrations-closed-container">
                <div className="closed-glow"></div>
                <div className="closed-content">
                  <div className="closed-icon-wrapper">
                    <svg className="closed-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="closed-headline">Registrations Closed</h3>
                  <div className="closed-divider"></div>
                  <p className="closed-message">
                    Thank you for the overwhelming response! We have reached our maximum seating capacity for <strong>The Quiet Threshold</strong>.
                  </p>
                  <p className="closed-subtext">
                    We look forward to seeing the registered attendees soon. Follow our social media for highlights and future event announcements.
                  </p>
                  <div className="closed-footer-decor">
                    <span>TEDx</span>
                    <span className="dot"></span>
                    <span>DJSCE</span>
                  </div>
                </div>
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