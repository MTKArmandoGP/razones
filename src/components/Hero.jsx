import { motion } from "framer-motion"

function Hero() {
  const scrollToCalendar = () => {
    document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fff0f3 0%, #fde8ee 50%, #fdf2f4 100%)" }}
    >
      {/* Decorative background hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: "8%", left: "7%", size: 18, opacity: 0.15 },
          { top: "15%", right: "10%", size: 12, opacity: 0.12 },
          { top: "70%", left: "5%", size: 22, opacity: 0.1 },
          { top: "80%", right: "8%", size: 16, opacity: 0.12 },
          { top: "40%", left: "3%", size: 10, opacity: 0.08 },
          { top: "55%", right: "4%", size: 14, opacity: 0.1 },
        ].map((h, i) => (
          <div
            key={i}
            className="absolute text-rose-400"
            style={{
              top: h.top,
              left: h.left,
              right: h.right,
              fontSize: h.size,
              opacity: h.opacity,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#c0606e] mb-5 tracking-widest text-sm uppercase"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          ♥ Para ti ♥
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-[#5b2d2d] font-light leading-tight"
          style={{
            fontSize: "clamp(42px, 8vw, 80px)",
            fontFamily: "'Georgia', serif",
          }}
        >
          Razones
          <br />
          por las que
          <br />
          <span className="italic text-[#c0606e]">me gustas</span>
        </motion.h1>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-3 my-7"
        >
          <div className="h-px w-16 bg-rose-200" />
          <span className="text-rose-300 text-xl">♥</span>
          <div className="h-px w-16 bg-rose-200" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-[#9b6070] text-lg leading-relaxed max-w-md mx-auto"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Por el poco tiempo que hemos salido y hablado he identificado estas razones por las que siento que te quiero
        </motion.p>

        {/* Corner notes (like the design reference) */}
        

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10"
        >
          <button
            onClick={scrollToCalendar}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #d4607a, #c0606e)",
              fontFamily: "'Georgia', serif",
              fontSize: 16,
              letterSpacing: "0.02em",
            }}
          >
            Comenzar
            <span className="text-pink-200">♥</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 text-[#c0606e] opacity-40"
        style={{ animation: "bounce 2s infinite" }}
      >
        <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }`}</style>
        ↓
      </motion.div>
    </section>
  )
}

export default Hero
