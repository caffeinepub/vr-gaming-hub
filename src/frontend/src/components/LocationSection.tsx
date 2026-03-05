import { Button } from "@/components/ui/button";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { motion } from "motion/react";

export function LocationSection() {
  return (
    <section id="location" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-neon-blue font-semibold uppercase tracking-widest text-sm mb-3">
            Location
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black">
            Find Us in{" "}
            <span className="text-neon-blue glow-blue">Hyderabad</span>
          </h2>
          <div className="cyber-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 rounded-2xl overflow-hidden border border-neon-blue/30 shadow-neon-blue relative"
            style={{ height: "380px" }}
          >
            <iframe
              src="https://maps.google.com/maps?q=2nd+Floor+Al+Quraishi+Plex+Maruthi+Nagar+Santosh+Nagar+Hyderabad+Telangana+500059&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              title="VR Gaming Hub Location"
              data-ocid="contact.map_marker"
              className="grayscale-[30%] contrast-[1.1]"
            />
            {/* Neon frame accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-red pointer-events-none" />
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Address */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neon-blue mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Address</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    2nd Floor, Al Quraishi Plex,
                    <br />
                    9-8-147, Maruthi Nagar,
                    <br />
                    New Santoshnagar, Santosh Nagar,
                    <br />
                    Hyderabad, Telangana 500059
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-neon-purple mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    Opening Hours
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Every Day:{" "}
                    <span className="text-neon-green font-semibold">
                      11:00 AM – 11:00 PM
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Open all days including holidays!
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-neon-red mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Phone</p>
                  <a
                    href="tel:+918985866377"
                    className="text-neon-blue hover:glow-blue transition-all text-lg font-bold"
                  >
                    089858 66377
                  </a>
                </div>
              </div>
            </div>

            {/* Directions CTA */}
            <a
              href="https://maps.google.com/maps?q=2nd+Floor+Al+Quraishi+Plex+Maruthi+Nagar+Santosh+Nagar+Hyderabad+Telangana+500059"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full bg-neon-blue text-background font-bold hover:bg-neon-blue/90 shadow-neon-blue">
                <Navigation className="w-4 h-4" />
                Get Directions
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
