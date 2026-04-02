import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import micImage from '../assets/mic_image-removebg-preview.png';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const TIMELINE_DATA = [
  { id: 1, title: "PARTICIPANT REGISTRATION & SEATING", description: "Participants report, register, and are seated." },
  { id: 2, title: "OPENING & WELCOME", description: "Anchor introduces TEDx, the event title, and the theme Second Sight." },
  { id: 3, title: "JUDGES INTRODUCTION", description: "Judges are introduced and the event process is briefly explained." },
  { id: 4, title: "ROUND 1: UNMASKING THE ORDINARY", description: "Participants are called one by one. Each participant delivers a 1–2.5-minute individual speech. Judges score participants as the round progresses." },
  { id: 5, title: "COMPLETION OF ROUND 1", description: "All participants complete their Round 1 speeches. Judges compile scores." },
  { id: 6, title: "SHORTLISTING & TRANSITION BREAK", description: "Judges finalize shortlisted participants for Round 2. Shortlisted names are announced. Brief transition break while Round 2 setup is arranged." },
  { id: 7, title: "ROUND 2: SOLO STORY PUZZLE CHALLENGE", description: "Shortlisted participants are called individually, receive the puzzle cards and deliver a 60–90 second solo story or speech." },
  { id: 8, title: "COMPLETION OF ROUND 2", description: "All shortlisted participants finish their story puzzle presentations. Judges finalize evaluations." },
  { id: 9, title: "FINAL DELIBERATION", description: "Judges discuss and conclude results." },
  { id: 10, title: "RESULTS & RECOGNITION", description: "Winners and special mentions are announced. Certificates and acknowledgements are presented." },
  { id: 11, title: "CLOSING SESSION", description: "Closing remarks by the anchor." },
];

// --- MOBILE DETECTION HOOK ---
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isMobile;
};

// --- MIC IMAGE COMPONENT (replaces SVG icon) ---
const MicImageHeader = ({ isMobile }) => (
  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {/* Mic image container with gradient mask for seamless blend */}
    <div style={{
      position: 'relative',
      width: isMobile ? 140 : 280,
      height: isMobile ? 180 : 340,
      overflow: 'hidden',
    }}>
      {/* The actual mic image */}
      <img
        src={micImage}
        alt="Microphone"
        style={{
          position: 'absolute',
          top: isMobile ? '-15px' : '-30px',
          transform: isMobile ? 'rotate(5deg)' : 'rotate(15deg)',
          width: '100%',
          height: '130%',
          objectFit: 'cover',
          objectPosition: 'center 30%',
          filter: 'brightness(1.3) drop-shadow(0 0 30px rgba(220,38,38,0.7))',
        }}
      />
      {/* Gradient overlay to fade bottom into the rope */}
      <div style={{
        position: 'absolute',
        bottom: '-10px',
        left: 0,
        transform: isMobile ? 'rotate(5deg)' : 'rotate(15deg)',
        right: 0,
        height: '60%',
        background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.9) 70%, #000 100%)',
        pointerEvents: 'none',
      }} />
    </div>
    {/* Red glow connector that bridges image to cable */}
    <div style={{
      width: 6,
      height: isMobile ? 30 : 60,
      marginTop: isMobile ? -20 : -50,
      borderRadius: 999,
      background: 'linear-gradient(to bottom, transparent, rgba(220,38,38,0.5) 20%, #dc2626 50%)',
      boxShadow: '0 0 25px rgba(220,38,38,1)',
      zIndex: 10,
    }} />
  </div>
);

