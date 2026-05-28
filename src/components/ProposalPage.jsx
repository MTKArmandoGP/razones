import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

function ProposalPage({ onBack }) {
  const [answer, setAnswer] = useState(null)
  const [noCount, setNoCount] = useState(0)
  const [showProposal, setShowProposal] = useState(false)
  const [confetti, setConfetti] = useState([])
  const [readyToContinue, setReadyToContinue] = useState(false)

  useEffect(() => {
    if (!readyToContinue) return

    const t = setTimeout(() => {
      setShowProposal(true)
    }, 600)

    return () => clearTimeout(t)
  }, [readyToContinue])

  const handleYes = () => {
    setAnswer("yes")

    const hearts = Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 14 + Math.random() * 22,
      delay: Math.random() * 0.8,
      duration: 1.8 + Math.random() * 1.2,
      color: [
        "#f48fb1",
        "#e91e8c",
        "#f9a8c9",
        "#fce4ec",
        "#d81b60",
        "#ff80ab",
      ][Math.floor(Math.random() * 6)],
    }))

    setConfetti(hearts)
  }

  const noMessages = [
    "¿Segura? 🥺",
    "Piénsalo bien...",
    "Este botón se está quedando pequeño 👀",
    "Últimaaa oportunidad...",
    "Está bien, lo entiendo 😢",
  ]

  const handleNo = () => {
    if (noCount < noMessages.length - 1) {
      setNoCount((c) => c + 1)
    } else {
      setAnswer("no_final")
    }
  }

  return (
    <section
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, #fff0f3 0%, #fde8ee 50%, #fdf2f4 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,200,215,0.4) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          background: "rgba(255,255,255,0.7)",
          border: "1px solid #fce8ec",
          borderRadius: "50%",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#c0606e",
          fontSize: 20,
          backdropFilter: "blur(8px)",
          transition: "transform 0.2s",
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)"
        }}
      >
        ‹
      </button>

      {/* Confetti */}
      {confetti.map((h) => (
        <motion.div
          key={h.id}
          initial={{
            y: "100vh",
            x: `${h.x}vw`,
            opacity: 1,
            scale: 0.5,
          }}
          animate={{
            y: "-20vh",
            opacity: 0,
            scale: 1.2,
            rotate: 360,
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            ease: "easeOut",
          }}
          style={{
            position: "fixed",
            bottom: 0,
            fontSize: h.size,
            color: h.color,
            pointerEvents: "none",
            zIndex: 100,
          }}
        >
          ♥
        </motion.div>
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: 540,
          width: "100%",
        }}
      >
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
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
          ♥ una pregunta importante ♥
        </motion.p>

        {/* HEADING FIXED */}
        <div
          style={{
            minHeight: 170,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <AnimatePresence mode="wait">
            {!readyToContinue ? (
              <motion.h1
                key="intro-title"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "clamp(34px, 7vw, 58px)",
                  fontWeight: 300,
                  color: "#5b2d2d",
                  lineHeight: 1.2,
                  margin: 0,
                  textAlign: "center",
                }}
              >
                Esta sección ya está
                <br />
                <span
                  style={{
                    fontStyle: "italic",
                    color: "#c0606e",
                  }}
                >
                  desbloqueada
                </span>
              </motion.h1>
            ) : (
              <motion.h1
                key="proposal-title"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "clamp(34px, 7vw, 58px)",
                  fontWeight: 300,
                  color: "#5b2d2d",
                  lineHeight: 1.2,
                  margin: 0,
                  textAlign: "center",
                }}
              >
                ¿Quieres ser
                <br />
                <span
                  style={{
                    fontStyle: "italic",
                    color: "#c0606e",
                  }}
                >
                  mi novia?
                </span>
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            margin: "20px 0",
          }}
        >
          <div
            style={{
              width: 56,
              height: 1,
              background:
                "linear-gradient(to right, transparent, #f2c4c8)",
            }}
          />

          <span style={{ color: "#e8a0a8", fontSize: 18 }}>
            ♥
          </span>

          <div
            style={{
              width: 56,
              height: 1,
              background:
                "linear-gradient(to left, transparent, #f2c4c8)",
            }}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {/* INTRO */}
          {!readyToContinue ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(170deg, #fffaf9 0%, #fff5f7 60%, #fef0f3 100%)",
                  borderRadius: 28,
                  padding: "40px 36px",
                  boxShadow:
                    "0 12px 64px rgba(192,96,110,0.18)",
                  border: "1px solid #fce8ec",
                  marginBottom: 32,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: "clamp(15px, 2.5vw, 18px)",
                    color: "#5b2d2d",
                    fontStyle: "italic",
                    lineHeight: 1.9,
                    margin: 0,
                  }}
                >
                  Esta sección ya está desbloqueada,
                  <br />
                  pero…
                  <br />
                  <br />
                  ¿De verdad quieres continuar?
                  <br />
                  ¿Te sientes lista? ♡
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setReadyToContinue(true)}
                style={{
                  padding: "16px 42px",
                  borderRadius: 50,
                  border: "none",
                  background:
                    "linear-gradient(135deg, #d4607a, #c0606e)",
                  color: "#fff",
                  fontFamily: "'Georgia', serif",
                  fontSize: 17,
                  cursor: "pointer",
                  boxShadow:
                    "0 8px 28px rgba(192,96,110,0.4)",
                }}
              >
                Sí, quiero continuar ♡
              </motion.button>
            </motion.div>
          ) : answer === null ? (
            /* PROPOSAL */
            <motion.div
              key="proposal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 22,
              }}
            >
              {/* Card */}
              <div
                style={{
                  background:
                    "linear-gradient(170deg, #fffaf9 0%, #fff5f7 60%, #fef0f3 100%)",
                  borderRadius: 28,
                  padding: "40px 36px 36px",
                  boxShadow:
                    "0 12px 64px rgba(192,96,110,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
                  border: "1px solid #fce8ec",
                  marginBottom: 32,
                  position: "relative",
                  textAlign: "center",
                }}
              >
                {showProposal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <p
                      style={{
                        fontFamily: "'Georgia', serif",
                        fontSize: "clamp(14px, 2.5vw, 16px)",
                        color: "#5b2d2d",
                        fontStyle: "italic",
                        lineHeight: 1.9,
                        margin: "0 0 16px",
                      }}
                    >
                      Ya leíste todas las razones.
                      <br />
                      Ya sabes cómo me haces sentir.
                    </p>

                    <p
                      style={{
                        fontFamily: "'Georgia', serif",
                        fontSize: "clamp(15px, 2.5vw, 17px)",
                        color: "#5b2d2d",
                        fontStyle: "italic",
                        lineHeight: 1.9,
                        margin: "0 0 16px",
                      }}
                    >
                      Me gustas mucho, y me gustaría
                      <br />
                      que fueras mi novia.
                    </p>

                    <p
                      style={{
                        fontFamily: "'Georgia', serif",
                        fontSize: "clamp(14px, 2.5vw, 15px)",
                        color: "#9b6070",
                        fontStyle: "italic",
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      Sin presión, con todo el cariño. ♡
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleYes}
                  style={{
                    padding: "16px 40px",
                    borderRadius: 50,
                    border: "none",
                    background:
                      "linear-gradient(135deg, #d4607a, #c0606e)",
                    color: "#fff",
                    fontFamily: "'Georgia', serif",
                    fontSize: 17,
                    cursor: "pointer",
                    boxShadow:
                      "0 8px 28px rgba(192,96,110,0.4)",
                  }}
                >
                  Sí ♥
                </motion.button>

                <motion.button
                  onClick={handleNo}
                  animate={{
                    scale: Math.max(0.6, 1 - noCount * 0.1),
                  }}
                  style={{
                    padding: "16px 40px",
                    borderRadius: 50,
                    border: "1.5px solid #f2c4c8",
                    background: "transparent",
                    color: "#c0606e",
                    fontFamily: "'Georgia', serif",
                    fontSize: 17 - noCount,
                    cursor: "pointer",
                    transition: "font-size 0.3s",
                  }}
                >
                  {noCount === 0
                    ? "No"
                    : noMessages[noCount - 1]}
                </motion.button>
              </div>
            </motion.div>
          ) : answer === "yes" ? (
            /* YES */
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 20,
              }}
              style={{
                background:
                  "linear-gradient(170deg, #fffaf9 0%, #fff5f7 100%)",
                borderRadius: 28,
                padding: "44px 36px",
                boxShadow:
                  "0 12px 64px rgba(192,96,110,0.2)",
                border: "1px solid #fce8ec",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: 48, margin: "0 0 16px" }}>
                🎉
              </p>

              <p
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "clamp(20px, 4vw, 26px)",
                  color: "#5b2d2d",
                  fontWeight: 300,
                  margin: "0 0 12px",
                }}
              >
                ¡Me alegra muchísimo!
              </p>

              <p
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "clamp(14px, 2.5vw, 16px)",
                  color: "#9b6070",
                  fontStyle: "italic",
                  lineHeight: 1.85,
                  margin: 0,
                }}
              >
                Prometo seguir siendo el mismo intenso
                <br />
                que te escribe cositas lindas. ♡
              </p>
            </motion.div>
          ) : (
            /* NO */
            <motion.div
              key="no"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: "center" }}
            >
              <p
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "clamp(15px, 3vw, 18px)",
                  color: "#9b6070",
                  fontStyle: "italic",
                  lineHeight: 1.85,
                }}
              >
                Está bien. Lo entiendo. 🥺
                <br />
                Pero las razones siguen siendo reales. ♡
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ProposalPage