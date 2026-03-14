import { Clock, Instagram, MapPin, Phone, Youtube, Zap } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Games", href: "#games" },
  { label: "Pricing", href: "#pricing" },
  { label: "Birthday Party", href: "#party" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card/50">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-60" />

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-neon-blue/20 border border-neon-blue/40 flex items-center justify-center">
                <Zap className="w-6 h-6 text-neon-blue" />
              </div>
              <div>
                <p className="font-display font-black text-xl text-neon-blue glow-blue">
                  VRHub
                </p>
                <p className="text-muted-foreground text-xs">
                  Hyderabad's #1 VR Center
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Experience the future of gaming at Hyderabad's most immersive VR
              gaming center. Open 11AM–11PM, every single day.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://instagram.com/vrgaminghub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-pink-500/60 hover:bg-pink-500/10 transition-all group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-pink-400 transition-colors" />
              </a>
              <a
                href="https://youtube.com/@vrgaminghub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-red-500/60 hover:bg-red-500/10 transition-all group"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 text-muted-foreground group-hover:text-red-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-muted-foreground text-sm hover:text-neon-blue transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
              Visit Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neon-red shrink-0 mt-0.5" />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  2nd Floor, Al Quraishi Plex,
                  <br />
                  Santosh Nagar, Hyderabad 500059
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neon-blue shrink-0" />
                <a
                  href="tel:+918985866377"
                  className="text-muted-foreground hover:text-neon-blue text-sm transition-colors"
                >
                  089858 66377
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neon-green shrink-0" />
                <p className="text-muted-foreground text-sm">
                  11:00 AM – 11:00 PM (All Days)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 text-center">
          <p className="text-muted-foreground text-sm">
            © {year} VRHub. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-blue hover:glow-blue transition-all"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
