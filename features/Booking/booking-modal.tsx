"use client";

import React, { useRef, useEffect, useState } from "react";
import { useBooking, BookingType } from "./booking-context";
import { calculateBookingTotal } from "./booking-success";
import { ADDONS_DATA } from "./booking-addons";
import BookingAddons from "./booking-addons";
import BookingCheckout from "./booking-checkout";
import BookingSuccess from "./booking-success";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, CalendarBlank, Users, CaretDown, Check, ArrowRight, Bed, ForkKnife, Champagne, Sparkle } from "@phosphor-icons/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

// Step 1: Configuration Form inside the modal
function BookingModalForm() {
  const { activeTab, setTab, formData, updateFormData, nextStep } = useBooking();
  const [inOpen, setInOpen] = useState(false);
  const [outOpen, setOutOpen] = useState(false);
  const [rDateOpen, setRDateOpen] = useState(false);
  const [bDateOpen, setBDateOpen] = useState(false);
  const [gDateOpen, setGDateOpen] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const tabs: { id: BookingType; label: string; icon: any }[] = [
    { id: "rooms", label: "Rooms", icon: Bed },
    { id: "restaurant", label: "Dining", icon: ForkKnife },
    { id: "banquet", label: "Banquet", icon: Champagne },
    { id: "social-gathering", label: "Event Space", icon: Sparkle },
  ];

  return (
    <div className="flex flex-col gap-6 h-full justify-between">
      <div>
        <span className="text-[0.65rem] font-mono uppercase tracking-widest text-foreground/45">Step 1 of 3</span>
        <h3 className="text-2xl font-sans tracking-tight mt-1 text-foreground">
          Configure Your Request
        </h3>
        <p className="text-xs text-foreground/60 mt-1">
          Specify your schedule and requirements to see available upgrades and calculate rates.
        </p>

        {/* Tab Selection */}
        <div className="flex border-b border-foreground/10 mt-6 gap-2 sm:gap-6 justify-between sm:justify-start">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={cn(
                  "flex flex-col sm:flex-row items-center gap-1 sm:gap-2 pb-2 sm:pb-3 text-[0.6rem] sm:text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer",
                  isSelected
                    ? "border-foreground text-foreground font-semibold"
                    : "border-transparent text-foreground/50 hover:text-foreground"
                )}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {activeTab === "rooms" && (
            <>
              {/* Check-In */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Check In Date</label>
                <Popover open={inOpen} onOpenChange={setInOpen}>
                  <PopoverTrigger className="flex items-center justify-between border border-foreground/15 rounded-sm py-2.5 px-3 text-xs text-foreground bg-white/5 cursor-pointer hover:border-foreground/30 transition-colors w-full">
                    <span>{formatDate(formData.checkIn)}</span>
                    <CalendarBlank size={16} className="text-foreground/45" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 border border-foreground/10 bg-background shadow-xl">
                    <Calendar
                      mode="single"
                      selected={formData.checkIn}
                      onSelect={(date) => {
                        if (date) {
                          updateFormData({ checkIn: date });
                          if (date >= formData.checkOut) {
                            updateFormData({ checkOut: new Date(date.getTime() + 24 * 60 * 60 * 1000) });
                          }
                        }
                        setInOpen(false);
                      }}
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-Out */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Check Out Date</label>
                <Popover open={outOpen} onOpenChange={setOutOpen}>
                  <PopoverTrigger className="flex items-center justify-between border border-foreground/15 rounded-sm py-2.5 px-3 text-xs text-foreground bg-white/5 cursor-pointer hover:border-foreground/30 transition-colors w-full">
                    <span>{formatDate(formData.checkOut)}</span>
                    <CalendarBlank size={16} className="text-foreground/45" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 border border-foreground/10 bg-background shadow-xl">
                    <Calendar
                      mode="single"
                      selected={formData.checkOut}
                      onSelect={(date) => {
                        if (date) updateFormData({ checkOut: date });
                        setOutOpen(false);
                      }}
                      disabled={(date) => date <= formData.checkIn}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Room Selection */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Rooms & Suites</label>
                <Select
                  value={formData.roomType}
                  onValueChange={(val) => { if (val) updateFormData({ roomType: val }); }}
                >
                  <SelectTrigger className="w-full border border-foreground/15 rounded-sm py-2.5 px-3 text-xs bg-white/5 text-foreground hover:border-foreground/30 cursor-pointer select-none">
                    <SelectValue placeholder="Select suite type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="grand-suite">The Grand Suite</SelectItem>
                    <SelectItem value="executive-oasis">The Executive Oasis</SelectItem>
                    <SelectItem value="terracotta-pavilion">The Terracotta Pavilion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rooms count */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Number of Rooms</label>
                <Select
                  value={String(formData.roomsCount)}
                  onValueChange={(val) => { if (val) updateFormData({ roomsCount: Number(val) }); }}
                >
                  <SelectTrigger className="w-full border border-foreground/15 rounded-sm py-2.5 px-3 text-xs bg-white/5 text-foreground hover:border-foreground/30 cursor-pointer select-none">
                    <SelectValue placeholder="1 Room" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="1">1 Room</SelectItem>
                    <SelectItem value="2">2 Rooms</SelectItem>
                    <SelectItem value="3">3 Rooms</SelectItem>
                    <SelectItem value="4">4 Rooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Adults */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Adults (Age 13+)</label>
                <Select
                  value={String(formData.adults)}
                  onValueChange={(val) => { if (val) updateFormData({ adults: Number(val) }); }}
                >
                  <SelectTrigger className="w-full border border-foreground/15 rounded-sm py-2.5 px-3 text-xs bg-white/5 text-foreground hover:border-foreground/30 cursor-pointer select-none">
                    <SelectValue placeholder="2 Adults" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="1">1 Adult</SelectItem>
                    <SelectItem value="2">2 Adults</SelectItem>
                    <SelectItem value="3">3 Adults</SelectItem>
                    <SelectItem value="4">4 Adults</SelectItem>
                    <SelectItem value="5">5 Adults</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Children */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Children (Age 2-12)</label>
                <Select
                  value={String(formData.children)}
                  onValueChange={(val) => { if (val) updateFormData({ children: Number(val) }); }}
                >
                  <SelectTrigger className="w-full border border-foreground/15 rounded-sm py-2.5 px-3 text-xs bg-white/5 text-foreground hover:border-foreground/30 cursor-pointer select-none">
                    <SelectValue placeholder="0 Children" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="0">0 Children</SelectItem>
                    <SelectItem value="1">1 Child</SelectItem>
                    <SelectItem value="2">2 Children</SelectItem>
                    <SelectItem value="3">3 Children</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {activeTab === "restaurant" && (
            <>
              {/* Date */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Dining Date</label>
                <Popover open={rDateOpen} onOpenChange={setRDateOpen}>
                  <PopoverTrigger className="flex items-center justify-between border border-foreground/15 rounded-sm py-2.5 px-3 text-xs text-foreground bg-white/5 cursor-pointer hover:border-foreground/30 transition-colors w-full">
                    <span>{formatDate(formData.restaurantDate)}</span>
                    <CalendarBlank size={16} className="text-foreground/45" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 border border-foreground/10 bg-background shadow-xl">
                    <Calendar
                      mode="single"
                      selected={formData.restaurantDate}
                      onSelect={(date) => {
                        if (date) updateFormData({ restaurantDate: date });
                        setRDateOpen(false);
                      }}
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Slot */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Time Slot</label>
                <Select
                  value={formData.restaurantTime}
                  onValueChange={(val) => { if (val) updateFormData({ restaurantTime: val }); }}
                >
                  <SelectTrigger className="w-full border border-foreground/15 rounded-sm py-2.5 px-3 text-xs bg-white/5 text-foreground hover:border-foreground/30 cursor-pointer select-none">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="8:00 AM - 10:00 AM">Breakfast (8:00 AM - 10:00 AM)</SelectItem>
                    <SelectItem value="12:30 PM - 3:00 PM">Lunch (12:30 PM - 3:00 PM)</SelectItem>
                    <SelectItem value="4:30 PM - 6:30 PM">High Tea (4:30 PM - 6:30 PM)</SelectItem>
                    <SelectItem value="7:30 PM - 9:30 PM">Dinner (7:30 PM - 9:30 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Seating Preference */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Seating Area</label>
                <Select
                  value={formData.restaurantSeating}
                  onValueChange={(val) => { if (val) updateFormData({ restaurantSeating: val }); }}
                >
                  <SelectTrigger className="w-full border border-foreground/15 rounded-sm py-2.5 px-3 text-xs bg-white/5 text-foreground hover:border-foreground/30 cursor-pointer select-none">
                    <SelectValue placeholder="Select seating" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="Indoor Lounge">Indoor Bistro Lounge</SelectItem>
                    <SelectItem value="Garden Patio">Outdoor Garden Patio</SelectItem>
                    <SelectItem value="Chef's Cellar">Exclusive Wine Cellar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Diners */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Diners Count</label>
                <Select
                  value={String(formData.restaurantDiners)}
                  onValueChange={(val) => { if (val) updateFormData({ restaurantDiners: Number(val) }); }}
                >
                  <SelectTrigger className="w-full border border-foreground/15 rounded-sm py-2.5 px-3 text-xs bg-white/5 text-foreground hover:border-foreground/30 cursor-pointer select-none">
                    <SelectValue placeholder="2 Diners" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="1">1 Diner</SelectItem>
                    <SelectItem value="2">2 Diners</SelectItem>
                    <SelectItem value="3">3 Diners</SelectItem>
                    <SelectItem value="4">4 Diners</SelectItem>
                    <SelectItem value="6">6 Diners</SelectItem>
                    <SelectItem value="8">8+ Diners</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {activeTab === "banquet" && (
            <>
              {/* Date */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Event Date</label>
                <Popover open={bDateOpen} onOpenChange={setBDateOpen}>
                  <PopoverTrigger className="flex items-center justify-between border border-foreground/15 rounded-sm py-2.5 px-3 text-xs text-foreground bg-white/5 cursor-pointer hover:border-foreground/30 transition-colors w-full">
                    <span>{formatDate(formData.banquetDate)}</span>
                    <CalendarBlank size={16} className="text-foreground/45" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 border border-foreground/10 bg-background shadow-xl">
                    <Calendar
                      mode="single"
                      selected={formData.banquetDate}
                      onSelect={(date) => {
                        if (date) updateFormData({ banquetDate: date });
                        setBDateOpen(false);
                      }}
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Duration */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Event Duration</label>
                <Select
                  value={formData.banquetDuration}
                  onValueChange={(val) => { if (val) updateFormData({ banquetDuration: val }); }}
                >
                  <SelectTrigger className="w-full border border-foreground/15 rounded-sm py-2.5 px-3 text-xs bg-white/5 text-foreground hover:border-foreground/30 cursor-pointer select-none">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="4 Hours">Half Day (4 Hours)</SelectItem>
                    <SelectItem value="8 Hours">Full Day (8 Hours)</SelectItem>
                    <SelectItem value="Multi-Day">Multi-Day Summit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Layout */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Hall Setup Style</label>
                <Select
                  value={formData.banquetLayout}
                  onValueChange={(val) => { if (val) updateFormData({ banquetLayout: val }); }}
                >
                  <SelectTrigger className="w-full border-foreground/15 rounded-sm py-2.5 px-3 text-xs bg-white/5 text-foreground hover:border-foreground/30 cursor-pointer select-none">
                    <SelectValue placeholder="Select setup" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="Round Tables">Gala Round Tables</SelectItem>
                    <SelectItem value="Theater Style">Theater Style Auditorium</SelectItem>
                    <SelectItem value="U-Shape Setup">Corporate U-Shape Setup</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Guests */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Estimated Guests</label>
                <Select
                  value={String(formData.banquetGuests)}
                  onValueChange={(val) => { if (val) updateFormData({ banquetGuests: Number(val) }); }}
                >
                  <SelectTrigger className="w-full border border-foreground/15 rounded-sm py-2.5 px-3 text-xs bg-white/5 text-foreground hover:border-foreground/30 cursor-pointer select-none">
                    <SelectValue placeholder="Select count" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="50">50 - 100 Guests</SelectItem>
                    <SelectItem value="150">100 - 200 Guests</SelectItem>
                    <SelectItem value="300">200 - 400 Guests</SelectItem>
                    <SelectItem value="500">400+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {activeTab === "social-gathering" && (
            <>
              {/* Date */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Gathering Date</label>
                <Popover open={gDateOpen} onOpenChange={setGDateOpen}>
                  <PopoverTrigger className="flex items-center justify-between border border-foreground/15 rounded-sm py-2.5 px-3 text-xs text-foreground bg-white/5 cursor-pointer hover:border-foreground/30 transition-colors w-full">
                    <span>{formatDate(formData.gatheringDate)}</span>
                    <CalendarBlank size={16} className="text-foreground/45" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 border border-foreground/10 bg-background shadow-xl">
                    <Calendar
                      mode="single"
                      selected={formData.gatheringDate}
                      onSelect={(date) => {
                        if (date) updateFormData({ gatheringDate: date });
                        setGDateOpen(false);
                      }}
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Space */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Venue space</label>
                <Select
                  value={formData.gatheringSpace}
                  onValueChange={(val) => { if (val) updateFormData({ gatheringSpace: val }); }}
                >
                  <SelectTrigger className="w-full border border-foreground/15 rounded-sm py-2.5 px-3 text-xs bg-white/5 text-foreground hover:border-foreground/30 cursor-pointer select-none">
                    <SelectValue placeholder="Select space" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="Rooftop Sky Deck">Rooftop Sky Deck</SelectItem>
                    <SelectItem value="Poolside Lawn Deck">Poolside Lawn Deck</SelectItem>
                    <SelectItem value="Cigar & Whiskey Lounge">Cigar & Whiskey Lounge</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Catering */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Catering package</label>
                <Select
                  value={formData.gatheringCatering}
                  onValueChange={(val) => { if (val) updateFormData({ gatheringCatering: val }); }}
                >
                  <SelectTrigger className="w-full border border-foreground/15 rounded-sm py-2.5 px-3 text-xs bg-white/5 text-foreground hover:border-foreground/30 cursor-pointer select-none">
                    <SelectValue placeholder="Select catering" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="Mixologist & Open Bar">Open Bar & Hor d'oeuvres</SelectItem>
                    <SelectItem value="Live BBQ Grill Station">Live BBQ Grill Station</SelectItem>
                    <SelectItem value="Royal Buffet Dinner">Royal Buffet Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Guests */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Attendees</label>
                <Select
                  value={String(formData.gatheringGuests)}
                  onValueChange={(val) => { if (val) updateFormData({ gatheringGuests: Number(val) }); }}
                >
                  <SelectTrigger className="w-full border border-foreground/15 rounded-sm py-2.5 px-3 text-xs bg-white/5 text-foreground hover:border-foreground/30 cursor-pointer select-none">
                    <SelectValue placeholder="Select count" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="20">15 - 30 Guests</SelectItem>
                    <SelectItem value="40">30 - 60 Guests</SelectItem>
                    <SelectItem value="80">60 - 100 Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Button */}
      <div className="flex items-center justify-end border-t border-foreground/10 pt-4 mt-4">
        <button
          onClick={nextStep}
          className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest bg-foreground text-background rounded-full px-6 py-3 hover:bg-foreground/80 cursor-pointer shadow-md font-medium"
        >
          <span>Continue to Addons</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default function BookingModal() {
  const {
    isOpen,
    closeBooking,
    currentStep,
    activeTab,
    formData,
    selectedAddons,
    setStep,
  } = useBooking();

  const overlayRef = useRef<HTMLDivElement>(null);
  const modalBoxRef = useRef<HTMLDivElement>(null);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsSummaryExpanded(false);
    }
  }, [isOpen]);

  // GSAP animations for modal open/close
  useGSAP(() => {
    if (!overlayRef.current || !modalBoxRef.current) return;

    if (isOpen) {
      gsap.set(overlayRef.current, { display: "flex", opacity: 0 });
      gsap.set(modalBoxRef.current, { scale: 0.95, y: 20, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(overlayRef.current, { opacity: 1, duration: 0.4 });
      tl.to(modalBoxRef.current, { scale: 1, y: 0, opacity: 1, duration: 0.6 }, "-=0.2");
    } else {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          if (overlayRef.current) gsap.set(overlayRef.current, { display: "none" });
        },
      });
      tl.to(modalBoxRef.current, { scale: 0.95, y: 15, opacity: 0, duration: 0.4 });
      tl.to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
    }
  }, [isOpen]);

  // Run dynamic price details calculation
  const { basePrice, addonPrice, totalPrice, nights } = calculateBookingTotal(
    activeTab,
    formData,
    selectedAddons
  );

  const getSidebarBgImage = () => {
    if (activeTab === "rooms") {
      return "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600&auto=format&fit=crop";
    }
    if (activeTab === "restaurant") {
      return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop";
    }
    if (activeTab === "banquet") {
      return "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop";
    }
    return "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop";
  };

  const getSelectionTitle = () => {
    if (activeTab === "rooms") {
      if (formData.roomType === "grand-suite") return "The Grand Suite";
      if (formData.roomType === "executive-oasis") return "The Executive Oasis";
      return "The Terracotta Pavilion";
    }
    if (activeTab === "restaurant") return "Dining Reservation";
    if (activeTab === "banquet") return "Banquet Space";
    return `Event: ${formData.gatheringSpace}`;
  };

  const renderActiveStep = () => {
    switch (currentStep) {
      case 1:
        return <BookingModalForm />;
      case 2:
        return <BookingAddons />;
      case 3:
        return <BookingCheckout />;
      case 4:
        return <BookingSuccess />;
      default:
        return <BookingModalForm />;
    }
  };

  // If step is success (4), we want to show a centered single column panel. Else show the sidebar layout.
  const isSuccessStep = currentStep === 4;

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 backdrop-blur-md px-4 py-8"
      style={{ display: "none" }}
    >
      <div
        ref={modalBoxRef}
        className={cn(
          "w-full bg-background border border-foreground/15 rounded-sm shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:grid md:grid-cols-12 duration-200 transition-all",
          isSuccessStep ? "max-w-xl min-h-[500px]" : "max-w-5xl min-h-0 md:min-h-[600px] h-[90vh] md:h-[80vh]"
        )}
      >
        
        {/* Left Column: Summary (Only render if NOT in success step) */}
        {!isSuccessStep && (
          <div
            className={cn(
              "col-span-12 md:col-span-4 relative flex flex-col justify-between text-background border-b md:border-b-0 md:border-r border-foreground/15 animate-fade-in shrink-0 transition-all duration-300",
              isSummaryExpanded ? "h-auto" : "h-auto md:h-full"
            )}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(15,15,15,0.7), rgba(10,10,10,0.85)), url(${getSidebarBgImage()})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Mobile Toggle Header */}
            <div 
              onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
              className="flex md:hidden items-center justify-between p-4 cursor-pointer z-10 w-full hover:bg-white/5 transition-colors border-b border-white/5"
            >
              <div className="flex flex-col text-left">
                <span className="text-[0.55rem] font-mono uppercase tracking-widest text-white/50">Your Selection</span>
                <span className="text-sm font-sans font-medium text-white">{getSelectionTitle()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-medium text-brand">₹{totalPrice.toLocaleString("en-IN")}</span>
                <CaretDown 
                  size={14} 
                  className={cn("text-white/60 transition-transform duration-200", isSummaryExpanded && "rotate-180")} 
                />
              </div>
            </div>

            {/* Main Summary Content (Visible always on desktop, and conditionally on mobile when expanded) */}
            <div 
              className={cn(
                "w-full flex-col justify-between p-6 md:h-full md:flex",
                isSummaryExpanded ? "flex" : "hidden"
              )}
            >
              {/* Top Info */}
              <div className="flex flex-col gap-1 z-10">
                <span className="text-[0.65rem] font-mono uppercase tracking-widest text-white/50">The Grand Hotel</span>
                <h4 className="text-xl font-heading italic mt-2 text-white">{getSelectionTitle()}</h4>
                <p className="text-[0.7rem] text-white/70 mt-1 leading-normal font-sans">
                  {activeTab === "rooms" && `Check In: ${formData.checkIn.toLocaleDateString("en-IN")} | Check Out: ${formData.checkOut.toLocaleDateString("en-IN")} (${nights} night${nights > 1 ? "s" : ""})`}
                  {activeTab === "restaurant" && `Dining: ${formData.restaurantDate.toLocaleDateString("en-IN")} at ${formData.restaurantTime}`}
                  {activeTab === "banquet" && `Banquet: ${formData.banquetDate.toLocaleDateString("en-IN")} (${formData.banquetDuration})`}
                  {activeTab === "social-gathering" && `Event: ${formData.gatheringSpace} - ${formData.gatheringDate.toLocaleDateString("en-IN")}`}
                </p>
              </div>

              {/* Middle: Selected Addons list */}
              {selectedAddons.length > 0 && (
                <div className="flex flex-col gap-2 my-6 z-10">
                  <span className="text-[0.6rem] font-mono uppercase tracking-wider text-white/40 border-b border-white/10 pb-1">Bespoke Addons</span>
                  <ul className="flex flex-col gap-1.5 max-h-[120px] overflow-y-auto pr-1">
                    {selectedAddons.map((addonId) => {
                      const addList = ADDONS_DATA[activeTab] || [];
                      const ad = addList.find((a) => a.id === addonId);
                      if (!ad) return null;
                      return (
                        <li key={addonId} className="flex justify-between items-center text-[0.65rem] text-white/80 font-sans">
                          <span className="truncate pr-2">{ad.name}</span>
                          <span className="font-mono shrink-0">₹{ad.price.toLocaleString("en-IN")}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Bottom: Price Calc Summary */}
              <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-white/10 z-10">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Base Price</span>
                  <span className="font-mono">₹{basePrice.toLocaleString("en-IN")}</span>
                </div>
                {addonPrice > 0 && (
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Addons Subtotal</span>
                    <span className="font-mono">₹{addonPrice.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-sans font-medium text-brand pt-2 border-t border-white/10 mt-1">
                  <span>Total Amount</span>
                  <span className="font-mono">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                {currentStep > 1 && (
                  <button
                    onClick={() => {
                      setStep(1);
                      setIsSummaryExpanded(false);
                    }}
                    className="text-[0.65rem] uppercase font-mono tracking-wider text-white/50 hover:text-white mt-3 text-left transition-colors cursor-pointer w-fit underline"
                  >
                    Edit details
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Step content */}
        <div
          className={cn(
            "p-6 md:p-8 flex flex-col justify-between flex-1 relative bg-background",
            isSuccessStep ? "col-span-12" : "col-span-12 md:col-span-8 h-auto md:h-full"
          )}
        >
          {/* Close button (only show if NOT on success step to avoid half-complete exits) */}
          <button
            onClick={closeBooking}
            className="absolute top-4 right-4 text-foreground/40 hover:text-foreground hover:scale-105 transition-all p-1.5 rounded-full hover:bg-foreground/5 cursor-pointer z-50"
            aria-label="Close booking modal"
          >
            <X size={18} weight="bold" />
          </button>

          {/* Render Active Wizard Step */}
          <div className="h-full flex flex-col justify-between">
            {renderActiveStep()}
          </div>
        </div>

      </div>
    </div>
  );
}
