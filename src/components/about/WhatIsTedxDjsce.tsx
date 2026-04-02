import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Users, Sparkles, Heart, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Fostering breakthrough ideas that challenge conventional thinking and inspire technological advancement.",
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building bridges between diverse minds, creating a platform for meaningful discourse and collaboration.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Sparkles,
    title: "Inspiration",
    description:
      "Curating powerful narratives that motivate action and ignite the spark of positive change.",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Heart,
    title: "Impact",
    description:
      "Transforming ideas into movements that resonate beyond the stage and into our communities.",
    color: "from-primary/20 to-rose-500/20",
  },
];

const WhatIsTedxDjsce = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal with clip-path
      gsap.fromTo(
        sectionRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        }
      );

      // Heading with split animation
      const headingChars = headingRef.current?.querySelectorAll(".animate-char");
      if (headingChars) {
        gsap.fromTo(
          headingChars,
          { opacity: 0, y: 100, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.05,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Description with mask reveal
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards with 3D flip-in animation
      const cards = cardsRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              rotateY: -90,
              transformOrigin: "left center",
            },
            {
              opacity: 1,
              rotateY: 0,
              duration: 1,
              ease: "power3.out",
              delay: index * 0.15,
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      // Parallax effect for background elements
      gsap.to(".parallax-orb-1", {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(".parallax-orb-2", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 3,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (index: number | null, card: HTMLDivElement | null) => {
    setActiveCard(index);
    if (card && index !== null) {
      gsap.to(card, {
        scale: 1.05,
        rotateY: 5,
        rotateX: -5,
        duration: 0.4,
        ease: "power2.out",
      });
    } else if (card) {
      gsap.to(card, {
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-background py-32 md:py-40 overflow-hidden"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="parallax-orb-1 absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/[0.05] blur-[120px]" />
        <div className="parallax-orb-2 absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/[0.03] blur-[100px]" />
      </div>

      {/* Animated line decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary to-transparent opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header with animated characters */}
        <div ref={headingRef} className="mb-24 text-center" style={{ perspective: "1000px" }}>
          <span className="mb-6 inline-block text-sm font-semibold uppercase tracking-[0.4em] text-primary opacity-80">
            <span className="text-red-500 font-bold">Our Chapter</span>
          </span>

          <h2 className="mb-8 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl overflow-hidden">
            <span className="inline-block">
              {"What is ".split("").map((char, i) => (
                <span key={i} className="animate-char inline-block" style={{ transformStyle: "preserve-3d" }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="text-red-600 inline-block">
              {"TEDx".split("").map((char, i) => (
                <span key={i} className="animate-char inline-block" style={{ transformStyle: "preserve-3d" }}>
                  {char}
                </span>
              ))}
            </span>
            <span className="text-white inline-block">
              {"DJSCE".split("").map((char, i) => (
                <span key={i} className="animate-char inline-block" style={{ transformStyle: "preserve-3d" }}>
                  {char}
                </span>
              ))}
            </span>
            <span className="text-primary animate-char inline-block">?</span>
          </h2>

          {/* Decorative divider (below heading) */}
          <div className="mx-auto h-1 w-40 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        {/* Description with highlight */}
        <div
          ref={descriptionRef}
          className="mx-auto mb-24 max-w-4xl text-center"
        >
          <p className="text-xl leading-relaxed text-white/80 md:text-2xl">
            Rooted in the vibrant campus of{" "}
            <span className="relative inline-block font-semibold text-white">
              Dwarkadas J. Sanghvi College of Engineering
            </span>
            , TEDxDJSCE is a student-driven initiative that celebrates the power
            of ideas. We curate transformative talks, foster intellectual
            curiosity, and create a platform where{" "}
            <span className="text-red-500 font-bold">innovation meets inspiration</span>.
          </p>
        </div>

        {/* Pillars Grid with 3D perspective */}
        <div
          ref={cardsRef}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: "1500px" }}
        >
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="group relative cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              onMouseEnter={(e) => handleCardHover(index, e.currentTarget as HTMLDivElement)}
              onMouseLeave={(e) => handleCardHover(null, e.currentTarget as HTMLDivElement)}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

              <div className="relative tedx-card h-full p-8 rounded-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/30">
                {/* Animated background on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-card to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon with glow effect */}
                <div className="relative mb-6 inline-flex rounded-2xl bg-primary/10 p-5 transition-all duration-500 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/30">
                  <pillar.icon className="h-8 w-8 text-red-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />

                  {/* Icon glow */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <h3 className="relative mb-4 text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="relative text-sm leading-relaxed text-white/70 group-hover:text-white transition-colors duration-300">
                  {pillar.description}
                </p>

                {/* Arrow indicator */}
                <div className="relative mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </div>

                {/* Animated bottom border */}
                <div className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-gradient-to-r from-primary to-primary/50 transition-all duration-500 group-hover:w-full" />

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/40 transition-colors duration-500 rounded-tr-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline with animation */}
        <div className="mt-24 text-center">
          <div className="tedx-divider mb-10" />
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/70">
            <span className="inline-block mx-3 text-primary animate-pulse">✦</span>
            Igniting Ideas
            <span className="inline-block mx-3 text-primary">•</span>
            Inspiring Action
            <span className="inline-block mx-3 text-primary">•</span>
            Creating Impact
            <span className="inline-block mx-3 text-primary animate-pulse">✦</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatIsTedxDjsce;
