"use client";

import React, { useEffect, useState } from "react";
import { useBooking } from "./booking-context";
import { ADDONS_DATA } from "./booking-addons";
import { CheckCircle, Printer, CalendarBlank, User, Ticket, QrCode } from "@phosphor-icons/react";

// Helper to calculate pricing details
export const calculateBookingTotal = (
  activeTab: string,
  formData: any,
  selectedAddons: string[]
) => {
  let basePrice = 0;
  let nights = 1;

  if (activeTab === "rooms") {
    const diffTime = Math.abs(formData.checkOut.getTime() - formData.checkIn.getTime());
    nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    let roomRate = 14500; // grand-suite
    if (formData.roomType === "executive-oasis") roomRate = 9800;
    if (formData.roomType === "terracotta-pavilion") roomRate = 11200;

    basePrice = roomRate * nights * formData.roomsCount;
  } else if (activeTab === "restaurant") {
    basePrice = 1500 * formData.restaurantDiners; // cover charge deposit
  } else if (activeTab === "banquet") {
    let rate = 120000;
    if (formData.banquetDuration === "4 Hours") rate = 75000;
    if (formData.banquetDuration === "Multi-Day") rate = 250000;
    basePrice = rate;
  } else if (activeTab === "social-gathering") {
    let rate = 60000;
    if (formData.gatheringSpace === "Poolside Lawn Deck") rate = 50000;
    if (formData.gatheringSpace === "Cigar & Whiskey Lounge") rate = 40000;
    basePrice = rate;
  }

  // Addons price calculation
  const addons = ADDONS_DATA[activeTab] || [];
  let addonPrice = 0;

  selectedAddons.forEach((addonId) => {
    const addon = addons.find((a) => a.id === addonId);
    if (!addon) return;

    if (activeTab === "rooms") {
      let multiplier = 1;
      if (addon.priceType === "night") {
        multiplier = nights;
      } else if (addon.priceType === "person") {
        multiplier = formData.adults + formData.children;
      }
      addonPrice += addon.price * multiplier;
    } else if (activeTab === "restaurant") {
      let multiplier = 1;
      if (addon.priceType === "person") {
        multiplier = formData.restaurantDiners;
      }
      addonPrice += addon.price * multiplier;
    } else {
      addonPrice += addon.price;
    }
  });

  return {
    basePrice,
    addonPrice,
    totalPrice: basePrice + addonPrice,
    nights,
  };
};

