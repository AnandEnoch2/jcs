import { motion } from "framer-motion";

export function SmokeAnimation() {
  const smokeParticles = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {smokeParticles.map((index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight,
          }}
          animate={{
            opacity: [0, 0.3, 0],
            x: Math.random() * window.innerWidth - 100,
            y: -100,
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: index * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-96 h-96 bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl"
        />
      ))}
    </div>
  );
}
