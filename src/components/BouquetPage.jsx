import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── Tokens ────────────────────────────────────────────────────────────────
const C = {
  bg1: "#fff6f4",
  bg2: "#ffeef1",
  ink: "#5b2d2d",
  inkSoft: "#9b6070",
  accent: "#c0606e",
  peonyOuter: "#f3c6d3",
  peonyInner: "#e192a8",
  peonyCore: "#c9678a",
  roseOuter: "#c85a70",
  roseInner: "#a83a52",
  roseCore: "#7c2338",
  tulipCoral: "#e2707a",
  tulipYellow: "#eab35c",
  tulipBlush: "#dd93a8",
  stem: "#7a9b6e",
  stemDark: "#5f8054",
  leaf: "#84a879",
  kraft: "#efe2ca",
  kraftDark: "#ddc9a3",
  ribbon: "#c0606e",
  ribbonDark: "#9a4457",
  babyBreath: "#fffaf5",
}

const FLOWER_LABELS = {
  peonia: "Peonía",
  rosa: "Rosa",
  tulipan: "Tulipán",
}

function wrapText(text, maxChars = 20) {
  const words = text.split(" ")
  const lines = []
  let current = ""
  words.forEach((w) => {
    const test = current ? `${current} ${w}` : w
    if (test.length > maxChars && current) {
      lines.push(current)
      current = w
    } else {
      current = test
    }
  })
  if (current) lines.push(current)
  return lines
}

// ─── Geometry helpers ──────────────────────────────────────────────────────
function petals(count, radius, rx, ry, offsetDeg = 0) {
  const arr = []
  for (let i = 0; i < count; i++) {
    const angle = offsetDeg + (360 / count) * i
    const rad = (angle * Math.PI) / 180
    const px = radius * Math.sin(rad)
    const py = -radius * Math.cos(rad)
    arr.push({ px, py, rot: angle, rx, ry })
  }
  return arr
}

// ─── Flowers ───────────────────────────────────────────────────────────────
function Peony({ cx, cy, r, message, onClick }) {
  const outer = petals(9, r * 0.55, r * 0.34, r * 0.52, 4)
  const inner = petals(7, r * 0.3, r * 0.26, r * 0.4, 18)
  return (
    <motion.g
      style={{ cursor: "pointer" }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 260, damping: 14 }}
      onClick={() => onClick("peonia", cx, cy - r, message)}
    >
      <g transform={`translate(${cx} ${cy})`}>
        {outer.map((p, i) => (
          <ellipse key={`o${i}`} cx={p.px} cy={p.py} rx={p.rx} ry={p.ry}
            fill={C.peonyOuter} transform={`rotate(${p.rot} ${p.px} ${p.py})`} opacity={0.95} />
        ))}
        {inner.map((p, i) => (
          <ellipse key={`i${i}`} cx={p.px} cy={p.py} rx={p.rx} ry={p.ry}
            fill={C.peonyInner} transform={`rotate(${p.rot} ${p.px} ${p.py})`} opacity={0.95} />
        ))}
        <circle r={r * 0.14} fill={C.peonyCore} />
      </g>
    </motion.g>
  )
}

function Rose({ cx, cy, r, message, onClick }) {
  const outer = petals(6, r * 0.5, r * 0.3, r * 0.46, 0)
  const inner = petals(5, r * 0.26, r * 0.22, r * 0.34, 30)
  return (
    <motion.g
      style={{ cursor: "pointer" }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 260, damping: 14 }}
      onClick={() => onClick("rosa", cx, cy - r, message)}
    >
      <g transform={`translate(${cx} ${cy})`}>
        {outer.map((p, i) => (
          <ellipse key={`o${i}`} cx={p.px} cy={p.py} rx={p.rx} ry={p.ry}
            fill={C.roseOuter} transform={`rotate(${p.rot} ${p.px} ${p.py})`} />
        ))}
        {inner.map((p, i) => (
          <ellipse key={`i${i}`} cx={p.px} cy={p.py} rx={p.rx} ry={p.ry}
            fill={C.roseInner} transform={`rotate(${p.rot} ${p.px} ${p.py})`} />
        ))}
        <path
          d={`M 0,0 C ${r * 0.12},-${r * 0.1} ${r * 0.1},${r * 0.08} 0,${r * 0.12} C -${r * 0.1},${r * 0.08} -${r * 0.12},-${r * 0.06} 0,0 Z`}
          fill={C.roseCore}
        />
      </g>
    </motion.g>
  )
}

