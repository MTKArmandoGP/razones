import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const FRIDAY = "viernes 30 de mayo"

// ──────────────────────────────────────────────
// GLITCH TEXT
// ──────────────────────────────────────────────
function useGlitch(text, active) {
  const [display, setDisplay] = useState(text)
  const chars = "!<>-_\\/[]{}—=+*^?#@%&ABCDEFabcdef0123456789"

  useEffect(() => {
    if (!active) {
      setDisplay(text)
      return
    }

    let iter = 0

    const id = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((c, i) =>
            i < iter
              ? c
              : c === " "
              ? " "
              : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      )

      iter += 0.35

      if (iter >= text.length) {
        clearInterval(id)
      }
    }, 30)

    return () => clearInterval(id)
  }, [active, text])

  return display
}

// ──────────────────────────────────────────────
// FLICKER
// ──────────────────────────────────────────────
function Flicker() {
  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 5,
        background: "rgba(255,255,220,0.03)",
      }}
      animate={{
        opacity: [1, 0.96, 1, 0.93, 1, 0.98, 1],
      }}
      transition={{
        duration: 0.18,
        repeat: Infinity,
        repeatDelay: 2.4,
      }}
    />
  )
}

// ──────────────────────────────────────────────
// SCANLINES
// ──────────────────────────────────────────────
function Scanlines() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 4,
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
      }}
    />
  )
}

