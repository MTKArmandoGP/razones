import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── EmailJS config — mismos valores que ProposalPage ────────────────────────
const EMAILJS_SERVICE_ID  = "service_k0e0b2g"
const EMAILJS_TEMPLATE_ID = "template_068on1m"
const EMAILJS_PUBLIC_KEY  = "uRrkgTs3tVMS_1Jmp"
// ──────────────────────────────────────────────────────────────────────────────

async function notificar(respuesta) {
  try {
    const fecha = new Date().toLocaleString("es-MX", {
      dateStyle: "full", timeStyle: "short",
    })
    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id:  EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id:     EMAILJS_PUBLIC_KEY,
        template_params: { respuesta, fecha },
      }),
    })
  } catch (e) {
    // silencioso — no interrumpe la experiencia si falla
  }
}

// ─── Tokens — tema Evil Dead Rise: sangre, oscuridad, terror ────────────────
const C = {
  wine:      "#1a0202",
  wineLight: "#3d0000",
  wineSoft:  "#6b0000",
  cream:     "#e8ded4",
  paper:     "#efe6da",
  ink:       "#2a1a12",
  inkSoft:   "#5a3c30",
  gold:      "#a10000",
  goldSoft:  "#c94f3e",
  blush:     "#8b1a1a",
}

const dates = [
  {
    id: "jueves",
    course: "Función I",
    day: "Jueves",
    seal: "🩸",
    title: "Evil Dead Rise\njueves en la noche",
    description:
      "Luces apagadas, tu mano cerca de la mía por si el susto está muy fuerte, y dos horas de gritos que prometo no dejarte pasar sola. Yo llevo las palomitas, tú solo trae ganas de asustarte conmigo.",
    tag: "una noche sangrienta, dos boletos, cero excusas",
    note: "Si sobrevivimos la función, sobrevivimos cualquier cosa… y contigo quiero intentarlo ♡",
  },
  {
    id: "viernes",
    course: "Función II",
    day: "Viernes",
    seal: "🔪",
    title: "Evil Dead Rise\nviernes en la noche",
    description:
      "Mismo terror, pero para cerrar la semana como se debe. Cine a oscuras, la peor idea para dormir tranquilos y la mejor excusa que se me ha ocurrido para quedarme pegado a ti hasta que se prendan las luces.",
    tag: "para cerrar la semana con un buen susto, y contigo",
    note: "El viernes contigo, sangre y todo, ya se me hace la mejor idea de la semana ♡",
  },
]

// ─── Ambient candle glow ─────────────────────────────────────────────────
function CandleGlow() {
  return (
    <>
      <div style={{
        position: "absolute", top: "-10%", left: "50%",
        width: 600, height: 600, transform: "translateX(-50%)",
        background: `radial-gradient(circle, ${C.gold}22 0%, transparent 65%)`,
        animation: "flicker 6s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-15%", left: "10%",
        width: 420, height: 420,
        background: `radial-gradient(circle, ${C.blush}18 0%, transparent 70%)`,
        animation: "flicker 7.5s ease-in-out infinite 1s",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", right: "8%",
        width: 380, height: 380,
        background: `radial-gradient(circle, ${C.gold}18 0%, transparent 70%)`,
        animation: "flicker 5s ease-in-out infinite 0.5s",
        pointerEvents: "none",
      }} />
    </>
  )
}

// ─── Goteo de sangre en el borde superior — ahora "respira" y escurre ─────
function BloodDrip() {
  const drips = [
    { left: "8%",  h: 34, w: 7, dur: 3.2 },
    { left: "19%", h: 18, w: 5, dur: 2.6 },
    { left: "33%", h: 46, w: 8, dur: 3.8 },
    { left: "48%", h: 22, w: 6, dur: 2.9 },
    { left: "61%", h: 38, w: 7, dur: 3.4 },
    { left: "74%", h: 16, w: 5, dur: 2.4 },
    { left: "88%", h: 30, w: 7, dur: 3.1 },
  ]
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 60, zIndex: 2, pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, background: C.gold, opacity: 0.9 }} />
      {drips.map((d, i) => (
        <div key={i} style={{
          position: "absolute", top: 8, left: d.left, width: d.w, height: d.h,
          background: `linear-gradient(to bottom, ${C.gold}, ${C.blush}00)`,
          borderRadius: "0 0 50% 50%",
          opacity: 0.85,
          transformOrigin: "top center",
          animation: `ooze ${d.dur}s ease-in-out infinite`,
          animationDelay: `${i * 0.35}s`,
        }} />
      ))}
    </div>
  )
}