function Tulip({ cx, cy, r, rotate = 0, color = C.tulipCoral, message, onClick }) {
  const w = r * 0.55
  const h = r * 1.3
  return (
    <motion.g
      style={{ cursor: "pointer" }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 260, damping: 14 }}
      onClick={() => onClick("tulipan", cx, cy - r, message)}
    >
      <g transform={`translate(${cx} ${cy}) rotate(${rotate})`}>
        <ellipse cx={-w * 0.6} cy={0} rx={w * 0.62} ry={h * 0.5}
          fill={color} opacity={0.92} transform={`rotate(-16 ${-w * 0.6} 0)`} />
        <ellipse cx={w * 0.6} cy={0} rx={w * 0.62} ry={h * 0.5}
          fill={color} opacity={0.92} transform={`rotate(16 ${w * 0.6} 0)`} />
        <ellipse cx={0} cy={-h * 0.06} rx={w * 0.68} ry={h * 0.56} fill={color} />
        <ellipse cx={0} cy={-h * 0.1} rx={w * 0.32} ry={h * 0.3} fill="#ffffff" opacity={0.18} />
      </g>
    </motion.g>
  )
}

function BabyBreath({ cx, cy }) {
  const dots = [
    { dx: 0, dy: 0 }, { dx: 7, dy: -4 }, { dx: -6, dy: -5 }, { dx: 3, dy: 8 },
  ]
  return (
    <g>
      {dots.map((d, i) => (
        <circle key={i} cx={cx + d.dx} cy={cy + d.dy} r={2.6} fill={C.babyBreath} stroke="#f0d8de" strokeWidth={0.5} />
      ))}
    </g>
  )
}

function Leaf({ x, y, rotate, scale = 1, color = C.leaf }) {
  return (
    <path
      d="M 0,0 C 10,-4 22,-2 30,10 C 22,14 8,14 0,0 Z"
      fill={color}
      opacity={0.9}
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
    />
  )
}

// ─── Wrap + ribbon ─────────────────────────────────────────────────────────
function PaperWrap() {
  return (
    <g>
      <path d="M 110,330 C 100,380 95,430 130,470 L 250,470 C 285,430 280,380 270,330 Z" fill={C.kraft} />
      <path d="M 110,330 C 100,380 95,430 130,470 L 250,470 C 285,430 280,380 270,330 Z"
        fill="none" stroke={C.kraftDark} strokeWidth={1} opacity={0.6} />
      <path d="M 150,335 L 140,465 M 190,332 L 190,468 M 230,335 L 240,465"
        stroke={C.kraftDark} strokeWidth={1} opacity={0.4} fill="none" />
    </g>
  )
}

function RibbonBow() {
  return (
    <g transform="translate(190 350)">
      <path d="M 0,0 C -30,-14 -46,4 -30,18 C -16,28 -4,14 0,0 Z" fill={C.ribbon} />
      <path d="M 0,0 C 30,-14 46,4 30,18 C 16,28 4,14 0,0 Z" fill={C.ribbon} />
      <path d="M 0,0 C -30,-14 -46,4 -30,18 C -16,28 -4,14 0,0 Z" fill="none" stroke={C.ribbonDark} strokeWidth={0.8} opacity={0.5} />
      <path d="M 0,0 C 30,-14 46,4 30,18 C 16,28 4,14 0,0 Z" fill="none" stroke={C.ribbonDark} strokeWidth={0.8} opacity={0.5} />
      <path d="M -6,6 L -22,60 L -8,56 Z" fill={C.ribbon} />
      <path d="M 6,6 L 20,64 L 6,58 Z" fill={C.ribbon} />
      <circle r={7} fill={C.ribbonDark} />
    </g>
  )
}

function Tooltip({ tip }) {
  if (!tip) return null
  const label = FLOWER_LABELS[tip.type]
  const lines = wrapText(tip.message, 22)
  const boxW = 168
  const lineH = 13
  const boxH = 26 + lines.length * lineH
  const boxY = tip.y - boxH - 10
  return (
    <motion.g
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.9 }}
      transition={{ duration: 0.25 }}
    >
      <rect x={tip.x - boxW / 2} y={boxY} width={boxW} height={boxH} rx={10}
        fill="#fffaf9" stroke={C.accent} strokeWidth={1} opacity={0.98} />
      <text x={tip.x} y={boxY + 17} textAnchor="middle"
        fontFamily="Georgia, serif" fontSize="9" letterSpacing="0.12em"
        fill={C.accent} style={{ textTransform: "uppercase" }} opacity={0.8}>
        {label}
      </text>
      {lines.map((line, i) => (
        <text key={i} x={tip.x} y={boxY + 32 + i * lineH} textAnchor="middle"
          fontFamily="Georgia, serif" fontStyle="italic" fontSize="10.5" fill={C.ink}>
          {line}
        </text>
      ))}
    </motion.g>
  )
}

