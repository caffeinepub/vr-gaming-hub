import { motion } from "motion/react";

const galleryImages = [
  {
    src: "/assets/generated/hero-vr.dim_1200x600.jpg",
    alt: "VRHub - Full Experience",
    span: "col-span-2",
  },
  {
    src: "/assets/generated/gallery-headset.dim_800x600.jpg",
    alt: "VR Headsets",
    span: "",
  },
  {
    src: "/assets/generated/gallery-customers.dim_800x600.jpg",
    alt: "Happy Customers",
    span: "",
  },
  {
    src: "/assets/generated/birthday-party.dim_800x500.jpg",
    alt: "Birthday Party at VRHub",
    span: "",
  },
  {
    src: "/assets/generated/game-zombie.dim_600x400.jpg",
    alt: "VR Zombie Shooter",
    span: "",
  },
  {
    src: "/assets/generated/game-multiplayer.dim_600x400.jpg",
    alt: "Multiplayer VR Battle",
    span: "",
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-neon-blue font-semibold uppercase tracking-widest text-sm mb-3">
            Gallery
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black">
            Inside <span className="text-neon-blue glow-blue">VRHub</span>
          </h2>
          <div className="cyber-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.04, y: -6 }}
              style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                i === 0 ? "md:col-span-2 row-span-1" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-neon-blue/0 group-hover:bg-neon-blue/15 transition-colors duration-300" />
              {/* Neon border on hover */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-neon-blue/70 transition-colors duration-300 group-hover:shadow-neon-blue" />
              {/* Corner scanlines on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-foreground text-sm font-semibold">
                  {img.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