export default function BookingSuccess() {
  const { activeTab, formData, selectedAddons, closeBooking, resetBooking } = useBooking();
  const [refNumber, setRefNumber] = useState("");

  useEffect(() => {
    // Generate a random confirmation number on client side
    const rand = Math.floor(100000 + Math.random() * 900000);
    setRefNumber(`TGH-${rand}`);
  }, []);

  const { basePrice, addonPrice, totalPrice, nights } = calculateBookingTotal(
    activeTab,
    formData,
    selectedAddons
  );

  const getBookingTitle = () => {
    if (activeTab === "rooms") {
      if (formData.roomType === "grand-suite") return "The Grand Suite";
      if (formData.roomType === "executive-oasis") return "The Executive Oasis";
      return "The Terracotta Pavilion";
    }
    if (activeTab === "restaurant") return "The Grand Bistro Table";
    if (activeTab === "banquet") return "Imperial Banquet Event";
    return `Event: ${formData.gatheringSpace}`;
  };

  const getBookingDateString = () => {
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
    if (activeTab === "rooms") {
      return `${formData.checkIn.toLocaleDateString("en-IN", options)} - ${formData.checkOut.toLocaleDateString("en-IN", options)} (${nights} Night${nights > 1 ? "s" : ""})`;
    }
    if (activeTab === "restaurant") {
      return `${formData.restaurantDate.toLocaleDateString("en-IN", options)} at ${formData.restaurantTime}`;
    }
    if (activeTab === "banquet") {
      return `${formData.banquetDate.toLocaleDateString("en-IN", options)} (${formData.banquetDuration})`;
    }
    return `${formData.gatheringDate.toLocaleDateString("en-IN", options)}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDone = () => {
    closeBooking();
    resetBooking();
  };

  return (
    <div className="flex flex-col gap-6 text-center max-w-lg mx-auto py-4">
      {/* Animated Checkmark Icon */}
      <div className="flex justify-center items-center flex-col gap-2">
        <div className="text-emerald-500 animate-bounce">
          <CheckCircle size={64} weight="fill" />
        </div>
        <h3 className="text-2xl font-sans tracking-tight text-foreground">
          Reservation Confirmed!
        </h3>
        <p className="text-xs text-foreground/60">
          Your booking is locked. A confirmation email has been dispatched to{" "}
          <strong className="text-foreground/80 font-medium">{formData.email}</strong>.
        </p>
      </div>

      {/* Booking Receipt Summary Card */}
      <div className="bg-foreground/5 border border-foreground/10 rounded-sm p-5 text-left flex flex-col gap-4 relative overflow-hidden">
        
        {/* Decorative Ticket Corner Cuts */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background border-r border-foreground/10 rounded-r-full -ml-2" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background border-l border-foreground/10 rounded-l-full -mr-2" />

        {/* Receipt Header */}
        <div className="flex justify-between items-center border-b border-foreground/10 pb-3">
          <div className="flex items-center gap-1.5 text-xs text-foreground/50">
            <Ticket size={16} />
            <span>Booking Receipt</span>
          </div>
          <span className="text-xs font-mono font-medium text-brand">{refNumber}</span>
        </div>

        {/* Receipt Details */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex flex-col gap-0.5">
            <span className="text-[0.6rem] font-mono uppercase text-foreground/40">Guest</span>
            <span className="font-sans font-medium text-foreground">{formData.fullName}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[0.6rem] font-mono uppercase text-foreground/40">Item</span>
            <span className="font-sans font-medium text-foreground truncate">{getBookingTitle()}</span>
          </div>
          <div className="flex flex-col gap-0.5 col-span-2">
            <span className="text-[0.6rem] font-mono uppercase text-foreground/40">Schedule / Details</span>
            <span className="font-sans font-medium text-foreground flex items-center gap-1.5">
              <CalendarBlank size={14} className="text-foreground/45 shrink-0" />
              <span>{getBookingDateString()}</span>
            </span>
          </div>
        </div>

        {/* Receipt Totals */}
        <div className="border-t border-dashed border-foreground/20 pt-3 flex flex-col gap-1.5 text-xs">
          <div className="flex justify-between text-foreground/60">
            <span>Base Fare</span>
            <span className="font-mono">₹{basePrice.toLocaleString("en-IN")}</span>
          </div>
          {addonPrice > 0 && (
            <div className="flex justify-between text-foreground/60">
              <span>Enhancements & Addons</span>
              <span className="font-mono">₹{addonPrice.toLocaleString("en-IN")}</span>
            </div>
          )}
          <div className="flex justify-between font-sans font-semibold text-sm text-foreground pt-1.5 border-t border-foreground/10">
            <span>Amount Paid</span>
            <span className="font-mono text-brand">₹{totalPrice.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      {/* Check In QR Pass Code */}
      <div className="flex flex-col items-center gap-2 border border-foreground/10 rounded-sm p-4 bg-white/5">
        <div className="p-2 bg-foreground rounded-sm">
          <QrCode size={80} className="text-background" />
        </div>
        <div className="flex flex-col text-center">
          <span className="text-[0.65rem] font-mono uppercase text-foreground/45 tracking-wider">Check-In QR Pass</span>
          <span className="text-[0.55rem] text-foreground/50">Present this QR code on arrival at the front desk</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center gap-2 text-xs uppercase font-mono tracking-widest border border-foreground/20 text-foreground rounded-full py-3 hover:bg-foreground/5 cursor-pointer font-medium"
        >
          <Printer size={14} />
          <span>Print Receipt</span>
        </button>

        <button
          onClick={handleDone}
          className="flex-1 flex items-center justify-center gap-2 text-xs uppercase font-mono tracking-widest bg-foreground text-background rounded-full py-3 hover:bg-foreground/80 cursor-pointer font-semibold shadow-md"
        >
          <span>Finish Demo</span>
        </button>
      </div>
    </div>
  );
}
