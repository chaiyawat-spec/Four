import { useState } from "react";
import { Lock, Unlock, Plus, X, Eye, Clock } from "lucide-react";
import { format, isPast, isFuture } from "date-fns";
import { th } from "date-fns/locale/th";

interface Message {
  id: string;
  title: string;
  content: string;
  openDate: string;
  from: string;
  revealed: boolean;
}

const INITIAL: Message[] = [
  {
    id: "1",
    title: "ข้อความพิเศษสำหรับวันวาเลนไทน์ 💌",
    content: "ที่รัก... ขอบคุณที่อยู่ด้วยกันมาตลอด ทุกวันที่มีเธอมันพิเศษมากสำหรับฉัน รักเธอมากนะ ❤️",
    openDate: "2026-02-14",
    from: "ฉัน",
    revealed: false,
  },
  {
    id: "2",
    title: "ข้อความลับสุดพิเศษ 🌸",
    content: "เธอคือคนที่ฉันฝันถึงเสมอ วันที่เราเดินทางด้วยกัน ฉันรู้ว่าฉันโชคดีมากแค่ไหน",
    openDate: "2026-08-10",
    from: "แฟน",
    revealed: false,
  },
];

export function SecretMessage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [showForm, setShowForm] = useState(false);
  const [revealedId, setRevealedId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", content: "", openDate: "", from: "ฉัน" });

  const today = new Date(2026, 5, 15);

  function canOpen(msg: Message) {
    return !isFuture(new Date(msg.openDate)) || isPast(new Date(msg.openDate));
  }

  function reveal(id: string) {
    setRevealedId(id);
    setMessages(ms => ms.map(m => m.id === id ? { ...m, revealed: true } : m));
  }

  function save() {
    if (!form.title || !form.content || !form.openDate) return;
    setMessages(ms => [...ms, { ...form, id: Date.now().toString(), revealed: false }]);
    setForm({ title: "", content: "", openDate: "", from: "ฉัน" });
    setShowForm(false);
  }

  const daysUntil = (dateStr: string) => {
    const d = new Date(dateStr);
    const diff = Math.ceil((d.getTime() - today.getTime()) / 86400000);
    return diff > 0 ? diff : 0;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>Secret Messages</h2>
          <p className="text-sm" style={{ color: "#9a7a7a", fontFamily: "'Lato', sans-serif" }}>กล่องข้อความลับ 🔐</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-all hover:scale-105"
          style={{ background: "#c9748a", color: "white", fontFamily: "'Lato', sans-serif" }}
        >
          <Plus size={14} /> เขียนข้อความลับ
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(61,44,44,0.35)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md rounded-3xl p-6 shadow-2xl" style={{ background: "#fffaf7" }}>
            <div className="flex justify-between items-center mb-4">
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>✍️ เขียนข้อความลับ</h3>
              <button onClick={() => setShowForm(false)}><X size={18} style={{ color: "#9a7a7a" }} /></button>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                {["ฉัน", "แฟน"].map(w => (
                  <button
                    key={w}
                    onClick={() => setForm(f => ({ ...f, from: w }))}
                    className="flex-1 py-2 rounded-xl text-sm transition-all"
                    style={{
                      background: form.from === w ? "#c9748a" : "#f3e8e0",
                      color: form.from === w ? "white" : "#9a7a7a",
                      fontFamily: "'Lato', sans-serif",
                    }}
                  >จาก {w}</button>
                ))}
              </div>
              <input
                className="w-full px-4 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: "rgba(201,116,138,0.3)", background: "#fdf0f0", fontFamily: "'Lato', sans-serif", color: "#3d2c2c" }}
                placeholder="ชื่อข้อความ..."
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />
              <textarea
                rows={4}
                className="w-full px-4 py-2 rounded-xl border text-sm outline-none resize-none"
                style={{ borderColor: "rgba(201,116,138,0.3)", background: "#fdf0f0", fontFamily: "'Lato', sans-serif", color: "#3d2c2c" }}
                placeholder="เขียนข้อความลับไว้ที่นี่..."
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              />
              <div>
                <p className="text-xs mb-1" style={{ color: "#9a7a7a", fontFamily: "'Lato', sans-serif" }}>เปิดอ่านได้วันที่</p>
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "rgba(201,116,138,0.3)", background: "#fdf0f0", fontFamily: "'Lato', sans-serif", color: "#3d2c2c" }}
                  value={form.openDate}
                  onChange={e => setForm(f => ({ ...f, openDate: e.target.value }))}
                />
              </div>
              <button
                onClick={save}
                className="w-full py-2.5 rounded-xl text-sm transition-all hover:opacity-90"
                style={{ background: "#c9748a", color: "white", fontFamily: "'Lato', sans-serif" }}
              >ล็อกข้อความ 🔒</button>
            </div>
          </div>
        </div>
      )}

      {revealedId && (() => {
        const msg = messages.find(m => m.id === revealedId);
        if (!msg) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(61,44,44,0.5)", backdropFilter: "blur(8px)" }}>
            <div
              className="w-full max-w-md rounded-3xl p-8 shadow-2xl text-center"
              style={{ background: "linear-gradient(135deg, #fffaf7, #fef3f7)", border: "1px solid rgba(201,116,138,0.2)" }}
            >
              <div className="text-5xl mb-4">💌</div>
              <p className="text-xs mb-1" style={{ color: "#c9748a", fontFamily: "'Lato', sans-serif", letterSpacing: "0.15em" }}>
                จาก {msg.from} • {format(new Date(msg.openDate), "d MMMM yyyy", { locale: th })}
              </p>
              <h3 className="mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>{msg.title}</h3>
              <p
                className="leading-relaxed text-base"
                style={{ fontFamily: "'Dancing Script', cursive", color: "#3d2c2c", fontSize: "1.15rem" }}
              >
                {msg.content}
              </p>
              <button
                onClick={() => setRevealedId(null)}
                className="mt-6 px-6 py-2.5 rounded-full text-sm transition-all hover:opacity-90"
                style={{ background: "#c9748a", color: "white", fontFamily: "'Lato', sans-serif" }}
              >ปิด ❤️</button>
            </div>
          </div>
        );
      })()}

      <div className="space-y-3">
        {messages.map(msg => {
          const locked = isFuture(new Date(msg.openDate));
          const days = daysUntil(msg.openDate);

          return (
            <div
              key={msg.id}
              className="rounded-2xl p-5 group transition-all"
              style={{
                background: locked ? "linear-gradient(135deg, #f3e8e0, #fdf0f0)" : "#fffaf7",
                border: "1px solid rgba(201,116,138,0.15)",
                boxShadow: "0 2px 12px rgba(201,116,138,0.06)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: locked ? "#f7c5d0" : "#c9748a" }}
                >
                  {locked ? <Lock size={20} style={{ color: "#a84f65" }} /> : <Unlock size={20} color="white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: "'Playfair Display', serif", color: "#3d2c2c" }}>{msg.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#9a6070", fontFamily: "'Lato', sans-serif" }}>
                    จาก {msg.from} •{" "}
                    {locked
                      ? `เปิดได้ใน ${days} วัน`
                      : `เปิดได้แล้ว — ${format(new Date(msg.openDate), "d MMMM yyyy", { locale: th })}`}
                  </p>
                  {locked && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <Clock size={12} style={{ color: "#c9748a" }} />
                      <span className="text-xs" style={{ color: "#c9748a", fontFamily: "'Lato', sans-serif" }}>
                        {format(new Date(msg.openDate), "d MMMM yyyy", { locale: th })}
                      </span>
                    </div>
                  )}
                </div>
                {!locked && (
                  <button
                    onClick={() => reveal(msg.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs flex-shrink-0 transition-all hover:scale-105"
                    style={{ background: "#c9748a", color: "white", fontFamily: "'Lato', sans-serif" }}
                  >
                    <Eye size={12} /> อ่านเลย
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
