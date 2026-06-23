import { useState } from "react"
import { motion } from "framer-motion"

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
    // silencioso
  }
}

const paragraphs = [
  "Antes que nada quiero que sepas algo: lo que pasó el viernes pasado no cambia lo que siento por ti, ni va a cambiarlo. No quiero que eso se quede pesando entre nosotros, ni que sientas que tienes que cargarlo sola.",
  "Yo voy contigo hasta el final. No es una frase bonita nada más, es lo que de verdad pienso cuando pienso en nosotros. No estoy aquí de pasada ni esperando a ver qué pasa: estoy aquí decidido.",
  "Entiendo que necesitas sanar. Entiendo que tu carrera, te exige muchísimo, y que ahora mismo necesitas priorizarte a ti antes que nada. No solo lo entiendo, lo respeto, y quiero ser parte de lo que te ayude a lograrlo, no un obstáculo más.",
  "Pero quiero pedirte una sola cosa: déjame estar a tu lado mientras todo eso pasa. No para presionarte, no para pedirte más de lo que puedes dar ahora, sino para acompañarte. Déjame apoyarte aunque sea desde donde tú me dejes estar.",
  "Que estemos construyendo algo juntos no significa que lo demás en tu vida valga menos. Tu carrera sigue siendo lo más importante, tu proceso de sanar sigue siendo prioridad, tú sigues siendo tú primero. Yo lo entiendo y este amoor tan grande que te tengo hacia ti hace que de verdad no me quiera rendir.",
  "Lo siento mucho si te presioné demasiado antes, de verdad que siento que algo cambió y siento que fue poir mi culpa, creeme que no lo hice con intensiones malas, solo fue un comentario de algo que sentí, te agradezco mucho como te lo he dicho que me hagas un pequeño espacio en tu vida, de verdaad que te lo agradezco infinitamente.",
  "No quiero que esto termine por algo tan pequeño, se que todo esto se puede arreglar y trabajar, no quieroo quedar en el casi algo, me gustaría ver lo que podemos a llegar a lograr juntos, por que eres una persona demasiado espectacular, brillas demasiado, me encantas de verdad, todas tus cualidades, no lo dudes.",
  "Y si tengo que esperar esperaré como te lo he comentado, por que yo se que esto puede llegar a ser algo maravilloso, yo se que esto no es para solo quedarnos con la duda de '¿Qué pudó ser?' o '¿Cómo habría sido?', yo por ti voy a pelear...",
  "Lo único que quiero es que sepas, sin ninguna duda, que aquí sigo, que aquí me voy a quedar hasta que tu me digas lo contrario, y que lo que sea que necesites de mí — tiempo, espacio, paciencia, o simplemente estar cerca — lo tienes.",
]

