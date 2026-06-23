"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  InstagramLogo,
  FacebookLogo,
  XLogo,
  YoutubeLogo,
  MapPin,
  Phone,
  Envelope,
} from "@phosphor-icons/react/dist/ssr";
import Container from "./container";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    const columns = footerRef.current.querySelectorAll(".footer-col");
    const bottomRow = footerRef.current.querySelector(".footer-bottom");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      columns,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    if (bottomRow) {
      tl.fromTo(
        bottomRow,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full bg-primary text-primary-foreground pt-16 pb-8 border-t border-white/5"
    >
      <Container className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Column 1: Brand details */}
        <div className="footer-col col-span-2 md:col-span-6 lg:col-span-4 flex flex-col gap-5">
          <Link href="/">
            <h2 className="text-2xl font-heading tracking-wide text-white">The Grand</h2>
          </Link>
          
          <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-sm">
            Experience premium comfort and luxury boutique hospitality in Asansol. Your perfect retreat for business and relaxation.
          </p>

          <div className="flex flex-col gap-3 mt-2 text-sm text-primary-foreground/80">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="shrink-0 text-brand mt-0.5" />
              <span>G.T. Road, Near City Centre, Asansol, West Bengal - 713303</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-brand" />
              <a href="tel:+919876543210" className="hover:text-white transition-colors">
                +91 9xxxxxxx78
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Envelope size={18} className="shrink-0 text-brand" />
              <a href="mailto:info@thegrandasansol.com" className="hover:text-white transition-colors">
                info@thegrandasansol.com
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="footer-col col-span-1 md:col-span-3 lg:col-span-2 flex flex-col gap-5">
          <span className="text-xs uppercase font-mono tracking-widest text-primary-foreground/45">
            Quick Links
          </span>
          <ul className="flex flex-col gap-3 text-sm text-primary-foreground/75">
            <li>
              <Link href="/rooms" className="hover:text-white transition-colors duration-200">
                Rooms & Suites
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition-colors duration-200">
                Our Services
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-white transition-colors duration-200">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-white transition-colors duration-200">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-white transition-colors duration-200">
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media Links */}
        <div className="footer-col col-span-1 md:col-span-3 lg:col-span-2 flex flex-col gap-5">
          <span className="text-xs uppercase font-mono tracking-widest text-primary-foreground/45">
            Connect
          </span>
          <ul className="flex flex-col gap-3.5 text-sm text-primary-foreground/75">
            <li>
              <a
                href="#"
                className="flex items-center gap-2.5 hover:text-white transition-colors duration-200"
              >
                <InstagramLogo size={18} />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2.5 hover:text-white transition-colors duration-200"
              >
                <FacebookLogo size={18} />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2.5 hover:text-white transition-colors duration-200"
              >
                <XLogo size={18} />
                <span>Twitter / X</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2.5 hover:text-white transition-colors duration-200"
              >
                <YoutubeLogo size={18} />
                <span>YouTube</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Map & Navigation */}
        <div className="footer-col col-span-2 lg:col-span-4 flex flex-col gap-4 items-center lg:items-start text-center lg:text-left w-full">
          <span className="text-xs uppercase font-mono tracking-widest text-primary-foreground/45">
            Location Map
          </span>
          <div className="relative w-full max-w-[280px] sm:max-w-md lg:max-w-none h-[120px] sm:h-[150px] md:h-[180px] rounded-sm overflow-hidden border border-white/10 bg-white/5">
            {/* Embedded monochrome Google Map of Asansol */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58509.78018302302!2d86.93608149814454!3d23.685129655653457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f71f0ea10bf257%3A0x6fb0d7f950f58992!2sAsansol%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale invert opacity-80 contrast-125 brightness-[0.8] hover:opacity-95 transition-opacity duration-300"
            />
          </div>
        </div>
      </Container>

      {/* Footer Bottom copyright row */}
      <Container className="py-0">
        <div className="footer-bottom mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
          <span>© {new Date().getFullYear()} The Grand. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}