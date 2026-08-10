"use client";

import React, { useState, useEffect, useRef } from "react";
import GtaLayout from "./GtaLayout";
import { useWasdNavigation } from "@/hooks/useWasdNavigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  ExternalLink, 
  Mail, 
  Globe, 
  Send, 
  CheckCircle2, 
  Share2 
} from "lucide-react";

// Types
export interface ConnectCard {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  badgeTextColor?: string;
  description: string;
  image: string;
  gridClass: string;
  isHeader?: boolean;
  // Explicit routing for WASD navigation
  nav: {
    w?: string; // Up
    a?: string; // Left
    s?: string; // Down
    d?: string; // Right
  };
  link?: string;
}

interface SocialLink {
  name: string;
  handle: string;
  category: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  badgeColor: string;
}

const InstagramIcon = () => (
  <svg className="w-5 h-5 text-[#e1306c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TiktokIcon = () => (
  <svg className="w-5 h-5 text-[#ff0050]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5 text-[#0077b5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const OTHER_SOCIALS_LIST: SocialLink[] = [
  {
    name: "LinkedIn Network",
    handle: "in/hazeeqnajmuddin",
    category: "Professional Network",
    description: "Connect on LinkedIn to view recommendations, professional timeline, and career achievements.",
    link: "https://www.linkedin.com/in/hazeeqnajmuddin",
    icon: <LinkedinIcon />,
    badgeColor: "bg-[#0077b5]/20 text-[#0077b5]"
  },
  {
    name: "Instagram",
    handle: "@hazeeqnajmuddin",
    category: "Personal & Lifestyle",
    description: "Follow for personal updates, tech lifestyle, and behind-the-scenes moments.",
    link: "https://instagram.com/hazeeqnajmuddin",
    icon: <InstagramIcon />,
    badgeColor: "bg-[#e1306c]/20 text-[#e1306c]"
  },
  {
    name: "WhatsApp Direct",
    handle: "+60 11-2475 9458",
    category: "Instant Messaging",
    description: "Direct instant message for urgent inquiries, project consultations, and chats.",
    link: "https://wa.me/601124759458?text=Hi%20Hazeeq,%20I'm%20reaching%20out%20from%20your%20portfolio!",
    icon: <Send className="w-5 h-5 text-[#25d366]" />,
    badgeColor: "bg-[#25d366]/20 text-[#25d366]"
  },
  {
    name: "Direct Email Inbox",
    handle: "hazeeqnajmuddin@gmail.com",
    category: "Professional Contact",
    description: "Send detailed proposals, job offers, or project documentation directly to my inbox.",
    link: "mailto:hazeeqnajmuddin@gmail.com?subject=Hello%20Hazeeq",
    icon: <Mail className="w-5 h-5 text-[#fabb15]" />,
    badgeColor: "bg-[#fabb15]/20 text-[#fabb15]"
  },
  {
    name: "TikTok & Content",
    handle: "@hazyck_",
    category: "Short-Form Video",
    description: "Watch quick tech breakdowns, software engineering clips, and developer insights.",
    link: "https://www.tiktok.com/@hazyck_",
    icon: <TiktokIcon />,
    badgeColor: "bg-[#ff0050]/20 text-[#ff0050]"
  },
  {
    name: "Web Portfolio & GitHub",
    handle: "@hazeeqnajmuddin",
    category: "Official Portal",
    description: "Explore my interactive GTA-themed portfolio website and open-source repositories.",
    link: "https://github.com/hazeeqnajmuddin",
    icon: <Globe className="w-5 h-5 text-[#00a8ff]" />,
    badgeColor: "bg-[#00a8ff]/20 text-[#00a8ff]"
  }
];

// Connect Links Data
const CARDS: ConnectCard[] = [
  {
    id: "linkedin",
    title: "LINKEDIN NETWORK",
    badge: "PROFESSIONAL",
    badgeColor: "bg-[#fabb15]",
    badgeTextColor: "text-black",
    description: "Select to connect on LinkedIn and view my professional network.",
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1000",
    gridClass: "col-start-1 col-span-1 row-start-1 row-span-4",
    nav: { d: "github" }, // Right goes to GitHub
    link: "https://www.linkedin.com/in/hazeeqnajmuddin",
  },
  {
    id: "github",
    title: "GITHUB REPOSITORIES",
    badge: "VIEW SOURCE CODE",
    badgeColor: "bg-[#fabb15]",
    badgeTextColor: "text-black",
    description: "Select to visit my GitHub profile and review my open-source code contributions.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-1 row-span-4",
    nav: { a: "linkedin", d: "header-logo" }, // Left to LinkedIn, Right defaults to top-right
    link: "https://github.com/hazeeqnajmuddin"
  },
  {
    id: "header-logo",
    title: "GET CONNECTED",
    description: "Connect with me through WhatsApp.",
    image: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-1 row-span-1",
    isHeader: true,
    nav: { a: "github", s: "email" },
    link: "https://wa.me/601124759458?text=Hi%20Hazeeq,%20I'm%20reaching%20out%20from%20your%20portfolio!"
  },
  {
    id: "email",
    title: "DIRECT EMAIL",
    subtitle: "Send a direct message to my inbox for quick inquiries.",
    description: "Select to open your email client and send me a message.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-2 row-span-1",
    nav: { w: "header-logo", a: "github", s: "resume" },
    link: "mailto:hazeeqnajmuddin@gmail.com?subject=Hello%20Hazeeq&body=Hi%20Hazeeq,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out.%0D%0A%0D%0A[Your message here]%0D%0A%0D%0AThanks!"
  },
  {
    id: "resume",
    title: "DOWNLOAD RESUME",
    description: "Select to download my latest PDF resume.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-3 row-span-1",
    nav: { w: "email", a: "github", s: "socials" },
    link: "/Resume_Muhammad Hazeeq Najmuddin Roshidi.pdf"
  },
  {
    id: "socials",
    title: "OTHER SOCIALS",
    badge: "NEW",
    badgeColor: "bg-white",
    badgeTextColor: "text-black",
    description: "Select to view other social media links, messaging apps, and portals.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-4 row-span-1",
    nav: { w: "resume", a: "github" },
  },
];

