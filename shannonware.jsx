import { useState, useEffect, useRef } from "react";

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  body:  `'Special Elite', 'Courier New', serif`,
  mono:  `'Share Tech Mono', 'Courier New', monospace`,
  ink:   "#1a1208",
  ink2:  "#3c2a10",
  fade:  "#6b5438",
  blue:  "#18385a",   // blueprint / circuit-print blue
  amber: "#7a5c0a",   // annotation amber
};

// ── CSS-only yellowed paper — no bitmaps ──────────────────────────────────────
// Combines edge-darkening (foxing), irregular age-spot patches, and a
// directional base gradient to mimic uneven oxidation on cream paper.
const PAPER = {
  backgroundColor: "#ede2bc",
  backgroundImage: [
    // Edge vignette: darker at all four edges, heaviest at bottom
    "radial-gradient(ellipse 110% 75% at 50% -8%, rgba(248,235,198,0.45) 0%, transparent 55%)",
    "radial-gradient(ellipse 160% 55% at 50% 112%, rgba(88,58,10,0.20) 0%, transparent 65%)",
    "radial-gradient(ellipse 55% 150% at -6% 50%, rgba(96,64,14,0.14) 0%, transparent 65%)",
    "radial-gradient(ellipse 55% 150% at 106% 50%, rgba(96,64,14,0.14) 0%, transparent 65%)",
    // Age-spot patches — irregular, off-centre
    "radial-gradient(ellipse 30% 18% at 13% 19%, rgba(148,108,36,0.26) 0%, transparent 100%)",
    "radial-gradient(ellipse 20% 28% at 83% 12%, rgba(138,98,30,0.20) 0%, transparent 100%)",
    "radial-gradient(ellipse 18% 24% at 74% 81%, rgba(155,114,42,0.22) 0%, transparent 100%)",
    "radial-gradient(ellipse 34% 16% at 30% 91%, rgba(126,88,26,0.17) 0%, transparent 100%)",
    "radial-gradient(ellipse 24% 20% at 60% 50%, rgba(168,128,48,0.11) 0%, transparent 100%)",
    "radial-gradient(ellipse 16% 22% at 48% 74%, rgba(135,95,30,0.13) 0%, transparent 100%)",
    // Base directional gradient
    "linear-gradient(168deg, #f6edd2 0%, #ede3bc 25%, #f1e8cb 55%, #e8ddb4 100%)",
  ].join(","),
};

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useInterval(cb, ms) {
  const ref = useRef(cb);
  useEffect(() => { ref.current = cb; }, [cb]);
  useEffect(() => {
    if (ms == null) return;
    const id = setInterval(() => ref.current(), ms);
    return () => clearInterval(id);
  }, [ms]);
}

function useTypewriter(text, active, speed = 24) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) { setOut(""); setDone(false); return; }
    setOut(""); setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return [out, done];
}

// ── Appear: section grows from a single horizontal line ───────────────────────
function Appear({ delay = 0, children }) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setV(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      transform: `scaleY(${v ? 1 : 0})`,
      transformOrigin: "top",
      opacity: v ? 1 : 0,
      transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease",
    }}>
      {children}
    </div>
  );
}

// ── Typed: inline typewriter text with blinking ink-cursor ────────────────────
function Typed({ text, delay = 0, speed = 22, style = {} }) {
  const [go, setGo] = useState(false);
  const [out, done] = useTypewriter(text, go, speed);
  useEffect(() => {
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <span style={style}>
      {out}
      {go && !done && (
        <span style={{
          display: "inline-block", width: 6, height: "0.85em",
          background: "currentColor", marginLeft: 1,
          verticalAlign: "middle",
          animation: "blink 0.65s step-end infinite",
        }} />
      )}
    </span>
  );
}

// ── Section heading — types the title and draws an underline ──────────────────
function SH({ n, title, delay }) {
  const line = "=".repeat(title.length + 6);
  return (
    <Appear delay={delay}>
      <div style={{ marginTop: 26, marginBottom: 10 }}>
        <div style={{ fontFamily: T.body, fontSize: 14, color: T.ink }}>
          <Typed text={`§ ${n}. ${title}`} delay={delay + 450} speed={28} />
        </div>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: T.ink2, marginTop: 1 }}>
          <Typed text={line} delay={delay + 560} speed={9} />
        </div>
      </div>
    </Appear>
  );
}

