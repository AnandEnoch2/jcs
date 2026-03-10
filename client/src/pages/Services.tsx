import { motion } from "framer-motion";
import { Utensils, HeartHandshake, GlassWater, PartyPopper, Users, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedFood } from "@/components/AnimatedFood";

export default function Services() {
  const services = [
    { title: "Wedding Catering", icon: HeartHandshake, desc: "Elegant feasts to make your special day unforgettable." },
    { title: "Corporate Catering", icon: Users, desc: "Professional dining solutions for meetings and corporate events." },
    { title: "Social Events", icon: GlassWater, desc: "Perfectly crafted menus for your private gatherings and parties." },
    { title: "Family Style", icon: Utensils, desc: "Comforting, shareable dishes that bring everyone together." },
    { title: "Outdoor Catering", icon: Sparkles, desc: "Full-service catering equipped for beautiful outdoor venues." },
    { title: "Birthday Parties", icon: PartyPopper, desc: "Fun, vibrant menus tailored to delight guests of all ages." },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-black">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561341?w=1920&q=80" 
            alt="Services Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
          <AnimatedFood emoji="🍰" delay={0.5} x={100} y={170} />
          <AnimatedFood emoji="🍱" delay={1.2} x={-120} y={150} />
          <AnimatedFood emoji="🥗" delay={2} x={80} y={120} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-4">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground">
              Catering Solutions Tailored to You
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Catering Services" subtitle="Tailored to You" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-border/50 bg-background hover:bg-card hover:border-primary/50 transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <service.icon className="text-primary group-hover:text-primary-foreground transition-colors duration-300" size={32} />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-24 bg-card/50 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { label: "Cuisines", value: "3 Types", icon: "🍽️" },
              { label: "Experience", value: "Decades", icon: "⭐" },
              { label: "Events", value: "Countless", icon: "🎉" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center p-8 border border-border/30 rounded-xl hover:border-primary/50 transition-colors"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <p className="text-muted-foreground mb-2">{stat.label}</p>
                <p className="text-3xl font-display font-bold text-primary">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
