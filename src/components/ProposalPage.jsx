import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"

// Mensajes que se van revelando con el scroll antes de la pregunta
const scrollMessages = [
  {
    type: "eyebrow",
    text: "— Antes de preguntarte algo —",
  },
  {
    type: "message",
    text: "Hay cosas que quiero que sepas.",
    size: "large",
    align: "center",
  },
  {
    type: "letter",
    lines: [
      "No sé exactamente cómo definir lo que siento,",
      "pero sé que cuando estás cerca todo se siente mejor.",
    ],
  },
  {
    type: "aside",
    text: "Y cuando no estás, pienso en ti de todas formas.",
    emoji: "♥",
  },
  {
    type: "letter",
    lines: [
      "Me gustas de una forma que no esperaba.",
      "Cada conversación contigo me importa.",
      "Cada momento que pasamos juntos lo recuerdo.",
    ],
  },
  {
    type: "aside",
    text: "Quiero seguir conociéndote. Todo de ti.",
    emoji: "✦",
  },
  {
    type: "letter",
    lines: [
      "No te pido nada que no quieras dar.",
      "Solo quiero que sepas lo que significas para mí.",
    ],
  },
  {
    type: "divider",
  },
  {
    type: "question",
    text: "¿Quieres ser mi novia?",
  },
]

function RevealBlock({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function EyebrowBlock({ text }) {
  return (
    <RevealBlock>
      <p style={{
        fontFamily: "'Georgia', serif",
        fontSize: 12,
        letterSpacing: "0.22em",
        color: "#c0606e",
        textTransform: "uppercase",
        textAlign: "center",
        margin: "0 0 8px",
        opacity: 0.75,
      }}>
        {text}
      </p>
    </RevealBlock>
  )
}

function MessageBlock({ text, size, align }) {
  return (
    <RevealBlock>
      <p style={{
        fontFamily: "'Georgia', serif",
        fontSize: size === "large" ? "clamp(26px, 5vw, 40px)" : "clamp(18px, 3vw, 24px)",
        fontWeight: 300,
        color: "#5b2d2d",
        textAlign: align || "left",
        lineHeight: 1.3,
        margin: 0,
        fontStyle: "italic",
      }}>
        {text}
      </p>
    </RevealBlock>
  )
}

function LetterBlock({ lines }) {
  return (
    <RevealBlock>
      <div style={{
        background: "linear-gradient(160deg, #fffaf9, #fff5f7)",
        borderRadius: 20,
        padding: "32px 36px",
        border: "1px solid #fce8ec",
        boxShadow: "0 8px 40px rgba(192,96,110,0.10)",
        position: "relative",
      }}>
        {/* Ruled lines top */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
          {[1, 0.4].map((op, i) => (
            <div key={i} style={{ height: 1, background: `rgba(242,196,200,${op})`, borderRadius: 1 }} />
          ))}
        </div>

        {lines.map((line, i) => (
          <p key={i} style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(14px, 2.2vw, 16px)",
            color: "#5b2d2d",
            fontStyle: "italic",
            lineHeight: 1.9,
            margin: i < lines.length - 1 ? "0 0 4px" : 0,
            textAlign: "center",
          }}>
            {line}
          </p>
        ))}

        {/* Ruled lines bottom */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 20 }}>
          {[0.4, 1].map((op, i) => (
            <div key={i} style={{ height: 1, background: `rgba(242,196,200,${op})`, borderRadius: 1 }} />
          ))}
        </div>

        {/* Corner sparkle */}
        <span style={{ position: "absolute", top: 14, right: 18, fontSize: 10, color: "#f9c4d0", opacity: 0.6 }}>✦</span>
        <span style={{ position: "absolute", bottom: 14, left: 18, fontSize: 8, color: "#f9c4d0", opacity: 0.45 }}>✦</span>
      </div>
    </RevealBlock>
  )
}

