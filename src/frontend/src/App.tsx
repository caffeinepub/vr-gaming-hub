import { Toaster } from "@/components/ui/sonner";
import { AdminDashboard } from "./components/AdminDashboard";
import { BookingForm } from "./components/BookingForm";
import { CTAStrip } from "./components/CTAStrip";
import { ContactSection } from "./components/ContactSection";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Footer } from "./components/Footer";
import { GallerySection } from "./components/GallerySection";
import { GamesSection } from "./components/GamesSection";
import { HeroSection } from "./components/HeroSection";
import { LeaderboardSection } from "./components/LeaderboardSection";
import { LocationSection } from "./components/LocationSection";
import { Navbar } from "./components/Navbar";
import { PartySection } from "./components/PartySection";
import { PricingSection } from "./components/PricingSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { VerifiedTicketPage } from "./components/VerifiedTicketPage";
import { WhyChooseUs } from "./components/WhyChooseUs";

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <CTAStrip
        variant="blue"
        text="🎮 Open Every Day 11AM–11PM · Walk-ins Welcome!"
      />
      <WhyChooseUs />
      <CTAStrip
        variant="purple"
        text="⚡ 6 Immersive VR Experiences Await You!"
      />
      <GamesSection />
      <CTAStrip variant="blue" text="🏆 Best Prices in Hyderabad · Book Now!" />
      <PricingSection />
      <CTAStrip
        variant="purple"
        text="🎂 Plan Your Perfect Birthday Party Today!"
      />
      <PartySection />
      <CTAStrip variant="blue" text="⭐ 4.9 Stars from 700+ Happy Gamers!" />
      <ReviewsSection />
      <GallerySection />
      <CTAStrip
        variant="purple"
        text="🎯 Book Your Game Session in 60 Seconds!"
      />
      <BookingForm />
      <LeaderboardSection />
      <CTAStrip
        variant="blue"
        text="📍 Located in Santosh Nagar, Hyderabad · Easy to Find!"
      />
      <LocationSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  const path = window.location.pathname;

  if (path === "/admin-dashboard")
    return (
      <>
        <AdminDashboard />
        <Toaster position="bottom-left" theme="dark" />
      </>
    );
  if (path === "/verified-ticket")
    return (
      <>
        <VerifiedTicketPage />
        <Toaster position="bottom-left" theme="dark" />
      </>
    );

  return (
    <>
      <HomePage />
      <Toaster position="bottom-left" theme="dark" />
    </>
  );
}
