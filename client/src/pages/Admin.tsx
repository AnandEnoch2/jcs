import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useAdmin, SiteContent, Visit, GalleryPhoto, GalleryVideo } from "@/context/AdminContext";
import {
  LogOut, Save, Home, Phone, Star, Info, BarChart2,
  Download, Lock, User, Eye, EyeOff, RefreshCw,
  Utensils, Image, Briefcase, TrendingUp, Plus, Trash2, ImagePlus, Film, Layout,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";

const ADMIN_PASSWORD = "jcs@2026";
const ADMIN_USERNAME = "jcs@nellai";

function LoginPage() {
  const { login } = useAdmin();
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const ok = login(username, password);
      if (!ok) setError("Invalid username or password.");
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-primary/30 rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-primary" size={28} />
          </div>
          <h2 className="text-2xl font-display font-bold text-white">Admin Login</h2>
          <p className="text-muted-foreground text-sm mt-1">Jesus Catering Service</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="Enter username"
                data-testid="input-admin-username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-input border border-border rounded-lg pl-10 pr-10 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="Enter password"
                data-testid="input-admin-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-lg hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-70 mt-2"
            data-testid="button-admin-login"
          >
            {loading ? "Verifying..." : "Login to Admin"}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <a href="/" className="hover:text-primary transition-colors">← Back to Website</a>
        </p>
      </motion.div>
    </div>
  );
}

function formatHour(h: number) {
  const ampm = h < 12 ? "AM" : "PM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}${ampm}`;
}

function formatDay(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

function formatMonth(key: string) {
  const [y, m] = key.split("-");
  const d = new Date(parseInt(y), parseInt(m) - 1, 1);
  return d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
}

function buildDailyData(visits: Visit[]) {
  const today = new Date().toISOString().split("T")[0];
  const todayVisits = visits.filter((v) => v.date === today);
  const hourMap: Record<number, number> = {};
  for (let h = 0; h < 24; h++) hourMap[h] = 0;
  todayVisits.forEach((v) => {
    const h = new Date(v.timestamp).getHours();
    hourMap[h] = (hourMap[h] || 0) + 1;
  });
  return Object.entries(hourMap).map(([h, count]) => ({
    label: formatHour(parseInt(h)),
    count,
  }));
}

function buildWeeklyData(visits: Visit[]) {
  const days: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days[d.toISOString().split("T")[0]] = 0;
  }
  visits.forEach((v) => {
    if (days[v.date] !== undefined) days[v.date]++;
  });
  return Object.entries(days).map(([date, count]) => ({
    label: formatDay(date),
    count,
  }));
}

function buildMonthlyData(visits: Visit[]) {
  const days: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days[d.toISOString().split("T")[0]] = 0;
  }
  visits.forEach((v) => {
    if (days[v.date] !== undefined) days[v.date]++;
  });
  return Object.entries(days).map(([date, count]) => ({
    label: formatDay(date),
    count,
  }));
}

function buildYearlyData(visits: Visit[]) {
  const months: Record<string, number> = {};
  for (let i = 11; i >= 0; i--) {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    months[key] = 0;
  }
  visits.forEach((v) => {
    const key = v.date.substring(0, 7);
    if (months[key] !== undefined) months[key]++;
  });
  return Object.entries(months).map(([key, count]) => ({
    label: formatMonth(key),
    count,
  }));
}

