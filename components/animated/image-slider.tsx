"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useEffect, useRef, useState, FC, MouseEvent } from "react";

interface ElementWithSplit extends HTMLElement {
  splitInstance?: SplitText;
}

const ImagesLink = [
  {
    link: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
    title: "Refined Sanctuary",
  },
  {
    link: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070&auto=format&fit=crop",
    title: "Serene Living",
  },
  {
    link: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop",
    title: "The Endless Horizon",
  },
  {
    link: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    title: "Pure Restitution",
  },
];

const ImageSlider: FC = () => {
    const [current, setCurrent] = useState(0);
  const imgRef = useRef<(HTMLImageElement | null)[]>([]);
  const titleRef = useRef<(ElementWithSplit | null)[]>([]);
  const counterRef = useRef<ElementWithSplit | null>(null);
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);

  gsap.registerPlugin(SplitText);

  useGSAP(() => {
    const currentImage = imgRef.current[current];
    const currentTitle = titleRef.current[current];
    const currentCounter = counterRef.current;

    gsap.fromTo(
      currentImage,
      { autoAlpha: 0, scale: 1.03 },
      { autoAlpha: 1, scale: 1, duration: 0.75, ease: "power2.out" }
    );

    imgRef.current.forEach((el, idx) => {
      if (idx !== current) gsap.to(el, { autoAlpha: 0, duration: 0.5 });
    });

    titleRef.current.forEach((el) => {
      if (el?.splitInstance) el.splitInstance.revert();
    });

    const splitTitle = new SplitText(currentTitle as ElementWithSplit, {
      type: "lines",
      linesClass: "lineChild",
    });

    (currentTitle as ElementWithSplit).splitInstance = splitTitle;

    gsap.fromTo(
      splitTitle.lines,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.06,
        ease: "power4.out",
      }
    );

    if (currentCounter?.splitInstance) {
      currentCounter.splitInstance.revert();
    }

    const splitCounter = new SplitText(currentCounter as ElementWithSplit, {
      type: "chars",
    });

    (currentCounter as ElementWithSplit).splitInstance = splitCounter;

    gsap.fromTo(
      splitCounter.chars,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
      }
    );
  }, [current]);

  useEffect(() => {
    const startAutoSlide = () => {
      autoSlideTimer.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % ImagesLink.length);
      }, 5000);
    };
    startAutoSlide();
    return () => {
      if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
    };
  }, []);

  const goTo = (index: number) => {
    if (index >= 0 && index < ImagesLink.length) {
      if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
      setCurrent(index);
      autoSlideTimer.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % ImagesLink.length);
      }, 5000);
    }
  };

  const prev = () =>
    goTo((current - 1 + ImagesLink.length) % ImagesLink.length);
  const next = () => goTo((current + 1) % ImagesLink.length);

  const handleScreenClick = (e: MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const center = bounds.width / 2;

    x < center ? prev() : next();
  };

  return (
    <div className="flex w-full h-[85vh]">
      <div
        onClick={handleScreenClick}
        className="relative w-dvw overflow-hidden select-none bg-black text-white"
      >
        {/* Images */}
        {ImagesLink.map((img, idx) => (
          <Image
            key={img.link}
            src={img.link}
            alt={img.title}
            ref={(el) => {
              if (imgRef.current) imgRef.current[idx] = el;
            }}
            fill
            unoptimized
            className="absolute inset-0 w-full h-full object-cover opacity-0"
            style={{ zIndex: idx === current ? 2 : 1 }}
          />
        ))}

        {/* Titles */}
        <div className="absolute top-1/2 left-1/2 w-full max-w-[90vw] px-4 transform -translate-x-1/2 -translate-y-1/2 z-2 text-center pointer-events-none">
          {ImagesLink.map((img, idx) => (
            <h2
              key={img.title}
              ref={(el) => {
                if (titleRef.current) titleRef.current[idx] = el;
              }}
              className={`absolute w-full text-[6vw] md:text-[3rem] font-semibold leading-tight ${
                idx === current ? "visible" : "invisible"
              }`}
              style={{
                overflow: "hidden",
                whiteSpace: "pre-line",
              }}
            >
              {img.title}
            </h2>
          ))}
        </div>

        {/* Counter */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-2 text-center text-base tracking-wide font-light drop-shadow-md flex items-center gap-2 pointer-events-none select-none">
          <span
            key={current}
            ref={(el) => {
              counterRef.current = el;
            }}
            className="overflow-hidden inline-block"
          >
            {`${current + 1}`}
          </span>
          <span>&mdash;</span>
          <span>{ImagesLink.length}</span>
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-16 md:bottom-6 right-1/2 transform translate-x-1/2 md:right-6 md:translate-x-0 z-2 flex gap-2 bg-black/5 rounded-sm px-2 py-1">
          {ImagesLink.map((img, idx) => (
            <button
              key={img.link}
              onClick={(e) => {
                e.stopPropagation(); // Prevent side-click event
                goTo(idx);
              }}
              className={`border-2 rounded-sm overflow-hidden ${
                current === idx ? "border-white/90" : "border-transparent"
              } p-[1.3px] transition`}
            >
              <Image
                src={img.link}
                alt={img.title}
                width={100}
                height={100}
                unoptimized
                className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-sm brightness-75 hover:brightness-100"
                draggable="false"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ImageSlider