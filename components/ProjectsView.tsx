"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import GtaLayout from "./GtaLayout";
import GtaModal from "./GtaModal";
import { useInputDeviceMode } from "@/hooks/useInputDeviceMode";
import { useSearchParams, useRouter } from "next/navigation";
import { useWasdNavigation } from "@/hooks/useWasdNavigation";
import { 
  Wrench, Cpu, Smartphone, Server, CheckCircle2, 
  Code2, Layers, Calendar, LayoutDashboard, Lock, 
  Database, FileText, BarChart3, Users
} from "lucide-react";

export interface ProjectDetailModule {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export interface ProjectGithubLink {
  label: string;
  url: string;
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
  githubLinks?: ProjectGithubLink[];
}

// Project Data
const PROJECTS: ProjectItem[] = [
  {
    id: "automate",
    title: "AUTOMATE SYSTEM",
    subtitle: "Degree FYP Thesis & Vehicle Workshop Platform",
    badge: "DEGREE FYP",
    badgeColor: "bg-[#fabb15]",
    badgeText: "text-black",
    description1: "Select to view the AutoMate vehicle and workshop management platform.",
    description2: "An intelligent full-stack system built using Laravel 10, PHP, MySQL, and Python ML microservices. Developed as a Bachelor's Degree Final Year Project (FYP) accompanied by an academic thesis on Decision Tree AI diagnostics.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600",
    overview: "AutoMate is an intelligent end-to-end vehicle service and workshop management platform engineered for Hazeeq's Software Engineering Bachelor's Degree Final Year Project (FYP). Backed by a formal academic thesis, the system utilizes a multi-repository architecture connecting a main Laravel 10 MVC web app with Python Flask AI microservices executing Scikit-Learn Decision Tree classification algorithms for vehicle fault prediction.",
    modules: [
      {
        title: "Workshop Management System",
        desc: "Digital service history tracking, job card scheduling, parts inventory management, and automated customer invoicing.",
        icon: <Wrench className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Decision Tree Diagnostic AI Engine",
        desc: "Integrated Scikit-Learn decision tree classification models assisting mechanics with fault detection and predictive maintenance.",
        icon: <Cpu className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Degree Thesis & Academic Research",
        desc: "Authored formal degree thesis detailing system architecture, machine learning model evaluation, and diagnostic accuracy benchmarks.",
        icon: <FileText className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Laravel 10 Admin & Microservice REST API",
        desc: "Robust MVC architecture connecting web clients to isolated Python Flask AI microservice API endpoints.",
        icon: <Server className="w-4 h-4 text-purple-400" />
      }
    ],
    technologies: ["Laravel 10", "PHP 8.2", "Python Flask API", "Decision Tree AI", "Scikit-Learn", "MySQL", "Degree Thesis", "RESTful Microservices"],
    githubUrl: "https://github.com/hazeeqnajmuddin/automate",
    githubLinks: [
      { label: "MAIN WEB REPO", url: "https://github.com/hazeeqnajmuddin/automate" },
      { label: "AI MICROSERVICE API", url: "https://github.com/hazeeqnajmuddin/automate-ai-api" },
      { label: "DECISION TREE AI MODEL", url: "https://github.com/hazeeqnajmuddin/automate_dt_ai" }
    ]
  },
  {
    id: "qa-suite",
    title: "QA & TEST AUTOMATION",
    subtitle: "Enterprise Software Quality Assurance & Automated Testing",
    badge: "ENTERPRISE",
    badgeColor: "bg-[#4a90e2]",
    badgeText: "text-white",
    description1: "Select to explore enterprise-grade automated test scripts and software quality assurance.",
    description2: "Developed utilizing Perfecto Mobile Cloud, Selenium WebDriver, Maven, and Tricentis Tosca. Designed to ensure robust performance and reliability for critical software deliveries during UOB banking operations.",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600",
    overview: "Comprehensive enterprise automated test execution framework built with Perforce Perfecto Mobile Cloud, Selenium WebDriver, Java/Maven, and Tricentis Tosca (AS1 & AS2). Ensures seamless regression testing, real device mobile validation, and quality benchmarks for banking releases.",
    modules: [
      {
        title: "Perfecto Mobile Cloud Testing",
        desc: "Automated real-device testing for iOS and Android native/web apps on Perforce Perfecto Cloud.",
        icon: <Smartphone className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Tosca Automation Engine",
        desc: "Automated model-based GUI & API test execution for complex enterprise business workflows.",
        icon: <CheckCircle2 className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Selenium WebDriver Suite",
        desc: "Cross-browser web automation scripts written in Java utilizing Page Object Model (POM) design patterns.",
        icon: <Code2 className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Maven & CI/CD Pipelines",
        desc: "Automated build scripts and test execution runners integrated into Jenkins & Azure DevOps pipelines.",
        icon: <Layers className="w-4 h-4 text-purple-400" />
      }
    ],
    technologies: ["Perfecto Mobile", "Tricentis Tosca", "Selenium WebDriver", "Java", "Maven", "Appium", "JUnit", "Jenkins"]
  },
  {
    id: "preacher",
    title: "PREACHER MONITORING SYSTEM",
    subtitle: "Flutter Mobile App & Firebase Realtime Cloud Backend",
    badge: "FLUTTER MOBILE",
    badgeColor: "bg-[#00a8ff]",
    badgeText: "text-white",
    description1: "Select to view the Preacher Monitoring System (PMS).",
    description2: "A mobile & web Preacher Monitoring System (PMS) constructed with Flutter, Firebase Cloud Database, and Laravel backend. Features real-time schedule tracking, preacher assignment monitoring, and instant cloud data sync.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600",
    overview: "The Preacher Monitoring System (PMS) is a multi-platform mobile application engineered with Flutter, Firebase NoSQL Cloud Database, and Firebase Authentication. Enables real-time schedule tracking, preacher assignment monitoring, lecture topic cataloging, and instant cloud data synchronization.",
    modules: [
      {
        title: "Flutter Cross-Platform Mobile App",
        desc: "Mobile client application built with Flutter & Dart for real-time preacher assignment tracking and schedule alerts.",
        icon: <Smartphone className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Firebase Realtime Cloud Database",
        desc: "Real-time data synchronization powered by Firebase Cloud Database for instant schedule updates and roster sync.",
        icon: <Database className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Preacher Schedule & Event Monitoring",
        desc: "Digital tracking tools for monitoring preacher assignments, event locations, and live schedule statuses.",
        icon: <Calendar className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Firebase Auth & Security Rules",
        desc: "Multi-tier user authentication using Firebase Auth with secure cloud database security rules.",
        icon: <Lock className="w-4 h-4 text-purple-400" />
      }
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Cloud Firestore", "Firebase Auth", "Laravel", "REST APIs", "Git"]
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
  initialNoModal?: boolean;
}

function ProjectsContent({ onNavigate, activeTab = "/projects", initialActiveId, initialNoModal }: ProjectsViewProps) {
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useWasdNavigation(PROJECTS, setActiveProject, carouselRef, isModalOpen);

  const searchParams = useSearchParams();

  useEffect(() => {
    const activeId = initialActiveId || searchParams.get("active");
    const isNoModal = initialNoModal ?? (searchParams.get("noModal") === "true");
    if (activeId) {
      const targetProject = PROJECTS.find(p => p.id === activeId);
      if (targetProject) {
        setActiveProject(targetProject);
        if (!isNoModal) {
          setIsModalOpen(true);
        }
      }
    }
  }, [searchParams, initialActiveId, initialNoModal]);

  const isKeyboardMode = useInputDeviceMode();

  // Background key listener for Enter to open modal when modal is closed
  useEffect(() => {
    const handleKeyDownCapture = (e: KeyboardEvent) => {
      if (!isModalOpen && e.key.toLowerCase() === "enter") {
        e.preventDefault();
        setIsModalOpen(true);
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
        
        <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 md:left-12 right-4 max-w-lg">
          {activeProject.badge && (
            <span className={`inline-block px-1.5 py-0.5 text-[10px] sm:text-[11px] font-bold tracking-wider mb-1.5 sm:mb-2 ${activeProject.badgeColor} ${activeProject.badgeText}`}>
              {activeProject.badge}
            </span>
          )}
          <h1 className="font-gta text-3xl sm:text-5xl md:text-6xl text-white tracking-wide uppercase drop-shadow-lg mb-2 sm:mb-4">
            {activeProject.title}
          </h1>
          <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed drop-shadow line-clamp-2 sm:line-clamp-none">
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
            <span className="text-xs bg-black text-white px-2 py-0.5 rounded font-sans font-bold">ENTER</span>
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
                if (!isModalOpen && !isKeyboardMode.current && typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
                  setActiveProject(project);
                }
              }}
              className={`relative flex-shrink-0 w-80 md:w-96 h-full cursor-pointer overflow-hidden transition-all duration-200 border border-white/20 md:border-[3px] ${
                isActive 
                  ? "md:border-white z-10 md:scale-[1.02]" 
                  : "md:border-transparent opacity-100 md:opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={project.thumb}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent md:from-black/90 md:via-black/20" />
              
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
      <GtaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        card={activeProject ? {
          id: activeProject.id,
          title: activeProject.title,
          subtitle: activeProject.subtitle,
          badge: activeProject.badge,
          badgeColor: activeProject.badgeColor,
          badgeText: activeProject.badgeText,
          image: activeProject.image,
          overview: activeProject.overview,
          highlights: activeProject.modules,
          tags: activeProject.technologies,
          demoUrl: activeProject.demoUrl,
          githubUrl: activeProject.githubUrl,
          githubLinks: activeProject.githubLinks,
        } : null}
      />
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