// ──────────────────────────────────────────────
// DUST PARTICLES
// ──────────────────────────────────────────────
function Dust() {
  const [particles] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      dur: 8 + Math.random() * 14,
      delay: Math.random() * 10,
      dx: (Math.random() - 0.5) * 60,
      dy: (Math.random() - 0.5) * 60,
    }))
  )

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 3,
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(255, 230, 180, 0.35)",
          }}
          animate={{
            x: [0, p.dx, 0],
            y: [0, p.dy, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// ──────────────────────────────────────────────
// HUMMING AUDIO
// ──────────────────────────────────────────────
function AmbientHum() {
  useEffect(() => {
    const audio = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_5c6f6db0bb.mp3?filename=room-tone-110624.mp3"
    )

    audio.loop = true
    audio.volume = 0.12

    const playAudio = async () => {
      try {
        await audio.play()
      } catch (e) {}
    }

    playAudio()

    return () => {
      audio.pause()
    }
  }, [])

  return null
}

// ──────────────────────────────────────────────
// CAMERA SHAKE
// ──────────────────────────────────────────────
function CameraShake({ children }) {
  return (
    <motion.div
      animate={{
        x: [0, 0.5, -0.5, 0],
        y: [0, -0.5, 0.5, 0],
      }}
      transition={{
        duration: 0.12,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    >
      {children}
    </motion.div>
  )
}

// ──────────────────────────────────────────────
// RUNAWAY BUTTON
// ──────────────────────────────────────────────
function RunawayNo({ onCatch }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [catches, setCatches] = useState(0)

  const run = () => {
    const x = (Math.random() - 0.5) * 220
    const y = (Math.random() - 0.5) * 120
    setPos({ x, y })
  }

  const handleClick = () => {
    const next = catches + 1
    setCatches(next)

    if (next >= 3) {
      onCatch()
    } else {
      run()
    }
  }

  return (
    <motion.button
      animate={{
        x: pos.x,
        y: pos.y,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onMouseEnter={run}
      onClick={handleClick}
      style={{
        padding: "14px 32px",
        borderRadius: 8,
        border: "1px solid rgba(255,230,180,0.2)",
        background: "rgba(255,255,255,0.04)",
        color: "rgba(255,230,180,0.4)",
        fontFamily: "'Courier New', monospace",
        fontSize: catches > 0 ? Math.max(9, 14 - catches * 2) : 14,
        cursor: "pointer",
        letterSpacing: "0.08em",
        transition: "font-size 0.3s",
        whiteSpace: "nowrap",
      }}
    >
      {catches === 0
        ? "[ no puedo ]"
        : catches === 1
        ? "[ en serio no ]"
        : "[ ...bueno sí ]"}
    </motion.button>
  )
}

// ──────────────────────────────────────────────
// MAIN PAGE
// ──────────────────────────────────────────────
export default function DateInvitePage({ onBack }) {
  const [phase, setPhase] = useState("intro")
  const [showEntity, setShowEntity] = useState(false)

  const title1 = useGlitch("NIVEL 0", phase !== "intro")

  const title2 = useGlitch(
    "ACCESO CONCEDIDO",
    phase === "reveal" ||
      phase === "question" ||
      phase === "yes" ||
      phase === "no_caught"
  )

  useEffect(() => {
    if (phase === "intro") {
      const t = setTimeout(() => {
        setPhase("reveal")
      }, 2200)

      return () => clearTimeout(t)
    }
  }, [phase])

  // random entity glitch
  useEffect(() => {
    const interval = setInterval(() => {
      setShowEntity(true)

      setTimeout(() => {
        setShowEntity(false)
      }, 220)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  return (
    <CameraShake>
      <div
        style={{
          minHeight: "100vh",
          background: "#0e0d09",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Courier New', monospace",
        }}
      >
        <AmbientHum />
        <Flicker />
        <Scanlines />
        <Dust />

        {/* ENTITY FLASH */}
        <AnimatePresence>
          {showEntity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.06 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 2,
                pointerEvents: "none",
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "grayscale(1)",
              }}
            />
          )}
        </AnimatePresence>

        {/* VIGNETTE */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.78) 100%)",
          }}
        />

        {/* WALLPAPER */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            backgroundImage: `
            linear-gradient(rgba(255,230,140,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,230,140,0.03) 1px, transparent 1px)
          `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* BACK BUTTON */}
        <button
          onClick={onBack}
          style={{
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: 50,
            background: "rgba(255,230,140,0.07)",
            border: "1px solid rgba(255,230,140,0.2)",
            borderRadius: 6,
            padding: "8px 16px",
            color: "rgba(255,230,140,0.6)",
            fontFamily: "'Courier New', monospace",
            fontSize: 12,
            cursor: "pointer",
            letterSpacing: "0.1em",
          }}
        >
          ← SALIR
        </button>

        {/* MAIN */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: 580,
            width: "100%",
          }}
        >
          {/* LABEL */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.3 }}
            style={{
              color: "rgba(255,230,140,0.5)",
              fontSize: 10,
              letterSpacing: "0.3em",
              margin: "0 0 28px",
            }}
          >
            SISTEMA DE MENSAJERÍA — NIVEL CLASIFICADO
          </motion.p>

          {/* TITLES */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                fontSize: "clamp(11px, 2vw, 13px)",
                color: "rgba(255,230,140,0.35)",
                letterSpacing: "0.4em",
                marginBottom: 6,
              }}
            >
              {title1}
            </div>

            <h1
              style={{
                fontSize: "clamp(28px, 6vw, 46px)",
                fontWeight: 700,
                color: "#ffe68a",
                letterSpacing: "0.12em",
                margin: "0 0 6px",
                textShadow:
                  "0 0 40px rgba(255,230,100,0.4), 0 0 80px rgba(255,200,80,0.15)",
              }}
            >
              {title2}
            </h1>
          </motion.div>

          {/* RULE */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              height: 1,
              background:
                "linear-gradient(to right, transparent, rgba(255,230,140,0.4), transparent)",
              margin: "22px 0",
            }}
          />

          <AnimatePresence mode="wait">
            {/* INTRO */}
            {phase === "intro" && (
              <motion.div
                key="intro"
                exit={{ opacity: 0 }}
                style={{
                  color: "rgba(255,230,140,0.5)",
                  fontSize: 13,
                }}
              >
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  Inicializando protocolo...
                </motion.span>
              </motion.div>
            )}

            {/* REVEAL */}
            {phase === "reveal" && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  style={{
                    background: "rgba(255,230,140,0.04)",
                    border: "1px solid rgba(255,230,140,0.15)",
                    borderRadius: 12,
                    padding: "28px 30px",
                    textAlign: "left",
                    marginBottom: 28,
                    position: "relative",
                    backdropFilter: "blur(3px)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -1,
                      left: 20,
                      background: "#0e0d09",
                      padding: "0 10px",
                      fontSize: 10,
                      color: "rgba(255,230,140,0.4)",
                      letterSpacing: "0.2em",
                    }}
                  >
                    EXPEDIENTE / VIERNES 30 DE MAYO
                  </div>

                  <p
                    style={{
                      color: "rgba(255,230,140,0.75)",
                      fontSize: 13,
                      lineHeight: 1.9,
                      margin: "8px 0 14px",
                    }}
                  >
                    Si de repente te encuentras en un lugar que no reconoces,
                    <br />
                    con alfombra amarilla interminable y luces que zumban...
                    <br />
                    <span
                      style={{
                        color: "#ffe68a",
                        fontWeight: "bold",
                      }}
                    >
                      probablemente llegaste a los Backrooms.
                    </span>
                  </p>

                  <p
                    style={{
                      color: "rgba(255,230,140,0.5)",
                      fontSize: 12,
                      lineHeight: 1.85,
                      margin: 0,
                    }}
                  >
                    La única regla: no entres solo.
                    <br />
                    Lo bueno es que hay alguien que quiere entrar contigo. 👀
                  </p>

                  {/* TERMINAL */}
                  <div
                    style={{
                      marginTop: 20,
                      borderTop:
                        "1px solid rgba(255,230,140,0.1)",
                      paddingTop: 14,
                    }}
                  >
                    {[
                      "> Destino confirmado: CINE",
                      "> Película: The Backrooms",
                      "> Previa: algo rico de comer 🍕",
                      `> Fecha objetivo: ${FRIDAY}`,
                      "> Compañía requerida: TÚ ✓",
                    ].map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.3 + i * 0.18,
                        }}
                        style={{
                          color:
                            i === 4
                              ? "#ffe68a"
                              : "rgba(255,230,140,0.55)",
                          fontSize: 12,
                          margin: "4px 0",
                          fontWeight:
                            i === 4 ? "bold" : "normal",
                        }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setPhase("question")}
                  style={{
                    padding: "14px 36px",
                    borderRadius: 8,
                    border:
                      "1px solid rgba(255,230,140,0.5)",
                    background: "rgba(255,230,140,0.08)",
                    color: "#ffe68a",
                    fontSize: 14,
                    cursor: "pointer",
                    letterSpacing: "0.12em",
                    boxShadow:
                      "0 0 24px rgba(255,220,80,0.1)",
                  }}
                >
                  [ CONTINUAR ]
                </motion.button>
              </motion.div>
            )}

            {/* QUESTION */}
            {phase === "question" && (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.h2
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(255,220,80,0.3)",
                      "0 0 50px rgba(255,220,80,0.6)",
                      "0 0 20px rgba(255,220,80,0.3)",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                  style={{
                    fontSize: "clamp(18px, 4vw, 26px)",
                    color: "#ffe68a",
                    fontWeight: 700,
                    margin: "0 0 10px",
                    letterSpacing: "0.06em",
                  }}
                >
                  ¿Me acompañas?
                </motion.h2>

                <p
                  style={{
                    color: "rgba(255,230,140,0.5)",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    margin: "0 0 36px",
                  }}
                >
                  VIERNES 30 • COMIDA + BACKROOMS EN EL CINE
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPhase("yes")}
                    style={{
                      padding: "14px 40px",
                      borderRadius: 8,
                      border: "1px solid #ffe68a",
                      background:
                        "rgba(255,230,140,0.12)",
                      color: "#ffe68a",
                      fontSize: 15,
                      cursor: "pointer",
                      letterSpacing: "0.1em",
                      boxShadow:
                        "0 0 28px rgba(255,220,80,0.2)",
                      fontWeight: "bold",
                    }}
                  >
                    [ SÍ, vamos ]
                  </motion.button>

                  <RunawayNo
                    onCatch={() => setPhase("no_caught")}
                  />
                </div>
              </motion.div>
            )}

            {/* YES */}
            {phase === "yes" && (
              <motion.div
                key="yes"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 40px rgba(255,220,80,0.15)",
                      "0 0 80px rgba(255,220,80,0.3)",
                      "0 0 40px rgba(255,220,80,0.15)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  style={{
                    border:
                      "1px solid rgba(255,230,140,0.3)",
                    borderRadius: 16,
                    padding: "36px 32px",
                    background:
                      "rgba(255,230,140,0.05)",
                    marginBottom: 24,
                  }}
                >
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    style={{
                      fontSize: 56,
                      margin: "0 0 16px",
                    }}
                  >
                    🎬
                  </motion.p>

                  <p
                    style={{
                      color: "#ffe68a",
                      fontSize: "clamp(18px, 4vw, 24px)",
                      fontWeight: "bold",
                      letterSpacing: "0.08em",
                      margin: "0 0 12px",
                    }}
                  >
                    PLAN CONFIRMADO
                  </p>

                  <div
                    style={{
                      color: "rgba(255,230,140,0.6)",
                      fontSize: 13,
                      lineHeight: 2,
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      📅 Viernes 30 de mayo
                    </p>
                    <p style={{ margin: 0 }}>
                      🍕 Algo rico de comer primero
                    </p>
                    <p style={{ margin: 0 }}>
                      🎥 The Backrooms en el cine
                    </p>

                    <p
                      style={{
                        margin: "10px 0 0",
                        color: "#ffe68a",
                        fontStyle: "italic",
                      }}
                    >
                      ...y buena compañía ♡
                    </p>
                  </div>
                </motion.div>

                <p
                  style={{
                    color: "rgba(255,230,140,0.4)",
                    fontSize: 11,
                    letterSpacing: "0.15em",
                  }}
                >
                  — TRANSMISIÓN FINALIZADA —
                </p>
              </motion.div>
            )}

            {/* NO */}
            {phase === "no_caught" && (
              <motion.div
                key="no_caught"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div
                  style={{
                    border:
                      "1px solid rgba(255,230,140,0.2)",
                    borderRadius: 16,
                    padding: "32px 28px",
                    background:
                      "rgba(255,230,140,0.04)",
                    marginBottom: 20,
                  }}
                >
                  <p
                    style={{
                      fontSize: 40,
                      margin: "0 0 14px",
                    }}
                  >
                    🕳️
                  </p>

                  <p
                    style={{
                      color: "#ffe68a",
                      fontSize: 16,
                      letterSpacing: "0.06em",
                      margin: "0 0 10px",
                    }}
                  >
                    ...casi te perdiste en los Backrooms.
                  </p>

                  <p
                    style={{
                      color: "rgba(255,230,140,0.55)",
                      fontSize: 13,
                      lineHeight: 1.85,
                      margin: "0 0 24px",
                    }}
                  >
                    El botón de "no" no te iba a dejar escapar
                    fácil.
                    <br />
                    Igual que yo. 🙃
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setPhase("yes")}
                    style={{
                      padding: "13px 36px",
                      borderRadius: 8,
                      border: "1px solid #ffe68a",
                      background:
                        "rgba(255,230,140,0.1)",
                      color: "#ffe68a",
                      fontSize: 14,
                      cursor: "pointer",
                      letterSpacing: "0.1em",
                    }}
                  >
                    [ está bien, sí voy ]
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </CameraShake>
  )
}