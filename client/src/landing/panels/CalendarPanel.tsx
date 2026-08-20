import { Clock } from "lucide-react";

const DAY_HEADERS = ["S", "T", "Q", "Q", "S", "S", "D"];

interface Day {
  d: number;
  f?: "1" | "2";
}

const DAYS: Day[] = [
  { d: 4 },
  { d: 5, f: "1" },
  { d: 6 },
  { d: 7, f: "2" },
  { d: 8, f: "1" },
  { d: 9 },
  { d: 10 },
  { d: 11, f: "1" },
  { d: 12 },
  { d: 13, f: "2" },
  { d: 14, f: "1" },
  { d: 15 },
  { d: 16 },
  { d: 17 },
  { d: 18 },
  { d: 19, f: "2" },
  { d: 20, f: "1" },
  { d: 21 },
  { d: 22, f: "1" },
  { d: 23 },
  { d: 24 },
];

/** Mock estático da agenda do time — ilustração, não é dado real. */
export function CalendarPanel() {
  return (
    <div className="panel">
      <div className="panel-h">
        <span className="dot" />
        Agenda do time · Agosto
        <span className="meta">38 compromissos</span>
      </div>
      <div className="panel-b">
        <div className="mini-cal">
          {DAY_HEADERS.map((h, i) => (
            <span className="dh" key={`h-${i}`}>
              {h}
            </span>
          ))}
          {DAYS.map((day) => (
            <span className="d" data-f={day.f} key={day.d}>
              {day.d}
              {day.f && <i />}
            </span>
          ))}
        </div>
        <div className="hand" style={{ borderStyle: "solid", background: "#fff" }}>
          <Clock size={15} strokeWidth={2.2} aria-hidden />
          <span>
            <b>Amanhã, 9h</b> · Check-up — Clínica Vitalis · Marina
          </span>
        </div>
      </div>
    </div>
  );
}
