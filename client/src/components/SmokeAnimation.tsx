import { motion } from "framer-motion";

export function SmokeAnimation() {
  const smokeParticles = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {smokeParticles.map((index) => {
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 3;
        const randomDuration = 12 + Math.random() * 8;
        
        return (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              x: `${randomX}vw`,
              y: "100vh",
            }}
            animate={{
              opacity: [0, 0.4, 0.3, 0],
              x: `${randomX - 30 + Math.random() * 60}vw`,
              y: "-50vh",
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            className="absolute w-80 h-80 bg-gradient-to-t from-white/30 via-white/15 to-transparent rounded-full blur-3xl"
          />
        );
      })}
    </div>
  );
}
