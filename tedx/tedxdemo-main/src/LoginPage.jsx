import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'tedxdjsce2026' && password === 'tedx@djsce@#2026#') {
            navigate('/admin');
        } else {
            setError('Invalid Credentials');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">
                    <span className="ted-accent">TED</span>x<span className='ted-accent'>DJSCE</span>
                </h1>
                <p className="login-subtitle">Admin Access</p>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="login-input"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="login-btn">
                        ENTER SYSTEM
                    </button>

                    <button type="button" onClick={() => navigate('/register')} className="back-btn">
                        ← Back to Registration
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
