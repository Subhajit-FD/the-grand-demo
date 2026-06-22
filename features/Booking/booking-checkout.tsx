"use client";

import React, { useState } from "react";
import { useBooking } from "./booking-context";
import { ArrowRight, ArrowLeft, CreditCard, User, Envelope, Phone } from "@phosphor-icons/react";

export default function BookingCheckout() {
  const { formData, updateFormData, nextStep, prevStep } = useBooking();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Formatting helpers
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      updateFormData({ cardNumber: parts.join(" ") });
    } else {
      updateFormData({ cardNumber: value });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      updateFormData({ cardExpiry: `${value.slice(0, 2)}/${value.slice(2)}` });
    } else {
      updateFormData({ cardExpiry: value });
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    updateFormData({ cardCvv: value });
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.email.trim().includes("@") &&
      formData.phone.trim() !== "" &&
      formData.cardNumber.replace(/\s/g, "").length === 16 &&
      formData.cardExpiry.length === 5 &&
      formData.cardCvv.length === 3
    );
  };

  return (
    <div className="flex flex-col gap-6 h-full justify-between">
      <div>
        <span className="text-[0.65rem] font-mono uppercase tracking-widest text-foreground/45">Step 3 of 3</span>
        <h3 className="text-2xl font-sans tracking-tight mt-1 text-foreground">
          Guest & Billing Details
        </h3>
        <p className="text-xs text-foreground/60 mt-1">
          Please enter your contact details and mock payment information to complete the booking demo.
        </p>

        {/* Outer Split (Virtual Card Left, Forms Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          
          {/* Virtual Card (Left 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center">
            <div className="relative w-full aspect-[1.586/1] bg-linear-to-br from-neutral-800 to-neutral-900 border border-neutral-700/50 rounded-sm p-5 shadow-xl flex flex-col justify-between overflow-hidden text-neutral-100 font-mono">
              {/* Card Texture Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand/5 rounded-full blur-2xl -ml-10 -mb-10" />

              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.65rem] uppercase tracking-widest text-neutral-400">The Grand</span>
                  <span className="text-[0.5rem] uppercase tracking-wider text-brand">Exclusive Member</span>
                </div>
                <div className="w-8 h-6 bg-neutral-700/50 rounded-xs flex items-center justify-center">
                  <span className="text-[0.55rem] font-sans font-medium text-neutral-300">VISA</span>
                </div>
              </div>

              {/* Card Chip */}
              <div className="w-8 h-6 rounded-xs bg-linear-to-r from-amber-200/50 to-amber-300/40 relative">
                <div className="absolute inset-x-2 inset-y-1.5 border border-neutral-900/10 rounded-2xs" />
              </div>

              {/* Card Number */}
              <div className="text-base tracking-wider text-center py-1">
                {formData.cardNumber || "•••• •••• •••• ••••"}
              </div>

              {/* Card Footer (Holder & Expiry) */}
              <div className="flex items-end justify-between text-xs">
                <div className="flex flex-col gap-0.5 max-w-[70%]">
                  <span className="text-[0.5rem] uppercase text-neutral-500">Cardholder</span>
                  <span className="truncate uppercase tracking-wider text-[0.65rem]">
                    {formData.cardHolder || formData.fullName || "GUEST NAME"}
                  </span>
                </div>
                <div className="flex items-end gap-4 text-right">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.5rem] uppercase text-neutral-500">Expiry</span>
                    <span className="text-[0.65rem] tracking-wider">{formData.cardExpiry || "MM/YY"}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.5rem] uppercase text-neutral-500">CVV</span>
                    <span className="text-[0.65rem] tracking-wider">{formData.cardCvv || "•••"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Forms (Right 7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:max-h-[300px] lg:overflow-y-auto pr-1">
            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => updateFormData({ fullName: e.target.value, cardHolder: e.target.value })}
                    className="w-full bg-white/5 border border-foreground/10 rounded-sm py-2 pl-8 pr-3 text-xs text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all"
                  />
                  <User size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground/45" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    className="w-full bg-white/5 border border-foreground/10 rounded-sm py-2 pl-8 pr-3 text-xs text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all"
                  />
                  <Envelope size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground/45" />
                </div>
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    className="w-full bg-white/5 border border-foreground/10 rounded-sm py-2 pl-8 pr-3 text-xs text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all"
                  />
                  <Phone size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground/45" />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 border-t border-foreground/10 pt-3">
              <div className="flex flex-col gap-1 md:col-span-4">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="4111 2222 3333 4444"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    className="w-full bg-white/5 border border-foreground/10 rounded-sm py-2 pl-8 pr-3 text-xs text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all"
                  />
                  <CreditCard size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground/45" />
                </div>
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">Expiry Date</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  value={formData.cardExpiry}
                  onChange={handleExpiryChange}
                  className="w-full bg-white/5 border border-foreground/10 rounded-sm py-2 px-3 text-xs text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all"
                />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-[0.65rem] font-mono uppercase tracking-wider text-foreground/50">CVV</label>
                <input
                  type="password"
                  required
                  placeholder="•••"
                  value={formData.cardCvv}
                  onChange={handleCvvChange}
                  className="w-full bg-white/5 border border-foreground/10 rounded-sm py-2 px-3 text-xs text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all"
                />
              </div>
            </div>

          </div>
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
          disabled={!isFormValid()}
          onClick={nextStep}
          className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest bg-foreground text-background rounded-full px-6 py-3 hover:bg-foreground/80 disabled:opacity-40 disabled:pointer-events-none cursor-pointer shadow-md font-medium"
        >
          <span>Complete Reservation</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
