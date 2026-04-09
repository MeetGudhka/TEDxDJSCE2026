import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ComingSoon.css';

// -------------------------------------------------------------
// LIGHT WAVES BACKGROUND COMPONENT (Consolidated)
// -------------------------------------------------------------
const LightWavesBackground = ({
    className = "",
    children,
    colors = ["#e62b1e", "#9b1c14", "#d32f2f", "#800000", "#ff4444"],
    speed = 1,
    intensity = 0.6,
}) => {
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const wavesRef = useRef([])
    const animationRef = useRef()
    const startTimeRef = useRef(Date.now())

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        if (!result) return { r: 255, g: 255, b: 255 }
        return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
    }

    const initWaves = useCallback(
        (height) => {
            const waves = []
            const waveCount = 5
            for (let i = 0; i < waveCount; i++) {
                waves.push({
                    y: height * (0.4 + (i / waveCount) * 0.45), // Shifted down (0.4 instead of 0.3)
                    amplitude: height * (0.13 + Math.random() * 0.13), // Slightly reduced amplitude to avoid hitting edges
                    frequency: 0.002 + Math.random() * 0.002,
                    speed: (0.2 + Math.random() * 0.3) * (i % 2 === 0 ? 1 : -1),
                    phase: Math.random() * Math.PI * 2,
                    color: colors[i % colors.length],
                    opacity: 0.15 + Math.random() * 0.1,
                })
            }
            wavesRef.current = waves
        },
        [colors],
    )

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let width = 0
        let height = 0

        const updateSize = () => {
            const rect = container.getBoundingClientRect()
            width = rect.width
            height = rect.height
            canvas.width = width
            canvas.height = height
            initWaves(height)
        }
        updateSize()

        const ro = new ResizeObserver(updateSize)
        ro.observe(container)

        const draw = () => {
            const time = (Date.now() - startTimeRef.current) * 0.001 * speed
            const bgGradient = ctx.createLinearGradient(0, 0, 0, height)
            bgGradient.addColorStop(0, "#000000")
            bgGradient.addColorStop(0.5, "#0a0000")
            bgGradient.addColorStop(1, "#000000")
            ctx.fillStyle = bgGradient
            ctx.fillRect(0, 0, width, height)

            ctx.globalCompositeOperation = "lighter"
            const glowSpots = [
                { x: width * 0.2, y: height * 0.3, radius: Math.min(width, height) * 0.4, color: colors[0] },
                { x: width * 0.8, y: height * 0.6, radius: Math.min(width, height) * 0.35, color: colors[1] },
                { x: width * 0.5, y: height * 0.8, radius: Math.min(width, height) * 0.3, color: colors[2] },
            ]

            for (const spot of glowSpots) {
                const rgb = hexToRgb(spot.color)
                const gradient = ctx.createRadialGradient(
                    spot.x + Math.sin(time * 0.3) * 50, spot.y + Math.cos(time * 0.2) * 30, 0,
                    spot.x + Math.sin(time * 0.3) * 50, spot.y + Math.cos(time * 0.2) * 30, spot.radius
                )
                gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.08 * intensity})`)
                gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.03 * intensity})`)
                gradient.addColorStop(1, "transparent")
                ctx.fillStyle = gradient
                ctx.fillRect(0, 0, width, height)
            }

            for (const wave of wavesRef.current) {
                const rgb = hexToRgb(wave.color)
                ctx.beginPath()
                ctx.moveTo(0, height)
                for (let x = 0; x <= width; x += 5) {
                    const y = wave.y + Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
                        Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7 + wave.phase * 1.3) * wave.amplitude * 0.5
                    if (x === 0) ctx.moveTo(x, y)
                    else ctx.lineTo(x, y)
                }
                ctx.lineTo(width, height)
                ctx.lineTo(0, height)
                ctx.closePath()

                const waveGradient = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, height)
                waveGradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${wave.opacity * intensity})`)
                waveGradient.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${wave.opacity * 0.5 * intensity})`)
                waveGradient.addColorStop(1, "transparent")
                ctx.fillStyle = waveGradient
                ctx.fill()
            }

            ctx.globalCompositeOperation = "source-over"
            const firstColor = hexToRgb(colors[0])
            const topGlow = ctx.createLinearGradient(0, 0, 0, height * 0.4)
            topGlow.addColorStop(0, `rgba(${firstColor.r}, ${firstColor.g}, ${firstColor.b}, ${0.05 * intensity})`)
            topGlow.addColorStop(1, "transparent")
            ctx.fillStyle = topGlow
            ctx.fillRect(0, 0, width, height * 0.4)

            animationRef.current = requestAnimationFrame(draw)
        }
        animationRef.current = requestAnimationFrame(draw)
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
            ro.disconnect()
        }
    }, [colors, speed, intensity, initWaves])

    return (
        <div ref={containerRef} className={`light-waves-container ${className}`}>
            <canvas ref={canvasRef} className="light-waves-canvas" />
            <div className="light-waves-noise" />
            <div className="light-waves-vignette" />
            {children && <div className="light-waves-content">{children}</div>}
        </div>
    )
}

