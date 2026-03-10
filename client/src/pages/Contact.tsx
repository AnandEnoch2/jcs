import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChefHat, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { useCreateInquiry } from "@/hooks/use-inquiries";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  eventType: z.string().min(1, "Event type is required"),
  guests: z.coerce.number().min(1, "Must have at least 1 guest"),
  message: z.string().min(10, "Please provide some details"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
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

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-black">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900769-adf95eef0d5a?w=1920&q=80" 
            alt="Contact Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Plan Your Perfect Event
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-24 relative bg-card/50 border-t border-border/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading title="Contact Information" subtitle="We'd Love to Hear From You" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="space-y-6">
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
