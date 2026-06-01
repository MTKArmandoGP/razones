import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const moments = [
  {
    date: "1 de mayo",
    weekday: "Viernes",
    number: "01",
    emoji: "🌹",
    title: "El principio de todo",
    tag: "Primera salida",
    color: "#c0606e",
    light: "#fff0f3",
    story: `Salimos a cenar y caminar. Iba nervioso desde antes de llegar, ensayando en mi cabeza cómo debía actuar, qué decir, si hacerla reír o ser serio. Me pregunté mil veces si llevarle flores o no — y al final sí, un ramo que casi no llego a darle de los nervios.

    Llegué por ti y te veías hermosa. De esas veces que uno no sabe muy bien qué hacer con los ojos.

    La cena fue fácil. La conversación fluyó como si ya nos conociéramos de antes (si ya nos conociamos pero no demasiado), como si los nervios nunca hubieran existido. Esa noche supe que quería más noches así.`,
    detail: [
      { icon: "🌹", text: "Le llevé flores — después de dudarlo demasiado" },
      { icon: "🍽️", text: "Cena + caminar sin prisa" },
      { icon: "😅", text: "Nervios al 100, pero valió cada segundo" },
      { icon: "✨", text: "Te veías hermosa" },
    ],
    quote: "Esa noche supe que quería conocerte mucho más.",
  },
  {
    date: "8 de mayo",
    weekday: "Viernes",
    number: "02",
    emoji: "🎬",
    title: "Terror, orquídeas\ny una mano muy cerca",
    tag: "Segunda cita",
    color: "#9b4f7a",
    light: "#fdf0f8",
    story: `Fuimos al cine a ver una película de terror. Te llevé una orquídea — porque ya me gustaba demasiado como para no llevarte algo y que mejor que tu flor favorita?.

    Antes del cine, comimos lasaña. Y en el cine solo pensaba en tomarte la mano o en romper esa barrera, pero no pude, me ganaron los nervios esa noche.

    Hermosa, como siempre.`,
    detail: [
      { icon: "🌸", text: "Una orquídea — porque se lo merecía" },
      { icon: "🍝", text: "Lasaña antes del cine" },
      { icon: "🎭", text: "Película de terror — el pretexto perfecto" },
      { icon: "🤲", text: "Quise tomar tu mano. Los nervios dijeron que no." },
    ],
    quote: "Los nervios ganaron esa vez. Pero ya iba aprendiendo.",
  },
  {
    date: "15 de mayo",
    weekday: "Viernes",
    number: "03",
    emoji: "💬",
    title: "Burritos, terror\ny finalmente decirte que me gustas",
    tag: "La declaración",
    color: "#7a5535",
    light: "#fff8f0",
    story: `Fuimos a ver "Obsession". Antes, comimos burritos. Y en algún punto de esa noche, en el carro, me armé de valor y te dije que me gustabas.

    Te mostré esta misma página. Ver tu reacción fue algo que no voy a olvidar, cada detalle, cada segundo que te veía leer. Me encantó. Quería besarte ahí mismo. No pude, pero fue una de las noches más bonitas de mi vida.

    Hay momentos que uno guarda sin fotos. Ese fue uno.`,
    detail: [
      { icon: "🌯", text: "Burritos antes de la película" },
      { icon: "🎬", text: "Obsession en el cine" },
      { icon: "💻", text: "Te mostré esta página — su reacción fue todo" },
      { icon: "💬", text: "Te dije que me gustabas. Y lo sigo diciendo." },
    ],
    quote: "Quería besarte. No pude. Pero esa noche fue perfecta de todas formas.",
  },
  {
    date: "22 de mayo",
    weekday: "Viernes",
    number: "04",
    emoji: "✨",
    title: "Pasta, magia\ny el valor al final de la noche",
    tag: "La mejor noche",
    color: "#4a6670",
    light: "#f0f8fa",
    story: `Salimos a cenar pasta y boneless. Después Starbucks. En el carro intenté hacerte magia para impresionarte, quería apostarte un beso en cada truco y juego que haciamos. No salió tan bien como en mis planes.

    Pero al llevarte a tu casa, algo cambió. Me armé de valor. Y fue la mejor noche de todas por todo lo que pasó, por cómo se sintió, por lo que significó.

    Hay noches que marcan un antes y un después. Esa fue una.`,
    detail: [
      { icon: "🍝", text: "Pasta + boneless — cena perfecta" },
      { icon: "☕", text: "Starbucks de por medio" },
      { icon: "🪄", text: "Intenté magia. No salió. Pero me reí mucho." },
      { icon: "💋", text: "Al llevarte a casa, la mejor noche." },
    ],
    quote: "Fue la mejor noche. Y creo que lo sabes.",
  },
  {
    date: "29 de mayo",
    weekday: "Viernes",
    number: "05",
    emoji: "🤝",
    title: "Su mano, su primer\nte quiero, y solo quiero que sea ella",
    tag: "Algo muy especial",
    color: "#c0606e",
    light: "#fff0f3",
    story: `Fuimos a ver Backrooms. Te tomé la mano en el cine, casi toda la película así, sin soltarla. Fue de esas cosas simples que se sienten enormes.

    Me dijiste por primera vez "te quiero", aunque después me bajaste de las nubes. Te pedí que fueras mi novia. Todavía no estás lista, y eso no me puso triste, porque lo que pasó esa noche fue tan especial que no necesité nada más.

    Solo sé que quiero que seas tú. Nadie más.`,
    detail: [
      { icon: "🎬", text: "Backrooms y te tomé de la mano" },
      { icon: "🤝", text: "Casi toda la película así, sin soltarte" },
      { icon: "💛", text: "Su primer 'te quiero',algo que atesoro" },
      { icon: "♥", text: "Solo quiero que sea ella. Nadie más." },
    ],
    quote: "No necesité más respuesta. Solo saber que quiere que sea yo también.",
    isLast: true,
  },
]

