import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import './CountdownTimer.css';

const CountdownTimer = ({ targetDate = '2026-03-15T10:00:00' }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();

            if (difference <= 0) {
                setIsExpired(true);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="countdown-container">
            <motion.div
                className="countdown-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="bg-orb orb-1"></div>
                <div className="bg-orb orb-2"></div>
                <div className="bg-orb orb-3"></div>

                <motion.h2
                    className="countdown-title"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <span className="title-line"></span>
                    TEDxDJSCE: THE QUIET THRESHOLD
                    <span className="title-line"></span>
                </motion.h2>

                <motion.p
                    className="countdown-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    Ideas Worth Spreading
                </motion.p>

                {!isExpired ? (
                    <div className="time-units-container">
                        <TimeUnit value={timeLeft.days} label="Days" />
                        <div className="separator">:</div>
                        <TimeUnit value={timeLeft.hours} label="Hours" />
                        <div className="separator">:</div>
                        <TimeUnit value={timeLeft.minutes} label="Minutes" />
                        <div className="separator">:</div>
                        <TimeUnit value={timeLeft.seconds} label="Seconds" />
                    </div>
                ) : (
                    <motion.div
                        className="expired-message"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3>The Event Has Started!</h3>
                    </motion.div>
                )}

                <motion.div
                    className="progress-bar-container"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                >
                    <div className="progress-bar">
                        <motion.div
                            className="progress-fill"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2, delay: 1 }}
                        ></motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

const TimeUnit = memo(({ value, label }) => (
    <div className="time-unit">
        <div className="time-unit-inner">
            <div className="time-unit-glow"></div>
            <div className="time-value">
                {String(value).padStart(2, '0')}
            </div>
            <div className="time-label">{label}</div>

            <div className="corner-accent top-left"></div>
            <div className="corner-accent top-right"></div>
            <div className="corner-accent bottom-left"></div>
            <div className="corner-accent bottom-right"></div>
        </div>
    </div>
));

TimeUnit.displayName = 'TimeUnit';

export default CountdownTimer;