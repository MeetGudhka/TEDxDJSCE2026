import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "@/assets/tedx-hero.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const lightRaysRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, taglineRef.current], {
        opacity: 0,
        y: 80,
      });
      gsap.set(lightRaysRef.current, { opacity: 0, scale: 1.5 });

      // Hero entrance timeline with dramatic effects
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(overlayRef.current, {
        opacity: 0.85,
        duration: 2,
        ease: "power2.out",
      })
        .to(
          lightRaysRef.current,
          {
            opacity: 0.6,
            scale: 1,
            duration: 2.5,
            ease: "power2.out",
          },
          "-=1.8"
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power4.out",
          },
          "-=1.5"
        )
        .to(
          taglineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.4"
        );

      // Subtle floating animation for title (reduced movement to prevent clipping)
      gsap.to(titleRef.current, {
        y: -6,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.5,
      });

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Fade out hero content on scroll
      // NOTE: use fromTo so the "top" state is always visible even after scrolling down & back up.
      gsap.fromTo(
        [titleRef.current, taglineRef.current],
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -30,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "20% top",
            end: "50% top",
            scrub: 1,
          },
        }
      );

      // Scale overlay intensity on scroll
      gsap.to(overlayRef.current, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Animate light rays continuously
      gsap.to(lightRaysRef.current, {
        rotate: 3,
        scale: 1.05,
        duration: 8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Create floating particles animation
      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((particle, i) => {
          gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          });

          gsap.to(particle, {
            y: "-=100",
            x: `+=${Math.random() * 100 - 50}`,
            opacity: Math.random() * 0.5 + 0.2,
            duration: Math.random() * 10 + 10,
            ease: "none",
            repeat: -1,
            delay: Math.random() * 5,
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src={heroImage}
          alt="TEDx Stage with speaker facing audience"
          className="h-[120%] w-full object-cover object-center"
        />

        {/* Multi-layer overlays for depth */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background opacity-0"
        />

        {/* Animated light rays overlay */}
        <div
          ref={lightRaysRef}
          className="absolute inset-0 opacity-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, hsl(0 100% 50% / 0.2) 0%, transparent 50%), radial-gradient(ellipse at 30% 20%, hsl(0 100% 60% / 0.15) 0%, transparent 40%), radial-gradient(ellipse at 70% 20%, hsl(0 100% 60% / 0.15) 0%, transparent 40%)",
          }}
        />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(0_0%_0%/0.6)_100%)]" />
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{ filter: "blur(1px)" }}
          />
        ))}
      </div>

      {/* Content - positioned at top */}
      <div className="relative z-10 flex h-full flex-col items-center justify-start pt-24 sm:pt-28 md:pt-32 lg:pt-36 px-6 text-center">
        {/* Main heading with split text effect */}
        <div className="py-4">
          <h1
            ref={titleRef}
            className="mb-4 text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
            style={{ perspective: "1000px" }}
          >
            <span className="inline-block">
              <span className="text-red-600">TEDx</span><span className="text-white">DJSCE</span>
            </span>
          </h1>
        </div>

        {/* Animated tagline with typewriter-like reveal */}
        <div className="overflow-hidden">
          <p
            ref={taglineRef}
            className="max-w-2xl text-lg font-light tracking-wide text-white/90 sm:text-xl md:text-2xl lg:text-3xl"
          >
            <span className="inline-block">Where ideas take the stage Stories ignite change</span>
          </p>
        </div>

        {/* Animated accent line */}
        <div className="mt-6 h-[2px] w-32 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0"
        style={{ transform: "translateX(-50%) translateY(20px)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-white/70 animate-pulse">
            {/* Scroll to explore */}
          </span>
          <div className="relative h-16 w-[1px] overflow-hidden">
            <div className="absolute h-full w-full bg-gradient-to-b from-primary via-primary to-transparent animate-scroll-line" />
          </div>
        </div>
      </div>

      {/* Bottom fade with curved edge */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-primary/20 opacity-50" />
      <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-primary/20 opacity-50" />
    </section>
  );
};

export default HeroSection;