const PlugIcon = () => (
  <svg style={{ width: 48, height: 48, color: '#dc2626', filter: 'drop-shadow(0 0 20px rgba(220,38,38,0.9))', transform: 'rotate(180deg)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 22v-5" />
    <path d="M9 8V2" />
    <path d="M15 8V2" />
    <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" fill="#1f0000" stroke="currentColor" />
  </svg>
);

// --- EVENT CARD (glow activated by scroll/rope, not hover) ---
const EventCard = ({ data, side, isActive }) => {
  return (
    <div
      className="rounded-2xl"
      style={{
        maxWidth: 480,
        width: '100%',
        background: isActive
          ? 'linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(0,0,0,0.6) 50%, rgba(220,38,38,0.1) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.5) 50%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: isActive
          ? '1px solid rgba(220,38,38,0.4)'
          : '1px solid rgba(255,255,255,0.15)',
        padding: 24,
        boxShadow: isActive
          ? '0 25px 50px -12px rgba(220,38,38,0.3), 0 0 30px rgba(220,38,38,0.2), inset 0 1px 1px rgba(255,255,255,0.1)'
          : '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)',
        textAlign: side === 'left' ? 'right' : 'left',
        transform: isActive ? 'scale(1.03) translateY(-4px)' : 'scale(1)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <h3 style={{ color: '#fff', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1rem, 2vw, 1.4rem)', lineHeight: 1.2, marginBottom: 8, letterSpacing: '-0.02em' }}>
        {data.title}
      </h3>
      <p style={{ color: '#9ca3af', fontWeight: 300, lineHeight: 1.6, fontSize: 'clamp(0.75rem, 1vw, 0.9rem)' }}>
        {data.description}
      </p>
    </div>
  );
};


// --- CURVED CABLE SVG ---
// Generates a sinusoidal SVG path that weaves left-right through the timeline
const CurvedCable = ({ isMobile, timelineRef, rowRefs, onProgressUpdate }) => {
  const pathRef = useRef(null);
  const svgRef = useRef(null);
  const [pathD, setPathD] = useState('');
  const [svgHeight, setSvgHeight] = useState(0);
  const [dotPositions, setDotPositions] = useState([]);

  const buildPath = useCallback(() => {
    if (!timelineRef.current || !rowRefs.current || rowRefs.current.length === 0) return;

    const containerRect = timelineRef.current.getBoundingClientRect();
    const containerTop = containerRect.top + window.scrollY;
    const totalHeight = timelineRef.current.scrollHeight;
    setSvgHeight(totalHeight);

    if (isMobile) {
      // Mobile: curve starts from CENTER (where mic connector ends) then sweeps to left side
      const leftX = 22; // left side where dots/cards are
      const amp = 12; // subtle amplitude for S-curve
      const pageCenterX = containerRect.width / 2; // where the mic connector ends

      const rowCenters = [];
      rowRefs.current.forEach((rowEl, i) => {
        if (rowEl) {
          const rowRect = rowEl.getBoundingClientRect();
          const rowTop = rowRect.top + window.scrollY - containerTop;
          const cy = rowTop + rowRect.height / 2;
          rowCenters.push({ index: i, cy });
        }
      });

      if (rowCenters.length === 0) return;

      const dots = [];
      // Start from page center (where mic connector drops down)
      let d = `M ${pageCenterX},0`;

      // First segment: sweep from center to the left side where first dot is
      const firstRow = rowCenters[0];
      const firstDotX = leftX + amp * ((firstRow.index % 2 === 0) ? -1 : 1);
      d += ` C ${pageCenterX},${firstRow.cy * 0.3} ${firstDotX},${firstRow.cy * 0.6} ${firstDotX},${firstRow.cy}`;
      dots.push({ cx: firstDotX, cy: firstRow.cy });

      // Subsequent segments: gentle S-curve along the left side
      for (let i = 1; i < rowCenters.length; i++) {
        const prev = rowCenters[i - 1];
        const curr = rowCenters[i];
        const prevDir = (prev.index % 2 === 0) ? -1 : 1;
        const currDir = (curr.index % 2 === 0) ? -1 : 1;
        const prevX = leftX + amp * prevDir;
        const currX = leftX + amp * currDir;
        const segH = curr.cy - prev.cy;
        d += ` C ${prevX},${prev.cy + segH * 0.35} ${currX},${curr.cy - segH * 0.35} ${currX},${curr.cy}`;
        dots.push({ cx: currX, cy: curr.cy });
      }


      setPathD(d);
      setDotPositions(dots);
      return;
    }

    // Desktop: sinusoidal curve through center
    const centerX = containerRect.width / 2;
    const amplitude = Math.min(120, containerRect.width * 0.1); // how far the S-curve swings

    // Get the Y center of each row relative to the timeline container
    const rowCenters = [];
    rowRefs.current.forEach((rowEl, i) => {
      if (rowEl) {
        const rowRect = rowEl.getBoundingClientRect();
        const rowTop = rowRect.top + window.scrollY - containerTop;
        const cy = rowTop + rowRect.height / 2;
        rowCenters.push({ index: i, cy });
      }
    });

    if (rowCenters.length === 0) return;

    // Build the SVG path: start from top center, curve to each row center
    const dots = [];
    let d = `M ${centerX},0`;

    // First segment: from top (0) to the first row center
    const firstRow = rowCenters[0];
    const firstDir = (firstRow.index % 2 === 0) ? -1 : 1; // even index = left card = curve goes left
    const cp1y = firstRow.cy * 0.4;
    const cp2y = firstRow.cy * 0.7;
    d += ` C ${centerX},${cp1y} ${centerX + amplitude * firstDir},${cp2y} ${centerX + amplitude * firstDir},${firstRow.cy}`;
    dots.push({ cx: centerX + amplitude * firstDir, cy: firstRow.cy });

    // Subsequent segments: curve from one row center to the next
    for (let i = 1; i < rowCenters.length; i++) {
      const prev = rowCenters[i - 1];
      const curr = rowCenters[i];
      const prevDir = (prev.index % 2 === 0) ? -1 : 1;
      const currDir = (curr.index % 2 === 0) ? -1 : 1;

      const prevX = centerX + amplitude * prevDir;
      const currX = centerX + amplitude * currDir;

      // Control points to create smooth S transition
      const segmentHeight = curr.cy - prev.cy;
      const cp1 = { x: prevX, y: prev.cy + segmentHeight * 0.35 };
      const cp2 = { x: currX, y: curr.cy - segmentHeight * 0.35 };

      d += ` C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${currX},${curr.cy}`;
      dots.push({ cx: currX, cy: curr.cy });
    }


    setPathD(d);
    setDotPositions(dots);
  }, [isMobile, timelineRef, rowRefs]);

  // Build path on mount and resize
  useEffect(() => {
    // Use a short timeout to ensure rows are rendered and measured
    const timer = setTimeout(() => {
      buildPath();
    }, 100);

    const handleResize = () => {
      buildPath();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [buildPath]);

  // GSAP ScrollTrigger: animate strokeDashoffset to "draw" the path
  useEffect(() => {
    if (!pathRef.current || !pathD || !timelineRef.current) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();

    // Calculate each dot's fractional position along the path
    const dotFractions = dotPositions.map(dot => {
      // Use binary search along path to find closest point
      let bestDist = Infinity;
      let bestLen = 0;
      const steps = 200;
      for (let s = 0; s <= steps; s++) {
        const len = (s / steps) * totalLength;
        const pt = path.getPointAtLength(len);
        const dist = Math.hypot(pt.x - dot.cx, pt.y - dot.cy);
        if (dist < bestDist) {
          bestDist = dist;
          bestLen = len;
        }
      }
      return bestLen / totalLength;
    });

    // Set up dasharray/dashoffset
    gsap.set(path, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    });

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        onUpdate: (self) => {
          if (onProgressUpdate) {
            onProgressUpdate(self.progress, dotFractions);
          }
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [pathD, timelineRef, dotPositions, onProgressUpdate]);

  if (!pathD) return null;

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: svgHeight,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <defs>
        <filter id="cableGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="cableGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="50%" stopColor="#7f1d1d" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>

      {/* Glow layer (always visible, provides subtle background glow) */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(220,38,38,0.4)"
        strokeWidth={isMobile ? 6 : 10}
        strokeLinecap="round"
        style={{ filter: 'blur(8px)' }}
      />

      {/* Main cable path (draws on scroll) */}
      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke="url(#cableGradient)"
        strokeWidth={isMobile ? 3 : 4}
        strokeLinecap="round"
        filter="url(#cableGlow)"
      />

      {/* Glowing dots at each event position */}
      {dotPositions.map((dot, i) => (
        <g key={i}>
          {/* Outer glow */}
          <circle cx={dot.cx} cy={dot.cy} r={isMobile ? 7 : 10} fill="rgba(220,38,38,0.3)" />
          {/* Inner dot */}
          <circle
            cx={dot.cx}
            cy={dot.cy}
            r={isMobile ? 5 : 7}
            fill="#000"
            stroke="#ef4444"
            strokeWidth={2}
            style={{ filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.9))' }}
          />
        </g>
      ))}
    </svg>
  );
};


// --- TIMELINE ROW (with GSAP scroll-triggered slide-in) ---
// Structure:
//   OUTER — margin for vertical spacing (NOT position:relative)
//     INNER — position:relative, display:flex, NO padding. Anchor for absolutes.
//       [absolute] ConnectorLine  → top:50% left/right:50%
//       [flex-1]   Left half      → card or empty
//       [flex-1]   Right half     → card or empty
const TimelineRow = React.forwardRef(({ data, index, isMobile, isActive }, ref) => {
  const cardRef = useRef(null);
  const isLeft = index % 2 === 0;

  // GSAP ScrollTrigger for card slide-in animation + glow activation
  useEffect(() => {
    if (!cardRef.current) return;

    const el = cardRef.current;

    if (isMobile) {
      // Mobile: slide in from right
      gsap.fromTo(el,
        { opacity: 0, x: 60, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    } else {
      // Desktop: slide in from the card's side
      const xOffset = isLeft ? -100 : 100;
      gsap.fromTo(el,
        { opacity: 0, x: xOffset, scale: 0.92, rotation: isLeft ? -3 : 3 },
        {
          opacity: 1, x: 0, scale: 1, rotation: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [isMobile, isLeft]);

  // Mobile layout: single column, all cards on right side
  if (isMobile) {
    return (
      <div
        ref={ref}
        style={{
          marginTop: index === 0 ? 90 : 24,
          marginBottom: 24,
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
          {/* CARD - full width with left padding */}
          <div ref={cardRef} style={{ flex: 1, paddingLeft: 60, paddingRight: 16, opacity: 0 }}>
            <EventCard data={data} side="right" isActive={isActive} />
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout: alternating left/right
  return (
    // OUTER: spacing. NOT position:relative.
    <div
      ref={ref}
      style={{
        marginTop: 40,
        marginBottom: 40,
      }}
    >
      {/* INNER: the positioned ancestor */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>

        {/* LEFT HALF */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 24 }}>
          {isLeft && (
            <div ref={cardRef} style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', opacity: 0 }}>
              <EventCard data={data} side="left" isActive={isActive} />
            </div>
          )}
        </div>

        {/* RIGHT HALF */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 24 }}>
          {!isLeft && (
            <div ref={cardRef} style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', opacity: 0 }}>
              <EventCard data={data} side="right" isActive={isActive} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
TimelineRow.displayName = 'TimelineRow';


// --- MAIN ---
export default function MicTimeline() {
  const isMobile = useIsMobile();
  const timelineRef = useRef(null);
  const rowRefs = useRef([]);

  // Ensure rowRefs array matches data length
  useEffect(() => {
    rowRefs.current = rowRefs.current.slice(0, TIMELINE_DATA.length);
  }, []);

  const [activeCards, setActiveCards] = useState(
    () => new Array(TIMELINE_DATA.length).fill(false)
  );

  const handleRopeProgress = useCallback((progress, dotFractions) => {
    setActiveCards(prev => {
      const next = [...prev];
      let changed = false;
      dotFractions.forEach((frac, i) => {
        const shouldBeActive = progress >= frac;
        if (next[i] !== shouldBeActive) {
          next[i] = shouldBeActive;
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', background: 'transparent', color: '#fff', fontFamily: 'sans-serif' }}>

      {/* Radial background */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center top, rgba(43,0,0,0.4) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: isMobile ? '40px 8px' : '80px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 56, position: 'relative' }}>
          {/* Glow blob */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: isMobile ? 180 : 256, height: isMobile ? 180 : 256, background: 'rgba(220,38,38,0.2)', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }} />
          <h1 style={{ position: 'relative', color: '#dc2626', fontWeight: 900, fontSize: 'clamp(3.5rem, 8vw, 6rem)', letterSpacing: '-0.04em', textShadow: '0 0 25px rgba(220,38,38,0.6)', lineHeight: 1 }}>
            TED<span style={{ color: '#dc2626' }}>x</span><span style={{ color: '#ffffffff' }}>DJSCE</span>
          </h1>
          <p style={{ position: 'relative', marginTop: 16, color: '#f87171', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: isMobile ? '0.2em' : '0.4em', fontSize: 'clamp(0.75rem, 1.2vw, 1rem)', padding: '8px 0', borderTop: '1px solid rgba(127,29,29,0.5)', borderBottom: '1px solid rgba(127,29,29,0.5)', display: 'inline-block' }}>
            The Official Event Roadmap
          </p>
        </div>

        {/* MIC IMAGE HEADER */}
        <div style={{ zIndex: 20 }}>
          <MicImageHeader isMobile={isMobile} />
        </div>

        {/* TIMELINE (curved cable + rows) */}
        <div ref={timelineRef} style={{ position: 'relative', width: '100%' }}>
          <CurvedCable isMobile={isMobile} timelineRef={timelineRef} rowRefs={rowRefs} onProgressUpdate={handleRopeProgress} />
          {TIMELINE_DATA.map((item, index) => (
            <TimelineRow
              key={item.id}
              ref={(el) => { rowRefs.current[index] = el; }}
              data={item}
              index={index}
              isMobile={isMobile}
              isActive={activeCards[index]}
            />
          ))}
        </div>


      </div>
    </div>
  );
}