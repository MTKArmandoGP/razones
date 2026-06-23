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

const dates = [
  {
    id: "friday",
    day: "Viernes: día completo",
    emoji: "🌅",
    color: "#7a2b35",
    accent: "#c0606e",
    light: "#fce8ec",
    tag: "Empezamos temprano, terminamos tarde",
    title: "Desayuno, tu trabajo,\ny noche de cine o cena",
    description:
      "La idea es acompañarte en todo el viernes: arrancar con un buen desayuno antes de que empiece tu día, llevarte a tu trabajo, y estar pendiente para pasar por ti cuando salgas. Ya en la noche, cerrar el día con algo rico — cine, cena, o simplemente ir por algo de tomar, lo que se nos antoje en el momento.",
    details: [
      { icon: "🥞", text: "Desayuno con calma antes de empezar el día" },
      { icon: "🚗", text: "Te llevo a tu trabajo" },
      { icon: "🕐", text: "Paso por ti en cuanto salgas" },
      { icon: "🎬", text: "En la noche: cine, lo que sea que se vea bien" },
      { icon: "🍽️", text: "O cena tranquila, sin prisa de que se acabe" },
      { icon: "🥂", text: "O simplemente ir por algo de tomar y seguir platicando" },
    ],
    vibe: "relajado · de principio a fin · sin prisas",
    note: "Un viernes completo contigo suena perfecto ♡",
  },
  {
    id: "sunday",
    day: "Domingo en la CDMX",
    emoji: "🌸",
    color: "#3b5a3a",
    accent: "#6aaa68",
    light: "#e8f5e8",
    tag: "Un día entero para perdernos en la ciudad",
    title: "Pasar el domingo en\nun lugar muy lindo de la ciudad",
    description:
      "Un domingo para desconectarnos un poco de todo: ir a algún rincón bonito de la CDMX — puede ser un jardín, un museo chiquito, un barrio con calles bonitas para caminar — y simplemente pasar el día ahí, sin apuro, dejando que la ciudad nos sorprenda.",
    details: [
      { icon: "🌳", text: "Algún lugar bonito: un jardín, un museo" },
      { icon: "📸", text: "Caminar, ver rincones, tomar fotos tontas" },
      { icon: "🥐", text: "Ir a comer algo rico" },
      { icon: "🎨", text: "Dejar que el día se vaya armando solo" }
      //{ icon: "🌇", text: "Y si se hace de noche juntos, mejor todavía" },
    ],
    vibe: "tranquilo · bonito · sin horario fijo",
    note: "Un domingo así, contigo, suena a día perfecto ♡",
  },
]

function RunawayNo({ onCatch }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [catches, setCatches] = useState(0)

  const run = () => {
    const x = (Math.random() - 0.5) * 180
    const y = (Math.random() - 0.5) * 80
    setPos({ x, y })
  }

  const handleClick = () => {
    const next = catches + 1
    setCatches(next)
    if (next >= 3) onCatch()
    else run()
  }

  const labels = ["No puedo…", "En serio no…", "…bueno sí 🙈"]

  return (
    <motion.button
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={run}
      onClick={handleClick}
      style={{
        padding: "12px 28px",
        borderRadius: 50,
        border: "1.5px solid #f2c4c8",
        background: "transparent",
        color: "#b08090",
        fontFamily: "'Georgia', serif",
        fontSize: 14,
        cursor: "pointer",
        fontStyle: "italic",
        whiteSpace: "nowrap",
      }}
    >
      {labels[Math.min(catches, 2)]}
    </motion.button>
  )
}

