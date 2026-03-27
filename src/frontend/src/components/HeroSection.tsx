import { Button } from "@/components/ui/button";
import { Phone, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Star {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  delay: number;
  color: string;
}

function NeonGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 animate-grid-slide"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.78 0.25 220 / 0.12) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.25 220 / 0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.07 0.01 285 / 0.8))",
        }}
      />
    </div>
  );
}

function FloatingStars() {
  const stars: Star[] = [
    {
      id: "s1",
      x: 15,
      y: 20,
      size: 3,
      opacity: 0.8,
      speed: 3.2,
      delay: 0,
      color: "oklch(0.78 0.25 220)",
    },
    {
      id: "s2",
      x: 75,
      y: 15,
      size: 2,
      opacity: 0.6,
      speed: 4.1,
      delay: 0.3,
      color: "oklch(0.58 0.32 300)",
    },
    {
      id: "s3",
      x: 40,
      y: 70,
      size: 4,
      opacity: 0.7,
      speed: 2.8,
      delay: 0.6,
      color: "oklch(0.78 0.25 220)",
    },
    {
      id: "s4",
      x: 85,
      y: 55,
      size: 2,
      opacity: 0.9,
      speed: 5.0,
      delay: 0.9,
      color: "oklch(0.58 0.28 25)",
    },
    {
      id: "s5",
      x: 25,
      y: 80,
      size: 3,
      opacity: 0.5,
      speed: 3.5,
      delay: 1.2,
      color: "oklch(0.58 0.32 300)",
    },
    {
      id: "s6",
      x: 60,
      y: 30,
      size: 2,
      opacity: 0.7,
      speed: 4.5,
      delay: 1.5,
      color: "oklch(0.78 0.25 220)",
    },
    {
      id: "s7",
      x: 90,
      y: 25,
      size: 3,
      opacity: 0.6,
      speed: 2.9,
      delay: 1.8,
      color: "oklch(0.58 0.28 25)",
    },
    {
      id: "s8",
      x: 10,
      y: 50,
      size: 2,
      opacity: 0.8,
      speed: 3.8,
      delay: 2.1,
      color: "oklch(0.58 0.32 300)",
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 3}px ${star.color}, 0 0 ${star.size * 6}px ${star.color}`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [star.opacity, star.opacity * 0.4, star.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
}

function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let width = canvas.width;
    let height = canvas.height;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
      maxLife: number;
    }> = [];

    const colors = ["#00c8ff", "#b000f0", "#ff0038"];

    function spawn() {
      particles.push({
        x: Math.random() * width,
        y: height + 5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 1 + 0.5),
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 120 + 60,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      if (Math.random() < 0.15) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const alpha = 1 - p.life / p.maxLife;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `${p.color}${Math.floor(alpha * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx!.fill();

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    const observer = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      width = canvas.width;
      height = canvas.height;
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

interface StatConfig {
  target: number;
  decimals: number;
  suffix: string;
  label: string;
  delay: number;
}

const STATS: StatConfig[] = [
  { target: 4.9, decimals: 1, suffix: "★", label: "Google Rating", delay: 0 },
  { target: 700, decimals: 0, suffix: "+", label: "Happy Gamers", delay: 100 },
  { target: 12, decimals: 0, suffix: "h", label: "Open Daily", delay: 200 },
  { target: 6, decimals: 0, suffix: "+", label: "VR Experiences", delay: 300 },
];

function useCountUp(
  target: number,
  decimals: number,
  duration: number,
  delay: number,
  active: boolean,
) {
  const initialDisplay = decimals > 0 ? `0.${"0".repeat(decimals)}` : "0";
  const [display, setDisplay] = useState(initialDisplay);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(() => {
      startTimeRef.current = null;

      function tick(now: number) {
        if (startTimeRef.current === null) startTimeRef.current = now;
        const elapsed = now - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        const current = eased * target;
        setDisplay(current.toFixed(decimals));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, decimals, duration, delay]);

  return display;
}

function AnimatedStat({ stat }: { stat: StatConfig }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const display = useCountUp(
    stat.target,
    stat.decimals,
    1800,
    stat.delay,
    active,
  );

  return (
    <motion.div
      ref={ref}
      className="text-center cursor-default"
      whileHover={{ scale: 1.15, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="text-2xl md:text-3xl font-display font-black text-neon-blue glow-blue">
        {display}
        {stat.suffix}
      </div>
      <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
    </motion.div>
  );
}

export function HeroSection() {
  const handleScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-vr.dim_1200x600.jpg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.72)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.1 0.06 260 / 0.8), transparent)",
        }}
      />

      <NeonGrid />
      <FloatingStars />
      <CanvasParticles />

      <div className="relative z-10 container mx-auto px-4 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-blue/40 bg-neon-blue/10 text-neon-blue text-sm font-semibold mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
            ⭐ 4.9 Rating · Hyderabad's #1 VR Gaming Center
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="block text-white animate-neon-flicker"
              style={{
                textShadow:
                  "0 2px 24px rgba(0,0,0,0.9), 0 0px 4px rgba(0,0,0,1)",
              }}
            >
              Experience the
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="block text-neon-blue glow-blue"
              style={{
                textShadow: "0 2px 24px rgba(0,0,0,0.9), 0 0 20px #00c8ff",
              }}
            >
              Future of Gaming
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="block text-neon-purple glow-purple"
              style={{
                textShadow: "0 2px 24px rgba(0,0,0,0.9), 0 0 20px #b000f0",
              }}
            >
              in VR
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
          >
            Play PS5, VR Zombie Games, Cricket VR & More at{" "}
            <span className="text-white font-semibold">
              Hyderabad's Top VRHub
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              data-ocid="hero.book_game.primary_button"
              onClick={() => handleScroll("#booking")}
              size="lg"
              className="bg-neon-blue text-background font-bold text-lg px-8 py-6 hover:bg-neon-blue/90 animate-pulse-glow shadow-neon-blue w-full sm:w-auto"
            >
              <Zap className="w-5 h-5" />
              Book Your Game
            </Button>
            <a href="tel:+918985866377" className="w-full sm:w-auto">
              <Button
                data-ocid="hero.call_now.button"
                variant="outline"
                size="lg"
                className="border-neon-red text-neon-red hover:bg-neon-red/10 hover:text-neon-red font-bold text-lg px-8 py-6 shadow-neon-red w-full"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-14 flex flex-wrap justify-center gap-6 md:gap-12"
          >
            {STATS.map((stat) => (
              <AnimatedStat key={stat.label} stat={stat} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