// -------------------------------------------------------------
// EMBER PARTICLES COMPONENT (Restored for Upper Half Elegance)
// -------------------------------------------------------------
const CanvasParticles3D = ({ mousePos }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.z = Math.random();
                this.baseSize = (this.z * 1.5) + 0.5;
                this.size = this.baseSize;
                this.speedX = ((Math.random() - 0.5) * 0.2) * (this.z + 0.1);
                this.speedY = (-Math.random() * 0.3 - 0.1) * (this.z + 0.1);
                this.opacity = this.z * 0.4 + 0.1;

                // Deep red/fiery mix for TEDx brand
                const r = 255;
                const g = Math.floor(Math.random() * 80);
                const b = Math.floor(Math.random() * 20);
                this.color = `${r}, ${g}, ${b}`;
            }

            update(mx, my) {
                const parallaxX = (mx - width / 2) * -0.01 * this.z;
                const parallaxY = (my - height / 2) * -0.01 * this.z;

                this.x += this.speedX;
                this.y += this.speedY;

                this.drawX = this.x + parallaxX;
                this.drawY = this.y + parallaxY;

                if (this.y < -50) {
                    this.y = height + 50;
                    this.x = Math.random() * width;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.drawX, this.drawY, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.fill();
                if (this.z > 0.8) {
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = `rgba(${this.color}, ${this.opacity})`;
                } else {
                    ctx.shadowBlur = 0;
                }
            }
        }

        const initParticles = () => {
            particles = [];
            const count = Math.min(Math.floor((width * height) / 10000), 80); // Sparsely grouped embers
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update(mousePos.current.x, mousePos.current.y);
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mousePos]);

    return <canvas ref={canvasRef} className="qt-particles" />;
};


