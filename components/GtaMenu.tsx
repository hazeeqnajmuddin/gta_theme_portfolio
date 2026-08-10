"use client";

import React, { useState, useEffect } from "react";
import GtaLayout from "./GtaLayout"; // Import our new wrapper
import { useWasdNavigation } from "@/hooks/useWasdNavigation";
import { useRouter } from "next/navigation";

// Types
export interface MenuCard {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  badgeTextColor?: string;
  description: string;
  image: string;
  gridClass: string;
  titleClass: string;
  // Explicit routing for WASD navigation
  nav?: {
    w?: string; // Up
    a?: string; // Left
    s?: string; // Down
    d?: string; // Right
  };
  link?: string;
}

// 7-Card Data
const CARDS: MenuCard[] = [
  {
    id: "main-profile",
    title: "Hazeeq Najmuddin",
    subtitle: "Software Engineer | Full-Stack Developer | Testing & QA Specialist",
    badge: "FULL-STACK",
    badgeColor: "bg-[#4a90e2]",
    badgeTextColor: "text-white",
    description: "Select to view my complete timeline and professional journey.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
    gridClass: "col-start-1 col-span-1 row-start-1 row-span-4",
    titleClass: "text-3xl md:text-5xl lg:text-6xl",
    nav: { d: "project-automate" }, // Right goes to the top-middle card
    link: "/about", // Link to the AboutView page
  },
  {
    id: "project-automate",
    title: "AUTOMATE SYSTEM",
    badge: "FYP",
    badgeColor: "bg-[#fabb15]",
    badgeTextColor: "text-black",
    description: "Select to view the vehicle management system built with Laravel, PHP, and MySQL.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-1 row-span-2",
    titleClass: "text-2xl md:text-4xl",
    nav: { a: "main-profile", s: "qa-testing", d: "cloud-arch" },
    link: "/projects", // Link to the Projects page
  },
  {
    id: "qa-testing",
    title: "QA & AUTOMATION",
    badge: "QA SPECIALIST",
    badgeColor: "bg-[#4a90e2]",
    badgeTextColor: "text-white",
    description: "Automated test scripts using Selenium, Maven, and Tricentis Tosca.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-3 row-span-2",
    titleClass: "text-2xl md:text-4xl",
    nav: { w: "project-automate", a: "main-profile", d: "web-dev" },
    link: "/projects?active=qa-suite" // Link to the QA & Automation page
  },
  {
    id: "cloud-arch",
    title: "CLOUD PRACTICIONER",
    badge: "CERTIFIED",
    badgeColor: "bg-gray-200",
    badgeTextColor: "text-black",
    description: "AWS Certified Cloud Practitioner. Server setups and deployment strategies by AWS.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-1 row-span-1",
    titleClass: "text-xl md:text-2xl",
    nav: { a: "project-automate", s: "experience" },
    link: "/certs", // Link to the Certifications page
  },
  {
    id: "experience",
    title: "ENTERPRISE EXPERIENCE",
    description: "Select to view my complete professional journey and work history.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-2 row-span-1",
    titleClass: "text-xl md:text-2xl",
    nav: { w: "cloud-arch", a: "project-automate", s: "web-dev" },
    link: "/about?active=work-main" // Link to the QA & Automation page
  },
  {
    id: "web-dev",
    title: "My Education",
    description: "Details about my academic background and educational achievements.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-3 row-span-1",
    titleClass: "text-xl md:text-2xl",
    nav: { w: "experience", a: "qa-testing", s: "contact" },
    link: "/about?active=edu-main" // Link to the Full Stack Projects page
  },
  {
    id: "contact",
    title: "GET IN TOUCH",
    badge: "AVAILABLE",
    badgeColor: "bg-[#fabb15]",
    badgeTextColor: "text-black",
    description: "Contact information, GitHub, LinkedIn, and social links.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-4 row-span-1",
    titleClass: "text-xl md:text-2xl",
    nav: { w: "web-dev", a: "qa-testing" },
    link: "/connect", // Link to the ConnectView page
  },
];

interface GtaMenuProps {
  onNavigate?: (path: string) => void;
  activeTab?: string;
}

export default function GtaMenu({ onNavigate, activeTab = "/" }: GtaMenuProps) {
  const [hoveredCard, setHoveredCard] = useState<MenuCard>(CARDS[0]);
  const router = useRouter(); // Initialize the Next.js router
  
  // The hook correctly receives the items array and the setter function
  useWasdNavigation(CARDS, setHoveredCard);

  const handleLinkNavigation = (link: string) => {
    if (link.startsWith("/")) {
      if (onNavigate) {
        onNavigate(link);
      } else {
        router.push(link);
      }
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    const handleEnterPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "enter" && hoveredCard.link) {
        e.preventDefault(); // Stop default browser behavior
        handleLinkNavigation(hoveredCard.link);
      }
    };

    window.addEventListener("keydown", handleEnterPress);
    return () => window.removeEventListener("keydown", handleEnterPress);
  }, [hoveredCard, onNavigate, router]); // Re-run this effect whenever hoveredCard changes

  return (
    <GtaLayout 
      activeTab={activeTab}
      onTabChange={(path) => onNavigate ? onNavigate(path) : router.push(path)}
      footerText={hoveredCard.description}
      mainContainerClass="flex-1 flex flex-col md:grid md:grid-cols-3 md:grid-rows-4 gap-2 md:gap-3 mb-2 md:mb-3 min-h-0 overflow-y-auto md:overflow-hidden pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {CARDS.map((card) => {
        const isActive = hoveredCard.id === card.id;

        return (
          <div
            key={card.id}
            onMouseEnter={() => setHoveredCard(card)}
            onClick={() => {
              if (card.link) {
                handleLinkNavigation(card.link);
              }
            }}
            className={`relative overflow-hidden cursor-pointer transition-all duration-200 min-h-[110px] md:min-h-0 shrink-0 md:shrink rounded-sm ${card.gridClass} ${
              isActive ? "border-[3px] border-white z-10" : "border-[3px] border-transparent opacity-85 hover:opacity-100"
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
              <div className={`absolute top-2 left-2 px-1.5 py-0.5 text-[10px] md:text-xs font-bold tracking-wider rounded-sm ${card.badgeColor} ${card.badgeTextColor}`}>
                {card.badge}
              </div>
            )}
            <div className="absolute bottom-2 left-3 right-3">
              <h3 className={`font-gta text-white tracking-wide uppercase drop-shadow-md leading-none ${card.titleClass}`}>
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
    </GtaLayout>
  );
}