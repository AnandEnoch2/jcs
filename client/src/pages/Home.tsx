import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-black">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=80" 
            alt="Catering Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-display text-primary tracking-[0.4em] uppercase text-sm md:text-base mb-6 block font-semibold">
              Serving with Love, Blessed by Grace.
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight text-glow">
              Jesus Catering <br />
              <span className="gold-gradient-text italic text-4xl md:text-6xl lg:text-7xl">Service</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 italic font-light">
              ".... Whatever he does shall Prosper" <br />
              <span className="text-primary/80 not-italic text-sm mt-2 block">— Psalm 1:3</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/services" 
                className="px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm rounded-none hover:bg-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] inline-block"
              >
                Discover Menus
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 border border-primary text-primary font-bold uppercase tracking-widest text-sm rounded-none hover:bg-primary/10 transition-all duration-300 inline-block"
              >
                Request Quote
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary"
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
