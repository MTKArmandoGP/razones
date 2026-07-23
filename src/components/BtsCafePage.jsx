import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── EmailJS config — mismos valores que el resto del sitio ──────────────────
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

// ─── Tokens — paleta lavanda/morado inspirada en BTS (Army Bomb) ─────────────
const C = {
  purpleDeep:  "#3d2a5c",
  purple:      "#6b4a9c",
  purpleSoft:  "#9370c0",
  lavender:    "#c8a8ec",
  lavenderSoft:"#e6d5fa",
  cream:       "#faf7ff",
  ink:         "#3a2a4d",
  inkSoft:     "#6b5688",
}

const details = [
  { icon: "☕", text: "Un café bonito en CDMX" },
  { icon: "💜", text: "Actividad temática de BTS" },
  { icon: "🚇", text: "Nos movemos juntos, tú marcas el paso" },
  { icon: "📸", text: "Fotitos obligatorias para el recuerdo" },
]

// ─── Purple ambient glow, estilo Army Bomb ────────────────────────────────
function PurpleGlow() {
  return (
    <>
      <div style={{
        position: "absolute", top: "-10%", left: "50%",
        width: 600, height: 600, transform: "translateX(-50%)",
        background: `radial-gradient(circle, ${C.lavender}33 0%, transparent 65%)`,
        animation: "glowPulse 6s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-15%", left: "8%",
        width: 420, height: 420,
        background: `radial-gradient(circle, ${C.purpleSoft}22 0%, transparent 70%)`,
        animation: "glowPulse 7.5s ease-in-out infinite 1s",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", right: "8%",
        width: 380, height: 380,
        background: `radial-gradient(circle, ${C.lavender}22 0%, transparent 70%)`,
        animation: "glowPulse 5s ease-in-out infinite 0.5s",
        pointerEvents: "none",
      }} />
    </>
  )
}

function DetailRow({ icon, text, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}
    >
      <div style={{
        width: 34, height: 34, borderRadius: "50%",
        background: C.lavenderSoft,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16, flexShrink: 0,
      }}>
        {icon}
      </div>
      <p style={{
        fontFamily: "Georgia, serif", fontSize: 14.5, color: C.inkSoft,
        margin: 0, lineHeight: 1.5,
      }}>
        {text}
      </p>
    </motion.div>
  )
}

