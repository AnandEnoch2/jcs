import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedFood } from "@/components/AnimatedFood";
import { Play, Image as ImageIcon, X } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const { content } = useAdmin();

  const { photos, videos } = content.gallery;
  const { galleryBg } = content.pageImages;

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-black">
      <Navbar />

      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img src={galleryBg} alt="Gallery" className="w-full h-full object-cover opacity-20" />
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
              {photos.length === 0 && (
                <p className="col-span-4 text-center text-muted-foreground py-12">No photos yet. Add some from the admin panel.</p>
              )}
              {photos.map((photo) => (
                <motion.div
                  key={photo.id}
                  className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
                  onClick={() => setLightboxUrl(photo.url)}
                  whileHover={{ scale: 1.02 }}
                >
                  <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-center font-bold px-2">{photo.alt}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "videos" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.length === 0 && (
                <p className="col-span-2 text-center text-muted-foreground py-12">No videos yet. Add some from the admin panel.</p>
              )}
              {videos.map((video) => (
                <motion.div key={video.id} className="relative rounded-xl overflow-hidden bg-background border border-border">
                  <p className="text-sm font-semibold text-primary px-4 pt-3 pb-1">{video.title}</p>
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={video.url}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxUrl(null)}
        >
          <button className="absolute top-4 right-4 text-white hover:text-primary" onClick={() => setLightboxUrl(null)}>
            <X size={28} />
          </button>
          <img src={lightboxUrl} alt="Preview" className="max-w-full max-h-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <Footer />
    </div>
  );
}
