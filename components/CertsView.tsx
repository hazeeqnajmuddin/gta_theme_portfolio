"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import GtaLayout from "./GtaLayout";
import { useWasdNavigation } from "@/hooks/useWasdNavigation";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Cloud, Server, ShieldCheck, DollarSign, Building2, Code2, 
  Award, Briefcase, CheckCircle2, Terminal, Layers, FileCheck, 
  GraduationCap, Laptop, Building, BookOpen, ExternalLink
} from "lucide-react";

export interface CertDetailHighlight {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export interface CertBadgeLink {
  label: string;
  url: string;
}

export interface CertItem {
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
  highlights: CertDetailHighlight[];
  skills: string[];
  badgeUrl?: string;
  badgeLinks?: CertBadgeLink[];
}

// Certifications Data
const CERTS: CertItem[] = [
  {
    id: "aws-cloud",
    title: "AWS CLOUD PRACTITIONER",
    subtitle: "Amazon Web Services Official Certification (Apr 2026)",
    badge: "VERIFIED",
    badgeColor: "bg-[#fabb15]",
    badgeText: "text-black",
    description1: "Select or press ENTER to view AWS Certified Cloud Practitioner credentials.",
    description2: "Officially certified by Amazon Web Services (AWS). Demonstrates foundational expertise in cloud architecture concepts, core AWS services, IAM security governance, billing models, and infrastructure reliability.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600",
    overview: "Successfully earned the official AWS Certified Cloud Practitioner certification in April 2026. Validates core cloud engineering knowledge across EC2 compute, S3 storage, RDS databases, VPC network isolation, IAM security policies, and cost optimization strategies.",
    highlights: [
      {
        title: "Cloud Architecture & Global Infrastructure",
        desc: "AWS Global Regions, Availability Zones, Edge Locations, and Shared Responsibility Security Model.",
        icon: <Cloud className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Core Infrastructure & Database Services",
        desc: "EC2 virtual servers, S3 object storage, RDS relational databases, VPC networking, and IAM access controls.",
        icon: <Server className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Security, Compliance & IAM Governance",
        desc: "AWS KMS key encryption, Security Groups, Network ACLs, IAM roles, and AWS WAF protective measures.",
        icon: <ShieldCheck className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Billing, Cost Management & Budgets",
        desc: "AWS Cost Explorer, Budgets, Savings Plans, Reserved Instances, and Pricing Calculator strategies.",
        icon: <DollarSign className="w-4 h-4 text-purple-400" />
      }
    ],
    skills: ["AWS Cloud", "EC2 & S3", "IAM Security", "VPC Architecture", "CloudWatch", "Cost Optimization"],
    badgeUrl: "https://www.credly.com/badges/a19f3ba4-96ce-404a-a085-b9701bf76496/linked_in_profile",
    badgeLinks: [
      { label: "VERIFY CREDLY BADGE", url: "https://www.credly.com/badges/a19f3ba4-96ce-404a-a085-b9701bf76496/linked_in_profile" }
    ]
  },
  {
    id: "tosca-as1-as2",
    title: "TRICENTIS TOSCA AS1 & AS2",
    subtitle: "Tricentis Tosca Automation Specialist 1 & 2 (Mar 2026)",
    badge: "AUTOMATION",
    badgeColor: "bg-[#4a90e2]",
    badgeText: "text-white",
    description1: "Select or press ENTER to view Tricentis Tosca AS1 & AS2 certifications.",
    description2: "Dual certification in Tricentis Tosca: AS1 (Automating Web Application Testing) and AS2 (Optimizing Test Automation with Centralized Test Data).",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600",
    overview: "Earned dual professional certifications from Tricentis Tosca in March 2026: Automating Web Application Testing (AS1) and Optimizing Test Automation with Centralized Test Data (AS2). Demonstrates high proficiency in model-based test automation, dynamic test data management, and banking QA execution.",
    highlights: [
      {
        title: "AS1: Automating Web Application Testing",
        desc: "Model-based test creation, scanning web elements, automated GUI navigation, and execution lists.",
        icon: <CheckCircle2 className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "AS2: Centralized Test Data Optimization",
        desc: "Dynamic Test Data Management (TDM), Test Data Service (TDS), and reusable data sheets.",
        icon: <Terminal className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Enterprise Quality Assurance & Banking QA",
        desc: "Applied in enterprise banking projects (UOB) achieving 98% test stability and zero-failure codebases.",
        icon: <Layers className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Automated Regression & API Execution",
        desc: "Continuous regression test execution, test case documentation, and defect reporting workflows.",
        icon: <FileCheck className="w-4 h-4 text-purple-400" />
      }
    ],
    skills: ["Tricentis Tosca AS1", "Tricentis Tosca AS2", "Model-Based Testing", "Test Data Management", "Regression QA"],
    badgeLinks: [
      { label: "VERIFY TOSCA AS1 BADGE", url: "https://academy.tricentis.com/share/gamification/badges/external/82ed3197-9658-4132-972f-25249ec9a79b?lang=en" },
      { label: "VERIFY TOSCA AS2 BADGE", url: "https://academy.tricentis.com/share/gamification/badges/external/e3b59e31-96fd-42ae-a31e-df04830930b9?lang=en" }
    ]
  },
  {
    id: "google-ux",
    title: "GOOGLE UX DESIGN CERTIFICATION",
    subtitle: "Google via Coursera UX Professional Courses (Jun - Jul 2026)",
    badge: "GOOGLE UX",
    badgeColor: "bg-purple-600",
    badgeText: "text-white",
    description1: "Select or press ENTER to view Google UX Design certifications.",
    description2: "Certified by Google via Coursera in Foundations of User Experience (UX) Design (Jun 2026) and Start the UX Design Process: Empathize, Define, and Ideate (Jul 2026).",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600",
    overview: "Completed official Google UX Design professional courses via Coursera: 'Foundations of User Experience (UX) Design' (June 2026) and 'Start the UX Design Process: Empathize, Define, and Ideate' (July 2026). Covers user-centered design, empathy mapping, user personas, wireframing, and interactive prototyping.",
    highlights: [
      {
        title: "Foundations of User Experience (UX) Design",
        desc: "Core UX principles, accessibility standards, user research methodologies, and design thinking frameworks.",
        icon: <Award className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Empathize, Define & Ideate Process",
        desc: "Conducting user interviews, creating user personas, mapping user journeys, and problem statement definition.",
        icon: <Briefcase className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Wireframing & High-Fidelity Prototyping",
        desc: "Building low-fidelity paper wireframing and high-fidelity interactive digital prototypes in Figma.",
        icon: <Code2 className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Usability Testing & Iterative Design",
        desc: "Executing usability studies, gathering user feedback, and refining user interface interactions.",
        icon: <Laptop className="w-4 h-4 text-purple-400" />
      }
    ],
    skills: ["Google UX Design", "Empathy Mapping", "User Personas", "Figma Prototyping", "Wireframing", "Usability Testing"],
    badgeLinks: [
      { label: "VERIFY FOUNDATIONS OF UX", url: "https://www.coursera.org/account/accomplishments/verify/85A0AOC3RPPJ" },
      { label: "VERIFY UX DESIGN PROCESS", url: "https://www.coursera.org/account/accomplishments/verify/IUC2I6UABYI2" }
    ]
  },
  {
    id: "k-youth",
    title: "K-YOUTH x GIFT PROGRAMME",
    subtitle: "Khazanah Nasional & MTDC Talent Acceleration (Dec 2025 - Jul 2026)",
    badge: "COMPLETED",
    badgeColor: "bg-[#2ecc71]",
    badgeText: "text-black",
    description1: "Select or press ENTER to view the K-Youth x GIFT Programme completion.",
    description2: "Completed the intensive K-Youth x GIFT talent accelerator by Khazanah Nasional & MTDC, culminating in a professional placement as Test Analyst Intern at Gientech / UOB Bank.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600",
    overview: "Selected for the prestigious K-Youth x GIFT Programme funded by Khazanah Nasional & MTDC (Dec 2025 - Jul 2026). Completed multi-industry domain training (Cinergi strategic analysis, Grab data visualization, Maybank customer personas, IHH Healthcare GenAI tools, and Infini 1.4M row telecom data analytics capstone) leading to an enterprise placement at UOB Bank.",
    highlights: [
      {
        title: "Data Analytics Capstone (Infini)",
        desc: "Engineered 1.4M+ row telecommunications dataset using Jupyter, K-Means clustering, and Power BI.",
        icon: <Building2 className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Corporate Placement (UOB Intermark)",
        desc: "Embedded directly into Gientech / UOB Bank core banking technology quality assurance team.",
        icon: <Code2 className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "GenAI & Digital Innovation (IHH)",
        desc: "Utilized Copilot GenAI and video automation tools to optimize training workflows.",
        icon: <Award className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Customer Centricity & Strategy (Maybank)",
        desc: "Authored formal executive memos and developed Maybank customer personas for loan pitching.",
        icon: <Briefcase className="w-4 h-4 text-purple-400" />
      }
    ],
    skills: ["MTDC GIFT", "Khazanah K-Youth", "UOB Enterprise", "Power BI", "GenAI Copilot", "Data Analytics"],
    badgeLinks: [
      { label: "VIEW LINKEDIN CREDENTIALS", url: "https://www.linkedin.com/in/hazeeqnajmuddin/details/certifications/" }
    ]
  },
  {
    id: "degree",
    title: "SOFTWARE ENGINEERING DEGREE",
    subtitle: "Bachelor of Computer Science (Software Engineering) with Honours",
    badge: "DEGREE",
    badgeColor: "bg-[#4a90e2]",
    badgeText: "text-white",
    description1: "Select or press ENTER to view academic background.",
    description2: "Universiti Malaysia Pahang Al-Sultan Abdullah (Oct 2022 - Present). Matriculation Engineering CGPA 3.92, SPM 7As.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600",
    overview: "Pursuing Bachelor of Computer Science (Software Engineering) with Honours at Universiti Malaysia Pahang Al-Sultan Abdullah (Oct 2022 - Present). Previously achieved CGPA 3.92 in Electrical & Electronic Engineering at Kolej Matrikulasi Kejuruteraan Pahang and 7As in SPM at SMT Melaka.",
    highlights: [
      {
        title: "Software Engineering Core",
        desc: "Data structures, algorithms, object-oriented design, database engineering, and software architecture.",
        icon: <GraduationCap className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Final Year Project (AutoMate)",
        desc: "Architected AutoMate vehicle recommendation platform with decision tree ML and Laravel MVC.",
        icon: <Laptop className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Electrical Engineering CGPA 3.92",
        desc: "Kolej Matrikulasi Kejuruteraan Pahang (Aug 2021 - Mar 2022) with high academic honors.",
        icon: <Building className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "SPM Excellence (7As)",
        desc: "Sekolah Menengah Teknik Melaka (Jan 2016 - Feb 2021) in technical STEM curriculum.",
        icon: <BookOpen className="w-4 h-4 text-purple-400" />
      }
    ],
    skills: ["Software Engineering", "Full-Stack Development", "System Architecture", "Laravel & Flutter", "Machine Learning"],
    badgeLinks: [
      { label: "VIEW LINKEDIN EDUCATION", url: "https://www.linkedin.com/in/hazeeqnajmuddin/details/education/" }
    ]
  }
];

interface CertsViewProps {
  onNavigate?: (path: string) => void;
  activeTab?: string;
  initialActiveId?: string;
}

function CertsContent({ onNavigate, activeTab = "/certs", initialActiveId }: CertsViewProps) {
  const [activeCert, setActiveCert] = useState(CERTS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useWasdNavigation(CERTS, setActiveCert, carouselRef, isModalOpen);

  useEffect(() => {
    if (initialActiveId) {
      const targetCert = CERTS.find(c => c.id === initialActiveId);
      if (targetCert) {
        setActiveCert(targetCert);
      }
    }
  }, [initialActiveId]);

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

  // Keyboard navigation & WASD scroll handler inside open modal
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

  const handleCardClick = (cert: CertItem) => {
    if (activeCert.id === cert.id) {
      setIsModalOpen(true);
    } else {
      setActiveCert(cert);
    }
  };

  return (
    <GtaLayout 
      activeTab={activeTab}
      onTabChange={(path) => onNavigate ? onNavigate(path) : router.push(path)}
      footerText="Select or press ENTER to inspect certification credentials."
      mainContainerClass="flex-1 flex flex-col gap-1.5 md:gap-2 min-h-0 overflow-hidden mb-2 md:mb-3"
    >
      {/* Top Hero Section */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className="relative w-full flex-grow min-h-[40vh] bg-[#1a1a1a] cursor-pointer group"
      >
        <img
          src={activeCert.image}
          alt={activeCert.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
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
            <p>{activeCert.description2}</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="mt-5 px-4 py-2 bg-[#fabb15] hover:bg-[#e0a710] text-black font-gta text-lg md:text-xl tracking-wider rounded-sm shadow-lg flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
          >
            <span>VIEW CERTIFICATE DETAILS</span>
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
        {CERTS.map((cert) => {
          const isActive = activeCert.id === cert.id;
          
          return (
            <div
              key={cert.id}
              onMouseEnter={() => {
                if (!isKeyboardMode.current && typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
                  setActiveCert(cert);
                }
              }}
              onClick={() => handleCardClick(cert)}
              className={`relative flex-shrink-0 w-80 md:w-96 h-full cursor-pointer overflow-hidden transition-all duration-200 ${
                isActive 
                  ? "border-[3px] border-white z-10 scale-[1.02]" 
                  : "border-[3px] border-transparent opacity-60 hover:opacity-100"
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

      {/* GTA V STYLED POP-UP MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md">
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
                  src={activeCert.image}
                  alt={activeCert.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16181c] via-black/40 to-transparent" />
                
                {/* Top Badge */}
                <div className="absolute top-4 left-6 flex items-center gap-2">
                  {activeCert.badge && (
                    <span className={`px-2 py-0.5 text-xs font-bold tracking-wider rounded-sm ${activeCert.badgeColor} ${activeCert.badgeText}`}>
                      {activeCert.badge}
                    </span>
                  )}
                  <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-bold tracking-wider rounded-sm backdrop-blur-sm">
                    CREDENTIAL SPECS
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
                    {activeCert.title}
                  </h2>
                  <p className="text-gray-300 text-xs md:text-sm font-medium mt-1">
                    {activeCert.subtitle}
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
                    CREDENTIAL OVERVIEW
                  </h3>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    {activeCert.overview}
                  </p>
                </div>

                {/* Key Highlights Grid */}
                <div>
                  <h3 className="font-gta text-xl text-[#fabb15] tracking-wider mb-3 uppercase">
                    CORE DOMAINS & HIGHLIGHTS
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeCert.highlights.map((item, idx) => (
                      <div key={idx} className="p-3.5 bg-black/50 border border-white/10 rounded-sm">
                        <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
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

                {/* Associated Skills */}
                <div>
                  <h3 className="font-gta text-xl text-[#fabb15] tracking-wider mb-2 uppercase">
                    VERIFIED COMPETENCIES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeCert.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-white/10 text-white text-xs font-semibold rounded-sm border border-white/10 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#2ecc71]" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External Badge Verification Links */}
                {(activeCert.badgeLinks || activeCert.badgeUrl) && (
                  <div className="pt-2 flex flex-wrap gap-3">
                    {activeCert.badgeLinks ? (
                      activeCert.badgeLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#fabb15] hover:bg-[#e0a710] text-black font-gta text-sm md:text-base tracking-wider rounded-sm shadow-md transition-all hover:scale-105 active:scale-95"
                        >
                          <ShieldCheck className="w-4 h-4 text-black" />
                          <span>{link.label}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ))
                    ) : (
                      <a
                        href={activeCert.badgeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#fabb15] hover:bg-[#e0a710] text-black font-gta text-sm md:text-base tracking-wider rounded-sm shadow-md transition-all hover:scale-105 active:scale-95"
                      >
                        <ShieldCheck className="w-4 h-4 text-black" />
                        <span>VERIFY OFFICIAL BADGE</span>
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

export default function CertsView(props: CertsViewProps) {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-[#1a1a1a] text-white flex items-center justify-center font-gta">Loading Certifications...</div>}>
      <CertsContent {...props} />
    </Suspense>
  );
}