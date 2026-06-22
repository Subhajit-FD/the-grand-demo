"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Playball } from "next/font/google";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/core/container";

// Cursive script font for the signatures
const playball = Playball({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

gsap.registerPlugin(ScrollTrigger);

interface TestimonialData {
  id: number;
  avatarSrc: string;
  quote: string;
  name: string;
  role: string;
  isVideo?: boolean;
  videoCoverSrc?: string;
}

const testimonials: TestimonialData[] = [
  {
    id: 1,
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    quote: '"The lovely team at The Grand provided our retreat with significant comfort. Their service is exceptionally professional, and they are always attentive to our needs, taking the time to make us feel at home. Additionally, their attention to detail is impressingly fast!"',
    name: "Patrick Nawrocki",
    role: "UX Manager at Superhabits",
  },
  {
    id: 2,
    avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    quote: "",
    name: "Piri Patel",
    role: "Product Designer at Lightdash",
    isVideo: true,
    videoCoverSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    quote: '"The Grand has greatly exceeded our expectations. The communication is always excellent, the service is extremely quick, and the dining experiences are fresh, innovative, and spot on!"',
    name: "Rob West",
    role: "CEO of Kingdom Advisors",
  },
  {
    id: 4,
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    quote: '"An absolute masterpiece of hospitality. The attention to detail in the suites, the premium spa treatments, and the rooftop pool made it the best stay we\'ve ever experienced. We will be back!"',
    name: "Dominic Tyler",
    role: "Founder of Kinetix",
  },
];

export default function Testimonial() {
  const containerRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!cardsContainerRef.current) return;
    const container = cardsContainerRef.current;
    const cardWidth = container.firstElementChild?.clientWidth || 360;
    const gap = 24; // gap-6 matches 24px
    const scrollAmount = cardWidth + gap;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // 1. Header fade & slide up
    if (headerRef.current) {
      timeline.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      );
    }

    // 2. Cards stagger entrance
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.children;
      timeline.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power4.out",
        },
        "-=0.4"
      );
    }
  }, []);

  return (
    <Container
      ref={containerRef}
      className="w-full py-16 md:py-24 flex flex-col gap-12 overflow-hidden"
    >
      {/* Header section with Arrow navigation */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 w-full">
        <div ref={headerRef} className="flex flex-col gap-3">
          <span className="text-[0.75rem] font-medium tracking-widest text-foreground/50 uppercase font-mono">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-sans font-normal leading-[1.15] tracking-tight text-foreground">
            Don&apos;t take our word for it!<br />
            Hear it from our guests.
          </h2>
        </div>

        {/* Scroll Buttons */}
        <div className="flex items-center gap-3 pr-2 shrink-0">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:scale-105 active:scale-95"
          >
            <ArrowLeft size={18} weight="bold" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:scale-105 active:scale-95"
          >
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>
      </div>

      {/* Testimonials horizontal scrolling cards container */}
      <div
        ref={cardsContainerRef}
        className="flex gap-6 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {testimonials.map((item) => {
          if (item.isVideo) {
            return (
              <div
                key={item.id}
                className="testimonial-card snap-start relative flex-shrink-0 w-full max-w-[360px] sm:w-[360px] h-[440px] rounded-sm overflow-hidden group select-none shadow-xs"
              >
                {/* Background Image Cover */}
                <Image
                  src={item.videoCoverSrc || ""}
                  alt={item.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

                {/* Top Corner Avatar */}
                <div className="absolute top-6 left-6 w-11 h-11 rounded-full overflow-hidden border border-white/20 z-10">
                  <Image
                    src={item.avatarSrc}
                    alt={item.name}
                    width={44}
                    height={44}
                    unoptimized
                    className="object-cover"
                  />
                </div>

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button
                    aria-label="Play video testimonial"
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white transition-transform duration-300 group-hover:scale-110 hover:bg-white/30 active:scale-95"
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current translate-x-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>

                {/* Bottom Signature and Details */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1 z-10 text-white">
                  <span className={`${playball.className} text-3xl font-normal tracking-wide`}>
                    {item.name}
                  </span>
                  <span className="text-[0.7rem] tracking-wider uppercase text-white/60 font-mono">
                    {item.role}
                  </span>
                </div>
              </div>
            );
          }

          // Text-based Testimonial Card
          return (
            <div
              key={item.id}
              className="testimonial-card snap-start flex-shrink-0 w-full max-w-[360px] sm:w-[360px] h-[440px] bg-white rounded-sm p-8 flex flex-col justify-between select-none shadow-xs border border-foreground/5"
            >
              {/* Top Avatar */}
              <div className="w-11 h-11 rounded-full overflow-hidden border border-foreground/10">
                <Image
                  src={item.avatarSrc}
                  alt={item.name}
                  width={44}
                  height={44}
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* Quote Content */}
              <p className="text-[0.925rem] leading-[1.6] text-foreground/80 font-sans font-light italic mt-6 flex-grow overflow-y-auto scrollbar-none pr-1">
                {item.quote}
              </p>

              {/* Bottom Signature and Details */}
              <div className="mt-6 flex flex-col gap-1 shrink-0">
                <span className={`${playball.className} text-3xl font-normal tracking-wide text-foreground`}>
                  {item.name}
                </span>
                <span className="text-[0.7rem] tracking-wider uppercase text-foreground/40 font-mono">
                  {item.role}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}