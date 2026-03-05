import { motion } from "motion/react";

const features = [
  {
    emoji: "⭐",
    title: "4.9 Rating from 700+ Gamers",
    desc: "Consistently rated Hyderabad's best VR experience. Our gamers keep coming back for more!",
    color: "blue" as const,
  },
  {
    emoji: "🎮",
    title: "Latest VR Games & PS5",
    desc: "We keep our library fresh with the newest VR titles and PlayStation 5 games.",
    color: "purple" as const,
  },
  {
    emoji: "👨‍👩‍👧",
    title: "Fun for Kids & Adults",
    desc: "A safe, exciting environment perfectly suited for all ages — from kids to adults.",
    color: "red" as const,
  },
  {
    emoji: "🧟‍♂️",
    title: "Immersive Zombie & Action",
    desc: "Heart-pounding zombie shooters and action games that blur the line between virtual and reality.",
    color: "blue" as const,
  },
  {
    emoji: "🏏",
    title: "VR Cricket Experience",
    desc: "Step onto a virtual cricket pitch and experience every boundary, wicket, and six in VR!",
    color: "purple" as const,
  },
  {
    emoji: "❄️",
    title: "Comfortable Gaming Environment",
    desc: "Air-conditioned, spacious, and clean gaming bays with top-quality equipment.",
    color: "red" as const,
  },
];

const glowMap = {
  blue: "hover:box-glow-blue hover:border-neon-blue/60",
  purple: "hover:box-glow-purple hover:border-neon-purple/60",
  red: "hover:box-glow-red hover:border-neon-red/60",
};

const emojiGlowMap = {
  blue: "group-hover:drop-shadow-[0_0_8px_oklch(0.78_0.25_220)]",
  purple: "group-hover:drop-shadow-[0_0_8px_oklch(0.58_0.32_300)]",
  red: "group-hover:drop-shadow-[0_0_8px_oklch(0.58_0.28_25)]",
};

const gradientMap = {
  blue: "from-neon-blue/20 to-transparent",
  purple: "from-neon-purple/20 to-transparent",
  red: "from-neon-red/20 to-transparent",
};

export function WhyChooseUs() {
  return (
    <section id="why" className="py-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.58 0.32 300) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-neon-blue font-semibold uppercase tracking-widest text-sm mb-3">
            Why Choose Us
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-foreground">
            Hyderabad's{" "}
            <span className="text-neon-purple glow-purple">Most Epic</span>{" "}
            Gaming Center
          </h2>
          <div className="cyber-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`group relative rounded-xl border border-border bg-card p-6 cursor-default transition-all duration-300 overflow-hidden ${glowMap[feat.color]}`}
            >
              {/* Animated gradient border top */}
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradientMap[feat.color]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="flex items-start gap-4">
                <span
                  className={`text-4xl transition-all duration-300 ${emojiGlowMap[feat.color]}`}
                >
                  {feat.emoji}
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2 leading-tight">
                    {feat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
