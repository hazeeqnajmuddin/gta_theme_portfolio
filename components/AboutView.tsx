"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import GtaLayout from "./GtaLayout";
import { useWasdNavigation } from "@/hooks/useWasdNavigation";

// Types
export interface AboutCard {
  id: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  badgeTextColor?: string;
  description: string;
  image: string;
  gridClass: string;
  titleClass: string;
  nav?: {
    w?: string;
    a?: string;
    s?: string;
    d?: string;
  };
  link?: string; // <-- Added to support seamless redirects
}

// -------------------------------------------------------------
// HERO / TITLE CARD DATA
// -------------------------------------------------------------
const HERO_CARD: AboutCard = {
  id: "hero-main",
  title: "THE STORY OF HAZEEQ NAJMUDDIN",
  description: "A brief look into the professional journey, technical expertise, and background of a full-stack engineer and automation specialist.",
  image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000",
  gridClass: "", 
  titleClass: "",
  nav: { s: "edu-main" }
};

// SECTION 1: EDUCATION
const EDUCATION_CARDS: AboutCard[] = [
  {
    id: "edu-main",
    title: "EDUCATION",
    description: "My academic background and foundations.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000",
    gridClass: "col-start-1 col-span-1 row-start-1 row-span-3",
    titleClass: "text-4xl md:text-5xl lg:text-6xl",
    nav: { w: "hero-main", d: "edu-degree", s: "work-main" } 
  },
  {
    id: "edu-degree",
    title: "DEGREE",
    badge: "CURRENT",
    badgeColor: "bg-[#4a90e2]",
    badgeTextColor: "text-white",
    description: "Final-year Software Engineering student.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-1 row-span-3",
    titleClass: "text-3xl md:text-5xl",
    nav: { w: "hero-main", a: "edu-main", d: "edu-matrics", s: "work-intern" } 
  },
  {
    id: "edu-matrics",
    title: "MATRICS",
    description: "Pre-university matriculation program.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-1 row-span-1",
    titleClass: "text-xl md:text-3xl",
    nav: { w: "hero-main", a: "edu-degree", s: "edu-high" } 
  },
  {
    id: "edu-high",
    title: "HIGH SCHOOL",
    description: "Secondary education credentials.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-2 row-span-1",
    titleClass: "text-xl md:text-3xl",
    nav: { w: "edu-matrics", a: "edu-degree", s: "edu-middle" }
  },
  {
    id: "edu-middle",
    title: "MIDDLE SCHOOL",
    description: "Early education years.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-3 row-span-1",
    titleClass: "text-xl md:text-3xl",
    nav: { w: "edu-high", a: "edu-degree", s: "work-skechers" }
  }
];

// SECTION 2: WORK EXPERIENCES
const WORK_CARDS: AboutCard[] = [
  {
    id: "work-main",
    title: "WORK EXPERIENCES",
    description: "A timeline of my professional roles and part-time ventures.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000",
    gridClass: "col-start-1 col-span-1 row-start-1 row-span-4",
    titleClass: "text-4xl md:text-5xl lg:text-6xl",
    nav: { w: "edu-main", d: "work-intern", s: "life-main" }
  },
  {
    id: "work-intern",
    title: "INTERNSHIP",
    badge: "UOB",
    badgeColor: "bg-[#fabb15]",
    badgeTextColor: "text-black",
    description: "Professional internships focusing on corporate tech environments.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-1 row-span-2",
    titleClass: "text-3xl md:text-4xl",
    nav: { w: "edu-degree", a: "work-main", d: "work-skechers", s: "work-freelance" }
  },
  {
    id: "work-freelance",
    title: "FREELANCE",
    description: "Independent projects, troubleshooting, and system setups.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-3 row-span-2",
    titleClass: "text-3xl md:text-4xl",
    nav: { w: "work-intern", a: "work-main", d: "work-ole", s: "life-volunteer" }
  },
  {
    id: "work-skechers",
    title: "SKECHERS",
    description: "Retail operations and customer service.",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-1 row-span-1",
    titleClass: "text-xl md:text-2xl",
    nav: { w: "edu-middle", a: "work-intern", s: "work-shopee" }
  },
  {
    id: "work-shopee",
    title: "SHOPEE SORTER",
    description: "Logistics and fast-paced warehouse organization.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-2 row-span-1",
    titleClass: "text-xl md:text-2xl",
    nav: { w: "work-skechers", a: "work-intern", s: "work-ole" }
  },
  {
    id: "work-ole",
    title: "OLE OLE BALI",
    description: "F&B hospitality and operational flow.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-3 row-span-1",
    titleClass: "text-xl md:text-2xl",
    nav: { w: "work-shopee", a: "work-freelance", s: "work-waiter" }
  },
  {
    id: "work-waiter",
    title: "STEAKHOUSE WAITER",
    description: "Front-of-house dining experience.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-4 row-span-1",
    titleClass: "text-xl md:text-2xl",
    nav: { w: "work-ole", a: "work-freelance", s: "life-youth" }
  }
];

