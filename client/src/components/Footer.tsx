import cateringLogo from "@assets/WhatsApp_Image_2026-03-10_at_1,42,08_PM-photoaidcom-cropped_1773214984482.jpeg";

export function Footer() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/916380322818", "_blank");
  };

  const handleCallClick = () => {
    window.location.href = "tel:8903203413";
  };

  return (
    <footer className="bg-black border-t border-border/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img 
              src={cateringLogo} 
              alt="Jesus Catering Service Logo" 
              className="w-14 h-14 object-contain hover:scale-110 transition-transform duration-300"
            />
            <div>
              <span className="font-display font-bold text-xl tracking-widest text-foreground uppercase block">
                Jesus Catering
              </span>
              <span className="text-xs text-primary font-semibold">Premium Catering Service</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleCallClick}
              className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors duration-300"
              title="Call us at 8903203413"
              data-testid="button-call-footer"
            >
              <span className="text-lg">📞</span>
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors duration-300"
              title="Chat with us on WhatsApp"
              data-testid="button-whatsapp-footer"
            >
              <span className="text-lg">💬</span>
            </button>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Jesus Catering Service. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Serving with Love, Blessed by Grace.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