// ─── Gotas de sangre cayendo por toda la pantalla — ambiente ──────────────
function FallingBlood() {
  const drops = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${(i * 7.3) % 100}%`,
    size: 4 + (i % 4) * 2,
    dur: 3.5 + (i % 5) * 1.1,
    delay: (i % 7) * 0.9,
  }))
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
      {drops.map((d) => (
        <div
          key={d.id}
          style={{
            position: "absolute",
            top: "-5%",
            left: d.left,
            width: d.size,
            height: d.size * 1.6,
            borderRadius: "50% 50% 50% 0",
            transform: "rotate(45deg)",
            background: `linear-gradient(160deg, ${C.goldSoft}, ${C.gold})`,
            opacity: 0,
            animation: `fallDrop ${d.dur}s linear infinite`,
            animationDelay: `${d.delay}s`,
            boxShadow: `0 0 6px ${C.gold}55`,
          }}
        />
      ))}
    </div>
  )
}

// ─── A menu-style row with dotted leader ──────────────────────────────────
function DottedRow({ icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 11 }}>
      <span style={{ fontSize: 15, flexShrink: 0 }}>{icon}</span>
      <p style={{
        fontFamily: "Georgia, serif",
        fontSize: 14,
        color: C.inkSoft,
        margin: 0,
        lineHeight: 1.5,
      }}>{text}</p>
    </div>
  )
}

function Flourish({ color = C.gold }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${color}66)` }} />
      <span style={{ color, fontSize: 11, opacity: 0.8 }}>❦</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${color}66)` }} />
    </div>
  )
}

// ─── The runaway "no" — reframed as fine print at the bottom of the menu ──
function RunawayNo({ onCatch }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [catches, setCatches] = useState(0)

  const run = () => {
    const x = (Math.random() - 0.5) * 170
    const y = (Math.random() - 0.5) * 70
    setPos({ x, y })
  }

  const handleClick = () => {
    const next = catches + 1
    setCatches(next)
    if (next >= 3) onCatch()
    else run()
  }

  const labels = ["tal vez otro día…", "…en serio, no…", "…bueno, va 🙈"]

  return (
    <motion.button
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={run}
      onClick={handleClick}
      style={{
        padding: "10px 22px",
        borderRadius: 3,
        border: `1px solid ${C.gold}55`,
        background: "transparent",
        color: C.inkSoft,
        fontFamily: "Georgia, serif",
        fontSize: 12,
        cursor: "pointer",
        fontStyle: "italic",
        whiteSpace: "nowrap",
        letterSpacing: "0.02em",
      }}
    >
      {labels[Math.min(catches, 2)]}
    </motion.button>
  )
}

// ─── Menu entry (course card) ──────────────────────────────────────────────
function MenuEntry({ date, expanded, onToggle, onSelect, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 + index * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "100%",
        borderTop: index === 1 ? `1px solid ${C.gold}33` : "none",
        paddingTop: index === 1 ? 28 : 0,
        marginTop: index === 1 ? 28 : 0,
      }}
    >
      <p style={{
        fontFamily: "Georgia, serif",
        fontSize: 10,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: C.gold,
        margin: "0 0 10px",
      }}>
        {date.course} · {date.day}
      </p>

      <div
        onClick={onToggle}
        style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}
      >
        <h3 style={{
          fontFamily: "Georgia, serif",
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: "clamp(19px, 3.6vw, 25px)",
          color: C.ink,
          lineHeight: 1.35,
          margin: 0,
          whiteSpace: "pre-line",
        }}>
          {date.title}
        </h3>
        <span style={{
          fontSize: 20,
          color: C.gold,
          flexShrink: 0,
          transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.35s ease",
        }}>+</span>
      </div>

      <div style={{ flex: 1, borderBottom: `1px dotted ${C.gold}55`, margin: "10px 0 16px" }} />

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontFamily: "Georgia, serif",
              fontSize: 13.5,
              color: C.inkSoft,
              lineHeight: 1.85,
              fontStyle: "italic",
              margin: "0 0 16px",
            }}>
              {date.description}
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <p style={{
                fontFamily: "Georgia, serif",
                fontSize: 11.5,
                fontStyle: "italic",
                color: C.gold,
                margin: 0,
                opacity: 0.85,
              }}>
                {date.tag}
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => { e.stopPropagation(); onSelect(date) }}
                style={{
                  padding: "10px 22px",
                  borderRadius: 6,
                  border: `1px solid ${C.wine}`,
                  background: C.wine,
                  color: C.cream,
                  fontFamily: "Georgia, serif",
                  fontSize: 12.5,
                  fontStyle: "italic",
                  letterSpacing: "0.03em",
                  cursor: "pointer",
                }}
              >
                elegir esta función 🩸
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Wax seal — the signature element ─────────────────────────────────────
function WaxSeal({ symbol, stamped }) {
  return (
    <motion.div
      initial={{ scale: 2.2, y: -60, opacity: 0, rotate: -12 }}
      animate={stamped ? { scale: 1, y: 0, opacity: 1, rotate: 0 } : {}}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
      style={{
        width: 84, height: 84,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 30%, ${C.wineSoft}, ${C.wine} 70%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 22px",
        boxShadow: `0 6px 20px ${C.wine}55, inset 0 2px 6px rgba(255,255,255,0.15)`,
        border: `1px solid ${C.gold}66`,
      }}
    >
      <span style={{ fontSize: 30 }}>{symbol}</span>
    </motion.div>
  )
}

function ConfirmScreen({ date, onBack }) {
  const [answered, setAnswered] = useState(false)
  const [noCaught, setNoCaught] = useState(false)

  if (noCaught) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: "center", maxWidth: 380 }}
      >
        <p style={{ fontSize: 40, margin: "0 0 14px" }}>🙈</p>
        <h3 style={{
          fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400,
          fontSize: 21, color: C.paper, margin: "0 0 10px",
        }}>
          …sabía que no ibas a poder escapar de mí
        </h3>
        <p style={{
          fontFamily: "Georgia, serif", fontSize: 13.5, color: `${C.paper}bb`,
          fontStyle: "italic", lineHeight: 1.8, margin: "0 0 26px",
        }}>
          "Tal vez otro día" nunca fue una opción real de la cartelera.<br />
          Ya nos apartaron los mejores asientos. ♡
        </p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            notificar(`✅ Aceptó ir al cine — ${date.day}: ${date.title.replace("\n", " ")} (después de intentar escapar)`)
            setAnswered(true)
          }}
          style={{
            padding: "13px 36px", borderRadius: 6, border: `1px solid ${C.gold}`,
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldSoft})`,
            color: C.paper, fontFamily: "Georgia, serif", fontSize: 14, fontStyle: "italic",
            cursor: "pointer", letterSpacing: "0.02em",
          }}
        >
          está bien, me rindo — sellemos esto 🩸
        </motion.button>
      </motion.div>
    )
  }

  if (answered) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ textAlign: "center", maxWidth: 420 }}
      >
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)",
            width: 130, height: 130, pointerEvents: "none",
            background: `radial-gradient(circle, ${C.gold}22 0%, transparent 70%)`,
          }} />
          <WaxSeal symbol={date.seal} stamped />
        </div>

        <p style={{
          fontFamily: "Georgia, serif", fontSize: 10, letterSpacing: "0.28em",
          textTransform: "uppercase", color: C.gold, margin: "0 0 10px",
        }}>
          ya quedamos, ya no hay vuelta atrás
        </p>

        <h3 style={{
          fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(22px, 5vw, 29px)", color: C.paper, lineHeight: 1.3, margin: "0 0 6px",
        }}>
          {date.day}
        </h3>

        <p style={{
          fontFamily: "Georgia, serif", fontSize: 13.5, color: `${C.paper}cc`,
          fontStyle: "italic", lineHeight: 1.7, margin: "0 0 24px", whiteSpace: "pre-line",
        }}>
          {date.title}
        </p>

        <div style={{
          background: `linear-gradient(160deg, ${C.paper}, ${C.cream})`,
          border: `1px solid ${C.gold}55`,
          borderRadius: 4,
          padding: "22px 26px",
          marginBottom: 26,
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "Georgia, serif", fontSize: 13, color: C.wine,
            fontStyle: "italic", margin: 0, textAlign: "center",
          }}>
            {date.note}
          </p>
        </div>

        <button
          onClick={onBack}
          style={{
            background: "none", border: "none", color: `${C.paper}aa`,
            fontFamily: "Georgia, serif", fontSize: 12.5, cursor: "pointer",
            fontStyle: "italic", textDecoration: "underline",
          }}
        >
          volver al inicio
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ textAlign: "center", maxWidth: 420 }}
    >
      <p style={{
        fontFamily: "Georgia, serif", fontSize: 10, letterSpacing: "0.28em",
        textTransform: "uppercase", color: C.gold, margin: "0 0 14px",
      }}>
        ¿le entramos a esto?
      </p>

      <h3 style={{
        fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400,
        fontSize: "clamp(21px, 4.6vw, 28px)", color: C.paper, lineHeight: 1.35, margin: "0 0 6px",
        whiteSpace: "pre-line",
      }}>
        {date.title}
      </h3>

      <p style={{
        fontFamily: "Georgia, serif", fontSize: 13.5, color: `${C.paper}aa`,
        fontStyle: "italic", margin: "0 0 34px",
      }}>
        {date.day}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              notificar(`✅ Aceptó ir al cine — ${date.day}: ${date.title.replace("\n", " ")}`)
              setAnswered(true)
            }}
            style={{
              padding: "13px 34px", borderRadius: 6, border: `1px solid ${C.gold}`,
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldSoft})`,
              color: C.paper, fontFamily: "Georgia, serif", fontSize: 14, fontStyle: "italic",
              cursor: "pointer", letterSpacing: "0.02em",
              boxShadow: `0 8px 24px ${C.gold}44`,
            }}
          >
            sí, cuenta conmigo 🩸
          </motion.button>
          <RunawayNo onCatch={() => {
            notificar(`😅 Intentó escapar de los boletos — ${date.day}: ${date.title.replace("\n", " ")}`)
            setNoCaught(true)
          }} />
        </div>
      </div>

      <button
        onClick={onBack}
        style={{
          background: "none", border: "none", color: `${C.paper}88`,
          fontFamily: "Georgia, serif", fontSize: 12, cursor: "pointer",
          fontStyle: "italic", textDecoration: "underline",
        }}
      >
        ← ver la otra función
      </button>
    </motion.div>
  )
}

export default function DateInvitePage({ onBack }) {
  const [selected, setSelected] = useState(null)
  const [expandedId, setExpandedId] = useState(dates[0].id)

  return (
    <main style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 50% 0%, ${C.wineLight} 0%, ${C.wine} 55%, #050101 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "56px 20px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          25% { opacity: 1; transform: scale(1.05); }
          50% { opacity: 0.6; transform: scale(0.97); }
          75% { opacity: 0.9; transform: scale(1.02); }
        }
        @keyframes ooze {
          0%, 100% { transform: scaleY(1); opacity: 0.85; }
          50% { transform: scaleY(1.35); opacity: 1; }
        }
        @keyframes fallDrop {
          0% { top: -5%; opacity: 0; }
          8% { opacity: 0.9; }
          85% { opacity: 0.7; }
          100% { top: 106%; opacity: 0; }
        }
        @keyframes titleDrip {
          0%, 100% { text-shadow: 0 2px 0 ${C.gold}66, 0 8px 14px rgba(161,0,0,0.35); }
          50% { text-shadow: 0 2px 0 ${C.gold}aa, 0 14px 22px rgba(161,0,0,0.55); }
        }
      `}</style>

      <CandleGlow />
      <FallingBlood />
      <BloodDrip />

      <button
        onClick={onBack}
        style={{
          position: "fixed", top: 20, left: 20, zIndex: 100,
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${C.gold}44`,
          borderRadius: "50%",
          width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: C.goldSoft, fontSize: 20,
          backdropFilter: "blur(8px)",
        }}
      >
        ‹
      </button>

      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: "Georgia, serif", fontSize: 11, letterSpacing: "0.3em",
                color: C.goldSoft, textTransform: "uppercase", margin: "0 0 14px", opacity: 0.85,
              }}
            >
              hay boletos con tu nombre
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400,
                fontSize: "clamp(28px, 5.5vw, 44px)", color: C.paper,
                lineHeight: 1.2, margin: "0 0 10px", textAlign: "center",
                animation: "titleDrip 3.5s ease-in-out infinite",
              }}
            >
              ¿Te animas a pasar miedo conmigo?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              style={{
                fontFamily: "Georgia, serif", fontSize: 13.5, fontStyle: "italic",
                color: `${C.paper}aa`, margin: "0 0 36px", textAlign: "center",
              }}
            >
              Ya hace mucho que no vamos al cine, me encantaría mucho que fueramos🩸
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleY: 0.6 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                width: "100%",
                background: `linear-gradient(165deg, ${C.paper} 0%, ${C.cream} 100%)`,
                border: `1px solid ${C.gold}44`,
                borderRadius: 16,
                padding: "40px 34px",
                boxShadow: `0 30px 70px rgba(0,0,0,0.4), inset 0 0 0 6px ${C.paper}, inset 0 0 0 7px ${C.gold}33`,
              }}
            >
              {dates.map((d, i) => (
                <MenuEntry
                  key={d.id}
                  date={d}
                  index={i}
                  expanded={expandedId === d.id}
                  onToggle={() => setExpandedId(expandedId === d.id ? null : d.id)}
                  onSelect={setSelected}
                />
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              style={{
                fontFamily: "Georgia, serif", fontSize: 12, fontStyle: "italic",
                color: `${C.goldSoft}bb`, marginTop: 26, textAlign: "center",
              }}
            >
              tú dime la noche y yo organizo🩸
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="confirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}
          >
            <ConfirmScreen date={selected} onBack={() => setSelected(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
