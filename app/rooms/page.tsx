"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useBooking } from "@/features/Booking/booking-context";
import Container from "@/components/core/container";

gsap.registerPlugin(ScrollTrigger);

interface RoomData {
  id: string;
  category: string;
  title: string;
  description: string;
  price: string;
  roomType: string;
  maximumCapacity: string;
  dimensions: string;
  imageSrc: string;
}

const rooms: RoomData[] = [
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
  },
];

export default function Rooms() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const roomsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { openBooking } = useBooking();

  useGSAP(() => {
    // 1. Initial fade-in for page header
    gsap.fromTo(
      ".rooms-header-animate",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );

    // 2. Animate each room section on scroll
    roomsRef.current.forEach((section) => {
      if (!section) return;

      const imgContainer = section.querySelector(".room-image-container");
      const img = section.querySelector(".room-image");
      const contentItems = section.querySelectorAll(".room-animate-item");

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
      {/* Page Title & Intro */}
      <div className="flex flex-col gap-3 border-b border-foreground/10 pb-8 max-w-2xl">
        <span className="rooms-header-animate text-[0.75rem] font-medium tracking-widest text-foreground/50 uppercase font-mono">
          Suites & Accommodations
        </span>
        <h1 className="rooms-header-animate text-4xl md:text-5xl font-sans tracking-tight text-foreground leading-[1.1]">
          Rooms designed for quiet comfort.
        </h1>
        <p className="rooms-header-animate text-sm text-foreground/70 mt-2">
          Discover a collection of high-end rooms curated to bring relaxation, peace, and productivity into perfect harmony.
        </p>
      </div>

      {/* Rooms List */}
      <div className="flex flex-col gap-24">
        {rooms.map((room, index) => (
          <div
            key={room.id}
            ref={(el) => {
              roomsRef.current[index] = el;
            }}
            className="flex flex-col md:grid md:grid-cols-12 gap-8 lg:gap-16 items-center border-b border-foreground/10 pb-20 last:border-0 last:pb-0"
          >
            {/* Left Column: Large Image */}
            <div className="w-full col-span-12 md:col-span-6 lg:col-span-7">
              <div className="room-image-container relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-white/5">
                <Image
                  src={room.imageSrc}
                  alt={room.title}
                  fill
                  unoptimized
                  priority={index === 0}
                  className="room-image object-cover"
                />
              </div>
            </div>

            {/* Right Column: Room Details */}
            <div className="w-full col-span-12 md:col-span-6 lg:col-span-5 flex flex-col justify-between self-stretch py-2">
              <div className="flex flex-col gap-4">
                <span className="room-animate-item text-[0.75rem] font-medium tracking-widest text-foreground/50 uppercase font-mono">
                  {room.category}
                </span>
                
                <h2 className="room-animate-item text-3xl lg:text-4xl font-sans font-normal leading-tight text-foreground">
                  {room.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="font-heading italic">
                    {room.title.split(" ").slice(-1)[0]}
                  </span>
                </h2>

                <p className="room-animate-item text-sm text-foreground/75 leading-relaxed font-sans mt-2">
                  {room.description}
                </p>

                {/* Price Information */}
                <div className="room-animate-item flex items-baseline gap-2 mt-4">
                  <span className="text-2xl font-sans font-normal text-foreground">
                    {room.price.split(" / ")[0]}
                  </span>
                  <span className="text-xs font-mono text-foreground/50">
                    / {room.price.split(" / ")[1]}
                  </span>
                </div>

                {/* CTAs */}
                <div className="room-animate-item mt-4 flex items-center gap-3 flex-wrap">
                  <Link
                    href={`/rooms/${room.id}`}
                    className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-foreground border border-foreground/20 rounded-full px-6 py-3 transition-all duration-300 hover:bg-foreground hover:text-background hover:scale-105 active:scale-95"
                  >
                    <span>View Details</span>
                    <ArrowRight size={14} />
                  </Link>
                  <button
                    onClick={() => openBooking("rooms", { roomType: room.id })}
                    className="inline-flex items-center justify-center text-xs uppercase font-mono tracking-widest bg-foreground text-background rounded-full px-6 py-3 transition-all duration-300 hover:bg-foreground/80 hover:scale-105 active:scale-95 cursor-pointer font-medium"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* Room Specifications Footer */}
              <div className="room-animate-item mt-12 pt-6 border-t border-foreground/15 grid grid-cols-3 gap-4 text-xs">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-foreground/45 uppercase tracking-wider text-[0.65rem]">
                    Room Type
                  </span>
                  <span className="font-sans font-medium text-foreground text-sm">
                    {room.roomType}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-foreground/45 uppercase tracking-wider text-[0.65rem]">
                    Maximum
                  </span>
                  <span className="font-sans font-medium text-foreground text-sm">
                    {room.maximumCapacity}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-foreground/45 uppercase tracking-wider text-[0.65rem]">
                    Dimensions
                  </span>
                  <span className="font-sans font-medium text-foreground text-sm">
                    {room.dimensions}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}