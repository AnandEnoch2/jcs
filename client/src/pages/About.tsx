import { motion } from "framer-motion";
import { Utensils } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedFood } from "@/components/AnimatedFood";
const cateringDetails1 = "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80";
const cateringDetails2 = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80";

export default function About() {
  const cuisines = [
    { 
      title: "North Indian", 
      desc: "Rich, aromatic curries, tandoori specialties, and freshly baked breads.",
      img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80" 
    },
    { 
      title: "South Indian", 
      desc: "Authentic traditional flavors, from crisp dosas to spicy Chettinad dishes.",
      img: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&q=80" 
    },
    { 
      title: "Chinese", 
      desc: "Exquisite Indo-Chinese fusion, featuring perfect wok-tossed delicacies.",
      img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&q=80" 
    },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-black">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1920&q=80" 
            alt="About Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
          <AnimatedFood emoji="🍲" delay={0} x={90} y={140} />
          <AnimatedFood emoji="🍗" delay={1.5} x={-110} y={160} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-4">
              About Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Our Story, Tradition & Excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Story" subtitle="Tradition & Excellence" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-muted-foreground leading-relaxed text-lg"
            >
              <p>
                Led by Proprietor <strong className="text-foreground gold-gradient-text">T. Navaneetha Ramakrishnan</strong>, Jesus Catering Service has established itself as a beacon of culinary excellence in Palayamkottai and beyond.
              </p>
              <p>
                We believe that every event is a sacred gathering, and the food served should reflect the joy and blessing of the occasion. From intimate family gatherings to grand weddings, our team is dedicated to providing an impeccable dining experience.
              </p>
              
              {/* Zomato Callout */}
              <div className="mt-8 p-6 bg-card border border-primary/30 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>
                <h4 className="text-xl font-display font-bold text-white mb-2 flex items-center gap-2">
                  <Utensils className="text-primary" size={20} />
                  Available Online
                </h4>
                <p>
                  Craving our food now? Find us on <span className="text-[#E23744] font-bold">Zomato</span> under the name <br />
                  <span className="text-2xl font-display text-primary mt-2 block">"Rehoboth Kitchen"</span>
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 relative"
            >
              <div className="absolute -inset-4 bg-primary/5 blur-3xl -z-10 rounded-full"></div>
              
              <div className="space-y-4 translate-y-8">
                <div className="rounded-2xl overflow-hidden border border-border shadow-2xl">
                  <img src={cateringDetails1} alt="Catering Details 1" className="w-full h-auto hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-border shadow-2xl">
                  <img src={cateringDetails2} alt="Catering Details 2" className="w-full h-auto hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CUISINES SECTION */}
      <section className="py-24 bg-card relative border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Exquisite Cuisines" subtitle="Our Specialties" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cuisines.map((cuisine, idx) => (
              <motion.div
                key={cuisine.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative h-96 overflow-hidden rounded-xl border border-border"
              >
                <img 
                  src={cuisine.img} 
                  alt={cuisine.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-12 h-1 bg-primary mb-4 transform origin-left transition-transform duration-300 group-hover:scale-x-150"></div>
                  <h3 className="text-3xl font-display font-bold text-white mb-3">{cuisine.title}</h3>
                  <p className="text-gray-300 transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {cuisine.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