// ── InkPanel: grows from a point, then types its content ─────────────────────
const PH = { WAIT: 0, GROW: 1, TYPE: 2, DONE: 3 };

function InkPanel({ title, text, delay = 0, accent = T.blue }) {
  const [phase, setPhase] = useState(PH.WAIT);
  const [sy, setSy] = useState(0);
  const [typed, done] = useTypewriter(text, phase === PH.TYPE, 17);

  useEffect(() => {
    let t;
    if (phase === PH.WAIT) t = setTimeout(() => setPhase(PH.GROW), delay);
    else if (phase === PH.GROW) t = setTimeout(() => setPhase(PH.TYPE), 450);
    else if (phase === PH.TYPE && done) setPhase(PH.DONE);
    return () => clearTimeout(t);
  }, [phase, done, delay]);

  useEffect(() => {
    if (phase === PH.GROW) requestAnimationFrame(() => setSy(1));
  }, [phase]);

  if (phase === PH.WAIT) return null;

  return (
    <div style={{
      transform: `scaleY(${sy})`,
      transformOrigin: "top",
      transition: phase === PH.GROW ? "transform 0.44s cubic-bezier(0.22,1,0.36,1)" : "none",
      border: `1px solid ${accent}`,
      flex: "1 1 155px",
      minWidth: 155,
      background: "rgba(244,234,204,0.5)",
    }}>
      {/* Title bar */}
      <div style={{
        borderBottom: `1px solid ${accent}`,
        padding: "3px 8px",
        background: `${accent}11`,
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <div style={{ width: 4, height: 4, background: accent, flexShrink: 0 }} />
        <span style={{ fontFamily: T.mono, fontSize: 9, color: accent, letterSpacing: 2 }}>
          {title}
        </span>
      </div>
      {/* Body */}
      <div style={{ padding: "7px 10px" }}>
        <pre style={{
          fontFamily: T.body, fontSize: 12, color: T.ink,
          lineHeight: 1.65, margin: 0, whiteSpace: "pre-wrap",
        }}>
          {typed}
          {phase === PH.TYPE && !done && (
            <span style={{
              display: "inline-block", width: 6, height: 12,
              background: T.ink, marginLeft: 1, verticalAlign: "middle",
              animation: "blink 0.65s step-end infinite",
            }} />
          )}
        </pre>
      </div>
    </div>
  );
}

// ── Block diagram — boxes animate in one by one ───────────────────────────────
function Diagram() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const delays = [300, 700, 1100, 1500, 1900, 2300];
    const ts = delays.map((d, i) => setTimeout(() => setS(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, []);

  const op = (i) => ({ opacity: s > i ? 1 : 0, transition: "opacity 0.4s ease" });

  const Box = ({ x, y, w, h, label, sub, i }) => (
    <g style={op(i)}>
      <rect x={x} y={y} width={w} height={h}
        fill="rgba(243,234,205,0.75)" stroke={T.blue} strokeWidth="0.9" />
      <text x={x + w / 2} y={sub ? y + h / 2 - 5 : y + h / 2 + 4}
        textAnchor="middle" fill={T.ink}
        style={{ fontSize: 9, fontFamily: T.mono }}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 8} textAnchor="middle"
          fill={T.fade} style={{ fontSize: 7.5, fontFamily: T.body }}>
          {sub}
        </text>
      )}
    </g>
  );

  const Arr = ({ x1, y1, x2, y2, i }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={T.blue} strokeWidth="0.9"
      markerEnd="url(#darr)" style={op(i)} />
  );

  const Ln = ({ x1, y1, x2, y2, i }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={T.blue} strokeWidth="0.9" style={op(i)} />
  );

  return (
    <svg viewBox="0 0 400 185" width="100%"
      style={{ maxWidth: 400, display: "block" }}>
      <defs>
        <marker id="darr" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={T.blue} />
        </marker>
      </defs>

      <Box x={150} y={6}  w={100} h={26} label="OPERATOR"       i={0} />
      <Arr x1={200} y1={32} x2={200} y2={50} i={0} />

      <Box x={112} y={50} w={176} h={32} label="INTERFACE LAYER"
        sub="animated paper · HUD behaviours" i={1} />

      <Arr x1={155} y1={82} x2={90}  y2={102} i={2} />
      <Arr x1={245} y1={82} x2={310} y2={102} i={2} />

      <Box x={28}  y={102} w={124} h={28} label="CIRCUIT LAYER"
        sub="electronic state" i={2} />
      <Box x={248} y={102} w={124} h={28} label="PRINT LAYER"
        sub="physical substrate" i={3} />

      <Ln x1={90}  y1={130} x2={90}  y2={155} i={4} />
      <Ln x1={310} y1={130} x2={310} y2={155} i={4} />
      <Ln x1={90}  y1={155} x2={310} y2={155} i={4} />
      <Arr x1={200} y1={155} x2={200} y2={168} i={4} />

      <Box x={140} y={168} w={120} h={16} label="SYNTHESISED OUTPUT" i={5} />
    </svg>
  );
}

