"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

const TABS = [
  { name: "HOME", path: "/" },
  { name: "ABOUT", path: "/about" },
  { name: "PROJECTS", path: "/projects" },
  { name: "CERTS", path: "/certs" },
  { name: "CONNECT WITH ME", path: "/connect" },
];

interface GtaLayoutProps {
  children: React.ReactNode;
  footerText: string;
  rightBadge?: string;
  mainContainerClass?: string;
}

export default function GtaLayout({ 
  children, 
  footerText, 
  rightBadge,
  mainContainerClass = "flex-grow overflow-hidden" // Default class
}: GtaLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  // 1. SINGLE KEYBOARD LISTENER
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = TABS.findIndex((tab) => tab.path === pathname);
      
      if (e.key.toLowerCase() === 'q') {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : TABS.length - 1;
        router.push(TABS[prevIndex].path);
      } else if (e.key.toLowerCase() === 'e') {
        const nextIndex = currentIndex < TABS.length - 1 ? currentIndex + 1 : 0;
        router.push(TABS[nextIndex].path);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname, router]);

  return (
    <div className="h-screen bg-black text-white p-6 md:p-10 flex flex-col font-sans select-none overflow-hidden">
      
      {/* 2. SINGLE NAVIGATION BAR */}
      <div className={`flex justify-between items-end mb-6 shrink-0 ${rightBadge ? 'border-b border-white/10 pb-2' : ''}`}>
        <nav className="flex gap-6">
          {TABS.map((tab) => (
            <button
              key={tab.name}
              onClick={() => router.push(tab.path)}
              className={`px-4 py-1 text-sm md:text-base font-medium tracking-wide transition-colors ${
                pathname === tab.path
                  ? "bg-white text-black font-bold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
        
        {/* Optional Right Badge (e.g., "OPEN TO WORK") */}
        {rightBadge && (
          <div className="bg-white text-black font-gta px-3 py-1 text-sm md:text-base tracking-wider rounded-sm shadow-md">
            {rightBadge}
          </div>
        )}
      </div>

      {/* 3. SINGLE ANIMATED PAGE WRAPPER */}
      <motion.div 
        key={pathname} // This forces the animation to re-run on page changes!
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={mainContainerClass}
      >
        {children}
      </motion.div>

      {/* 4. SINGLE FOOTER */}
      <footer className="flex justify-between items-end shrink-0 mt-auto pt-2 border-t border-transparent">
        <div className="text-gray-200 text-sm md:text-base max-w-2xl h-6">
          {footerText}
        </div>
        
        {/* Static Keyboard Controls */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <div className="flex items-center gap-2">
            <span>Quit</span><span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">Esc</span>
          </div>
          
          {/* NEW WASD CONTROLS */}
          <div className="flex items-center gap-1.5">
            <span className="mr-1">Navigate</span>
            <span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">W</span>
            <span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">A</span>
            <span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">S</span>
            <span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">D</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Move Tab</span>
            <span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">Q</span>
            <span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">E</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Select</span><span className="bg-white text-black px-1.5 py-0.5 rounded-sm text-xs font-bold shadow-sm">↵</span>
          </div>
        </div>
      </footer>
    </div>
  );
}