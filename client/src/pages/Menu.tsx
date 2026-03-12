import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedFood } from "@/components/AnimatedFood";
import { ChefHat, Flame, Leaf, UtensilsCrossed } from "lucide-react";

export default function Menu() {
  const menuCategories = [
    {
      name: "North Indian",
      icon: ChefHat,
      items: [
        "Butter Chicken",
        "Tandoori Chicken",
        "Murgh Makhani",
        "Chicken Tikka Masala",
        "Paneer Tikka",
        "Paneer Butter Masala",
        "Dal Makhani",
        "Dal Tadka",
        "Rogan Josh",
        "Lamb Keema",
        "Biryani (Chicken/Mutton/Veg)",
        "Dum Pukht Biryani",
        "Naan (Butter, Garlic, Cheese, Peshwari)",
        "Roti",
        "Paratha",
        "Kulcha",
        "Samosa",
        "Pakora",
        "Spring Rolls",
        "Seekh Kabab",
        "Shami Kabab",
        "Malai Kofta",
        "Chana Bhature",
        "Rajma & Rice",
        "Pav Bhaji",
        "Nihari",
        "Haleem",
        "Korma (Chicken/Mutton/Veg)"
      ]
    },
    {
      name: "South Indian",
      icon: Leaf,
      items: [
        "Masala Dosa",
        "Plain Dosa",
        "Butter Dosa",
        "Cheese Dosa",
        "Paneer Dosa",
        "Chicken Dosa",
        "Idli (White/Black Rice)",
        "Sambar Idli",
        "Ghee Idli",
        "Medhu Vada",
        "Crunchy Vada",
        "Medu Vada Sambar",
        "Chettinad Chicken",
        "Chettinad Mutton",
        "Rasam",
        "Lemon Rasam",
        "Sambar",
        "Vegetable Sambar",
        "Uttapam (Onion/Tomato/Mixed)",
        "Appam",
        "Puttu Kudam",
        "Idiyappam",
        "Pongal",
        "Vegetable Pongal",
        "Avial",
        "Pachdi",
        "Kosamalli",
        "Aquaint",
        "Fish Curry",
        "Prawn Curry",
        "Tiffin Sambar"
      ]
    },
    {
      name: "Chinese",
      icon: Flame,
      items: [
        "Chicken Manchurian",
        "Vegetable Manchurian",
        "Prawn Manchurian",
        "Hakka Noodles",
        "Egg Noodles",
        "Chicken Noodles",
        "Paneer Noodles",
        "Fried Rice",
        "Egg Fried Rice",
        "Chicken Fried Rice",
        "Paneer Fried Rice",
        "Shrimp Fried Rice",
        "Vegetable Fried Rice",
        "Sweet & Sour Chicken",
        "Sweet & Sour Prawn",
        "Sweet & Sour Vegetable",
        "Spring Rolls",
        "Vegetable Spring Rolls",
        "Chow Mein",
        "Singapore Chow Mei Fun",
        "Szechuan Prawns",
        "Szechuan Chicken",
        "Szechuan Beef",
        "Momos (Chicken/Veg/Paneer)",
        "Steamed Momos",
        "Fried Momos",
        "Chili Momos",
        "Schezwan Sauce Dishes",
        "Chow Bhel",
        "Crispy Noodles & Veg",
        "Gobi 65",
        "Chili Chicken",
        "Chili Paneer",
        "Lollipop Chicken",
        "Kung Pao Chicken",
        "Garlic Chicken",
        "Garlic Noodles",
        "Black Pepper Chicken",
        "Honey Chili Chicken"
      ]
    },
    {
      name: "Vegetarian Specials",
      icon: UtensilsCrossed,
      items: [
        "Paneer Butter Masala",
        "Paneer Tikka Masala",
        "Paneer Do Pyaza",
        "Paneer Makhani",
        "Chana Masala",
        "Chana Dal",
        "Aloo Gobi",
        "Aloo Jeera",
        "Aloo Matar",
        "Vegetable Biryani",
        "Paneer Biryani",
        "Mixed Vegetable Curry",
        "Mushroom Do Pyaza",
        "Broccoli 65",
        "Gobi 65",
        "Vegetable Fried Rice",
        "Tofu Curry",
        "Mix Veg Palak Paneer",
        "Corn Cheese Pakora",
        "Boondi Raita",
        "Cucumber Raita",
        "Mint Raita",
        "Malai Kofta",
        "Veg Kofta Curry",
        "Dal Makhani",
        "Dal Tadka",
        "Rajma Rice",
        "Black Chickpea Curry",
        "Methi Matar Malai",
        "Palak Paneer",
        "Moong Dal Halwa"
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
          <AnimatedFood emoji="🍛" delay={0} x={80} y={150} />
          <AnimatedFood emoji="🍜" delay={1} x={-100} y={120} />
          <AnimatedFood emoji="🥘" delay={2} x={120} y={180} />
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
                href="https://www.zomato.com/tirunelveli/rehoboth-kitchen-1-tirunelveli-locality/order"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-sm rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                data-testid="button-order-zomato"
              >
                <span>Order on Zomato</span>
                <span>→</span>
              </a>
              
              <a
                href="https://www.swiggy.com/city/tirunelveli/rehoboth-kitchen-vannarpettai-rest1064327"
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
