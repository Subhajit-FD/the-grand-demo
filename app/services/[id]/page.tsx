"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { useBooking } from "@/features/Booking/booking-context";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Wine,
  Car,
  WifiHigh,
  Sun,
  MusicNotes,
  Wind,
  Shield,
  SpeakerHigh,
  ForkKnife,
  Lightbulb,
  Microphone,
  Headphones,
  Flame,
  Chair,
  ArrowLeft,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

gsap.registerPlugin(ScrollTrigger);

interface Highlight {
  name: string;
  imageSrc: string;
}

interface Feature {
  name: string;
  icon: any;
}

interface DetailedService {
  id: string;
  category: string;
  title: string;
  description: string;
  serviceType: string;
  capacity: string;
  location: string;
  imageSrc: string;
  highlights: Highlight[];
  features: Feature[];
}

const detailedServices: DetailedService[] = [
  {
    id: "restaurant",
    category: "/Restaurant",
    title: "The Grand Restaurant",
    description: "Experience a world of culinary delights curated by our master chefs. Indulge in local authentic flavors and global signature cuisines in a highly sophisticated, warm dining atmosphere. Perfect for romantic dinners, family celebrations, and business lunches.",
    serviceType: "Fine Dining",
    capacity: "120 Seats",
    location: "Lobby Level",
    imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    highlights: [
      { name: "Exclusive Chef's Table", imageSrc: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=500&auto=format&fit=crop" },
      { name: "Premium Wine Cellar", imageSrc: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=500&auto=format&fit=crop" },
      { name: "Outdoor Garden Patio", imageSrc: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=500&auto=format&fit=crop" },
      { name: "Interactive Live Counter", imageSrc: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=500&auto=format&fit=crop" },
    ],
    features: [
      { name: "Gourmet Curated Dining", icon: ForkKnife },
      { name: "Complimentary Valet", icon: Car },
      { name: "High-speed Guest Wi-Fi", icon: WifiHigh },
      { name: "Open-air Garden Seating", icon: Sun },
      { name: "Fully Stocked Cocktail Bar", icon: Wine },
      { name: "Weekend Live Music", icon: MusicNotes },
      { name: "Whisper-quiet Air Conditioning", icon: Wind },
      { name: "VIP Private Lounges", icon: Shield },
    ],
  },
  {
    id: "banquet",
    category: "/Banquet",
    title: "Imperial Banquet Hall",
    description: "Host high-profile corporate summits, elegant galas, and luxurious wedding ceremonies in our premium banquet spaces. Equipped with state-of-the-art acoustics, custom floral decor setups, and fully customizable dining menus.",
    serviceType: "Event Space",
    capacity: "500+ Guests",
    location: "First Floor",
    imageSrc: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
    highlights: [
      { name: "Grand Stage & Backdrop", imageSrc: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=500&auto=format&fit=crop" },
      { name: "Bespoke Buffet Lounge", imageSrc: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500&auto=format&fit=crop" },
      { name: "Private Green Rooms", imageSrc: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=500&auto=format&fit=crop" },
      { name: "VIP Guest Drop-off", imageSrc: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop" },
    ],
    features: [
      { name: "PA Line Array Audio System", icon: SpeakerHigh },
      { name: "Multicuisine Catering", icon: ForkKnife },
      { name: "Custom Ambient Lighting", icon: Lightbulb },
      { name: "Automated Climate Control", icon: Wind },
      { name: "Valet Parking Service", icon: Car },
      { name: "Wireless Mics & Podium", icon: Microphone },
      { name: "High-speed Event Wi-Fi", icon: WifiHigh },
      { name: "Dedicated Event Coordinator", icon: Headphones },
    ],
  },
  {
    id: "social-gathering",
    category: "/Gatherings",
    title: "Social Celebration Spaces",
    description: "Make every celebration unforgettable. Choose between our beautifully curated open-air lawn decks, private rooftop lounges, and cozy spaces designed for meaningful social gatherings, anniversaries, and cocktail nights.",
    serviceType: "Leisure Deck",
    capacity: "250 Guests",
    location: "Rooftop Level",
    imageSrc: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
    highlights: [
      { name: "Rooftop Pool Deck", imageSrc: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500&auto=format&fit=crop" },
      { name: "Ambient Cocktail Bar", imageSrc: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=500&auto=format&fit=crop" },
      { name: "Lawn Garden Seating", imageSrc: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=500&auto=format&fit=crop" },
      { name: "Cozy Bonfire Lounge", imageSrc: "https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=500&auto=format&fit=crop" },
    ],
    features: [
      { name: "Open-air Sky Deck", icon: Sun },
      { name: "Live BBQ & Grill Station", icon: Flame },
      { name: "Mixologist Cocktail Bar", icon: Wine },
      { name: "Bluetooth Ambient Sound", icon: SpeakerHigh },
      { name: "Lounge Daybeds", icon: Chair },
      { name: "Bistro Fairy Lights", icon: Lightbulb },
      { name: "Valet Parking Service", icon: Car },
      { name: "High-speed Guest Wi-Fi", icon: WifiHigh },
    ],
  },
];

export default function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const { openBooking } = useBooking();

  // Look up active service
  const activeIndex = detailedServices.findIndex((s) => s.id === id);
  const activeService = detailedServices[activeIndex !== -1 ? activeIndex : 0];

  // Pagination navigation ids
  const prevIndex = (activeIndex - 1 + detailedServices.length) % detailedServices.length;
  const nextIndex = (activeIndex + 1) % detailedServices.length;
  const prevService = detailedServices[prevIndex];
  const nextService = detailedServices[nextIndex];

  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const highlightsContainerRef = useRef<HTMLDivElement | null>(null);
  const featuresContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!mainContainerRef.current) return;

    // 1. Entrance animation for layout elements
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      ".detail-img-container",
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power4.inOut" }
    );

    tl.fromTo(
      ".detail-img",
      { scale: 1.15 },
      { scale: 1, duration: 1.1, ease: "power4.inOut" },
      "<"
    );

    tl.fromTo(
      ".detail-animate-item",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
      "-=0.6"
    );

    // 2. Highlights reveal on scroll
    if (highlightsContainerRef.current) {
      gsap.fromTo(
        highlightsContainerRef.current.querySelectorAll(".highlight-card"),
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: highlightsContainerRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // 3. Features grid reveal on scroll
    if (featuresContainerRef.current) {
      gsap.fromTo(
        featuresContainerRef.current.querySelectorAll(".feature-card"),
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresContainerRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, [id]);

  return (
    <div
      ref={mainContainerRef}
      className="w-full min-h-screen bg-background px-6 py-16 md:py-24 flex flex-col gap-24"
    >
      {/* Top Section: Service Main Layout (Image Left, Info Right) */}
      <div className="flex flex-col md:grid md:grid-cols-12 gap-8 lg:gap-16 items-center border-b border-foreground/10 pb-20">
        {/* Left Column: Image */}
        <div className="w-full col-span-12 md:col-span-6 lg:col-span-7">
          <div className="detail-img-container relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-white/5">
            <Image
              src={activeService.imageSrc}
              alt={activeService.title}
              fill
              unoptimized
              className="detail-img object-cover"
            />
          </div>
        </div>

        {/* Right Column: Service Details */}
        <div className="w-full col-span-12 md:col-span-6 lg:col-span-5 flex flex-col justify-between self-stretch py-2">
          <div className="flex flex-col gap-4">
            <span className="detail-animate-item text-[0.75rem] font-medium tracking-widest text-foreground/50 uppercase font-mono">
              {activeService.category}
            </span>

            <h2 className="detail-animate-item text-3xl lg:text-4xl font-sans font-normal leading-tight text-foreground">
              {activeService.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="font-heading italic">
                {activeService.title.split(" ").slice(-1)[0]}
              </span>
            </h2>

            <p className="detail-animate-item text-sm text-foreground/75 leading-relaxed font-sans mt-2">
              {activeService.description}
            </p>
            
            {/* Book Service Button */}
            <div className="detail-animate-item mt-6">
              <button
                onClick={() => openBooking(activeService.id as any)}
                className="inline-flex items-center justify-center text-xs uppercase font-mono tracking-widest bg-foreground text-background rounded-full px-8 py-3.5 transition-all duration-300 hover:bg-foreground/80 hover:scale-105 active:scale-95 cursor-pointer font-medium"
              >
                {activeService.id === "restaurant" ? "Reserve a Table" : activeService.id === "banquet" ? "Book Banquet Hall" : "Reserve Event Venue"}
              </button>
            </div>
          </div>

          <div className="flex flex-col mt-12 gap-6">
            {/* Service Specifications */}
            <div className="detail-animate-item pt-6 border-t border-foreground/15 grid grid-cols-3 gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-foreground/45 uppercase tracking-wider text-[0.65rem]">
                  Service Type
                </span>
                <span className="font-sans font-medium text-foreground text-sm">
                  {activeService.serviceType}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-foreground/45 uppercase tracking-wider text-[0.65rem]">
                  Capacity
                </span>
                <span className="font-sans font-medium text-foreground text-sm">
                  {activeService.capacity}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-foreground/45 uppercase tracking-wider text-[0.65rem]">
                  Location
                </span>
                <span className="font-sans font-medium text-foreground text-sm">
                  {activeService.location}
                </span>
              </div>
            </div>

            {/* Bottom Pagination Links */}
            <div className="detail-animate-item flex justify-between items-center text-xs tracking-widest uppercase font-mono mt-4 pt-4 border-t border-foreground/15">
              <Link
                href={`/services/${prevService.id}`}
                className="group flex items-center gap-2 hover:text-brand transition-colors"
              >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                <span>Prev</span>
              </Link>
              <div className="h-px bg-foreground/15 flex-1 mx-6" />
              <Link
                href={`/services/${nextService.id}`}
                className="group flex items-center gap-2 hover:text-brand transition-colors"
              >
                <span>Next</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Highlights of the Service */}
      <div ref={highlightsContainerRef} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-[0.75rem] font-medium tracking-widest text-foreground/50 uppercase font-mono">
            Features & Areas
          </span>
          <h3 className="text-2xl md:text-3xl font-sans tracking-tight text-foreground">
            Highlights of The Service
          </h3>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
          {activeService.highlights.map((highlight, index) => (
            <div
              key={index}
              className="highlight-card snap-start flex-shrink-0 w-[240px] sm:w-[280px] flex flex-col gap-3"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-white/5">
                <Image
                  src={highlight.imageSrc}
                  alt={highlight.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
              <span className="text-xs uppercase font-mono tracking-widest text-foreground/80 mt-1 pl-1">
                {highlight.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: All Features & Comforts */}
      <div ref={featuresContainerRef} className="flex flex-col gap-8 pt-10 border-t border-foreground/10">
        <div className="flex flex-col gap-2">
          <span className="text-[0.75rem] font-medium tracking-widest text-foreground/50 uppercase font-mono">
            Included Conveniences
          </span>
          <h3 className="text-2xl md:text-3xl font-sans tracking-tight text-foreground">
            Service Amenities & Features
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {activeService.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-card flex items-center gap-4 p-5 rounded-sm border border-foreground/10 bg-white/5 shadow-xs"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 text-brand shrink-0">
                  <Icon size={20} weight="regular" />
                </div>
                <span className="text-sm font-sans font-medium text-foreground/80">
                  {feature.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
