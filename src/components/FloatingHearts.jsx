import { useEffect, useState } from "react"

function Heart({ style }) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{ ...style, animation: `floatUp ${style.duration}s ease-in infinite`, animationDelay: style.delay }}
    >
      ♥
    </div>
  )
}

function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      bottom: `-20px`,
      fontSize: `${10 + Math.random() * 18}px`,
      opacity: 0.15 + Math.random() * 0.35,
      duration: 6 + Math.random() * 8,
      delay: `${Math.random() * 10}s`,
      color: ["#f9a8c9", "#f48fb1", "#e91e8c", "#fce4ec", "#d81b60"][Math.floor(Math.random() * 5)],
    }))
    setHearts(generated)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) rotate(20deg); opacity: 0; }
        }
      `}</style>
      {hearts.map((h) => (
        <Heart
          key={h.id}
          style={{
            left: h.left,
            bottom: h.bottom,
            fontSize: h.fontSize,
            opacity: h.opacity,
            color: h.color,
            duration: h.duration,
            delay: h.delay,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingHearts
