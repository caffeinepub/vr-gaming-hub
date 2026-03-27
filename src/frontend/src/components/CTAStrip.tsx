import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { motion } from "motion/react";

interface CTAStripProps {
  variant?: "blue" | "purple";
  text?: string;
}

export function CTAStrip({
  variant = "blue",
  text = "Book Your Game Today — Walk in or Book in Advance!",
}: CTAStripProps) {
  const handleScroll = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const bgClass =
    variant === "blue"
      ? "bg-gradient-to-r from-neon-blue/20 via-neon-blue/10 to-transparent border-neon-blue/30"
      : "bg-gradient-to-r from-neon-purple/20 via-neon-purple/10 to-transparent border-neon-purple/30";

  const btnClass =
    variant === "blue"
      ? "bg-neon-blue text-background hover:bg-neon-blue/90 shadow-neon-blue"
      : "bg-neon-purple text-background hover:bg-neon-purple/90 shadow-neon-purple";

  const textClass = variant === "blue" ? "text-neon-blue" : "text-neon-purple";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ filter: "brightness(1.12)" }}
      className={`border-y ${bgClass} py-4 px-4`}
    >
      <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className={`font-display font-bold text-lg ${textClass} text-center sm:text-left`}
        >
          <motion.span
            className="inline-block mr-2"
            whileHover={{ rotate: 15, scale: 1.3 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Zap className="inline w-5 h-5" />
          </motion.span>
          {text}
        </p>
        <Button
          onClick={handleScroll}
          className={`${btnClass} font-bold shrink-0 px-6`}
        >
          Book Now
        </Button>
      </div>
    </motion.div>
  );
}
