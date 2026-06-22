import ImageSlider from "@/components/animated/image-slider"
import BookingSection from "@/features/Booking/booking-section"
import About from "@/features/About/about"
import Testimonial from "@/features/Testimonial/testimonial"
import Container from "@/components/core/container"

export default function Page() {
  return (
    <div className="flex flex-col gap-16 min-h-svh">
      <ImageSlider />
      <Container className="py-0">
        <BookingSection />
      </Container>
      <About />
      <Testimonial />
    </div>
  )
}

