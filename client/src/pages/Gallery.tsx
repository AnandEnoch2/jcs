import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedFood } from "@/components/AnimatedFood";
import { Play, Image as ImageIcon } from "lucide-react";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  const photos = [
    { id: 1, url: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80", alt: "Wedding Catering Setup" },
    { id: 2, url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", alt: "Delicious Plating" },
    { id: 3, url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80", alt: "North Indian" },
    { id: 4, url: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=600&q=80", alt: "South Indian" },
    { id: 5, url: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&q=80", alt: "Chinese" },
    { id: 6, url: "https://images.unsplash.com/photo-1504674900769-adf95eef0d5a?w=600&q=80", alt: "Prep" },
    { id: 7, url: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=80", alt: "Events" },
    { id: 8, url: "https://images.unsplash.com/photo-1555939594-58d7cb561341?w=600&q=80", alt: "Service" },
  ];

  const videos = [
    { id: 1, url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Highlights" },
    { id: 2, url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Preparation" },
    { id: 3, url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Wedding" },
    { id: 4, url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Testimonials" },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-black">
      <Navbar />
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=80" alt="Gallery" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
          <AnimatedFood emoji="📸" delay={0} x={95} y={160} />
          <AnimatedFood emoji="🎥" delay={1.3} x={-105} y={140} />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-4">Gallery</h1>
            <p className="text-xl text-muted-foreground">Explore Our Beautiful Events</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Portfolio" subtitle="Photos & Videos" />
          <div className="flex justify-center gap-4 mb-12">
            <motion.button onClick={() => setActiveTab("photos")} whileHover={{ scale: 1.05 }} className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold uppercase tracking-widest transition-all ${activeTab === "photos" ? "bg-primary text-primary-foreground" : "bg-card border border-border"}`}>
              <ImageIcon size={20} /> Photos
            </motion.button>
            <motion.button onClick={() => setActiveTab("videos")} whileHover={{ scale: 1.05 }} className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold uppercase tracking-widest transition-all ${activeTab === "videos" ? "bg-primary text-primary-foreground" : "bg-card border border-border"}`}>
              <Play size={20} /> Videos
            </motion.button>
          </div>

          {activeTab === "photos" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <motion.div key={photo.id} className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer">
                  <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-center font-bold">{photo.alt}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "videos" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((video) => (
                <motion.div key={video.id} className="relative rounded-xl overflow-hidden aspect-video bg-background border border-border">
                  <iframe width="100%" height="100%" src={video.url} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
