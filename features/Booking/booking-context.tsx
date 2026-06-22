"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type BookingType = "rooms" | "restaurant" | "banquet" | "social-gathering";

export interface BookingFormData {
  // Rooms Fields
  checkIn: Date;
  checkOut: Date;
  roomType: string;
  adults: number;
  children: number;
  pets: number;
  roomsCount: number;

  // Restaurant Fields
  restaurantDate: Date;
  restaurantTime: string;
  restaurantSeating: string;
  restaurantDiners: number;

  // Banquet Fields
  banquetDate: Date;
  banquetDuration: string;
  banquetLayout: string;
  banquetGuests: number;

  // Social Gathering Fields
  gatheringDate: Date;
  gatheringSpace: string;
  gatheringCatering: string;
  gatheringGuests: number;

  // Guest & Payment Info
  fullName: string;
  email: string;
  phone: string;
  cardNumber: string;
  cardHolder: string;
  cardExpiry: string;
  cardCvv: string;
}

export interface AddonItem {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: "once" | "night" | "person";
}

interface BookingContextProps {
  isOpen: boolean;
  activeTab: BookingType;
  currentStep: number; // 1: Dock/Configure, 2: Addons, 3: Checkout, 4: Success
  formData: BookingFormData;
  selectedAddons: string[];
  openBooking: (tab?: BookingType, initialData?: Partial<BookingFormData>) => void;
  closeBooking: () => void;
  setTab: (tab: BookingType) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<BookingFormData>) => void;
  toggleAddon: (addonId: string) => void;
  resetBooking: () => void;
}

const defaultFormData: BookingFormData = {
  checkIn: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
  checkOut: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // day after tomorrow
  roomType: "grand-suite",
  adults: 2,
  children: 0,
  pets: 0,
  roomsCount: 1,

  restaurantDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  restaurantTime: "7:30 PM - 9:30 PM",
  restaurantSeating: "Indoor Lounge",
  restaurantDiners: 2,

  banquetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week out
  banquetDuration: "Full Day",
  banquetLayout: "Round Tables",
  banquetGuests: 150,

  gatheringDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days out
  gatheringSpace: "Rooftop Sky Deck",
  gatheringCatering: "Mixologist & Open Bar",
  gatheringGuests: 40,

  fullName: "",
  email: "",
  phone: "",
  cardNumber: "",
  cardHolder: "",
  cardExpiry: "",
  cardCvv: "",
};

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<BookingType>("rooms");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>(defaultFormData);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const openBooking = (tab?: BookingType, initialData?: Partial<BookingFormData>) => {
    if (tab) {
      setActiveTab(tab);
    }
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
    setIsOpen(true);
    setCurrentStep(2); // When triggering "Book Now" directly, we proceed to upgrades/addons (Step 2)
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  const setTab = (tab: BookingType) => {
    setActiveTab(tab);
  };

  const setStep = (step: number) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const updateFormData = (data: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const resetBooking = () => {
    setFormData(defaultFormData);
    setSelectedAddons([]);
    setCurrentStep(1);
  };

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        activeTab,
        currentStep,
        formData,
        selectedAddons,
        openBooking,
        closeBooking,
        setTab,
        setStep,
        nextStep,
        prevStep,
        updateFormData,
        toggleAddon,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
