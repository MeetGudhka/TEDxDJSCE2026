import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode/lib/browser.js';
import './HiddenPage.css';

// Canvas Ticket Generation Helper
const generateTicketBase64 = async (name, ticketId) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const templateImg = new Image();
    templateImg.crossOrigin = "anonymous";
    templateImg.src = "/tedx.jpeg"; // Make sure tedx.jpeg is in public/ folder

    templateImg.onload = async () => {
      canvas.width = templateImg.width;
      canvas.height = templateImg.height;
      const w = canvas.width;
      const h = canvas.height;

      // Draw background template
      ctx.drawImage(templateImg, 0, 0);

      try {
        const qrDataUrl = await QRCode.toDataURL(`TEDxDJSC-${ticketId}`, { margin: 1, width: parseInt(w * 0.22) });
        const qrImg = new Image();
        qrImg.onload = () => {
          const qrSize = parseInt(w * 0.22);
          const qrX = w - qrSize - 60;
          const qrY = parseInt(h * 0.18);

          ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

          // Use Arial instead of loading TTF to avoid FontFace API delay complexities
          ctx.font = "bold 50px Arial, sans-serif";

          const textMetrics = ctx.measureText(name);
          const textWidth = textMetrics.width;
          const textX = qrX + (qrSize - textWidth) / 2;
          const textY = qrY + qrSize + 20 + 50;

          // Shadow layout offset = 2
          ctx.fillStyle = "black";
          ctx.fillText(name, textX + 2, textY + 2);

          // Main text
          ctx.fillStyle = "white";
          ctx.fillText(name, textX, textY);

          resolve(canvas.toDataURL("image/png"));
        };
        qrImg.src = qrDataUrl;
      } catch (e) {
        reject(e);
      }
    };

    templateImg.onerror = () => reject(new Error("Template image 'tedx.jpeg' not found in public folder"));
  });
};

const HiddenPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch students from backend
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyedMQqm2f80lfir2cmxmRI_dFARNhrA57elkkdwvlzvpoUCQ3CP_ZGJtqxbRXzLnBmEQ/exec');
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleStatusChange = async (student, newStatus) => {
    const id = student._id;
    let ticketBase64 = null;

    // Generate ticket graphics if status is verified
    if (newStatus === 'verified') {
      try {
        ticketBase64 = await generateTicketBase64(student.fullName || "Guest", id || student.sapId || "001");
      } catch (err) {
        console.error("Ticket Generation Error:", err);
        alert(`Warning: Could not generate ticket locally. Continuing with verification anyway. Error: ${err.message}`);
      }
    }

    // Optimistic update
    setStudents(prevStudents =>
      prevStudents.map(s =>
        s._id === id ? { ...s, status: newStatus } : s
      )
    );

    try {
      await fetch('https://script.google.com/macros/s/AKfycbyedMQqm2f80lfir2cmxmRI_dFARNhrA57elkkdwvlzvpoUCQ3CP_ZGJtqxbRXzLnBmEQ/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'update',
          id,
          status: newStatus,
          ticketBase64: ticketBase64,
          ticketId: id || student.sapId
        })
      });
      if (ticketBase64) {
        alert("✅ Student Verified & Ticket officially generated and uploaded!");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      fetchStudents(); // Revert on error
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      await fetch('https://script.google.com/macros/s/AKfycbyedMQqm2f80lfir2cmxmRI_dFARNhrA57elkkdwvlzvpoUCQ3CP_ZGJtqxbRXzLnBmEQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      });
      setStudents(prevStudents => prevStudents.filter(s => s._id !== id));
    } catch (err) {
      console.error("Error deleting student:", err);
      alert("Failed to delete student");
    }
  };

  // Filter students based on search query
  const filteredStudents = students.filter(student => {
    const query = searchQuery.toLowerCase();
    const safe = (value) => (value ?? "").toString().toLowerCase();
    return (
      safe(student.fullName).includes(query) ||
      safe(student.email).includes(query) ||
      safe(student.rollNumber).includes(query) ||
      safe(student.sapId).includes(query) ||
      safe(student.branch).includes(query) ||
      safe(student.contact).includes(query) ||
      safe(student.transactionId).includes(query) ||
      safe(student.senderName).includes(query)
    );
  });

  if (loading) return <div className="loading">Loading students...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const getDirectImageUrl = (url) => {
    if (!url) return '';
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      // Use Google's thumbnail API or direct download link to bypass cookie blocking
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }
    return url;
  };

  return (
    <div className="hidden-page-container">

      {selectedImage && (
        <div className="image-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="image-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedImage(null)}>✕</button>
            <img src={getDirectImageUrl(selectedImage)} alt="Payment Screenshot" referrerPolicy="no-referrer" />
          </div>
        </div>
      )}

      <div className="page-header">
        <h1 className="page-title">
          <span className="ted-accent">TED</span>x<span className='ted-accent'>DJSCE</span>
        </h1>
        <p className="page-subtitle">Admin Dashboard - Registrations</p>
        <button onClick={() => navigate('/')} className="logout-btn">
          ← Logout
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, email, roll number, SAP ID, branch, or contact..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <p className="student-count">
          Showing {filteredStudents.length} of {students.length} students
        </p>
      </div>

      <div className="students-grid">
        {filteredStudents.map((student, index) => (
          <div
            key={student._id}
            className={`student-card status-${student.status}`}
            style={{ '--index': index }}
          >
            <div className="student-header">
              <div>
                <h2 className="student-name">{student.fullName}</h2>
                <p className="student-id">ID: {student.sapId}</p>
              </div>
              <span className={`status-badge ${student.status}`}>
                {student.status}
              </span>
            </div>

            <div className="student-info">
              <div className="info-row">
                <span className="info-label">Branch</span>
                <span className="info-value">{student.branch}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Roll Number</span>
                <span className="info-value">{student.rollNumber}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Contact</span>
                <span className="info-value">{student.contact}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email</span>
                <span className="info-value">{student.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Sender Name</span>
                <span className="info-value">{student.senderName || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Txn ID</span>
                <span className="info-value">{student.transactionId || 'N/A'}</span>
              </div>
            </div>

            <div className="screenshot-section">
              <button
                className="view-screenshot-btn"
                onClick={() => setSelectedImage(student.screenshot)}
                disabled={!student.screenshot}
              >
                {student.screenshot ? '👁 View Screenshot' : 'No Screenshot Details'}
              </button>
            </div>

            <div className="action-buttons">
              <button
                className={`action-btn btn-verify ${student.status === 'verified' ? 'active' : ''}`}
                onClick={() => handleStatusChange(student, 'verified')}
              >
                <span>★ Verify</span>
              </button>
              <button
                className={`action-btn btn-in ${student.status === 'in' ? 'active' : ''}`}
                onClick={() => handleStatusChange(student, 'in')}
              >
                <span>✓ Check In</span>
              </button>
              <button
                className={`action-btn btn-out ${student.status === 'out' ? 'active' : ''}`}
                onClick={() => handleStatusChange(student, 'out')}
              >
                <span>✗ Check Out</span>
              </button>
            </div>

            <button
              className="delete-btn"
              onClick={() => handleDelete(student._id)}
            >
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HiddenPage;