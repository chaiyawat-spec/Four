import { useState } from "react";
import { Plus, X, Music, Heart, Play, Trash2, Star } from "lucide-react";

interface Song {
  id: string;
  title: string;
  artist: string;
  memory: string;
  emoji: string;
  favorite: boolean;
  youtubeUrl?: string;
}

const INITIAL_SONGS: Song[] = [
  {
    id: "1",
    title: "ยังรักอยู่ไหม",
    artist: "Slot Machine",
    memory: "เพลงที่เปิดตอนขับรถไปเที่ยวด้วยกันครั้งแรก ร้องด้วยกันทั้งคืนเลย 🚗",
    emoji: "🌙",
    favorite: true,
  },
  {
    id: "2",
    title: "เธอ",
    artist: "Bodyslam",
    memory: "เพลงที่ฉันคิดถึงเธอทุกครั้งที่ได้ยิน ❤️",
    emoji: "❤️",
    favorite: true,
  },
  {
    id: "3",
    title: "คนของเธอ",
    artist: "Potato",
    memory: "เปิดตอนนั่งกินข้าวด้วยกันที่ร้านโปรด ชอบมากเลย",
    emoji: "🍜",
    favorite: false,
  },
  {
    id: "4",
    title: "A Thousand Years",
    artist: "Christina Perri",
    memory: "เพลงที่เต้นด้วยกันตอนงานปีใหม่ วันนั้นสวยมากเลยนะ 🌟",
    emoji: "✨",
    favorite: true,
  },
];

const EMOJI_OPTS = ["🌙", "❤️", "✨", "🎵", "🌸", "🔥", "💕", "🎶", "🌊", "🌅"];

