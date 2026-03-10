import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "916380322818";
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300"
      title="Chat with us on WhatsApp"
      data-testid="button-whatsapp"
    >
      <MessageCircle size={28} className="text-white" />
    </motion.button>
  );
}
