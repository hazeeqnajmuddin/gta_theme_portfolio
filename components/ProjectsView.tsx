"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import GtaLayout from "./GtaLayout";
import { useSearchParams, useRouter } from "next/navigation";
import { useWasdNavigation } from "@/hooks/useWasdNavigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Wrench, Cpu, Smartphone, Server, CheckCircle2, 
  Code2, Layers, ShieldCheck, Calendar, LayoutDashboard, Lock, 
  Database, Tag, FileText, ShieldAlert, Search, Video, Mic, Sliders, Tv,
  BarChart3, Users, ExternalLink, Globe
} from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export interface ProjectDetailModule {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  badgeText?: string;
  description1: string;
  description2: string;
  image: string;
  thumb: string;
  overview: string;
  modules: ProjectDetailModule[];
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
}

// Project Data
const PROJECTS: ProjectItem[] = [
  {
    id: "automate",
    title: "AUTOMATE SYSTEM",
    subtitle: "Vehicle & Workshop Management Platform",
    badge: "FYP",
    badgeColor: "bg-[#fabb15]",
    badgeText: "text-black",
    description1: "Select to view the AutoMate vehicle and workshop management platform.",
    description2: "An intelligent system built using Laravel, PHP, and MySQL. This project features data preprocessing and decision tree models integrated directly into a responsive web platform to streamline mechanical adjustments and maintain precise vehicle service records.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600",
    overview: "AutoMate is an intelligent end-to-end vehicle service and workshop management platform. Developed using Laravel (PHP) and Flutter, it bridges car owners, mechanics, and workshop managers into a single unified ecosystem with intelligent diagnostic assistance.",
    modules: [
      {
        title: "Workshop Management",
        desc: "Digital service history tracking, job card scheduling, parts inventory management, and automated invoicing.",
        icon: <Wrench className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Decision Tree Diagnostic AI",
        desc: "Data preprocessing and machine learning decision tree models integrated to assist mechanics with maintenance prediction.",
        icon: <Cpu className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Flutter Mobile App",
        desc: "Real-time service updates, appointment booking, and push notifications for vehicle owners.",
        icon: <Smartphone className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Laravel Admin Backend",
        desc: "Robust RESTful API architecture with role-based access control (RBAC) and real-time dashboard analytics.",
        icon: <Server className="w-4 h-4 text-purple-400" />
      }
    ],
    technologies: ["Laravel 10", "PHP 8.2", "Flutter", "Dart", "MySQL", "Decision Tree ML", "REST APIs", "TailwindCSS"]
  },
  {
    id: "qa-suite",
    title: "QA & TEST AUTOMATION",
    subtitle: "Enterprise Software Quality Assurance & Automated Testing",
    badge: "ENTERPRISE",
    badgeColor: "bg-[#4a90e2]",
    badgeText: "text-white",
    description1: "Select to explore enterprise-grade automated test scripts and software quality assurance.",
    description2: "Developed utilizing Selenium, Maven, and Tricentis Tosca. Designed to ensure robust performance and reliability for critical software deliveries during professional operations.",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600",
    overview: "Comprehensive enterprise automated test execution framework built with Selenium WebDriver, Java/Maven, and Tricentis Tosca. Ensures seamless regression testing, API validation, and quality benchmarks for critical corporate software releases.",
    modules: [
      {
        title: "Tosca Automation Engine",
        desc: "Automated model-based GUI & API test execution for complex enterprise business workflows.",
        icon: <CheckCircle2 className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Selenium WebDriver Suite",
        desc: "Cross-browser web automation scripts written in Java utilizing Page Object Model (POM) design patterns.",
        icon: <Code2 className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Maven & CI/CD Pipelines",
        desc: "Automated build scripts and test execution runners integrated into Jenkins & Azure DevOps pipelines.",
        icon: <Layers className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Defect Reporting & QA Logs",
        desc: "Detailed execution reports, bug tracing, and automated screenshot attachments for audit trail compliance.",
        icon: <ShieldCheck className="w-4 h-4 text-purple-400" />
      }
    ],
    technologies: ["Tricentis Tosca", "Selenium WebDriver", "Java", "Maven", "JUnit", "Jenkins", "API Testing", "POM Design"]
  },
  {
    id: "preacher",
    title: "PREACHER MANAGEMENT",
    subtitle: "Administrative Backend & Operational Workflow Platform",
    badge: "MOBILE APPLICATION",
    badgeColor: "bg-emerald-600",
    badgeText: "text-white",
    description1: "Select to view the Preacher Management System.",
    description2: "A dedicated administrative backend constructed using the MVC framework and Flutter, facilitating organized data structuring and operational management workflows.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600",
    overview: "A dedicated administrative web application constructed using the Laravel framework and PHP. Facilitates organized data structuring, schedule management, content cataloging, and operational workflows for administrative staff.",
    modules: [
      {
        title: "Schedule & Event Booking",
        desc: "Digital scheduling and allocation tools for event assignments and venue bookings.",
        icon: <Calendar className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Administrative Portal",
        desc: "Centralized portal for managing profiles, credentials, and activity logs.",
        icon: <LayoutDashboard className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Role-Based Access Control",
        desc: "Multi-tier user authorization separating admin, moderator, and general user permissions.",
        icon: <Lock className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Data Indexing & Reports",
        desc: "Filterable record querying, CSV export capabilities, and audit log generation.",
        icon: <Database className="w-4 h-4 text-purple-400" />
      }
    ],
    technologies: ["Laravel 10", "PHP 8.2", "MySQL", "Blade Templates", "REST APIs", "Bootstrap", "Composer"]
  },
  {
    id: "telecom-analytics",
    title: "TELECOM DATA ANALYTICS",
    subtitle: "INFINI Technology: 1.4M+ Transactions Data Science Capstone",
    badge: "DATA ANALYTICS",
    badgeColor: "bg-purple-600",
    badgeText: "text-white",
    description1: "Select to view the INFINI Telecom Data Analytics Capstone project.",
    description2: "Analyzed over 1.4M+ transaction records using Pareto analysis, K-Means clustering, and interactive Power BI dashboards tracking RM931.05M in total revenue.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
    overview: "A comprehensive Telecommunications Data Analytics Capstone for INFINI Technology. Ingested and cleaned 1.4M+ raw transaction records into a master dataset, applied Pareto Analysis (80/20 rule) across 150,000+ items, and performed K-Means clustering on 4,000+ customer accounts to deliver interactive Power BI dashboards driving RM931.05M in total revenue insights.",
    githubUrl: "https://github.com/hazeeqnajmuddin/GIFT_DA_Capstone",
    modules: [
      {
        title: "1.4M+ Data Ingestion & Cleaning",
        desc: "Processed, cleaned, and merged over 1.4 million raw transaction records into a unified master dataset.",
        icon: <Database className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Pareto 80/20 Revenue Analysis",
        desc: "Isolated core revenue-generating product categories and top sales drivers across 150,000+ line items.",
        icon: <BarChart3 className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "K-Means Customer Clustering",
        desc: "Segmented 4,000+ unique customer accounts using the Elbow Method (Cluster 3: 57.68% total revenue).",
        icon: <Users className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Power BI Executive Dashboards",
        desc: "Built interactive dashboards tracking RM931.05M revenue and actionable 15% ARPA growth strategies.",
        icon: <LayoutDashboard className="w-4 h-4 text-purple-400" />
      }
    ],
    technologies: ["Python", "Pandas", "K-Means Clustering", "Power BI", "Pareto Analysis", "Jupyter", "Data Science", "Git"]
  },
  {
    id: "chillax-app",
    title: "CHILLAX MOBILE APP",
    subtitle: "Native Android Mobile Experience & Lifestyle Platform",
    badge: "ANDROID APP",
    badgeColor: "bg-emerald-600",
    badgeText: "text-white",
    description1: "Select to view the Chillax Mobile Application project.",
    description2: "Developed using Android Studio and Kotlin. Designed for seamless mobile user interaction, responsive UI layouts, and structured Kotlin Android architecture.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600",
    overview: "A native Android mobile application engineered using Kotlin and Android Studio. Features structured Kotlin architecture, responsive user interface layouts, Gradle build automation, and smooth mobile user workflows designed for modern smartphone experiences.",
    githubUrl: "https://github.com/hazeeqnajmuddin/ChillaxApp",
    modules: [
      {
        title: "Kotlin Android Architecture",
        desc: "Engineered with clean Kotlin architecture, activity lifecycles, and Jetpack components.",
        icon: <Smartphone className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Responsive Mobile UI",
        desc: "Smooth UI layouts tailored for various Android screen sizes and densities.",
        icon: <Code2 className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Gradle Build System",
        desc: "Configured with Kotlin DSL (build.gradle.kts) for modular build automation.",
        icon: <Layers className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Mobile Resource Pipeline",
        desc: "Optimized asset management, vector drawables, and application resource indexing.",
        icon: <LayoutDashboard className="w-4 h-4 text-purple-400" />
      }
    ],
    technologies: ["Kotlin", "Android Studio", "Android SDK", "Gradle (KTS)", "Jetpack", "Mobile Dev", "Git"]
  },
  {
    id: "rcms-crm",
    title: "RCMS - LEAD CRM & PIPELINE",
    subtitle: "Relationship & Customer Lead Pipeline Engine",
    badge: "FULL-STACK",
    badgeColor: "bg-[#fabb15]",
    badgeText: "text-black",
    description1: "Select to view the RCMS Lead CRM & Pipeline Platform.",
    description2: "A full-stack Laravel application engineered for customer lead acquisition, multi-stage sales pipeline tracking, document merging, and business analytics.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600",
    overview: "A comprehensive full-stack Relationship and Customer Lead Management System (RCMS) constructed with Laravel 10, PHP 8.2, MySQL, and TailwindCSS. Streamlines multi-channel lead acquisition, logs sales pipeline transitions, categorizes customer issues, automates compliance document merging, and provides real-time executive dashboard analytics.",
    demoUrl: "https://rahmahconsultancy.com/",
    modules: [
      {
        title: "Multi-Channel Lead Intake",
        desc: "Dynamic public lead intake forms with real-time validation and automated thank-you routing.",
        icon: <Users className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Sales Funnel & Stage Pipeline",
        desc: "Tracks customer leads across multi-stage pipelines with issue logging and acquisition source attribution.",
        icon: <Layers className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Automated Document Merging",
        desc: "Compliance document management with automated file merging and PDF attachment compilation.",
        icon: <FileText className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Analytics & Conversion Reports",
        desc: "Real-time performance metrics, lead conversion reporting, and CSV data export engines.",
        icon: <BarChart3 className="w-4 h-4 text-purple-400" />
      }
    ],
    technologies: ["Laravel 10", "PHP 8.2", "MySQL", "TailwindCSS", "Vite", "Blade", "PDF Engine", "Git"]
  }
];

