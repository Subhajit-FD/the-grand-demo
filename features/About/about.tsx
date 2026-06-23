"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/core/container";

gsap.registerPlugin(SplitText);

interface SlideData {
  number: string;
  sectionTitle: string;
  sectionTitleItalic: string;
  headingText: string;
  subheadingText: string;
  italicizedWords: string[];
  description: string;
  imageSrc: string;
  projectName: string;
  projectYear: string;
  badgeText: string;
}

const slides: SlideData[] = [
  {
    number: "(01)",
    sectionTitle: "ABOUT",
    sectionTitleItalic: "US",
    headingText: "The finest luxury retreat in Asansol.",
    subheadingText: "Combining modern elegance with warm, unmatched hospitality.",
    italicizedWords: ["luxury retreat", "unmatched hospitality."],
    description: "As the premier boutique hotel in Asansol, we offer sophisticated suites, fine dining, and bespoke spaces designed to be your absolute sanctuary away from home.",
    imageSrc: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600&auto=format&fit=crop",
    projectName: "The Grand Suite",
    projectYear: "©2026",
    badgeText: "BEST HOTEL IN ASANSOL • PREMIER LUXURY 2026 •",
  },
  {
    number: "(02)",
    sectionTitle: "OUR",
    sectionTitleItalic: "VISION",
    headingText: "Crafting customer-centric experiences.",
    subheadingText: "Our dedication is to place your comfort and desires at the center of everything.",
    italicizedWords: ["customer-centric", "your comfort"],
    description: "We envision a stay where every detail is tailored to your preferences. From arrival to departure, our intuitive hospitality ensures an unforgettable personalized experience.",
    imageSrc: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
    projectName: "Lobby Lounge",
    projectYear: "©2026",
    badgeText: "CUSTOMER FIRST AWARD • CUSTOMER CENTRICITY •",
  },
  {
    number: "(03)",
    sectionTitle: "OUR",
    sectionTitleItalic: "SERVICES",
    headingText: "Bespoke services, curated for you.",
    subheadingText: "Indulge in fine dining, wellness spas, and curated local tours.",
    italicizedWords: ["Bespoke services,", "curated for you."],
    description: "We provide complete 24/7 butler service, an award-winning gourmet kitchen, rooftop pool lounges, and fully equipped private meeting rooms to meet every need.",
    imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600&auto=format&fit=crop",
    projectName: "Wellness Pool",
    projectYear: "©2026",
    badgeText: "EXCEPTIONAL SERVICE • 5 STAR HOSPITALITY •",
  },
];

