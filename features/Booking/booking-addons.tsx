"use client";

import React from "react";
import { useBooking, AddonItem } from "./booking-context";
import { Check, ArrowRight, ArrowLeft } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export const ADDONS_DATA: Record<string, AddonItem[]> = {
  rooms: [
    {
      id: "spa-treatment",
      name: "Grand Wellness Spa Package",
      description: "60-minute therapeutic full-body aromatherapy treatment at our luxury spa.",
      price: 4500,
      priceType: "person",
    },
    {
      id: "airport-transfer",
      name: "Chauffeur Airport Transfer",
      description: "Luxury sedan pickup or drop-off service to/from Asansol airport.",
      price: 2500,
      priceType: "once",
    },
    {
      id: "champagne",
      name: "Champagne on Arrival",
      description: "A bottle of premium chilled French Champagne waiting in your suite.",
      price: 6000,
      priceType: "once",
    },
    {
      id: "late-checkout",
      name: "Guaranteed Late Check-out",
      description: "Extend your stay until 4:00 PM (normally 11:00 AM).",
      price: 1500,
      priceType: "once",
    },
  ],
  restaurant: [
    {
      id: "wine-pairing",
      name: "Sommelier Wine Pairing",
      description: "Curated 4-glass wine flight paired precisely with your dishes.",
      price: 2000,
      priceType: "person",
    },
    {
      id: "dessert-platter",
      name: "Signature Dessert Platter",
      description: "Chef's selection of hand-crafted pastries, macaroons, and sorbet.",
      price: 1200,
      priceType: "once",
    },
    {
      id: "rose-centerpiece",
      name: "Red Rose Table Centerpiece",
      description: "Stunning vase of fresh premium red roses set on your table.",
      price: 1500,
      priceType: "once",
    },
  ],
  banquet: [
    {
      id: "stage-decor",
      name: "Bespoke Floral Stage Setup",
      description: "Full stage decoration, background panel, and premium fresh flower styling.",
      price: 40000,
      priceType: "once",
    },
    {
      id: "sound-upgrade",
      name: "Concert Audio & Lighting",
      description: "Subwoofers, line array loudspeakers, and smart moving heads with a technician.",
      price: 25000,
      priceType: "once",
    },
    {
      id: "valet-crew",
      name: "Dedicated Valet Attendants",
      description: "A dedicated team of 5 valet drivers managing quick guest arrivals.",
      price: 10000,
      priceType: "once",
    },
  ],
  "social-gathering": [
    {
      id: "acoustic-musician",
      name: "Acoustic Solo Artist",
      description: "Live singer/guitarist performing soft classics and ambient music for 2 hours.",
      price: 15000,
      priceType: "once",
    },
    {
      id: "photographer",
      name: "Event Photographer",
      description: "Professional photographer providing edited digital captures after the event.",
      price: 8000,
      priceType: "once",
    },
    {
      id: "cocktail-mixology",
      name: "Mixologist & Signature Bar",
      description: "Private bartender serving 3 customizable signature cocktails for your guests.",
      price: 12000,
      priceType: "once",
    },
  ],
};

export default function BookingAddons() {
  const { activeTab, selectedAddons, toggleAddon, nextStep, prevStep } = useBooking();
  const addons = ADDONS_DATA[activeTab] || [];

  return (
    <div className="flex flex-col gap-6 h-full justify-between">
      <div>
        <span className="text-[0.65rem] font-mono uppercase tracking-widest text-foreground/45">Step 2 of 3</span>
        <h3 className="text-2xl font-sans tracking-tight mt-1 text-foreground">
          Enhance Your Experience
        </h3>
        <p className="text-xs text-foreground/60 mt-1">
          Select optional upgrades and bespoke services designed to elevate your time at The Grand.
        </p>

        {/* Addons Grid */}
        <div className="grid grid-cols-1 gap-4 mt-6 max-h-[380px] overflow-y-auto pr-1">
          {addons.map((addon) => {
            const isSelected = selectedAddons.includes(addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={cn(
                  "p-4 rounded-sm border border-foreground/10 flex items-center justify-between gap-4 cursor-pointer transition-all duration-300",
                  isSelected
                    ? "border-foreground bg-foreground/5 shadow-sm"
                    : "bg-white/5 hover:border-foreground/20"
                )}
              >
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-sans font-medium text-foreground">{addon.name}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-foreground text-background flex items-center justify-center scale-90">
                        <Check size={10} weight="bold" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-foreground/60 leading-normal">{addon.description}</span>
                </div>
                <div className="text-right shrink-0 flex flex-col gap-0.5">
                  <span className="text-sm font-mono font-medium text-foreground">
                    ₹{addon.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[0.65rem] font-mono text-foreground/40 lowercase">
                    / {addon.priceType === "once" ? "once" : addon.priceType === "night" ? "night" : "person"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-foreground/10 pt-4 mt-4">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-foreground/60 hover:text-foreground cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>

        <button
          onClick={nextStep}
          className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest bg-foreground text-background rounded-full px-6 py-3 hover:bg-foreground/80 cursor-pointer shadow-md font-medium"
        >
          <span>Continue to Details</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