// SECTION 3: LIFE EXPERIENCES
const LIFE_CARDS: AboutCard[] = [
  {
    id: "life-main",
    title: "LIFE EXPERIENCES",
    description: "Roles beyond the workplace shaping my perspective.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000",
    gridClass: "col-start-1 col-span-1 row-start-1 row-span-2",
    titleClass: "text-4xl md:text-5xl lg:text-6xl",
    nav: { w: "work-main", d: "life-volunteer" }
  },
  {
    id: "life-volunteer",
    title: "VOLUNTEERING",
    description: "Giving back through organized community efforts.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-1 row-span-1",
    titleClass: "text-2xl md:text-4xl",
    nav: { w: "work-freelance", a: "life-main", d: "life-youth", s: "life-speaker" }
  },
  {
    id: "life-speaker",
    title: "MOTIVATIONAL SPEAKER",
    description: "Public speaking and sharing personal journeys.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-2 row-span-1",
    titleClass: "text-2xl md:text-4xl",
    nav: { w: "life-volunteer", a: "life-main", d: "life-program" }
  },
  {
    id: "life-youth",
    title: "YOUTH DEVELOPMENT",
    description: "Mentoring and guiding younger peers.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-1 row-span-1",
    titleClass: "text-2xl md:text-3xl",
    nav: { w: "work-waiter", a: "life-volunteer", s: "life-program" }
  },
  {
    id: "life-program",
    title: "PROGRAM MANAGEMENT",
    description: "Organizing and leading structured events.",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-2 row-span-1",
    titleClass: "text-2xl md:text-3xl",
    nav: { w: "life-youth", a: "life-speaker" }
  }
];

const ALL_CARDS = [HERO_CARD, ...EDUCATION_CARDS, ...WORK_CARDS, ...LIFE_CARDS];