// -------------------------------------------------------------
// PHYSICS CHARACTER COMPONENT 
// -------------------------------------------------------------
const PhysicsChar = ({ char, charIndex }) => {
    const charRef = useRef(null);

    const state = useRef({
        x: 0, y: 0, rot: 0, scale: 1,
        vx: 0, vy: 0, vrot: 0, vscale: 0,
        targetX: 0, targetY: 0, targetRot: 0, targetScale: 1
    });

    useEffect(() => {
        let rafId;
        const spring = 0.1;
        const friction = 0.8;

        state.current.x = (Math.random() - 0.5) * 400;
        state.current.y = (Math.random() - 0.5) * 400 + 200;
        state.current.rot = (Math.random() - 0.5) * 180;
        state.current.scale = 0;

        setTimeout(() => {
            state.current.targetX = 0;
            state.current.targetY = 0;
            state.current.targetRot = 0;
            state.current.targetScale = 1;
        }, 100 + charIndex * 30);

        const animate = () => {
            const ax = (state.current.targetX - state.current.x) * spring;
            const ay = (state.current.targetY - state.current.y) * spring;
            const arot = (state.current.targetRot - state.current.rot) * spring;
            const ascale = (state.current.targetScale - state.current.scale) * spring;

            state.current.vx += ax;
            state.current.vy += ay;
            state.current.vrot += arot;
            state.current.vscale += ascale;

            state.current.vx *= friction;
            state.current.vy *= friction;
            state.current.vrot *= friction;
            state.current.vscale *= friction;

            state.current.x += state.current.vx;
            state.current.y += state.current.vy;
            state.current.rot += state.current.vrot;
            state.current.scale += state.current.vscale;

            if (charRef.current) {
                charRef.current.style.transform = `translate3d(${state.current.x}px, ${state.current.y}px, 0) rotate(${state.current.rot}deg) scale(${state.current.scale})`;
            }

            rafId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(rafId);
    }, [charIndex]);

    return (
        <span ref={charRef} className="qt-physics-char">
            {char}
        </span>
    );
};

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------
const QuietThreshold = () => {
    const sectionRef = useRef(null);
    const cardRef = useRef(null);
    const titleWrapperRef = useRef(null);
    const paragraphRef = useRef(null);
    const globalMousePos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });

    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setHasLoaded(true);
        }, 100);
    }, []);

    const titleWords = "The Quiet Threshold".split(" ");

    const handleInteraction = useCallback((e) => {
        let x, y;
        if (e.touches && e.touches[0]) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }

        if (x === undefined || y === undefined) return;

        // --- PHYSICS MAGNETIC SCATTER EFFECT ---
        globalMousePos.current = { x, y };

        if (titleWrapperRef.current) {
            const chars = titleWrapperRef.current.querySelectorAll('.qt-physics-char');

            chars.forEach((charEl) => {
                const rect = charEl.getBoundingClientRect();
                const charX = rect.left + rect.width / 2;
                const charY = rect.top + rect.height / 2;

                const dx = charX - x;
                const dy = charY - y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Slightly smaller interaction radius on mobile for precision
                const maxDist = e.touches ? 100 : 180; // Reduced from 120
                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    const nx = (dx / dist) * force * (e.touches ? 40 : 120); // Reduced from 80
                    const ny = (dy / dist) * force * (e.touches ? 35 : 100); // Reduced from 70
                    const nrot = (nx > 0 ? 1 : -1) * force * (e.touches ? 30 : 60); // Reduced rot

                    charEl.style.transform = `translate3d(${nx}px, ${ny}px, 0) rotate(${nrot}deg) scale(1.15)`;
                    charEl.style.color = '#ffffff';
                    charEl.style.textShadow = `0 0 20px rgba(255,255,255,0.7), 0 0 40px rgba(230,43,30,0.6)`;
                } else {
                    charEl.style.transform = `translate3d(0px, 0px, 0) rotate(0deg) scale(1)`;
                    charEl.style.color = '#e2e8f0';
                    charEl.style.textShadow = 'none';
                }
            });
        }

        // --- Dynamic Reading Spotlight for Paragraph ---
        if (paragraphRef.current) {
            const rect = paragraphRef.current.getBoundingClientRect();
            const relativeX = x - rect.left;
            const relativeY = y - rect.top;
            paragraphRef.current.style.setProperty('--mouse-x', `${relativeX}px`);
            paragraphRef.current.style.setProperty('--mouse-y', `${relativeY}px`);
        }

        // --- 3D Environment Tilt ---
        if (sectionRef.current) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            sectionRef.current.style.setProperty('--env-rot-x', `${rotateX}deg`);
            sectionRef.current.style.setProperty('--env-rot-y', `${rotateY}deg`);
            sectionRef.current.style.setProperty('--mouse-x-norm', x / window.innerWidth);
            sectionRef.current.style.setProperty('--mouse-y-norm', y / window.innerHeight);
        }

    }, []);

    const handleInteractionEnd = () => {
        if (titleWrapperRef.current) {
            const chars = titleWrapperRef.current.querySelectorAll('.qt-physics-char');
            chars.forEach(charEl => {
                charEl.style.transform = `translate3d(0px, 0px, 0) rotate(0deg) scale(1)`;
                charEl.style.color = '#e2e8f0';
                charEl.style.textShadow = 'none';
            });
        }
    };

    let globalCharIndex = 0;

    return (
        <LightWavesBackground>
            <section
                ref={sectionRef}
                className={`qt-section ${hasLoaded ? 'loaded' : ''}`}
                onMouseMove={handleInteraction}
                onMouseLeave={handleInteractionEnd}
                onTouchMove={handleInteraction}
                onTouchEnd={handleInteractionEnd}
                onTouchStart={handleInteraction}
            >
                {/* ENHANCED 3D BACKGROUND LAYER */}
                <div className="qt-env-3d">
                    <CanvasParticles3D mousePos={globalMousePos} />
                    <div className="qt-threshold-ring qt-ring-1"></div>
                    <div className="qt-threshold-ring qt-ring-2"></div>
                    <div className="qt-threshold-ring qt-ring-3"></div>
                </div>

                <div className="qt-content-3d">
                    {/* Title Container */}
                    <div className="qt-title-scatter-wrapper" ref={titleWrapperRef}>
                        {titleWords.map((word, wIdx) => {
                            return (
                                <span key={`w-${wIdx}`} className="qt-title-word">
                                    {word.split('').map((char, cIdx) => {
                                        const delay = globalCharIndex * 0.04;
                                        globalCharIndex++;
                                        return (
                                            <span
                                                key={`c-${cIdx}`}
                                                className="qt-physics-char qt-load-stagger"
                                                style={{ '--delay': `${delay}s` }}
                                            >
                                                {char}
                                            </span>
                                        );
                                    })}
                                    &nbsp;
                                </span>
                            );
                        })}
                    </div>

                    {/* Sophisticated Typographic Paragraph */}
                    <div className="qt-pro-text-wrapper" ref={cardRef}>
                        <div className="qt-pro-text-content" ref={paragraphRef}>
                            <div className="qt-reading-spotlight"></div>

                            <p className="qt-lead-paragraph">
                                <span className="qt-dropcap">“T</span>he Quiet Threshold” is about those small, often overlooked moments when something in our life is about to change.
                            </p>

                            <p className="qt-body-paragraph">
                                It’s the pause before taking a big step and the feeling of
                                <span className="qt-highlight"> uncertainty before new beginnings.</span> This theme focuses on looking inward, finding
                                <span className="qt-highlight"> strength in stillness,</span> and having the courage to move forward even when things feel unclear.
                            </p>

                            <p className="qt-body-paragraph">
                                It reminds us that change doesn’t always come with noise or big moments—sometimes it happens quietly and slowly, right when we’re on the cusp of stepping into a new phase filled with
                                <span className="qt-highlight"> endless possibilities.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </LightWavesBackground>
    );
};

export default QuietThreshold;
