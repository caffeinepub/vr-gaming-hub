import { Toaster } from "@/components/ui/sonner";
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
import { WhyChooseUs } from "./components/WhyChooseUs";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ── Hero ───────────────────────────────────────── */}
      <HeroSection />

      {/* ── Why Choose Us ──────────────────────────────── */}
      <CTAStrip
        variant="blue"
        text="🎮 Open Every Day 11AM–11PM · Walk-ins Welcome!"
      />
      <WhyChooseUs />

      {/* ── Games ──────────────────────────────────────── */}
      <CTAStrip
        variant="purple"
        text="⚡ 6 Immersive VR Experiences Await You!"
      />
      <GamesSection />

      {/* ── Pricing ────────────────────────────────────── */}
      <CTAStrip variant="blue" text="🏆 Best Prices in Hyderabad · Book Now!" />
      <PricingSection />

      {/* ── Birthday & Party ───────────────────────────── */}
      <CTAStrip
        variant="purple"
        text="🎂 Plan Your Perfect Birthday Party Today!"
      />
      <PartySection />

      {/* ── Reviews ────────────────────────────────────── */}
      <CTAStrip variant="blue" text="⭐ 4.9 Stars from 700+ Happy Gamers!" />
      <ReviewsSection />

      {/* ── Gallery ────────────────────────────────────── */}
      <GallerySection />

      {/* ── Booking Form ───────────────────────────────── */}
      <CTAStrip
        variant="purple"
        text="🎯 Book Your Game Session in 60 Seconds!"
      />
      <BookingForm />

      {/* ── Leaderboard ────────────────────────────────── */}
      <LeaderboardSection />

      {/* ── Location ───────────────────────────────────── */}
      <CTAStrip
        variant="blue"
        text="📍 Located in Santosh Nagar, Hyderabad · Easy to Find!"
      />
      <LocationSection />

      {/* ── Contact ────────────────────────────────────── */}
      <ContactSection />

      {/* ── Footer ─────────────────────────────────────── */}
      <Footer />

      {/* ── Floating Elements ──────────────────────────── */}
      <FloatingWhatsApp />

      <Toaster position="bottom-left" theme="dark" />
    </div>
  );
}