// ─── Falling petals ambient background ─────────────────────────────────────
function FallingPetals() {
  const petalsData = [
    { left: "8%", delay: 0, dur: 11, color: C.peonyInner, size: 9 },
    { left: "22%", delay: 3, dur: 13, color: C.roseOuter, size: 7 },
    { left: "40%", delay: 6, dur: 10, color: C.tulipCoral, size: 8 },
    { left: "58%", delay: 1.5, dur: 14, color: C.peonyOuter, size: 10 },
    { left: "74%", delay: 4.5, dur: 12, color: C.roseInner, size: 7 },
    { left: "90%", delay: 8, dur: 11, color: C.tulipBlush, size: 8 },
  ]
  return (
    <>
      {petalsData.map((p, i) => (
        <div key={i} style={{
          position: "absolute", top: "-5%", left: p.left,
          width: p.size, height: p.size * 1.3,
          background: p.color, borderRadius: "60% 40% 60% 40%",
          opacity: 0.55,
          animation: `petalFall ${p.dur}s linear ${p.delay}s infinite`,
          pointerEvents: "none",
        }} />
      ))}
    </>
  )
}

export default function BouquetPage({ onBack }) {
  const [tip, setTip] = useState(null)
  const [noteOpen, setNoteOpen] = useState(false)

  const handleFlowerClick = (type, x, y, message) => {
    setTip({ type, x, y, message })
    window.clearTimeout(handleFlowerClick._t)
    handleFlowerClick._t = window.setTimeout(() => setTip(null), 4200)
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, ${C.bg1} 0%, ${C.bg2} 55%, #fff8f6 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 20px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes petalFall {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          8% { opacity: 0.6; }
          100% { transform: translateY(110vh) translateX(24px) rotate(200deg); opacity: 0; }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-1.2deg); }
          50% { transform: rotate(1.2deg); }
        }
      `}</style>

      <FallingPetals />

      <button
        onClick={onBack}
        style={{
          position: "fixed", top: 20, left: 20, zIndex: 100,
          background: "rgba(255,255,255,0.85)",
          border: "1px solid #fce8ec",
          borderRadius: "50%",
          width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: C.accent, fontSize: 20,
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 12px rgba(192,96,110,0.15)",
        }}
      >
        ‹
      </button>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          fontFamily: "Georgia, serif", fontSize: 11, letterSpacing: "0.24em",
          color: C.accent, textTransform: "uppercase", margin: "0 0 12px", opacity: 0.8,
        }}
      >
        ♥ para ti ♥
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          fontFamily: "Georgia, serif", fontWeight: 300,
          fontSize: "clamp(26px, 5vw, 40px)", color: C.ink,
          margin: "0 0 6px", textAlign: "center",
        }}
      >
        Un ramo, solo para ti
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        style={{
          fontFamily: "Georgia, serif", fontSize: 13, fontStyle: "italic",
          color: C.inkSoft, margin: "0 0 8px", textAlign: "center",
        }}
      >
        peonías, rosas y tulipanes — toca cada una y descubre un mensaje ♡
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          width: "100%", maxWidth: 380,
          animation: "sway 7s ease-in-out infinite",
          transformOrigin: "50% 95%",
        }}
      >
        <svg viewBox="0 0 380 480" style={{ width: "100%", height: "auto", overflow: "visible" }}>
          {/* leaves */}
          <Leaf x={125} y={280} rotate={-40} />
          <Leaf x={245} y={290} rotate={200} scale={-1} />
          <Leaf x={185} y={320} rotate={-8} scale={0.9} />
          <Leaf x={100} y={245} rotate={-70} scale={0.85} />
          <Leaf x={280} y={250} rotate={250} scale={-0.9} />

          {/* stems */}
          <path d="M150,186 C145,260 165,320 190,398" stroke={C.stem} strokeWidth={3} fill="none" />
          <path d="M225,166 C222,250 200,320 190,398" stroke={C.stem} strokeWidth={3} fill="none" />
          <path d="M195,225 C193,290 190,340 190,398" stroke={C.stemDark} strokeWidth={3} fill="none" />
          <path d="M110,216 C120,280 155,330 188,398" stroke={C.stem} strokeWidth={2.6} fill="none" />
          <path d="M265,201 C255,270 215,330 192,398" stroke={C.stem} strokeWidth={2.6} fill="none" />
          <path d="M180,136 C182,220 188,320 190,398" stroke={C.stemDark} strokeWidth={2.6} fill="none" />
          <path d="M95,166 C110,240 155,320 188,398" stroke={C.stem} strokeWidth={2.4} fill="none" />
          <path d="M255,136 C245,220 200,320 192,398" stroke={C.stem} strokeWidth={2.4} fill="none" />
          <path d="M150,116 C160,210 185,320 190,398" stroke={C.stemDark} strokeWidth={2.4} fill="none" />

          {/* filler */}
          <BabyBreath cx={82} cy={185} />
          <BabyBreath cx={298} cy={168} />
          <BabyBreath cx={222} cy={92} />
          <BabyBreath cx={128} cy={222} />
          <BabyBreath cx={240} cy={218} />

          {/* wrap + ribbon */}
          <PaperWrap />
          <RibbonBow />

          {/* tulips (back layer, tallest) */}
          <Tulip cx={95} cy={166} r={34} rotate={-12} color={C.tulipCoral}
            message="Quiero seguir eligiéndote, un día a la vez." onClick={handleFlowerClick} />
          <Tulip cx={255} cy={136} r={34} rotate={10} color={C.tulipYellow}
            message="Eres esa persona que no sabía que estaba buscando." onClick={handleFlowerClick} />
          <Tulip cx={150} cy={116} r={36} rotate={-4} color={C.tulipBlush}
            message="Contigo todo se siente más ligero." onClick={handleFlowerClick} />

          {/* roses */}
          <Rose cx={110} cy={216} r={30}
            message="Te quiero de una forma que no sabía que se podía querer a alguien." onClick={handleFlowerClick} />
          <Rose cx={265} cy={201} r={32}
            message="Mi lugar favorito es donde estás tú." onClick={handleFlowerClick} />
          <Rose cx={195} cy={128} r={26}
            message="Contigo hasta el silencio se siente bonito." onClick={handleFlowerClick} />

          {/* peonies (front, largest) */}
          <Peony cx={150} cy={186} r={40}
            message="Contigo hasta los días normales se sienten bonitos." onClick={handleFlowerClick} />
          <Peony cx={225} cy={166} r={44}
            message="Eres de las cosas buenas que no esperaba encontrar." onClick={handleFlowerClick} />
          <Peony cx={195} cy={225} r={36}
            message="Me gusta cómo se siente pensar en ti." onClick={handleFlowerClick} />

          <AnimatePresence>
            {tip && <Tooltip tip={tip} />}
          </AnimatePresence>
        </svg>
      </motion.div>

      {/* ribbon note */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setNoteOpen(true)}
        style={{
          marginTop: 4,
          padding: "10px 26px",
          borderRadius: 50,
          border: `1px solid ${C.accent}55`,
          background: "#fffaf9",
          color: C.accent,
          fontFamily: "Georgia, serif",
          fontSize: 13,
          fontStyle: "italic",
          cursor: "pointer",
          boxShadow: "0 6px 18px rgba(192,96,110,0.14)",
        }}
      >
        leer la tarjeta 🏷️
      </motion.button>

      <AnimatePresence>
        {noteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNoteOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "rgba(91,45,45,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 24, backdropFilter: "blur(3px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: 360, width: "100%",
                background: "linear-gradient(160deg, #fffaf9, #fff3f5)",
                border: `1px solid ${C.accent}33`,
                borderRadius: 18,
                padding: "34px 30px",
                textAlign: "center",
                boxShadow: "0 24px 60px rgba(91,45,45,0.25)",
              }}
            >
              <p style={{ fontSize: 26, margin: "0 0 12px" }}>🌸</p>
              <p style={{
                fontFamily: "Georgia, serif", fontSize: 14.5, fontStyle: "italic",
                color: C.ink, lineHeight: 1.95, margin: "0 0 10px",
              }}>
                No sé cómo decirte esto sin que suene a película, pero da igual:
                contigo todo se siente distinto. Más tranquilo, más bonito, más real.
              </p>
              <p style={{
                fontFamily: "Georgia, serif", fontSize: 14.5, fontStyle: "italic",
                color: C.ink, lineHeight: 1.95, margin: "0 0 22px",
              }}>
                Este ramo no es real todavía, pero lo que siento por ti sí.
                Y ojalá me dejes dártelo pronto, junto con todo lo demás que
                traigo guardado para ti. ♡
              </p>
              <button
                onClick={() => setNoteOpen(false)}
                style={{
                  padding: "10px 28px", borderRadius: 50, border: "none",
                  background: `linear-gradient(135deg, #d4607a, ${C.accent})`,
                  color: "#fff", fontFamily: "Georgia, serif", fontSize: 13,
                  fontStyle: "italic", cursor: "pointer",
                  boxShadow: "0 8px 22px rgba(192,96,110,0.3)",
                }}
              >
                cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
