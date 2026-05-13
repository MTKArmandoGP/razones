import { useState, useRef, useEffect } from "react"
import messages from "../data/messages"
import DayCard from "./DayCard"
import LetterModal from "./LetterModal"

function FinalLetter() {
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
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const paragraphs = [
    { text: "Estas son solo algunas de las razones por las que me gustas.", style: "small" },
    { text: "Cada día que pasa encuentro más.", style: "small" },
    { text: "Tal vez pienses que soy un intenso, pero prefiero decirte que me gustas a guardarme mis sentimientos y quedarme con el «¿Qué hubiera pasado?»", style: "main" },
    { text: "De verdad eres alguien por la que vale la pena ser un intenso que solo quiere demostrarte cuánto te quiere.", style: "main-bold" },
    { text: "Gracias por ser exactamente como eres.", style: "small" },
  ]

  const getStyle = (s) => {
    if (s === "small") return { fontSize: "clamp(13px, 2vw, 14px)", color: "#9b6070", fontWeight: 400, opacity: 0.85 }
    if (s === "main") return { fontSize: "clamp(15px, 2.5vw, 17px)", color: "#5b2d2d", fontWeight: 400 }
    if (s === "main-bold") return { fontSize: "clamp(15px, 2.5vw, 17px)", color: "#5b2d2d", fontWeight: 500 }
    return {}
  }

  return (
    <div
      ref={ref}
      style={{
        marginTop: "88px",
        marginBottom: "56px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(52px)",
        transition: "opacity 1.1s ease, transform 1.1s ease",
      }}
    >
      {/* Guide label */}
      <p style={{
        fontFamily: "'Georgia', serif",
        fontSize: "12px",
        letterSpacing: "0.22em",
        color: "#c0606e",
        textTransform: "uppercase",
        margin: 0,
        opacity: 0.75,
      }}>
        — Y para terminar —
      </p>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{ width: 56, height: 1, background: "linear-gradient(to right, transparent, #f2c4c8)" }} />
        <span style={{ color: "#e8a0a8", fontSize: 18 }}>♥</span>
        <div style={{ width: 56, height: 1, background: "linear-gradient(to left, transparent, #f2c4c8)" }} />
      </div>

      {/* Letter card */}
      <div style={{
        maxWidth: 540,
        width: "100%",
        background: "linear-gradient(170deg, #fffaf9 0%, #fff5f7 60%, #fef0f3 100%)",
        borderRadius: 28,
        padding: "48px 44px 40px",
        boxShadow: "0 12px 64px rgba(192, 96, 110, 0.13), 0 2px 16px rgba(192, 96, 110, 0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
        border: "1px solid #fce8ec",
        position: "relative",
        textAlign: "center",
      }}>
        {/* Corner sparkles */}
        <span style={{ position: "absolute", top: 18, left: 22, fontSize: 12, color: "#f9c4d0", opacity: 0.65 }}>✦</span>
        <span style={{ position: "absolute", top: 20, right: 24, fontSize: 9, color: "#f9c4d0", opacity: 0.45 }}>✦</span>
        <span style={{ position: "absolute", bottom: 22, left: 30, fontSize: 10, color: "#f9c4d0", opacity: 0.45 }}>✦</span>
        <span style={{ position: "absolute", bottom: 20, right: 26, fontSize: 13, color: "#f9c4d0", opacity: 0.55 }}>✦</span>

        {/* Top ruled lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 28 }}>
          {[1, 0.5].map((op, i) => (
            <div key={i} style={{ height: 1, background: `rgba(242,196,200,${op})`, borderRadius: 1 }} />
          ))}
        </div>

        {/* Paragraphs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {paragraphs.map(({ text, style }, i) => (
            <p key={i} style={{
              fontFamily: "'Georgia', serif",
              lineHeight: 1.85,
              fontStyle: "italic",
              margin: 0,
              ...getStyle(style),
            }}>
              {text}
            </p>
          ))}
        </div>

        {/* Signature */}
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
            con cariño, siempre
          </p>
          <span style={{ color: "#e8a0a8", fontSize: 16 }}>♡</span>
        </div>

        {/* Bottom ruled lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 24 }}>
          {[0.5, 1].map((op, i) => (
            <div key={i} style={{ height: 1, background: `rgba(242,196,200,${op})`, borderRadius: 1 }} />
          ))}
        </div>
      </div>

      {/* Final heart */}
      <p style={{ color: "#e8a0a8", fontSize: 22, margin: "2px 0 0" }}>♥</p>
    </div>
  )
}

function CalendarGrid() {
  const [selectedItem, setSelectedItem] = useState(null)

  const handleOpen = (item) => setSelectedItem(item)
  const handleClose = () => setSelectedItem(null)

  const handlePrev = () => {
    const idx = messages.findIndex((m) => m.day === selectedItem.day)
    if (idx > 0) setSelectedItem(messages[idx - 1])
  }

  const handleNext = () => {
    const idx = messages.findIndex((m) => m.day === selectedItem.day)
    if (idx < messages.length - 1) setSelectedItem(messages[idx + 1])
  }

  return (
    <section className="px-6 pb-24" style={{ background: "#fdf2f4" }}>
      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <div className="text-center py-16">
          <p className="text-[#c0606e] text-sm tracking-widest uppercase mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            — Mis sentimientos hacia ti —
          </p>
          <h2
            className="text-[#5b2d2d] font-light"
            style={{ fontSize: "clamp(28px, 5vw, 42px)", fontFamily: "'Georgia', serif" }}
          >
            Cada sobre contiene una razón
          </h2>
          <p className="text-3xl mt-2">♥</p>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-5">
          {messages.map((item) => (
            <DayCard key={item.day} item={item} onOpen={handleOpen} />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-[#b08090] text-sm mt-12 italic" style={{ fontFamily: "'Georgia', serif" }}>
          Cada sobre esconde algo especial para ti ♡
        </p>

        {/* Final Letter — reveals on scroll */}
        <FinalLetter />
      </div>

      {/* Modal */}
      {selectedItem && (
        <LetterModal
          item={selectedItem}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  )
}

export default CalendarGrid
