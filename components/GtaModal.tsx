"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Globe, ShieldCheck, FolderGit2 } from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export interface GtaModalActionLink {
  label: string;
  url?: string;
  path?: string;
  type?: "demo" | "github" | "cert" | "project";
}

export interface GtaModalHighlightItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export interface GtaModalData {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  badgeTextColor?: string;
  badgeText?: string;
  image: string;
  overview: string;
  highlights?: GtaModalHighlightItem[];
  tags?: string[];
  skills?: string[];
  projectLinks?: { label: string; path: string }[];
  badgeLinks?: { label: string; url: string }[];
  badgeUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  githubLinks?: { label: string; url: string }[];
}

interface GtaModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: GtaModalData | null;
  onNavigateLink?: (path: string) => void;
}

export default function GtaModal({ isOpen, onClose, card, onNavigateLink }: GtaModalProps) {
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);

  // Compute all actionable links for this card
  const getActionLinks = (): GtaModalActionLink[] => {
    if (!card) return [];
    const links: GtaModalActionLink[] = [];

    if (card.projectLinks && card.projectLinks.length > 0) {
      card.projectLinks.forEach((l) => links.push({ label: l.label, path: l.path, type: "project" }));
    }
    if (card.demoUrl) {
      links.push({ label: "VISIT LIVE WEBSITE", url: card.demoUrl, type: "demo" });
    }
    if (card.githubLinks && card.githubLinks.length > 0) {
      card.githubLinks.forEach((l) => links.push({ label: l.label, url: l.url, type: "github" }));
    } else if (card.githubUrl) {
      links.push({ label: "OPEN GITHUB REPOSITORY", url: card.githubUrl, type: "github" });
    }
    if (card.badgeLinks && card.badgeLinks.length > 0) {
      card.badgeLinks.forEach((l) => links.push({ label: l.label, url: l.url, type: "cert" }));
    } else if (card.badgeUrl) {
      links.push({ label: "VERIFY OFFICIAL BADGE", url: card.badgeUrl, type: "cert" });
    }

    return links;
  };

  const actionLinks = getActionLinks();

  useEffect(() => {
    setActiveLinkIndex(0);
  }, [card, isOpen]);

  // WASD / Keyboard listener inside open modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDownCapture = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const links = getActionLinks();
      const hasLinks = links.length > 0;
      const totalLinks = links.length;

      if (key === "escape" || key === "q") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      } else if (key === "w" || key === "arrowup") {
        e.preventDefault();
        e.stopPropagation();
        modalBodyRef.current?.scrollBy({ top: -140, behavior: "smooth" });
      } else if (key === "s" || key === "arrowdown") {
        e.preventDefault();
        e.stopPropagation();
        modalBodyRef.current?.scrollBy({ top: 140, behavior: "smooth" });
      } else if (key === "a" || key === "arrowleft") {
        e.preventDefault();
        e.stopPropagation();
        if (hasLinks) {
          setActiveLinkIndex((prev) => (prev > 0 ? prev - 1 : totalLinks - 1));
        }
      } else if (key === "d" || key === "arrowright") {
        e.preventDefault();
        e.stopPropagation();
        if (hasLinks) {
          setActiveLinkIndex((prev) => (prev < totalLinks - 1 ? prev + 1 : 0));
        }
      } else if (key === "enter" || key === "e") {
        e.preventDefault();
        e.stopPropagation();
        if (hasLinks) {
          const target = links[activeLinkIndex] || links[0];
          onClose();
          if (target.path && onNavigateLink) {
            onNavigateLink(target.path);
          } else if (target.url) {
            window.open(target.url, "_blank", "noopener,noreferrer");
          }
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDownCapture, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDownCapture, { capture: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, card, activeLinkIndex]);

  if (!card) return null;

  const tagList = card.tags || card.skills || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md">
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#121212] text-white border-2 border-white/20 rounded-md shadow-2xl overflow-hidden flex flex-col font-sans"
          >
            {/* Header backdrop image */}
            <div className="relative h-48 sm:h-56 md:h-64 shrink-0 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/70 hover:bg-white text-white hover:text-black text-xs font-bold font-gta tracking-wider border border-white/20 rounded-sm transition-all flex items-center gap-1.5 shadow-lg"
              >
                <X className="w-4 h-4" />
                <span>ESC</span>
              </button>

              {/* Badge */}
              {card.badge && (
                <div className={`absolute top-4 left-4 px-2.5 py-1 text-xs font-bold font-gta tracking-wider rounded-sm shadow-md ${card.badgeColor || "bg-[#fabb15]"} ${card.badgeTextColor || card.badgeText || "text-black"}`}>
                  {card.badge}
                </div>
              )}

              {/* Header Title */}
              <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-6">
                <h2 className="font-gta text-3xl sm:text-4xl md:text-5xl text-white tracking-wide uppercase drop-shadow-lg leading-tight">
                  {card.title}
                </h2>
                {card.subtitle && (
                  <p className="text-[#fabb15] text-xs sm:text-sm md:text-base font-semibold tracking-wide mt-1 uppercase drop-shadow-md">
                    {card.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <div ref={modalBodyRef} className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 space-y-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/20">
              
              {/* Overview */}
              <div>
                <h3 className="font-gta text-xl text-[#fabb15] tracking-wider mb-2 uppercase">OVERVIEW</h3>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
                  {card.overview}
                </p>
              </div>

              {/* Key Highlights */}
              {card.highlights && card.highlights.length > 0 && (
                <div>
                  <h3 className="font-gta text-xl text-[#fabb15] tracking-wider mb-3 uppercase">KEY HIGHLIGHTS & ACHIEVEMENTS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {card.highlights.map((item, idx) => (
                      <div key={idx} className="p-3.5 bg-white/5 border border-white/10 rounded-sm">
                        <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm uppercase mb-1">
                          {item.icon}
                          <span>{item.title}</span>
                        </div>
                        <p className="text-gray-300 text-xs leading-normal">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills & Focus Domains */}
              {tagList.length > 0 && (
                <div>
                  <h3 className="font-gta text-xl text-[#fabb15] tracking-wider mb-2 uppercase">FOCUS DOMAINS & SKILLS</h3>
                  <div className="flex flex-wrap gap-2">
                    {tagList.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-white/10 text-white text-xs font-semibold rounded-sm border border-white/10 flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-[#2ecc71]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Action Links */}
              {actionLinks.length > 0 && (
                <div className="pt-2 border-t border-white/10">
                  <h3 className="font-gta text-xl text-[#fabb15] tracking-wider mb-3 uppercase flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-[#00a8ff]" />
                    <span>FEATURED ACTIONS & LINKS</span>
                    <GithubIcon className="w-4 h-4 text-white opacity-80" />
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {actionLinks.map((link, idx) => {
                      const isSelected = activeLinkIndex === idx;

                      const handleLinkClick = () => {
                        onClose();
                        if (link.path && onNavigateLink) {
                          onNavigateLink(link.path);
                        } else if (link.url) {
                          window.open(link.url, "_blank", "noopener,noreferrer");
                        }
                      };

                      return (
                        <button
                          key={idx}
                          onMouseEnter={() => setActiveLinkIndex(idx)}
                          onClick={handleLinkClick}
                          className={`inline-flex items-center gap-2 px-3.5 py-2 font-gta text-xs sm:text-sm tracking-wider rounded-sm shadow-md transition-all duration-150 font-bold uppercase cursor-pointer ${
                            isSelected
                              ? "bg-[#fabb15] text-black border-2 border-white scale-105 shadow-[0_0_20px_rgba(250,187,21,0.4)] z-10 ring-2 ring-white/50"
                              : link.type === "demo" || link.type === "project" || link.type === "cert"
                              ? "bg-[#fabb15]/80 text-black border-2 border-transparent opacity-90"
                              : "bg-white/10 text-white border-2 border-white/20 opacity-80"
                          }`}
                        >
                          {link.type === "demo" ? <Globe className="w-4 h-4" /> : null}
                          <span>{link.label}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-black/60 border-t border-white/10 flex items-center justify-between shrink-0">
              <div className="hidden md:flex items-center gap-4 text-xs text-gray-300 font-medium">
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">Scroll:</span>
                  <kbd className="bg-white text-black px-1.5 py-0.5 rounded text-[10px] font-bold">W</kbd>
                  <kbd className="bg-white text-black px-1.5 py-0.5 rounded text-[10px] font-bold">S</kbd>
                </div>
                {actionLinks.length > 0 && (
                  <>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">Select Link:</span>
                      <kbd className="bg-white text-black px-1.5 py-0.5 rounded text-[10px] font-bold">A</kbd>
                      <kbd className="bg-white text-black px-1.5 py-0.5 rounded text-[10px] font-bold">D</kbd>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">Open:</span>
                      <kbd className="bg-[#fabb15] text-black px-1.5 py-0.5 rounded text-[10px] font-bold">ENTER</kbd>
                    </div>
                  </>
                )}
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">Exit:</span>
                  <kbd className="bg-white/20 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">ESC</kbd>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-5 py-1.5 bg-white hover:bg-gray-200 text-black font-gta text-base tracking-wider rounded-sm transition-colors"
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
