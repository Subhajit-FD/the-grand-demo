"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/features/Booking/booking-context";
import {
  ListIcon,
  XIcon,
  InstagramLogo,
  FacebookLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";

gsap.registerPlugin(SplitText);

const socials = [
  { icon: InstagramLogo, href: "#", label: "Instagram" },
  { icon: FacebookLogo, href: "#", label: "Facebook" },
  { icon: XLogo, href: "#", label: "X" },
  { icon: YoutubeLogo, href: "#", label: "YouTube" },
];

export default function MobileNavbar({
  links,
}: {
  links: Array<{ title: string; href: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { openBooking } = useBooking();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const socialIconsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!overlayRef.current) return;

    // Kill previous timeline
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    if (isOpen) {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      // Make overlay visible and animate in
      tl.set(overlayRef.current, { display: "flex" });
      tl.fromTo(
        overlayRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power3.inOut" }
      );

      // Header fade in
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      );

      // Animate nav links with SplitText
      linksRef.current.forEach((linkEl) => {
        if (!linkEl) return;
        const split = new SplitText(linkEl, {
          type: "words,chars",
        });

        tl.fromTo(
          split.chars,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.025,
            ease: "power4.out",
          },
          "-=0.4"
        );
      });

      // Divider line
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
        "-=0.2"
      );

      // Social icons stagger in
      tl.fromTo(
        socialIconsRef.current.filter(Boolean),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.3"
      );

      tlRef.current = tl;
    } else {
      // Animate out
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { display: "none" });
          }
        },
      });

      tl.to(overlayRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.5,
      });

      tlRef.current = tl;
    }
  }, [isOpen]);

  return (
    <nav>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="relative z-[1001]"
      >
        {isOpen ? <XIcon size={22} weight="bold" /> : <ListIcon size={22} weight="bold" />}
      </Button>

      {/* Full-screen overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[1000] flex-col bg-background"
        style={{ display: "none", clipPath: "inset(0 0 100% 0)" }}
      >
        {/* Header: Logo */}
        <div
          ref={headerRef}
          className="flex items-center justify-between px-8 py-4"
        >
          <Link href="/" onClick={() => setIsOpen(false)}>
            <h1 className="text-xl font-medium tracking-wide">The Grand</h1>
          </Link>
          {/* Spacer to preserve layout structure since the Toggle Button sits on top at z-[1001] */}
          <div className="size-9" />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8">
          {links.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={index}
                href={link.href}
                ref={(el) => {
                  linksRef.current[index] = el;
                }}
                onClick={() => setIsOpen(false)}
                className={`block overflow-hidden text-3xl font-heading font-medium tracking-tight transition-colors hover:text-brand ${
                  isActive ? "text-brand" : "text-foreground"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
          
          <button
            onClick={() => {
              setIsOpen(false);
              openBooking("rooms");
            }}
            className="mt-4 text-xs uppercase font-mono tracking-widest bg-foreground text-background rounded-full px-8 py-3.5 transition-all duration-300 hover:bg-foreground/80 hover:scale-105 active:scale-95 font-medium cursor-pointer"
          >
            Book Now
          </button>
        </div>

        {/* Footer: Social Icons */}
        <div ref={footerRef} className="px-8 pb-10 pt-4">
          <div
            ref={dividerRef}
            className="mx-auto mb-6 h-px w-full max-w-[200px] origin-center bg-foreground/15"
          />
          <div className="flex items-center justify-center gap-5">
            {socials.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                ref={(el) => {
                  socialIconsRef.current[index] = el;
                }}
                aria-label={social.label}
                className="text-foreground/60 transition-colors duration-200 hover:text-brand"
              >
                <social.icon size={24} weight="regular" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