interface ProjectsViewProps {
  onNavigate?: (path: string) => void;
  activeTab?: string;
  initialActiveId?: string;
}

function ProjectsContent({ onNavigate, activeTab = "/projects", initialActiveId }: ProjectsViewProps) {
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const searchParams = useSearchParams();

  // Pass isModalOpen so background WASD navigation is disabled while modal is open
  useWasdNavigation(PROJECTS, setActiveProject, carouselRef, isModalOpen);

  useEffect(() => {
    const activeId = initialActiveId || searchParams.get("active");
    
    if (activeId) {
      const targetProject = PROJECTS.find((p) => p.id === activeId);
      
      if (targetProject) {
        setActiveProject(targetProject);
        
        const targetIndex = PROJECTS.findIndex(p => p.id === activeId);
        if (carouselRef.current && targetIndex !== -1) {
          setTimeout(() => {
            const cardElement = carouselRef.current?.children[targetIndex] as HTMLElement;
            if (cardElement) {
              cardElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
          }, 100);
        }
      }
    }
  }, [searchParams, initialActiveId]);

  const isKeyboardMode = useRef(false);

  useEffect(() => {
    const handleMouseMove = () => {
      isKeyboardMode.current = false;
    };
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

  // Listen for Enter / ESC key and enable WASD scrolling inside modal
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
          modalBodyRef.current?.scrollBy({ top: -140, behavior: "smooth" });
        } else if (key === "s" || key === "arrowdown" || key === "d" || key === "arrowright") {
          e.preventDefault();
          e.stopPropagation();
          modalBodyRef.current?.scrollBy({ top: 140, behavior: "smooth" });
        } else if (['q', 'e', 'enter'].includes(key)) {
          e.preventDefault();
          e.stopPropagation();
        }
      } else {
        if (key === "enter") {
          e.preventDefault();
          setIsModalOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDownCapture, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDownCapture, { capture: true });
  }, [isModalOpen]);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (carouselRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const scrollAmount = e.deltaY > 0 ? 400 : -400;
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleCardClick = (project: ProjectItem) => {
    if (activeProject.id === project.id) {
      setIsModalOpen(true);
    } else {
      setActiveProject(project);
    }
  };

  return (
    <GtaLayout 
      activeTab={activeTab}
      onTabChange={(path) => onNavigate ? onNavigate(path) : router.push(path)}
      footerText="Select or press ENTER to inspect project details."
      mainContainerClass="flex-1 flex flex-col gap-1.5 md:gap-2 min-h-0 overflow-hidden mb-2 md:mb-3"
    >
      {/* Top Hero Section */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className="relative w-full flex-grow min-h-[40vh] bg-[#1a1a1a] cursor-pointer group"
      >
        <img
          src={activeProject.image}
          alt={activeProject.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
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
          <p className="text-gray-200 text-sm md:text-base leading-relaxed drop-shadow">
            {activeProject.description2}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="mt-5 px-4 py-2 bg-[#fabb15] hover:bg-[#e0a710] text-black font-gta text-lg md:text-xl tracking-wider rounded-sm shadow-lg flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
          >
            <span>VIEW SYSTEM DETAILS</span>
            <span className="text-xs bg-black text-white px-2 py-0.5 rounded font-sans font-bold">↵ ENTER</span>
          </button>
        </div>
      </div>

      {/* Bottom Horizontal Carousel */}
      <div 
        ref={carouselRef}
        onWheel={handleScroll}
        className="h-44 md:h-52 w-full flex gap-3 overflow-x-auto overflow-y-hidden pb-2 select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {PROJECTS.map((project) => {
          const isActive = activeProject.id === project.id;
          
          return (
            <div
              key={project.id}
              onClick={() => handleCardClick(project)}
              onMouseEnter={() => {
                if (!isKeyboardMode.current && typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
                  setActiveProject(project);
                }
              }}
              className={`relative flex-shrink-0 w-80 md:w-96 h-full cursor-pointer overflow-hidden transition-all duration-200 ${
                isActive 
                  ? "border-[3px] border-white z-10 scale-[1.02]" 
                  : "border-[3px] border-transparent opacity-60 hover:opacity-100"
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

      {/* GTA V STYLED POP-UP MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md">
            {/* Modal Backdrop Click to Close */}
            <div 
              className="absolute inset-0" 
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 w-full max-w-3xl max-h-[85vh] bg-[#16181c] border-2 border-white/20 rounded-sm shadow-2xl overflow-hidden flex flex-col text-white"
            >
              {/* Header Image Banner */}
              <div className="relative h-48 md:h-56 shrink-0 overflow-hidden bg-black">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16181c] via-black/40 to-transparent" />
                
                {/* Top Badge */}
                <div className="absolute top-4 left-6 flex items-center gap-2">
                  {activeProject.badge && (
                    <span className={`px-2 py-0.5 text-xs font-bold tracking-wider rounded-sm ${activeProject.badgeColor} ${activeProject.badgeText}`}>
                      {activeProject.badge}
                    </span>
                  )}
                  <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-bold tracking-wider rounded-sm backdrop-blur-sm">
                    PROJECT SPECS
                  </span>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-white text-white hover:text-black p-2 rounded-sm transition-colors border border-white/20 flex items-center gap-1 text-xs font-bold"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden md:inline">ESC</span>
                </button>

                {/* Title Overlay */}
                <div className="absolute bottom-4 left-6 right-6">
                  <h2 className="font-gta text-4xl md:text-5xl tracking-wide text-white drop-shadow-lg uppercase leading-none">
                    {activeProject.title}
                  </h2>
                  <p className="text-gray-300 text-xs md:text-sm font-medium mt-1">
                    {activeProject.subtitle}
                  </p>
                </div>
              </div>

              {/* Modal Body Content */}
              <div 
                ref={modalBodyRef}
                className="p-6 overflow-y-auto space-y-6 flex-grow scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20"
              >
                {/* Overview */}
                <div>
                  <h3 className="font-gta text-xl text-[#fabb15] tracking-wider mb-2 uppercase">
                    SYSTEM OVERVIEW
                  </h3>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    {activeProject.overview}
                  </p>
                </div>

                {/* Core Modules Grid */}
                <div>
                  <h3 className="font-gta text-xl text-[#fabb15] tracking-wider mb-3 uppercase">
                    CORE MODULES & CAPABILITIES
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeProject.modules.map((module, idx) => (
                      <div key={idx} className="p-3.5 bg-black/50 border border-white/10 rounded-sm">
                        <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
                          {module.icon}
                          <span>{module.title}</span>
                        </div>
                        <p className="text-gray-300 text-xs leading-normal">
                          {module.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <h3 className="font-gta text-xl text-[#fabb15] tracking-wider mb-2 uppercase">
                    TECHNOLOGIES USED
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 bg-white/10 text-white text-xs font-semibold rounded-sm border border-white/10 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#2ecc71]" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External Action Links (Live Site & GitHub) */}
                {(activeProject.demoUrl || activeProject.githubUrl) && (
                  <div className="pt-2 flex flex-wrap gap-3">
                    {activeProject.demoUrl && (
                      <a
                        href={activeProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#fabb15] hover:bg-[#e0a710] text-black font-gta text-sm md:text-base tracking-wider rounded-sm shadow-md transition-all hover:scale-105 active:scale-95"
                      >
                        <Globe className="w-4 h-4" />
                        <span>VISIT LIVE WEBSITE</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {activeProject.githubUrl && (
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-gta text-sm md:text-base tracking-wider rounded-sm shadow-md border border-white/20 transition-all hover:scale-105 active:scale-95"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>OPEN GITHUB REPOSITORY</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
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
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">Exit:</span>
                    <kbd className="bg-white/20 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">ESC</kbd>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-1.5 bg-white hover:bg-gray-200 text-black font-gta text-base tracking-wider rounded-sm transition-colors"
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

export default function ProjectsView(props: ProjectsViewProps) {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-[#1a1a1a] text-white flex items-center justify-center font-gta">Loading Projects...</div>}>
      <ProjectsContent {...props} />
    </Suspense>
  );
}