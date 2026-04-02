import React, { useState, useEffect, useRef } from 'react';

/**
 * StageSpotlights - 5 animated stage spotlights with sweeping motion
 * Enhanced with source glows, sharper beams, and theatrical effects
 * Now supports focusing on cursor position when focusTarget is provided
 */
const StageSpotlights = ({ isActive = false, colorPhase = 'white', focusTarget = null }) => {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
    const [sweepAngles, setSweepAngles] = useState({});
    const animationRef = useRef(null);

    // Track window width for angle calculations
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth < 768;

    const allSpotlights = [
        // White spotlights turn on first (delay 0-0.2)
        { id: 1, position: '5%', delay: 0, sweepRange: 12, sweepDuration: 4.5, width: 260, intensity: 0.8, color: 'white' },
        { id: 3, position: '35%', delay: 0.1, sweepRange: 8, sweepDuration: 4.2, width: 320, intensity: 0.9, color: 'white' },
        { id: 5, position: '65%', delay: 0.15, sweepRange: 8, sweepDuration: 4.0, width: 320, intensity: 0.9, color: 'white' },
        { id: 7, position: '95%', delay: 0.2, sweepRange: 12, sweepDuration: 4.4, width: 260, intensity: 0.8, color: 'white' },
        // Red spotlights turn on after (delay 0.4-0.6)
        { id: 2, position: '18%', delay: 0.4, sweepRange: 10, sweepDuration: 3.8, width: 300, intensity: 0.85, color: 'red' },
        { id: 4, position: '50%', delay: 0.5, sweepRange: 6, sweepDuration: 5.2, width: 380, intensity: 1.0, color: 'red' },
        { id: 6, position: '82%', delay: 0.6, sweepRange: 10, sweepDuration: 3.9, width: 300, intensity: 0.85, color: 'red' },
    ];

    // Mobile: only 3 spotlights (left white, center red, right white) — wider beams
    const mobileSpotlights = [
        { id: 1, position: '10%', delay: 0, sweepRange: 10, sweepDuration: 4.5, width: 400, intensity: 0.75, color: 'white' },
        { id: 4, position: '50%', delay: 0.4, sweepRange: 5, sweepDuration: 5.2, width: 500, intensity: 0.9, color: 'red' },
        { id: 7, position: '90%', delay: 0.15, sweepRange: 10, sweepDuration: 4.4, width: 400, intensity: 0.75, color: 'white' },
    ];

    const spotlights = isMobile ? mobileSpotlights : allSpotlights;

    // Manual sweep animation when not focusing
    useEffect(() => {
        if (focusTarget || !isActive) {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            return;
        }

        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const newAngles = {};

            spotlights.forEach((spot) => {
                // Calculate sweep angle based on time
                const t = (elapsed / 1000 + spot.delay) / spot.sweepDuration;
                const angle = Math.sin(t * Math.PI * 2) * spot.sweepRange;
                newAngles[spot.id] = angle;
            });

            setSweepAngles(newAngles);
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [focusTarget, isActive]);

    /**
     * Calculate rotation angle from spotlight origin to cursor position
     */
    const calculateFocusAngle = (spotlightPosition) => {
        if (!focusTarget) return null;

        // Convert spotlight position (%) to pixels
        const originX = (parseFloat(spotlightPosition) / 100) * windowWidth;

        // Calculate horizontal delta from spotlight to cursor
        const deltaX = focusTarget.x - originX;
        const deltaY = focusTarget.y; // Distance down from top (cursor Y position)

        // atan2(opposite, adjacent) - we want angle from vertical
        // NEGATE to point TOWARD cursor instead of away
        let angle = -Math.atan2(deltaX, deltaY) * (180 / Math.PI);

        // Clamp to reasonable range
        return Math.max(-40, Math.min(40, angle));
    };

    const getBeamColor = (intensity = 1, spotColor = 'white') => {
        // Each spotlight keeps its own color (white stays white, red stays red)
        if (spotColor === 'red') {
            return {
                start: `rgba(220, 38, 38, ${0.55 * intensity})`,
                mid: `rgba(220, 38, 38, ${0.25 * intensity})`,
                end: 'rgba(220, 38, 38, 0)',
            };
        }
        return {
            start: `rgba(255, 255, 255, ${0.45 * intensity})`,
            mid: `rgba(255, 255, 255, ${0.18 * intensity})`,
            end: 'rgba(255, 255, 255, 0)',
        };
    };

    /**
     * Get the current rotation angle for a spotlight
     */
    const getRotationAngle = (spot) => {
        const focusAngle = calculateFocusAngle(spot.position);
        if (focusAngle !== null) {
            return focusAngle;
        }
        return sweepAngles[spot.id] || 0;
    };

    return (
        <div className="absolute top-0 left-0 w-full h-[101vh] overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
            {spotlights.map((spot) => {
                const colors = getBeamColor(spot.intensity, spot.color);
                const rotationAngle = getRotationAngle(spot);

                return (
                    <div
                        key={spot.id}
                        className="absolute"
                        style={{
                            top: '-80px',
                            left: spot.position,
                            transform: 'translateX(-50%)',
                            opacity: isActive ? 1 : 0,
                            transition: `opacity 1s ease-out ${spot.delay}s`,
                        }}
                    >
                        {/* Main beam with rotation */}
                        <div
                            style={{
                                transformOrigin: 'top center',
                                transform: `rotate(${rotationAngle}deg)`,
                                transition: focusTarget ? 'transform 0.15s ease-out' : 'none',
                            }}
                        >
                            <div
                                style={{
                                    position: 'relative',
                                    width: `${spot.width}px`,
                                    height: '130vh',
                                    transform: 'translateX(-50%)',
                                    marginLeft: '50%',
                                    background: `
                                        radial-gradient(
                                            ellipse 50% 80% at 50% 0%,
                                            ${colors.start} 0%,
                                            ${colors.mid} 40%,
                                            ${colors.end} 80%
                                        )
                                    `,
                                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                                    filter: isMobile ? 'blur(50px)' : 'blur(38px)',
                                    opacity: isMobile ? 0.7 : 0.95,
                                    transition: 'background 1.8s ease',
                                    maskImage: isMobile
                                        ? 'linear-gradient(to bottom, black 0%, black 40%, transparent 90%)'
                                        : 'linear-gradient(to bottom, black 0%, black 50%, transparent 95%)',
                                    WebkitMaskImage: isMobile
                                        ? 'linear-gradient(to bottom, black 0%, black 40%, transparent 90%)'
                                        : 'linear-gradient(to bottom, black 0%, black 50%, transparent 95%)',
                                }}
                            />
                        </div>
                    </div>
                );
            })}

            {/* Central convergence glow */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '90%',
                    height: '400px',
                    background: colorPhase === 'red'
                        ? 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(220, 38, 38, 0.2) 0%, rgba(220, 38, 38, 0.08) 40%, transparent 70%)'
                        : 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)',
                    filter: 'blur(45px)',
                    opacity: isActive ? 0.9 : 0,
                    transition: 'opacity 1.5s ease, background 1.8s ease',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

export default StageSpotlights;


