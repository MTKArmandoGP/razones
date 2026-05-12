import Hero from "./components/Hero"
import CalendarGrid from "./components/CalendarGrid"
import FloatingHearts from "./components/FloatingHearts"

function App() {
  return (
    <main className="min-h-screen" style={{ background: "#fdf2f4", color: "#5b2d2d" }}>
      <FloatingHearts />
      <Hero />
      <div id="calendar">
        <CalendarGrid />
      </div>
    </main>
  )
}

export default App