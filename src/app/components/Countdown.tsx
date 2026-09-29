import { useState, useEffect } from "react";
import { Plus, X, Bell, Trash2 } from "lucide-react";
import { differenceInDays, format, isPast } from "date-fns";
import { th } from "date-fns/locale/th";

interface Event {
  id: string;
  name: string;
  date: string;
  emoji: string;
  recurring: boolean;
}

const INITIAL_EVENTS: Event[] = [
  { id: "1", name: "วันเกิดแฟน 🎂", date: "2026-09-03", emoji: "🎂", recurring: true },
  { id: "2", name: "วันครบรอบ 💕", date: "2027-02-14", emoji: "💕", recurring: true },
  { id: "3", name: "ทริปญี่ปุ่น ✈️", date: "2026-08-10", emoji: "✈️", recurring: false },
];

const EMOJI_OPTS = ["🎂", "💕", "✈️", "🌸", "🎉", "💍", "🎵", "🌙", "❤️", "🎊"];

export function Countdown() {
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", date: "", emoji: "🎂", recurring: false });
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  function save() {
    if (!form.name || !form.date) return;
    setEvents(es => [...es, { ...form, id: Date.now().toString() }]);
    setForm({ name: "", date: "", emoji: "🎂", recurring: false });
    setShowForm(false);
  }

  function getNextDate(event: Event): Date {
    const d = new Date(event.date);
    if (!event.recurring || !isPast(d)) return d;
    const next = new Date(d);
    while (isPast(next)) {
      next.setFullYear(next.getFullYear() + 1);
    }
    return next;
  }

  const sorted = [...events]
    .map(e => ({ ...e, nextDate: getNextDate(e), daysLeft: differenceInDays(getNextDate(e), now) }))
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>Anniversary Countdown</h2>
          <p className="text-sm" style={{ color: "#9a7a7a", fontFamily: "'Lato', sans-serif" }}>นับถอยหลังสู่วันสำคัญ</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-all hover:scale-105"
          style={{ background: "#c9748a", color: "white", fontFamily: "'Lato', sans-serif" }}
        >
          <Plus size={14} /> เพิ่ม
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(61,44,44,0.35)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-sm rounded-3xl p-6 shadow-2xl" style={{ background: "#fffaf7" }}>
            <div className="flex justify-between items-center mb-4">
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>เพิ่มวันสำคัญ</h3>
              <button onClick={() => setShowForm(false)}><X size={18} style={{ color: "#9a7a7a" }} /></button>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                {EMOJI_OPTS.map(e => (
                  <button
                    key={e}
                    onClick={() => setForm(f => ({ ...f, emoji: e }))}
                    className="text-xl w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: form.emoji === e ? "#f7c5d0" : "#f3e8e0" }}
                  >{e}</button>
                ))}
              </div>
              <input
                className="w-full px-4 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: "rgba(201,116,138,0.3)", background: "#fdf0f0", fontFamily: "'Lato', sans-serif", color: "#3d2c2c" }}
                placeholder="ชื่อวันสำคัญ..."
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
              <input
                type="date"
                className="w-full px-4 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: "rgba(201,116,138,0.3)", background: "#fdf0f0", fontFamily: "'Lato', sans-serif", color: "#3d2c2c" }}
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.recurring}
                  onChange={e => setForm(f => ({ ...f, recurring: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm" style={{ color: "#6b5050", fontFamily: "'Lato', sans-serif" }}>วนซ้ำทุกปี</span>
              </label>
              <button
                onClick={save}
                className="w-full py-2.5 rounded-xl text-sm transition-all hover:opacity-90"
                style={{ background: "#c9748a", color: "white", fontFamily: "'Lato', sans-serif" }}
              >เพิ่มวันสำคัญ 🔔</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {sorted.map((event, idx) => {
          const urgency = event.daysLeft <= 7 ? "high" : event.daysLeft <= 30 ? "mid" : "low";
          const bg = urgency === "high" ? "linear-gradient(135deg, #fca5a5, #f7c5d0)" : urgency === "mid" ? "linear-gradient(135deg, #fde8d8, #f7e8e8)" : "#fffaf7";

          return (
            <div
              key={event.id}
              className="rounded-2xl p-4 flex items-center gap-4 group"
              style={{
                background: bg,
                border: "1px solid rgba(201,116,138,0.15)",
                boxShadow: idx === 0 ? "0 4px 20px rgba(201,116,138,0.15)" : "none",
              }}
            >
              <div className="text-3xl w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.6)" }}>
                {event.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate" style={{ fontFamily: "'Playfair Display', serif", color: "#3d2c2c" }}>{event.name}</p>
                  {event.recurring && <Bell size={12} style={{ color: "#c9748a", flexShrink: 0 }} />}
                </div>
                <p className="text-xs mt-0.5" style={{ color: "#9a6070", fontFamily: "'Lato', sans-serif" }}>
                  {format(event.nextDate, "d MMMM yyyy", { locale: th })}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <div
                  className="text-2xl"
                  style={{ fontFamily: "'Playfair Display', serif", color: urgency === "high" ? "#d4183d" : "#a84f65" }}
                >
                  {event.daysLeft}
                </div>
                <div className="text-xs" style={{ color: "#9a6070", fontFamily: "'Lato', sans-serif" }}>วัน</div>
              </div>
              <button
                onClick={() => setEvents(es => es.filter(e => e.id !== event.id))}
                className="opacity-0 group-hover:opacity-100 transition-opacity ml-1"
              >
                <Trash2 size={14} style={{ color: "#9a7a7a" }} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