export default function BtsCafePage({ onBack }) {
  const [answered, setAnswered] = useState(false)

  return (
    <main style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, ${C.cream} 0%, ${C.lavenderSoft} 55%, #f3e8ff 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "56px 20px",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        @keyframes sparkleTwinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 0.9; transform: scale(1.1) rotate(15deg); }
        }
      `}</style>

      <PurpleGlow />

      {/* Estrellitas decorativas de fondo */}
      {["8%","20%","78%","88%","45%"].map((left, i) => (
        <div key={i} style={{
          position: "absolute", left, top: `${10 + i * 16}%`,
          fontSize: 12 + i * 2, color: C.lavender, opacity: 0.35,
          pointerEvents: "none",
          animation: `sparkleTwinkle ${3 + i * 0.6}s ease-in-out infinite`,
        }}>✦</div>
      ))}

      <button
        onClick={onBack}
        style={{
          position: "fixed", top: 20, left: 20, zIndex: 100,
          background: "rgba(255,255,255,0.85)",
          border: `1px solid ${C.lavender}66`,
          borderRadius: "50%",
          width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: C.purple, fontSize: 20,
          backdropFilter: "blur(8px)",
          boxShadow: `0 2px 12px ${C.purpleSoft}33`,
        }}
      >
        ‹
      </button>

      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div
            key="plan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ width: "100%", maxWidth: 480, textAlign: "center", position: "relative", zIndex: 2 }}
          >
            <p style={{
              fontFamily: "Georgia, serif", fontSize: 11, letterSpacing: "0.28em",
              textTransform: "uppercase", color: C.purpleSoft, margin: "0 0 14px", opacity: 0.9,
            }}>
              ♥ plan del domingo ♥
            </p>

            <h1 style={{
              fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(30px, 6.5vw, 46px)", color: C.purpleDeep,
              lineHeight: 1.2, margin: "0 0 10px",
            }}>
              Domingo de café <br />
              <span style={{ color: C.purpleSoft }}>y algo de BTS</span>
            </h1>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "18px 0 28px" }}>
              <div style={{ width: 48, height: 1, background: `linear-gradient(to right, transparent, ${C.lavender})` }} />
              <span style={{ color: C.purpleSoft, fontSize: 16 }}>💜</span>
              <div style={{ width: 48, height: 1, background: `linear-gradient(to left, transparent, ${C.lavender})` }} />
            </div>

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              style={{
                background: "linear-gradient(170deg, #ffffff 0%, #fdfaff 60%, #faf4ff 100%)",
                borderRadius: 26,
                padding: "36px 30px",
                boxShadow: `0 14px 56px ${C.purpleSoft}22, inset 0 1px 0 rgba(255,255,255,0.9)`,
                border: `1px solid ${C.lavender}55`,
                textAlign: "left",
              }}
            >
              <p style={{
                fontFamily: "Georgia, serif", fontSize: 14, color: C.inkSoft,
                lineHeight: 1.85, fontStyle: "italic", margin: "0 0 22px", textAlign: "center",
              }}>
                Se me ocurrió armar un domingo tranquilo por CDMX: un café bonito
                y una actividad de BTS para completar el día. Nada complicado —
                solo tú, yo, y un buen rato juntos.
              </p>

              <div>
                {details.map((d, i) => <DetailRow key={i} {...d} index={i} />)}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0 4px" }}>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${C.lavender}88)` }} />
                <span style={{ color: C.purpleSoft, fontSize: 12 }}>✧</span>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${C.lavender}88)` }} />
              </div>

              <p style={{
                fontFamily: "Georgia, serif", fontSize: 12.5, color: C.purpleSoft,
                fontStyle: "italic", margin: "10px 0 0", textAlign: "center",
              }}>
                tú confirmas y yo lo organizo todo ♡
              </p>
            </motion.div>

            {/* Confirmar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  notificar("💜 Confirmó el plan del domingo — café + actividad BTS en CDMX")
                  setAnswered(true)
                }}
                style={{
                  padding: "14px 36px",
                  borderRadius: 50,
                  border: "none",
                  background: `linear-gradient(135deg, ${C.purpleSoft}, ${C.purple})`,
                  color: "#fff",
                  fontFamily: "Georgia, serif",
                  fontSize: 14,
                  fontStyle: "italic",
                  cursor: "pointer",
                  boxShadow: `0 8px 28px ${C.purpleSoft}55`,
                }}
              >
                sí confirmo, vamos 💜
              </motion.button>
            </motion.div>

            <button
              onClick={onBack}
              style={{
                marginTop: 22,
                background: "none",
                border: "none",
                color: C.purpleSoft,
                fontFamily: "Georgia, serif",
                fontSize: 12.5,
                cursor: "pointer",
                fontStyle: "italic",
                textDecoration: "underline",
              }}
            >
              volver al inicio
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: "center", maxWidth: 400, position: "relative", zIndex: 2 }}
          >
            <div style={{
              width: 78, height: 78, borderRadius: "50%",
              background: `radial-gradient(circle at 35% 30%, ${C.lavender}, ${C.purpleSoft} 70%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 22px",
              boxShadow: `0 6px 24px ${C.purpleSoft}55`,
            }}>
              <span style={{ fontSize: 34 }}>💜</span>
            </div>

            <p style={{
              fontFamily: "Georgia, serif", fontSize: 10, letterSpacing: "0.28em",
              textTransform: "uppercase", color: C.purpleSoft, margin: "0 0 10px",
            }}>
              plan confirmado
            </p>

            <h3 style={{
              fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(22px, 5vw, 30px)", color: C.purpleDeep, lineHeight: 1.3, margin: "0 0 14px",
            }}>
              Domingo: café + BTS ♡
            </h3>

            <p style={{
              fontFamily: "Georgia, serif", fontSize: 14, color: C.inkSoft,
              fontStyle: "italic", lineHeight: 1.8, margin: "0 0 28px",
            }}>
              Ya quedó apartado en mi cabeza. Nomás falta que llegue el domingo
              para ir por ese café y esa actividad juntos ♡
            </p>

            <button
              onClick={onBack}
              style={{
                background: "none", border: "none", color: C.purpleSoft,
                fontFamily: "Georgia, serif", fontSize: 12.5, cursor: "pointer",
                fontStyle: "italic", textDecoration: "underline",
              }}
            >
              volver al inicio
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