function downloadCSV(data: { label: string; count: number }[], period: string) {
  const rows = ["Period,Visits", ...data.map((d) => `${d.label},${d.count}`)];
  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `jcs_visitors_${period}_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function DashboardTab() {
  const { getVisits } = useAdmin();
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly" | "yearly">("weekly");
  const [visits, setVisits] = useState<Visit[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const refresh = useCallback(() => {
    setVisits(getVisits());
    setLastRefresh(new Date());
  }, [getVisits]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, [refresh]);

  const chartData = period === "daily"
    ? buildDailyData(visits)
    : period === "weekly"
    ? buildWeeklyData(visits)
    : period === "monthly"
    ? buildMonthlyData(visits)
    : buildYearlyData(visits);

  const totalToday = visits.filter(
    (v) => v.date === new Date().toISOString().split("T")[0]
  ).length;
  const totalWeek = buildWeeklyData(visits).reduce((a, b) => a + b.count, 0);
  const totalMonth = buildMonthlyData(visits).reduce((a, b) => a + b.count, 0);
  const totalAll = visits.length;

  const stats = [
    { label: "Today", value: totalToday, color: "text-primary" },
    { label: "This Week", value: totalWeek, color: "text-blue-400" },
    { label: "This Month", value: totalMonth, color: "text-green-400" },
    { label: "All Time", value: totalAll, color: "text-purple-400" },
  ];

  const periods: { id: "daily" | "weekly" | "monthly" | "yearly"; label: string }[] = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-white">Visitor Analytics</h2>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Last updated: {lastRefresh.toLocaleTimeString("en-IN")}</span>
          <button
            onClick={refresh}
            className="p-1.5 hover:text-primary transition-colors"
            title="Refresh"
            data-testid="button-refresh-stats"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-background border border-border rounded-xl p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-3xl font-bold font-display ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">visits</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-background border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex gap-2">
            {periods.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  period === p.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-white border border-border"
                }`}
                data-testid={`button-period-${p.id}`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => downloadCSV(chartData, period)}
            className="flex items-center gap-2 px-4 py-1.5 bg-card border border-border rounded-lg text-sm text-muted-foreground hover:text-white hover:border-primary transition-all"
            data-testid="button-download-csv"
          >
            <Download size={14} /> Download CSV
          </button>
        </div>

        <div className="h-64">
          {chartData.every((d) => d.count === 0) ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <TrendingUp size={40} className="mb-3 opacity-30" />
              <p className="text-sm">No visit data yet for this period.</p>
              <p className="text-xs mt-1 opacity-60">Data accumulates as visitors browse the site.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "#9ca3af", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  interval={period === "monthly" ? 4 : period === "daily" ? 2 : 0}
                />
                <YAxis
                  tick={{ fill: "#9ca3af", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: 12,
                  }}
                  cursor={{ fill: "rgba(212,175,55,0.1)" }}
                />
                <Bar dataKey="count" name="Visits" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill="hsl(var(--primary))" fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Page breakdown */}
      {visits.length > 0 && (
        <div className="bg-background border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Page Breakdown (All Time)</h3>
          <div className="space-y-2">
            {Object.entries(
              visits.reduce<Record<string, number>>((acc, v) => {
                acc[v.page] = (acc[v.page] || 0) + 1;
                return acc;
              }, {})
            )
              .sort((a, b) => b[1] - a[1])
              .map(([page, count]) => (
                <div key={page} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-32 truncate">{page || "/"}</span>
                  <div className="flex-1 bg-card rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${Math.min(100, (count / totalAll) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm text-white font-medium w-8 text-right">{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const { isAdmin, logout, content, updateContent } = useAdmin();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [form, setForm] = useState<SiteContent>(content);

  useEffect(() => { setForm(content); }, [content]);

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

  if (!isAdmin) return <LoginPage />;

  const inputClass = "w-full bg-background border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm";
  const labelClass = "block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5";

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart2 },
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: Info },
    { id: "whyUs", label: "Why Choose Us", icon: Star },
    { id: "menu", label: "Menu Page", icon: Utensils },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "gallery", label: "Gallery Media", icon: Image },
    { id: "pageImages", label: "Page Images", icon: Layout },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "footer", label: "Footer", icon: Home },
  ];

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
          {activeTab !== "dashboard" && (
            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-lg font-bold text-sm hover:bg-white hover:text-black transition-all"
              data-testid="button-save-admin"
            >
              <Save size={16} /> Save Changes
            </motion.button>
          )}
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm text-muted-foreground hover:text-white transition-all"
          >
            <Home size={14} /> View Site
          </a>
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
        <aside className="w-56 bg-card border-r border-border/50 p-4 flex flex-col gap-1 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-background hover:text-white"
                }`}
                data-testid={`tab-${tab.id}`}
              >
                <Icon size={15} /> {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* DASHBOARD */}
            {activeTab === "dashboard" && <DashboardTab />}

            {/* HOME HERO */}
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

            {/* ABOUT */}
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
                  <label className={labelClass}>Features (6 items)</label>
                  {form.whyChooseUs.items.map((item, idx) => (
                    <div key={idx} className="bg-background border border-border rounded-lg p-4 space-y-3">
                      <p className="text-xs text-primary font-bold">Feature {idx + 1}</p>
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

            {/* MENU PAGE INFO */}
            {activeTab === "menu" && (
              <div className="max-w-2xl space-y-6">
                <h2 className="text-2xl font-display font-bold text-white mb-2">Menu Page</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  The menu page displays all dishes. Order links for Zomato and Swiggy are managed directly in the code.
                  Below are the current ordering links for reference.
                </p>
                <div className="space-y-4">
                  <div className="bg-background border border-border rounded-lg p-4">
                    <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2">Zomato Order Link</p>
                    <p className="text-sm text-gray-300 break-all">https://www.zomato.com/tirunelveli/rehoboth-kitchen-1-tirunelveli-locality/order</p>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-4">
                    <p className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-2">Swiggy Order Link</p>
                    <p className="text-sm text-gray-300 break-all">https://www.swiggy.com/city/tirunelveli/rehoboth-kitchen-vannarpettai-rest1064327</p>
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES PAGE */}
            {activeTab === "services" && (
              <div className="max-w-2xl space-y-6">
                <h2 className="text-2xl font-display font-bold text-white mb-2">Services Page</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  The services page lists all catering categories with descriptions. Content is currently managed in the page component.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { name: "Wedding Catering", desc: "Elegant feasts for your special day" },
                    { name: "Corporate Catering", desc: "Professional dining for meetings and events" },
                    { name: "Social Events", desc: "Crafted menus for private gatherings" },
                    { name: "Family Style", desc: "Comforting shareable dishes" },
                    { name: "Outdoor Catering", desc: "Full-service for outdoor venues" },
                    { name: "Birthday Parties", desc: "Fun vibrant menus for all ages" },
                  ].map((s) => (
                    <div key={s.name} className="flex items-center gap-3 bg-background border border-border rounded-lg p-3">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="text-sm text-white font-medium">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GALLERY PAGE */}
            {activeTab === "gallery" && (
              <div className="max-w-2xl space-y-6">
                <h2 className="text-2xl font-display font-bold text-white mb-2">Gallery Page</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  The gallery page showcases food and event images. Images are currently sourced from Unsplash.
                </p>
                <div className="bg-background border border-border rounded-lg p-4 space-y-2">
                  <p className="text-xs text-primary font-bold uppercase tracking-wider">Current Gallery</p>
                  <p className="text-sm text-muted-foreground">The gallery displays images for North Indian, South Indian, Chinese dishes, and catering events.</p>
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
                  { key: "whatsapp", label: "WhatsApp Number (digits only, e.g. 916380322818)" },
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

            {/* FOOTER */}
            {activeTab === "footer" && (
              <div className="max-w-2xl space-y-6">
                <h2 className="text-2xl font-display font-bold text-white mb-6">Footer Section</h2>
                <div>
                  <label className={labelClass}>Footer Tagline</label>
                  <input className={inputClass} value={form.footer.tagline} onChange={(e) => updateField("footer", "tagline", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Copyright Text</label>
                  <input className={inputClass} value={form.footer.copyright} onChange={(e) => updateField("footer", "copyright", e.target.value)} />
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
