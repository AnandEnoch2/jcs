import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface SiteContent {
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
    verse: string;
    verseRef: string;
  };
  about: {
    title: string;
    description1: string;
    description2: string;
    proprietor: string;
  };
  whyChooseUs: {
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  contact: {
    phone1: string;
    phone2: string;
    phone3: string;
    email: string;
    address: string;
    whatsapp: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
}

export interface Visit {
  timestamp: number;
  page: string;
  date: string;
}

const VISITS_KEY = "jcs_visits";
const MAX_VISITS = 10000;

const defaultContent: SiteContent = {
  hero: {
    tagline: "Serving with Love, Blessed by Grace.",
    title: "Jesus Catering Service",
    subtitle: '".... Whatever he does shall Prosper"',
    verse: "— Psalm 1:3",
    verseRef: "Psalm 1:3",
  },
  about: {
    title: "Our Story",
    description1:
      "Led by Proprietor T. Navaneetha Ramakrishnan, Jesus Catering Service has established itself as a beacon of culinary excellence in Palayamkottai and beyond.",
    description2:
      "We believe that every event is a sacred gathering, and the food served should reflect the joy and blessing of the occasion. From intimate family gatherings to grand weddings, our team is dedicated to providing an impeccable dining experience.",
    proprietor: "T. Navaneetha Ramakrishnan",
  },
  whyChooseUs: {
    title: "Why Choose Us",
    subtitle: "Excellence in Every Meal",
    items: [
      { title: "Fresh and High-Quality Ingredients", desc: "We source only the finest, freshest ingredients for our dishes." },
      { title: "Experienced Cooking Team", desc: "Our skilled chefs bring years of culinary expertise." },
      { title: "Delicious Diverse Cuisines", desc: "South Indian, North Indian & Chinese Foods at their best." },
      { title: "Affordable Packages", desc: "Premium quality without breaking your budget." },
      { title: "Hygienic Food Preparation", desc: "We maintain the highest standards of food safety and cleanliness." },
      { title: "Reliable and On-Time Service", desc: "Professional delivery that respects your schedule." },
    ],
  },
  contact: {
    phone1: "+91 89032 02413",
    phone2: "+91 63803 22818",
    phone3: "+91 97907 28715",
    email: "jesuscateringservicenellai@gmail.com",
    address: "No.75, Tiruchendur Road, Palayamkottai - 627 002",
    whatsapp: "916380322818",
  },
  footer: {
    tagline: "Serving with Love, Blessed by Grace.",
    copyright: "Jesus Catering Service. All rights reserved.",
  },
};

interface AdminContextType {
  isAdmin: boolean;
  content: SiteContent;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateContent: (newContent: SiteContent) => void;
  trackVisit: (page: string) => void;
  getVisits: () => Visit[];
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem("jcs_site_content");
      return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
    } catch {
      return defaultContent;
    }
  });

  useEffect(() => {
    const adminSession = sessionStorage.getItem("jcs_admin");
    if (adminSession === "true") setIsAdmin(true);
  }, []);

  const login = (username: string, password: string) => {
    if (username === "jcs@nellai" && password === "jcs@2026") {
      setIsAdmin(true);
      sessionStorage.setItem("jcs_admin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("jcs_admin");
  };

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    localStorage.setItem("jcs_site_content", JSON.stringify(newContent));
  };

  const trackVisit = (page: string) => {
    try {
      const now = new Date();
      const visit: Visit = {
        timestamp: now.getTime(),
        page,
        date: now.toISOString().split("T")[0],
      };
      const raw = localStorage.getItem(VISITS_KEY);
      const visits: Visit[] = raw ? JSON.parse(raw) : [];
      visits.push(visit);
      if (visits.length > MAX_VISITS) visits.splice(0, visits.length - MAX_VISITS);
      localStorage.setItem(VISITS_KEY, JSON.stringify(visits));
    } catch {}
  };

  const getVisits = (): Visit[] => {
    try {
      const raw = localStorage.getItem(VISITS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  return (
    <AdminContext.Provider value={{
      isAdmin, content, login, logout, updateContent, trackVisit, getVisits,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
