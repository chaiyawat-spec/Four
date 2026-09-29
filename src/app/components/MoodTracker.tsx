import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isFuture } from "date-fns";
import { th } from "date-fns/locale/th";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MoodEntry {
  date: string;
  mood: string;
  label: string;
}

const MOODS = [
  { emoji: "😊", label: "แฮปปี้", color: "#fde68a" },
  { emoji: "🥰", label: "ซึ้ง", color: "#fca5a5" },
  { emoji: "😌", label: "สงบ", color: "#a5f3fc" },
  { emoji: "🤔", label: "ครุ่นคิด", color: "#d8b4fe" },
  { emoji: "😴", label: "ง่วง", color: "#c7d2fe" },
  { emoji: "😢", label: "เศร้า", color: "#93c5fd" },
  { emoji: "🥺", label: "คิดถึง", color: "#fbcfe8" },
  { emoji: "😩", label: "เหนื่อย", color: "#d1d5db" },
];

const INITIAL_MOODS: MoodEntry[] = [
  { date: "2026-06-01", mood: "😊", label: "แฮปปี้" },
  { date: "2026-06-02", mood: "🥰", label: "ซึ้ง" },
  { date: "2026-06-04", mood: "😌", label: "สงบ" },
  { date: "2026-06-05", mood: "🥺", label: "คิดถึง" },
  { date: "2026-06-07", mood: "😊", label: "แฮปปี้" },
  { date: "2026-06-09", mood: "😴", label: "ง่วง" },
  { date: "2026-06-10", mood: "🥰", label: "ซึ้ง" },
  { date: "2026-06-11", mood: "😊", label: "แฮปปี้" },
  { date: "2026-06-12", mood: "😌", label: "สงบ" },
  { date: "2026-06-13", mood: "🥰", label: "ซึ้ง" },
];

export function MoodTracker() {
  const [moods, setMoods] = useState<MoodEntry[]>(INITIAL_MOODS);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5, 1));
  const [selectedMood, setSelectedMood] = useState(MOODS[0]);
  const [who, setWho] = useState<"me" | "partner">("me");

  const days = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });
  const today = new Date(2026, 5, 15);

  function setDayMood(day: Date) {
    if (isFuture(day) && !isSameDay(day, today)) return;
    const dateStr = format(day, "yyyy-MM-dd");
    const exists = moods.find(m => m.date === dateStr);
    if (exists) {
      setMoods(ms => ms.map(m => m.date === dateStr ? { ...m, mood: selectedMood.emoji, label: selectedMood.label } : m));
    } else {
      setMoods(ms => [...ms, { date: dateStr, mood: selectedMood.emoji, label: selectedMood.label }]);
    }
  }

  const happyDays = moods.filter(m => ["😊", "🥰"].includes(m.mood) && m.date.startsWith(format(currentMonth, "yyyy-MM"))).length;

  const moodCounts = MOODS.map(m => ({
    ...m,
    count: moods.filter(e => e.mood === m.emoji && e.date.startsWith(format(currentMonth, "yyyy-MM"))).length,
  })).filter(m => m.count > 0).sort((a, b) => b.count - a.count);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>Mood Tracker</h2>
          <p className="text-sm" style={{ color: "#9a7a7a", fontFamily: "'Lato', sans-serif" }}>บันทึกอารมณ์ประจำวัน</p>
        </div>
        <div className="flex gap-1 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(201,116,138,0.25)" }}>
          {(["me", "partner"] as const).map(w => (
            <button
              key={w}
              onClick={() => setWho(w)}
              className="px-3 py-1.5 text-xs transition-all"
              style={{
                background: who === w ? "#c9748a" : "transparent",
                color: who === w ? "white" : "#9a7a7a",
                fontFamily: "'Lato', sans-serif",
              }}
            >{w === "me" ? "👤 ฉัน" : "💑 แฟน"}</button>
          ))}
        </div>
      </div>

      {happyDays > 0 && (
        <div className="mb-4 px-4 py-3 rounded-2xl text-sm" style={{ background: "#fef3f7", border: "1px solid rgba(201,116,138,0.15)" }}>
          <span style={{ color: "#a84f65", fontFamily: "'Dancing Script', cursive", fontSize: "1.1rem" }}>
            เดือนนี้ยิ้มให้กันไปแล้ว {happyDays} วัน 😊❤️
          </span>
        </div>
      )}

      <div className="mb-4">
        <p className="text-xs mb-2" style={{ color: "#9a7a7a", fontFamily: "'Lato', sans-serif" }}>เลือกอารมณ์วันนี้</p>
        <div className="flex flex-wrap gap-2">
          {MOODS.map(m => (
            <button
              key={m.emoji}
              onClick={() => setSelectedMood(m)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all hover:scale-105"
              style={{
                background: selectedMood.emoji === m.emoji ? m.color : "#f3e8e0",
                border: `2px solid ${selectedMood.emoji === m.emoji ? "#c9748a" : "transparent"}`,
                fontFamily: "'Lato', sans-serif",
                color: "#3d2c2c",
              }}
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-4" style={{ background: "#fffaf7", border: "1px solid rgba(201,116,138,0.12)" }}>
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}>
            <ChevronLeft size={18} style={{ color: "#c9748a" }} />
          </button>
          <span style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>
            {format(currentMonth, "MMMM yyyy", { locale: th })}
          </span>
          <button onClick={() => setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}>
            <ChevronRight size={18} style={{ color: "#c9748a" }} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map(d => (
            <div key={d} className="text-xs py-1" style={{ color: "#9a7a7a", fontFamily: "'Lato', sans-serif" }}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: days[0].getDay() }).map((_, i) => <div key={`empty-${i}`} />)}
          {days.map(day => {
            const dateStr = format(day, "yyyy-MM-dd");
            const entry = moods.find(m => m.date === dateStr);
            const isToday = isSameDay(day, today);
            const future = isFuture(day) && !isToday;

            return (
              <button
                key={dateStr}
                onClick={() => setDayMood(day)}
                disabled={future}
                className="aspect-square rounded-xl flex items-center justify-center text-sm transition-all hover:scale-110"
                style={{
                  background: isToday ? "#f7c5d0" : "transparent",
                  outline: isToday ? "2px solid #c9748a" : "none",
                  opacity: future ? 0.3 : 1,
                  cursor: future ? "default" : "pointer",
                  fontSize: entry ? "1.1rem" : "0.75rem",
                  color: !entry ? "#c4b0b0" : undefined,
                }}
                title={entry ? entry.label : ""}
              >
                {entry ? entry.mood : day.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {moodCounts.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {moodCounts.slice(0, 4).map(m => (
            <div
              key={m.emoji}
              className="rounded-xl p-3 text-center"
              style={{ background: m.color + "50", border: `1px solid ${m.color}` }}
            >
              <div className="text-2xl">{m.emoji}</div>
              <div className="text-xs mt-1" style={{ fontFamily: "'Lato', sans-serif", color: "#3d2c2c" }}>{m.label}</div>
              <div className="text-sm font-medium mt-0.5" style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>{m.count} วัน</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
