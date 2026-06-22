"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TwitterLogo,
  LinkedinLogo,
  InstagramLogo,
  Globe,
} from "@phosphor-icons/react/dist/ssr";

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "What are the check-in and check-out hours?",
    a: "Standard check-in is at 2:00 PM and check-out is at 12:00 PM. Early check-in or late check-out options are available subject to room availability and minor charges.",
  },
  {
    q: "Do you offer railway station transfers?",
    a: "Yes, we provide complimentary scheduled transfers to/from Asansol Junction railway station. Please notify our reception desk 24 hours in advance to secure your ride.",
  },
  {
    q: "Is breakfast included in the room bookings?",
    a: "We offer both bed-and-breakfast plans and room-only options. If your booking includes breakfast, you can enjoy our gourmet buffet dining at The Grand Restaurant.",
  },
  {
    q: "Do you have secure on-site parking?",
    a: "Yes, we provide free, secure, and fully monitored valet parking for all overnight hotel guests and event attendees within our property boundaries.",
  },
  {
    q: "Are pets allowed in the hotel suites?",
    a: "To ensure comfort and hygiene for all our guests, pets are generally not allowed inside our guest rooms, with exceptions made only for registered service animals.",
  },
];

export default function ContactUs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Initial Page Load Animation
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      ".contact-header-animate",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }
    );

    if (formRef.current) {
      tl.fromTo(
        formRef.current.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
        "-=0.4"
      );
    }

    if (infoRef.current) {
      tl.fromTo(
        infoRef.current.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
        "-=0.5"
      );
    }

    // 2. FAQ Accordion scroll reveal
    if (faqRef.current) {
      gsap.fromTo(
        faqRef.current.querySelectorAll(".faq-item-animate"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // 3. Map scroll reveal
    if (mapRef.current) {
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.98, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-background text-foreground px-6 py-16 md:py-24 flex flex-col gap-24"
    >
      {/* Top Section: Form Left, Info Right */}
      <div className="grid grid-cols-12 gap-8 lg:gap-16 items-start max-w-7xl mx-auto w-full">
        {/* Left Column: Title and Contact Form */}
        <div ref={formRef} className="col-span-12 md:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="contact-header-animate text-5xl md:text-7xl font-sans font-normal tracking-tight text-foreground leading-none">
              Contact Us
            </h1>
            <p className="contact-header-animate text-sm text-foreground/70 mt-1 max-w-md font-sans">
              Please feel free to contact us and we will get back to you as soon as we can.
            </p>
          </div>

          <form className="flex flex-col gap-6 mt-4 w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1 w-full relative">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-transparent border-b border-foreground/20 py-3 text-foreground placeholder-foreground/45 focus:border-foreground focus:outline-none transition-colors font-sans text-sm"
                required
              />
            </div>

            <div className="flex flex-col gap-1 w-full relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border-b border-foreground/20 py-3 text-foreground placeholder-foreground/45 focus:border-foreground focus:outline-none transition-colors font-sans text-sm"
                required
              />
            </div>

            <div className="flex flex-col gap-1 w-full relative">
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full bg-transparent border-b border-foreground/20 py-3 text-foreground placeholder-foreground/45 focus:border-foreground focus:outline-none transition-colors resize-none font-sans text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-foreground text-background font-mono text-xs uppercase tracking-widest py-4 transition-all duration-300 rounded-sm font-semibold mt-4 hover:bg-foreground/90 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>

        {/* Right Column: Contact Details & Socials */}
        <div
          ref={infoRef}
          className="col-span-12 md:col-span-5 flex flex-col gap-10 md:pt-24 pl-0 md:pl-8 text-foreground/95"
        >
          {/* Visit Us section */}
          <div className="flex flex-col gap-3">
            <span className="text-[0.65rem] uppercase font-mono tracking-widest text-foreground/45">
              Visit us
            </span>
            <p className="text-sm font-sans leading-relaxed text-foreground/90">
              G.T. Road, Near City Centre,<br />
              Asansol, West Bengal - 713303
            </p>
          </div>

          {/* Talk to Us section */}
          <div className="flex flex-col gap-3">
            <span className="text-[0.65rem] uppercase font-mono tracking-widest text-foreground/45">
              Talk to us
            </span>
            <div className="flex flex-col text-sm font-sans gap-1 text-foreground/90">
              <a href="tel:+919876543210" className="hover:text-brand transition-colors">
                +91 9xxxxxxx78
              </a>
              <a href="mailto:info@thegrandasansol.com" className="hover:text-brand transition-colors">
                info@thegrandasansol.com
              </a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5 mt-4 text-foreground/60">
            <a href="#" aria-label="Twitter X" className="hover:text-brand transition-colors duration-200">
              <TwitterLogo size={20} weight="fill" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-brand transition-colors duration-200">
              <LinkedinLogo size={20} weight="fill" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-brand transition-colors duration-200">
              <InstagramLogo size={20} weight="fill" />
            </a>
            <a href="#" aria-label="Website" className="hover:text-brand transition-colors duration-200">
              <Globe size={20} weight="fill" />
            </a>
          </div>
        </div>
      </div>

      {/* Middle Section: FAQ Accordion */}
      <div
        ref={faqRef}
        className="max-w-3xl w-full mx-auto flex flex-col gap-8 pt-16 border-t border-foreground/10"
      >
        <div className="faq-item-animate flex flex-col gap-2">
          <span className="text-[0.65rem] uppercase font-mono tracking-widest text-foreground/45">
            Got Questions?
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-normal text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col w-full mt-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="faq-item-animate border-b border-foreground/10 py-5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between text-left font-sans text-base font-medium text-foreground hover:text-brand transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-xl transition-transform duration-300 select-none">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "150px" : "0",
                    opacity: isOpen ? 1 : 0,
                    marginTop: isOpen ? "12px" : "0",
                  }}
                >
                  <p className="text-sm text-foreground/70 leading-relaxed font-sans pb-2">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Location Map */}
      <div
        ref={mapRef}
        className="w-full max-w-7xl mx-auto flex flex-col gap-6 pt-16 border-t border-foreground/10"
      >
        <div className="flex flex-col gap-2">
          <span className="text-[0.65rem] uppercase font-mono tracking-widest text-foreground/45">
            Quick Navigation
          </span>
          <h2 className="text-2xl md:text-3xl font-sans font-normal text-foreground">
            Location Map
          </h2>
        </div>

        <div className="relative w-full h-[400px] rounded-sm overflow-hidden border border-foreground/10 bg-foreground/5 shadow-md mt-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58509.78018302302!2d86.93608149814454!3d23.685129655653457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f71f0ea10bf257%3A0x6fb0d7f950f58992!2sAsansol%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale opacity-80 contrast-125 hover:opacity-95 transition-opacity duration-300"
          />
        </div>
      </div>
    </div>
  );
}