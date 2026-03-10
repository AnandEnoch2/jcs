import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { ChefHat, Flame, Leaf, UtensilsCrossed } from "lucide-react";

export default function Menu() {
  const menuCategories = [
    {
      name: "North Indian",
      icon: ChefHat,
      items: [
        "Butter Chicken",
        "Tandoori Chicken",
        "Paneer Tikka",
        "Dal Makhani",
        "Rogan Josh",
        "Biryani",
        "Naan & Roti",
        "Samosa",
        "Pakora"
      ]
    },
    {
      name: "South Indian",
      icon: Leaf,
      items: [
        "Dosa",
        "Idli",
        "Vada",
        "Chettinad Chicken",
        "Rasam",
        "Sambar",
        "Uttapam",
        "Appam",
        "Biryani"
      ]
    },
    {
      name: "Chinese",
      icon: Flame,
      items: [
        "Chicken Manchurian",
        "Hakka Noodles",
        "Fried Rice",
        "Sweet & Sour Chicken",
        "Spring Rolls",
        "Chow Mein",
        "Szechuan Prawns",
        "Momos",
        "Schezwan Sauce Dishes"
      ]
    },
    {
      name: "Vegetarian Specials",
      icon: UtensilsCrossed,
      items: [
        "Paneer Butter Masala",
        "Chana Masala",
        "Aloo Gobi",
        "Vegetable Biryani",
        "Mixed Vegetable Curry",
        "Mushroom Do Pyaza",
        "Vegetable Fried Rice",
        "Paneer Tikka Masala",
        "Tofu Curry"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-black">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-display text-primary tracking-[0.4em] uppercase text-sm md:text-base mb-6 block font-semibold">
              Culinary Excellence
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Our Menu
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse selection of authentic cuisines crafted with passion and the finest ingredients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MENU CATEGORIES */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {menuCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="group h-full"
                >
                  <div className="p-8 border border-border/50 bg-card hover:bg-card/80 hover:border-primary/50 transition-all duration-300 rounded-xl flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <Icon size={28} className="text-primary group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-display font-bold text-white">{category.name}</h3>
                    </div>

                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="space-y-3 flex-1"
                    >
                      {category.items.map((item) => (
                        <motion.div
                          key={item}
                          variants={itemVariants}
                          className="flex items-center gap-3 text-gray-300 group/item"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 group-hover/item:bg-white transition-colors"></div>
                          <span className="text-sm md:text-base group-hover/item:text-white transition-colors">{item}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALLOUT SECTION */}
      <section className="py-24 bg-card/50 border-y border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Ready to taste our delicious food?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Order now from your favorite platform and experience authentic flavors delivered to your doorstep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap">
              <a
                href="https://www.zomato.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-sm rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                data-testid="button-order-zomato"
              >
                <span>Order on Zomato</span>
                <span>→</span>
              </a>
              
              <a
                href="https://www.swiggy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-widest text-sm rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,88,12,0.4)]"
                data-testid="button-order-swiggy"
              >
                <span>Order on Swiggy</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
