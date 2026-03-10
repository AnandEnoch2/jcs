export function Footer() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/916380322818", "_blank");
  };

  return (
    <footer className="bg-black border-t border-border/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center bg-card hover:bg-primary/20 transition-colors">
              <span className="font-display font-bold text-primary text-lg">JC</span>
            </div>
            <span className="font-display font-bold text-xl tracking-widest text-foreground uppercase">
              Jesus Catering
            </span>
          </div>

          <div className="flex items-center gap-4">
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
