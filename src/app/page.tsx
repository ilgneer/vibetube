"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, MonitorPlay, Loader2, Music, Video, Zap, CassetteTape } from "lucide-react";

const RetrowaveBackground = () => (
  <div className="absolute inset-0 overflow-hidden z-0">
    <div className="absolute inset-0 bg-[#03001C]" />
    <div className="absolute bottom-1/2 left-0 right-0 h-96 bg-gradient-to-t from-fuchsia-600/80 via-purple-900/40 to-transparent blur-3xl opacity-60" />
    <div className="absolute bottom-0 left-0 right-0 h-1/2 w-full [perspective:500px] overflow-hidden">
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: [0, 40] }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="absolute inset-0 w-full h-[200%] origin-center [transform:rotateX(60deg)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(217, 70, 239, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(217, 70, 239, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
    <div className="absolute inset-0 bg-[url('/scanlines.png')] opacity-[0.03] pointer-events-none" />
  </div>
);

export default function Home() {
  const [url, setUrl] = useState("");
  const [formato, setFormato] = useState("mp4");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setCarregando(true);
    setMensagem("Initializing Vibe Transmission...");

    try {
      const response = await fetch("/api/baixar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url }),
      });

      if (!response.ok) throw new Error("Connection Interrupted.");

      const data = await response.json();

      if (data.status === "success" && data.url) {
        setMensagem("✅ Neon link established! Starting download...");
        window.open(data.url, "_blank");
      } else {
        throw new Error(data.text || "Vibe check failed. Try again.");
      }

    } catch (error) {
      console.error(error);
      setMensagem("❌ Static interference detected. Check link or API.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-mono">
      
      <RetrowaveBackground />

      {/* Cartão Responsivo: p-6 no mobile, p-8 no PC */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
        className="w-full max-w-xl z-10 bg-[#03001C]/70 backdrop-blur-xl border-2 border-violet-900 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_-10px_rgba(168,85,247,0.5)] relative overflow-hidden"
      >
        <motion.div
          animate={{ borderColor: ["#d946ef", "#22d3ee", "#d946ef"] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
        />

        <div className="flex flex-col items-center justify-center gap-3 mb-8 sm:mb-10 relative text-center">
          <motion.div 
            animate={{ rotateZ: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="p-3 bg-fuchsia-500/10 rounded-xl border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.5)]"
          >
            <CassetteTape className="w-8 h-8 sm:w-10 sm:h-10 text-fuchsia-400" />
          </motion.div>
          
          {/* Título Responsivo: Menor no celular (text-4xl), Maior no PC (sm:text-5xl) */}
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(232,121,249,0.8)] tracking-tighter">
            VibeTube
          </h1>
          <p className="text-[10px] sm:text-xs text-cyan-300 opacity-80 -mt-2 tracking-widest uppercase">Retro Media Extractor</p>
        </div>

        <form onSubmit={handleDownload} className="space-y-6 sm:space-y-8 relative">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-violet-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Insert YouTube Frequency (URL)
            </label>
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full px-4 py-3 sm:py-4 bg-[#010008] border-2 border-violet-900 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all placeholder:text-violet-800 text-cyan-200 shadow-inner text-sm sm:text-base break-all"
            />
          </div>

          {/* Botões empilhados no celular (grid-cols-1) e lado a lado no PC (sm:grid-cols-2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[ { id: "mp4", label: "Video (MP4)", icon: Video }, { id: "mp3", label: "Audio (MP3)", icon: Music } ].map((item) => (
              <motion.button
                key={item.id}
                type="button"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97, skewX: 5 }}
                onClick={() => setFormato(item.id)}
                className={` cursor-pointer flex items-center justify-center gap-3 py-3 sm:py-4 rounded-xl border-2 transition-all duration-300 font-bold uppercase tracking-wider text-xs sm:text-sm ${
                  formato === item.id 
                    ? "bg-fuchsia-600 border-fuchsia-400 text-white shadow-[0_0_20px_rgba(217,70,239,0.6)]" 
                    : "border-violet-800 bg-violet-950/40 text-violet-300 hover:border-fuchsia-800 hover:bg-fuchsia-950/20 shadow-none"
                }`}
              >
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5" /> {item.label}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={!carregando ? { scale: 1.03, boxShadow: "0 0 30px rgba(34,211,238,0.5)" } : {}}
            whileTap={!carregando ? { skewY: 2 } : {}}
            disabled={carregando || !url}
            className="cursor-pointer disabled:cursor-not-allowed w-full relative flex items-center justify-center gap-3 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:border-neutral-700 disabled:shadow-none text-white font-extrabold py-4 sm:py-5 rounded-xl transition-all duration-100 border-b-4 border-cyan-700 uppercase tracking-widest group overflow-hidden text-sm sm:text-base"
          >
            <div className={`absolute inset-0 ${carregando ? 'bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-cyan-600 animate-pulse' : 'bg-cyan-500'} group-hover:bg-cyan-400 transition-colors`}/>
            <div className="relative z-10 flex items-center gap-3">
              {carregando ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                  Synthesizing...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 sm:w-6 sm:h-6" /> Establish Downlink
                </>
              )}
            </div>
          </motion.button>
        </form>

        <AnimatePresence>
          {mensagem && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }}
              className="mt-6 sm:mt-8 text-center text-[10px] sm:text-xs text-cyan-400 bg-[#010008] p-3 rounded-lg border border-violet-900 shadow-inner tracking-tight"
            >
              &gt; {mensagem}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer Melhorado e mais visível */}
      <div className="z-10 mt-8 sm:mt-12 flex flex-col items-center text-violet-400 text-[10px] sm:text-xs tracking-widest uppercase opacity-80 hover:opacity-100 transition-opacity text-center px-4">
        <span>VibeTube Operational System v1.0 // Impulse Creates</span>
        <span className="mt-2 text-violet-300">
          Founder & Developer //{" "}
          <a 
            href="https://www.instagram.com/ilgner.mendes/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cyan-400 font-bold hover:text-fuchsia-400 hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] transition-all duration-300"
          >
            @ilgner.mendes
          </a>
        </span>
      </div>
    </main>
  );
}