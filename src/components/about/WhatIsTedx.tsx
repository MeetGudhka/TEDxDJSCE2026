import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatIsTedx = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background movement
      gsap.to(parallaxBgRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      // Label reveal with clip-path
      gsap.fromTo(
        labelRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Heading split-text animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, x: -100, rotateY: -15 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Accent line draw animation
      gsap.fromTo(
        accentRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Content paragraphs with staggered 3D reveal
      const paragraphs = contentRef.current?.querySelectorAll("p");
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 60, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Quote card with scale and fade
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover effect for quote card
      if (quoteRef.current) {
        quoteRef.current.addEventListener("mouseenter", () => {
          gsap.to(quoteRef.current, {
            scale: 1.02,
            boxShadow: "0 25px 50px -12px hsl(0 100% 50% / 0.15)",
            duration: 0.4,
            ease: "power2.out",
          });
        });
        quoteRef.current.addEventListener("mouseleave", () => {
          gsap.to(quoteRef.current, {
            scale: 1,
            boxShadow: "0 4px 24px hsl(0 0% 0% / 0.4)",
            duration: 0.4,
            ease: "power2.out",
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-background py-32 md:py-40 overflow-hidden"
    >
      {/* Animated background elements */}
      <div ref={parallaxBgRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-[80px]" />
      </div>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="h-full w-full" style={{
          backgroundImage: "linear-gradient(hsl(0 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 100% 50%) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Left Column - Heading */}
          <div className="flex flex-col justify-center" style={{ perspective: "1000px" }}>
            <div className="space-y-8">
              <div className="space-y-6">
                <span
                  ref={labelRef}
                  className="inline-block text-sm font-semibold uppercase tracking-[0.4em] text-primary"
                > <span className="text-red-500 font-bold">
                    The Movement
                  </span></span>
                <h2
                  ref={headingRef}
                  className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  What is{" "}
                  <span className="text-red-600 block mt-2">TEDx</span>
                  <span className="text-white text-5xl md:text-6xl lg:text-7xl"> <span className="text-red-500 font-bold">?</span></span>
                </h2>
                <div
                  ref={accentRef}
                  className="h-1.5 w-32 origin-left rounded-full bg-gradient-to-r from-primary via-primary to-primary/20"
                />
              </div>

              {/* Stats or highlights */}
              <div className="flex gap-8 pt-4">
                <div className="text-center">
                  <span className="block text-3xl font-bold text-primary"> <span className="text-red-500 font-bold">3000+</span></span>
                  <span className="text-xs uppercase tracking-wider text-white/70">Events Worldwide</span>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <span className="block text-3xl font-bold text-primary"> <span className="text-red-500 font-bold">170+</span></span>
                  <span className="text-xs uppercase tracking-wider text-white/70">Countries</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div
            ref={contentRef}
            className="flex flex-col justify-center space-y-8"
            style={{ perspective: "1000px" }}
          >
            <p className="text-lg leading-relaxed text-white/80 md:text-xl lg:text-2xl">
              In the spirit of{" "}
              <span className="font-bold text-red-500 bg-white/5 px-2 py-1 rounded">
                ideas worth spreading
              </span>
              , TEDx is a program of local, self-organized events that bring
              people together to share a TED-like experience.
            </p>

            <p className="text-lg leading-relaxed text-white/80 md:text-xl">
              At a TEDx event, TED Talks video and live speakers combine to
              spark deep discussion and connection. These local, self-organized
              events are branded TEDx, where{" "}
              <span className="text-red-500 font-bold">x = independently organized</span>{" "}
              TED event.
            </p>

            <div
              ref={quoteRef}
              className="relative tedx-card p-8 transition-all duration-500 cursor-pointer group overflow-hidden"
            >
              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Quote mark */}
              <span className="absolute top-4 left-4 text-6xl text-primary/20 font-serif leading-none">"</span>

              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Quote mark */}
              <span className="text-white/80 font-bold">
                <span className="absolute top-4 left-4 text-6xl text-primary/20 font-serif leading-none">"</span></span>

              <p className="relative text-base italic text-muted-foreground md:text-lg pl-8">
                <span className="text-white/80 font-bold">
                  The TED Conference provides general guidance for the TEDx
                  program, but individual TEDx events are self-organized, subject
                  to certain rules and regulations.
                </span>
              </p>



              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            <div className="flex items-center gap-6 pt-6">
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 via-border to-transparent" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-600 animate-pulse">
                Ideas Worth Spreading
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-primary/50 via-border to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsTedx;
