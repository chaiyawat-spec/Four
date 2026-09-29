import { useState } from "react";
import { Heart, Plus, X, Edit3, Trash2, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";
import { th } from "date-fns/locale/th";

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  emoji: string;
  image?: string;
}

const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    title: "วันแรกที่เจอกัน",
    content: "วันนั้นเธอใส่เสื้อสีชมพูอ่อน ๆ ยืนรอรถอยู่ที่ป้าย ฉันไม่กล้าพูดอะไรเลย แต่ก็จำหน้าไม่ลืม ❤️",
    date: "2022-11-05",
    tags: ["#ความทรงจำ", "#วันพิเศษ"],
    emoji: "💫",
  },
  {
    id: "2",
    title: "ทริปเที่ยวเชียงใหม่ด้วยกัน",
    content: "ดอยสุเทพตอนเช้า หมอกบาง ๆ อากาศเย็นสบาย แฟนก็ฝอยตลอดทาง แต่ก็น่ารักดี 🌸",
    date: "2023-06-20",
    tags: ["#ทริปเที่ยว", "#เชียงใหม่"],
    emoji: "🌸",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "3",
    title: "วันครบรอบ 1 ปี",
    content: "ร้านอาหารริมทะเล เทียนน้อย ๆ บนโต๊ะ ขอบคุณที่อยู่ด้วยกันมาตลอดนะคะ 🎂",
    date: "2024-02-14",
    tags: ["#วันครบรอบ", "#โรแมนติก"],
    emoji: "🎂",
  },
];

const TAG_OPTIONS = ["#ทริปเที่ยว", "#วันครบรอบ", "#ของกิน", "#วันพิเศษ", "#ความทรงจำ", "#โรแมนติก"];
const EMOJI_OPTIONS = ["💫", "🌸", "🎂", "❤️", "🌙", "✨", "🌺", "🎵", "🍜", "🌅"];

export function Timeline() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", content: "", date: "", tags: [] as string[], emoji: "💫" });

  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  function openNew() {
    setForm({ title: "", content: "", date: new Date().toISOString().slice(0, 10), tags: [], emoji: "💫" });
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(p: Post) {
    setForm({ title: p.title, content: p.content, date: p.date, tags: p.tags, emoji: p.emoji });
    setEditingId(p.id);
    setShowForm(true);
  }

  function save() {
    if (!form.title.trim()) return;
    if (editingId) {
      setPosts(ps => ps.map(p => p.id === editingId ? { ...p, ...form } : p));
    } else {
      setPosts(ps => [{ ...form, id: Date.now().toString() }, ...ps]);
    }
    setShowForm(false);
  }

  function remove(id: string) {
    setPosts(ps => ps.filter(p => p.id !== id));
  }

  function toggleTag(tag: string) {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag],
    }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>Our Timeline</h2>
          <p className="text-sm mt-0.5" style={{ color: "#9a7a7a", fontFamily: "'Lato', sans-serif" }}>ความทรงจำของเราสองคน</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all hover:scale-105 active:scale-95"
          style={{ background: "#c9748a", color: "white", fontFamily: "'Lato', sans-serif" }}
        >
          <Plus size={15} /> เพิ่มความทรงจำ
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(61,44,44,0.35)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md rounded-3xl p-6 shadow-2xl" style={{ background: "#fffaf7" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>
                {editingId ? "แก้ไขความทรงจำ" : "บันทึกความทรงจำใหม่"}
              </h3>
              <button onClick={() => setShowForm(false)}><X size={18} style={{ color: "#9a7a7a" }} /></button>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                {EMOJI_OPTIONS.map(e => (
                  <button
                    key={e}
                    onClick={() => setForm(f => ({ ...f, emoji: e }))}
                    className="text-2xl rounded-full w-10 h-10 flex items-center justify-center transition-all"
                    style={{ background: form.emoji === e ? "#f7c5d0" : "#f3e8e0" }}
                  >{e}</button>
                ))}
              </div>

              <input
                className="w-full px-4 py-2 rounded-xl border outline-none text-sm"
                style={{ borderColor: "rgba(201,116,138,0.3)", background: "#fdf0f0", fontFamily: "'Lato', sans-serif", color: "#3d2c2c" }}
                placeholder="หัวข้อ..."
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />

              <input
                type="date"
                className="w-full px-4 py-2 rounded-xl border outline-none text-sm"
                style={{ borderColor: "rgba(201,116,138,0.3)", background: "#fdf0f0", fontFamily: "'Lato', sans-serif", color: "#3d2c2c" }}
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />

              <textarea
                className="w-full px-4 py-2 rounded-xl border outline-none text-sm resize-none"
                rows={3}
                style={{ borderColor: "rgba(201,116,138,0.3)", background: "#fdf0f0", fontFamily: "'Lato', sans-serif", color: "#3d2c2c" }}
                placeholder="เล่าให้ฟังหน่อย..."
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              />

              <div>
                <p className="text-xs mb-2" style={{ color: "#9a7a7a", fontFamily: "'Lato', sans-serif" }}>แท็ก</p>
                <div className="flex flex-wrap gap-2">
                  {TAG_OPTIONS.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className="px-3 py-1 rounded-full text-xs transition-all"
                      style={{
                        background: form.tags.includes(tag) ? "#c9748a" : "#f3e8e0",
                        color: form.tags.includes(tag) ? "white" : "#9a7a7a",
                        fontFamily: "'Lato', sans-serif",
                      }}
                    >{tag}</button>
                  ))}
                </div>
              </div>

              <button
                onClick={save}
                className="w-full py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
                style={{ background: "#c9748a", color: "white", fontFamily: "'Lato', sans-serif" }}
              >บันทึก ❤️</button>
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, #f7c5d0, #fde8d8)" }} />
        <div className="space-y-6 pl-16">
          {sorted.map((post) => (
            <div key={post.id} className="relative group">
              <div
                className="absolute -left-10 top-4 w-8 h-8 rounded-full flex items-center justify-center text-base shadow-sm"
                style={{ background: "#f7c5d0" }}
              >
                {post.emoji}
              </div>

              <div
                className="rounded-2xl p-5 transition-all hover:shadow-lg"
                style={{ background: "#fffaf7", border: "1px solid rgba(201,116,138,0.12)", boxShadow: "0 2px 12px rgba(201,116,138,0.08)" }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar size={12} style={{ color: "#9a7a7a" }} />
                      <span className="text-xs" style={{ color: "#9a7a7a", fontFamily: "'Lato', sans-serif" }}>
                        {format(new Date(post.date), "d MMMM yyyy", { locale: th })}
                      </span>
                    </div>
                    <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#3d2c2c" }}>{post.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6b5050", fontFamily: "'Lato', sans-serif" }}>{post.content}</p>

                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="mt-3 w-full rounded-xl object-cover"
                        style={{ height: 180 }}
                      />
                    )}

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full text-xs"
                            style={{ background: "#f7e8e8", color: "#c9748a", fontFamily: "'Lato', sans-serif" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(post)} className="p-1.5 rounded-lg hover:bg-pink-50 transition-colors">
                      <Edit3 size={14} style={{ color: "#c9748a" }} />
                    </button>
                    <button onClick={() => remove(post.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 size={14} style={{ color: "#d4183d" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
