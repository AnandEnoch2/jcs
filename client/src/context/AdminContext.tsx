import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
}

export interface GalleryVideo {
  id: string;
  url: string;
  title: string;
}

export interface PageImages {
  homeBg: string[];
  aboutBg: string;
  servicesBg: string;
  galleryBg: string;
  contactBg: string;
  menuBg: string;
  aboutStory1: string;
  aboutStory2: string;
}

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
  gallery: {
    photos: GalleryPhoto[];
    videos: GalleryVideo[];
  };
  pageImages: PageImages;
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
  gallery: {
    photos: [
      { id: "p1", url: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80", alt: "Wedding Catering Setup" },
      { id: "p2", url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", alt: "Delicious Plating" },
      { id: "p3", url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80", alt: "North Indian" },
      { id: "p4", url: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=600&q=80", alt: "South Indian" },
      { id: "p5", url: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&q=80", alt: "Chinese" },
      { id: "p6", url: "https://images.unsplash.com/photo-1504674900769-adf95eef0d5a?w=600&q=80", alt: "Food Prep" },
      { id: "p7", url: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=80", alt: "Events" },
      { id: "p8", url: "https://images.unsplash.com/photo-1555939594-58d7cb561341?w=600&q=80", alt: "Service" },
    ],
    videos: [
      { id: "v1", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Event Highlights" },
      { id: "v2", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Food Preparation" },
    ],
  },
  pageImages: {
    homeBg: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=80",
      "https://media-cdn.tripadvisor.com/media/photo-s/12/59/d7/fc/panner-at-kalyan-rooftop.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/18/93/8a/58/north-indian-chinese.jpg",
      "https://ik.imagekit.io/munchery/blog/tr:w-768/from-punjab-to-tamil-nadu-a-tour-of-ten-indian-thalis.jpeg",
    ],
    aboutBg: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1920&q=80",
    servicesBg: "https://images.unsplash.com/photo-1555939594-58d7cb561341?w=1920&q=80",
    galleryBg: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=80",
    contactBg: "https://images.unsplash.com/photo-1504674900769-adf95eef0d5a?w=1920&q=80",
    menuBg: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80",
    aboutStory1: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
    aboutStory2: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
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
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultContent,
          ...parsed,
          gallery: { ...defaultContent.gallery, ...(parsed.gallery || {}) },
          pageImages: { ...defaultContent.pageImages, ...(parsed.pageImages || {}) },
        };
      }
      return defaultContent;
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
