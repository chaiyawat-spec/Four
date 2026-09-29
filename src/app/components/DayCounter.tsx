import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { differenceInDays, differenceInMonths, differenceInYears } from "date-fns";

const START_DATE = new Date("2023-02-14");

export function DayCounter() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const days = differenceInDays(now, START_DATE);
  const years = differenceInYears(now, START_DATE);
  const months = differenceInMonths(now, START_DATE) % 12;
  const remainingDays = differenceInDays(now, new Date(START_DATE.getFullYear() + years, START_DATE.getMonth() + months, START_DATE.getDate()));

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-8 text-center"
      style={{
        background: "linear-gradient(135deg, #f7c5d0 0%, #fde8d8 50%, #f7c5d0 100%)",
        boxShadow: "0 8px 40px rgba(201,116,138,0.18)",
      }}
    >
      <div className="absolute top-4 left-6 opacity-20 text-5xl">♡</div>
      <div className="absolute bottom-4 right-6 opacity-20 text-5xl">♡</div>
      <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-10 text-7xl">♡</div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-10 text-7xl">♡</div>

      <p
        className="text-sm tracking-widest uppercase mb-2"
        style={{ color: "#9a6070", fontFamily: "'Lato', sans-serif", letterSpacing: "0.2em" }}
      >
        เราคบกันมาแล้ว
      </p>

      <div className="flex items-center justify-center gap-3 my-4">
        <div className="text-center">
          <div
            className="text-6xl"
            style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65", lineHeight: 1 }}
          >
            {days}
          </div>
          <div className="text-xs mt-1" style={{ color: "#9a6070", fontFamily: "'Lato', sans-serif" }}>วัน</div>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-2">
        {[{ label: "ปี", value: years }, { label: "เดือน", value: months }, { label: "วัน", value: remainingDays }].map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: "#a84f65" }}>{item.value}</div>
            <div className="text-xs" style={{ color: "#9a6070", fontFamily: "'Lato', sans-serif" }}>{item.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        <div className="h-px flex-1 opacity-30" style={{ background: "#a84f65" }} />
        <Heart size={16} fill="#a84f65" stroke="none" />
        <div className="h-px flex-1 opacity-30" style={{ background: "#a84f65" }} />
      </div>

      <p
        className="mt-3 text-sm italic"
        style={{ color: "#a84f65", fontFamily: "'Dancing Script', cursive" }}
      >
        ตั้งแต่ 14 กุมภาพันธ์ 2566
      </p>
    </div>
  );
}