function DateCard({ date, onSelect, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(date)}
      style={{
        width: "100%",
        maxWidth: 380,
        borderRadius: 28,
        border: `1.5px solid ${hovered ? date.accent : "#f2c4c8"}`,
        background: hovered
          ? `linear-gradient(160deg, ${date.light}cc 0%, #fff8f9 100%)`
          : "linear-gradient(160deg, #fffaf9 0%, #fff5f7 100%)",
        boxShadow: hovered
          ? `0 20px 56px rgba(192,96,110,0.2), 0 0 0 1px ${date.accent}22`
          : "0 8px 32px rgba(192,96,110,0.1)",
        padding: "36px 32px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        position: "relative",
        overflow: "hidden",
        textAlign: "left",
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 120, height: 120,
        background: `radial-gradient(circle at top right, ${date.light}88, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Tag */}
      <p style={{
        fontFamily: "'Georgia', serif",
        fontSize: 10,
        letterSpacing: "0.2em",
        color: date.accent,
        textTransform: "uppercase",
        margin: "0 0 16px",
        opacity: 0.8,
      }}>
        {date.tag}
      </p>

      {/* Day + emoji */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 36 }}>{date.emoji}</span>
        <p style={{
          fontFamily: "'Georgia', serif",
          fontSize: 13,
          color: "#b08090",
          margin: 0,
          letterSpacing: "0.08em",
          fontStyle: "italic",
        }}>
          {date.day}
        </p>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Georgia', serif",
        fontSize: "clamp(20px, 4vw, 26px)",
        fontWeight: 300,
        color: "#5b2d2d",
        lineHeight: 1.3,
        margin: "0 0 16px",
        whiteSpace: "pre-line",
      }}>
        {date.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: "'Georgia', serif",
        fontSize: 13,
        color: "#9b6070",
        lineHeight: 1.85,
        margin: "0 0 24px",
        fontStyle: "italic",
      }}>
        {date.description}
      </p>

      {/* Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {date.details.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{d.icon}</span>
            <p style={{
              fontFamily: "'Georgia', serif",
              fontSize: 13,
              color: "#7a4a55",
              margin: 0,
              lineHeight: 1.5,
            }}>{d.text}</p>
          </div>
        ))}
      </div>

      {/* Vibe tag */}
      <div style={{
        display: "inline-block",
        padding: "5px 14px",
        borderRadius: 50,
        background: `${date.light}`,
        border: `1px solid ${date.accent}33`,
        marginBottom: 8,
      }}>
        <p style={{
          fontFamily: "'Georgia', serif",
          fontSize: 11,
          color: date.accent,
          margin: 0,
          letterSpacing: "0.1em",
          fontStyle: "italic",
        }}>{date.vibe}</p>
      </div>

      {/* CTA hint */}
      <motion.div
        animate={{ x: hovered ? 4 : 0 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 6,
          marginTop: 8,
        }}
      >
        <p style={{
          fontFamily: "'Georgia', serif",
          fontSize: 12,
          color: date.accent,
          margin: 0,
          fontStyle: "italic",
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s",
        }}>
          elegir esta ♡
        </p>
        <span style={{ color: date.accent, fontSize: 14, opacity: hovered ? 1 : 0.5, transition: "opacity 0.3s" }}>→</span>
      </motion.div>
    </motion.div>
  )
}

function ConfirmScreen({ date, onBack }) {
  const [answered, setAnswered] = useState(false)
  const [noCaught, setNoCaught] = useState(false)

  if (noCaught) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: "center", maxWidth: 380 }}
      >
        <p style={{ fontSize: 48, margin: "0 0 16px" }}>🙈</p>
        <h3 style={{
          fontFamily: "'Georgia', serif",
          fontSize: 22,
          color: "#5b2d2d",
          fontWeight: 300,
          margin: "0 0 12px",
        }}>
          ...sabía que sí querías
        </h3>
        <p style={{
          fontFamily: "'Georgia', serif",
          fontSize: 14,
          color: "#9b6070",
          fontStyle: "italic",
          lineHeight: 1.8,
          margin: "0 0 28px",
        }}>
          El botón de "no" nunca fue una opción real.<br />
          Igual que el plan. Ya está decidido. ♡
        </p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            notificar(`✅ Aceptó la cita — ${date.day}: ${date.title.replace("\n", " ")} (después de intentar el botón "no")`)
            setAnswered(true)
          }}
          style={{
            padding: "14px 40px",
            borderRadius: 50,
            border: "none",
            background: "linear-gradient(135deg, #d4607a, #c0606e)",
            color: "#fff",
            fontFamily: "'Georgia', serif",
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(192,96,110,0.35)",
          }}
        >
          Sí, vamos ♡
        </motion.button>
      </motion.div>
    )
  }

  if (answered) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ textAlign: "center", maxWidth: 420 }}
      >
        {/* Confetti hearts */}
        {["10%","25%","50%","75%","90%"].map((left, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -180, opacity: 0 }}
            transition={{ duration: 1.8, delay: i * 0.12, ease: "easeOut" }}
            style={{
              position: "absolute",
              left,
              top: "40%",
              color: ["#f9a8c9","#c0606e","#f2c4c8","#e8a0a8","#d4607a"][i],
              fontSize: [16,12,20,14,18][i],
              pointerEvents: "none",
            }}
          >♥</motion.div>
        ))}

        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          style={{ fontSize: 64, margin: "0 0 20px" }}
        >
          {date.emoji}
        </motion.p>

        <h3 style={{
          fontFamily: "'Georgia', serif",
          fontSize: "clamp(22px, 5vw, 30px)",
          fontWeight: 300,
          color: "#5b2d2d",
          margin: "0 0 10px",
        }}>
          ¡Perfecto, ya tenemos plan!
        </h3>

        <p style={{
          fontFamily: "'Georgia', serif",
          fontSize: 14,
          color: "#9b6070",
          fontStyle: "italic",
          lineHeight: 1.9,
          margin: "0 0 28px",
        }}>
          {date.day} — {date.title.replace("\n", " ")}
        </p>

        <div style={{
          background: "linear-gradient(160deg, #fffaf9, #fff5f7)",
          border: "1.5px solid #f2c4c8",
          borderRadius: 20,
          padding: "24px 28px",
          marginBottom: 28,
        }}>
          {date.details.map((d, i) => (
            <p key={i} style={{
              fontFamily: "'Georgia', serif",
              fontSize: 13,
              color: "#7a4a55",
              margin: "0 0 8px",
              textAlign: "left",
            }}>
              {d.icon} {d.text}
            </p>
          ))}
          <p style={{
            fontFamily: "'Georgia', serif",
            fontSize: 13,
            color: "#c0606e",
            fontStyle: "italic",
            margin: "12px 0 0",
            textAlign: "center",
          }}>
            {date.note}
          </p>
        </div>

        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#b08090",
            fontFamily: "'Georgia', serif",
            fontSize: 13,
            cursor: "pointer",
            fontStyle: "italic",
            textDecoration: "underline",
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
      <motion.p
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ fontSize: 52, margin: "0 0 16px" }}
      >
        {date.emoji}
      </motion.p>

      <p style={{
        fontFamily: "'Georgia', serif",
        fontSize: 11,
        letterSpacing: "0.2em",
        color: "#c0606e",
        textTransform: "uppercase",
        margin: "0 0 12px",
        opacity: 0.7,
      }}>
        elegiste
      </p>

      <h3 style={{
        fontFamily: "'Georgia', serif",
        fontSize: "clamp(22px, 5vw, 32px)",
        fontWeight: 300,
        color: "#5b2d2d",
        lineHeight: 1.3,
        margin: "0 0 8px",
        whiteSpace: "pre-line",
      }}>
        {date.title}
      </h3>

      <p style={{
        fontFamily: "'Georgia', serif",
        fontSize: 14,
        color: "#9b6070",
        fontStyle: "italic",
        margin: "0 0 32px",
      }}>
        {date.day}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 36 }}>
        <p style={{
          fontFamily: "'Georgia', serif",
          fontSize: 16,
          color: "#5b2d2d",
          margin: "0 0 12px",
          fontWeight: 400,
        }}>
          ¿Lo hacemos? 🌸
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <motion.button
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              notificar(`✅ Aceptó la cita — ${date.day}: ${date.title.replace("\n", " ")}`)
              setAnswered(true)
            }}
            style={{
              padding: "14px 40px",
              borderRadius: 50,
              border: "none",
              background: "linear-gradient(135deg, #d4607a, #c0606e)",
              color: "#fff",
              fontFamily: "'Georgia', serif",
              fontSize: 15,
              cursor: "pointer",
              boxShadow: "0 8px 28px rgba(192,96,110,0.35)",
              letterSpacing: "0.02em",
            }}
          >
            Sí, quiero ir ♡
          </motion.button>
          <RunawayNo onCatch={() => {
            notificar(`😅 Intentó el botón "no" pero fue atrapado — ${date.day}: ${date.title.replace("\n", " ")}`)
            setNoCaught(true)
          }} />
        </div>
      </div>

      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#c8a0a8",
          fontFamily: "'Georgia', serif",
          fontSize: 12,
          cursor: "pointer",
          fontStyle: "italic",
          textDecoration: "underline",
        }}
      >
        ← ver la otra opción
      </button>
    </motion.div>
  )
}

export default function DateInvitePage({ onBack }) {
  const [selected, setSelected] = useState(null)

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fff0f3 0%, #fde8ee 50%, #fdf2f4 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background hearts */}
      {[
        { top: "5%", left: "6%", size: 20, op: 0.12 },
        { top: "10%", right: "8%", size: 13, op: 0.09 },
        { top: "80%", left: "4%", size: 24, op: 0.08 },
        { top: "85%", right: "6%", size: 17, op: 0.1 },
      ].map((h, i) => (
        <div key={i} style={{
          position: "absolute",
          top: h.top, left: h.left, right: h.right,
          fontSize: h.size, color: "#d4607a",
          opacity: h.op, pointerEvents: "none", userSelect: "none",
        }}>♥</div>
      ))}

      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          position: "fixed", top: 20, left: 20, zIndex: 100,
          background: "rgba(255,255,255,0.85)",
          border: "1px solid #fce8ec",
          borderRadius: "50%",
          width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#c0606e", fontSize: 20,
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 12px rgba(192,96,110,0.15)",
        }}
      >
        ‹
      </button>

      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="picker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ width: "100%", maxWidth: 820, display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            {/* Header */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "#c0606e",
                textTransform: "uppercase",
                margin: "0 0 16px",
                opacity: 0.8,
              }}
            >
              ♥ una pequeña invitación ♥
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(30px, 6vw, 52px)",
                fontWeight: 300,
                color: "#5b2d2d",
                lineHeight: 1.2,
                margin: "0 0 10px",
                textAlign: "center",
              }}
            >
              ¿A cuál quieres ir?
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0 40px" }}
            >
              <div style={{ width: 48, height: 1, background: "linear-gradient(to right, transparent, #f2c4c8)" }} />
              <span style={{ color: "#e8a0a8", fontSize: 18 }}>♥</span>
              <div style={{ width: 48, height: 1, background: "linear-gradient(to left, transparent, #f2c4c8)" }} />
            </motion.div>

            {/* Cards */}
            <div style={{
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              justifyContent: "center",
              width: "100%",
            }}>
              {dates.map((d, i) => (
                <DateCard key={d.id} date={d} onSelect={setSelected} index={i} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="confirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}
          >
            <ConfirmScreen date={selected} onBack={() => setSelected(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
