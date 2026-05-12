import { motion } from "framer-motion"

function DayCard({ item, onOpen }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => onOpen(item)}
      className="aspect-square cursor-pointer relative group"
      style={{
        borderRadius: "20px",
        background: "linear-gradient(135deg, #fce8ec, #f9d0d8)",
        boxShadow: "0 4px 20px rgba(192, 96, 110, 0.15)",
      }}
    >
      {/* Envelope flap decoration */}
      <div
        className="absolute top-0 left-0 right-0 rounded-t-[20px] overflow-hidden"
        style={{ height: "45%" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            borderLeft: "50% solid transparent",
            borderRight: "50% solid transparent",
            borderTop: "100% solid rgba(232, 180, 184, 0.7)",
          }}
        />
      </div>

      {/* Envelope bottom seam lines */}
      <div className="absolute inset-0 rounded-[20px] overflow-hidden">
        <div
          className="absolute"
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            height: "55%",
            background: "linear-gradient(135deg, rgba(232,180,184,0.3) 0%, transparent 50%, rgba(232,180,184,0.3) 100%)",
          }}
        />
      </div>

      {/* Day number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <p
          className="text-[#7a2b35] font-light"
          style={{ fontSize: "clamp(20px, 4vw, 28px)", fontFamily: "'Georgia', serif" }}
        >
          {item.day}
        </p>
        <p
          className="text-[#c0606e] mt-1 group-hover:scale-110 transition-transform"
          style={{ fontSize: "clamp(14px, 3vw, 18px)" }}
        >
          ♥
        </p>
      </div>

      {/* Hover shimmer */}
      <div
        className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)",
        }}
      />
    </motion.div>
  )
}

export default DayCard
