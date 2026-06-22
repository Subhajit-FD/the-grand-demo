import { Geist_Mono, DM_Sans, Playfair_Display } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils";
import Header from "@/components/core/header";
import Footer from "@/components/core/footer";
import { BookingProvider } from "@/features/Booking/booking-context";
import BookingModal from "@/features/Booking/booking-modal";

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const dmSans = DM_Sans({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", dmSans.variable, playfairDisplayHeading.variable)}
    >
      <body>
        <BookingProvider>
          <Header />
          {children}
          <BookingModal />
          <Footer />
        </BookingProvider>
      </body>
    </html>
  )
}

