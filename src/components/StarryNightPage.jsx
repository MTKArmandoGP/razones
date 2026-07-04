import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── Tokens ────────────────────────────────────────────────────────────────
const C = {
  skyDeep: "#0b1d4d",
  skyMid: "#16337a",
  skyLight: "#2a4d8f",
  horizon: "#6b3f8f",
  swirl: "#8fb8e8",
  swirlLight: "#cfe4ff",
  star: "#ffe9a8",
  starCore: "#fff6d9",
  moon: "#ffe9a8",
  moonHalo: "#fff2c4",
  hill: "#0e2a52",
  hillDark: "#081a38",
  village: "#0a2040",
  windowGlow: "#f6c86a",
  cypress: "#081428",
  cypressMid: "#0d1f3d",
  ink: "#fdf6ea",
  inkSoft: "#cdd8f2",
  accent: "#e8b04c",
  card: "#12234d",
}

function wrapText(text, maxChars = 22) {
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

// ─── Star (clickable) ──────────────────────────────────────────────────────
function WishStar({ cx, cy, r, message, onClick, twinkleDelay = 0 }) {
  return (
    <motion.g
      style={{ cursor: "pointer" }}
      whileHover={{ scale: 1.25 }}
      transition={{ type: "spring", stiffness: 260, damping: 14 }}
      onClick={() => onClick(cx, cy - r * 2.4, message)}
    >
      <motion.circle
        cx={cx} cy={cy} r={r * 3.2}
        fill={C.star} opacity={0.12}
        animate={{ opacity: [0.08, 0.22, 0.08] }}
        transition={{ duration: 3, repeat: Infinity, delay: twinkleDelay, ease: "easeInOut" }}
      />
      <motion.g
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: twinkleDelay, ease: "easeInOut" }}
      >
        {[0, 45, 90, 135].map((rot) => (
          <ellipse key={rot} cx={cx} cy={cy} rx={r * 1.8} ry={r * 0.35}
            fill={C.starCore} transform={`rotate(${rot} ${cx} ${cy})`} opacity={0.55} />
        ))}
        <circle cx={cx} cy={cy} r={r} fill={C.starCore} />
      </motion.g>
    </motion.g>
  )
}

function TinyStar({ cx, cy, r, delay = 0 }) {
  return (
    <motion.circle
      cx={cx} cy={cy} r={r} fill={C.starCore}
      animate={{ opacity: [0.3, 0.9, 0.3] }}
      transition={{ duration: 2.6 + (delay % 2), repeat: Infinity, delay, ease: "easeInOut" }}
    />
  )
}

