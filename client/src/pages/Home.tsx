import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Utensils, MapPin, Phone, Mail, Clock, GlassWater, HeartHandshake, ChefHat, PartyPopper, Users, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { insertInquirySchema } from "@shared/routes";

// Import local images directly as specified in implementation notes
import cateringDetails1 from "@assets/WhatsApp_Image_2026-03-06_at_2.20.58_PM_(3)_1773136384760.jpeg";
import cateringDetails2 from "@assets/WhatsApp_Image_2026-03-06_at_2.20.58_PM_(2)_1773136384760.jpeg";

// Extend schema for form validation to ensure guest is a valid number
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  eventType: z.string().min(1, "Event type is required"),
  guests: z.coerce.number().min(1, "Must have at least 1 guest"),
  message: z.string().min(10, "Please provide some details"),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const { mutate: createInquiry, isPending } = useCreateInquiry();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventType: "Wedding Catering"
    }
  });

  const onSubmit = (data: FormData) => {
    createInquiry(data, {
      onSuccess: () => reset()
    });
  };

  const services = [
    { title: "Wedding Catering", icon: HeartHandshake, desc: "Elegant feasts to make your special day unforgettable." },
    { title: "Corporate Catering", icon: Users, desc: "Professional dining solutions for meetings and corporate events." },
    { title: "Social Events", icon: GlassWater, desc: "Perfectly crafted menus for your private gatherings and parties." },
    { title: "Family Style", icon: Utensils, desc: "Comforting, shareable dishes that bring everyone together." },
    { title: "Outdoor Catering", icon: Sparkles, desc: "Full-service catering equipped for beautiful outdoor venues." },
    { title: "Birthday Parties", icon: PartyPopper, desc: "Fun, vibrant menus tailored to delight guests of all ages." },
  ];

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

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          {/* landing page hero elegant dark food background */}
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
              <a 
                href="#menu" 
                className="px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm rounded-none hover:bg-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              >
                Discover Menus
              </a>
              <a 
                href="#contact" 
                className="px-8 py-4 border border-primary text-primary font-bold uppercase tracking-widest text-sm rounded-none hover:bg-primary/10 transition-all duration-300"
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
      <section id="cuisines" className="py-24 bg-card relative border-y border-border/50">
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

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 relative">
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

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 relative bg-card/50 border-t border-border/50">
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
                <h3 className="text-2xl font-display font-bold text-white mb-6">Contact Information</h3>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-3 bg-primary/10 rounded-full border border-primary/20">
                    <ChefHat className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-primary uppercase tracking-wider mb-1">Proprietor</p>
                    <p className="text-lg font-medium text-white">T. Navaneetha Ramakrishnan</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-3 bg-primary/10 rounded-full border border-primary/20">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-primary uppercase tracking-wider mb-1">Phones</p>
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
                    <p className="text-sm text-primary uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:jesuscateringservicenellai@gmail.com" className="text-base text-gray-300 hover:text-primary transition-colors break-all">
                      jesuscateringservicenellai@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 p-3 bg-primary/10 rounded-full border border-primary/20">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-primary uppercase tracking-wider mb-1">Address</p>
                    <p className="text-base text-gray-300">
                      No.75, Tiruchendur Road,<br />
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
              <h3 className="text-2xl font-display font-bold text-white mb-6">Send an Inquiry</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 uppercase tracking-wide">Your Name</label>
                    <input 
                      {...register("name")}
                      className={`w-full bg-input border ${errors.name ? 'border-destructive' : 'border-border'} rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 uppercase tracking-wide">Phone Number</label>
                    <input 
                      {...register("phone")}
                      className={`w-full bg-input border ${errors.phone ? 'border-destructive' : 'border-border'} rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
                      placeholder="+91 XXXXX XXXXX"
                    />
                    {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 uppercase tracking-wide">Email Address</label>
                    <input 
                      {...register("email")}
                      type="email"
                      className={`w-full bg-input border ${errors.email ? 'border-destructive' : 'border-border'} rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 uppercase tracking-wide">Number of Guests</label>
                    <input 
                      {...register("guests")}
                      type="number"
                      min="1"
                      className={`w-full bg-input border ${errors.guests ? 'border-destructive' : 'border-border'} rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
                      placeholder="100"
                    />
                    {errors.guests && <p className="text-destructive text-sm mt-1">{errors.guests.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 uppercase tracking-wide">Event Type</label>
                  <select 
                    {...register("eventType")}
                    className={`w-full bg-input border ${errors.eventType ? 'border-destructive' : 'border-border'} rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none`}
                  >
                    <option value="Wedding Catering">Wedding Catering</option>
                    <option value="Corporate Catering">Corporate Catering</option>
                    <option value="Social Event">Social Event</option>
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.eventType && <p className="text-destructive text-sm mt-1">{errors.eventType.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 uppercase tracking-wide">Event Details / Message</label>
                  <textarea 
                    {...register("message")}
                    rows={4}
                    className={`w-full bg-input border ${errors.message ? 'border-destructive' : 'border-border'} rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none`}
                    placeholder="Tell us about your date, venue, and specific requirements..."
                  ></textarea>
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
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
                  ) : "Submit Inquiry"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
