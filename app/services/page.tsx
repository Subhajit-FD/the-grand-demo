"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  id: string;
  category: string;
  title: string;
  subheading: string;
  imageSrc: string;
}

const services: ServiceData[] = [
  {
    id: "restaurant",
    category: "/Restaurant",
    title: "The Grand Restaurant",
    subheading: "Experience a world of culinary delights curated by our master chefs. Indulge in local authentic flavors and global signature cuisines in a highly sophisticated, warm dining atmosphere.",
    imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "banquet",
    category: "/Banquet",
    title: "Imperial Banquet Hall",
    subheading: "Host high-profile corporate summits, elegant galas, and luxurious wedding ceremonies in our premium banquet spaces. Equipped with state-of-the-art acoustics and customizable dining menus.",
    imageSrc: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "social-gathering",
    category: "/Gatherings",
    title: "Social Celebration Spaces",
    subheading: "Make every celebration unforgettable. Choose between our beautifully curated open-air lawn decks, private rooftop lounges, and cozy spaces designed for meaningful gatherings.",
    imageSrc: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // 1. Stagger load the header
    gsap.fromTo(
      ".services-header-animate",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );

    // 2. ScrollTrigger reveal for each service card
    servicesRef.current.forEach((section) => {
      if (!section) return;

      const imgContainer = section.querySelector(".service-image-container");
      const img = section.querySelector(".service-image");
      const contentItems = section.querySelectorAll(".service-animate-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        imgContainer,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power4.inOut" }
      );

      tl.fromTo(
        img,
        { scale: 1.15 },
        { scale: 1, duration: 1.1, ease: "power4.inOut" },
        "<"
      );

      tl.fromTo(
        contentItems,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
        "-=0.6"
      );
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-background px-6 py-16 md:py-24 flex flex-col gap-20"
    >
      {/* Title Header */}
      <div className="flex flex-col gap-3 border-b border-foreground/10 pb-8 max-w-2xl">
        <span className="services-header-animate text-[0.75rem] font-medium tracking-widest text-foreground/50 uppercase font-mono">
          Our Facilities
        </span>
        <h1 className="services-header-animate text-4xl md:text-5xl font-sans tracking-tight text-foreground leading-[1.1]">
          Our Hotel Service
        </h1>
        <p className="services-header-animate text-sm text-foreground/70 mt-2">
          Discover five-star comfort and premium amenities curated to elevate your business travel, luxury stays, and special milestones.
        </p>
      </div>

      {/* Services List */}
      <div className="flex flex-col gap-24">
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => {
              servicesRef.current[index] = el;
            }}
            className="grid grid-cols-12 gap-8 lg:gap-16 items-center border-b border-foreground/10 pb-20 last:border-0 last:pb-0"
          >
            {/* Left Column: Image Card */}
            <div className="col-span-12 md:col-span-6 lg:col-span-7">
              <div className="service-image-container relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-white/5">
                <Image
                  src={service.imageSrc}
                  alt={service.title}
                  fill
                  unoptimized
                  priority={index === 0}
                  className="service-image object-cover"
                />
              </div>
            </div>

            {/* Right Column: Service Details */}
            <div className="col-span-12 md:col-span-6 lg:col-span-5 flex flex-col justify-center py-2">
              <div className="flex flex-col gap-4">
                <span className="service-animate-item text-[0.75rem] font-medium tracking-widest text-foreground/50 uppercase font-mono">
                  {service.category}
                </span>

                <h2 className="service-animate-item text-3xl lg:text-4xl font-sans font-normal leading-tight text-foreground">
                  {service.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="font-heading italic">
                    {service.title.split(" ").slice(-1)[0]}
                  </span>
                </h2>

                <p className="service-animate-item text-sm text-foreground/75 leading-relaxed font-sans mt-2">
                  {service.subheading}
                </p>

                {/* View Details Link */}
                <div className="service-animate-item mt-6">
                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-foreground border border-foreground/20 rounded-full px-6 py-3 transition-all duration-300 hover:bg-foreground hover:text-background hover:scale-105 active:scale-95"
                  >
                    <span>View Details</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}