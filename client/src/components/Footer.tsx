export function Footer() {
  return (
    <footer className="bg-black border-t border-border/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center bg-card">
              <span className="font-display font-bold text-primary">JC</span>
            </div>
            <span className="font-display font-bold text-xl tracking-widest text-foreground uppercase">
              Jesus Catering
            </span>
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
