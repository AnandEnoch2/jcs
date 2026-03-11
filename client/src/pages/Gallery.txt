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
    { id: 3, url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80", alt: "North Indian Cuisine" },
    { id: 4, url: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=600&q=80", alt: "South Indian Cuisine" },
    { id: 5, url: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&q=80", alt: "Chinese Cuisine" },
    { id: 6, url: "https://images.unsplash.com/photo-1504674900769-adf95eef0d5a?w=600&q=80", alt: "Food Preparation" },
    { id: 7, url: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=80", alt: "Event Setup" },
    { id: 8, url: "https://images.unsplash.com/photo-1555939594-58d7cb561341?w=600&q=80", alt: "Catering Service" },
  ];

  const videos = [
    { id: 1, url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Catering Event Highlights" },
    { id: 2, url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Food Preparation Process" },
    { id: 3, url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Wedding Catering Setup" },
    { id: 4, url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Customer Testimonials" },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-black">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=80" 
            alt="Gallery Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
          <AnimatedFood emoji="📸" delay={0} x={95} y={160} />
          <AnimatedFood emoji="🎥" delay={1.3} x={-105} y={140} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-4">
              Gallery
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore Our Beautiful Events & Delicious Creations
            </p>
          </motion.div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Portfolio" subtitle="Videos & Photos" />

          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            <motion.button
              onClick={() => setActiveTab("photos")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === "photos"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card border border-border hover:border-primary text-foreground"
              }`}
              data-testid="tab-photos"
            >
              <ImageIcon size={20} />
              Photos
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("videos")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === "videos"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card border border-border hover:border-primary text-foreground"
              }`}
              data-testid="tab-videos"
            >
              <Play size={20} />
              Videos
            </motion.button>
          </div>

          {/* PHOTOS TAB */}
          {activeTab === "photos" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {photos.map((photo, idx) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
                  data-testid={`photo-${photo.id}`}
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-center font-bold">{photo.alt}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* VIDEOS TAB */}
          {activeTab === "videos" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {videos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative rounded-xl overflow-hidden aspect-video bg-background border border-border hover:border-primary transition-all duration-300 group"
                  data-testid={`video-${video.id}`}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={video.url}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                  <div className="absolute top-4 right-4 bg-primary px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-primary-foreground text-sm font-bold">{video.title}</span>
                  </div>
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
