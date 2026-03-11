import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useAdmin, SiteContent } from "@/context/AdminContext";
import { LogOut, Save, Home, Phone, Star, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { isAdmin, logout, content, updateContent } = useAdmin();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hero");
  const [form, setForm] = useState<SiteContent>(content);

  useEffect(() => {
    if (!isAdmin) navigate("/");
  }, [isAdmin, navigate]);

  useEffect(() => {
    setForm(content);
  }, [content]);

  const handleSave = () => {
    updateContent(form);
    toast({
      title: "Saved Successfully!",
      description: "Your changes are now live on the website.",
      style: { backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--primary))", color: "hsl(var(--primary))" },
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const updateField = (section: keyof SiteContent, field: string, value: string) => {
    setForm((prev) => ({ ...prev, [section]: { ...prev[section] as object, [field]: value } }));
  };

  const updateWhyItem = (idx: number, field: "title" | "desc", value: string) => {
    const items = [...form.whyChooseUs.items];
    items[idx] = { ...items[idx], [field]: value };
    setForm((prev) => ({ ...prev, whyChooseUs: { ...prev.whyChooseUs, items } }));
  };

  if (!isAdmin) return null;

  const tabs = [
    { id: "hero", label: "Home Hero", icon: Home },
    { id: "about", label: "About", icon: Info },
    { id: "whyUs", label: "Why Choose Us", icon: Star },
    { id: "contact", label: "Contact Info", icon: Phone },
  ];

  const inputClass = "w-full bg-background border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm";
  const labelClass = "block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5";

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Header */}
      <header className="bg-card border-b border-border/50 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/20 border border-primary/40 rounded-lg flex items-center justify-center">
            <Star className="text-primary" size={18} />
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-lg">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">Jesus Catering Service</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-lg font-bold text-sm hover:bg-white hover:text-black transition-all"
            data-testid="button-save-admin"
          >
            <Save size={16} /> Save Changes
          </motion.button>
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm hover:bg-red-500/20 transition-all"
            data-testid="button-logout-admin"
          >
            <LogOut size={16} /> Logout
          </motion.button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <aside className="w-56 bg-card border-r border-border/50 p-4 flex flex-col gap-2 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-background hover:text-white"
                }`}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
          <div className="mt-auto pt-4 border-t border-border/50">
            <a href="/" target="_blank" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors px-2">
              <Home size={14} /> View Website
            </a>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* HERO SECTION */}
            {activeTab === "hero" && (
              <div className="max-w-2xl space-y-6">
                <h2 className="text-2xl font-display font-bold text-white mb-6">Home Hero Section</h2>
                <div>
                  <label className={labelClass}>Tagline (small text above title)</label>
                  <input className={inputClass} value={form.hero.tagline} onChange={(e) => updateField("hero", "tagline", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Main Title</label>
                  <input className={inputClass} value={form.hero.title} onChange={(e) => updateField("hero", "title", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Bible Verse / Subtitle</label>
                  <input className={inputClass} value={form.hero.subtitle} onChange={(e) => updateField("hero", "subtitle", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Verse Reference (e.g. — Psalm 1:3)</label>
                  <input className={inputClass} value={form.hero.verse} onChange={(e) => updateField("hero", "verse", e.target.value)} />
                </div>
              </div>
            )}

            {/* ABOUT SECTION */}
            {activeTab === "about" && (
              <div className="max-w-2xl space-y-6">
                <h2 className="text-2xl font-display font-bold text-white mb-6">About / Our Story Section</h2>
                <div>
                  <label className={labelClass}>Proprietor Name</label>
                  <input className={inputClass} value={form.about.proprietor} onChange={(e) => updateField("about", "proprietor", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Description Paragraph 1</label>
                  <textarea rows={4} className={inputClass + " resize-none"} value={form.about.description1} onChange={(e) => updateField("about", "description1", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Description Paragraph 2</label>
                  <textarea rows={4} className={inputClass + " resize-none"} value={form.about.description2} onChange={(e) => updateField("about", "description2", e.target.value)} />
                </div>
              </div>
            )}

            {/* WHY CHOOSE US */}
            {activeTab === "whyUs" && (
              <div className="max-w-2xl space-y-6">
                <h2 className="text-2xl font-display font-bold text-white mb-6">Why Choose Us Section</h2>
                <div>
                  <label className={labelClass}>Section Title</label>
                  <input className={inputClass} value={form.whyChooseUs.title} onChange={(e) => setForm((p) => ({ ...p, whyChooseUs: { ...p.whyChooseUs, title: e.target.value } }))} />
                </div>
                <div>
                  <label className={labelClass}>Section Subtitle</label>
                  <input className={inputClass} value={form.whyChooseUs.subtitle} onChange={(e) => setForm((p) => ({ ...p, whyChooseUs: { ...p.whyChooseUs, subtitle: e.target.value } }))} />
                </div>
                <div className="space-y-4">
                  <label className={labelClass}>Items (6 features)</label>
                  {form.whyChooseUs.items.map((item, idx) => (
                    <div key={idx} className="bg-background border border-border rounded-lg p-4 space-y-3">
                      <p className="text-xs text-primary font-bold">Item {idx + 1}</p>
                      <div>
                        <label className={labelClass}>Title</label>
                        <input className={inputClass} value={item.title} onChange={(e) => updateWhyItem(idx, "title", e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClass}>Description</label>
                        <input className={inputClass} value={item.desc} onChange={(e) => updateWhyItem(idx, "desc", e.target.value)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT */}
            {activeTab === "contact" && (
              <div className="max-w-2xl space-y-6">
                <h2 className="text-2xl font-display font-bold text-white mb-6">Contact Information</h2>
                {[
                  { key: "phone1", label: "Phone 1" },
                  { key: "phone2", label: "Phone 2" },
                  { key: "phone3", label: "Phone 3" },
                  { key: "email", label: "Email Address" },
                  { key: "whatsapp", label: "WhatsApp Number (digits only, no +)" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className={labelClass}>{label}</label>
                    <input
                      className={inputClass}
                      value={(form.contact as Record<string, string>)[key]}
                      onChange={(e) => updateField("contact", key, e.target.value)}
                    />
                  </div>
                ))}
                <div>
                  <label className={labelClass}>Address</label>
                  <textarea rows={3} className={inputClass + " resize-none"} value={form.contact.address} onChange={(e) => updateField("contact", "address", e.target.value)} />
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
