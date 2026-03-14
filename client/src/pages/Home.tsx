import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Utensils,
  MapPin,
  Phone,
  Mail,
  Clock,
  GlassWater,
  HeartHandshake,
  ChefHat,
  PartyPopper,
  Users,
  Sparkles,
  CheckCircle,
  Leaf,
  Flame,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedFood } from "@/components/AnimatedFood";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { useAdmin } from "@/context/AdminContext";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  eventType: z.string().min(1, "Event type is required"),
  guests: z.coerce.number().min(1, "Must have at least 1 guest"),
  message: z.string().min(10, "Please provide some details"),
});

type FormData = z.infer<typeof formSchema>;

const WHATSAPP_NUMBERS = [
  { label: "6380322818", number: "916380322818" },
  { label: "9790728715", number: "919790728715" },
];

const BRAND_QUOTES = [
  {
    quote: "Where every meal is a blessing and every event becomes a cherished memory.",
    brand: "Jesus Catering Service",
  },
  {
    quote: "Serving with love, grace, and the finest flavors — because your celebration deserves nothing less.",
    brand: "Jesus Catering Service",
  },
  {
    quote: "From intimate gatherings to grand weddings, we bring culinary excellence to every table.",
    brand: "Jesus Catering Service",
  },
  {
    quote: "Food is our language of love. Let us speak it at your special occasion.",
    brand: "Jesus Catering Service",
  },
  {
    quote: "Trusted by families across Palayamkottai — crafting moments that linger long after the last bite.",
    brand: "Jesus Catering Service",
  },
];

