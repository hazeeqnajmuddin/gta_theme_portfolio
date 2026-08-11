"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import GtaLayout from "./GtaLayout";
import GtaModal from "./GtaModal";
import { useInputDeviceMode } from "@/hooks/useInputDeviceMode";
import { useWasdNavigation } from "@/hooks/useWasdNavigation";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Cloud, Server, ShieldCheck, DollarSign, Building2, Code2, 
  Award, Briefcase, CheckCircle2, Terminal, Layers, FileCheck, 
  GraduationCap, Laptop, BarChart3, FileText
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
    description2: "Completed the intensive K-Youth x GIFT talent accelerator funded by Khazanah Nasional & MTDC, specializing in Strategic Analysis, Data Visualization, Customer Centricity, Digital Innovation, and 1.4M Row Telecom Data Analytics.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600",
    overview: "Selected for the prestigious K-Youth x GIFT Programme funded by Khazanah Nasional & MTDC (Dec 2025 - Jul 2026). Completed five intensive industry domain projects spanning Cinergi strategic analysis, Grab data visualization, Maybank customer persona pitching, IHH Healthcare GenAI video workflows, and Infini 1.4M row telecom data analytics capstone.",
    highlights: [
      {
        title: "Strategic Analysis (Cinergi)",
        desc: "Authored a comprehensive business report and formal executive memo, demonstrating professional technical writing and corporate analysis skills.",
        icon: <FileText className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Data Visualization (Grab)",
        desc: "Processed large datasets using Microsoft Excel, developing pivot tables and pivot charts to identify trends and provide data-driven solutions.",
        icon: <BarChart3 className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Customer Centricity (Maybank)",
        desc: "Developed a comprehensive customer persona for Maybank to tailor a balanced-loan pitch, focusing on stakeholder needs and persuasion.",
        icon: <Briefcase className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Digital Innovation (IHH Healthcare)",
        desc: "Designed detailed employee onboarding workflows and utilized GenAI video tools to automate training content generation.",
        icon: <Award className="w-4 h-4 text-purple-400" />
      },
      {
        title: "Data Analytics Capstone (Infini)",
        desc: "Data analytics using Jupyter Notebook and Power BI on 1.4 Million rows of raw data, applying K-Means Clustering and interactive dashboards.",
        icon: <Building2 className="w-4 h-4 text-[#fabb15]" />
      }
    ],
    skills: ["Strategic Analysis", "Excel Visualization", "Customer Personas", "GenAI Video Tools", "Power BI", "K-Means Clustering"]
  },
  {
    id: "degree",
    title: "SOFTWARE ENGINEERING DEGREE",
    subtitle: "Bachelor of Computer Science (Software Engineering) with Honours",
    badge: "DEGREE",
    badgeColor: "bg-[#4a90e2]",
    badgeText: "text-white",
    description1: "Select or press ENTER to view degree specialization details.",
    description2: "Universiti Malaysia Pahang Al-Sultan Abdullah (Oct 2022 - Present). Specializing in Full-Stack Web/Mobile Architecture, Machine Learning, and Software QA.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2000",
    thumb: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600",
    overview: "Pursuing Bachelor of Computer Science (Software Engineering) with Honours at Universiti Malaysia Pahang Al-Sultan Abdullah (UMPSA, Pekan) from Oct 2022 - Present. Specialized degree curriculum focusing on enterprise full-stack development, database architecture, machine learning integration, software testing methodologies, and UI/UX design.",
    highlights: [
      {
        title: "Software Engineering & Data Structures",
        desc: "Object-oriented programming (OOP), data structures, algorithms, relational database engineering (MySQL/MariaDB), and software architecture.",
        icon: <GraduationCap className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Degree Final Year Project & Thesis (AutoMate)",
        desc: "Architected API-driven AutoMate platform with Decision Tree AI model (96% prediction accuracy) and authored formal degree research thesis.",
        icon: <Laptop className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Full-Stack Development & UI/UX Design",
        desc: "Designing responsive interfaces in Figma (20+ wireframes) and engineering full-stack applications with Laravel, React, and REST APIs.",
        icon: <Code2 className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Software Quality Assurance & Testing",
        desc: "Specialized coursework and practical implementation in automated test execution, Selenium WebDriver, Tricentis Tosca, and unit testing.",
        icon: <ShieldCheck className="w-4 h-4 text-purple-400" />
      }
    ],
    skills: ["Software Engineering", "Full-Stack Web Dev", "System Architecture", "Laravel & React", "Machine Learning", "Software QA"]
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
  const router = useRouter();

  useWasdNavigation(CERTS, setActiveCert, carouselRef, isModalOpen);

  const searchParams = useSearchParams();

  useEffect(() => {
    const activeId = initialActiveId || searchParams.get("active");
    if (activeId) {
      const targetCert = CERTS.find(c => c.id === activeId);
      if (targetCert) {
        setActiveCert(targetCert);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, initialActiveId]);

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
        
        <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 md:left-12 right-4 max-w-lg">
          {activeCert.badge && (
            <span className={`inline-block px-1.5 py-0.5 text-[10px] sm:text-[11px] font-bold tracking-wider mb-1.5 sm:mb-2 ${activeCert.badgeColor} ${activeCert.badgeText}`}>
              {activeCert.badge}
            </span>
          )}
          <h1 className="font-gta text-3xl sm:text-5xl md:text-6xl text-white tracking-wide uppercase drop-shadow-lg mb-2 sm:mb-4">
            {activeCert.title}
          </h1>
          <div className="space-y-4 text-gray-200 text-xs sm:text-sm md:text-base font-medium leading-relaxed drop-shadow-md pr-2 sm:pr-4 line-clamp-2 sm:line-clamp-none">
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
      <GtaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        card={activeCert ? {
          id: activeCert.id,
          title: activeCert.title,
          subtitle: activeCert.subtitle,
          badge: activeCert.badge,
          badgeColor: activeCert.badgeColor,
          badgeText: activeCert.badgeText,
          image: activeCert.image,
          overview: activeCert.overview,
          highlights: activeCert.highlights,
          skills: activeCert.skills,
          badgeUrl: activeCert.badgeUrl,
          badgeLinks: activeCert.badgeLinks,
        } : null}
      />
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