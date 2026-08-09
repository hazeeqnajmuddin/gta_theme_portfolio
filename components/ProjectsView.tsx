"use client";

import React, { useState, useRef, useEffect } from "react";
import GtaLayout from "./GtaLayout";
import { useWasdNavigation } from "@/hooks/useWasdNavigation";

// Project Data
const PROJECTS = [
  {
    id: "automate",
    title: "AUTOMATE",
    badge: "NEW",
    badgeColor: "bg-[#fabb15]",
    badgeText: "text-black",
    description1: "Select to view the AutoMate vehicle and workshop management platform.",
    description2: "An intelligent system built using Laravel, PHP, and Flutter. This project features data preprocessing and decision tree models integrated directly into a responsive web platform to streamline mechanical adjustments and maintain precise vehicle service records.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600",
  },
  {
    id: "qa-suite",
    title: "QA AUTOMATION",
    badge: "ENTERPRISE",
    badgeColor: "bg-[#4a90e2]",
    badgeText: "text-white",
    description1: "Select to explore enterprise-grade automated test scripts and software quality assurance.",
    description2: "Developed utilizing Selenium, Maven, and Tricentis Tosca. Designed to ensure robust performance and reliability for critical software deliveries during professional operations.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600",
  },
  {
    id: "preacher",
    title: "PREACHER SYSTEM",
    description1: "Select to view the Preacher Management System.",
    description2: "A dedicated administrative backend constructed using the Laravel framework and PHP, facilitating organized data structuring and operational management workflows.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600",
  },
  {
    id: "asset-tracking",
    title: "ASSET TRACKING",
    description1: "Select to view the administrative asset tracking protocol.",
    description2: "Processed verification steps and lifecycle tracking for organizational assets under reference number UMA729072025001361.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600",
  },
  {
    id: "content-setup",
    title: "CONTENT CAPTURE",
    description1: "Select to review the broadcast integration configurations.",
    description2: "Configured face cameras, capture cards, and audio recording pipelines to capture mobile and PC gameplay for high-quality distribution on YouTube and TikTok.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600",
  }
];

export default function ProjectsView() {
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useWasdNavigation(PROJECTS, setActiveProject, carouselRef);

  // Track if the user is currently using the keyboard
  const isKeyboardMode = useRef(false);

  useEffect(() => {
    // If the mouse physically moves, turn off keyboard mode
    const handleMouseMove = () => {
      isKeyboardMode.current = false;
    };
    // If a key is pressed, turn on keyboard mode
    const handleKeyDown = () => {
      isKeyboardMode.current = true;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (carouselRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const scrollAmount = e.deltaY > 0 ? 400 : -400;
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <GtaLayout 
      footerText={activeProject.description1}
      mainContainerClass="flex-grow flex flex-col gap-1 overflow-hidden"
    >
      {/* Top Hero Section */}
      <div className="relative w-full flex-grow min-h-[40vh] bg-[#1a1a1a]">
        <img
          src={activeProject.image}
          alt={activeProject.title}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        
        <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-12 max-w-lg">
          {activeProject.badge && (
            <span className={`inline-block px-1.5 py-0.5 text-[11px] font-bold tracking-wider mb-2 ${activeProject.badgeColor} ${activeProject.badgeText}`}>
              {activeProject.badge}
            </span>
          )}
          <h1 className="font-gta text-5xl md:text-6xl text-white tracking-wide uppercase drop-shadow-lg mb-4">
            {activeProject.title}
          </h1>
          <div className="space-y-4 text-gray-200 text-sm md:text-base font-medium leading-relaxed drop-shadow-md pr-4">
            <p>{activeProject.description1}</p>
            <p>{activeProject.description2}</p>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Carousel */}
      <div 
        ref={carouselRef}
        onWheel={handleScroll}
        className="h-[22vh] min-h-[160px] shrink-0 flex gap-1 md:gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory pt-1 pb-2"
      >
        {PROJECTS.map((project) => {
          const isActive = activeProject.id === project.id;
          
          return (
            <div
              key={project.id}
              // Only trigger the hover if we are NOT in keyboard mode!
              onMouseEnter={() => {
                if (!isKeyboardMode.current) {
                  setActiveProject(project);
                }
              }}
              onClick={() => setActiveProject(project)}
              className={`relative shrink-0 w-[320px] md:w-[400px] lg:w-[460px] h-full cursor-pointer snap-start transition-all duration-200 ${
                isActive ? "border-[3px] border-white scale-[0.98] z-10" : "border-[3px] border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={project.thumb}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {project.badge && (
                <div className={`absolute top-2 left-2 px-1.5 py-0.5 text-[10px] font-bold tracking-wider ${project.badgeColor} ${project.badgeText}`}>
                  {project.badge}
                </div>
              )}
              
              <h3 className="absolute bottom-2 left-3 font-gta text-xl md:text-2xl text-white tracking-wide uppercase drop-shadow-md">
                {project.title}
              </h3>
            </div>
          );
        })}
      </div>
    </GtaLayout>
  );
}