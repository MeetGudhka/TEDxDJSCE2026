import React, { useState, useEffect } from 'react';
import Anjali from '../assets/Anjali.JPG';
import Harsh from '../assets/Harsh.JPG';
import Salman from '../assets/Salman.JPG';
import Miti from '../assets/MitiShah.JPG';
import Shantanu from '../assets/Shantanu.jpeg';
import IMG from '../assets/IMG_6134.JPG';

// Placeholder gallery data - replace images when actual event photos are available
const GALLERY_DATA = [
    { id: 1, image: Anjali, title: "TEDxDJSCE" },
    { id: 2, image: Shantanu, title: "TEDxDJSCE" },
    { id: 3, image: Salman, title: "TEDxDJSCE", },
    { id: 4, image: Harsh, title: "TEDxDJSCE" },
    { id: 5, image: Miti, title: "TEDxDJSCE" },
    { id: 6, image: IMG, title: "TEDxDJSCE" },
];

// Individual Gallery Card
const GalleryCard = ({ data, isActive }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/5',
                borderRadius: 16,
                overflow: 'hidden',
                cursor: 'pointer',
                transform: hovered ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: hovered
                    ? '0 25px 50px -12px rgba(220,38,38,0.4), 0 0 40px rgba(220,38,38,0.2)'
                    : '0 25px 50px -12px rgba(0,0,0,0.5)',
            }}
        >
            {/* Image */}
            <img
                src={data.image}
                alt={data.title}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: hovered ? 'grayscale(0%) brightness(1.1)' : 'grayscale(70%) brightness(0.8)',
                    transition: 'filter 0.5s ease',
                }}
            />

            {/* Gradient overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Red accent glow on hover */}
            {hovered && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at center bottom, rgba(220,38,38,0.3), transparent 70%)',
                        pointerEvents: 'none',
                    }}
                />
            )}

            {/* Text content */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 24,
                    textAlign: 'center',
                }}
            >
                <h3
                    style={{
                        color: hovered ? '#ef4444' : '#fff',
                        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                        fontWeight: 700,
                        marginBottom: 4,
                        transition: 'color 0.3s ease',
                    }}
                >
                    {data.title}
                </h3>
            </div>
        </div>
    );
};

// Main Gallery Component
const EventGallery = () => {
    // Responsive hooks
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth < 640 : false
    );
    const [isTablet, setIsTablet] = useState(
        typeof window !== 'undefined' ? window.innerWidth >= 640 && window.innerWidth < 1024 : false
    );

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 640);
            setIsTablet(width >= 640 && width < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [activeSet, setActiveSet] = useState(0);

    // Responsive items per view: 1 for mobile, 2 for tablet, 3 for desktop
    const itemsPerView = isMobile ? 1 : isTablet ? 2 : 3;
    const totalSets = Math.ceil(GALLERY_DATA.length / itemsPerView);

    // Auto-rotate gallery every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSet((prev) => (prev + 1) % totalSets);
        }, 4000);
        return () => clearInterval(interval);
    }, [totalSets]);

    // Get current visible items
    const startIndex = activeSet * itemsPerView;
    const visibleItems = GALLERY_DATA.slice(startIndex, startIndex + itemsPerView);

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '100vh',
                background: 'transparent',
                padding: '80px 0',
                overflow: 'hidden',
            }}
        >
            {/* Radial background glow */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at center top, rgba(43,0,0,0.4) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Content */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    maxWidth: 1280,
                    margin: '0 auto',
                    padding: isMobile ? '0 16px' : '0 24px',
                }}
            >
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 64 }}>
                    {/* Glow blob */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 80,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 300,
                            height: 200,
                            background: 'rgba(220,38,38,0.15)',
                            filter: 'blur(80px)',
                            borderRadius: '50%',
                            pointerEvents: 'none',
                        }}
                    />

                    <h2
                        style={{
                            position: 'relative',
                            color: '#fff',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                            letterSpacing: '-0.04em',
                            textShadow: '0 0 25px rgba(220,38,38,0.5)',
                            lineHeight: 1,
                            marginBottom: 16,
                        }}
                    >
                        Gallery Of {isMobile ? <br /> : ' '}
                        <span style={{ color: '#dc2626' }}>PAST EVENTS</span>
                    </h2>

                    <p
                        style={{
                            color: '#9ca3af',
                            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                            maxWidth: 600,
                            margin: '0 auto',
                            lineHeight: 1.6,
                        }}
                    >
                        Relive the moments that defined our TEDx journey — stories shared, ideas sparked, and connections made.
                    </p>
                </div>

                {/* Gallery Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                        gap: isMobile ? 24 : 32,
                        marginBottom: 48,
                    }}
                >
                    {visibleItems.map((item) => (
                        <GalleryCard key={item.id} data={item} />
                    ))}
                </div>

                {/* Navigation Dots */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 12,
                    }}
                >
                    {Array.from({ length: totalSets }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveSet(index)}
                            style={{
                                width: activeSet === index ? 32 : 12,
                                height: 12,
                                borderRadius: 6,
                                border: 'none',
                                background: activeSet === index ? '#dc2626' : 'rgba(255,255,255,0.3)',
                                boxShadow: activeSet === index ? '0 0 15px rgba(220,38,38,0.8)' : 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                            aria-label={`View gallery set ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventGallery;
