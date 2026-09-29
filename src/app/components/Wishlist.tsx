import { useState } from "react";
import { Plus, X, Check, MapPin, ShoppingBag } from "lucide-react";

interface WishItem {
  id: string;
  text: string;
  type: "place" | "thing";
  done: boolean;
}

const INITIAL: WishItem[] = [
  { id: "1", text: "ไปเที่ยวญี่ปุ่นด้วยกัน 🗾", type: "place", done: false },
  { id: "2", text: "กินชาบูที่ร้านโปรด", type: "thing", done: true },
  { id: "3", text: "ดูดาวที่เขาค้อ 🌟", type: "place", done: false },
  { id: "4", text: "ทำเค้กวันเกิดให้แฟน 🎂", type: "thing", done: true },
  { id: "5", text: "เที่ยวทะเลด้วยกัน 🌊", type: "place", done: false },
  { id: "6", text: "ซื้อคู่แหวนคู่ 💍", type: "thing", done: false },
];

export function Wishlist() {
  const [items, setItems] = useState<WishItem[]>(INITIAL);
  const [input, setInput] = useState("");
  const [type, setType] = useState<"place" | "thing">("place");
  const [filter, setFilter] = useState<"all" | "place" | "thing" | "done">("all");

  function add() {
    if (!input.trim()) return;
    setItems(is => [...is, { id: Date.now().toString(), text: input.trim(), type, done: false }]);
    setInput("");
  }

  function toggle(id: string) {
    setItems(is => is.map(i => i.id === id ? { ...i, done: !i.done } : i));
  }

  function remove(id: string) {
    setItems(is => is.filter(i => i.id !== id));
  }

  const filtered = items.filter(i => {
    if (filter === "all") return true;
    if (filter === "done") return i.done;
    return i.type === filter;
  });

  const doneCount = items.filter(i => i.done).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>Wishlist & Bucket List</h2>
          <p className="text-sm" style={{ color: "#9a7a7a", fontFamily: "'Lato', sans-serif" }}>สิ่งที่เราอยากทำด้วยกัน ✨</p>
        </div>
        <div className="text-right">
          <div className="text-xl" style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>{doneCount}/{items.length}</div>
          <p className="text-xs" style={{ color: "#9a7a7a", fontFamily: "'Lato', sans-serif" }}>สำเร็จแล้ว</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#f3e8e0" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${items.length ? (doneCount / items.length) * 100 : 0}%`, background: "linear-gradient(90deg, #f7c5d0, #c9748a)" }}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {(["all", "place", "thing", "done"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1 rounded-full text-xs transition-all"
            style={{
              background: filter === f ? "#c9748a" : "#f3e8e0",
              color: filter === f ? "white" : "#9a7a7a",
              fontFamily: "'Lato', sans-serif",
            }}
          >
            {f === "all" ? "ทั้งหมด" : f === "place" ? "🗺️ สถานที่" : f === "thing" ? "🛍️ ของ/ประสบการณ์" : "✅ สำเร็จแล้ว"}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-5">
        <div className="flex gap-1 rounded-xl overflow-hidden border" style={{ borderColor: "rgba(201,116,138,0.25)" }}>
          <button
            onClick={() => setType("place")}
            className="flex items-center gap-1 px-3 py-2 text-xs transition-all"
            style={{ background: type === "place" ? "#f7c5d0" : "transparent", color: "#a84f65", fontFamily: "'Lato', sans-serif" }}
          >
            <MapPin size={12} /> สถานที่
          </button>
          <button
            onClick={() => setType("thing")}
            className="flex items-center gap-1 px-3 py-2 text-xs transition-all"
            style={{ background: type === "thing" ? "#f7c5d0" : "transparent", color: "#a84f65", fontFamily: "'Lato', sans-serif" }}
          >
            <ShoppingBag size={12} /> ของ/ประสบการณ์
          </button>
        </div>
        <input
          className="flex-1 px-3 py-2 rounded-xl border text-sm outline-none"
          style={{ borderColor: "rgba(201,116,138,0.25)", background: "#fdf0f0", fontFamily: "'Lato', sans-serif", color: "#3d2c2c" }}
          placeholder="เพิ่มสิ่งที่อยากทำ..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()}
        />
        <button
          onClick={add}
          className="px-3 py-2 rounded-xl flex items-center justify-center transition-all hover:opacity-90"
          style={{ background: "#c9748a" }}
        >
          <Plus size={16} color="white" />
        </button>
      </div>

      <div className="space-y-2">
        {filtered.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl group transition-all"
            style={{ background: item.done ? "#f7e8e8" : "#fffaf7", border: "1px solid rgba(201,116,138,0.12)" }}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                borderColor: item.done ? "#c9748a" : "rgba(201,116,138,0.4)",
                background: item.done ? "#c9748a" : "transparent",
              }}
            >
              {item.done && <Check size={12} color="white" />}
            </button>
            <span
              className={`flex-1 text-sm ${item.done ? "line-through opacity-60" : ""}`}
              style={{ fontFamily: "'Lato', sans-serif", color: "#3d2c2c" }}
            >
              {item.type === "place" ? "🗺️" : "🛍️"} {item.text}
            </span>
            <button
              onClick={() => remove(item.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} style={{ color: "#9a7a7a" }} />
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center py-8 text-sm" style={{ color: "#9a7a7a", fontFamily: "'Lato', sans-serif" }}>ว่างเปล่า... เพิ่มสิ่งที่อยากทำด้วยกันกันเถอะ 🌸</p>
        )}
      </div>
    </div>
  );
}