export default function Home() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [showWhatsAppPicker, setShowWhatsAppPicker] = useState(false);
  const [pendingWhatsAppMsg, setPendingWhatsAppMsg] = useState("");
  const { mutate: createInquiry, isPending } = useCreateInquiry();
  const { content } = useAdmin();
  const backgroundImages = content.pageImages.homeBg;
  const cateringDetails1 = content.pageImages.aboutStory1;
  const cateringDetails2 = content.pageImages.aboutStory2;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventType: "Wedding Catering",
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % BRAND_QUOTES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data: FormData) => {
    createInquiry(data, {
      onSuccess: () => {
        reset();
        const message = `*New Catering Inquiry*\n\n📝 Name: ${data.name}\n📧 Email: ${data.email}\n📱 Phone: ${data.phone}\n🎉 Event Type: ${data.eventType}\n👥 Number of Guests: ${data.guests}\n💬 Details: ${data.message}`;
        setPendingWhatsAppMsg(encodeURIComponent(message));
        setShowWhatsAppPicker(true);
      },
    });
  };

  const sendToWhatsApp = (number: string) => {
    window.open(`https://wa.me/${number}?text=${pendingWhatsAppMsg}`, "_blank");
    setShowWhatsAppPicker(false);
  };

  const services = [
    {
      title: "Wedding Catering",
      icon: HeartHandshake,
      desc: "Elegant feasts to make your special day unforgettable.",
    },
    {
      title: "Corporate Catering",
      icon: Users,
      desc: "Professional dining solutions for meetings and corporate events.",
    },
    {
      title: "Social Events",
      icon: GlassWater,
      desc: "Perfectly crafted menus for your private gatherings and parties.",
    },
    {
      title: "Family Style",
      icon: Utensils,
      desc: "Comforting, shareable dishes that bring everyone together.",
    },
    {
      title: "Outdoor Catering",
      icon: Sparkles,
      desc: "Full-service catering equipped for beautiful outdoor venues.",
    },
    {
      title: "Birthday Parties",
      icon: PartyPopper,
      desc: "Fun, vibrant menus tailored to delight guests of all ages.",
    },
  ];

  const cuisines = [
    {
      title: "North Indian",
      desc: "Rich, aromatic curries, tandoori specialties, and freshly baked breads.",
      img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
    },
    {
      title: "South Indian",
      desc: "Authentic traditional flavors, from crisp dosas to spicy Chettinad dishes.",
      img: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&q=80",
    },
    {
      title: "Chinese",
      desc: "Exquisite Indo-Chinese fusion, featuring perfect wok-tossed delicacies.",
      img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-black">
      <Navbar />

      {/* HERO SECTION WITH IMAGE CAROUSEL */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentBgIndex}
              src={backgroundImages[currentBgIndex]}
              alt="Catering Background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
          <AnimatedFood emoji="🍽️" delay={0} x={110} y={180} />
          <AnimatedFood emoji="🍴" delay={0.8} x={-90} y={150} />
          <AnimatedFood emoji="🌶️" delay={1.6} x={100} y={140} />
        </div>

        {/* Image Indicators */}
        <div className="absolute top-32 right-8 z-20 flex gap-2">
          {backgroundImages.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentBgIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentBgIndex ? "bg-primary w-8" : "bg-primary/40"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-display text-primary tracking-[0.4em] uppercase text-sm md:text-base mb-6 block font-semibold">
              {content.hero.tagline}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight text-glow">
              Jesus Catering <br />
              <span className="gold-gradient-text italic text-4xl md:text-6xl lg:text-7xl">
                Service
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 italic font-light">
              {content.hero.subtitle} <br />
              <span className="text-primary/80 not-italic text-sm mt-2 block">
                {content.hero.verse}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/menu"
                className="px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm rounded-none hover:bg-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] inline-block"
                data-testid="button-discover-menu"
              >
                Discover Menus
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-primary text-primary font-bold uppercase tracking-widest text-sm rounded-none hover:bg-primary/10 transition-all duration-300 inline-block"
                data-testid="button-request-quote"
              >
                Request Quote
              </a>
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

      {/* ABOUT / DETAILS SECTION */}
      <section id="about" className="py-24 relative">
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
                Led by Proprietor{" "}
                <strong className="text-foreground gold-gradient-text">
                  {content.about.proprietor}
                </strong>
                , {content.about.description1}
              </p>
              <p>{content.about.description2}</p>

              {/* Online Platforms Callout */}
              <motion.div
                className="mt-8 p-8 bg-card border border-primary/30 rounded-xl relative overflow-hidden group"
                whileHover={{ borderColor: "rgb(212, 175, 55)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>
                <h4 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
                  <Utensils className="text-primary" size={20} />
                  Order Online Now
                </h4>
                <div className="space-y-4">
                  <motion.a
                    href="https://www.zomato.com/tirunelveli/rehoboth-kitchen-1-tirunelveli-locality/order"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-background/50 hover:bg-background border border-primary/20 rounded-lg transition-all duration-300"
                    whileHover={{ x: 8 }}
                    data-testid="link-zomato"
                  >
                    <div>
                      <p className="text-[#E23744] font-bold text-lg">Zomato</p>
                      <p className="text-xs text-gray-400">Rehoboth Kitchen</p>
                    </div>
                    <span className="text-primary font-bold text-xl">→</span>
                  </motion.a>
                  <motion.a
                    href="https://www.swiggy.com/city/tirunelveli/rehoboth-kitchen-vannarpettai-rest1064327"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-background/50 hover:bg-background border border-primary/20 rounded-lg transition-all duration-300"
                    whileHover={{ x: 8 }}
                    data-testid="link-swiggy"
                  >
                    <div>
                      <p className="text-orange-500 font-bold text-lg">
                        Swiggy
                      </p>
                      <p className="text-xs text-gray-400">Rehoboth Kitchen</p>
                    </div>
                    <span className="text-primary font-bold text-xl">→</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 relative"
            >
              <div className="absolute -inset-4 bg-primary/5 blur-3xl -z-10 rounded-full animate-pulse"></div>

              <motion.div
                className="space-y-4 translate-y-8"
                whileHover={{ y: 16 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="rounded-2xl overflow-hidden border border-border shadow-2xl"
                  whileHover={{ rotateY: 5 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.img
                    src={cateringDetails1}
                    alt="Catering Details 1"
                    className="w-full h-auto hover:scale-105 transition-transform duration-500"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </motion.div>
              <motion.div
                className="space-y-4"
                whileHover={{ y: -16 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="rounded-2xl overflow-hidden border border-border shadow-2xl"
                  whileHover={{ rotateY: -5 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.img
                    src={cateringDetails2}
                    alt="Catering Details 2"
                    className="w-full h-auto hover:scale-105 transition-transform duration-500"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CUISINES SECTION */}
      <section
        id="cuisines"
        className="py-24 bg-card relative border-y border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Exquisite Cuisines"
            subtitle="Our Specialties"
          />

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
                  <h3 className="text-3xl font-display font-bold text-white mb-3">
                    {cuisine.title}
                  </h3>
                  <p className="text-gray-300 transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {cuisine.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Catering Services"
            subtitle="Tailored to You"
          />

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
                  <service.icon
                    className="text-primary group-hover:text-primary-foreground transition-colors duration-300"
                    size={32}
                  />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={content.whyChooseUs.title}
            subtitle={content.whyChooseUs.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.whyChooseUs.items.map((item, idx) => {
              const icons = [Leaf, ChefHat, Flame, Users, Sparkles, Clock];
              const IconComp = icons[idx % icons.length];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 p-6 bg-card border border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <IconComp className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUOTES SLIDER SECTION */}
      <section className="py-20 relative overflow-hidden bg-black border-t border-border/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <p className="text-primary text-sm uppercase tracking-widest font-semibold mb-8">Our Promise</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuoteIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-display text-white leading-relaxed italic">
                &ldquo;{BRAND_QUOTES[currentQuoteIndex].quote}&rdquo;
              </p>
              <p className="gold-gradient-text font-bold text-lg tracking-widest uppercase">
                — {BRAND_QUOTES[currentQuoteIndex].brand}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-10">
            {BRAND_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuoteIndex(i)}
                data-testid={`button-quote-dot-${i}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentQuoteIndex ? "bg-primary w-6" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="py-24 relative bg-card/50 border-t border-border/50"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Plan Your Event" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-display font-bold text-white mb-6">
                  Contact Information
                </h3>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-3 bg-primary/10 rounded-full border border-primary/20">
                    <ChefHat className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-primary uppercase tracking-wider mb-1">
                      Proprietor
                    </p>
                    <p className="text-lg font-medium text-white">
                      T. Navaneetha Ramakrishnan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-3 bg-primary/10 rounded-full border border-primary/20">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-primary uppercase tracking-wider mb-1">
                      Phones
                    </p>
                    <p className="text-base text-gray-300">+91 89032 02413</p>
                    <p className="text-base text-gray-300">+91 63803 22818</p>
                    <p className="text-base text-gray-300">+91 97907 28715</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-3 bg-primary/10 rounded-full border border-primary/20">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-primary uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:jesuscateringservicenellai@gmail.com"
                      className="text-base text-gray-300 hover:text-primary transition-colors break-all"
                    >
                      jesuscateringservicenellai@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-3 bg-primary/10 rounded-full border border-primary/20">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-primary uppercase tracking-wider mb-1">
                      Address
                    </p>
                    <p className="text-base text-gray-300">
                      No.75, Tiruchendur Road,
                      <br />
                      Palayamkottai - 627 002
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-background p-8 lg:p-10 rounded-2xl border border-border shadow-2xl"
            >
              <h3 className="text-2xl font-display font-bold text-white mb-6">
                Send an Inquiry
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                      Your Name
                    </label>
                    <input
                      {...register("name")}
                      className={`w-full bg-input border ${errors.name ? "border-destructive" : "border-border"} rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      className={`w-full bg-input border ${errors.phone ? "border-destructive" : "border-border"} rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
                      placeholder="+91 XXXXX XXXXX"
                    />
                    {errors.phone && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className={`w-full bg-input border ${errors.email ? "border-destructive" : "border-border"} rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                      Number of Guests
                    </label>
                    <input
                      {...register("guests")}
                      type="number"
                      min="1"
                      className={`w-full bg-input border ${errors.guests ? "border-destructive" : "border-border"} rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
                      placeholder="100"
                    />
                    {errors.guests && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.guests.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                    Event Type
                  </label>
                  <select
                    {...register("eventType")}
                    className={`w-full bg-input border ${errors.eventType ? "border-destructive" : "border-border"} rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none`}
                  >
                    <option value="Wedding Catering">Wedding Catering</option>
                    <option value="Corporate Catering">
                      Corporate Catering
                    </option>
                    <option value="Social Event">Social Event</option>
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.eventType && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.eventType.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                    Event Details / Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className={`w-full bg-input border ${errors.message ? "border-destructive" : "border-border"} rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none`}
                    placeholder="Tell us about your date, venue, and specific requirements..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-4"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Clock className="animate-spin" size={18} /> Processing...
                    </span>
                  ) : (
                    "Submit Inquiry"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHATSAPP PICKER MODAL */}
      {showWhatsAppPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background border border-primary/40 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-green-500">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-2">
              Inquiry Submitted!
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Choose a WhatsApp number to send your inquiry to:
            </p>
            <div className="space-y-3">
              {WHATSAPP_NUMBERS.map((item) => (
                <button
                  key={item.number}
                  onClick={() => sendToWhatsApp(item.number)}
                  className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-200"
                  data-testid={`button-whatsapp-${item.label}`}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Send to {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowWhatsAppPicker(false)}
              className="mt-4 text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
