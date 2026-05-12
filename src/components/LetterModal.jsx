import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import messages from "../data/messages"

/*
  LAYOUT (all absolute inside a 300×220 container):

  z-index stack (bottom → top):
    10  envelope back panel  (always visible, never moves)
    20  letter card          (starts hidden inside, rises UP to y=-170)
    30  envelope front body  (the bottom half with V-folds, covers letter while inside)
    40  flap                 (rotates open, always on top)
*/

const W = 300   // envelope width
const EH = 200  // envelope height

export default function LetterModal({ item, onClose, onPrev, onNext }) {
  // stage: "closed" | "opening" | "open"
  const [stage, setStage] = useState("closed")

  const currentIndex = messages.findIndex((m) => m.day === item.day)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < messages.length - 1

  // Reset animation each time a new day opens
  useEffect(() => {
    setStage("closed")
  }, [item.day])

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft" && hasPrev) onPrev()
      if (e.key === "ArrowRight" && hasNext) onNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [hasPrev, hasNext, onPrev, onNext, onClose])

  const handleOpen = () => {
    if (stage !== "closed") return
    setStage("opening")
    setTimeout(() => setStage("open"), 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "rgba(90,40,40,0.58)",
        backdropFilter: "blur(10px)",
        padding: "0 16px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <style>{`
        @keyframes floatBg {
          0%   { transform: translateY(0)    rotate(-5deg); }
          100% { transform: translateY(-14px) rotate(5deg); }
        }
        @keyframes twinkle {
          0%,100% { opacity:0; transform:scale(0.5); }
          50%     { opacity:1; transform:scale(1.3) rotate(20deg); }
        }
        .twinkle { animation: twinkle 1.8s ease-in-out infinite; }
      `}</style>

      {/* Botón de cerrar en esquina superior derecha de la pantalla */}
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 200,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#e87e8a",
          border: "none",
          color: "#fff",
          fontSize: 20,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(192,96,110,0.4)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        ×
      </button>

      {/* Backdrop hearts */}
      {["7%","23%","50%","72%","87%","40%"].map((left, i) => (
        <div key={i} style={{
          position:"absolute", left, top:`${8+i*13}%`,
          fontSize: 11+i*3, color:"#ffc4d0", opacity:0.22, pointerEvents:"none",
          animation:`floatBg ${3+i*0.7}s ease-in-out infinite alternate`,
        }}>♥</div>
      ))}

      {/* Prev */}
      <button
        onClick={hasPrev ? onPrev : undefined}
        disabled={!hasPrev}
        style={{
          position:"absolute", left:24,
          display:"flex", flexDirection:"column", alignItems:"center", gap:6,
          background:"none", border:"none", cursor: hasPrev ? "pointer" : "default",
          color:"rgba(255,255,255,0.7)", opacity: hasPrev ? 1 : 0.2,
        }}
      >
        <div style={{
          width:44, height:44, borderRadius:"50%",
          background:"rgba(255,255,255,0.2)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:24,
        }}>‹</div>
        <span style={{ fontSize:11 }}>Día anterior</span>
      </button>

      {/* ── Scene ── */}
      <motion.div
        key={item.day}
        initial={{ scale:0.85, opacity:0, y:20 }}
        animate={{ scale:1, opacity:1, y:0 }}
        transition={{ type:"spring", stiffness:280, damping:24 }}
        style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center" }}
      >
        {/* Day label */}
        <div style={{ textAlign:"center", marginBottom:16 }}>
          <p style={{ color:"rgba(255,255,255,0.88)", fontSize:13, letterSpacing:"0.15em", fontFamily:"Georgia,serif", margin:0 }}>
            {item.title}
          </p>
          <p style={{ color:"#ffc4d0", fontSize:16, margin:"4px 0 0" }}>♥</p>
        </div>

        {/*
          ENVELOPE SCENE
          Total container height = EH (envelope) so overflow:hidden clips letter
          until it's fully risen. The letter starts at y=0 (inside envelope)
          and rises to y=-(letterHeight + gap).
        */}
        <div
          onClick={handleOpen}
          style={{
            position:"relative",
            width: W,
            height: EH,
            cursor: stage === "closed" ? "pointer" : "default",
            overflow: stage === "closed" ? "hidden" : "visible",
          }}
        >
          {/*── 10: Envelope back (always) ──*/}
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(160deg,#f5cdd2,#e8a8b4)",
            borderRadius:20,
            zIndex:10,
            boxShadow:"0 8px 32px rgba(192,96,110,0.3)",
          }}/>

          {/*── 20: Letter card (starts inside, rises up) ──*/}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={
              stage === "closed"
                ? { y: 60, opacity: 0 }
                : stage === "opening"
                ? { y: 60, opacity: 0 }
                : { y: -185, opacity: 1 }
            }
            transition={{
              y: { delay: 0.55, duration: 0.9, ease: [0.34,1.3,0.64,1] },
              opacity: { delay: 0.55, duration: 0.4 },
            }}
            style={{
              position:"absolute",
              left:14, right:14,
              bottom:10,
              zIndex: stage === "open" ? 100 : 20,
            }}
          >
            <div style={{
              background:"#fffaf9",
              borderRadius:16,
              padding:"22px 20px 18px",
              boxShadow:"0 12px 48px rgba(192,96,110,0.28)",
              border:"1px solid #fce8ec",
              position:"relative",
            }}>
              {/* Ruled lines */}
              {[0,1,2].map(i => (
                <div key={i} style={{ height:1, background:"#fce8ec", marginBottom:8, borderRadius:1 }}/>
              ))}
              <p style={{
                fontFamily:"Georgia,serif", fontSize:14, lineHeight:1.85,
                color:"#5b2d2d", fontStyle:"italic", textAlign:"center",
                margin:"10px 0 14px",
              }}>
                {item.text}
              </p>
              <div style={{ textAlign:"center", color:"#e8a0a8", fontSize:18 }}>♡</div>

              {stage === "open" && (
                <>
                  <span className="twinkle" style={{ position:"absolute", top:-8, right:-6, fontSize:13, color:"#f9a8c9" }}>✦</span>
                  <span className="twinkle" style={{ position:"absolute", top:-3, left:-7, fontSize:10, color:"#f9c4d0", animationDelay:"0.7s" }}>✦</span>
                </>
              )}
            </div>
          </motion.div>

          {/*── 30: Envelope front body (covers letter while inside) ──*/}
          <div style={{
            position:"absolute", left:0, right:0, bottom:0,
            height: EH * 0.65,
            zIndex:30,
            overflow:"hidden",
            borderRadius:"0 0 20px 20px",
          }}>
            {/* V-fold left */}
            <div style={{
              position:"absolute", bottom:0, left:0, width:"50%", height:"100%",
              background:"rgba(210,138,152,0.38)",
              clipPath:"polygon(0 100%, 100% 0, 0 0)",
            }}/>
            {/* V-fold right */}
            <div style={{
              position:"absolute", bottom:0, right:0, width:"50%", height:"100%",
              background:"rgba(210,138,152,0.38)",
              clipPath:"polygon(100% 100%, 0 0, 100% 0)",
            }}/>
          </div>

          {/*── Wax seal (fades out when opening) ──*/}
          <motion.div
            animate={{ opacity: stage === "closed" ? 1 : 0, scale: stage === "closed" ? 1 : 0.5 }}
            transition={{ duration: 0.35 }}
            style={{
              position:"absolute", bottom:35, left:"45%", transform:"translateX(-50%)",
              width:34, height:34, borderRadius:"50%",
              background:"#c0606e", color:"#fff", fontSize:17,
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 3px 10px rgba(192,96,110,0.5)",
              zIndex:31,
              pointerEvents:"none",
            }}
          >♥</motion.div>

          {/*── Tap hint (only when closed) ──*/}
          {stage === "closed" && (
            <div style={{
              position:"absolute", bottom:8, left:0, right:0,
              textAlign:"center", color:"rgba(255,255,255,0.6)",
              fontSize:11, letterSpacing:"0.1em", zIndex:50,
            }}>
              toca para abrir
            </div>
          )}

          {/*── 40: Envelope flap (rotates open) con polígonos ajustados ──*/}
          <div style={{
            position:"absolute", top:0, left:0, right:0,
            zIndex:40,
            perspective:700,
          }}>
            <motion.div
              animate={{ rotateX: stage !== "closed" ? -175 : 0 }}
              transition={{ duration:0.75, ease:[0.4,0,0.2,1] }}
              style={{ transformOrigin:"top center" }}
            >
              <svg width={W} height={100} viewBox={`0 0 ${W} 100`} style={{ display:"block" }}>
                <defs>
                  <linearGradient id="flapA" x1="0" y1="0" x2="0.6" y2="1">
                    <stop offset="0%" stopColor="#f0c0c8"/>
                    <stop offset="100%" stopColor="#dda0a8"/>
                  </linearGradient>
                  <linearGradient id="flapB" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#fce8ec"/>
                    <stop offset="100%" stopColor="#f5d0d5"/>
                  </linearGradient>
                </defs>
                {/* Cara exterior con márgenes: 10px laterales, 2px arriba */}
                <polygon points="10,2 290,2 150,98" fill="url(#flapA)" stroke="#e8b4b8" strokeWidth="1"/>
                {/* Cara interior con los mismos márgenes y punta ligeramente más alta */}
                <polygon points="10,2 290,2 150,90" fill="url(#flapB)" opacity="0.6"/>
              </svg>
            </motion.div>
          </div>
        </div>{/* end scene */}

        {/* Song button — fades in when open */}
        <motion.div
          animate={{ opacity: stage === "open" ? 1 : 0, y: stage === "open" ? 0 : 8 }}
          transition={{ delay:0.2, duration:0.5 }}
          style={{ marginTop:18 }}
        >
          {item.song && (
            <button style={{
              display:"flex", alignItems:"center", gap:8,
              padding:"10px 22px", borderRadius:999,
              background:"rgba(255,255,255,0.92)",
              color:"#c0606e", fontSize:13,
              fontFamily:"Georgia,serif",
              border:"1px solid #f9d0d8",
              boxShadow:"0 4px 18px rgba(192,96,110,0.18)",
              cursor:"pointer", backdropFilter:"blur(4px)",
            }}>
              <span>♪</span>
              <span>{item.song}</span>
            </button>
          )}
        </motion.div>
      </motion.div>

      {/* Next */}
      <button
        onClick={hasNext ? onNext : undefined}
        disabled={!hasNext}
        style={{
          position:"absolute", right:24,
          display:"flex", flexDirection:"column", alignItems:"center", gap:6,
          background:"none", border:"none", cursor: hasNext ? "pointer" : "default",
          color:"rgba(255,255,255,0.7)", opacity: hasNext ? 1 : 0.2,
        }}
      >
        <div style={{
          width:44, height:44, borderRadius:"50%",
          background:"rgba(255,255,255,0.2)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:24,
        }}>›</div>
        <span style={{ fontSize:11 }}>Siguiente día</span>
      </button>
    </motion.div>
  )
}