// -------------------------------------------------------------
// MAIN CONTENT COMPONENT
// -------------------------------------------------------------
function AboutContent() {
  const [hoveredCard, setHoveredCard] = useState<AboutCard>(ALL_CARDS[0]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useWasdNavigation(ALL_CARDS, setHoveredCard);

  // Read URL parameters on load and highlight/scroll to the targeted card
  useEffect(() => {
    const activeId = searchParams.get("active");
    if (activeId) {
      const targetCard = ALL_CARDS.find(c => c.id === activeId);
      if (targetCard) {
        setHoveredCard(targetCard);
        
        // Timeout ensures DOM elements have rendered before auto-scrolling
        setTimeout(() => {
          const element = document.getElementById(activeId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 300);
      }
    }
  }, [searchParams]);

  // Handle standard WASD automatic scrolling
  useEffect(() => {
    if (hoveredCard?.id) {
      const element = document.getElementById(hoveredCard.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [hoveredCard]);

  // Keyboard "Enter" key redirect logic
  useEffect(() => {
    const handleEnterPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "enter" && hoveredCard.link) {
        e.preventDefault();
        if (hoveredCard.link.startsWith("/")) {
          router.push(hoveredCard.link);
        } else {
          window.open(hoveredCard.link, "_blank", "noopener,noreferrer");
        }
      }
    };

    window.addEventListener("keydown", handleEnterPress);
    return () => window.removeEventListener("keydown", handleEnterPress);
  }, [hoveredCard, router]);

  const footerText = hoveredCard 
    ? hoveredCard.description 
    : "Scroll down to discover my background, current roles, and technical journey.";

  const renderCard = (card: AboutCard) => {
    const isActive = hoveredCard?.id === card.id;

    return (
      <div
        id={card.id} 
        key={card.id}
        onMouseEnter={() => setHoveredCard(card)}
        onClick={() => {
          // Mouse click redirect logic
          if (card.link) {
            if (card.link.startsWith("/")) {
              router.push(card.link);
            } else {
              window.open(card.link, "_blank", "noopener,noreferrer");
            }
          }
        }}
        className={`relative overflow-hidden cursor-pointer transition-all duration-200 ${card.gridClass} ${
          isActive ? "border-[3px] border-white z-10" : "border-[3px] border-transparent opacity-75 hover:opacity-100"
        }`}
      >
        <img
          src={card.image}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{ transform: isActive ? 'scale(1.04)' : 'scale(1)' }}
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        {card.badge && (
          <div className={`absolute top-2 left-2 px-1.5 py-0.5 text-[10px] md:text-xs font-bold tracking-wider ${card.badgeColor} ${card.badgeTextColor}`}>
            {card.badge}
          </div>
        )}
        
        <div className="absolute bottom-2 left-3 right-3">
          <h3 className={`font-gta text-white tracking-wide uppercase drop-shadow-md leading-none ${card.titleClass}`}>
            {card.title}
          </h3>
        </div>
      </div>
    );
  };

  const isHeroActive = hoveredCard?.id === "hero-main";

  return (
    <GtaLayout 
      footerText={footerText}
      mainContainerClass="flex-grow overflow-y-auto px-2 pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-y snap-mandatory scroll-smooth"
    >
      <div 
        id="hero-main"
        onMouseEnter={() => setHoveredCard(HERO_CARD)}
        onClick={() => {
          if (HERO_CARD.link) {
            if (HERO_CARD.link.startsWith("/")) {
              router.push(HERO_CARD.link);
            } else {
              window.open(HERO_CARD.link, "_blank", "noopener,noreferrer");
            }
          }
        }}
        className={`snap-start snap-always relative w-full min-h-[calc(100vh-170px)] transition-colors duration-200 cursor-pointer mb-[20vh] ${
          isHeroActive ? "border-[3px] border-white z-10" : "border-[3px] border-transparent opacity-90 hover:opacity-100"
        }`}
      >
        <img
          src={HERO_CARD.image} 
          alt="About Story Mode"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{ transform: isHeroActive ? 'scale(1.02)' : 'scale(1)' }}
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute top-1/3 left-8 md:left-16 -translate-y-1/2 flex flex-col drop-shadow-2xl">
          <h1 className="font-gta text-7xl md:text-8xl lg:text-[9rem] text-white leading-[0.8] tracking-tighter">
            HAZEEQ
          </h1>
          <h1 className="font-gta text-7xl md:text-8xl lg:text-[9rem] text-white leading-[0.8] tracking-tighter ml-8 md:ml-16">
            NAJMUDDIN
          </h1>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="font-gta text-2xl md:text-3xl lg:text-4xl text-white tracking-wide uppercase drop-shadow-lg">
            {HERO_CARD.title}
          </h2>
          <p className="text-gray-200 text-sm md:text-base mt-2 drop-shadow-md max-w-2xl font-medium">
            {HERO_CARD.description}
          </p>
        </div>
      </div>

      <div className="snap-start snap-always w-full h-[75vh] min-h-[500px] mb-[25vh] grid grid-cols-3 grid-rows-3 gap-2 md:gap-3">
        {EDUCATION_CARDS.map(renderCard)}
      </div>

      <div className="snap-start snap-always w-full h-[75vh] min-h-[500px] mb-[25vh] grid grid-cols-3 grid-rows-4 gap-2 md:gap-3">
        {WORK_CARDS.map(renderCard)}
      </div>

      <div className="snap-start snap-always w-full h-[75vh] min-h-[400px] mb-[10vh] grid grid-cols-3 grid-rows-2 gap-2 md:gap-3">
        {LIFE_CARDS.map(renderCard)}
      </div>

    </GtaLayout>
  );
}

// -------------------------------------------------------------
// EXPORT COMPONENT WRAPPED IN SUSPENSE
// -------------------------------------------------------------
export default function AboutView() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-white">Loading...</div>}>
      <AboutContent />
    </Suspense>
  );
}