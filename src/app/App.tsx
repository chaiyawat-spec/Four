import { useState, type ReactNode } from "react";
import { Heart, Clock, CheckSquare, Music, Bell, MessageCircle, Menu, X } from "lucide-react";
import { DayCounter } from "./components/DayCounter";
import { Timeline } from "./components/Timeline";
import { Wishlist } from "./components/Wishlist";
import { OurSongs } from "./components/OurSongs";
import { Countdown } from "./components/Countdown";
import { SecretMessage } from "./components/SecretMessage";

type Tab = "timeline" | "wishlist" | "songs" | "countdown" | "secret";

const TABS: { id: Tab; label: string; labelTh: string; icon: ReactNode }[] = [
  { id: "timeline", label: "Timeline", labelTh: "ความทรงจำ", icon: <Clock size={18} /> },
  { id: "wishlist", label: "Wishlist", labelTh: "บัคเก็ตลิสต์", icon: <CheckSquare size={18} /> },
  { id: "songs", label: "Our Songs", labelTh: "เพลงของเรา", icon: <Music size={18} /> },
  { id: "countdown", label: "Countdown", labelTh: "นับถอยหลัง", icon: <Bell size={18} /> },
  { id: "secret", label: "Secret", labelTh: "ข้อความลับ", icon: <MessageCircle size={18} /> },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("timeline");

  const [menuOpen, setMenuOpen] = useState(false);

  const activeTab = TABS.find(t => t.id === tab)!;

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg, #fdf6f0 0%, #fde8e8 40%, #fdf6f0 100%)",
        fontFamily: "'Lato', sans-serif",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="fixed top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(247,197,208,0.35) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
      />
      <div
        className="fixed bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(253,232,216,0.4) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }}
      />

      {/* ── TOP NAVBAR ── */}
      <nav
        className="sticky top-0 z-40 w-full"
        style={{
          background: "rgba(255, 250, 247, 0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(201,116,138,0.14)",
          boxShadow: "0 2px 20px rgba(201,116,138,0.08)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Heart size={20} fill="#c9748a" stroke="none" />
            <span
              className="italic"
              style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65", fontSize: "1.2rem" }}
            >
              ของเราสองคน
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all"
                style={{
                  background: tab === t.id ? "#c9748a" : "transparent",
                  color: tab === t.id ? "white" : "#9a7a7a",
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: tab === t.id ? 500 : 400,
                }}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl transition-all"
            style={{ color: "#c9748a" }}
            onClick={() => setMenuOpen(o => !o)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div
            className="md:hidden border-t"
            style={{ borderColor: "rgba(201,116,138,0.12)", background: "rgba(255, 250, 247, 0.97)" }}
          >
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-6 py-3.5 text-sm text-left transition-all"
                style={{
                  background: tab === t.id ? "#fef3f7" : "transparent",
                  color: tab === t.id ? "#a84f65" : "#6b5050",
                  borderLeft: tab === t.id ? "3px solid #c9748a" : "3px solid transparent",
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: tab === t.id ? 500 : 400,
                }}
              >
                <span style={{ color: tab === t.id ? "#c9748a" : "#c4b0b0" }}>{t.icon}</span>
                <div>
                  <div>{t.label}</div>
                  <div className="text-xs" style={{ color: "#9a7a7a" }}>{t.labelTh}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── PAGE CONTENT ── */}
      <div className="max-w-2xl mx-auto px-4 pb-28">
        {/* Header hero */}
        <header className="pt-8 pb-6 text-center">
          <p
            className="text-xs tracking-widest uppercase mb-1"
            style={{ color: "#c9748a", letterSpacing: "0.22em", fontFamily: "'Lato', sans-serif" }}
          >
            our little world
          </p>
          <p
            className="mt-1"
            style={{ fontFamily: "'Dancing Script', cursive", color: "#a84f65", fontSize: "1.15rem" }}
          >
            เก็บทุกช่วงเวลาที่มีค่าไว้ที่นี่ ❤️
          </p>
        </header>

        {/* Day Counter */}
        <div className="mb-8">
          <DayCounter />
        </div>

        {/* Section header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2" style={{ color: "#c9748a" }}>
            {activeTab.icon}
          </div>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65", fontSize: "1.25rem", lineHeight: 1.2 }}>
              {activeTab.label}
            </h2>
            <p className="text-xs" style={{ color: "#9a7a7a", fontFamily: "'Lato', sans-serif" }}>{activeTab.labelTh}</p>
          </div>
          <div className="flex-1 h-px ml-2" style={{ background: "linear-gradient(to right, rgba(201,116,138,0.2), transparent)" }} />
        </div>

        {/* Content card */}
        <div
          className="rounded-3xl p-6"
          style={{
            background: "rgba(255, 250, 247, 0.75)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(201,116,138,0.1)",
            boxShadow: "0 8px 40px rgba(201,116,138,0.08)",
          }}
        >
          {tab === "timeline" && <Timeline />}
          {tab === "wishlist" && <Wishlist />}
          {tab === "songs" && <OurSongs />}
          {tab === "countdown" && <Countdown />}
          {tab === "secret" && <SecretMessage />}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p style={{ fontFamily: "'Dancing Script', cursive", color: "#c9748a", fontSize: "1rem" }}>
            made with ❤️ สำหรับคนที่รัก
          </p>
        </div>
      </div>

      {/* ── BOTTOM MOBILE NAV ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex"
        style={{
          background: "rgba(255, 250, 247, 0.95)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(201,116,138,0.14)",
          boxShadow: "0 -4px 20px rgba(201,116,138,0.1)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-all"
            style={{ color: tab === t.id ? "#c9748a" : "#c4b0b0" }}
          >
            <div
              className="rounded-xl p-1.5 transition-all"
              style={{ background: tab === t.id ? "#fef3f7" : "transparent" }}
            >
              {t.icon}
            </div>
            <span
              className="text-xs"
              style={{
                fontFamily: "'Lato', sans-serif",
                color: tab === t.id ? "#a84f65" : "#c4b0b0",
                fontWeight: tab === t.id ? 500 : 400,
              }}
            >
              {t.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
