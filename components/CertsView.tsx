"use client";

import React, { useState, useRef, useEffect } from "react";
import GtaLayout from "./GtaLayout";
import { useWasdNavigation } from "@/hooks/useWasdNavigation";


// Certifications Data
const CERTS = [
  {
    id: "aws-cloud",
    title: "AWS CLOUD PRACTITIONER",
    badge: "VERIFIED",
    badgeColor: "bg-[#fabb15]",
    badgeText: "text-black",
    description1: "Select to view AWS Certified Cloud Practitioner credentials.",
    description2: "Successfully passed the professional certification exam, demonstrating foundational knowledge of cloud concepts, AWS services, security, architecture, pricing, and support.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600",
  },
  {
    id: "k-youth",
    title: "K-YOUTH x GIFT",
    badge: "COMPLETED",
    badgeColor: "bg-[#2ecc71]",
    badgeText: "text-black",
    description1: "Select to view the K-Youth x GIFT Programme completion.",
    description2: "Accepted into the inaugural cohort of the MTDC GIFT training program, leading directly to a professional placement within the UOB Intermark office.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600",
  },
  {
    id: "qa-tosca",
    title: "AUTOMATION TOOLING",
    badge: "TECHNICAL",
    badgeColor: "bg-[#4a90e2]",
    badgeText: "text-white",
    description1: "Select to view QA automation proficiency.",
    description2: "Extensive hands-on experience and proficiency in Tricentis Tosca, Selenium, and Maven for enterprise software quality assurance and automated test execution.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600",
  },
  {
    id: "degree",
    title: "SOFTWARE ENGINEERING",
    badge: "DEGREE",
    badgeColor: "bg-[#4a90e2]",
    badgeText: "text-white",
    description1: "Select to view academic background.",
    description2: "Final-year Software Engineering student. Developed the AutoMate Final Year Project and completed enterprise-level internships at CIMB and UOB.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600",
  }
];

export default function CertsView() {
  const [activeCert, setActiveCert] = useState(CERTS[0]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useWasdNavigation(CERTS, setActiveCert, carouselRef);

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
      footerText={activeCert.description1}
      mainContainerClass="flex-grow flex flex-col gap-1 overflow-hidden"
    >
      {/* Top Hero Section */}
      <div className="relative w-full flex-grow min-h-[40vh] bg-[#1a1a1a]">
        <img
          src={activeCert.image}
          alt={activeCert.title}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        
        <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-12 max-w-lg">
          {activeCert.badge && (
            <span className={`inline-block px-1.5 py-0.5 text-[11px] font-bold tracking-wider mb-2 ${activeCert.badgeColor} ${activeCert.badgeText}`}>
              {activeCert.badge}
            </span>
          )}
          <h1 className="font-gta text-5xl md:text-6xl text-white tracking-wide uppercase drop-shadow-lg mb-4">
            {activeCert.title}
          </h1>
          <div className="space-y-4 text-gray-200 text-sm md:text-base font-medium leading-relaxed drop-shadow-md pr-4">
            <p>{activeCert.description1}</p>
            <p>{activeCert.description2}</p>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Carousel */}
      <div 
        ref={carouselRef}
        onWheel={handleScroll}
        className="h-[22vh] min-h-[160px] shrink-0 flex gap-1 md:gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory pt-1 pb-2"
      >
        {CERTS.map((cert) => {
          const isActive = activeCert.id === cert.id;
          
          return (
            <div
              key={cert.id}
              // Only trigger the hover if we are NOT in keyboard mode!
              onMouseEnter={() => {
                if (!isKeyboardMode.current) {
                  setActiveCert(cert);
                }
              }}
              onClick={() => setActiveCert(cert)}
              className={`relative shrink-0 w-[320px] md:w-[400px] lg:w-[460px] h-full cursor-pointer snap-start transition-all duration-200 ${
                isActive ? "border-[3px] border-white scale-[0.98] z-10" : "border-[3px] border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={cert.thumb}
                alt={cert.title}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {cert.badge && (
                <div className={`absolute top-2 left-2 px-1.5 py-0.5 text-[10px] font-bold tracking-wider ${cert.badgeColor} ${cert.badgeText}`}>
                  {cert.badge}
                </div>
              )}
              
              <h3 className="absolute bottom-2 left-3 font-gta text-xl md:text-2xl text-white tracking-wide uppercase drop-shadow-md">
                {cert.title}
              </h3>
            </div>
          );
        })}
      </div>
    </GtaLayout>
  );
}