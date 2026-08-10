"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gamepad2, Navigation, Touchpad, Smartphone, Laptop, Sparkles, MoveRight, Pointer } from "lucide-react";

export default function GtaWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Only pop up if user has never visited before
    const hasVisited = localStorage.getItem("gta_portfolio_visited");
    if (!hasVisited) {
      setIsOpen(true);
    }

    if (typeof window !== "undefined") {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("gta_portfolio_visited", "true");
    setIsOpen(false);
  };

  // Keyboard shortcut listener to close welcome popup (Enter / Space / Esc)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (["enter", "escape", " ", "q", "e"].includes(key)) {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md select-none">
          {/* Backdrop Click */}
          <div className="absolute inset-0" onClick={handleClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl bg-[#121212] text-white border-2 border-[#fabb15]/70 rounded-sm shadow-[0_0_60px_rgba(250,187,21,0.25)] overflow-hidden flex flex-col font-sans"
          >
            {/* Header Banner */}
            <div className="relative p-4 sm:p-6 bg-gradient-to-r from-black via-[#1c1c1c] to-black border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 bg-[#fabb15] text-black rounded-sm shadow-md">
                  {isTouchDevice ? <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" /> : <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#fabb15] text-black text-[9px] sm:text-[10px] font-bold tracking-wider rounded-sm font-gta uppercase">
                      FIRST ACCESS BRIEFING
                    </span>
                    <span className="hidden sm:inline-block text-gray-400 text-xs font-semibold tracking-wider">
                      PORTFOLIO OS v2.0
                    </span>
                  </div>
                  <h2 className="font-gta text-xl sm:text-3xl text-white tracking-wide uppercase mt-0.5 sm:mt-1 leading-none">
                    WELCOME, PLAYER 1
                  </h2>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="px-2.5 py-1 bg-white/10 hover:bg-white text-white hover:text-black text-xs font-bold font-gta tracking-wider border border-white/20 rounded-sm transition-all flex items-center gap-1 shrink-0"
              >
                <X className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">ESC</span>
              </button>
            </div>

            {/* Body Message & Controls */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto max-h-[75vh]">
              {/* Welcome Greetings */}
              <div className="p-3.5 sm:p-4 bg-white/5 border border-white/10 rounded-sm">
                <p className="text-gray-200 text-xs sm:text-base leading-relaxed font-medium">
                  Welcome to <strong className="text-[#fabb15]">Hazeeq Najmuddin's Interactive Portfolio.</strong> A GTA V-themed experience showcasing full-stack engineering, QA automation, and technical projects.
                </p>
              </div>

              {/* MOBILE SPECIFIC TOUCH CONTROLS */}
              <div className="block sm:hidden space-y-2.5">
                <h3 className="font-gta text-base text-[#fabb15] tracking-wider uppercase flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#00a8ff]" /> MOBILE TOUCH CONTROLS
                </h3>

                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="p-2.5 bg-black/60 border border-white/10 rounded-sm flex items-center gap-3">
                    <div className="p-2 bg-[#fabb15]/20 text-[#fabb15] rounded shrink-0">
                      <Pointer className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white uppercase text-xs">TAP ANY CARD OR BANNER</div>
                      <div className="text-gray-400 text-[11px]">Inspect story dossiers, system specs, and live project links</div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-black/60 border border-white/10 rounded-sm flex items-center gap-3">
                    <div className="p-2 bg-[#fabb15]/20 text-[#fabb15] rounded shrink-0">
                      <MoveRight className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white uppercase text-xs">SWIPE CAROUSELS & TIMELINES</div>
                      <div className="text-gray-400 text-[11px]">Swipe sideways or scroll down to discover experience cards</div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-black/60 border border-white/10 rounded-sm flex items-center gap-3">
                    <div className="p-2 bg-[#fabb15]/20 text-[#fabb15] rounded shrink-0">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white uppercase text-xs">HEADER TAB NAVIGATION</div>
                      <div className="text-gray-400 text-[11px]">Tap menu items at top header to navigate between views</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* DESKTOP KEYBOARD CONTROLS (Displayed on Desktop or alongside Mobile) */}
              <div className="hidden sm:block">
                <h3 className="font-gta text-lg text-[#fabb15] tracking-wider mb-3 uppercase flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-[#00a8ff]" /> KEYBOARD CONTROLS (WASD SYSTEM)
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  {/* WASD Cards Grid */}
                  <div className="p-3 bg-black/60 border border-white/10 rounded-sm flex items-start gap-3">
                    <div className="flex gap-1 shrink-0 mt-0.5">
                      <kbd className="bg-white text-black px-1.5 py-0.5 rounded font-bold text-xs">W</kbd>
                      <kbd className="bg-white text-black px-1.5 py-0.5 rounded font-bold text-xs">A</kbd>
                      <kbd className="bg-white text-black px-1.5 py-0.5 rounded font-bold text-xs">S</kbd>
                      <kbd className="bg-white text-black px-1.5 py-0.5 rounded font-bold text-xs">D</kbd>
                    </div>
                    <div>
                      <div className="font-bold text-white uppercase">Grid Navigation</div>
                      <div className="text-gray-400 text-xs">Move focus between cards and sections</div>
                    </div>
                  </div>

                  {/* Move Tabs Q / E */}
                  <div className="p-3 bg-black/60 border border-white/10 rounded-sm flex items-start gap-3">
                    <div className="flex gap-1 shrink-0 mt-0.5">
                      <kbd className="bg-white text-black px-1.5 py-0.5 rounded font-bold text-xs">Q</kbd>
                      <kbd className="bg-white text-black px-1.5 py-0.5 rounded font-bold text-xs">E</kbd>
                    </div>
                    <div>
                      <div className="font-bold text-white uppercase">Switch Main Tabs</div>
                      <div className="text-gray-400 text-xs">Navigate between About, Projects, Certs</div>
                    </div>
                  </div>

                  {/* Inspect / Enter */}
                  <div className="p-3 bg-black/60 border border-white/10 rounded-sm flex items-start gap-3">
                    <div className="flex gap-1 shrink-0 mt-0.5">
                      <kbd className="bg-white text-black px-1.5 py-0.5 rounded font-bold text-xs">↵</kbd>
                    </div>
                    <div>
                      <div className="font-bold text-white uppercase">Inspect / Open Card</div>
                      <div className="text-gray-400 text-xs">Press Enter or Click to view pop-up dossier</div>
                    </div>
                  </div>

                  {/* In-Modal Controls */}
                  <div className="p-3 bg-black/60 border border-white/10 rounded-sm flex items-start gap-3">
                    <div className="flex gap-1 shrink-0 mt-0.5">
                      <kbd className="bg-white/20 text-white px-1.5 py-0.5 rounded font-bold text-xs">ESC</kbd>
                    </div>
                    <div>
                      <div className="font-bold text-white uppercase">Close Pop-up / Exit</div>
                      <div className="text-gray-400 text-xs">Press ESC or Q to close active popup</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Action Footer */}
            <div className="p-3.5 sm:p-4 bg-black/80 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
                <Sparkles className="w-3.5 h-3.5 text-[#fabb15]" />
                <span>Tip: Full keyboard and mouse/touch controls supported.</span>
              </div>

              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#fabb15] hover:bg-[#e0a710] text-black font-gta text-base sm:text-lg tracking-wider rounded-sm shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 font-bold uppercase"
              >
                <span>START EXPLORING</span>
                <kbd className="hidden sm:inline-block bg-black text-white px-2 py-0.5 rounded text-xs font-sans font-bold">↵ ENTER</kbd>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