// ─── Swirl (Van Gogh style spiral) ─────────────────────────────────────────
function Swirl({ cx, cy, scale = 1, rotate = 0, color = C.swirl, opacity = 0.55 }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`} opacity={opacity}>
      <path
        d="M 0,0 C 18,-4 30,10 24,26 C 18,42 -2,44 -14,32 C -26,20 -22,0 -6,-6 C 6,-11 16,-4 14,8 C 12,18 0,20 -4,12"
        fill="none" stroke={color} strokeWidth={3.2} strokeLinecap="round"
      />
    </g>
  )
}

// ─── Cypress tree silhouette ───────────────────────────────────────────────
function Cypress({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M 0,0
           C 10,-14 -6,-20 4,-36
           C -6,-40 10,-52 0,-64
           C -10,-52 6,-40 -4,-36
           C 6,-20 -10,-14 0,0 Z"
        fill={C.cypress}
      />
      <path
        d="M 0,-64
           C 8,-72 -4,-80 4,-92
           C -4,-96 8,-106 0,-116
           C -8,-106 4,-96 -4,-92
           C 4,-80 -8,-72 0,-64 Z"
        fill={C.cypress}
      />
      <path
        d="M -6,0 C -14,20 -10,50 -8,74 L 8,74 C 10,50 14,20 6,0 Z"
        fill={C.cypressMid}
      />
    </g>
  )
}

// ─── Village silhouette ────────────────────────────────────────────────────
function Village() {
  return (
    <g>
      <path d="M 0,440 C 60,410 120,420 190,400 C 260,420 320,408 380,432 L 380,480 L 0,480 Z" fill={C.hill} />
      <path d="M 0,460 C 70,440 150,448 190,436 C 250,448 330,438 380,455 L 380,480 L 0,480 Z" fill={C.hillDark} />

      {/* pequeñas casas */}
      {[
        { x: 60, y: 420, w: 22, h: 20 },
        { x: 95, y: 428, w: 18, h: 16 },
        { x: 230, y: 418, w: 24, h: 22 },
        { x: 270, y: 426, w: 16, h: 16 },
        { x: 300, y: 420, w: 20, h: 20 },
      ].map((h, i) => (
        <g key={i}>
          <rect x={h.x} y={h.y} width={h.w} height={h.h} fill={C.village} />
          <path d={`M ${h.x - 3},${h.y} L ${h.x + h.w / 2},${h.y - 12} L ${h.x + h.w + 3},${h.y} Z`} fill={C.village} />
          <rect x={h.x + h.w / 2 - 2.5} y={h.y + h.h * 0.4} width={5} height={5} fill={C.windowGlow} opacity={0.85} />
        </g>
      ))}

      {/* iglesia con torre */}
      <g transform="translate(160 396)">
        <rect x={-10} y={10} width={20} height={34} fill={C.village} />
        <rect x={-6} y={-24} width={12} height={34} fill={C.village} />
        <path d="M -8,-24 L 0,-40 L 8,-24 Z" fill={C.village} />
        <rect x={-2.5} y={-14} width={5} height={5} fill={C.windowGlow} opacity={0.9} />
        <rect x={-3} y={20} width={6} height={6} fill={C.windowGlow} opacity={0.85} />
      </g>
    </g>
  )
}

function Tooltip({ tip }) {
  if (!tip) return null
  const lines = wrapText(tip.message, 24)
  const boxW = 210
  const lineH = 15
  const boxH = 20 + lines.length * lineH
  const boxY = Math.max(10, tip.y - boxH - 10)
  const boxX = Math.min(Math.max(tip.x, boxW / 2 + 8), 380 - boxW / 2 - 8)
  return (
    <motion.g
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.9 }}
      transition={{ duration: 0.25 }}
    >
      <rect x={boxX - boxW / 2} y={boxY} width={boxW} height={boxH} rx={12}
        fill={C.card} stroke={C.accent} strokeWidth={1} opacity={0.97} />
      {lines.map((line, i) => (
        <text key={i} x={boxX} y={boxY + 22 + i * lineH} textAnchor="middle"
          fontFamily="Georgia, serif" fontStyle="italic" fontSize="11.5" fill={C.ink}>
          {line}
        </text>
      ))}
    </motion.g>
  )
}

export default function StarryNightPage({ onBack }) {
  const [tip, setTip] = useState(null)
  const [noteOpen, setNoteOpen] = useState(false)

  const handleStarClick = (x, y, message) => {
    setTip({ x, y, message })
    window.clearTimeout(handleStarClick._t)
    handleStarClick._t = window.setTimeout(() => setTip(null), 4600)
  }

  const wishes = [
    { cx: 70, cy: 90, r: 8, message: "En ti veo lo que Van Gogh veía en las estrellas." },
    { cx: 300, cy: 70, r: 7, message: "Contigo hasta el cielo se ve distinto, más bonito." },
    { cx: 210, cy: 130, r: 6, message: "Eres esa luz que no sabía que estaba buscando." },
    { cx: 130, cy: 60, r: 6.5, message: "Quiero mirar el mismo cielo contigo, siempre." },
    { cx: 335, cy: 160, r: 6, message: "Cada estrella me recuerda un poco a ti: única." },
    { cx: 40, cy: 180, r: 6.5, message: "Contigo el mundo se mueve más despacio y más lindo." },
    { cx: 250, cy: 200, r: 7, message: "Eres el remolino de color en mis días grises." },
  ]

  return (
    <main style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${C.skyDeep} 0%, ${C.skyMid} 45%, ${C.horizon} 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 20px",
      position: "relative",
      overflow: "hidden",
    }}>
      <button
        onClick={onBack}
        style={{
          position: "fixed", top: 20, left: 20, zIndex: 100,
          background: "rgba(18,35,77,0.7)",
          border: `1px solid ${C.accent}55`,
          borderRadius: "50%",
          width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: C.accent, fontSize: 20,
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
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
          color: C.accent, textTransform: "uppercase", margin: "0 0 12px", opacity: 0.85,
        }}
      >
        ✦ una noche, solo nuestra ✦
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
        Nuestra noche estrellada
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        style={{
          fontFamily: "Georgia, serif", fontSize: 13, fontStyle: "italic",
          color: C.inkSoft, margin: "0 0 8px", textAlign: "center", maxWidth: 360,
        }}
      >
        toca cada estrella y descubre un pequeño mensaje ✦
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        style={{
          width: "100%", maxWidth: 400,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
          border: `1px solid ${C.accent}33`,
        }}
      >
        <svg viewBox="0 0 380 480" style={{ width: "100%", height: "auto", display: "block" }}>
          <defs>
            <radialGradient id="moonHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={C.moonHalo} stopOpacity="0.9" />
              <stop offset="45%" stopColor={C.moonHalo} stopOpacity="0.25" />
              <stop offset="100%" stopColor={C.moonHalo} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.skyDeep} />
              <stop offset="55%" stopColor={C.skyMid} />
              <stop offset="100%" stopColor={C.horizon} />
            </linearGradient>
          </defs>

          <rect x={0} y={0} width={380} height={480} fill="url(#skyGrad)" />

          {/* halo de luna */}
          <circle cx={300} cy={90} r={70} fill="url(#moonHalo)" />

          {/* remolinos estilo Van Gogh */}
          <Swirl cx={190} cy={110} scale={2.6} rotate={10} color={C.swirlLight} opacity={0.5} />
          <Swirl cx={110} cy={150} scale={1.8} rotate={-20} color={C.swirl} opacity={0.45} />
          <Swirl cx={270} cy={200} scale={2.1} rotate={35} color={C.swirl} opacity={0.4} />
          <Swirl cx={60} cy={90} scale={1.4} rotate={60} color={C.swirlLight} opacity={0.4} />

          {/* estrellitas de fondo */}
          {[
            [20, 40], [100, 25], [160, 45], [230, 30], [350, 40], [10, 240],
            [370, 250], [30, 300], [340, 300], [200, 260], [150, 220], [280, 100],
          ].map(([x, y], i) => (
            <TinyStar key={i} cx={x} cy={y} r={1.4 + (i % 3) * 0.5} delay={i * 0.4} />
          ))}

          {/* luna */}
          <motion.circle
            cx={300} cy={90} r={26} fill={C.moon}
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* cipreses */}
          <Cypress x={55} y={430} scale={1.15} />
          <Cypress x={330} y={440} scale={0.85} />

          {/* pueblo */}
          <Village />

          {/* estrellas con mensaje */}
          {wishes.map((w, i) => (
            <WishStar key={i} cx={w.cx} cy={w.cy} r={w.r} message={w.message}
              onClick={handleStarClick} twinkleDelay={i * 0.5} />
          ))}

          <AnimatePresence>
            {tip && <Tooltip tip={tip} />}
          </AnimatePresence>
        </svg>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setNoteOpen(true)}
        style={{
          marginTop: 22,
          padding: "10px 26px",
          borderRadius: 50,
          border: `1px solid ${C.accent}88`,
          background: "rgba(18,35,77,0.6)",
          color: C.accent,
          fontFamily: "Georgia, serif",
          fontSize: 13,
          fontStyle: "italic",
          cursor: "pointer",
          boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
          backdropFilter: "blur(6px)",
        }}
      >
        leer la carta bajo las estrellas ✦
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
              background: "rgba(6,12,30,0.55)",
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
                maxWidth: 380, width: "100%",
                background: "linear-gradient(160deg, #16233f, #0e1a34)",
                border: `1px solid ${C.accent}44`,
                borderRadius: 18,
                padding: "34px 30px",
                textAlign: "center",
                boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
              }}
            >
              <p style={{ fontSize: 26, margin: "0 0 12px" }}>✦</p>
              <p style={{
                fontFamily: "Georgia, serif", fontSize: 14.5, fontStyle: "italic",
                color: C.ink, lineHeight: 1.95, margin: "0 0 10px",
              }}>
                Dicen que Van Gogh pintó esa noche llena de remolinos porque
                así sentía el mundo por dentro: intenso, un poco caótico, pero
                lleno de luz.
              </p>
              <p style={{
                fontFamily: "Georgia, serif", fontSize: 14.5, fontStyle: "italic",
                color: C.ink, lineHeight: 1.95, margin: "0 0 22px",
              }}>
                Así me haces sentir tú. Y si pudiera pintar mi propio cielo,
                cada estrella tendría tu nombre. ✦
              </p>
              <button
                onClick={() => setNoteOpen(false)}
                style={{
                  padding: "10px 28px", borderRadius: 50, border: "none",
                  background: `linear-gradient(135deg, #d69a3a, ${C.accent})`,
                  color: "#1a1204", fontFamily: "Georgia, serif", fontSize: 13,
                  fontStyle: "italic", cursor: "pointer",
                  boxShadow: "0 8px 22px rgba(0,0,0,0.35)",
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
