"use client";

import React, { useState } from "react";
import { useBooking, BookingType } from "./booking-context";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  CalendarBlank,
  Users,
  CaretDown,
  Bed,
  ForkKnife,
  Champagne,
  Sparkle,
  Plus,
  Minus,
} from "@phosphor-icons/react";

export default function BookingSection() {
  const {
    formData,
    updateFormData,
    openBooking,
    setTab,
  } = useBooking();

  const [dockTab, setDockTab] = useState<BookingType>("rooms");

  // Local state for popover opens
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const [restDateOpen, setRestDateOpen] = useState(false);
  const [banquetDateOpen, setBanquetDateOpen] = useState(false);
  const [gatheringDateOpen, setGatheringDateOpen] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    });
  };

  const handleBookNow = () => {
    setTab(dockTab);
    openBooking(dockTab, formData);
  };

  const adjustCount = (field: "adults" | "children" | "pets" | "restaurantDiners" | "banquetGuests" | "gatheringGuests", amount: number, min = 0) => {
    const val = formData[field] as number;
    updateFormData({ [field]: Math.max(min, val + amount) });
  };

  const tabs: { id: BookingType; label: string; icon: any }[] = [
    { id: "rooms", label: "Rooms", icon: Bed },
    { id: "restaurant", label: "Dining", icon: ForkKnife },
    { id: "banquet", label: "Banquets", icon: Champagne },
    { id: "social-gathering", label: "Events", icon: Sparkle },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 select-none relative z-10">
      <div className="flex flex-col items-center gap-4">
        
        {/* Tabs Bar */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 bg-background/90 border border-foreground/10 rounded-sm px-1.5 py-1 shadow-md w-full sm:w-auto overflow-hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = dockTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setDockTab(tab.id)}
                className={cn(
                  "flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-sm text-[0.6rem] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer w-auto justify-center",
                  isSelected
                    ? "bg-foreground text-background font-semibold"
                    : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                )}
              >
                <Icon size={14} weight={isSelected ? "fill" : "regular"} />
                <span className="text-center">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Input Panel */}
        <div className="w-full bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-sm p-4 md:p-5 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">
          
          {/* Rooms Tab Fields */}
          {dockTab === "rooms" && (
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch lg:items-center">
              {/* Check In Date */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0 lg:border-r lg:border-foreground/10 lg:pr-4">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Check In</span>
                <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                  <PopoverTrigger className="flex items-center justify-between gap-2 text-sm font-sans font-medium text-foreground text-left cursor-pointer hover:text-brand transition-colors w-full min-h-[24px]">
                    <span className="flex-1 min-w-0 truncate">{formatDate(formData.checkIn)}</span>
                    <CalendarBlank size={16} className="text-foreground/45 shrink-0" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 border border-foreground/10 shadow-xl bg-background rounded-sm">
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
                        setCheckInOpen(false);
                      }}
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check Out Date */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0 lg:border-r lg:border-foreground/10 lg:pr-4">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Check Out</span>
                <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                  <PopoverTrigger className="flex items-center justify-between gap-2 text-sm font-sans font-medium text-foreground text-left cursor-pointer hover:text-brand transition-colors w-full min-h-[24px]">
                    <span className="flex-1 min-w-0 truncate">{formatDate(formData.checkOut)}</span>
                    <CalendarBlank size={16} className="text-foreground/45 shrink-0" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 border border-foreground/10 shadow-xl bg-background rounded-sm">
                    <Calendar
                      mode="single"
                      selected={formData.checkOut}
                      onSelect={(date) => {
                        if (date) updateFormData({ checkOut: date });
                        setCheckOutOpen(false);
                      }}
                      disabled={(date) => date <= formData.checkIn}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Room Selection */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0 lg:border-r lg:border-foreground/10 lg:pr-4">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Rooms</span>
                <Select
                  value={formData.roomType}
                  onValueChange={(val) => { if (val) updateFormData({ roomType: val }); }}
                >
                  <SelectTrigger className="w-full border-0 shadow-none p-0 text-sm font-sans font-medium bg-transparent hover:text-brand cursor-pointer select-none text-left flex justify-between min-h-[24px]">
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="grand-suite">The Grand Suite</SelectItem>
                    <SelectItem value="executive-oasis">The Executive Oasis</SelectItem>
                    <SelectItem value="terracotta-pavilion">The Terracotta Pavilion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Guests Selection */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Guests & Pets</span>
                <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
                  <PopoverTrigger className="flex items-center justify-between gap-2 text-sm font-sans font-medium text-foreground text-left cursor-pointer hover:text-brand transition-colors w-full min-h-[24px]">
                    <span className="flex-1 min-w-0 truncate">
                      {formData.adults} Ad, {formData.children} Ch, {formData.pets} Pt
                    </span>
                    <Users size={16} className="text-foreground/45 shrink-0" />
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64 border border-foreground/10 shadow-xl bg-background rounded-sm p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs font-sans font-medium">Adults</span>
                        <span className="text-[0.65rem] text-foreground/50">Age 13+</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => adjustCount("adults", -1, 1)} className="w-6 h-6 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 cursor-pointer"><Minus size={10} /></button>
                        <span className="text-sm font-mono font-medium">{formData.adults}</span>
                        <button onClick={() => adjustCount("adults", 1)} className="w-6 h-6 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 cursor-pointer"><Plus size={10} /></button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs font-sans font-medium">Children</span>
                        <span className="text-[0.65rem] text-foreground/50">Age 2-12</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => adjustCount("children", -1)} className="w-6 h-6 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 cursor-pointer"><Minus size={10} /></button>
                        <span className="text-sm font-mono font-medium">{formData.children}</span>
                        <button onClick={() => adjustCount("children", 1)} className="w-6 h-6 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 cursor-pointer"><Plus size={10} /></button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs font-sans font-medium">Pets</span>
                        <span className="text-[0.65rem] text-foreground/50">Dog / Cat</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => adjustCount("pets", -1)} className="w-6 h-6 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 cursor-pointer"><Minus size={10} /></button>
                        <span className="text-sm font-mono font-medium">{formData.pets}</span>
                        <button onClick={() => adjustCount("pets", 1)} className="w-6 h-6 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 cursor-pointer"><Plus size={10} /></button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

          {/* Restaurant Tab Fields */}
          {dockTab === "restaurant" && (
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch lg:items-center">
              {/* Date */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0 lg:border-r lg:border-foreground/10 lg:pr-4">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Reservation Date</span>
                <Popover open={restDateOpen} onOpenChange={setRestDateOpen}>
                  <PopoverTrigger className="flex items-center justify-between gap-2 text-sm font-sans font-medium text-foreground text-left cursor-pointer hover:text-brand transition-colors w-full min-h-[24px]">
                    <span className="flex-1 min-w-0 truncate">{formatDate(formData.restaurantDate)}</span>
                    <CalendarBlank size={16} className="text-foreground/45 shrink-0" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 border border-foreground/10 shadow-xl bg-background rounded-sm">
                    <Calendar
                      mode="single"
                      selected={formData.restaurantDate}
                      onSelect={(date) => {
                        if (date) updateFormData({ restaurantDate: date });
                        setRestDateOpen(false);
                      }}
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Slot */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0 lg:border-r lg:border-foreground/10 lg:pr-4">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Time Slot</span>
                <Select
                  value={formData.restaurantTime}
                  onValueChange={(val) => { if (val) updateFormData({ restaurantTime: val }); }}
                >
                  <SelectTrigger className="w-full border-0 shadow-none p-0 text-sm font-sans font-medium bg-transparent hover:text-brand cursor-pointer select-none text-left flex justify-between min-h-[24px]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="8:00 AM - 10:00 AM">Breakfast (8 AM - 10 AM)</SelectItem>
                    <SelectItem value="12:30 PM - 3:00 PM">Lunch (12:30 PM - 3 PM)</SelectItem>
                    <SelectItem value="4:30 PM - 6:30 PM">High Tea (4:30 PM - 6:30 PM)</SelectItem>
                    <SelectItem value="7:30 PM - 9:30 PM">Dinner 1st (7:30 PM - 9:30 PM)</SelectItem>
                    <SelectItem value="9:45 PM - 11:30 PM">Dinner 2nd (9:45 PM - 11:30 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Seating Preference */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0 lg:border-r lg:border-foreground/10 lg:pr-4">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Seating Area</span>
                <Select
                  value={formData.restaurantSeating}
                  onValueChange={(val) => { if (val) updateFormData({ restaurantSeating: val }); }}
                >
                  <SelectTrigger className="w-full border-0 shadow-none p-0 text-sm font-sans font-medium bg-transparent hover:text-brand cursor-pointer select-none text-left flex justify-between min-h-[24px]">
                    <SelectValue placeholder="Select seating" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="Indoor Lounge">Sophisticated Indoor Lounge</SelectItem>
                    <SelectItem value="Garden Patio">Open-air Garden Patio</SelectItem>
                    <SelectItem value="Chef's Cellar">Exclusive Wine Cellar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Diners Count */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Diners</span>
                <div className="flex items-center justify-between text-sm font-sans font-medium text-foreground w-full min-h-[24px]">
                  <span>{formData.restaurantDiners} Guests</span>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => adjustCount("restaurantDiners", -1, 1)} className="w-5 h-5 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 cursor-pointer"><Minus size={8} /></button>
                    <button onClick={() => adjustCount("restaurantDiners", 1)} className="w-5 h-5 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 cursor-pointer"><Plus size={8} /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Banquet Tab Fields */}
          {dockTab === "banquet" && (
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch lg:items-center">
              {/* Date */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0 lg:border-r lg:border-foreground/10 lg:pr-4">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Event Date</span>
                <Popover open={banquetDateOpen} onOpenChange={setBanquetDateOpen}>
                  <PopoverTrigger className="flex items-center justify-between gap-2 text-sm font-sans font-medium text-foreground text-left cursor-pointer hover:text-brand transition-colors w-full min-h-[24px]">
                    <span className="flex-1 min-w-0 truncate">{formatDate(formData.banquetDate)}</span>
                    <CalendarBlank size={16} className="text-foreground/45 shrink-0" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 border border-foreground/10 shadow-xl bg-background rounded-sm">
                    <Calendar
                      mode="single"
                      selected={formData.banquetDate}
                      onSelect={(date) => {
                        if (date) updateFormData({ banquetDate: date });
                        setBanquetDateOpen(false);
                      }}
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Event Duration */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0 lg:border-r lg:border-foreground/10 lg:pr-4">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Duration</span>
                <Select
                  value={formData.banquetDuration}
                  onValueChange={(val) => { if (val) updateFormData({ banquetDuration: val }); }}
                >
                  <SelectTrigger className="w-full border-0 shadow-none p-0 text-sm font-sans font-medium bg-transparent hover:text-brand cursor-pointer select-none text-left flex justify-between min-h-[24px]">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="4 Hours">Half Day (4 Hours)</SelectItem>
                    <SelectItem value="8 Hours">Full Day (8 Hours)</SelectItem>
                    <SelectItem value="Multi-Day">Multi-Day Summit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Layout Setup */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0 lg:border-r lg:border-foreground/10 lg:pr-4">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Hall Layout</span>
                <Select
                  value={formData.banquetLayout}
                  onValueChange={(val) => { if (val) updateFormData({ banquetLayout: val }); }}
                >
                  <SelectTrigger className="w-full border-0 shadow-none p-0 text-sm font-sans font-medium bg-transparent hover:text-brand cursor-pointer select-none text-left flex justify-between min-h-[24px]">
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="Round Tables">Gala Round Tables</SelectItem>
                    <SelectItem value="Theater Style">Theater / Conference</SelectItem>
                    <SelectItem value="U-Shape Setup">Corporate U-Shape</SelectItem>
                    <SelectItem value="Classroom Layout">Classroom Layout</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Guests counter */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Expected Guests</span>
                <div className="flex items-center justify-between text-sm font-sans font-medium text-foreground w-full min-h-[24px]">
                  <span>{formData.banquetGuests} Guests</span>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => adjustCount("banquetGuests", -25, 20)} className="w-5 h-5 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 cursor-pointer"><Minus size={8} /></button>
                    <button onClick={() => adjustCount("banquetGuests", 25)} className="w-5 h-5 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 cursor-pointer"><Plus size={8} /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Social Gathering Tab Fields */}
          {dockTab === "social-gathering" && (
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch lg:items-center">
              {/* Date */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0 lg:border-r lg:border-foreground/10 lg:pr-4">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Event Date</span>
                <Popover open={gatheringDateOpen} onOpenChange={setGatheringDateOpen}>
                  <PopoverTrigger className="flex items-center justify-between gap-2 text-sm font-sans font-medium text-foreground text-left cursor-pointer hover:text-brand transition-colors w-full min-h-[24px]">
                    <span className="flex-1 min-w-0 truncate">{formatDate(formData.gatheringDate)}</span>
                    <CalendarBlank size={16} className="text-foreground/45 shrink-0" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 border border-foreground/10 shadow-xl bg-background rounded-sm">
                    <Calendar
                      mode="single"
                      selected={formData.gatheringDate}
                      onSelect={(date) => {
                        if (date) updateFormData({ gatheringDate: date });
                        setGatheringDateOpen(false);
                      }}
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Space Selection */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0 lg:border-r lg:border-foreground/10 lg:pr-4">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Venue / Space</span>
                <Select
                  value={formData.gatheringSpace}
                  onValueChange={(val) => { if (val) updateFormData({ gatheringSpace: val }); }}
                >
                  <SelectTrigger className="w-full border-0 shadow-none p-0 text-sm font-sans font-medium bg-transparent hover:text-brand cursor-pointer select-none text-left flex justify-between min-h-[24px]">
                    <SelectValue placeholder="Select venue" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="Rooftop Sky Deck">Rooftop Sky Deck</SelectItem>
                    <SelectItem value="Poolside Lawn Deck">Poolside Lawn Deck</SelectItem>
                    <SelectItem value="Cigar & Whiskey Lounge">Cigar & Whiskey Lounge</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Catering Selection */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0 lg:border-r lg:border-foreground/10 lg:pr-4">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Catering Package</span>
                <Select
                  value={formData.gatheringCatering}
                  onValueChange={(val) => { if (val) updateFormData({ gatheringCatering: val }); }}
                >
                  <SelectTrigger className="w-full border-0 shadow-none p-0 text-sm font-sans font-medium bg-transparent hover:text-brand cursor-pointer select-none text-left flex justify-between min-h-[24px]">
                    <SelectValue placeholder="Select catering" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-foreground/10 rounded-sm shadow-lg">
                    <SelectItem value="Mixologist & Open Bar">Open Bar & Finger Foods</SelectItem>
                    <SelectItem value="Live BBQ Grill Station">Live BBQ & Grill Station</SelectItem>
                    <SelectItem value="Royal Buffet Dinner">Royal Buffet Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Guest Count */}
              <div className="flex flex-col gap-1 border border-foreground/10 rounded-sm p-3 bg-foreground/[0.01] lg:bg-transparent lg:border-0 lg:p-0">
                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-foreground/45">Attendees</span>
                <div className="flex items-center justify-between text-sm font-sans font-medium text-foreground w-full min-h-[24px]">
                  <span>{formData.gatheringGuests} Guests</span>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => adjustCount("gatheringGuests", -5, 10)} className="w-5 h-5 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 cursor-pointer"><Minus size={8} /></button>
                    <button onClick={() => adjustCount("gatheringGuests", 5)} className="w-5 h-5 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 cursor-pointer"><Plus size={8} /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Book Now Action Button */}
          <button
            onClick={handleBookNow}
            className="bg-foreground text-background font-mono text-[0.7rem] font-medium uppercase tracking-widest w-full lg:w-auto px-8 h-12 rounded-sm lg:rounded-full cursor-pointer hover:bg-foreground/80 hover:scale-[1.02] lg:hover:scale-105 active:scale-95 transition-all duration-300 shadow-md flex items-center justify-center whitespace-nowrap"
          >
            {dockTab === "rooms" ? "Book Stay" : dockTab === "restaurant" ? "Reserve Table" : "Request Venue"}
          </button>
        </div>

      </div>
    </div>
  );
}