export default function About() {
  const [current, setCurrent] = useState(0);

  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subheadingRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLDivElement | null>(null);
  const badgeContainerRef = useRef<HTMLDivElement | null>(null);
  const badgeSvgRef = useRef<SVGSVGElement | null>(null);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLDivElement | null>(null);
  const titleNumberRef = useRef<HTMLSpanElement | null>(null);
  const titleTextRef = useRef<HTMLSpanElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const currentSlide = slides[current];

  // Infinite Rotation of the Circular Badge
  useGSAP(() => {
    if (!badgeSvgRef.current) return;
    gsap.to(badgeSvgRef.current, {
      rotation: 360,
      duration: 18,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  // Slide transitions using GSAP and SplitText
  useGSAP(() => {
    if (tlRef.current) {
      tlRef.current.kill();
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tlRef.current = tl;

    // 1. Split heading and subheading texts
    const splitHeading = new SplitText(headingRef.current, { type: "words,chars" });
    const splitSubheading = new SplitText(subheadingRef.current, { type: "words,chars" });

    // Reset components to animate state and prevent FOUC / layout shift
    gsap.set([headingRef.current, subheadingRef.current], { opacity: 1 });

    // Helper to italicize specific words after splitting
    const italicizeWords = (splitInstance: SplitText, wordsToItalicize: string[]) => {
      splitInstance.words.forEach((wordEl) => {
        const text = (wordEl.textContent || "").trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
        const matches = wordsToItalicize.some((w) =>
          w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").includes(text)
        );
        if (matches) {
          wordEl.classList.add("font-heading", "italic");
        }
      });
    };

    italicizeWords(splitHeading, currentSlide.italicizedWords);
    italicizeWords(splitSubheading, currentSlide.italicizedWords);

    // 2. Animate elements in sequence
    // Section Number & title fade
    tl.fromTo(
      [titleNumberRef.current, titleTextRef.current],
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    );

    // Heading reveal character-by-character
    tl.fromTo(
      splitHeading.chars,
      { yPercent: 60, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.01 },
      "-=0.4"
    );

    // Subheading reveal character-by-character
    tl.fromTo(
      splitSubheading.chars,
      { yPercent: 60, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.008 },
      "-=0.4"
    );

    // Image reveal (Slide up & scale)
    tl.fromTo(
      imgContainerRef.current,
      { clipPath: "inset(100% 0 0 0)", scale: 1.1 },
      { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 0.9, ease: "power3.inOut" },
      "-=0.6"
    );

    // Caption fade & slide up
    tl.fromTo(
      captionRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      "-=0.4"
    );

    // Description text fade & slide right
    tl.fromTo(
      descRef.current,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7 },
      "-=0.5"
    );

    // Badge scale and fade
    tl.fromTo(
      badgeContainerRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" },
      "-=0.6"
    );

    return () => {
      splitHeading.revert();
      splitSubheading.revert();
    };
  }, [current]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <Container className="relative flex min-h-[90vh] w-full flex-col justify-between py-12">
      {/* Upper Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Section Title (Top Left) */}
        <div className="col-span-12 md:col-span-3 flex items-start pt-2">
          <div className="flex items-center gap-1.5 text-[0.8rem] font-medium tracking-widest text-foreground/70 uppercase">
            <span ref={titleNumberRef} className="font-mono text-[0.7rem]">{currentSlide.number}</span>
            <span ref={titleTextRef} className="flex gap-1">
              {currentSlide.sectionTitle}
              <span className="font-heading italic font-normal lowercase">{currentSlide.sectionTitleItalic}</span>
            </span>
          </div>
        </div>

        {/* Big Main Heading & Subheading (Top Middle/Right) */}
        <div key={current} className="col-span-12 md:col-span-9 flex flex-col gap-1 max-w-[800px]">
          <h2
            ref={headingRef}
            className="opacity-0 text-3xl sm:text-4xl md:text-[3rem] font-sans font-normal leading-[1.15] tracking-tight text-foreground"
          >
            {currentSlide.headingText}
          </h2>
          <h2
            ref={subheadingRef}
            className="opacity-0 text-3xl sm:text-4xl md:text-[3rem] font-sans font-normal leading-[1.15] tracking-tight text-foreground"
          >
            {currentSlide.subheadingText}
          </h2>
        </div>
      </div>

      {/* Middle & Lower Elements Grid Layout */}
      <div className="mt-12 grid grid-cols-12 items-end gap-6">
        {/* Left column: Rotating Badge and Left Arrow */}
        <div className="col-span-6 md:col-span-3 flex flex-col justify-between gap-12 self-stretch min-h-[220px] order-1 md:order-none">
          {/* Circular badge container */}
          <div ref={badgeContainerRef} className="flex justify-start">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <svg
                ref={badgeSvgRef}
                viewBox="0 0 100 100"
                className="h-full w-full text-foreground/80"
              >
                <path
                  id={`badge-path-${current}`}
                  d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="none"
                />
                <text className="font-mono text-[7px] uppercase tracking-[1.5px]" fill="currentColor">
                  <textPath href={`#badge-path-${current}`}>
                    {currentSlide.badgeText}
                  </textPath>
                </text>
              </svg>
              {/* Emblem icon in the center of the badge */}
              <div className="absolute inset-0 flex items-center justify-center text-foreground/80">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Left Navigation Arrow */}
          <div className="flex justify-start">
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* Middle column: Wireframe circle decoration + Description Text */}
        <div className="col-span-12 md:col-span-6 flex items-center justify-center self-stretch order-3 md:order-none">
          <div ref={descRef} className="relative flex flex-col items-start sm:flex-row sm:items-center gap-4 sm:gap-6 pl-10 md:pl-16">
            {/* Outline Circle wireframe */}
            <div className="absolute -left-3 md:-left-12 top-1/2 h-28 w-28 md:h-44 md:w-44 -translate-y-1/2 rounded-full border border-foreground/10 pointer-events-none" />
            
            {/* Horizontal connection line */}
            <div className="hidden sm:block h-px w-16 bg-foreground/20 shrink-0" />

            {/* Description Text */}
            <p className="max-w-[340px] text-sm leading-[1.6] text-foreground/75 font-sans">
              {currentSlide.description}
            </p>

            {/* Three stars decorator */}
            <div className="flex tracking-[0.3em] text-foreground/40 text-lg font-light select-none font-mono">
              ***
            </div>
          </div>
        </div>

        {/* Right column: Right Arrow, Image Container and Caption */}
        <div className="col-span-6 md:col-span-3 flex flex-col items-end gap-3 self-stretch justify-between order-2 md:order-none">
          {/* Right Navigation Arrow */}
          <div className="flex justify-end pr-2">
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:scale-105 active:scale-95"
            >
              <ArrowRight size={18} weight="bold" />
            </button>
          </div>

          {/* Image and Caption Container */}
          <div className="w-full max-w-[280px]">
            <div
              ref={imgContainerRef}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-sm"
              style={{ clipPath: "inset(0% 0 0 0)" }}
            >
              <Image
                src={currentSlide.imageSrc}
                alt={currentSlide.projectName}
                fill
                unoptimized
                sizes="(max-w-768px) 100vw, 300px"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                priority
              />
            </div>
            
            {/* Caption (Project details) */}
            <div
              ref={captionRef}
              className="mt-3 flex items-center justify-between text-xs tracking-wider"
            >
              <span className="font-heading italic font-normal text-foreground">
                {currentSlide.projectName}
              </span>
              <span className="font-mono text-foreground/60">
                {currentSlide.projectYear}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}