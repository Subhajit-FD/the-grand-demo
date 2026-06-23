"use client"
import useMobile from "@/hooks/useMobile"
import Link from "next/link"
import Navbar from "@/features/Navbar/navbar"
import MobileNavbar from "@/features/Navbar/mobile-navbar"
import { useBooking } from "@/features/Booking/booking-context"

const Links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Rooms",
    href: "/rooms",
  },
  {
    title: "Gallery",
    href: "/gallery",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Contact us",
    href: "/contact-us",
  },
]

const Header = () => {
  const isMobile = useMobile()
  const { openBooking } = useBooking()

  return (
    <header className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-foreground/5 bg-background">
      <div className="logo">
        <Link href="/">
          <h1 className="text-xl font-medium tracking-wide">The Grand</h1>
        </Link>
      </div>
      <div className="flex items-center gap-6">
        {isMobile ? <MobileNavbar links={Links} /> : <Navbar links={Links} />}
        {!isMobile && (
          <button
            onClick={() => openBooking("rooms")}
            className="text-xs uppercase font-mono tracking-widest bg-foreground text-background rounded-full px-5 py-2.5 transition-all duration-300 hover:bg-foreground/80 hover:scale-105 active:scale-95 font-medium cursor-pointer"
          >
            Book Now
          </button>
        )}
      </div>
    </header>
  )
}

export default Header

