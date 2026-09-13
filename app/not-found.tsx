"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Home, FileText, AlertTriangle } from "lucide-react";
import { gtaSound } from "@/utils/gtaSounds";

export default function NotFound() {
  useEffect(() => {
    // Play sound on 404 mount
    try {
      gtaSound.playBack();
    } catch {
      // Ignore
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "enter" || e.key === " ") {
        window.location.href = "/";
      } else if (e.key.toLowerCase() === "m") {
        window.location.href = "/simple";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full bg-black flex flex-col items-center justify-center p-4 overflow-hidden select-none">
      {/* Background vignette & atmospheric glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/40 via-black to-black pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-lg w-full text-center space-y-6">
        {/* WASTED / MISSION FAILED Banner */}
        <div className="relative inline-block py-2 px-8 bg-red-900/40 border-y-2 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)]">
          <div className="flex items-center justify-center gap-2 text-red-400 text-xs font-bold tracking-widest uppercase mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>MISSION FAILED</span>
          </div>
          <h1 className="font-gta text-6xl sm:text-8xl text-red-500 tracking-wider uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] animate-pulse">
            WASTED
          </h1>
        </div>

        {/* Error Code & Details */}
        <div className="space-y-2">
          <h2 className="font-gta text-2xl sm:text-3xl text-white tracking-wide uppercase">
            404 - COORDINATES UNKNOWN
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            The requested page does not exist in Los Santos or this portfolio codebase.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            onClick={() => gtaSound.playSelect()}
            className="w-full sm:w-auto px-6 py-3 bg-[#fabb15] hover:bg-[#e0a710] text-black font-gta text-lg tracking-wider rounded-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 group"
          >
            <Home className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
            <span>RESPAWN (HOME)</span>
          </Link>

          <Link
            href="/simple"
            onClick={() => gtaSound.playSelect()}
            className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-gta text-lg tracking-wider rounded-sm border border-white/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <FileText className="w-5 h-5 text-[#fabb15]" />
            <span>SIMPLE MODE</span>
          </Link>
        </div>

        {/* Footer Hint */}
        <p className="hidden md:block text-gray-400 text-xs tracking-wider pt-4">
          Press <kbd className="px-1.5 py-0.5 bg-white/20 text-white rounded font-mono font-bold">ENTER</kbd> to respawn or <kbd className="px-1.5 py-0.5 bg-[#fabb15] text-black rounded font-mono font-bold">M</kbd> for Simple Mode.
        </p>
      </div>
    </div>
  );
}
