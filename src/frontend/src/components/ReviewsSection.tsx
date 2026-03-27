import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

const reviews = [
  {
    name: "Rahul K.",
    avatar: "RK",
    rating: 5,
    text: "Amazing VR experience and great staff. Best gaming place I've been to in Hyderabad!",
    date: "2 weeks ago",
  },
  {
    name: "Priya S.",
    avatar: "PS",
    rating: 5,
    text: "Best gaming place in Santosh Nagar. Came for a birthday and had an absolute blast!",
    date: "1 month ago",
  },
  {
    name: "Arjun M.",
    avatar: "AM",
    rating: 5,
    text: "Zombie game felt super realistic. My hands were literally shaking after! 10/10 recommend.",
    date: "3 weeks ago",
  },
  {
    name: "Sneha R.",
    avatar: "SR",
    rating: 5,
    text: "Took my kids here and they absolutely loved it. Very safe and fun environment.",
    date: "1 week ago",
  },
  {
    name: "Vikram T.",
    avatar: "VT",
    rating: 5,
    text: "VR Cricket is insane! Felt like I was actually on the pitch. Will come back every week!",
    date: "2 months ago",
  },
  {
    name: "Divya P.",
    avatar: "DP",
    rating: 5,
    text: "Great place for a group outing. The staff was super helpful and the games are top quality.",
    date: "1 month ago",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, idx) => `star-${idx}`).map((k) => (
        <Star key={k} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10"
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
          className="text-center mb-10"
        >
          <p className="text-neon-purple font-semibold uppercase tracking-widest text-sm mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black">
            What Our{" "}
            <span className="text-neon-purple glow-purple">Gamers Say</span>
          </h2>

          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 mt-6 px-6 py-3 rounded-full border border-yellow-400/30 bg-yellow-400/10"
          >
            <div className="flex">
              {(["a", "b", "c", "d", "e"] as const).map((k) => (
                <Star
                  key={k}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="font-display font-black text-2xl text-yellow-400">
              4.9
            </span>
            <span className="text-muted-foreground text-sm">
              from 700+ reviews
            </span>
          </motion.div>

          <div className="cyber-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-neon-purple/60 hover:shadow-neon-purple"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-background font-bold text-sm">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {review.name}
                  </p>
                  <p className="text-muted-foreground text-xs">{review.date}</p>
                </div>
              </div>
              <StarRating count={review.rating} />
              <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                "{review.text}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((review) => (
              <motion.div
                key={review.name}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="min-w-[300px] snap-start rounded-xl border border-border bg-card p-5 shrink-0"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-background font-bold text-xs">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {review.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {review.date}
                    </p>
                  </div>
                </div>
                <StarRating count={review.rating} />
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                  "{review.text}"
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile scroll controls */}
          <div className="flex justify-center gap-3 mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="border-border hover:border-neon-blue"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="border-border hover:border-neon-blue"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
