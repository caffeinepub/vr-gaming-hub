import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

const WA_URL =
  "https://wa.me/918985866377?text=Hi!%20I%20want%20to%20book%20a%20VR%20session";

export function FloatingWhatsApp() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="floating.whatsapp.button"
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow-green"
        style={{
          boxShadow:
            "0 0 12px rgba(34, 197, 94, 0.5), 0 0 30px rgba(34, 197, 94, 0.2)",
        }}
      >
        {/* Label that appears on hover */}
        <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-300 whitespace-nowrap text-sm font-bold pl-0 group-hover:pl-4">
          Book Now!
        </span>
        <div className="w-14 h-14 flex items-center justify-center shrink-0">
          <MessageCircle className="w-7 h-7 fill-white stroke-white" />
        </div>
      </a>

      {/* Pulsing ring */}
      <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping pointer-events-none" />
    </motion.div>
  );
}
