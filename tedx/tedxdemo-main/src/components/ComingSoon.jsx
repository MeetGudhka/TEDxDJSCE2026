import React from 'react';
import { motion } from 'framer-motion';
import './ComingSoon.css';

const ComingSoon = () => {
    const features = [
        {
            icon: (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="28" y="16" width="8" height="16" rx="4" stroke="url(#grad1)" strokeWidth="2.5" fill="none" />
                    <path d="M20 28C20 28 20 32 24 36C26 38 28 40 32 40C36 40 38 38 40 36C44 32 44 28 44 28" stroke="url(#grad1)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <line x1="32" y1="40" x2="32" y2="48" stroke="url(#grad1)" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="24" y1="48" x2="40" y2="48" stroke="url(#grad1)" strokeWidth="2.5" strokeLinecap="round" />
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#eb0028" />
                            <stop offset="100%" stopColor="#ff4d6d" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
            title: 'Inspiring Speakers',
            description: 'World-class thought leaders'
        },
        {
            icon: (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="26" r="10" stroke="url(#grad2)" strokeWidth="2.5" fill="none" />
                    <path d="M32 16V12M44 26H48M20 26H16M40.5 15.5L43.5 12.5M23.5 15.5L20.5 12.5" stroke="url(#grad2)" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M26 36C26 36 26 38 28 40C29 41 30 42 32 42C34 42 35 41 36 40C38 38 38 36 38 36V34C38 34 36 32 32 32C28 32 26 34 26 34V36Z" stroke="url(#grad2)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <line x1="28" y1="42" x2="36" y2="42" stroke="url(#grad2)" strokeWidth="2.5" strokeLinecap="round" />
                    <defs>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ff4d6d" />
                            <stop offset="100%" stopColor="#eb0028" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
            title: 'Big Ideas',
            description: 'Ideas worth spreading'
        },
        {
            icon: (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="18" r="5" stroke="url(#grad3)" strokeWidth="2.5" fill="none" />
                    <circle cx="18" cy="36" r="4" stroke="url(#grad3)" strokeWidth="2.5" fill="none" />
                    <circle cx="46" cy="36" r="4" stroke="url(#grad3)" strokeWidth="2.5" fill="none" />
                    <circle cx="26" cy="48" r="3.5" stroke="url(#grad3)" strokeWidth="2.5" fill="none" />
                    <circle cx="38" cy="48" r="3.5" stroke="url(#grad3)" strokeWidth="2.5" fill="none" />
                    <line x1="30" y1="22" x2="21" y2="33" stroke="url(#grad3)" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="34" y1="22" x2="43" y2="33" stroke="url(#grad3)" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="20" y1="39" x2="27" y2="45" stroke="url(#grad3)" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="44" y1="39" x2="37" y2="45" stroke="url(#grad3)" strokeWidth="2.5" strokeLinecap="round" />
                    <defs>
                        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#eb0028" />
                            <stop offset="100%" stopColor="#ff1a40" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
            title: 'Networking',
            description: 'Connect with innovators'
        },
        {
            icon: (
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="22" r="5" stroke="url(#grad4)" strokeWidth="2.5" fill="none" />
                    <circle cx="40" cy="22" r="5" stroke="url(#grad4)" strokeWidth="2.5" fill="none" />
                    <circle cx="32" cy="38" r="5" stroke="url(#grad4)" strokeWidth="2.5" fill="none" />
                    <path d="M28 30L24 34" stroke="url(#grad4)" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M36 30L40 34" stroke="url(#grad4)" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M28 42L24 46M36 42L40 46" stroke="url(#grad4)" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="32" cy="32" r="14" stroke="url(#grad4)" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.5" />
                    <defs>
                        <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ff1a40" />
                            <stop offset="100%" stopColor="#eb0028" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
            title: 'Experiential Learning',
            description: 'Real life insights'
        }
    ];

    return (
        <div className="coming-soon-container">
            <motion.div
                className="coming-soon-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="particles">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${5 + Math.random() * 10}s`
                            }}
                        />
                    ))}
                </div>

                <div className="content-grid">
                    <motion.div
                        className="main-section"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.h1
                            className="main-title"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <span className="highlight-text"> THE QUIET THRESHOLD </span>
                        </motion.h1>

                        <motion.p
                            className="main-description"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <span className="highlight-text" style={{ fontWeight: '800', fontSize: '1.3em' }}>TEDxDJSCE</span> - “The Quiet Threshold” captures those subtle moments just before life changes—when everything feels still yet uncertain. It’s about looking inward, finding quiet strength, and having the courage to step forward, even when the path isn’t clear. Sometimes, the biggest transformations begin softly, in silence.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="features-section"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="features-grid">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="feature-card"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 1 + index * 0.1,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <div className="feature-icon-wrapper">
                                        <div className="feature-icon">{feature.icon}</div>
                                        <div className="icon-glow"></div>
                                    </div>
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-description">{feature.description}</p>
                                    <div className="feature-shine"></div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="deco-circle circle-1"></div>
                <div className="deco-circle circle-2"></div>
                <div className="deco-circle circle-3"></div>

                <motion.div
                    className="wave-container"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    <svg className="wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path
                            d="M0,60 C200,100 400,20 600,50 C800,80 1000,10 1200,60 L1200,120 L0,120 Z"
                            fill="url(#waveGradient)"
                        >
                            <animate
                                attributeName="d"
                                dur="8s"
                                repeatCount="indefinite"
                                values="
                                    M0,60 C200,100 400,20 600,50 C800,80 1000,10 1200,60 L1200,120 L0,120 Z;
                                    M0,50 C200,20 400,90 600,60 C800,30 1000,100 1200,50 L1200,120 L0,120 Z;
                                    M0,70 C200,30 400,100 600,40 C800,10 1000,80 1200,70 L1200,120 L0,120 Z;
                                    M0,60 C200,100 400,20 600,50 C800,80 1000,10 1200,60 L1200,120 L0,120 Z
                                "
                            />
                        </path>
                        <defs>
                            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="var(--tedx-red)" stopOpacity="0.3" />
                                <stop offset="50%" stopColor="var(--tedx-red-light)" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="var(--gradient-end)" stopOpacity="0.3" />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ComingSoon;