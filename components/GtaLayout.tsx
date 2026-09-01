"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, FileText, Volume2, VolumeX, X } from "lucide-react";
import { gtaSound } from "@/utils/gtaSounds";

const TABS = [
  { name: "HOME", mobileName: "HOME", path: "/" },
  { name: "ABOUT", mobileName: "ABOUT", path: "/about" },
  { name: "PROJECTS", mobileName: "PROJECTS", path: "/projects" },
  { name: "CERTS", mobileName: "CERTS", path: "/certs" },
  { name: "CONNECT WITH ME", mobileName: "CONNECT", path: "/connect" },
];

interface SoundMuteButtonProps {
  className?: string;
}

export function SoundMuteButton({ className = "" }: SoundMuteButtonProps) {
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    setIsMuted(gtaSound.getMutedState());
    const unsubscribe = gtaSound.subscribe((muted) => {
      setIsMuted(muted);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    gtaSound.toggleMute();
  };

  return (
    <button
      type="button"
      onClick={handleToggleMute}
      className={`relative bg-black/80 border p-1.5 sm:p-2 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center select-none shadow-md group ${
        isMuted
          ? "border-red-500/40 hover:border-red-400 bg-red-950/20 text-red-400 hover:text-red-300"
          : "border-white/20 hover:border-[#fabb15] text-[#fabb15] hover:text-white"
      } ${className}`}
      title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
      aria-label={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
    >
      {isMuted ? (
        <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:scale-110" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:scale-110" />
      )}
    </button>
  );
}

interface ModeToggleSwitchProps {
  isSimpleMode?: boolean;
}

export function ModeToggleSwitch({ isSimpleMode = false }: ModeToggleSwitchProps) {
  const router = useRouter();
  const [showRecruiterTip, setShowRecruiterTip] = useState<boolean>(false);

  useEffect(() => {
    if (!isSimpleMode && typeof window !== "undefined") {
      try {
        const seen = sessionStorage.getItem("gta_recruiter_tip_dismissed") || localStorage.getItem("gta_recruiter_tip_dismissed");
        if (!seen) {
          const timer = setTimeout(() => {
            setShowRecruiterTip(true);
          }, 400);
          return () => clearTimeout(timer);
        }
      } catch {
        setShowRecruiterTip(true);
      }
    }
  }, [isSimpleMode]);

  const dismissTip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShowRecruiterTip(false);
    try {
      sessionStorage.setItem("gta_recruiter_tip_dismissed", "true");
      localStorage.setItem("gta_recruiter_tip_dismissed", "true");
    } catch {
      // Ignore
    }
  };

  const handleToggle = () => {
    dismissTip();
    gtaSound.playToggle();
    router.push(isSimpleMode ? "/" : "/simple");
  };

  return (
    <div className="relative">
      <div 
        role="button"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
        className="relative bg-black/80 border border-white/20 hover:border-[#fabb15] p-1 rounded-full cursor-pointer transition-all flex items-center gap-1 select-none shadow-md group focus:outline-none focus:ring-2 focus:ring-[#fabb15]"
        title={isSimpleMode ? "Switch to GTA Interactive Mode (Press M)" : "Switch to Recruiter Simple Mode (Press M)"}
        aria-label={isSimpleMode ? "Switch to GTA Interactive Mode" : "Switch to Recruiter Simple Mode"}
      >
        {/* GTA Interactive Option Pill */}
        <div 
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-gta tracking-wider transition-all duration-300 ${
            !isSimpleMode 
              ? "bg-[#fabb15] text-black font-bold shadow-md scale-105" 
              : "text-gray-400 group-hover:text-white"
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">INTERACTIVE</span>
        </div>

        {/* Switch Track Dot Indicator */}
        <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${!isSimpleMode ? "bg-[#fabb15]" : "bg-blue-400"}`} />

        {/* Recruiter Simple Option Pill */}
        <div 
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-gta tracking-wider transition-all duration-300 ${
            isSimpleMode 
              ? "bg-blue-500 text-white font-bold shadow-md scale-105" 
              : "text-gray-400 group-hover:text-white"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">RECRUITER</span>
        </div>
      </div>

      {/* Dismissible First-Visit Recruiter Tooltip */}
      <AnimatePresence>
        {showRecruiterTip && !isSimpleMode && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={handleToggle}
            className="absolute top-full right-0 mt-3 z-[100] w-64 sm:w-72 p-3 bg-[#141416] border border-[#fabb15]/80 rounded shadow-[0_12px_32px_rgba(0,0,0,0.95)] cursor-pointer group hover:border-[#fabb15]"
          >
            {/* Pointer Triangle */}
            <div className="absolute -top-1.5 right-6 w-3 h-3 bg-[#141416] border-t border-l border-[#fabb15]/80 rotate-45" />

            <div className="flex items-start justify-between gap-2 relative z-10">
              <div className="flex items-start gap-2">
                <span className="text-lg leading-none mt-0.5">💼</span>
                <div className="space-y-1 text-left">
                  <p className="text-xs font-bold font-gta text-[#fabb15] tracking-wider uppercase flex items-center gap-1.5">
                    <span>RECRUITER / HR REVIEW?</span>
                  </p>
                  <p className="text-[11px] text-gray-200 font-normal leading-snug">
                    Click here or press <span className="text-black font-bold bg-[#fabb15] px-1 py-0.2 rounded text-[10px]">M</span> for clean single-page Resume view.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={dismissTip}
                aria-label="Dismiss Recruiter Tip"
                className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors shrink-0 -mr-1 -mt-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface GtaLayoutProps {
  children: React.ReactNode;
  footerText: string;
  rightBadge?: string;
  mainContainerClass?: string;
  activeTab?: string;
  onTabChange?: (path: string) => void;
}

export default function GtaLayout({ 
  children, 
  footerText, 
  rightBadge,
  mainContainerClass = "flex-grow overflow-hidden", // Default class
  activeTab,
  onTabChange
}: GtaLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = activeTab || pathname;

  const handleTabClick = (path: string) => {
    gtaSound.playTabSwitch();
    if (onTabChange) {
      onTabChange(path);
    } else {
      router.push(path);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = TABS.findIndex((tab) => tab.path === currentPath);
      const key = e.key.toLowerCase();
      
      // Mute Toggle on 'U'
      if (key === "u") {
        e.preventDefault();
        gtaSound.toggleMute();
        return;
      }

      // Mode switch on 'M'
      if (key === "m") {
        e.preventDefault();
        gtaSound.playToggle();
        router.push("/simple");
        return;
      }

      // Q: Previous Tab
      if (key === "q") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + TABS.length) % TABS.length;
        handleTabClick(TABS[prevIndex].path);
      }
      
      // E: Next Tab
      if (key === "e") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % TABS.length;
        handleTabClick(TABS[nextIndex].path);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  return (
    <div className="h-screen h-[100dvh] bg-black text-white p-3 sm:p-5 md:p-6 flex flex-col font-sans select-none overflow-hidden">
      
      {/* 2. SINGLE NAVIGATION BAR */}
      <div className="relative z-30 flex justify-between items-center mb-2 sm:mb-4 shrink-0 gap-2">
        <nav className="flex gap-2 sm:gap-4 md:gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden shrink py-1">
          {TABS.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.path)}
              className={`px-2.5 sm:px-4 py-1 text-xs sm:text-sm md:text-base font-medium tracking-wide transition-colors whitespace-nowrap ${
                currentPath === tab.path
                  ? "bg-white text-black font-bold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <span className="hidden md:inline">{tab.name}</span>
              <span className="inline md:hidden">{tab.mobileName}</span>
            </button>
          ))}
        </nav>
        
        {/* Right Action: Mute Button & Recruiter Simple View Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <SoundMuteButton />
          <ModeToggleSwitch isSimpleMode={false} />
          {rightBadge && (
            <div className="hidden sm:block shrink-0 bg-white text-black font-gta px-2.5 py-1 text-xs sm:text-sm md:text-base tracking-wider rounded-sm shadow-md">
              {rightBadge}
            </div>
          )}
        </div>
      </div>

      {/* 3. SINGLE ANIMATED PAGE WRAPPER */}
      <motion.div 
        key={currentPath}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`${mainContainerClass} flex-1 min-h-0`}
      >
        {children}
      </motion.div>

      {/* 4. SINGLE FOOTER */}
      <footer className="flex justify-between items-center shrink-0 mt-auto pt-2 border-t border-white/10 gap-2 min-h-[36px]">
        <div className="text-gray-200 text-xs sm:text-sm md:text-base max-w-2xl line-clamp-2 md:line-clamp-none font-medium">
          {footerText}
        </div>
        
        {/* Static Keyboard Controls for Desktop */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium text-gray-300 shrink-0">
          <div className="flex items-center gap-1.5">
            <span>Mode</span><span className="bg-[#fabb15] text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">M</span>
          </div>
          
          {/* WASD CONTROLS */}
          <div className="flex items-center gap-1">
            <span className="mr-1">Navigate</span>
            <span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">W</span>
            <span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">A</span>
            <span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">S</span>
            <span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">D</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Move Tab</span>
            <span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">Q</span>
            <span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">E</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Mute</span><span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">U</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Select</span><span className="bg-[#fabb15] text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">ENTER</span>
          </div>
        </div>

        {/* Compact touch tip for smaller screens */}
        <div className="lg:hidden text-[10px] text-gray-400 font-medium shrink-0">
          <span className="bg-white/20 text-white px-1.5 py-0.5 rounded font-bold">TAP CARD</span>
        </div>
      </footer>
    </div>
  );
}