import { useState } from "react"
import messages from "../data/messages"
import DayCard from "./DayCard"
import LetterModal from "./LetterModal"

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
