import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HiddenPage.css';

const HiddenPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch students from backend
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyd5VmAy0HYe05MvR62mccNAWf7_J-iwSabCxAEhmScdnLxc6heKHEWg9bDC4xtbdOIdw/exec');
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

  const handleStatusChange = async (id, newStatus) => {
    // Optimistic update
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student._id === id ? { ...student, status: newStatus } : student
      )
    );

    try {
      await fetch('https://script.google.com/macros/s/AKfycbyd5VmAy0HYe05MvR62mccNAWf7_J-iwSabCxAEhmScdnLxc6heKHEWg9bDC4xtbdOIdw/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', id, status: newStatus })
      });
      // no-cors means we can't check response.ok, so we rely on optimistic update
    } catch (err) {
      console.error("Error updating status:", err);
      fetchStudents(); // Revert on error
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      await fetch('https://script.google.com/macros/s/AKfycbyd5VmAy0HYe05MvR62mccNAWf7_J-iwSabCxAEhmScdnLxc6heKHEWg9bDC4xtbdOIdw/exec', {
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
      safe(student.contact).includes(query)
    );
  });

  if (loading) return <div className="loading">Loading students...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="hidden-page-container">

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
            </div>

            <div className="action-buttons">
              <button
                className={`action-btn btn-in ${student.status === 'in' ? 'active' : ''}`}
                onClick={() => handleStatusChange(student._id, 'in')}
              >
                <span>✓ Check In</span>
              </button>
              <button
                className={`action-btn btn-out ${student.status === 'out' ? 'active' : ''}`}
                onClick={() => handleStatusChange(student._id, 'out')}
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