export default function FeelingsPage({ onBack }) {
  const [sent, setSent] = useState(false)

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #fff0f3 0%, #fde8ee 50%, #fdf2f4 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "72px 20px 56px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background hearts */}
      {[
        { top: "5%", left: "6%", size: 20, op: 0.1 },
        { top: "10%", right: "8%", size: 13, op: 0.08 },
        { top: "85%", left: "5%", size: 22, op: 0.07 },
        { top: "90%", right: "7%", size: 16, op: 0.09 },
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

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ width: "100%", maxWidth: 600, textAlign: "center", position: "relative", zIndex: 2 }}
      >
        <p style={{
          fontFamily: "'Georgia', serif",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "#c0606e",
          textTransform: "uppercase",
          margin: "0 0 14px",
          opacity: 0.8,
        }}>
          ♥ algo que necesitaba decirte ♥
        </p>

        <h1 style={{
          fontFamily: "'Georgia', serif",
          fontSize: "clamp(28px, 6vw, 46px)",
          fontWeight: 300,
          color: "#5b2d2d",
          lineHeight: 1.25,
          margin: "0 0 18px",
        }}>
          Lo que siento <span style={{ fontStyle: "italic", color: "#c0606e" }}>por ti</span>
        </h1>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "0 0 40px" }}>
          <div style={{ width: 48, height: 1, background: "linear-gradient(to right, transparent, #f2c4c8)" }} />
          <span style={{ color: "#e8a0a8", fontSize: 18 }}>♥</span>
          <div style={{ width: 48, height: 1, background: "linear-gradient(to left, transparent, #f2c4c8)" }} />
        </div>
      </motion.div>

      {/* Letter card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          width: "100%",
          maxWidth: 620,
          background: "linear-gradient(170deg, #fffaf9 0%, #fff5f7 60%, #fef0f3 100%)",
          borderRadius: 28,
          padding: "48px 38px 40px",
          boxShadow: "0 12px 64px rgba(192,96,110,0.13), 0 2px 16px rgba(192,96,110,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
          border: "1px solid #fce8ec",
          position: "relative",
          zIndex: 2,
        }}
      >
        <span style={{ position: "absolute", top: 18, left: 22, fontSize: 12, color: "#f9c4d0", opacity: 0.65 }}>✦</span>
        <span style={{ position: "absolute", top: 20, right: 24, fontSize: 9, color: "#f9c4d0", opacity: 0.45 }}>✦</span>
        <span style={{ position: "absolute", bottom: 22, left: 30, fontSize: 10, color: "#f9c4d0", opacity: 0.45 }}>✦</span>
        <span style={{ position: "absolute", bottom: 20, right: 26, fontSize: 13, color: "#f9c4d0", opacity: 0.55 }}>✦</span>

        <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 28 }}>
          {[1, 0.5].map((op, i) => (
            <div key={i} style={{ height: 1, background: `rgba(242,196,200,${op})`, borderRadius: 1 }} />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, textAlign: "left" }}>
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(14.5px, 2vw, 16px)",
                lineHeight: 1.95,
                color: i % 2 === 0 ? "#5b2d2d" : "#6b3540",
                fontStyle: "italic",
                margin: 0,
              }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 30 }}>
          {[0.5, 1].map((op, i) => (
            <div key={i} style={{ height: 1, background: `rgba(242,196,200,${op})`, borderRadius: 1 }} />
          ))}
        </div>

        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ width: 32, height: 1, background: "#f2c4c8" }} />
          <p style={{
            fontFamily: "'Georgia', serif",
            fontSize: 13,
            color: "#c0606e",
            letterSpacing: "0.12em",
            margin: 0,
            fontStyle: "italic",
          }}>
            con todo mi cariño, hoy y siempre
          </p>
          <span style={{ color: "#e8a0a8", fontSize: 16 }}>♡</span>
        </div>
      </motion.div>

      {/* Respuesta opcional */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        style={{ marginTop: 36, textAlign: "center", position: "relative", zIndex: 2 }}
      >
        {!sent ? (
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              notificar("💌 Leyó la carta de 'Lo que siento por ti'")
              setSent(true)
            }}
            style={{
              padding: "14px 36px",
              borderRadius: 50,
              border: "none",
              background: "linear-gradient(135deg, #d4607a, #c0606e)",
              color: "#fff",
              fontFamily: "'Georgia', serif",
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 8px 28px rgba(192,96,110,0.3)",
            }}
          >
            Ya la leí ♡
          </motion.button>
        ) : (
          <p style={{
            fontFamily: "'Georgia', serif",
            fontSize: 14,
            color: "#9b6070",
            fontStyle: "italic",
          }}>
            gracias por leerme hasta aquí ♡
          </p>
        )}
      </motion.div>

      <button
        onClick={onBack}
        style={{
          marginTop: 28,
          background: "none",
          border: "none",
          color: "#b08090",
          fontFamily: "'Georgia', serif",
          fontSize: 13,
          cursor: "pointer",
          fontStyle: "italic",
          textDecoration: "underline",
          position: "relative",
          zIndex: 2,
        }}
      >
        volver al inicio
      </button>
    </main>
  )
}
