import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SmokeAnimation } from "@/components/SmokeAnimation";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Menu from "@/pages/Menu";
import Gallery from "@/pages/Gallery";
import Admin from "@/pages/Admin";

function VisitTracker() {
  const [location] = useLocation();
  const { trackVisit } = useAdmin();

  useEffect(() => {
    trackVisit(location);
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/menu" component={Menu} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminProvider>
          <Toaster />
          <SmokeAnimation />
          <VisitTracker />
          <Router />
          <WhatsAppButton />
        </AdminProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
