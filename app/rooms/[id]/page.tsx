"use client";

import { useRef, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { useBooking } from "@/features/Booking/booking-context";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  WifiHigh,
  Television,
  Vault,
  Coffee,
  SpeakerHigh,
  Wind,
  Shower,
  Wine,
  ArrowLeft,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

gsap.registerPlugin(ScrollTrigger);

interface Highlight {
  name: string;
  imageSrc: string;
}

interface Amenity {
  name: string;
  icon: any;
}

interface DetailedRoom {
  id: string;
  category: string;
  title: string;
  description: string;
  price: string;
  roomType: string;
  maximumCapacity: string;
  dimensions: string;
  imageSrc: string;
  highlights: Highlight[];
  amenities: Amenity[];
}

const detailedRooms: DetailedRoom[] = [
  {
    id: "grand-suite",
    category: "/Rooms",
    title: "The Grand Suite",
    description: "Indulge in our most spacious suite, featuring double height ceilings, panoramic views of the city skyline, a private terrace, and a custom marble bath. Complete with state-of-the-art in-room automation and premium services.",
    price: "₹14,500 / night",
    roomType: "Luxury Suite",
    maximumCapacity: "3 Guests",
    dimensions: "72 m²",
    imageSrc: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop",
    highlights: [
      { name: "Marble Soak Tub", imageSrc: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500&auto=format&fit=crop" },
      { name: "Private Terrace Lounge", imageSrc: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500&auto=format&fit=crop" },
      { name: "Smart Room Tablet", imageSrc: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=500&auto=format&fit=crop" },
      { name: "In-Room Espresso Bar", imageSrc: "https://images.unsplash.com/photo-1579888944880-d98341148721?q=80&w=500&auto=format&fit=crop" },
    ],
    amenities: [
      { name: "Ultra High-speed Wi-Fi", icon: WifiHigh },
      { name: "Smart Television 65\"", icon: Television },
      { name: "Electronic Safe Vault", icon: Vault },
      { name: "Nespresso Coffee Maker", icon: Coffee },
      { name: "Premium Audio Soundbar", icon: SpeakerHigh },
      { name: "Automated Air Conditioning", icon: Wind },
      { name: "Marble Rainfall Shower", icon: Shower },
      { name: "Fully stocked Mini Bar", icon: Wine },
    ],
  },
  {
    id: "executive-oasis",
    category: "/Rooms",
    title: "The Executive Oasis",
    description: "A premium sanctuary tailored for the modern professional. Furnished with custom rosewood desks, ergonomic seating, and high-speed workspaces, alongside a plush king-sized bed for quiet, uninterrupted restitution.",
    price: "₹9,800 / night",
    roomType: "Executive Studio",
    maximumCapacity: "2 Guests",
    dimensions: "48 m²",
    imageSrc: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop",
    highlights: [
      { name: "Ergonomic Workspace", imageSrc: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=500&auto=format&fit=crop" },
      { name: "Acoustic Wall Panels", imageSrc: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=500&auto=format&fit=crop" },
      { name: "Private Library Nook", imageSrc: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=500&auto=format&fit=crop" },
      { name: "Tea & French Press Bar", imageSrc: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=500&auto=format&fit=crop" },
    ],
    amenities: [
      { name: "Ultra High-speed Wi-Fi", icon: WifiHigh },
      { name: "Smart Television 55\"", icon: Television },
      { name: "Secure Laptop Safe", icon: Vault },
      { name: "French Press Station", icon: Coffee },
      { name: "Noise-isolating Acoustics", icon: SpeakerHigh },
      { name: "Whisper-quiet A/C", icon: Wind },
      { name: "Glass Walk-in Shower", icon: Shower },
      { name: "Premium Refreshments", icon: Wine },
    ],
  },
  {
    id: "terracotta-pavilion",
    category: "/Rooms",
    title: "The Terracotta Pavilion",
    description: "A warm, Earth-toned sanctuary capturing natural daylight through floor-to-ceiling glass paneling. Built with locally-sourced stone textures and terracotta details to connect you directly with natural tranquility.",
    price: "₹11,200 / night",
    roomType: "Garden Pavilion",
    maximumCapacity: "2 Guests",
    dimensions: "54 m²",
    imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop",
    highlights: [
      { name: "Outdoor Rainfall Shower", imageSrc: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=500&auto=format&fit=crop" },
      { name: "Stone Detail Vanity", imageSrc: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=500&auto=format&fit=crop" },
      { name: "Terracotta Fireplace", imageSrc: "https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=500&auto=format&fit=crop" },
      { name: "Garden Hammock Lounge", imageSrc: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=500&auto=format&fit=crop" },
    ],
    amenities: [
      { name: "Ultra High-speed Wi-Fi", icon: WifiHigh },
      { name: "Smart Television 55\"", icon: Television },
      { name: "Electronic Safe Vault", icon: Vault },
      { name: "Premium Coffee Station", icon: Coffee },
      { name: "Bluetooth Ambient Sound", icon: SpeakerHigh },
      { name: "Climate Control Vent", icon: Wind },
      { name: "Open-air Rain Shower", icon: Shower },
      { name: "Organic Beverage Minibar", icon: Wine },
    ],
  },
];

export default function RoomDetails() {
  const { id } = useParams<{ id: string }>();
  const { openBooking } = useBooking();

  // Find active room index
  const activeIndex = detailedRooms.findIndex((r) => r.id === id);
  const activeRoom = detailedRooms[activeIndex !== -1 ? activeIndex : 0];

  // Pagination navigation ids
  const prevIndex = (activeIndex - 1 + detailedRooms.length) % detailedRooms.length;
  const nextIndex = (activeIndex + 1) % detailedRooms.length;
  const prevRoom = detailedRooms[prevIndex];
  const nextRoom = detailedRooms[nextIndex];

  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const highlightsContainerRef = useRef<HTMLDivElement | null>(null);
  const amenitiesContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!mainContainerRef.current) return;

    // 1. Entrance animation for the main layout
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

    // 2. Highlights animation on scroll
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

    // 3. Amenities animation on scroll
    if (amenitiesContainerRef.current) {
      gsap.fromTo(
        amenitiesContainerRef.current.querySelectorAll(".amenity-card"),
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: amenitiesContainerRef.current,
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
      {/* Top Section: Room Main Layout (Image Left, Info Right) */}
      <div className="flex flex-col md:grid md:grid-cols-12 gap-8 lg:gap-16 items-center border-b border-foreground/10 pb-20">
        {/* Left Column: Large Image */}
        <div className="w-full col-span-12 md:col-span-6 lg:col-span-7">
          <div className="detail-img-container relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-white/5">
            <Image
              src={activeRoom.imageSrc}
              alt={activeRoom.title}
              fill
              unoptimized
              className="detail-img object-cover"
            />
          </div>
        </div>

        {/* Right Column: Room Details */}
        <div className="w-full col-span-12 md:col-span-6 lg:col-span-5 flex flex-col justify-between self-stretch py-2">
          <div className="flex flex-col gap-4">
            <span className="detail-animate-item text-[0.75rem] font-medium tracking-widest text-foreground/50 uppercase font-mono">
              {activeRoom.category}
            </span>

            <h2 className="detail-animate-item text-3xl lg:text-4xl font-sans font-normal leading-tight text-foreground">
              {activeRoom.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="font-heading italic">
                {activeRoom.title.split(" ").slice(-1)[0]}
              </span>
            </h2>

            <p className="detail-animate-item text-sm text-foreground/75 leading-relaxed font-sans mt-2">
              {activeRoom.description}
            </p>

            {/* Pricing Info & Book Now Button */}
            <div className="detail-animate-item flex items-center justify-between gap-4 mt-6">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-sans font-normal text-foreground">
                  {activeRoom.price.split(" / ")[0]}
                </span>
                <span className="text-xs font-mono text-foreground/50">
                  / {activeRoom.price.split(" / ")[1]}
                </span>
              </div>
              <button
                onClick={() => openBooking("rooms", { roomType: activeRoom.id })}
                className="inline-flex items-center justify-center text-xs uppercase font-mono tracking-widest bg-foreground text-background rounded-full px-6 py-3 transition-all duration-300 hover:bg-foreground/80 hover:scale-105 active:scale-95 cursor-pointer font-medium"
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="flex flex-col mt-12 gap-6">
            {/* Room Specifications */}
            <div className="detail-animate-item pt-6 border-t border-foreground/15 grid grid-cols-3 gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-foreground/45 uppercase tracking-wider text-[0.65rem]">
                  Room Type
                </span>
                <span className="font-sans font-medium text-foreground text-sm">
                  {activeRoom.roomType}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-foreground/45 uppercase tracking-wider text-[0.65rem]">
                  Maximum
                </span>
                <span className="font-sans font-medium text-foreground text-sm">
                  {activeRoom.maximumCapacity}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-foreground/45 uppercase tracking-wider text-[0.65rem]">
                  Dimensions
                </span>
                <span className="font-sans font-medium text-foreground text-sm">
                  {activeRoom.dimensions}
                </span>
              </div>
            </div>

            {/* Bottom Pagination Links */}
            <div className="detail-animate-item flex justify-between items-center text-xs tracking-widest uppercase font-mono mt-4 pt-4 border-t border-foreground/15">
              <Link
                href={`/rooms/${prevRoom.id}`}
                className="group flex items-center gap-2 hover:text-brand transition-colors"
              >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                <span>Prev</span>
              </Link>
              <div className="h-px bg-foreground/15 flex-1 mx-6" />
              <Link
                href={`/rooms/${nextRoom.id}`}
                className="group flex items-center gap-2 hover:text-brand transition-colors"
              >
                <span>Next</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Highlights of the Room */}
      <div ref={highlightsContainerRef} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-[0.75rem] font-medium tracking-widest text-foreground/50 uppercase font-mono">
            Key Features
          </span>
          <h3 className="text-2xl md:text-3xl font-sans tracking-tight text-foreground">
            Highlights of The Room
          </h3>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
          {activeRoom.highlights.map((highlight, index) => (
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

      {/* Bottom Section: All Amenities Details */}
      <div ref={amenitiesContainerRef} className="flex flex-col gap-8 pt-10 border-t border-foreground/10">
        <div className="flex flex-col gap-2">
          <span className="text-[0.75rem] font-medium tracking-widest text-foreground/50 uppercase font-mono">
            Included Comforts
          </span>
          <h3 className="text-2xl md:text-3xl font-sans tracking-tight text-foreground">
            All Room Amenities
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {activeRoom.amenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <div
                key={index}
                className="amenity-card flex items-center gap-4 p-5 rounded-sm border border-foreground/10 bg-white/5 shadow-xs"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 text-brand shrink-0">
                  <Icon size={20} weight="regular" />
                </div>
                <span className="text-sm font-sans font-medium text-foreground/80">
                  {amenity.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
