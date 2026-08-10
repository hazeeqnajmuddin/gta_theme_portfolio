"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import GtaLayout from "./GtaLayout";
import { useWasdNavigation } from "@/hooks/useWasdNavigation";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Cloud, Server, ShieldCheck, DollarSign, Building2, Code2, 
  Award, Briefcase, CheckCircle2, Terminal, Layers, FileCheck, 
  GraduationCap, Laptop, Building, BookOpen 
} from "lucide-react";

export interface CertDetailHighlight {
  title: string;
  desc: string;
  icon: React.ReactNode;
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
}

// Certifications Data
const CERTS: CertItem[] = [
  {
    id: "aws-cloud",
    title: "AWS CLOUD PRACTITIONER",
    subtitle: "Amazon Web Services Official Certification",
    badge: "VERIFIED",
    badgeColor: "bg-[#fabb15]",
    badgeText: "text-black",
    description1: "Select or press ENTER to view AWS Certified Cloud Practitioner credentials.",
    description2: "Successfully passed the professional certification exam, demonstrating foundational knowledge of cloud concepts, AWS services, security, architecture, pricing, and support ecosystems.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600",
    overview: "Successfully earned the official AWS Certified Cloud Practitioner certification, validating foundational knowledge of cloud architecture fundamentals, core AWS infrastructure services, security compliance, pricing models, and support resources.",
    highlights: [
      {
        title: "Cloud Concepts & Infrastructure",
        desc: "AWS Global Regions, Availability Zones, Edge Locations, and Shared Responsibility Security Model.",
        icon: <Cloud className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Core AWS Infrastructure Services",
        desc: "EC2 compute instances, S3 storage buckets, RDS databases, VPC networking, and IAM security governance.",
        icon: <Server className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Security & Governance",
        desc: "AWS KMS encryption, Security Groups, Network ACLs, IAM roles, and AWS WAF protective measures.",
        icon: <ShieldCheck className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Billing & Cost Optimization",
        desc: "AWS Cost Explorer, Budgets, Savings Plans, Reserved Instances, and Pricing Calculator strategies.",
        icon: <DollarSign className="w-4 h-4 text-purple-400" />
      }
    ],
    skills: ["AWS Cloud", "EC2 & S3", "IAM Security", "VPC Architecture", "CloudWatch", "Cost Optimization"]
  },
  {
    id: "k-youth",
    title: "K-YOUTH x GIFT PROGRAMME",
    subtitle: "MTDC Talent Acceleration & Corporate Placement",
    badge: "COMPLETED",
    badgeColor: "bg-[#2ecc71]",
    badgeText: "text-black",
    description1: "Select or press ENTER to view the K-Youth x GIFT Programme completion.",
    description2: "Accepted into the inaugural cohort of the MTDC GIFT training program, leading directly to a professional placement within the UOB Intermark office.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600",
    overview: "Accepted into the inaugural cohort of the Malaysian Technology Development Corporation (MTDC) GIFT training program, undergoing intensive professional upskilling that led directly to a software engineering placement within the UOB Intermark office.",
    highlights: [
      {
        title: "Enterprise Corporate Placement",
        desc: "Embedded directly within UOB financial institution tech operations at Intermark tower, Kuala Lumpur.",
        icon: <Building2 className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Software Engineering Upskilling",
        desc: "Specialized modules on modern software engineering practices, agile methodologies, and enterprise tools.",
        icon: <Code2 className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Professional Development",
        desc: "Corporate communication, technical problem-solving, and cross-functional team collaboration.",
        icon: <Award className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Fintech Domain Insights",
        desc: "Exposure to banking workflows, compliance frameworks, enterprise security, and software delivery.",
        icon: <Briefcase className="w-4 h-4 text-purple-400" />
      }
    ],
    skills: ["MTDC GIFT", "Enterprise Tech", "UOB Operations", "Agile Methodology", "Corporate Software"]
  },
  {
    id: "qa-tosca",
    title: "AUTOMATION & QA TOOLING",
    subtitle: "Enterprise Test Execution & Quality Assurance Proficiency",
    badge: "TECHNICAL",
    badgeColor: "bg-[#4a90e2]",
    badgeText: "text-white",
    description1: "Select or press ENTER to view QA automation proficiency.",
    description2: "Extensive hands-on experience and proficiency in Tricentis Tosca, Selenium, and Maven for enterprise software quality assurance and automated test execution.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600",
    overview: "Extensive hands-on experience and proficiency in Tricentis Tosca, Selenium WebDriver, and Maven for enterprise software quality assurance, automated regression testing, and quality gate validation.",
    highlights: [
      {
        title: "Tricentis Tosca Model-Based Testing",
        desc: "Building reusable test modules, execution lists, and automated API validation scripts.",
        icon: <CheckCircle2 className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Selenium & Page Object Model",
        desc: "Writing robust cross-browser test automation scripts in Java with Maven build management.",
        icon: <Terminal className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "CI/CD Quality Gates",
        desc: "Integrating automated test suites into continuous integration pipelines to catch defects early.",
        icon: <Layers className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Test Strategy & Reports",
        desc: "Creating comprehensive test plans, traceability matrices, and detailed execution logs.",
        icon: <FileCheck className="w-4 h-4 text-purple-400" />
      }
    ],
    skills: ["Tricentis Tosca", "Selenium WebDriver", "Java", "Maven", "Test Automation", "Regression Testing"]
  },
  {
    id: "degree",
    title: "SOFTWARE ENGINEERING DEGREE",
    subtitle: "Bachelor of Computer Science (Software Engineering)",
    badge: "DEGREE",
    badgeColor: "bg-[#4a90e2]",
    badgeText: "text-white",
    description1: "Select or press ENTER to view academic background.",
    description2: "Final-year Software Engineering student. Developed the AutoMate Final Year Project and completed enterprise-level internships at CIMB and UOB.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600",
    overview: "Final-year Software Engineering student with a strong academic foundation in algorithms, system design, web development, and software testing. Developed the AutoMate Final Year Project and completed corporate tech internships at CIMB and UOB.",
    highlights: [
      {
        title: "Software Engineering Foundation",
        desc: "Data structures, object-oriented design, database engineering, and software architecture.",
        icon: <GraduationCap className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Final Year Project (AutoMate)",
        desc: "Designed and built AutoMate vehicle management system with decision tree diagnostic AI.",
        icon: <Laptop className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Banking Tech Internships (UOB & CIMB)",
        desc: "Real-world banking tech internships focusing on quality assurance, system testing, and full-stack development.",
        icon: <Building className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Academic Excellence",
        desc: "Consistently demonstrated strong technical competency across coding, documentation, and team projects.",
        icon: <BookOpen className="w-4 h-4 text-purple-400" />
      }
    ],
    skills: ["Software Engineering", "Full-Stack Development", "System Design", "Laravel & Flutter", "Testing & QA"]
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
        className="h-[22vh] min-h-[160px] shrink-0 flex gap-1 md:gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory pt-1 pb-2"
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