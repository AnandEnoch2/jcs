import { motion } from "framer-motion";

interface AnimatedFoodProps {
  emoji: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}

export function AnimatedFood({
  emoji,
  delay = 0,
  duration = 4,
  x = 100,
  y = 100,
}: AnimatedFoodProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, -y, -y * 2],
        x: [0, x * 0.5, x],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut",
      }}
      className="absolute pointer-events-none text-4xl md:text-5xl"
    >
      {emoji}
    </motion.div>
  );
}
