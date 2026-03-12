import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChefHat, Phone, Mail, MapPin, Clock } from "lucide-react";
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
  guests: z.coerce.number().int("Must be a whole number").min(1, "Must have at least 1 guest"),
  message: z.string().min(10, "Please provide some details"),
});

type FormData = z.infer<typeof formSchema>;

const WHATSAPP_NUMBERS = [
  { label: "6380322818", number: "916380322818" },
  { label: "9790728715", number: "919790728715" },
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Contact() {
  const { content } = useAdmin();
  const { contactBg } = content.pageImages;
  const [showWhatsAppPicker, setShowWhatsAppPicker] = useState(false);
  const [pendingWhatsAppMsg, setPendingWhatsAppMsg] = useState("");
  const { mutate: createInquiry, isPending } = useCreateInquiry();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventType: "Wedding Catering"
    }
  });

  const onSubmit = (data: FormData) => {
    createInquiry(data, {
      onSuccess: () => {
        reset();
        const message = `*New Catering Inquiry*\n\n📝 Name: ${data.name}\n📧 Email: ${data.email}\n📱 Phone: ${data.phone}\n🎉 Event Type: ${data.eventType}\n👥 Number of Guests: ${data.guests}\n💬 Details: ${data.message}`;
        setPendingWhatsAppMsg(encodeURIComponent(message));
        setShowWhatsAppPicker(true);
      }
    });
  };

  const sendToWhatsApp = (number: string) => {
    window.open(`https://wa.me/${number}?text=${pendingWhatsAppMsg}`, "_blank");
    setShowWhatsAppPicker(false);
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-black">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={contactBg} 
            alt="Contact Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
          <AnimatedFood emoji="🥘" delay={0} x={95} y={160} />
          <AnimatedFood emoji="🍛" delay={1.3} x={-105} y={140} />
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

                {/* WhatsApp Quick Contact */}
                <div className="pt-4">
                  <p className="text-sm text-primary uppercase tracking-wider mb-3">WhatsApp Us Directly</p>
                  <div className="space-y-2">
                    {WHATSAPP_NUMBERS.map((item) => (
                      <a
                        key={item.number}
                        href={`https://wa.me/${item.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 py-2 px-4 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all text-green-400 font-medium"
                        data-testid={`link-whatsapp-${item.label}`}
                      >
                        <WhatsAppIcon />
                        {item.label}
                      </a>
                    ))}
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
                      data-testid="input-name"
                    />
                    {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 uppercase tracking-wide">Phone Number</label>
                    <input 
                      {...register("phone")}
                      className={`w-full bg-input border ${errors.phone ? 'border-destructive' : 'border-border'} rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
                      placeholder="+91 XXXXX XXXXX"
                      data-testid="input-phone"
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
                      data-testid="input-email"
                    />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 uppercase tracking-wide">Number of Guests</label>
                    <input 
                      {...register("guests", { valueAsNumber: true })}
                      type="number"
                      min="1"
                      className={`w-full bg-input border ${errors.guests ? 'border-destructive' : 'border-border'} rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
                      placeholder="100"
                      data-testid="input-guests"
                    />
                    {errors.guests && <p className="text-destructive text-sm mt-1">{errors.guests.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 uppercase tracking-wide">Event Type</label>
                  <select 
                    {...register("eventType")}
                    className={`w-full bg-input border ${errors.eventType ? 'border-destructive' : 'border-border'} rounded-none px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none`}
                    data-testid="select-event-type"
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
                    data-testid="textarea-message"
                  ></textarea>
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-4"
                  data-testid="button-submit-inquiry"
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
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-2">Inquiry Submitted!</h3>
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
                  <WhatsAppIcon />
                  Send to {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowWhatsAppPicker(false)}
              className="mt-4 text-sm text-muted-foreground hover:text-white transition-colors"
              data-testid="button-close-whatsapp-picker"
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
