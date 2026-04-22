import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";
import Aurora from "./components/Aurora";

const RegisterPage = () => {
  // Accordion state: expanded by default on desktop, collapsed on mobile
  const [openAccordions, setOpenAccordions] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 900) {
      return { tickets: true, instructions: true };
    }
    return { tickets: false, instructions: false };
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
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
                      <li>Please ensure that all registration steps were completed before the deadline.</li>
                      <li>Outside food and beverages are strictly prohibited inside the venue.</li>
                      <li>Registered attendees will receive confirmation emails shortly.</li>
                      <li>For any urgent queries, contact our support team.</li>
                    </ul>
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

          {/* Right Side: Registration Closed Section */}
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
    </>
  );
};

export default RegisterPage;