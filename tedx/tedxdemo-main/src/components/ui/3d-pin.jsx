import React, { useState } from "react";

// Utility function to merge class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

export const PinContainer = ({
    children,
    title,
    href,
    className,
    containerClassName,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn(
                "group/pin relative z-50 cursor-pointer",
                containerClassName
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 3D Perspective Container - positioned at center of container */}
            <div
                style={{ perspective: "1000px" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                {/* Card with 3D tilt effect */}
                <div
                    style={{
                        transform: isHovered
                            ? "translate(-50%, -50%) rotateX(40deg) scale(0.8)"
                            : "translate(-50%, -50%) rotateX(0deg) scale(1)",
                    }}
                    className={cn(
                        "absolute left-1/2 top-1/2 flex items-start justify-start overflow-hidden",
                        "rounded-2xl border border-white/10 bg-black p-4",
                        "shadow-[0_8px_16px_rgb(0_0_0/0.4)] transition-all duration-1000 ease-out",
                        "group-hover/pin:border-white/20"
                    )}
                >
                    <div className={cn("relative z-50", className)}>{children}</div>
                </div>
            </div>

            {/* Pin Perspective Overlay - FULL SIZE of container, positioned absolutely */}
            <PinPerspective title={title} href={href} isHovered={isHovered} />
        </div>
    );
};

const PinPerspective = ({ title, href, isHovered }) => {
    return (
        // Use absolute positioning to cover full container
        <div
            className={cn(
                "absolute inset-0 pointer-events-none z-[60]",
                "transition-opacity duration-700",
                isHovered ? "opacity-100" : "opacity-0"
            )}
        >
            {/* Title Link - positioned at top center of container */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 flex justify-center">
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        "pointer-events-auto relative z-10 flex items-center space-x-2",
                        "rounded-full bg-zinc-950 px-4 py-0.5 ring-1 ring-white/10"
                    )}
                >
                    <span className="relative z-20 inline-block py-0.5 text-xs font-bold text-white">
                        {title}
                    </span>
                    {/* Gradient underline */}
                    <span
                        className={cn(
                            "absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)]",
                            "bg-gradient-to-r from-red-500/0 via-red-500/90 to-red-500/0",
                            "transition-opacity duration-700"
                        )}
                    />
                </a>
            </div>

            {/* Pin Stem - starts from title, goes to center */}
            {/* Gradient Line (Blurred) */}
            <div
                className={cn(
                    "absolute left-1/2 top-[30px] w-px -translate-x-1/2",
                    "bg-gradient-to-b from-red-500 to-red-500 blur-[2px]",
                    "transition-all duration-500"
                )}
                style={{ height: "calc(50% - 30px)" }}
            />
            {/* Gradient Line (Sharp) */}
            <div
                className={cn(
                    "absolute left-1/2 top-[30px] w-px -translate-x-1/2",
                    "bg-gradient-to-b from-red-500 to-red-500",
                    "transition-all duration-500"
                )}
                style={{ height: "calc(50% - 30px)" }}
            />

            {/* Pin Tip - Glowing Dot at center */}
            <div
                className={cn(
                    "absolute left-1/2 top-1/2 z-40 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2",
                    "rounded-full bg-red-500 blur-[4px]"
                )}
            />
            {/* Pin Tip - Sharp Dot */}
            <div
                className={cn(
                    "absolute left-1/2 top-1/2 z-40 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2",
                    "rounded-full bg-red-300"
                )}
            />

            {/* 3D Pin Base with Pulsing Rings - at center of container */}
            <div
                style={{
                    perspective: "1000px",
                    transform: "translateX(-50%) translateY(-50%) rotateX(70deg) translateZ(0)",
                    left: "50%",
                    top: "50%",
                    position: "absolute",
                }}
            >
                {/* Pulsing Ring 1 */}
                <div
                    className={cn(
                        "absolute h-[11.25rem] w-[11.25rem]",
                        "rounded-full bg-red-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]",
                        "animate-ping-slow"
                    )}
                    style={{
                        animationDelay: "0s",
                        left: "50%",
                        top: "50%",
                        transform: "translateX(-50%) translateY(-50%)"
                    }}
                />
                {/* Pulsing Ring 2 */}
                <div
                    className={cn(
                        "absolute h-[11.25rem] w-[11.25rem]",
                        "rounded-full bg-red-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]",
                        "animate-ping-slow"
                    )}
                    style={{
                        animationDelay: "2.5s",
                        left: "50%",
                        top: "50%",
                        transform: "translateX(-50%) translateY(-50%)"
                    }}
                />
                {/* Pulsing Ring 3 */}
                <div
                    className={cn(
                        "absolute h-[11.25rem] w-[11.25rem]",
                        "rounded-full bg-red-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]",
                        "animate-ping-slow"
                    )}
                    style={{
                        animationDelay: "5s",
                        left: "50%",
                        top: "50%",
                        transform: "translateX(-50%) translateY(-50%)"
                    }}
                />
            </div>
        </div>
    );
};

export default PinContainer;