function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

function MomentCard({ moment, index }) {
  const [ref, visible] = useInView(0.15)
  const [expanded, setExpanded] = useState(false)
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        width: "100%",
        marginBottom: 64,
        position: "relative",
      }}
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={visible ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
        style={{
          position: "absolute",
          left: "50%",
          top: 32,
          transform: "translate(-50%, 0)",
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${moment.color}, ${moment.color}99)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          boxShadow: `0 4px 24px ${moment.color}44`,
          zIndex: 10,
          border: "3px solid white",
        }}
      >
        {moment.emoji}
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={visible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "calc(50% - 48px)",
          maxWidth: 380,
          marginLeft: isLeft ? 0 : undefined,
          marginRight: isLeft ? undefined : 0,
        }}
      >
        <div
          onClick={() => setExpanded(!expanded)}
          style={{
            borderRadius: 24,
            background: `linear-gradient(160deg, ${moment.light} 0%, #fffaf9 100%)`,
            border: `1.5px solid ${moment.color}33`,
            boxShadow: `0 8px 32px ${moment.color}18`,
            padding: "28px 26px",
            cursor: "pointer",
            transition: "box-shadow 0.3s, transform 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 16px 48px ${moment.color}28`
            e.currentTarget.style.transform = "translateY(-3px)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 8px 32px ${moment.color}18`
            e.currentTarget.style.transform = "translateY(0)"
          }}
        >
          {/* Number + date */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <p style={{
              fontFamily: "'Georgia', serif",
              fontSize: 42,
              fontWeight: 300,
              color: `${moment.color}22`,
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}>
              {moment.number}
            </p>
            <div style={{ textAlign: "right" }}>
              <p style={{
                fontFamily: "'Georgia', serif",
                fontSize: 10,
                letterSpacing: "0.18em",
                color: moment.color,
                textTransform: "uppercase",
                margin: "0 0 2px",
                opacity: 0.75,
              }}>
                {moment.tag}
              </p>
              <p style={{
                fontFamily: "'Georgia', serif",
                fontSize: 13,
                color: "#b08090",
                margin: 0,
                fontStyle: "italic",
              }}>
                {moment.weekday} · {moment.date}
              </p>
            </div>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(17px, 3vw, 21px)",
            fontWeight: 300,
            color: "#5b2d2d",
            lineHeight: 1.3,
            margin: "0 0 14px",
            whiteSpace: "pre-line",
          }}>
            {moment.title}
          </h3>

          {/* Story */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: 13,
                  color: "#7a4a55",
                  lineHeight: 2,
                  margin: "0 0 16px",
                  fontStyle: "italic",
                  whiteSpace: "pre-line",
                }}>
                  {moment.story}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  {moment.detail.map((d, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 15, flexShrink: 0 }}>{d.icon}</span>
                      <p style={{
                        fontFamily: "'Georgia', serif",
                        fontSize: 12,
                        color: "#9b6070",
                        margin: 0,
                        lineHeight: 1.5,
                      }}>{d.text}</p>
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop: "1px solid #f2c4c8",
                  paddingTop: 14,
                }}>
                  <p style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: 13,
                    color: moment.color,
                    fontStyle: "italic",
                    margin: 0,
                    lineHeight: 1.7,
                    textAlign: "center",
                  }}>
                    "{moment.quote}"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand hint */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: expanded ? 14 : 0,
          }}>
            <div style={{ width: "100%", height: 1, background: `${moment.color}22` }} />
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              style={{ color: moment.color, fontSize: 12, flexShrink: 0, opacity: 0.6 }}
            >
              ▾
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function MomentCardMobile({ moment, index }) {
  const [ref, visible] = useInView(0.1)
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: 16,
        marginBottom: 32,
        position: "relative",
      }}
    >
      {/* Left: dot + line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={visible ? { scale: 1 } : {}}
          transition={{ delay: 0.1, type: "spring", stiffness: 260 }}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${moment.color}, ${moment.color}99)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            boxShadow: `0 4px 16px ${moment.color}44`,
            border: "2px solid white",
            flexShrink: 0,
          }}
        >
          {moment.emoji}
        </motion.div>
        {index < moments.length - 1 && (
          <div style={{ width: 2, flex: 1, background: "linear-gradient(to bottom, #f2c4c8, transparent)", marginTop: 6 }} />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={visible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ flex: 1, paddingBottom: 16 }}
      >
        <div
          onClick={() => setExpanded(!expanded)}
          style={{
            borderRadius: 20,
            background: `linear-gradient(160deg, ${moment.light} 0%, #fffaf9 100%)`,
            border: `1.5px solid ${moment.color}33`,
            boxShadow: `0 6px 24px ${moment.color}15`,
            padding: "22px 20px",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <p style={{
              fontFamily: "'Georgia', serif",
              fontSize: 10,
              letterSpacing: "0.16em",
              color: moment.color,
              textTransform: "uppercase",
              margin: 0,
              opacity: 0.75,
            }}>
              {moment.tag}
            </p>
            <p style={{
              fontFamily: "'Georgia', serif",
              fontSize: 12,
              color: "#b08090",
              margin: 0,
              fontStyle: "italic",
            }}>
              {moment.date}
            </p>
          </div>

          <h3 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(16px, 4vw, 19px)",
            fontWeight: 300,
            color: "#5b2d2d",
            lineHeight: 1.3,
            margin: "0 0 12px",
            whiteSpace: "pre-line",
          }}>
            {moment.title}
          </h3>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: 13,
                  color: "#7a4a55",
                  lineHeight: 2,
                  margin: "0 0 14px",
                  fontStyle: "italic",
                  whiteSpace: "pre-line",
                }}>
                  {moment.story}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 }}>
                  {moment.detail.map((d, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14, flexShrink: 0 }}>{d.icon}</span>
                      <p style={{ fontFamily: "'Georgia', serif", fontSize: 12, color: "#9b6070", margin: 0 }}>{d.text}</p>
                    </div>
                  ))}
                </div>
                <p style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: 13,
                  color: moment.color,
                  fontStyle: "italic",
                  margin: 0,
                  textAlign: "center",
                  borderTop: "1px solid #f2c4c8",
                  paddingTop: 12,
                }}>
                  "{moment.quote}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
            <div style={{ width: "100%", height: 1, background: `${moment.color}22` }} />
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              style={{ color: moment.color, fontSize: 11, flexShrink: 0, opacity: 0.6 }}
            >▾</motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function TimelinePage({ onBack }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 720)
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fff0f3 0%, #fde8ee 40%, #fdf2f4 100%)",
      padding: "0 0 80px",
    }}>
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

      {/* Hero */}
      <div style={{
        textAlign: "center",
        padding: "80px 24px 64px",
      }}>
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
            margin: "0 0 18px",
            opacity: 0.8,
          }}
        >
          ♥ desde el principio ♥
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(36px, 7vw, 64px)",
            fontWeight: 300,
            color: "#5b2d2d",
            lineHeight: 1.2,
            margin: "0 0 18px",
          }}
        >
          Nuestra historia,<br />
          <span style={{ fontStyle: "italic", color: "#c0606e" }}>hasta hoy</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, margin: "0 0 20px" }}
        >
          <div style={{ width: 56, height: 1, background: "linear-gradient(to right, transparent, #f2c4c8)" }} />
          <span style={{ color: "#e8a0a8", fontSize: 20 }}>♥</span>
          <div style={{ width: 56, height: 1, background: "linear-gradient(to left, transparent, #f2c4c8)" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 14,
            color: "#9b6070",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          Toca cada momento para leer la historia completa ♡
        </motion.p>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Center line — desktop */}
        {!isMobile && (
          <div style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 2,
            background: "linear-gradient(to bottom, #f2c4c8 0%, #e8a0a8 50%, #f2c4c8 100%)",
            transform: "translateX(-50%)",
            zIndex: 1,
          }} />
        )}

        {isMobile
          ? moments.map((m, i) => <MomentCardMobile key={m.number} moment={m} index={i} />)
          : moments.map((m, i) => <MomentCard key={m.number} moment={m} index={i} />)
        }
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{ textAlign: "center", padding: "32px 24px 0" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 20 }}>
          <div style={{ width: 48, height: 1, background: "linear-gradient(to right, transparent, #f2c4c8)" }} />
          <span style={{ color: "#e8a0a8", fontSize: 18 }}>♥</span>
          <div style={{ width: 48, height: 1, background: "linear-gradient(to left, transparent, #f2c4c8)" }} />
        </div>
        <p style={{
          fontFamily: "'Georgia', serif",
          fontSize: 14,
          color: "#9b6070",
          fontStyle: "italic",
          margin: "0 0 8px",
          maxWidth: 380,
          marginInline: "auto",
          lineHeight: 1.8,
        }}>
          Y esto es solo el comienzo de lo que espero sean muchos más Viernes juntos.
        </p>
        <p style={{ color: "#e8a0a8", fontSize: 22, margin: "8px 0 0" }}>♥</p>
      </motion.div>
    </main>
  )
}