export function OurSongs() {
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<"all" | "favorite">("all");
  const [form, setForm] = useState({
    title: "",
    artist: "",
    memory: "",
    emoji: "🎵",
    youtubeUrl: "",
    favorite: false,
  });

  function save() {
    if (!form.title.trim()) return;
    setSongs(ss => [...ss, { ...form, id: Date.now().toString() }]);
    setForm({ title: "", artist: "", memory: "", emoji: "🎵", youtubeUrl: "", favorite: false });
    setShowForm(false);
  }

  function toggleFav(id: string) {
    setSongs(ss => ss.map(s => s.id === id ? { ...s, favorite: !s.favorite } : s));
  }

  function remove(id: string) {
    setSongs(ss => ss.filter(s => s.id !== id));
  }

  const displayed = filter === "favorite" ? songs.filter(s => s.favorite) : songs;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>Our Songs</h2>
          <p className="text-sm" style={{ color: "#9a7a7a", fontFamily: "'Lato', sans-serif" }}>
            เพลงของเราสองคน 🎵
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-all hover:scale-105"
          style={{ background: "#c9748a", color: "white", fontFamily: "'Lato', sans-serif" }}
        >
          <Plus size={14} /> เพิ่มเพลง
        </button>
      </div>

      {/* Stats strip */}
      <div className="flex gap-3 mb-5">
        <div
          className="flex-1 rounded-2xl p-3 text-center"
          style={{ background: "linear-gradient(135deg, #f7c5d0, #fde8d8)" }}
        >
          <div className="text-xl" style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>
            {songs.length}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "#9a6070", fontFamily: "'Lato', sans-serif" }}>เพลงทั้งหมด</div>
        </div>
        <div
          className="flex-1 rounded-2xl p-3 text-center"
          style={{ background: "linear-gradient(135deg, #fde8d8, #f7c5d0)" }}
        >
          <div className="text-xl" style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>
            {songs.filter(s => s.favorite).length}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "#9a6070", fontFamily: "'Lato', sans-serif" }}>เพลงโปรด ⭐</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-5">
        {(["all", "favorite"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-full text-xs transition-all"
            style={{
              background: filter === f ? "#c9748a" : "#f3e8e0",
              color: filter === f ? "white" : "#9a7a7a",
              fontFamily: "'Lato', sans-serif",
            }}
          >
            {f === "all" ? "🎵 ทั้งหมด" : "⭐ เพลงโปรด"}
          </button>
        ))}
      </div>

      {/* Song list */}
      <div className="space-y-3">
        {displayed.map((song, idx) => (
          <div
            key={song.id}
            className="rounded-2xl p-4 group transition-all hover:shadow-md"
            style={{
              background: "#fffaf7",
              border: "1px solid rgba(201,116,138,0.12)",
              boxShadow: "0 2px 12px rgba(201,116,138,0.06)",
            }}
          >
            <div className="flex items-start gap-3">
              {/* Track number / emoji */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #f7c5d0, #fde8d8)" }}
              >
                {song.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p
                      className="truncate"
                      style={{ fontFamily: "'Playfair Display', serif", color: "#3d2c2c", fontWeight: 500 }}
                    >
                      {song.title}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "#9a6070", fontFamily: "'Lato', sans-serif" }}
                    >
                      {song.artist}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => toggleFav(song.id)}
                      className="p-1.5 rounded-lg transition-all hover:bg-yellow-50"
                      title="เพิ่มในรายการโปรด"
                    >
                      <Star
                        size={15}
                        style={{
                          color: song.favorite ? "#f59e0b" : "#d1b8b8",
                          fill: song.favorite ? "#f59e0b" : "none",
                        }}
                      />
                    </button>
                    {song.youtubeUrl && (
                      <a
                        href={song.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-pink-50 transition-colors"
                      >
                        <Play size={14} style={{ color: "#c9748a" }} />
                      </a>
                    )}
                    <button
                      onClick={() => remove(song.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} style={{ color: "#d4183d" }} />
                    </button>
                  </div>
                </div>

                {song.memory && (
                  <p
                    className="text-xs mt-2 leading-relaxed"
                    style={{ color: "#7a5c5c", fontFamily: "'Lato', sans-serif", fontStyle: "italic" }}
                  >
                    "{song.memory}"
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {displayed.length === 0 && (
          <div className="text-center py-10">
            <Music size={32} style={{ color: "#e8c4c4", margin: "0 auto 8px" }} />
            <p className="text-sm" style={{ color: "#9a7a7a", fontFamily: "'Lato', sans-serif" }}>
              ยังไม่มีเพลงโปรด... เพิ่มเพลงที่ชอบด้วยกันเถอะ 🎶
            </p>
          </div>
        )}
      </div>

      {/* Add song modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(61,44,44,0.35)", backdropFilter: "blur(4px)" }}
        >
          <div className="w-full max-w-md rounded-3xl p-6 shadow-2xl" style={{ background: "#fffaf7" }}>
            <div className="flex justify-between items-center mb-4">
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>
                🎵 เพิ่มเพลงของเรา
              </h3>
              <button onClick={() => setShowForm(false)}>
                <X size={18} style={{ color: "#9a7a7a" }} />
              </button>
            </div>

            <div className="space-y-3">
              {/* Emoji picker */}
              <div className="flex gap-2 flex-wrap">
                {EMOJI_OPTS.map(e => (
                  <button
                    key={e}
                    onClick={() => setForm(f => ({ ...f, emoji: e }))}
                    className="text-xl w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{ background: form.emoji === e ? "#f7c5d0" : "#f3e8e0" }}
                  >
                    {e}
                  </button>
                ))}
              </div>

              <input
                className="w-full px-4 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: "rgba(201,116,138,0.3)", background: "#fdf0f0", fontFamily: "'Lato', sans-serif", color: "#3d2c2c" }}
                placeholder="ชื่อเพลง..."
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />

              <input
                className="w-full px-4 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: "rgba(201,116,138,0.3)", background: "#fdf0f0", fontFamily: "'Lato', sans-serif", color: "#3d2c2c" }}
                placeholder="ชื่อศิลปิน..."
                value={form.artist}
                onChange={e => setForm(f => ({ ...f, artist: e.target.value }))}
              />

              <textarea
                rows={3}
                className="w-full px-4 py-2 rounded-xl border text-sm outline-none resize-none"
                style={{ borderColor: "rgba(201,116,138,0.3)", background: "#fdf0f0", fontFamily: "'Lato', sans-serif", color: "#3d2c2c" }}
                placeholder="เล่าความทรงจำของเพลงนี้..."
                value={form.memory}
                onChange={e => setForm(f => ({ ...f, memory: e.target.value }))}
              />

              <input
                className="w-full px-4 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: "rgba(201,116,138,0.3)", background: "#fdf0f0", fontFamily: "'Lato', sans-serif", color: "#3d2c2c" }}
                placeholder="ลิงก์ YouTube (ไม่บังคับ)..."
                value={form.youtubeUrl}
                onChange={e => setForm(f => ({ ...f, youtubeUrl: e.target.value }))}
              />

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.favorite}
                  onChange={e => setForm(f => ({ ...f, favorite: e.target.checked }))}
                />
                <span className="text-sm" style={{ color: "#6b5050", fontFamily: "'Lato', sans-serif" }}>
                  ⭐ เพิ่มในรายการเพลงโปรด
                </span>
              </label>

              <button
                onClick={save}
                className="w-full py-2.5 rounded-xl text-sm transition-all hover:opacity-90"
                style={{ background: "#c9748a", color: "white", fontFamily: "'Lato', sans-serif" }}
              >
                เพิ่มเพลง 🎵
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
