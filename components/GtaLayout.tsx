"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, FileText, Volume2, VolumeX, X, Home, User, FolderGit2, Award, Send } from "lucide-react";
import { gtaSound } from "@/utils/gtaSounds";

const TABS = [
  { name: "HOME", mobileName: "HOME", path: "/", icon: Home },
  { name: "ABOUT", mobileName: "ABOUT", path: "/about", icon: User },
  { name: "PROJECTS", mobileName: "PROJECTS", path: "/projects", icon: FolderGit2 },
  { name: "CERTS", mobileName: "CERTS", path: "/certs", icon: Award },
  { name: "CONNECT WITH ME", mobileName: "CONNECT", path: "/connect", icon: Send },
];

const MOBILE_TABS = [
  { name: "ABOUT", mobileName: "ABOUT", path: "/about", icon: User },
  { name: "PROJECTS", mobileName: "PROJECTS", path: "/projects", icon: FolderGit2 },
  { name: "HOME", mobileName: "HOME", path: "/", icon: Home, isCenter: true },
  { name: "CERTS", mobileName: "CERTS", path: "/certs", icon: Award },
  { name: "CONNECT WITH ME", mobileName: "CONNECT", path: "/connect", icon: Send },
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
  const [currentMode, setCurrentMode] = useState<boolean>(isSimpleMode);

  useEffect(() => {
    setCurrentMode(isSimpleMode);
  }, [isSimpleMode]);

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
    const nextMode = !currentMode;
    setCurrentMode(nextMode);
    router.push(nextMode ? "/simple" : "/");
  };

  return (
    <div className="relative">
      <motion.div 
        role="button"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.02 }}
        className="relative bg-black/80 border border-white/20 hover:border-[#fabb15] p-1 rounded-full cursor-pointer transition-colors flex items-center gap-1 select-none shadow-md group focus:outline-none focus:ring-2 focus:ring-[#fabb15]"
        title={currentMode ? "Switch to GTA Interactive Mode (Press M)" : "Switch to Simple Mode (Press M)"}
        aria-label={currentMode ? "Switch to GTA Interactive Mode" : "Switch to Simple Mode"}
      >
        {/* GTA Interactive Option Pill */}
        <div 
          className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-gta tracking-wider select-none transition-colors duration-200 ${
            !currentMode 
              ? "text-black font-bold" 
              : "text-gray-400 group-hover:text-white"
          }`}
        >
          {!currentMode && (
            <motion.div
              layoutId="activeModeSwitchPill"
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              className="absolute inset-0 bg-[#fabb15] rounded-full shadow-[0_2px_12px_rgba(250,187,21,0.5)] z-0"
            />
          )}

          <motion.div
            className="relative z-10 flex items-center justify-center"
            animate={!currentMode ? { scale: [0.82, 1.22, 1], y: [1, -1.5, 0] } : { scale: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <Gamepad2 className={`w-3.5 h-3.5 ${!currentMode ? "text-black stroke-[2.5]" : "text-gray-400 stroke-[1.8]"}`} />
          </motion.div>

          <motion.span
            className="relative z-10 hidden sm:inline leading-none"
            animate={!currentMode ? { scale: [0.92, 1.06, 1] } : { scale: 1 }}
            transition={{ duration: 0.22 }}
          >
            INTERACTIVE
          </motion.span>
        </div>

        {/* Switch Track Dot Indicator */}
        <motion.div 
          className="w-2.5 h-2.5 rounded-full z-10"
          animate={{
            backgroundColor: !currentMode ? "#fabb15" : "#3b82f6",
            scale: [1, 1.25, 1],
          }}
          transition={{ duration: 0.25 }}
        />

        {/* Simple Option Pill */}
        <div 
          className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-gta tracking-wider select-none transition-colors duration-200 ${
            currentMode 
              ? "text-white font-bold" 
              : "text-gray-400 group-hover:text-white"
          }`}
        >
          {currentMode && (
            <motion.div
              layoutId="activeModeSwitchPill"
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              className="absolute inset-0 bg-blue-500 rounded-full shadow-[0_2px_12px_rgba(59,130,246,0.5)] z-0"
            />
          )}

          <motion.div
            className="relative z-10 flex items-center justify-center"
            animate={currentMode ? { scale: [0.82, 1.22, 1], y: [1, -1.5, 0] } : { scale: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <FileText className={`w-3.5 h-3.5 ${currentMode ? "text-white stroke-[2.5]" : "text-gray-400 stroke-[1.8]"}`} />
          </motion.div>

          <motion.span
            className="relative z-10 hidden sm:inline leading-none"
            animate={currentMode ? { scale: [0.92, 1.06, 1] } : { scale: 1 }}
            transition={{ duration: 0.22 }}
          >
            SIMPLE
          </motion.span>
        </div>
      </motion.div>

      {/* Dismissible First-Visit Simple Mode Tooltip */}
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
                <span className="text-lg leading-none mt-0.5">📄</span>
                <div className="space-y-1 text-left">
                  <p className="text-xs font-bold font-gta text-[#fabb15] tracking-wider uppercase flex items-center gap-1.5">
                    <span>LOOKING FOR RESUME VIEW?</span>
                  </p>
                  <p className="text-[11px] text-gray-200 font-normal leading-snug">
                    <span className="hidden md:inline">Click here or press <span className="text-black font-bold bg-[#fabb15] px-1 py-0.2 rounded text-[10px]">M</span> for clean single-page Resume view.</span>
                    <span className="inline md:hidden">Tap here for clean single-page Resume view.</span>
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
  footerText: React.ReactNode;
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
  const rawPath = activeTab || pathname || "/";
  const currentPath = rawPath.split("?")[0];

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
    <div className="h-screen h-[100dvh] bg-black text-white px-3 pt-2.5 pb-1 sm:p-5 md:p-6 flex flex-col font-sans select-none overflow-hidden">
      
      {/* 2. TOP HEADER / NAVIGATION BAR */}
      <div className="relative z-30 flex justify-between items-center mb-2 sm:mb-4 shrink-0 gap-2">
        {/* Mobile-Only Header Brand / Title */}
        <div className="flex md:hidden items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-[#fabb15] to-[#c79207] text-black font-gta font-bold flex items-center justify-center text-lg rounded-sm shadow-md">
            H
          </div>
          <span className="font-gta text-white text-base tracking-wider leading-none">
            HAZEEQ NAJMUDDIN
          </span>
        </div>

        {/* Desktop-Only Navigation Tabs */}
        <nav className="hidden md:flex gap-1 sm:gap-2 md:gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden shrink py-1">
          {TABS.map((tab) => {
            const isActive = currentPath === tab.path;
            return (
              <motion.button
                key={tab.name}
                onClick={() => handleTabClick(tab.path)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-3 sm:px-4 py-1 text-xs sm:text-sm md:text-base font-medium tracking-wide transition-colors whitespace-nowrap select-none cursor-pointer ${
                  isActive
                    ? "text-black font-bold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDesktopTabPill"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    className="absolute inset-0 bg-white rounded-sm shadow-md z-0"
                  />
                )}
                <span className="relative z-10 hidden md:inline">{tab.name}</span>
                <span className="relative z-10 inline md:hidden">{tab.mobileName}</span>
              </motion.button>
            );
          })}
        </nav>
        
        {/* Right Action: Mute Button & Mode Switch */}
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

      {/* 4. OLD FOOTER (STATUS / DESCRIPTION / TAP CARD) */}
      <footer className="flex justify-between items-center shrink-0 mt-auto pt-2 border-t border-white/10 gap-2 min-h-[34px]">
        <div className="text-gray-200 text-xs sm:text-sm md:text-base max-w-2xl line-clamp-2 md:line-clamp-none font-medium">
          {typeof footerText === "string" ? (
            <span>
              <span className="hidden md:inline">{footerText}</span>
              <span className="inline md:hidden">
                {footerText
                  .replace(/Select or press ENTER to /gi, "Tap to ")
                  .replace(/press ENTER to /gi, "tap to ")
                  .replace(/Use WASD or Arrow Keys to navigate\./gi, "Swipe or tap cards to explore.")
                  .replace(/Scroll down or use WASD to /gi, "Scroll down or tap to ")
                  .replace(/Select to /gi, "Tap to ")}
              </span>
            </span>
          ) : (
            footerText
          )}
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
        <div className="lg:hidden text-[10px] font-medium shrink-0">
          <span className="bg-[#fabb15]/20 border border-[#fabb15]/40 text-[#fabb15] px-1.5 py-0.5 rounded-sm font-bold font-gta tracking-wider">
            TAP CARD
          </span>
        </div>
      </footer>

      {/* 5. INSTAGRAM-STYLE FLOATING MOBILE DOCK */}
      <div 
        className="md:hidden flex justify-center w-full shrink-0 pt-1.5 z-30"
        style={{
          paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 12px))",
        }}
      >
        <nav className="inline-flex items-center justify-between gap-1 px-2 py-1 bg-black/90 backdrop-blur-xl border border-white/15 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.95)] max-w-[360px] w-full relative">
          {MOBILE_TABS.map((tab) => {
            const isActive = currentPath === tab.path;
            const Icon = tab.icon;

            return (
              <motion.button
                key={tab.name}
                onClick={() => handleTabClick(tab.path)}
                aria-label={tab.name}
                title={tab.name}
                whileTap={{ scale: 0.88 }}
                className={`relative flex-1 py-1.5 px-1 flex flex-col items-center justify-center gap-0.5 rounded-full select-none cursor-pointer border-0 outline-none transition-colors duration-200 ${
                  isActive
                    ? "text-black font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {/* Smooth Sliding Pill Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeMobileDockPill"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    className="absolute inset-0 bg-[#fabb15] rounded-full shadow-[0_2px_14px_rgba(250,187,21,0.5)] z-0"
                  />
                )}

                {/* Animated Icon */}
                <motion.div
                  className="relative z-10 flex items-center justify-center"
                  animate={isActive ? { scale: [0.82, 1.22, 1], y: [1, -1.5, 0] } : { scale: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black stroke-[2.5]" : "text-gray-400 stroke-[1.8]"}`} />
                </motion.div>

                {/* Animated Label */}
                <motion.span
                  className={`relative z-10 text-[9px] font-gta tracking-wider leading-none uppercase ${
                    isActive ? "text-black font-bold" : "text-gray-300"
                  }`}
                  animate={isActive ? { scale: [0.92, 1.06, 1] } : { scale: 1 }}
                  transition={{ duration: 0.22 }}
                >
                  {tab.mobileName}
                </motion.span>
              </motion.button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}