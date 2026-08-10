"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

const TABS = [
  { name: "HOME", mobileName: "HOME", path: "/" },
  { name: "ABOUT", mobileName: "ABOUT", path: "/about" },
  { name: "PROJECTS", mobileName: "PROJECTS", path: "/projects" },
  { name: "CERTS", mobileName: "CERTS", path: "/certs" },
  { name: "CONNECT WITH ME", mobileName: "CONNECT", path: "/connect" },
];

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
    if (onTabChange) {
      onTabChange(path);
    } else {
      router.push(path);
    }
  };

  // 1. SINGLE KEYBOARD LISTENER
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = TABS.findIndex((tab) => tab.path === currentPath);
      
      if (e.key.toLowerCase() === 'q') {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : TABS.length - 1;
        handleTabClick(TABS[prevIndex].path);
      } else if (e.key.toLowerCase() === 'e') {
        const nextIndex = currentIndex < TABS.length - 1 ? currentIndex + 1 : 0;
        handleTabClick(TABS[nextIndex].path);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPath, onTabChange, router]);

  return (
    <div className="h-screen h-[100dvh] bg-black text-white p-3 sm:p-5 md:p-6 flex flex-col font-sans select-none overflow-hidden">
      
      {/* 2. SINGLE NAVIGATION BAR */}
      <div className="flex justify-between items-center mb-2 sm:mb-4 shrink-0 gap-2 overflow-hidden">
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
        
        {/* Optional Right Badge (e.g., "OPEN TO WORK") */}
        {rightBadge && (
          <div className="hidden sm:block shrink-0 bg-white text-black font-gta px-2.5 py-1 text-xs sm:text-sm md:text-base tracking-wider rounded-sm shadow-md">
            {rightBadge}
          </div>
        )}
      </div>

      {/* 3. SINGLE ANIMATED PAGE WRAPPER */}
      <motion.div 
        key={currentPath} // This forces the animation to re-run on page changes!
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
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
            <span>Quit</span><span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">Esc</span>
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
            <span>Select</span><span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">↵</span>
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