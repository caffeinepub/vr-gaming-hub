import { Button } from "@/components/ui/button";
import {
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-neon-red font-semibold uppercase tracking-widest text-sm mb-3">
            Get In Touch
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black">
            Contact <span className="text-neon-red glow-red">Us</span>
          </h2>
          <div className="cyber-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="rounded-xl border border-border bg-card p-6 text-center hover:border-neon-blue/60 hover:shadow-neon-blue transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-neon-blue" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
            <a
              href="tel:+918985866377"
              data-ocid="contact.phone.button"
              className="text-neon-blue font-bold hover:glow-blue transition-all text-lg block"
            >
              089858 66377
            </a>
            <p className="text-muted-foreground text-xs mt-1">
              Available 11AM–11PM
            </p>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-xl border border-border bg-card p-6 text-center hover:border-neon-green/60 hover:shadow-neon-green transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-foreground mb-3">WhatsApp</h3>
            <a
              href="https://wa.me/918985866377"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.whatsapp.button"
            >
              <Button
                size="sm"
                className="w-full bg-green-500 text-white hover:bg-green-500/90"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </Button>
            </a>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="rounded-xl border border-border bg-card p-6 text-center hover:border-neon-purple/60 hover:shadow-neon-purple transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-neon-purple" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Email</h3>
            <a
              href="mailto:info@vrgaminghub.in"
              className="text-neon-purple font-medium hover:glow-purple transition-all text-sm break-all"
            >
              info@vrgaminghub.in
            </a>
            <p className="text-muted-foreground text-xs mt-1">
              Replies within 24 hours
            </p>
          </motion.div>

          {/* Address & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            className="rounded-xl border border-border bg-card p-6 text-center hover:border-neon-red/60 hover:shadow-neon-red transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-neon-red/20 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-neon-red" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Address</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              2nd Floor, Al Quraishi Plex,
              <br />
              Santosh Nagar, Hyderabad
            </p>
            <div className="flex items-center justify-center gap-1 mt-2 text-neon-green text-xs">
              <Clock className="w-3 h-3" />
              <span>11AM – 11PM Daily</span>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 mt-10"
        >
          <a
            href="https://instagram.com/vrgaminghub"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center hover:border-pink-500/60 hover:bg-pink-500/10 transition-all duration-300 group"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-pink-400 transition-colors" />
          </a>
          <a
            href="https://youtube.com/@vrgaminghub"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center hover:border-red-500/60 hover:bg-red-500/10 transition-all duration-300 group"
            aria-label="YouTube"
          >
            <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-red-400 transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
