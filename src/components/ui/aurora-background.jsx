import React from "react";

// Utility for class merging
const cn = (...classes) => classes.filter(Boolean).join(" ");

export const AuroraBackground = ({
    className,
    children,
    showRadialGradient = true,
    ...props
}) => {
    return (
        <div
            className={cn(
                "relative flex flex-col h-screen items-center justify-center bg-black text-slate-950 transition-bg",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className={cn(
                        // The Aurora Effect Layers
                        // Base layer with red-heavy gradients
                        // Replaced var(--white) with #ffffff, var(--black) with #000000, var(--transparent) with transparent
                        `
            [--white-gradient:repeating-linear-gradient(100deg,#ffffff_0%,#ffffff_7%,transparent_10%,transparent_12%,#ffffff_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,#000000_0%,#000000_7%,transparent_10%,transparent_12%,#000000_16%)]
            [--aurora:repeating-linear-gradient(100deg,#991b1b_10%,#7f1d1d_15%,#450a0a_20%,#ef4444_25%,#991b1b_30%)]
            [background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[40px]
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)] 
            after:[background-size:200%,_100%] 
            after:[animation:aurora_70s_linear_infinite] after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[15px] opacity-40 will-change-transform`,
                        showRadialGradient &&
                        `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
                    )}
                ></div>
            </div>
            {children}
        </div>
    );
};