function AsideBlock({ text, emoji }) {
  return (
    <RevealBlock>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "0 8px",
      }}>
        <div style={{ width: 2, alignSelf: "stretch", background: "linear-gradient(to bottom, transparent, #f2c4c8, transparent)", borderRadius: 2, flexShrink: 0 }} />
        <p style={{
          fontFamily: "'Georgia', serif",
          fontSize: "clamp(15px, 2.5vw, 18px)",
          fontStyle: "italic",
          color: "#9b6070",
          lineHeight: 1.7,
          margin: 0,
        }}>
          {text} <span style={{ color: "#e8a0a8" }}>{emoji}</span>
        </p>
      </div>
    </RevealBlock>
  )
}

function DividerBlock() {
  return (
    <RevealBlock>
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 0" }}>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #f2c4c8)" }} />
        <span style={{ color: "#e8a0a8", fontSize: 20 }}>♥</span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #f2c4c8)" }} />
      </div>
    </RevealBlock>
  )
}

function QuestionBlock({ onYes, onNotReady, answer, noCount, noMessages, onNo }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" })
  const [showProposal, setShowProposal] = useState(false)

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setShowProposal(true), 400)
      return () => clearTimeout(t)
    }
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={{
        background: "linear-gradient(160deg, #fffaf9, #fff5f7, #fef0f3)",
        borderRadius: 28,
        padding: "44px 40px 40px",
        border: "1px solid #fce8ec",
        boxShadow: "0 16px 64px rgba(192,96,110,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
        textAlign: "center",
        position: "relative",
      }}>
        {/* Corner sparkles */}
        {[
          { top: 16, left: 20, size: 12, op: 0.6 },
          { top: 18, right: 22, size: 9, op: 0.4 },
          { bottom: 20, left: 26, size: 10, op: 0.45 },
          { bottom: 18, right: 24, size: 13, op: 0.5 },
        ].map((s, i) => (
          <span key={i} style={{ position: "absolute", fontSize: s.size, color: "#f9c4d0", opacity: s.op, top: s.top, bottom: s.bottom, left: s.left, right: s.right }}>✦</span>
        ))}

        <AnimatePresence mode="wait">
          {!showProposal ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p style={{ color: "#e8a0a8", fontSize: 24, margin: 0 }}>♥</p>
            </motion.div>
          ) : answer === null ? (
            <motion.div key="question" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              {/* Question heading */}
              <motion.h2 style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(32px, 6vw, 52px)",
                fontWeight: 300,
                color: "#5b2d2d",
                lineHeight: 1.2,
                margin: "0 0 12px",
              }}>
                ¿Quieres ser
                <br />
                <span style={{ fontStyle: "italic", color: "#c0606e" }}>mi novia?</span>
              </motion.h2>

              <p style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(13px, 2vw, 15px)",
                fontStyle: "italic",
                color: "#9b6070",
                margin: "0 0 32px",
                lineHeight: 1.7,
              }}>
                Sin prisa, sin presión. Solo con ganas de intentarlo contigo. ♡
              </p>

              {/* Buttons */}
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onYes}
                  style={{
                    padding: "15px 40px",
                    borderRadius: 50,
                    border: "none",
                    background: "linear-gradient(135deg, #d4607a, #c0606e)",
                    color: "#fff",
                    fontFamily: "'Georgia', serif",
                    fontSize: 17,
                    cursor: "pointer",
                    boxShadow: "0 8px 28px rgba(192,96,110,0.4)",
                    letterSpacing: "0.02em",
                  }}
                >
                  Sí ♥
                </motion.button>

                <motion.button
                  onClick={onNo}
                  animate={{ scale: Math.max(0.6, 1 - noCount * 0.1) }}
                  style={{
                    padding: "15px 40px",
                    borderRadius: 50,
                    border: "1.5px solid #f2c4c8",
                    background: "transparent",
                    color: "#c0606e",
                    fontFamily: "'Georgia', serif",
                    fontSize: Math.max(12, 17 - noCount),
                    cursor: "pointer",
                    transition: "font-size 0.3s",
                    letterSpacing: "0.02em",
                  }}
                >
                  {noCount === 0 ? "No" : noMessages[noCount - 1]}
                </motion.button>
              </div>

              {/* "No estoy lista" link below */}
              <div style={{ marginTop: 24 }}>
                <button
                  onClick={onNotReady}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Georgia', serif",
                    fontSize: 13,
                    color: "#b08090",
                    fontStyle: "italic",
                    textDecoration: "underline",
                    textDecorationColor: "rgba(176,128,144,0.4)",
                    textUnderlineOffset: "3px",
                    letterSpacing: "0.03em",
                    padding: 0,
                  }}
                >
                  No estoy lista todavía
                </button>
              </div>
            </motion.div>
          ) : answer === "yes" ? (
            <motion.div key="yes" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 280, damping: 22 }}>
              <p style={{ fontSize: 48, margin: "0 0 16px" }}>🎉</p>
              <p style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(20px, 4vw, 26px)",
                color: "#5b2d2d",
                fontWeight: 300,
                margin: "0 0 12px",
              }}>
                ¡Me alegra muchísimo!
              </p>
              <p style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(14px, 2.5vw, 16px)",
                color: "#9b6070",
                fontStyle: "italic",
                lineHeight: 1.85,
                margin: 0,
              }}>
                Prometo seguir siendo el mismo intenso
                <br />
                que te escribe cositas lindas. ♡
              </p>
            </motion.div>
          ) : (
            <motion.div key="no" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(15px, 3vw, 18px)",
                color: "#9b6070",
                fontStyle: "italic",
                lineHeight: 1.85,
                margin: 0,
              }}>
                Está bien. Lo entiendo. 🥺
                <br />
                Pero las razones siguen siendo reales. ♡
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function GatePage({ onContinue, onBack }) {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 800)
    return () => clearTimeout(t)
  }, [])

  const lockItems = [
    { delay: 0.15, text: "Solo si estás lista" },
    { delay: 0.3,  text: "Sin ninguna prisa" },
    { delay: 0.45, text: "Con todo el respeto" },
  ]

  return (
    <section style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fff0f3 0%, #fde8ee 60%, #fdf2f4 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,200,215,0.45) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Decorative background sparkles */}
      {[
        { top: "12%", left: "8%",  size: 11, op: 0.18, dur: 3.1 },
        { top: "18%", right: "10%",size: 8,  op: 0.13, dur: 4.2 },
        { top: "75%", left: "6%",  size: 14, op: 0.15, dur: 3.7 },
        { top: "80%", right: "9%", size: 10, op: 0.16, dur: 5.0 },
        { top: "45%", left: "3%",  size: 7,  op: 0.10, dur: 2.8 },
        { top: "38%", right: "5%", size: 9,  op: 0.12, dur: 4.5 },
      ].map((h, i) => (
        <div key={i} style={{
          position: "absolute", top: h.top, left: h.left, right: h.right,
          fontSize: h.size, color: "#c0606e", opacity: h.op, pointerEvents: "none",
          animation: `floatBg ${h.dur}s ease-in-out infinite alternate`,
        }}>♥</div>
      ))}

      <style>{`
        @keyframes floatBg {
          0%   { transform: translateY(0) rotate(-8deg); }
          100% { transform: translateY(-10px) rotate(8deg); }
        }
        @keyframes lockPulse {
          0%, 100% { transform: scale(1);    filter: drop-shadow(0 0 8px rgba(192,96,110,0.3)); }
          50%       { transform: scale(1.08); filter: drop-shadow(0 0 18px rgba(192,96,110,0.55)); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          position: "fixed", top: 20, left: 20, zIndex: 100,
          background: "rgba(255,255,255,0.8)", border: "1px solid #fce8ec",
          borderRadius: "50%", width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#c0606e", fontSize: 20,
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 12px rgba(192,96,110,0.15)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >‹</button>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative", zIndex: 10,
          maxWidth: 480, width: "100%",
          background: "linear-gradient(170deg, #fffaf9 0%, #fff5f7 60%, #fef0f3 100%)",
          borderRadius: 32,
          padding: "52px 44px 48px",
          boxShadow: "0 20px 80px rgba(192,96,110,0.18), 0 4px 20px rgba(192,96,110,0.08), inset 0 1px 0 rgba(255,255,255,0.95)",
          border: "1px solid #fce8ec",
          textAlign: "center",
        }}
      >
        {/* Corner sparkles */}
        {[
          { top: 18, left: 22,  size: 13, op: 0.55 },
          { top: 20, right: 24, size: 9,  op: 0.35 },
          { bottom: 22, left: 28, size: 10, op: 0.40 },
          { bottom: 20, right: 26, size: 14, op: 0.50 },
        ].map((s, i) => (
          <span key={i} style={{ position: "absolute", fontSize: s.size, color: "#f9c4d0", opacity: s.op, top: s.top, bottom: s.bottom, left: s.left, right: s.right }}>✦</span>
        ))}

        {/* Lock icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 18 }}
          style={{
            margin: "0 auto 28px",
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg, #fce8ec, #f9d0d8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1.5px solid rgba(242,196,200,0.8)",
            boxShadow: "0 8px 32px rgba(192,96,110,0.2)",
            animation: pulse ? "lockPulse 3s ease-in-out infinite" : "none",
          }}
        >
          <span style={{ fontSize: 30 }}>🔓</span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 11, letterSpacing: "0.24em",
            color: "#c0606e", textTransform: "uppercase",
            margin: "0 0 18px", opacity: 0.7,
          }}
        >
          — nueva sección desbloqueada —
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.75 }}
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(26px, 5vw, 36px)",
            fontWeight: 300, color: "#5b2d2d",
            lineHeight: 1.25, margin: "0 0 20px",
          }}
        >
          Hay algo que quiero
          <br />
          <span style={{ fontStyle: "italic", color: "#c0606e" }}>decirte.</span>
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 0 24px" }}
        >
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #f2c4c8)" }} />
          <span style={{ color: "#e8a0a8", fontSize: 16 }}>♥</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #f2c4c8)" }} />
        </motion.div>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(14px, 2.2vw, 15.5px)",
            fontStyle: "italic", color: "#7a4050",
            lineHeight: 1.95, margin: "0 0 28px",
          }}
        >
          Lo que sigue no es urgente,
          <br />
          no tiene fecha límite
          <br />
          y no te exige nada.
          <br /><br />
          Solo te pido que lo leas
          <br />
          cuando de verdad estés lista. ♡
        </motion.p>

        {/* Condition pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", margin: "0 0 36px" }}
        >
          {lockItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.delay + 0.9, duration: 0.5 }}
              style={{
                padding: "6px 14px", borderRadius: 50,
                background: "rgba(242,196,200,0.25)",
                border: "1px solid rgba(242,196,200,0.6)",
                fontFamily: "'Georgia', serif",
                fontSize: 12, fontStyle: "italic",
                color: "#9b6070", letterSpacing: "0.03em",
              }}
            >
              {item.text}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(192,96,110,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onContinue}
            style={{
              padding: "16px 48px",
              borderRadius: 50, border: "none",
              background: "linear-gradient(135deg, #d4607a, #c0606e)",
              color: "#fff",
              fontFamily: "'Georgia', serif",
              fontSize: 16, letterSpacing: "0.04em",
              cursor: "pointer",
              boxShadow: "0 8px 28px rgba(192,96,110,0.38)",
              backgroundSize: "200% auto",
              transition: "background-position 0.4s",
              display: "block", width: "100%",
            }}
          >
            Estoy lista, quiero leerlo ♡
          </motion.button>
        </motion.div>

        {/* Not ready link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.55, duration: 0.5 }}
          style={{ marginTop: 18 }}
        >
          <button
            onClick={onBack}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Georgia', serif", fontSize: 13,
              color: "#b08090", fontStyle: "italic",
              textDecoration: "underline",
              textDecorationColor: "rgba(176,128,144,0.35)",
              textUnderlineOffset: "3px", letterSpacing: "0.03em", padding: 0,
            }}
          >
            Todavía no, regresar
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── EmailJS config — reemplaza con tus valores ───────────────────────────────
const EMAILJS_SERVICE_ID  = "service_k0e0b2g"   // ej: "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_f25rwdw"  // ej: "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "uRrkgTs3tVMS_1Jmp"   // ej: "aBcDeFgHiJkLmNoP"
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

function ProposalPage({ onBack }) {
  const [phase, setPhase] = useState("gate") // "gate" | "messages"
  const [answer, setAnswer] = useState(null)
  const [noCount, setNoCount] = useState(0)
  const [confetti, setConfetti] = useState([])

  const noMessages = [
    "¿Segura? 🥺",
    "Piénsalo bien...",
    "Este botón se está quedando pequeño 👀",
    "Últimaaa oportunidad...",
    "Está bien, lo entiendo 😢",
  ]

  const handleYes = () => {
    setAnswer("yes")
    notificar("✅ Dijo que SÍ 🎉")
    const hearts = Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 14 + Math.random() * 22,
      delay: Math.random() * 0.8,
      duration: 1.8 + Math.random() * 1.2,
      color: ["#f48fb1", "#e91e8c", "#f9a8c9", "#fce4ec", "#d81b60", "#ff80ab"][Math.floor(Math.random() * 6)],
    }))
    setConfetti(hearts)
  }

  const handleNo = () => {
    if (noCount < noMessages.length - 1) {
      setNoCount((c) => c + 1)
    } else {
      setAnswer("no_final")
      notificar("💔 Dijo que no (después de varios intentos)")
    }
  }

  const handleNotReady = () => {
    notificar("⏳ Aún no está lista — regresó sin responder")
    onBack()
  }

  if (phase === "gate") {
    return (
      <AnimatePresence mode="wait">
        <GatePage key="gate" onContinue={() => setPhase("messages")} onBack={() => {
          notificar("🔒 Vio la pantalla de la propuesta pero regresó sin continuar")
          onBack()
        }} />
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence mode="wait">
    <motion.section
      key="messages"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fff0f3 0%, #fde8ee 50%, #fdf2f4 100%)",
      position: "relative",
    }}>
      {/* Floating background glow */}
      <div style={{
        position: "fixed",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700, height: 700,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,200,215,0.35) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          position: "fixed",
          top: 20, left: 20,
          zIndex: 100,
          background: "rgba(255,255,255,0.8)",
          border: "1px solid #fce8ec",
          borderRadius: "50%",
          width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          color: "#c0606e",
          fontSize: 20,
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 12px rgba(192,96,110,0.15)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        ‹
      </button>

      {/* Confetti hearts */}
      {confetti.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: "100vh", x: `${h.x}vw`, opacity: 1, scale: 0.5 }}
          animate={{ y: "-20vh", opacity: 0, scale: 1.2, rotate: 360 }}
          transition={{ duration: h.duration, delay: h.delay, ease: "easeOut" }}
          style={{ position: "fixed", bottom: 0, fontSize: h.size, color: h.color, pointerEvents: "none", zIndex: 200 }}
        >
          ♥
        </motion.div>
      ))}

      {/* Scroll content */}
      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 540,
        margin: "0 auto",
        padding: "120px 24px 100px",
        display: "flex",
        flexDirection: "column",
        gap: 48,
      }}>
        {/* Eyebrow */}
        <RevealBlock>
          <div style={{ textAlign: "center" }}>
            <p style={{
              fontFamily: "'Georgia', serif",
              fontSize: 12,
              letterSpacing: "0.22em",
              color: "#c0606e",
              textTransform: "uppercase",
              margin: "0 0 8px",
              opacity: 0.75,
            }}>
              ♥ una pregunta importante ♥
            </p>
          </div>
        </RevealBlock>

        {/* Opening large statement */}
        <RevealBlock delay={0.1}>
          <p style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(28px, 6vw, 44px)",
            fontWeight: 300,
            color: "#5b2d2d",
            textAlign: "center",
            lineHeight: 1.25,
            margin: 0,
            fontStyle: "italic",
          }}>
            Antes de responder,
            <br />
            quiero que sepas algo.
          </p>
        </RevealBlock>

        {/* Message 1 */}
        <LetterBlock lines={[
          "Sé que cargas cosas que no son fáciles de soltar.",
          "Que tu corazón ha tenido que aprender a cuidarse solo.",
          "Y lo entiendo. De verdad.",
        ]} />

        {/* Aside 1 */}
        <AsideBlock text="No estoy aquí para ignorar eso. Estoy aquí porque me importas tú, con todo lo que traes." emoji="♥" />

        {/* Message 2 */}
        <LetterBlock lines={[
          "Sé que tienes miedo de lastimar.",
          "Que prefieres quedarte callada a arriesgarte a equivocarte.",
          "Eso me dice más de ti que mil palabras.",
        ]} />

        {/* Aside 2 */}
        <AsideBlock text="Que cuides tanto los sentimientos ajenos como los tuyos me parece algo muy bonito." emoji="✦" />

        {/* Message 3 */}
        <LetterBlock lines={[
          "No te pido que estés lista para todo.",
          "No te pido que bajes la guardia de un día para otro.",
          "Solo te pido que me dejes estar cerca mientras lo haces, a tu ritmo.",
        ]} />

        {/* Aside 3 */}
        <AsideBlock text="No tengo prisa. Lo que siento por ti no depende del tiempo que tardes." emoji="♥" />

        {/* Message 4 */}
        <LetterBlock lines={[
          "Y sí, ya nos besamos.",
          "Y eso para mí no fue cualquier cosa.",
          "Fue una señal de que hay algo aquí que vale la pena.",
        ]} />

        {/* Aside 4 */}
        <AsideBlock text="No necesito que me digas que me quieres hoy. Solo necesito saber que quieres intentarlo." emoji="✦" />

        {/* Message 5 */}
        <LetterBlock lines={[
          "Prometo no presionarte.",
          "Prometo respetar tus tiempos.",
          "Prometo que si algún día sientes que es demasiado, me lo puedes decir.",
        ]} />

        {/* Aside 5 */}
        <AsideBlock text="No quiero que estés conmigo por compromiso. Quiero que estés porque quieras." emoji="♥" />

        {/* Message 6 */}
        <LetterBlock lines={[
          "Lo único que sé con certeza",
          "es que me gustas demasiado como para no decírtelo.",
          "Y que quiero darte razones, todos los días, para sentirte segura.",
        ]} />

        {/* Divider */}
        <RevealBlock>
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 0" }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #f2c4c8)" }} />
            <span style={{ color: "#e8a0a8", fontSize: 20 }}>♥</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #f2c4c8)" }} />
          </div>
        </RevealBlock>

        {/* THE QUESTION */}
        <QuestionBlock
          answer={answer}
          noCount={noCount}
          noMessages={noMessages}
          onYes={handleYes}
          onNo={handleNo}
          onNotReady={handleNotReady}
        />

        {/* Bottom padding spacer */}
        <div style={{ height: 40 }} />
      </div>
    </motion.section>
    </AnimatePresence>
  )
}

export default ProposalPage
