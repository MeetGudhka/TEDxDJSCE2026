import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

// Utility function to merge class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

/**
 * Spotlight - A dynamic cursor-following spotlight effect
 * Adapted from motion-primitives for the TEDx Events page
 */
export function Spotlight({
    className,
    size = 200,
    springOptions = { bounce: 0 },
    color = 'red', // 'red' or 'white'
}) {
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [parentElement, setParentElement] = useState(null);

    const mouseX = useSpring(0, springOptions);
    const mouseY = useSpring(0, springOptions);

    const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
    const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

    // Generate gradient based on color prop
    const getGradient = () => {
        if (color === 'red') {
            return 'radial-gradient(circle at center, rgba(220, 38, 38, 0.6) 0%, rgba(185, 28, 28, 0.4) 30%, rgba(127, 29, 29, 0.2) 60%, transparent 80%)';
        }
        if (color === 'mixed') {
            // Red and white mix - warm pinkish glow like fog
            return 'radial-gradient(circle at center, rgba(255, 200, 200, 0.65) 0%, rgba(255, 150, 150, 0.45) 25%, rgba(220, 100, 100, 0.3) 50%, rgba(180, 80, 80, 0.15) 70%, transparent 85%)';
        }
        return 'radial-gradient(circle at center, rgba(255, 255, 255, 0.6) 0%, rgba(200, 200, 200, 0.4) 30%, rgba(150, 150, 150, 0.2) 60%, transparent 80%)';
    };

    useEffect(() => {
        if (containerRef.current) {
            const parent = containerRef.current.parentElement;
            if (parent) {
                parent.style.position = 'relative';
                // Note: No overflow:hidden for seamless spotlight effect
                setParentElement(parent);
            }
        }
    }, []);

    const handleMouseMove = useCallback(
        (event) => {
            if (!parentElement) return;
            const { left, top } = parentElement.getBoundingClientRect();
            mouseX.set(event.clientX - left);
            mouseY.set(event.clientY - top);
        },
        [mouseX, mouseY, parentElement]
    );

    useEffect(() => {
        if (!parentElement) return;

        const abortController = new AbortController();

        parentElement.addEventListener('mousemove', handleMouseMove, {
            signal: abortController.signal,
        });
        parentElement.addEventListener('mouseenter', () => setIsHovered(true), {
            signal: abortController.signal,
        });
        parentElement.addEventListener('mouseleave', () => setIsHovered(false), {
            signal: abortController.signal,
        });

        return () => {
            abortController.abort();
        };
    }, [parentElement, handleMouseMove]);

    return (
        <motion.div
            ref={containerRef}
            className={cn(
                'pointer-events-none absolute rounded-full blur-xl transition-opacity duration-200',
                className
            )}
            style={{
                width: size,
                height: size,
                left: spotlightLeft,
                top: spotlightTop,
                background: getGradient(),
                opacity: isHovered ? 1 : 0,
                zIndex: -1, // Place behind text
            }}
        />
    );
}

export default Spotlight;
