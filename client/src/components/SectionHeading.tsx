import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : "text-left"}`}>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          {centered && <div className="h-px w-12 bg-primary/50" />}
          <span className="text-primary font-medium tracking-[0.3em] uppercase text-sm">
            {subtitle}
          </span>
          {centered && <div className="h-px w-12 bg-primary/50" />}
        </motion.div>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          {title}
        </span>
      </motion.h2>
      
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className={`h-1 w-24 bg-primary mt-6 ${centered ? "mx-auto" : ""}`}
      />
    </div>
  );
}
