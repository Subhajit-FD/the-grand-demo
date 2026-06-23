"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface GalleryItem {
  id: number;
  category: string;
  title: string;
  src: string;
  height: number;
}

const tabs = [
  "All",
  "Rooms",
  "Restaurant",
  "Banquet",
  "Lobby",
  "Pool",
  "Gym",
  "Guest Corridor",
];

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: "Rooms",
    title: "Luxury King Suite",
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=500&auto=format&fit=crop",
    height: 460,
  },
  {
    id: 2,
    category: "Lobby",
    title: "Welcome Reception",
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop",
    height: 310,
  },
  {
    id: 3,
    category: "Restaurant",
    title: "The Grand Dining Hall",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500&auto=format&fit=crop",
    height: 380,
  },
  {
    id: 4,
    category: "Pool",
    title: "Sunset Infinity Pool",
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=500&auto=format&fit=crop",
    height: 520,
  },
  {
    id: 5,
    category: "Banquet",
    title: "Elite Wedding Setup",
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=500&auto=format&fit=crop",
    height: 410,
  },
  {
    id: 6,
    category: "Gym",
    title: "Cardio & Fitness Centre",
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop",
    height: 330,
  },
  {
    id: 7,
    category: "Guest Corridor",
    title: "Minimalist Corridor",
    src: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=500&auto=format&fit=crop",
    height: 430,
  },
  {
    id: 8,
    category: "Rooms",
    title: "Oasis Executive Room",
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=500&auto=format&fit=crop",
    height: 300,
  },
  {
    id: 9,
    category: "Restaurant",
    title: "Gourmet Bistro",
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=500&auto=format&fit=crop",
    height: 470,
  },
  {
    id: 10,
    category: "Lobby",
    title: "Reception Seating",
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=500&auto=format&fit=crop",
    height: 360,
  },
  {
    id: 11,
    category: "Pool",
    title: "Rooftop Sun deck",
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=500&auto=format&fit=crop",
    height: 410,
  },
  {
    id: 12,
    category: "Banquet",
    title: "Banquet Table Detail",
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=500&auto=format&fit=crop",
    height: 320,
  },
  {
    id: 13,
    category: "Gym",
    title: "Strength Gym Studio",
    src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=500&auto=format&fit=crop",
    height: 490,
  },
  {
    id: 14,
    category: "Guest Corridor",
    title: "Polished Concrete Corridor",
    src: "https://images.unsplash.com/photo-1549294413-26f195afcbce?q=80&w=500&auto=format&fit=crop",
    height: 300,
  },
  {
    id: 15,
    category: "Rooms",
    title: "Suite Marble Bathroom",
    src: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=500&auto=format&fit=crop",
    height: 450,
  },
  {
    id: 16,
    category: "Lobby",
    title: "Premium Lounge Seating",
    src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=500&auto=format&fit=crop",
    height: 310,
  },
  {
    id: 17,
    category: "Restaurant",
    title: "The Grand Bar Lounge",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500&auto=format&fit=crop",
    height: 430,
  },
  {
    id: 18,
    category: "Pool",
    title: "Cabana Daybeds",
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=500&auto=format&fit=crop",
    height: 360,
  },
  {
    id: 19,
    category: "Rooms",
    title: "Presidential Bedroom",
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=500&auto=format&fit=crop",
    height: 350,
  },
  {
    id: 20,
    category: "Lobby",
    title: "Grand Lobby Chandelier",
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=500&auto=format&fit=crop",
    height: 420,
  },
  {
    id: 21,
    category: "Restaurant",
    title: "Fine Dining Dessert",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500&auto=format&fit=crop",
    height: 340,
  },
  {
    id: 22,
    category: "Pool",
    title: "Indoor Heated Pool",
    src: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=500&auto=format&fit=crop",
    height: 480,
  },
  {
    id: 23,
    category: "Banquet",
    title: "Grand Ballroom Setup",
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=500&auto=format&fit=crop",
    height: 440,
  },
  {
    id: 24,
    category: "Gym",
    title: "Yoga & Pilates Room",
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=500&auto=format&fit=crop",
    height: 370,
  },
  {
    id: 25,
    category: "Guest Corridor",
    title: "Luxury Suite Entrance",
    src: "https://images.unsplash.com/photo-1549294413-26f195afcbce?q=80&w=500&auto=format&fit=crop",
    height: 390,
  },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentCategory, setCurrentCategory] = useState("All");
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  // Filter items based on selected category state
  const filteredItems =
    currentCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === currentCategory);

  // GSAP Fade-out & Stagger In transition
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    setActiveTab(tab);

    const items = gridRef.current?.querySelectorAll(".gallery-item");

    if (items && items.length > 0) {
      gsap.to(items, {
        opacity: 0,
        scale: 0.95,
        y: 15,
        duration: 0.25,
        stagger: 0.015,
        ease: "power2.in",
        overwrite: "auto",
        onComplete: () => {
          // Update state after transition out finishes
          setCurrentCategory(tab);
        },
      });
    } else {
      setCurrentCategory(tab);
    }
  };

  // Animate items in when currentCategory changes
  useGSAP(() => {
    const items = gridRef.current?.querySelectorAll(".gallery-item");
    if (items && items.length > 0) {
      const delay = isFirstRender.current ? 0.25 : 0;
      isFirstRender.current = false;

      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.95, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.02,
          ease: "power3.out",
          delay,
          overwrite: "auto",
        }
      );
    }
  }, [currentCategory]);

  // Initial load stagger animation for header and tabs dock
  useGSAP(() => {
    gsap.fromTo(
      ".gallery-header-animate",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );

    gsap.fromTo(
      ".tabs-dock-animate",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.4)", delay: 0.4 }
    );
  }, []);

  return (
    <div className="w-full min-h-screen bg-background py-16 md:py-24 flex flex-col gap-8 relative pb-8 px-6">
      {/* Title Header */}
      <div className="flex flex-col gap-2 border-b border-foreground/10 pb-6 max-w-2xl">
        <span className="gallery-header-animate text-[0.75rem] font-medium tracking-widest text-foreground/50 uppercase font-mono">
          Visual Tour
        </span>
        <h1 className="gallery-header-animate text-4xl md:text-5xl font-sans tracking-tight text-foreground leading-[1.1] capitalize">
          {activeTab}
        </h1>
      </div>

      {/* Tabs Dock */}
      <div className="tabs-dock-animate sticky top-0 z-[40] bg-background/95 backdrop-blur-md py-4 -mx-6 px-6 border-b border-foreground/5 flex justify-start md:justify-center">
        <div className="flex items-center gap-1 bg-background border border-foreground/15 px-3 py-2 rounded-sm shadow-md overflow-x-auto scrollbar-none max-w-full">
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`text-xs uppercase font-mono tracking-wider px-4 py-2 rounded-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-foreground text-background font-medium"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pinterest Masonry Grid */}
      <div
        ref={gridRef}
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 w-full flex-grow mt-4"
      >
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="gallery-item break-inside-avoid mb-4 overflow-hidden rounded-sm bg-white/5 relative group cursor-pointer border border-foreground/5 shadow-2xs"
            style={{ opacity: 0 }} // Pre-set opacity for GSAP initial trigger
          >
            <Image
              src={item.src}
              alt={item.title}
              width={400}
              height={item.height}
              unoptimized
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Soft Dark Overlay on Hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white text-xs font-mono tracking-wider">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}