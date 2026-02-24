import React, { useState, useEffect, useRef } from 'react';
import redLightVideo from '../assets/red_light.mp4';
import StageSpotlights from './ui/StageSpotlights';
import StageFog from './ui/StageFog';
import Spotlight from './ui/spotlight';
import { StarsBackground } from './ui/stars-background';

const EventsHero = () => {
    const [showVideo, setShowVideo] = useState(true);
    const [videoFading, setVideoFading] = useState(false);
    const [spotlightsActive, setSpotlightsActive] = useState(false);
    const [spotlightColor, setSpotlightColor] = useState('white');
    const [textRevealed, setTextRevealed] = useState(false);
    const [textIlluminated, setTextIlluminated] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(null);
    const [isCursorInTextBox, setIsCursorInTextBox] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        // Timeline for dramatic "show opening" effect:
        // 0-2s: Video plays
        // 2s: Video fades out
        // 2.8s: Spotlights + Fog turn on
        // 3.5s: Text revealed (small)
        // 4s: Spotlights go red
        // 4.8s: Text scales up and illuminates

        const fadeTimer = setTimeout(() => setVideoFading(true), 2000);
        const hideVideoTimer = setTimeout(() => setShowVideo(false), 2800);
        const spotlightsTimer = setTimeout(() => setSpotlightsActive(true), 2800);
        const textRevealTimer = setTimeout(() => setTextRevealed(true), 3500);
        const colorTimer = setTimeout(() => setSpotlightColor('red'), 4000);
        const illuminateTimer = setTimeout(() => setTextIlluminated(true), 4800);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(hideVideoTimer);
            clearTimeout(spotlightsTimer);
            clearTimeout(textRevealTimer);
            clearTimeout(colorTimer);
            clearTimeout(illuminateTimer);
        };
    }, []);

    return (
        <div className="relative w-full h-[101vh] overflow-hidden bg-black">
            {/* Video Intro Layer */}
            {showVideo && (
                <div
                    className={`absolute inset-0 z-50 transition-opacity ${videoFading ? 'opacity-0' : 'opacity-100'
                        }`}
                    style={{ transitionDuration: '800ms' }}
                >
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        playsInline
                    >
                        <source src={redLightVideo} type="video/mp4" />
                    </video>
                </div>
            )}

            {/* Stars background - fills the dark empty region */}
            <div className="absolute inset-0 z-[1]">
                <StarsBackground
                    starDensity={0.0022}
                    twinkleProbability={0.9}
                    minTwinkleSpeed={0.4}
                    maxTwinkleSpeed={1.2}
                />
            </div>

            {/* Spotlights Layer */}
            <StageSpotlights
                isActive={spotlightsActive}
                colorPhase={spotlightColor}
                focusTarget={isCursorInTextBox && textIlluminated ? cursorPosition : null}
            />

            {/* Atmospheric Fog Layer */}
            <StageFog isActive={spotlightsActive} colorPhase={spotlightColor} />

            {/* Hero Text Section */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">

                {/* Hero Text Content with Scale-Up Reveal */}
                <div
                    className="relative text-center"
                    onMouseMove={(e) => setCursorPosition({ x: e.clientX, y: e.clientY })}
                    onMouseEnter={() => setIsCursorInTextBox(true)}
                    onMouseLeave={() => { setIsCursorInTextBox(false); setCursorPosition(null); }}
                    style={{
                        padding: '80px 120px', // Larger invisible hit area
                        cursor: textIlluminated ? 'none' : 'default',
                        opacity: showVideo ? 0 : textRevealed ? (textIlluminated ? 1 : 0.2) : 0,
                        transform: textIlluminated
                            ? 'scale(1) translateY(0)'
                            : textRevealed
                                ? 'scale(0.92) translateY(10px)'
                                : 'scale(0.85) translateY(20px)',
                        filter: textIlluminated ? 'brightness(1)' : 'brightness(0.4)',
                        transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    {/* Ambient glow behind text */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                            width: '150%',
                            height: '250%',
                            background: textIlluminated
                                ? 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.25) 0%, rgba(220, 38, 38, 0.1) 30%, transparent 60%)'
                                : 'transparent',
                            filter: 'blur(50px)',
                            transition: 'background 1.5s ease',
                            zIndex: -1,
                        }}
                    />

                    {/* Interactive cursor spotlight - only when text is illuminated */}
                    {textIlluminated && (
                        <Spotlight
                            color="mixed"
                            size={200}
                        />
                    )}

                    {/* SECOND */}
                    <h1
                        className="uppercase tracking-tight leading-none"
                        style={{
                            fontSize: 'clamp(4rem, 14vw, 7rem)',
                            fontStyle: 'italic',
                            fontWeight: 700,
                            color: '#ffffff',
                            textShadow: textIlluminated
                                ? '0 0 20px rgba(255,255,255,0.15), 0 0 60px rgba(255,255,255,0.05)'
                                : 'none',
                            fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                            letterSpacing: '0.05em',
                            transition: 'all 1.2s ease',
                            marginBottom: '0.2em',
                        }}
                    >
                        SECOND
                    </h1>

                    {/* SIGHT */}
                    <h1
                        className="uppercase tracking-tight leading-none"
                        style={{
                            fontSize: 'clamp(4rem, 14vw, 7rem)',
                            fontStyle: 'italic',
                            fontWeight: 700,
                            color: '#dc2626',
                            textShadow: textIlluminated
                                ? '0 0 20px rgba(220,38,38,0.3), 0 0 60px rgba(220,38,38,0.1)'
                                : 'none',
                            fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                            letterSpacing: '0.02em',
                            marginTop: '-0.1em',
                            transition: 'all 1.2s ease',
                        }}
                    >
                        SIGHT
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default EventsHero;

