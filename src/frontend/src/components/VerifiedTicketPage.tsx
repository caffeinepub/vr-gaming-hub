import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function VerifiedTicketPage() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name") || "Guest";
  const id = params.get("id") || "";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.85,
          y: visible ? 0 : 30,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-md w-full"
      >
        {/* VRHub logo text */}
        <div className="mb-8">
          <span className="font-display font-black text-2xl text-neon-blue glow-blue tracking-widest uppercase">
            VRHub
          </span>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
            Hyderabad · Santosh Nagar
          </p>
        </div>

        {/* Checkmark */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)]"
          >
            <motion.svg
              aria-label="Verified checkmark"
              role="img"
              viewBox="0 0 52 52"
              className="w-12 h-12"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            >
              <motion.path
                d="M14 27 L22 35 L38 19"
                fill="none"
                stroke="#4ade80"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              />
            </motion.svg>
          </motion.div>
        </div>

        {/* Verified label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <p className="text-green-400 font-bold uppercase tracking-[0.3em] text-sm mb-3">
            ✓ Ticket Verified
          </p>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-foreground mb-2 leading-tight">
            Verified Booking for
          </h1>
          <p className="font-display font-black text-3xl sm:text-4xl text-neon-blue glow-blue mb-2">
            {name}
          </p>
          {id && (
            <p className="text-muted-foreground text-base font-mono tracking-widest">
              {id}
            </p>
          )}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="cyber-divider max-w-xs mx-auto my-6"
        />

        {/* Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.4 }}
          className="text-sm text-muted-foreground space-y-1"
        >
          <p>📍 2nd Floor, Al Quraishi Plex, Maruthi Nagar</p>
          <p>Santosh Nagar, Hyderabad — 500059</p>
          <p className="mt-2">📞 089858 66377 &nbsp;|&nbsp; ⏰ 11 AM – 11 PM</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="mt-6 text-xs text-muted-foreground/60"
        >
          Show this screen at the counter to start your session.
        </motion.p>
      </motion.div>
    </div>
  );
}
