import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  FiLink,
  FiZap,
  FiBarChart2,
  FiShield,
  FiSmartphone,
  FiSliders,
} from "react-icons/fi";

// ─── Floating Particles ───────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 28 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 3 + 2;
        const x = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = Math.random() * 12 + 12;
        const opacity = Math.random() * 0.35 + 0.08;
        const color = i % 2 === 0 ? "#007bff" : "#8a2be2";
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: size, height: size, left: `${x}%`, bottom: -10, opacity, background: color }}
            animate={{ y: [0, -(typeof window !== "undefined" ? window.innerHeight : 900) - 60] }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </div>
  );
}

// ─── Ambient Glow Blobs ───────────────────────────────────────────────────────
function GlowBlobs() {
  return (
    <>
      <div className="absolute top-[-220px] left-[-180px] w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,123,255,0.13) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute top-[180px] right-[-160px] w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(138,43,226,0.11) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute bottom-[100px] left-[30%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,123,255,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
    </>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const navigate = useNavigate();
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-4"
      style={{
        background: "rgba(10,10,10,0.55)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(0,123,255,0.12)",
        boxShadow: "0 2px 30px rgba(0,0,0,0.4)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #007bff, #8a2be2)" }}>
          <FiLink className="text-white" size={16} />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">
          Link<span style={{ color: "#007bff" }}>Folio</span>
        </span>
      </div>

      {/* Nav links — hidden on mobile */}
      <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
        <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
        <a href="#trusted" className="hover:text-white transition-colors duration-200">Trusted By</a>
        <a href="#cta" className="hover:text-white transition-colors duration-200">Pricing</a>
      </div>

      {/* Auth buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 text-sm font-medium text-gray-300 rounded-lg border transition-all duration-200"
          style={{ borderColor: "rgba(255,255,255,0.15)" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,123,255,0.6)"; e.currentTarget.style.color = "#60b4ff"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#d1d5db"; }}
        >
          Login
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/signup")}
          className="px-5 py-2 text-sm font-semibold text-white rounded-lg shadow-lg transition-all duration-200"
          style={{ background: "linear-gradient(135deg, #007bff, #8a2be2)", boxShadow: "0 4px 20px rgba(0,123,255,0.35)" }}
        >
          Sign Up
        </motion.button>
      </div>
    </motion.nav>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ Icon, title, desc, delay, accentColor }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="rounded-2xl p-7 flex flex-col gap-4 cursor-default group transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.border = `1px solid ${accentColor}55`;
        e.currentTarget.style.boxShadow = `0 0 28px ${accentColor}22`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}33` }}>
        <Icon size={22} style={{ color: accentColor }} />
      </div>
      <h3 className="text-white font-semibold text-lg">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// ─── Trusted By Logos ─────────────────────────────────────────────────────────
function TrustedBy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const logos = ["Notion", "Figma", "Vercel", "Linear", "Stripe", "GitHub"];
  return (
    <section id="trusted" ref={ref} className="py-16 px-6 max-w-5xl mx-auto text-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-xs uppercase tracking-widest text-gray-600 mb-8 font-medium"
      >
        Trusted by teams at
      </motion.p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
        {logos.map((name, i) => (
          <motion.span
            key={name}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="text-xl font-black tracking-tight"
            style={{ color: "rgba(255,255,255,0.12)", filter: "grayscale(1)" }}
          >
            {name}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

// ─── Hero Illustration ────────────────────────────────────────────────────────
function HeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
      className="relative flex items-center justify-center"
    >
      {/* Outer glow ring */}
      <div className="absolute w-[340px] h-[340px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,123,255,0.18) 0%, transparent 70%)", filter: "blur(30px)" }} />

      {/* Mock phone card */}
      <div className="relative w-[260px] rounded-[2.5rem] overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(160deg, rgba(20,20,35,0.95), rgba(10,10,20,0.98))",
          border: "1px solid rgba(0,123,255,0.25)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,123,255,0.12)",
        }}>
        {/* Status bar */}
        <div className="flex justify-between items-center px-6 pt-5 pb-2">
          <span className="text-[10px] text-gray-500">9:41</span>
          <div className="w-16 h-4 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center pt-4 pb-6 px-6 gap-3">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black text-white"
            style={{ background: "linear-gradient(135deg, #007bff, #8a2be2)" }}>
            JD
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-sm">John Doe</p>
            <p className="text-gray-500 text-[11px]">@johndoe · Designer</p>
          </div>

          {/* Link cards */}
          {["Portfolio", "Twitter / X", "GitHub", "Dribbble"].map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.12 }}
              className="w-full rounded-xl px-4 py-2.5 flex items-center justify-between text-xs font-medium text-white"
              style={{
                background: i === 0
                  ? "linear-gradient(135deg, rgba(0,123,255,0.35), rgba(138,43,226,0.35))"
                  : "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span>{label}</span>
              <span className="text-gray-500">→</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating stat badge */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 top-12 rounded-xl px-3 py-2 text-xs font-semibold text-white"
        style={{
          background: "rgba(0,123,255,0.2)",
          border: "1px solid rgba(0,123,255,0.35)",
          backdropFilter: "blur(10px)",
        }}
      >
        📈 +240 clicks today
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -left-6 bottom-16 rounded-xl px-3 py-2 text-xs font-semibold text-white"
        style={{
          background: "rgba(138,43,226,0.2)",
          border: "1px solid rgba(138,43,226,0.35)",
          backdropFilter: "blur(10px)",
        }}
      >
        ✨ Live in 2 min
      </motion.div>
    </motion.div>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { Icon: FiLink,       title: "One Link, Everything",  desc: "Share all your socials, projects, and content from a single personalized URL.",          accentColor: "#007bff", delay: 0 },
    { Icon: FiZap,        title: "Instant Setup",          desc: "Get your profile live in under 2 minutes. No coding required — just fill and publish.",   accentColor: "#8a2be2", delay: 0.08 },
    { Icon: FiBarChart2,  title: "Analytics Built-in",     desc: "Track clicks and engagement on every link you share with real-time insights.",            accentColor: "#007bff", delay: 0.16 },
    { Icon: FiSliders,    title: "Fully Customizable",     desc: "Choose themes, colors, and layouts that match your personal brand perfectly.",            accentColor: "#8a2be2", delay: 0.24 },
    { Icon: FiSmartphone, title: "Mobile First",           desc: "Looks stunning on every device. Optimized for the way your audience browses.",            accentColor: "#007bff", delay: 0.32 },
    { Icon: FiShield,     title: "Secure & Private",       desc: "Your data is protected with JWT auth and industry-standard security practices.",          accentColor: "#8a2be2", delay: 0.40 },
  ];

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden" style={{ background: "#0a0a0a" }}>
      <GlowBlobs />
      <Particles />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center px-6 md:px-14 pt-24 pb-16 max-w-7xl mx-auto">
        {/* Left column */}
        <div className="flex-1 flex flex-col items-start gap-6 max-w-xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "rgba(0,123,255,0.12)", border: "1px solid rgba(0,123,255,0.28)", color: "#60b4ff" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Your digital identity, simplified
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight"
            style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
          >
            One Link to{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #007bff 0%, #8a2be2 100%)" }}>
              Rule Them All
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48 }}
            className="text-lg text-gray-400 leading-relaxed"
          >
            Build your personal link-in-bio page in minutes. Share your socials, projects, and
            content — all from one beautiful, customizable profile.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            className="flex flex-col sm:flex-row items-start gap-4 mt-2"
          >
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: "0 8px 32px rgba(0,123,255,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
              className="px-8 py-3.5 text-base font-semibold rounded-xl text-white transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #007bff, #8a2be2)", boxShadow: "0 4px 24px rgba(0,123,255,0.35)" }}
            >
              Get Started — It's Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, borderColor: "rgba(0,123,255,0.6)", color: "#fff" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 text-base font-medium rounded-xl text-gray-400 border transition-all duration-200"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              Learn More ↓
            </motion.button>
          </motion.div>

          {/* Social proof micro-stat */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-3 mt-2"
          >
            <div className="flex -space-x-2">
              {["#007bff", "#8a2be2", "#06b6d4", "#f59e0b"].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center text-[9px] font-bold text-white"
                  style={{ background: c }}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              <span className="text-white font-semibold">2,400+</span> creators already onboard
            </p>
          </motion.div>
        </div>

        {/* Right column — illustration */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <HeroIllustration />
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-700 text-xs"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-gray-800 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-gray-600" />
          </motion.div>
          scroll
        </motion.div>
      </section>

      {/* ── Trusted By ── */}
      <TrustedBy />

      {/* ── Features ── */}
      <section id="features" className="relative px-6 md:px-14 pb-28 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#007bff" }}>
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Everything you need,{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #007bff, #8a2be2)" }}>
              nothing you don't
            </span>
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
            Powerful features designed to make your online presence effortless.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section id="cta" className="px-6 pb-28 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(0,123,255,0.1), rgba(138,43,226,0.12))",
            border: "1px solid rgba(0,123,255,0.2)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(0,123,255,0.08) 0%, transparent 70%)" }} />
          <h2 className="text-3xl md:text-4xl font-black text-white relative z-10">
            Ready to build your profile?
          </h2>
          <p className="mt-3 text-gray-400 text-base relative z-10">
            Join thousands of creators sharing their world with one link.
          </p>
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 8px 36px rgba(138,43,226,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/signup")}
            className="mt-8 px-10 py-3.5 text-base font-semibold rounded-xl text-white relative z-10 transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #007bff, #8a2be2)", boxShadow: "0 4px 24px rgba(138,43,226,0.35)" }}
          >
            Create Your Free Profile
          </motion.button>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t py-8 text-center text-gray-700 text-sm" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        © {new Date().getFullYear()} LinkFolio. Built with ❤️ for creators.
      </footer>
    </div>
  );
}
