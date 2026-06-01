import { useState } from "react"
import Hero from "./components/Hero"
import CalendarGrid from "./components/CalendarGrid"
import FloatingHearts from "./components/FloatingHearts"
import LandingPage from "./components/LandingPage"
import ProposalPage from "./components/ProposalPage"
import DateInvitePage from "./components/DateInvitePage"
import TimelinePage from "./components/TimelinePage"

function App() {
  // "landing" | "calendar" | "proposal" | "date" | "timeline"
  const [page, setPage] = useState("landing")

  if (page === "proposal") {
    return <ProposalPage onBack={() => setPage("landing")} />
  }

  if (page === "date") {
    return <DateInvitePage onBack={() => setPage("landing")} />
  }

  if (page === "timeline") {
    return <TimelinePage onBack={() => setPage("landing")} />
  }

  if (page === "calendar") {
    return (
      <main className="min-h-screen" style={{ background: "#fdf2f4", color: "#5b2d2d" }}>
        <FloatingHearts />
        <button
          onClick={() => setPage("landing")}
          style={{
            position: "fixed", top: 20, left: 20, zIndex: 100,
            background: "rgba(255,255,255,0.8)",
            border: "1px solid #fce8ec",
            borderRadius: "50%",
            width: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#c0606e", fontSize: 20,
            backdropFilter: "blur(8px)",
            boxShadow: "0 2px 12px rgba(192,96,110,0.15)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          ‹
        </button>
        <Hero />
        <div id="calendar">
          <CalendarGrid />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ background: "#fdf2f4" }}>
      <FloatingHearts />
      <LandingPage
        onGoCalendar={() => setPage("calendar")}
        onGoProposal={() => setPage("proposal")}
        onGoDate={() => setPage("date")}
        onGoTimeline={() => setPage("timeline")}
      />
    </main>
  )
}

export default App
