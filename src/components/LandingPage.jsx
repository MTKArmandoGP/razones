import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

// CAMBIA ESTA FECHA
const TARGET = new Date("2026-05-30T00:00:00")

function getTimeLeft() {
  const diff = TARGET - new Date()
  if (diff <= 0) return null
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return { d, h, m, s }
}

function pad(n) {
  return String(n).padStart(2, "0")
}

function LandingPage({ onGoCalendar, onGoProposal, onGoDate }) {
  const [time, setTime] = useState(getTimeLeft())
  const unlocked = time === null

  useEffect(() => {
    if (unlocked) return
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [unlocked])

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #fff0f3 0%, #fde8ee 50%, #fdf2f4 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Corazones fondo */}
      {[
        { top: "6%", left: "5%", size: 22, opacity: 0.13, delay: 0 },
        { top: "12%", right: "8%", size: 14, opacity: 0.1, delay: 0.3 },
        { top: "75%", left: "4%", size: 26, opacity: 0.09, delay: 0.6 },
        { top: "82%", right: "6%", size: 18, opacity: 0.11, delay: 0.9 },
        { top: "45%", left: "2%", size: 11, opacity: 0.07, delay: 1.2 },
        { top: "55%", right: "3%", size: 15, opacity: 0.09, delay: 1.5 },
        { top: "30%", left: "88%", size: 10, opacity: 0.06, delay: 0.4 },
        { top: "60%", left: "92%", size: 20, opacity: 0.08, delay: 0.8 },
      ].map((h, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: h.opacity, scale: 1 }}
          transition={{ delay: h.delay + 0.5, duration: 1 }}
          style={{
            position: "absolute",
            top: h.top,
            left: h.left,
            right: h.right,
            fontSize: h.size,
            color: "#d4607a",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,210,220,0.35) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Contenido */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 520 }}>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 12,
            letterSpacing: "0.22em",
            color: "#c0606e",
            textTransform: "uppercase",
            margin: "0 0 20px",
          }}
        >
          ♥ Un sitio especialmente para ti ♥
        </motion.p>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(44px, 9vw, 82px)",
            fontWeight: 300,
            color: "#5b2d2d",
            lineHeight: 1.15,
            margin: "0 0 12px",
          }}
        >
          Hola,<br />
          <span style={{ fontStyle: "italic", color: "#c0606e" }}>esto es para ti</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, margin: "22px 0" }}
        >
          <div style={{ width: 56, height: 1, background: "linear-gradient(to right, transparent, #f2c4c8)" }} />
          <span style={{ color: "#e8a0a8", fontSize: 20 }}>♥</span>
          <div style={{ width: 56, height: 1, background: "linear-gradient(to left, transparent, #f2c4c8)" }} />
        </motion.div>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(15px, 2.5vw, 18px)",
            color: "#9b6070",
            lineHeight: 1.8,
            margin: "0 0 52px",
            fontStyle: "italic",
          }}
        >
          Elige una opción y verás <br /> una pequeña sorpresa
        </motion.p>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center", width: "100%" }}
        >

          {/* ── CARD 1 — Razones ── */}
          <button
            onClick={onGoCalendar}
            style={{
              width: "100%",
              maxWidth: 400,
              padding: "26px 32px",
              borderRadius: 24,
              border: "1.5px solid #f2c4c8",
              background: "linear-gradient(135deg, #fffaf9 0%, #fff5f7 60%, #fef0f3 100%)",
              cursor: "pointer",
              textAlign: "left",
              boxShadow: "0 8px 32px rgba(192,96,110,0.12)",
              transition: "transform 0.22s ease, box-shadow 0.22s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(192,96,110,0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(192,96,110,0.12)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "linear-gradient(135deg, #fce8ec, #f9d0d8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
              }}>
                💌
              </div>
              <div>
                <p style={{ fontFamily: "'Georgia', serif", fontSize: 18, color: "#5b2d2d", margin: "0 0 4px" }}>
                  Razones por las que me gustas
                </p>
                <p style={{ fontFamily: "'Georgia', serif", fontSize: 13, color: "#b08090", margin: 0, fontStyle: "italic" }}>
                  24 sobres con algo especial ♡
                </p>
              </div>
            </div>
          </button>

          {/* ── CARD 2 — Pregunta rápida (Backrooms) ── */}
          <button
            onClick={onGoDate}
            style={{
              width: "100%",
              maxWidth: 400,
              padding: "26px 32px",
              borderRadius: 24,
              border: "1.5px solid rgba(255,230,140,0.35)",
              background: "linear-gradient(135deg, #1a1808 0%, #1f1e0a 60%, #18160a 100%)",
              cursor: "pointer",
              textAlign: "left",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              transition: "transform 0.22s ease, box-shadow 0.22s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.4), 0 0 32px rgba(255,220,80,0.12)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "rgba(255,230,140,0.1)",
                border: "1px solid rgba(255,230,140,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
              }}>
                ❓
              </div>
              <div>
                <p style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 17, color: "#ffe68a",
                  margin: "0 0 4px", letterSpacing: "0.04em",
                }}>
                  Pregunta rápida...
                </p>
              </div>
            </div>
            {/* Scanlines */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: 24,
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,230,140,0.02) 3px, rgba(255,230,140,0.02) 4px)",
              pointerEvents: "none",
            }} />
            {/* Top glow edge */}
            <div style={{
              position: "absolute", top: 0, left: "20%", right: "20%", height: 1,
              background: "linear-gradient(to right, transparent, rgba(255,230,140,0.3), transparent)",
              pointerEvents: "none",
            }} />
          </button>

          {/* ── CARD 3 — Propuesta (bloqueada con contador) ── */}
          <div
            onClick={() => { if (unlocked) onGoProposal() }}
            style={{
              width: "100%",
              maxWidth: 400,
              padding: "22px 28px",
              borderRadius: 24,
              border: unlocked ? "1.5px solid transparent" : "1.5px solid #f2c4c8",
              background: unlocked
                ? "linear-gradient(135deg, #d4607a, #c0606e)"
                : "linear-gradient(135deg, #fce8ec 0%, #f9e0e5 100%)",
              cursor: unlocked ? "pointer" : "not-allowed",
              textAlign: "center",
              boxShadow: unlocked
                ? "0 8px 32px rgba(192,96,110,0.35)"
                : "0 4px 18px rgba(192,96,110,0.08)",
              transition: "transform 0.22s ease, box-shadow 0.22s ease, background 0.5s ease",
              position: "relative",
              overflow: "hidden",
              userSelect: "none",
              opacity: unlocked ? 1 : 0.9,
            }}
            onMouseEnter={(e) => {
              if (!unlocked) return
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(192,96,110,0.5)"
            }}
            onMouseLeave={(e) => {
              if (!unlocked) return
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(192,96,110,0.35)"
            }}
          >
            <AnimatePresence mode="wait">
              {unlocked ? (
                /* DESBLOQUEADO */
                <motion.div
                  key="unlocked"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "flex-start", textAlign: "left" }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "rgba(255,255,255,0.22)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, flexShrink: 0,
                  }}>
                    💌
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Georgia', serif", fontSize: 18, color: "#fff", margin: "0 0 4px" }}>
                      Algo que quiero preguntarte
                    </p>
                    <p style={{ fontFamily: "'Georgia', serif", fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0, fontStyle: "italic" }}>
                      ya es momento… ♡
                    </p>
                  </div>
                </motion.div>
              ) : (
                /* BLOQUEADO — contador intacto */
                <motion.div
                  key="locked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
                >
                  {/* Ícono candado */}
                  <div style={{ fontSize: 28, lineHeight: 1, color: "#c0606e", opacity: 0.6 }}>
                    🔒
                  </div>

                  {/* Contador */}
                  {time && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {[
                        { val: pad(time.d), label: "d" },
                        { val: pad(time.h), label: "h" },
                        { val: pad(time.m), label: "m" },
                        { val: pad(time.s), label: "s" },
                      ].map(({ val, label }, i) => (
                        <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <div style={{
                            background: "rgba(192,96,110,0.12)",
                            borderRadius: 10,
                            padding: "4px 10px",
                            minWidth: 38,
                            textAlign: "center",
                          }}>
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={val}
                                initial={{ y: -8, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 8, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                  fontFamily: "'Georgia', serif",
                                  fontSize: 20,
                                  color: "#7a2b35",
                                  fontWeight: 400,
                                  display: "block",
                                  lineHeight: 1.2,
                                }}
                              >
                                {val}
                              </motion.span>
                            </AnimatePresence>
                            <span style={{
                              fontFamily: "'Georgia', serif",
                              fontSize: 9,
                              color: "#b08090",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                            }}>
                              {label}
                            </span>
                          </div>
                          {i < 3 && (
                            <span style={{ color: "#e8a0a8", fontSize: 16, fontWeight: 300, lineHeight: 1, marginTop: -8 }}>
                              :
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Texto */}
                  <p style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: 12,
                    color: "#b08090",
                    fontStyle: "italic",
                    margin: 0,
                    letterSpacing: "0.04em",
                  }}>
                    se desbloqueará el sábado 30 ♡
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 13,
            color: "#b08090",
            marginTop: 40,
            fontStyle: "italic",
          }}
        >
          Hecho con mucho cariño, solo para ti. ♡
        </motion.p>
      </div>
    </section>
  )
}

export default LandingPage