// ── Live ink graph — dot-matrix grid background, scrolling line ───────────────
function InkGraph({ label, w = 280, h = 52 }) {
  const id = useRef(`g${Math.random().toString(36).slice(2, 7)}`).current;
  const [pts, setPts] = useState(() =>
    Array.from({ length: 50 }, (_, i) =>
      0.5 + 0.28 * Math.sin(i * 0.38) + (Math.random() - 0.5) * 0.1
    )
  );
  useInterval(() => {
    setPts(p => {
      const last = p[p.length - 1];
      const next = Math.max(0.06, Math.min(0.94, last + (Math.random() - 0.5) * 0.1));
      return [...p.slice(1), next];
    });
  }, 90);

  const step = w / (pts.length - 1);
  const pathD = pts.map((v, i) => `${i === 0 ? "M" : "L"}${i * step},${h - v * h}`).join(" ");
  const fillD = `${pathD} L${w},${h} L0,${h} Z`;

  return (
    <div>
      {label && (
        <div style={{ fontFamily: T.mono, fontSize: 8, color: T.blue, letterSpacing: 1.5, marginBottom: 3, opacity: 0.8 }}>
          {label}
        </div>
      )}
      <svg width={w} height={h} style={{ display: "block", overflow: "visible" }}>
        <defs>
          <linearGradient id={`${id}f`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={T.blue} stopOpacity="0.18" />
            <stop offset="100%" stopColor={T.blue} stopOpacity="0.01" />
          </linearGradient>
          {/* Dot-matrix grid — evokes early printer output */}
          <pattern id={`${id}p`} width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="0.45" fill={T.blue} opacity="0.22" />
          </pattern>
        </defs>
        <rect width={w} height={h} fill={`url(#${id}p)`} />
        <path d={fillD} fill={`url(#${id}f)`} />
        <path d={pathD} fill="none" stroke={T.blue} strokeWidth="1.1" />
        {/* Leading edge cursor */}
        <line x1={w - 0.5} y1={0} x2={w - 0.5} y2={h}
          stroke={T.blue} strokeWidth="0.5" opacity="0.45" />
        <circle cx={w} cy={h - pts[pts.length - 1] * h} r="2.5" fill={T.blue} />
      </svg>
    </div>
  );
}

// ── SlideAlert: slides in from a side, then departs ──────────────────────────
function SlideAlert({ side = "right", yPct = "30%", text, sub, delay = 0, accent = T.amber }) {
  const [state, setState] = useState("pre");   // pre → in → out
  useEffect(() => {
    const t1 = setTimeout(() => setState("in"),  delay);
    const t2 = setTimeout(() => setState("out"), delay + 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [delay]);

  const W = 148;
  const off = side === "right" ? W + 4 : -(W + 4);
  const tx = state === "in" ? 0 : off;

  return (
    <div style={{
      position: "fixed",
      top: yPct,
      [side]: 0,
      width: W,
      transform: `translateX(${tx}px)`,
      transition: state === "in"
        ? "transform 0.52s cubic-bezier(0.22,1,0.36,1)"
        : "transform 0.44s cubic-bezier(0.55,0,1,0.45)",
      zIndex: 20,
      pointerEvents: "none",
    }}>
      <div style={{
        margin: 3,
        border: `1px solid ${accent}`,
        borderLeft:  side === "left"  ? `2px solid ${accent}` : undefined,
        borderRight: side === "right" ? `2px solid ${accent}` : undefined,
        background: "rgba(243,232,202,0.93)",
        padding: "6px 9px",
      }}>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: accent, letterSpacing: 1.5, marginBottom: 2 }}>
          {text}
        </div>
        {sub && (
          <div style={{ fontFamily: T.body, fontSize: 10, color: T.fade }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Status ticker ─────────────────────────────────────────────────────────────
function Ticker() {
  const msgs = [
    "SYSTEM NOMINAL · INTERFACE ACTIVE · BUILD 1.0.4 · UPTIME 00:14:22",
    "SHANNON APPLIED COMPUTING · DIVISION OF INTERFACE RESEARCH · IRELAND",
    "ANALOGUE-DIGITAL SYNTHESIS · LAYER STACK OPERATIONAL · ALL CHANNELS OPEN",
  ];
  const full = msgs.join("  · · · · ·  ");
  const [pos, setPos] = useState(0);
  useInterval(() => setPos(p => (p + 1) % full.length), 58);
  const rep = full + "  · · · · ·  " + full;
  const view = rep.slice(pos, pos + 62);
  return (
    <div style={{
      borderTop: `1px solid ${T.blue}44`,
      padding: "6px 0",
      marginTop: 30,
      overflow: "hidden",
    }}>
      <span style={{ fontFamily: T.mono, fontSize: 9, color: T.blue, letterSpacing: 1, opacity: 0.72 }}>
        {view}
      </span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Shannonware() {
  return (
    <div style={{ minHeight: "100vh", ...PAPER, padding: "0 28px 52px", display: "flex", justifyContent: "center" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Share+Tech+Mono&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        * { box-sizing: border-box; }
      `}</style>

      {/* Slide alerts — float at fixed viewport positions */}
      <SlideAlert side="right" yPct="28%" text="▸ LAYER SYNC ACTIVE"  sub="circuit–print bridge OK" delay={10200} accent={T.blue} />
      <SlideAlert side="left"  yPct="55%" text="⚠ ANNOTATION ENTRY"  sub="marginal context loaded" delay={14400} accent={T.amber} />
      <SlideAlert side="right" yPct="68%" text="▸ SIGNAL CONFIRMED"   sub="uplink stable · 12 ms"  delay={18000} accent={T.blue} />

      {/* Document column */}
      <div style={{ width: "100%", maxWidth: 660 }}>

        {/* ── Institution header ─────────────────────────────────────────── */}
        <Appear delay={300}>
          <div style={{
            textAlign: "center",
            padding: "34px 0 18px",
            borderBottom: `1px solid ${T.ink}2a`,
            marginBottom: 24,
          }}>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.ink2, letterSpacing: 0.5 }}>
              <Typed text="Shannon Applied Computing" delay={500}  speed={32} />
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.ink2, marginTop: 3 }}>
              <Typed text="Division of Interface Research" delay={1100} speed={32} />
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.ink2, marginTop: 3 }}>
              <Typed text="Ireland" delay={1650} speed={32} />
            </div>
          </div>
        </Appear>

        {/* ── Title block ────────────────────────────────────────────────── */}
        <Appear delay={2100}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontFamily: T.body, fontSize: 22, color: T.ink, letterSpacing: 4, lineHeight: 1.1 }}>
              <Typed text="SHANNONWARE" delay={2300} speed={55} />
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 13, color: T.ink2, letterSpacing: 5, marginTop: 6 }}>
              <Typed text="* * * * * * * * * * * *" delay={3100} speed={44} />
            </div>
            <div style={{ fontFamily: T.body, fontSize: 12, color: T.fade, marginTop: 10, letterSpacing: 0.5 }}>
              <Typed text="Interface Systems · Applied Computing Research" delay={3900} speed={26} />
            </div>
          </div>
        </Appear>

        <div style={{ borderTop: `1px solid ${T.ink}1e`, marginBottom: 6 }} />

        {/* ── § 1 ───────────────────────────────────────────────────────── */}
        <SH n={1} title="The Analogue-Digital Synthesis" delay={4400} />

        <Appear delay={4800}>
          <p style={{ fontFamily: T.body, fontSize: 13, color: T.ink, lineHeight: 1.82, marginBottom: 14 }}>
            <Typed
              text="The Shannonware interface occupies the boundary between two historically separate domains: the printed page and the electronic display. Whereas these have until now remained distinct — one static, one animated — the synthesis pursued here treats them as two aspects of a single substrate."
              delay={5100} speed={10}
            />
          </p>
        </Appear>

        <Appear delay={7000}>
          <p style={{ fontFamily: T.body, fontSize: 13, color: T.ink, lineHeight: 1.82, marginBottom: 18 }}>
            <Typed
              text="The resulting artefact resembles a document from a divergent timeline — one in which computational circuits were printed on paper, and dynamic interfaces moved across the page as living electric ink."
              delay={7300} speed={12}
            />
          </p>
        </Appear>

        {/* ── Block diagram ──────────────────────────────────────────────── */}
        <Appear delay={8800}>
          <div style={{ marginBottom: 22, paddingLeft: 6 }}>
            <div style={{ fontFamily: T.mono, fontSize: 8, color: T.blue, letterSpacing: 2, marginBottom: 7, opacity: 0.85 }}>
              FIG. 1 · LAYER ARCHITECTURE OF THE INTERFACE STACK
            </div>
            <Diagram />
            <div style={{ fontFamily: T.body, fontSize: 10, color: T.fade, marginTop: 5, fontStyle: "italic" }}>
              <Typed text="(Daher im Speicher nur 23 Stellen nötig)" delay={11400} speed={30} />
            </div>
          </div>
        </Appear>

        {/* ── § 2 ───────────────────────────────────────────────────────── */}
        <SH n={2} title="Interface Properties" delay={11800} />

        <Appear delay={12100}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
            <InkPanel
              title="GROWTH_BEHAVIOUR"
              text={"Each element grows\nfrom a single point\nbefore its content\nis revealed.\n\nCollapse mirrors\ngrowth in reverse."}
              delay={12300}
              accent={T.blue}
            />
            <InkPanel
              title="TYPEWRITE_PROTOCOL"
              text={"Text enters the field\ncharacter by character\nat a rate suited\nto content type.\n\nData: fast.\nProse: measured."}
              delay={13200}
              accent={T.blue}
            />
            <InkPanel
              title="SLIDE_ENTRY"
              text={"Annotations arrive\nfrom the margins of\nthe visual field as\ncontext demands.\n\nThey depart\nthe same way."}
              delay={14100}
              accent={T.amber}
            />
          </div>
        </Appear>

        {/* ── § 3 ───────────────────────────────────────────────────────── */}
        <SH n={3} title="Signal Monitor" delay={15000} />

        <Appear delay={15300}>
          <div style={{
            border: `1px solid ${T.blue}`,
            padding: "10px 12px",
            marginBottom: 20,
            background: "rgba(242,232,200,0.42)",
          }}>
            <div style={{ fontFamily: T.mono, fontSize: 8, color: T.blue, letterSpacing: 2, marginBottom: 10, opacity: 0.85 }}>
              REAL-TIME TELEMETRY · INTERFACE ACTIVITY
            </div>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              <InkGraph label="SIGNAL FLUX · BAND A · 2.4 GHz" w={270} h={52} />
              <InkGraph label="DATA THROUGHPUT · BYTES / SEC"   w={270} h={52} />
            </div>
          </div>
        </Appear>

        {/* ── § 4 ───────────────────────────────────────────────────────── */}
        <SH n={4} title="Technical Specification" delay={15800} />

        <Appear delay={16100}>
          <pre style={{
            fontFamily: T.mono, fontSize: 11, color: T.ink2,
            lineHeight: 1.75, margin: "0 0 12px", whiteSpace: "pre-wrap",
          }}>
            <Typed
              text={"Halblogarithmisch dual:  z = 2^a · b\nwobei -64 ≤ a ≤ +63;    a hat 7 Dualstellen\n         1 ≤ b < 2;    b hat 24 Dualstellen\n         b = 1.011...0;   erste Stelle immer 1.\n                    24\n\n(Daher im Speicher nur 23 Stellen nötig)"}
              delay={16400} speed={14}
            />
          </pre>
        </Appear>

        <Appear delay={19000}>
          <div style={{
            borderLeft: `2px solid ${T.amber}`,
            paddingLeft: 10,
            marginBottom: 18,
          }}>
            <p style={{ fontFamily: T.body, fontSize: 12, color: T.ink, lineHeight: 1.8, margin: 0 }}>
              <Typed
                text="Vorzeichen = 1 weitere Dualstelle (+ = 1, − = 0). Zahlen wie 0, ∞, ? besitzen keine halblogarithmische Darstellung mit |b| ≥ 1. Deshalb als Sonderwerte betrachtet. 2 Operandenregister OR I und OR II dienen zur Bereitstellung der Operanden, bevor die Operation beginnt."
                delay={19300} speed={14}
              />
            </p>
          </div>
        </Appear>

        <Ticker />

      </div>
    </div>
  );
}
