import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { motion } from "motion/react";

export const games = [
  {
    id: 1,
    title: "VR Zombie Shooter",
    image: "/assets/generated/vr-zombie-shooter.dim_600x400.jpg",
    desc: "Survive the undead apocalypse in full immersive VR. Your heart will pound!",
    tag: "Horror",
    tagColor: "red" as const,
  },
  {
    id: 2,
    title: "VR Cricket",
    image: "/assets/generated/vr-cricket.dim_600x400.jpg",
    desc: "Step onto a virtual cricket field. Feel the thrill of every boundary!",
    tag: "Sports",
    tagColor: "blue" as const,
  },
  {
    id: 3,
    title: "Racing Simulator",
    image: "/assets/generated/racing-simulator.dim_600x400.jpg",
    desc: "Race through neon-lit cyberpunk cities at breakneck speed.",
    tag: "Racing",
    tagColor: "purple" as const,
  },
  {
    id: 4,
    title: "Multiplayer VR Battles",
    image: "/assets/generated/multiplayer-vr-battle.dim_600x400.jpg",
    desc: "Battle your friends in epic multi-player virtual reality arenas.",
    tag: "Multiplayer",
    tagColor: "blue" as const,
  },
  {
    id: 5,
    title: "PS5 Gaming",
    image: "/assets/generated/ps5-gaming.dim_600x400.jpg",
    desc: "Experience the latest PS5 titles on stunning 4K displays.",
    tag: "Console",
    tagColor: "purple" as const,
  },
  {
    id: 6,
    title: "Party Games",
    image: "/assets/generated/party-games.dim_600x400.jpg",
    desc: "Perfect for birthdays and group fun. Everyone plays, everyone wins!",
    tag: "Party",
    tagColor: "red" as const,
  },
];

const tagStyles = {
  blue: "bg-neon-blue/20 text-neon-blue border-neon-blue/40",
  purple: "bg-neon-purple/20 text-neon-purple border-neon-purple/40",
  red: "bg-neon-red/20 text-neon-red border-neon-red/40",
};

export function GamesSection() {
  const handleBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="games" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-neon-blue font-semibold uppercase tracking-widest text-sm mb-3">
            Explore
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black">
            Our <span className="text-neon-blue glow-blue">Epic</span> Games
          </h2>
          <div className="cyber-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              data-ocid={`games.item.${game.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -6 }}
              className="group relative rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 hover:shadow-neon-blue hover:border-neon-blue/50"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                {/* Tag */}
                <span
                  className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold border ${tagStyles[game.tagColor]}`}
                >
                  {game.tag}
                </span>
                {/* Neon scan line on hover */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {game.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {game.desc}
                </p>
                <Button
                  data-ocid={`games.play_now.button.${game.id}`}
                  onClick={handleBooking}
                  size="sm"
                  className="w-full bg-neon-blue/20 border border-neon-blue/60 text-neon-blue hover:bg-neon-blue hover:text-background font-bold transition-all duration-300"
                >
                  <Zap className="w-4 h-4" />
                  Play Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
