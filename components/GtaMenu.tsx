"use client";

import React, { useState } from "react";
import GtaLayout from "./GtaLayout"; // Import our new wrapper
import { useWasdNavigation } from "@/hooks/useWasdNavigation";

// Types
export interface MenuCard {
  id: string;
  title: string;
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
}

// 7-Card Data
const CARDS: MenuCard[] = [
  {
    id: "main-profile",
    title: "FULL-STACK ENGINEER",
    badge: "2X EXP",
    badgeColor: "bg-[#4a90e2]",
    badgeTextColor: "text-white",
    description: "Select to view my complete timeline, from my Final Year Project to enterprise software engineering.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
    gridClass: "col-start-1 col-span-1 row-start-1 row-span-4",
    titleClass: "text-3xl md:text-5xl lg:text-6xl",
    nav: { d: "project-automate" }, // Right goes to the top-middle card
  },
  {
    id: "project-automate",
    title: "AUTOMATE SYSTEM",
    badge: "NEW",
    badgeColor: "bg-[#fabb15]",
    badgeTextColor: "text-black",
    description: "Select to view the vehicle management system built with Laravel, PHP, and Flutter.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-1 row-span-2",
    titleClass: "text-2xl md:text-4xl",
    nav: { a: "main-profile", s: "qa-testing", d: "cloud-arch" }, 
  },
  {
    id: "qa-testing",
    title: "QA & AUTOMATION",
    badge: "PASSED",
    badgeColor: "bg-[#4a90e2]",
    badgeTextColor: "text-white",
    description: "Automated test scripts using Selenium, Maven, and Tricentis Tosca.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-3 row-span-2",
    titleClass: "text-2xl md:text-4xl",
    nav: { w: "project-automate", a: "main-profile", d: "web-dev" },
  },
  {
    id: "cloud-arch",
    title: "CLOUD ARCHITECTURE",
    badge: "CERTIFIED",
    badgeColor: "bg-gray-200",
    badgeTextColor: "text-black",
    description: "AWS Certified Cloud Practitioner. Server setups and deployment strategies.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-1 row-span-1",
    titleClass: "text-xl md:text-2xl",
    nav: { a: "project-automate", s: "experience" },
  },
  {
    id: "experience",
    title: "ENTERPRISE EXPERIENCE",
    description: "Insights from my professional internships at UOB and CIMB.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-2 row-span-1",
    titleClass: "text-xl md:text-2xl",
    nav: { w: "cloud-arch", a: "project-automate", s: "web-dev" },
  },
  {
    id: "web-dev",
    title: "REACT & NEXT.JS",
    description: "Frontend web applications, interactive UI designs, and portals.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-3 row-span-1",
    titleClass: "text-xl md:text-2xl",
    nav: { w: "experience", a: "qa-testing", s: "contact" },
  },
  {
    id: "contact",
    title: "CONNECT & SOCIALS",
    description: "Select to connect on LinkedIn, view my GitHub repositories, or send an email.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-4 row-span-1",
    titleClass: "text-xl md:text-2xl",
    nav: { w: "web-dev", a: "qa-testing" },
  },
];

export default function GtaMenu() {
  const [hoveredCard, setHoveredCard] = useState<MenuCard>(CARDS[0]);
  
  // The hook correctly receives the items array and the setter function
  useWasdNavigation(CARDS, setHoveredCard);

  return (
    <GtaLayout 
      footerText={hoveredCard.description}
      mainContainerClass="flex-grow grid grid-cols-3 grid-rows-4 gap-2 md:gap-3 mb-6 h-[65vh] min-h-[500px]"
    >
      {CARDS.map((card) => {
        const isActive = hoveredCard.id === card.id;

        return (
          <div
            key={card.id}
            onMouseEnter={() => setHoveredCard(card)}
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
      })}
    </GtaLayout>
  );
}