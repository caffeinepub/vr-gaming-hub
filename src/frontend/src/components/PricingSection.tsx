import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { motion } from "motion/react";

const WA_URL =
  "https://wa.me/918985866377?text=I'd%20like%20to%20book%20a%20session%20at%20VR%20Gaming%20Hub";

const packages = [
  {
    id: 1,
    name: "Single Game Session",
    price: "₹199",
    unit: "",
    features: [
      "1 game experience",
      "Up to 15 minutes",
      "VR or PS5 choice",
      "Free headset sanitization",
    ],
    popular: false,
    color: "blue" as const,
  },
  {
    id: 2,
    name: "30 Minute VR Pass",
    price: "₹349",
    unit: "",
    features: [
      "Any game you choose",
      "30 minutes unlimited",
      "Switch games freely",
      "Free headset sanitization",
    ],
    popular: false,
    color: "purple" as const,
  },
  {
    id: 3,
    name: "1 Hour Unlimited",
    price: "₹599",
    unit: "",
    features: [
      "All games access",
      "60 minutes unlimited",
      "Switch games anytime",
      "Priority booking",
    ],
    popular: true,
    color: "blue" as const,
  },
  {
    id: 4,
    name: "Group Package",
    price: "₹449",
    unit: "/person",
    features: [
      "4+ people",
      "1 hour all games",
      "Multiplayer battles",
      "Group photo",
    ],
    popular: false,
    color: "purple" as const,
  },
  {
    id: 5,
    name: "Birthday Party Package",
    price: "₹2999",
    unit: "",
    features: [
      "Up to 10 people",
      "2 hours gaming",
      "Decorations included",
      "Birthday cake photo op",
    ],
    popular: false,
    color: "red" as const,
  },
];

const borderMap = {
  blue: "border-neon-blue/40 hover:border-neon-blue hover:shadow-neon-blue",
  purple:
    "border-neon-purple/40 hover:border-neon-purple hover:shadow-neon-purple",
  red: "border-neon-red/40 hover:border-neon-red hover:shadow-neon-red",
};

const priceColorMap = {
  blue: "text-neon-blue glow-blue",
  purple: "text-neon-purple glow-purple",
  red: "text-neon-red glow-red",
};

const btnMap = {
  blue: "bg-neon-blue text-background hover:bg-neon-blue/90",
  purple: "bg-neon-purple text-background hover:bg-neon-purple/90",
  red: "bg-neon-red text-background hover:bg-neon-red/90",
};

const checkColorMap = {
  blue: "text-neon-blue",
  purple: "text-neon-purple",
  red: "text-neon-red",
};

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.78 0.25 220) 0%, transparent 70%)",
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
          <p className="text-neon-purple font-semibold uppercase tracking-widest text-sm mb-3">
            Packages
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black">
            Choose Your{" "}
            <span className="text-neon-purple glow-purple">Adventure</span>
          </h2>
          <div className="cyber-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              data-ocid={`pricing.item.${pkg.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -6 }}
              className={`relative rounded-xl border bg-card p-6 flex flex-col transition-all duration-300 ${borderMap[pkg.color]} ${
                pkg.popular ? "ring-2 ring-neon-blue shadow-neon-blue" : ""
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-neon-blue text-background font-bold px-3 py-1 text-xs">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-display font-bold text-base text-foreground mb-3 leading-tight">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`font-display text-3xl font-black ${priceColorMap[pkg.color]}`}
                  >
                    {pkg.price}
                  </span>
                  {pkg.unit && (
                    <span className="text-muted-foreground text-sm">
                      {pkg.unit}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-2 flex-1 mb-6">
                {pkg.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${checkColorMap[pkg.color]}`}
                    />
                    <span className="text-muted-foreground">{feat}</span>
                  </li>
                ))}
              </ul>

              <a href={WA_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  data-ocid={`pricing.book_whatsapp.button.${pkg.id}`}
                  className={`w-full font-bold text-sm ${btnMap[pkg.color]}`}
                >
                  Book on WhatsApp
                </Button>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          💬 Message us on WhatsApp for custom group packages and special
          discounts!
        </motion.p>
      </div>
    </section>
  );
}
