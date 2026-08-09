"use client";

import React, { useState } from "react";
import GtaLayout from "./GtaLayout";
import { useWasdNavigation } from "@/hooks/useWasdNavigation";

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
    description: "Select to view other social media links and platforms.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-4 row-span-1",
    nav: { w: "resume", a: "github" },
  },
];

export default function ConnectView() {
  const [hoveredCard, setHoveredCard] = useState<ConnectCard>(CARDS[0]);

  // Pass current card and data array to map the next move
  useWasdNavigation(CARDS, setHoveredCard);
  
  return (
    <GtaLayout
      footerText={hoveredCard.description}
      rightBadge="OPEN TO WORK"
      mainContainerClass="flex-grow grid grid-cols-3 grid-rows-4 gap-2 md:gap-3 mb-6 h-[65vh] min-h-[500px]"
    >
      {CARDS.map((card) => {
        const isActive = hoveredCard.id === card.id;

        if (card.isHeader) {
          return (
            <div
              key={card.id}
              onMouseEnter={() => setHoveredCard(card)}
              onClick={() => {
                // Check if the card has a link, then open it in a new tab
                if (card.link) {
                  window.open(card.link, "_blank", "noopener,noreferrer");
                }
              }}
              className={`relative overflow-hidden cursor-pointer transition-all duration-200 flex items-center justify-center ${card.gridClass} ${
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
              <h2 className="relative z-10 font-gta text-3xl md:text-5xl text-white tracking-widest drop-shadow-lg text-center">
                {card.title}
              </h2>
            </div>
          );
        }

        return (
          <div
            key={card.id}
            onMouseEnter={() => setHoveredCard(card)}
            onClick={() => {
                // Check if the card has a link, then open it in a new tab
                if (card.link) {
                  window.open(card.link, "_blank", "noopener,noreferrer");
                }
              }}
            className={`relative overflow-hidden cursor-pointer transition-all duration-200 ${card.gridClass} ${
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
              <div className={`absolute top-2 left-2 px-1.5 py-0.5 text-[10px] md:text-xs font-bold tracking-wider ${card.badgeColor} ${card.badgeTextColor}`}>
                {card.badge}
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="font-gta text-2xl md:text-3xl text-white tracking-wide uppercase drop-shadow-lg leading-none">
                {card.title}
              </h3>
              {card.subtitle && (
                <p className="text-gray-200 text-xs md:text-sm mt-1.5 font-medium drop-shadow-md">
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