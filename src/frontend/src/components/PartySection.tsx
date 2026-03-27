import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

const WA_URL =
  "https://wa.me/918985866377?text=I'd%20like%20to%20plan%20a%20party%20at%20VR%20Gaming%20Hub";

const events = [
  {
    emoji: "🎂",
    title: "Birthday Celebrations",
    desc: "Make your birthday legendary with VR gaming, decorations, and memorable moments.",
  },
  {
    emoji: "🏆",
    title: "Friends Gaming Tournaments",
    desc: "Gather your squad for competitive VR battles and find out who's the ultimate gamer.",
  },
  {
    emoji: "👔",
    title: "Corporate Fun Events",
    desc: "Team building with a twist — VR gaming creates genuine bonds and unforgettable laughs.",
  },
  {
    emoji: "🎒",
    title: "School Outings",
    desc: "Educational and thrilling — the perfect outing for school groups of all ages.",
  },
];

export function PartySection() {
  return (
    <section id="party" className="py-20 relative overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/birthday-party.dim_800x500.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-background/85" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.58 0.28 25 / 0.15), transparent)",
        }}
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-neon-red font-semibold uppercase tracking-widest text-sm mb-3">
            Celebrations
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black">
            Make It a Party to{" "}
            <span className="text-neon-red glow-red">Remember!</span>
          </h2>
          <p className="text-gray-200 mt-4 max-w-2xl mx-auto text-lg">
            From intimate birthday celebrations to large corporate events —
            we've got you covered.
          </p>
          <div className="cyber-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="rounded-xl border border-neon-red/30 bg-card/80 backdrop-blur-sm p-6 text-center transition-all duration-300 hover:border-neon-red/70 hover:shadow-neon-red"
            >
              <div className="text-5xl mb-4">{event.emoji}</div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">
                {event.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {event.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <a href={WA_URL} target="_blank" rel="noopener noreferrer">
            <Button
              data-ocid="party.plan_party.button"
              size="lg"
              className="bg-neon-red text-background font-bold text-lg px-10 py-6 hover:bg-neon-red/90 shadow-neon-red animate-pulse-glow"
            >
              <MessageCircle className="w-5 h-5" />
              Plan Your Party on WhatsApp
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
