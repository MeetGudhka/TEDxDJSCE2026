import React from 'react';

const StageFog = ({ isActive = true, colorPhase = 'white' }) => {
    // Color tint based on spotlight phase
    const getFogColors = () => {
        if (colorPhase === 'red') {
            return {
                primary: 'rgba(255, 220, 220, 0.5)',
                secondary: 'rgba(255, 200, 200, 0.4)',
                accent: 'rgba(220, 180, 180, 0.25)',
                wisp: 'rgba(255, 230, 230, 0.12)',
            };
        }
        return {
            primary: 'rgba(255, 255, 255, 0.5)',
            secondary: 'rgba(220, 225, 235, 0.4)',
            accent: 'rgba(240, 240, 255, 0.2)',
            wisp: 'rgba(255, 255, 255, 0.5)',
        };
    };

    const colors = getFogColors();

    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none select-none"
            style={{
                opacity: isActive ? 1 : 0,
                transition: 'opacity 3s ease-in-out',
                zIndex: 20,
                // Mask forces fog to disappear as it goes up, creating floor effect
                maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0) 55%)',
                WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0) 55%)'
            }}
        >
            {/* NOISE FILTER: Keeps the gritty smoke texture */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="floor-fog-noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="4" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" />
                    </filter>
                </defs>
            </svg>

            {/* LAYER 1A: Dense Floor Carpet - moves LEFT to RIGHT (subtle base) */}
            <div
                className="absolute inset-x-[-60%] bottom-0 h-[55%]"
                style={{
                    background: `
                        radial-gradient(ellipse 60% 40% at 50% 100%, ${colors.primary} 0%, transparent 80%),
                        linear-gradient(to top, ${colors.secondary} 0%, transparent 100%)
                    `,
                    filter: 'blur(40px) url(#floor-fog-noise)',
                    animation: 'fog-flow-horizontal 25s linear infinite alternate',
                    transformOrigin: 'bottom center',
                    transition: 'background 1.8s ease',
                    opacity: 0.25,
                }}
            />

            {/* LAYER 1B: Dense Floor Carpet - moves RIGHT to LEFT (main body) */}
            <div
                className="absolute inset-x-[-60%] bottom-0 h-[65%]"
                style={{
                    background: `
                        radial-gradient(ellipse 55% 45% at 45% 100%, ${colors.secondary} 0%, transparent 75%),
                        linear-gradient(to top, ${colors.primary} 0%, transparent 100%)
                    `,
                    filter: 'blur(32px) url(#floor-fog-noise)',
                    animation: 'fog-flow-horizontal-opposite 30s linear infinite alternate',
                    transformOrigin: 'bottom center',
                    transition: 'background 1.8s ease',
                    opacity: 0.6,
                }}
            />

            {/* LAYER 2: Rolling Banks - clumps that roll slightly higher */}
            <div
                className="absolute inset-x-[-50%] bottom-[-10%] h-[70%]"
                style={{
                    background: `
                        radial-gradient(ellipse 30% 20% at 20% 90%, ${colors.accent} 0%, transparent 60%),
                        radial-gradient(ellipse 40% 30% at 80% 90%, ${colors.accent} 0%, transparent 60%)
                    `,
                    filter: 'blur(45px) url(#floor-fog-noise)',
                    animation: 'fog-flow-horizontal-reverse 35s linear infinite',
                    mixBlendMode: 'overlay',
                    transition: 'background 1.8s ease',
                }}
            />

            {/* LAYER 3: Light Pollution - where spotlights hit the fog */}
            <div
                className="absolute inset-x-0 bottom-0 h-[40%]"
                style={{
                    background: colorPhase === 'red'
                        ? `
                            radial-gradient(ellipse 15% 30% at 8% 100%, rgba(220, 80, 80, 0.15) 0%, transparent 70%),
                            radial-gradient(ellipse 18% 35% at 28% 100%, rgba(220, 80, 80, 0.18) 0%, transparent 70%),
                            radial-gradient(ellipse 20% 40% at 50% 100%, rgba(220, 80, 80, 0.22) 0%, transparent 70%),
                            radial-gradient(ellipse 18% 35% at 72% 100%, rgba(220, 80, 80, 0.18) 0%, transparent 70%),
                            radial-gradient(ellipse 15% 30% at 92% 100%, rgba(220, 80, 80, 0.15) 0%, transparent 70%)
                        `
                        : `
                            radial-gradient(ellipse 15% 30% at 8% 100%, rgba(255, 255, 255, 0.1) 0%, transparent 70%),
                            radial-gradient(ellipse 18% 35% at 28% 100%, rgba(255, 255, 255, 0.12) 0%, transparent 70%),
                            radial-gradient(ellipse 20% 40% at 50% 100%, rgba(255, 255, 255, 0.15) 0%, transparent 70%),
                            radial-gradient(ellipse 18% 35% at 72% 100%, rgba(255, 255, 255, 0.12) 0%, transparent 70%),
                            radial-gradient(ellipse 15% 30% at 8% 100%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)
                        `,
                    filter: 'blur(30px)',
                    opacity: isActive ? 0.7 : 0,
                    transition: 'background 1.8s ease, opacity 1.5s ease',
                    animation: 'fog-glow-pulse 4s ease-in-out infinite',
                }}
            />

            {/* LAYER 4: Rising Wisps - subtle floating particles */}
            <div
                className="absolute inset-x-0 bottom-0 h-full"
                style={{
                    background: `
                        radial-gradient(circle at 40% 80%, ${colors.wisp} 0%, transparent 30%),
                        radial-gradient(circle at 70% 85%, ${colors.wisp} 0%, transparent 30%)
                    `,
                    filter: 'blur(25px)',
                    animation: 'fog-rise-subtle 20s ease-in-out infinite',
                    mixBlendMode: 'screen',
                    transition: 'background 1.8s ease',
                    opacity: 0.4,
                }}
            />

            <style>{`
                @keyframes fog-flow-horizontal {
                    0% { transform: translateX(0) scaleY(1); }
                    33% { transform: translateX(20%) scaleY(1.15); }
                    66% { transform: translateX(-15%) scaleY(1.05); }
                    100% { transform: translateX(0) scaleY(1); }
                }

                @keyframes fog-flow-horizontal-opposite {
                    0% { transform: translateX(0) scaleY(1); }
                    33% { transform: translateX(-25%) scaleY(1.1); }
                    66% { transform: translateX(15%) scaleY(1.08); }
                    100% { transform: translateX(0) scaleY(1); }
                }

                @keyframes fog-flow-horizontal-reverse {
                    0% { transform: translateX(0); }
                    33% { transform: translateX(-30%); }
                    66% { transform: translateX(10%); }
                    100% { transform: translateX(0); }
                }

                @keyframes fog-rise-subtle {
                    0% { transform: translateY(0) scale(1); opacity: 0.8; }
                    50% { transform: translateY(-50px) scale(1.08); opacity: 0.5; }
                    100% { transform: translateY(0) scale(1); opacity: 0.8; }
                }

                @keyframes fog-glow-pulse {
                    0%, 100% { opacity: 0.85; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default StageFog;