interface ConnectViewProps {
  onNavigate?: (path: string) => void;
  activeTab?: string;
}

export default function ConnectView({ onNavigate, activeTab = "/connect" }: ConnectViewProps) {
  const [hoveredCard, setHoveredCard] = useState<ConnectCard>(CARDS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  // Pass current card, data array, and modal status to disable background card movement when modal is open
  useWasdNavigation(CARDS, setHoveredCard, undefined, isModalOpen);
  
  // Enter key & click handler
  const handleCardTrigger = (card: ConnectCard) => {
    setHoveredCard(card);
    if (card.id === "socials") {
      setIsModalOpen(true);
    } else if (card.link) {
      if (card.link.endsWith(".pdf")) {
        const encodedUrl = encodeURI(card.link);
        const linkElem = document.createElement("a");
        linkElem.href = encodedUrl;
        linkElem.target = "_blank";
        linkElem.rel = "noopener noreferrer";
        linkElem.download = "Resume_Muhammad_Hazeeq_Najmuddin_Roshidi.pdf";
        document.body.appendChild(linkElem);
        linkElem.click();
        document.body.removeChild(linkElem);
      } else if (card.link.startsWith("/") && onNavigate) {
        onNavigate(card.link);
      } else {
        window.open(card.link, "_blank", "noopener,noreferrer");
      }
    }
  };

  // Keyboard capture event listener
  useEffect(() => {
    const handleKeyDownCapture = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (isModalOpen) {
        if (key === "escape") {
          e.preventDefault();
          e.stopPropagation();
          setIsModalOpen(false);
        } else if (key === "w" || key === "arrowup" || key === "a" || key === "arrowleft") {
          e.preventDefault();
          e.stopPropagation();
          modalScrollRef.current?.scrollBy({ top: -140, behavior: "smooth" });
        } else if (key === "s" || key === "arrowdown" || key === "d" || key === "arrowright") {
          e.preventDefault();
          e.stopPropagation();
          modalScrollRef.current?.scrollBy({ top: 140, behavior: "smooth" });
        } else if (['q', 'e', 'enter'].includes(key)) {
          e.preventDefault();
          e.stopPropagation();
        }
      } else {
        if (key === "enter") {
          e.preventDefault();
          handleCardTrigger(hoveredCard);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDownCapture, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDownCapture, { capture: true });
  }, [hoveredCard, isModalOpen, onNavigate]);

  return (
    <GtaLayout
      activeTab={activeTab}
      onTabChange={(path) => onNavigate ? onNavigate(path) : undefined}
      footerText={hoveredCard.description}
      mainContainerClass="flex-1 flex flex-col md:grid md:grid-cols-3 md:grid-rows-4 gap-2 md:gap-3 mb-2 md:mb-3 min-h-0 overflow-y-auto md:overflow-hidden pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {CARDS.map((card) => {
        const isActive = hoveredCard.id === card.id;

        if (card.isHeader) {
          return (
            <div
              key={card.id}
              onMouseEnter={() => setHoveredCard(card)}
              onClick={() => handleCardTrigger(card)}
              className={`relative overflow-hidden cursor-pointer transition-all duration-200 min-h-[90px] md:min-h-0 shrink-0 md:shrink rounded-sm flex items-center justify-center ${card.gridClass} ${
                isActive ? "border-[3px] border-white z-10" : "border-[3px] border-transparent opacity-80 hover:opacity-100"
              }`}
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
                style={{ transform: isActive ? "scale(1.04)" : "scale(1)" }}
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/40" />
              <h2 className="relative z-10 font-gta text-2xl md:text-5xl text-white tracking-widest drop-shadow-lg text-center">
                {card.title}
              </h2>
            </div>
          );
        }

        return (
          <div
            key={card.id}
            onMouseEnter={() => setHoveredCard(card)}
            onClick={() => handleCardTrigger(card)}
            className={`relative overflow-hidden cursor-pointer transition-all duration-200 min-h-[110px] md:min-h-0 shrink-0 md:shrink rounded-sm ${card.gridClass} ${
              isActive ? "border-[3px] border-white z-10" : "border-[3px] border-transparent opacity-80 hover:opacity-100"
            }`}
          >
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
              style={{ transform: isActive ? "scale(1.04)" : "scale(1)" }}
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {card.badge && (
              <div className={`absolute top-2 left-2 px-1.5 py-0.5 text-[10px] md:text-xs font-bold tracking-wider rounded-sm ${card.badgeColor} ${card.badgeTextColor}`}>
                {card.badge}
              </div>
            )}

            <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
              <h3 className="font-gta text-2xl md:text-3xl text-white tracking-wide uppercase drop-shadow-lg leading-none">
                {card.title}
              </h3>
              {card.subtitle && (
                <p className="text-gray-200 text-xs md:text-sm mt-1 font-medium drop-shadow-md line-clamp-1">
                  {card.subtitle}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* GTA V STYLED POP-UP MODAL FOR OTHER SOCIALS */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md">
            <div 
              className="absolute inset-0" 
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#121212] border-2 border-white/20 rounded shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-black via-zinc-900 to-black border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-6 bg-[#fabb15] rounded-sm" />
                  <div>
                    <h2 className="font-gta text-2xl sm:text-3xl md:text-4xl text-white tracking-wider uppercase leading-none">
                      OTHER SOCIALS & PLATFORMS
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm font-medium mt-0.5">
                      Connect with Hazeeq across messaging apps, video portals, and developer communities
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Scroll Body */}
              <div ref={modalScrollRef} className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
                {/* Image Banner */}
                <div className="relative w-full h-44 sm:h-56 rounded-sm overflow-hidden border border-white/10 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000" 
                    alt="Social Networks" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-4 sm:p-6" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-[#fabb15] text-black text-xs font-bold tracking-wider rounded-sm uppercase">
                      ALL PLATFORMS
                    </span>
                    <span className="text-xs text-gray-300 font-medium hidden sm:inline">
                      Direct Messaging & Community Profiles
                    </span>
                  </div>
                </div>

                {/* Overview Paragraph */}
                <div>
                  <h3 className="font-gta text-lg text-[#fabb15] tracking-wider uppercase mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Connect & Engage
                  </h3>
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed bg-white/5 p-4 rounded-sm border border-white/5 font-normal">
                    Explore all my official social profiles, professional networks, instant messaging channels, short-form tech content, and direct contact options below. Feel free to connect or reach out anytime!
                  </p>
                </div>

                {/* Social Links List */}
                <div>
                  <h3 className="font-gta text-lg text-[#fabb15] tracking-wider uppercase mb-3 flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> Available Platforms & Channels
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {OTHER_SOCIALS_LIST.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="p-4 bg-white/5 border border-white/10 rounded-sm flex flex-col justify-between hover:border-white/30 transition-all hover:bg-white/[0.07] group"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-black/50 rounded-sm border border-white/10 shrink-0">
                              {item.icon}
                            </div>
                            <div>
                              <h4 className="text-white text-base font-bold tracking-wide group-hover:text-[#fabb15] transition-colors">
                                {item.name}
                              </h4>
                              <p className="text-gray-400 text-xs font-mono">
                                {item.handle}
                              </p>
                            </div>
                          </div>

                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-sm uppercase tracking-wider shrink-0 ${item.badgeColor}`}>
                            {item.category}
                          </span>
                        </div>

                        <p className="text-gray-300 text-xs leading-relaxed mb-3">
                          {item.description}
                        </p>

                        <button
                          onClick={() => window.open(item.link, "_blank", "noopener,noreferrer")}
                          className="w-full py-2 px-3 bg-white/10 hover:bg-white text-white hover:text-black font-gta text-xs tracking-wider rounded-sm flex items-center justify-center gap-2 transition-all font-bold"
                        >
                          <span>VISIT PLATFORM</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Note */}
                <div className="p-3 bg-white/5 border border-white/5 rounded-sm flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2ecc71]" />
                    <span>Open to remote opportunities, full-stack software contracts & QA roles.</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-black/60 border-t border-white/10 flex items-center justify-between shrink-0">
                <div className="hidden md:flex items-center gap-4 text-xs text-gray-300 font-medium">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">Scroll:</span>
                    <kbd className="bg-white text-black px-1.5 py-0.5 rounded text-[10px] font-bold">W</kbd>
                    <kbd className="bg-white text-black px-1.5 py-0.5 rounded text-[10px] font-bold">S</kbd>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">Exit:</span>
                    <kbd className="bg-white/20 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">ESC</kbd>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-1.5 bg-white hover:bg-gray-200 text-black font-gta text-base tracking-wider rounded-sm transition-colors ml-auto md:ml-0"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </GtaLayout>
  );
}