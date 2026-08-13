"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import GtaLayout from "./GtaLayout";
import GtaModal from "./GtaModal";
import { useWasdNavigation } from "@/hooks/useWasdNavigation";
import { motion } from "framer-motion";
import { 
  CheckCircle2, GraduationCap, BookOpen, School, Cpu, Laptop, 
  ShieldCheck, Calculator, Terminal, FlaskConical, Medal, BookMarked, 
  Users, Building2, Briefcase, Smile, Package, PackageCheck, Zap, 
  Utensils, Clock, Receipt, Flame, Mic, Heart, Calendar, Code2, Award, 
  HeartHandshake, Leaf, Volume2, MessageSquare, UserPlus, ClipboardList, 
  CheckSquare, Wrench, FileText, Smartphone, ChevronDown
} from "lucide-react";
import { gtaSound } from "@/utils/gtaSounds";

export interface AboutDetailHighlight {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export interface AboutProjectLink {
  label: string;
  path: string;
}

export interface AboutCard {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  badgeTextColor?: string;
  description: string;
  image: string;
  modalImage?: string;
  modalImages?: string[];
  modalImageTitle?: string;
  gridClass: string;
  titleClass: string;
  overview: string;
  highlights: AboutDetailHighlight[];
  tags: string[];
  projectLinks?: AboutProjectLink[];
  nav?: {
    w?: string;
    a?: string;
    s?: string;
    d?: string;
  };
  link?: string;
}

// -------------------------------------------------------------
// HERO / TITLE CARD DATA
// -------------------------------------------------------------
const HERO_CARD: AboutCard = {
  id: "hero-main",
  title: "THE STORY OF HAZEEQ NAJMUDDIN",
  subtitle: "Full-Stack Engineer & Quality Assurance Specialist",
  description: "A brief look into the professional journey, technical expertise, and background of a full-stack engineer and automation specialist.",
  image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000",
  gridClass: "", 
  titleClass: "",
  overview: "Muhammad Hazeeq Najmuddin Roshidi is a Software Engineering graduate & full-stack developer with specialized enterprise experience in quality assurance (Selenium, Tosca, Maven) and modern web & mobile development (Laravel, React, Next.js, Flutter).",
  highlights: [
    {
      title: "Full-Stack Engineering",
      desc: "Building modern responsive web applications and mobile solutions with Laravel, React, and Flutter.",
      icon: <Code2 className="w-4 h-4 text-[#fabb15]" />
    },
    {
      title: "Enterprise QA & Automation",
      desc: "Automated test execution experience with Selenium WebDriver, Tricentis Tosca, Java, and Maven build pipelines.",
      icon: <CheckCircle2 className="w-4 h-4 text-[#00a8ff]" />
    },
    {
      title: "Banking Sector Internships",
      desc: "Corporate internship experience embedded within financial technology divisions at UOB Intermark.",
      icon: <Building2 className="w-4 h-4 text-[#2ecc71]" />
    },
    {
      title: "Continuous Leadership & Growth",
      desc: "Active involvement in youth development, motivational speaking, community volunteering, and event management.",
      icon: <Award className="w-4 h-4 text-purple-400" />
    }
  ],
  tags: ["Software Engineering", "Full-Stack Dev", "QA Automation", "Laravel", "React / Next.js", "Flutter"],
  nav: { s: "work-main" }
};

// SECTION 1: EDUCATION
const EDUCATION_CARDS: AboutCard[] = [
  {
    id: "edu-main",
    title: "EDUCATION OVERVIEW",
    subtitle: "Academic Journey & Computer Science Studies",
    description: "My academic background and foundations.",
        image: "/UMP_Lake.webp",
    gridClass: "col-start-1 col-span-1 row-start-1 row-span-3",
    titleClass: "text-4xl md:text-5xl lg:text-6xl",
    overview: "A comprehensive summary of Hazeeq's complete educational journey from lower secondary at SMK Taman Melawati and specialized Electrical Engineering technical stream at SM Teknik Melaka (7As SPM), to pre-university Electrical Engineering matriculation at KMKPh (CGPA 3.92) and a Bachelor's Degree in Software Engineering at UMPSA.",
    highlights: [
      {
        title: "Bachelor of Computer Science (Software Engineering) With Honors",
        desc: "Universiti Malaysia Pahang Al-Sultan Abdullah (UMPSA). Full-stack development, AI models, and QA.",
        icon: <GraduationCap className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Electrical Engineering Matriculation (CGPA 3.92)",
        desc: "Kolej Matrikulasi Kejuruteraan Pahang (KMKPh) 1-year fast-track program in Jengka with high honors.",
        icon: <BookOpen className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Technical High School (SM Teknik Melaka - 7As SPM)",
        desc: "2-year Electrical & Electronic Engineering technical stream (Grade A in Pengajian Kejuruteraan Elektrik & Elektronik).",
        icon: <School className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Lower Secondary Foundation (SMK Taman Melawati)",
        desc: "3-year Form 1 to Form 3 academic foundation building STEM logic and co-curricular skills.",
        icon: <BookMarked className="w-4 h-4 text-purple-400" />
      }
    ],
    tags: ["UMPSA Software Eng", "KMKPh CGPA 3.92", "SM Teknik Melaka 7As", "SMK Taman Melawati"],
    projectLinks: [
      { label: "AUTOMATE SYSTEM (FYP)", path: "/projects?active=automate" },
      { label: "PREACHER MONITORING SYSTEM", path: "/projects?active=preacher" },
      { label: "CHILLAX MOBILE APP", path: "/projects?active=chillax-app" }
    ],
    nav: { w: "work-main", d: "edu-degree", s: "life-main" } 
  },
  {
    id: "edu-degree",
    title: "SOFTWARE ENGINEERING DEGREE",
    subtitle: "Bachelor of Computer Science (Software Engineering) With Honors",
    badge: "CURRENT",
    badgeColor: "bg-[#4a90e2]",
    badgeTextColor: "text-white",
    description: "Final-year Software Engineering student.",
    image: "/Degree_Class.webp",
    modalImages: [
      "/Degree_Dinner.PNG",
      "/Degree_Class.webp",
      "/Degree_Coursemate.JPG",
      "/Degree_Formal.webp"
    ],
    modalImageTitle: "GALLERY / IMAGES",
    gridClass: "col-start-2 col-span-1 row-start-1 row-span-3",
    titleClass: "text-3xl md:text-5xl",
    overview: "Final-year Software Engineering student focusing on full-stack architecture, machine learning integration, and automated testing. Built the AutoMate FYP platform and completed enterprise banking tech internships.",
    highlights: [
      {
        title: "Software Design & Algorithms",
        desc: "Core computer science subjects, database design, object-oriented programming (OOP), and software architecture.",
        icon: <Cpu className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Final Year Project (AutoMate)",
        desc: "Developed full-stack vehicle & workshop management system featuring decision tree AI models.",
        icon: <Laptop className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Quality Assurance Specialization",
        desc: "Coursework & practical projects on automated test execution, Selenium WebDriver, and unit testing.",
        icon: <ShieldCheck className="w-4 h-4 text-[#2ecc71]" />
      }
    ],
    tags: ["Software Engineering", "Laravel & Flutter", "Machine Learning", "Automated Testing", "System Design"],
    projectLinks: [
      { label: "AUTOMATE SYSTEM (FYP)", path: "/projects?active=automate" },
      { label: "PREACHER MONITORING SYSTEM", path: "/projects?active=preacher" },
      { label: "CHILLAX MOBILE APP", path: "/projects?active=chillax-app" }
    ],
    nav: { w: "work-freelance", a: "edu-main", d: "edu-matrics", s: "life-volunteer" } 
  },
  {
    id: "edu-matrics",
    title: "ENGINEERING MATRICULATION",
    subtitle: "Kolej Matrikulasi Kejuruteraan Pahang (Aug 2021 - Mar 2022)",
    badge: "CGPA 3.92",
    badgeColor: "bg-[#fabb15]",
    badgeTextColor: "text-black",
    description: "Electrical Engineering 1-Year Fast-Track Program (CGPA 3.92).",
    image: "/Matrik_Hall.jpg",
    modalImages: [
      "/Matrik_Classmate.jpg",
      "/Matrik_Badar.JPG",
      "/Matrik_Hall.jpg"
    ],
    modalImageTitle: "GALLERY / IMAGES",
    gridClass: "col-start-3 col-span-1 row-start-1 row-span-1",
    titleClass: "text-xl md:text-3xl",
    overview: "Completed an intensive 1-year Electrical Engineering fast-track matriculation program at Kolej Matrikulasi Kejuruteraan Pahang (KMKPh) in Jengka, Pahang. Achieved an outstanding CGPA of 3.92 with high academic distinction.",
    highlights: [
      {
        title: "Electrical & Electronic Engineering (CGPA 3.92)",
        desc: "Specialized 1-year engineering track in Jengka, Pahang, achieving near-perfect 3.92 CGPA honors.",
        icon: <Calculator className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Engineering Mathematics & Circuit Logic",
        desc: "Mastery of advanced calculus, linear algebra, circuit analysis, and digital electronics fundamentals.",
        icon: <Terminal className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Technical STEM Foundation",
        desc: "Formed a strong analytical and problem-solving bridge leading into Computer Science & Software Engineering.",
        icon: <Cpu className="w-4 h-4 text-[#2ecc71]" />
      }
    ],
    tags: ["Electrical Engineering", "KMKPh Jengka", "CGPA 3.92", "Engineering Math", "Circuit Analysis"],
    nav: { w: "work-waiter", a: "edu-degree", s: "edu-high" } 
  },
  {
    id: "edu-high",
    title: "TECHNICAL HIGH SCHOOL (SPM)",
    subtitle: "SM Teknik Melaka (Jan 2016 - Feb 2021)",
    badge: "7As DISTINCTION",
    badgeColor: "bg-[#fabb15]",
    badgeTextColor: "text-black",
    description: "Electrical & Electronic Engineering 2-Year Technical Stream (7As SPM).",
    image: "/Teknik_Award.jpg",
    modalImages: [
      "/Teknik_Award.jpg",
      "/Teknik_Classmate.jpg",
      "/Teknik_Dormmate.jpg",
      "/Teknik_KRS.jpg"
    ],
    modalImageTitle: "GALLERY / IMAGES",
    gridClass: "col-start-3 col-span-1 row-start-2 row-span-1",
    titleClass: "text-xl md:text-3xl",
    overview: "Completed a 2-year specialized Electrical & Electronic Engineering technical stream at Sekolah Menengah Teknik Melaka (Bukit Piatu). Achieved an outstanding SPM 2020 result of 7As across 10 subjects.",
    highlights: [
      {
        title: "Electrical & Electronic Engineering (Grade A)",
        desc: "Specialized technical coursework in Pengajian Kejuruteraan Elektrik & Elektronik and Lukisan Kejuruteraan.",
        icon: <Wrench className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "7As SPM Distinction (10 Subjects)",
        desc: "Distinctions in English (A, GCE-O 3B), Mathematics (A), Physics (A-), Sejarah (A), BM (A-), Agama (A).",
        icon: <Medal className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Advanced Technical STEM Stream",
        desc: "2-year intensive technical curriculum building engineering drawing, circuit principles, and analytical math.",
        icon: <FlaskConical className="w-4 h-4 text-[#2ecc71]" />
      }
    ],
    tags: ["SM Teknik Melaka", "Electrical Engineering", "7As SPM", "Engineering Drawing", "Physics & Add Math"],
    nav: { w: "edu-matrics", a: "edu-degree", s: "edu-middle" }
  },
  {
    id: "edu-middle",
    title: "LOWER SECONDARY (PT3)",
    subtitle: "SMK Taman Melawati (3-Year Program)",
    // badge: "FOUNDATION",
    // badgeColor: "bg-[#4a90e2]",
    // badgeTextColor: "text-white",
    description: "Lower Secondary Education (Form 1 - Form 3) at SMK Taman Melawati (SMKTM).",
    image: "/SMKTM_Raya.jpg",
    modalImages: [
      "/SMKTM_Award.jpg",
      "/SMKTM_Classmates.jpg",
      "/SMKTM_KRS.jpg",
      "/SMKTM_Raya.jpg"
    ],
    modalImageTitle: "GALLERY / IMAGES",
    gridClass: "col-start-3 col-span-1 row-start-3 row-span-1",
    titleClass: "text-xl md:text-3xl",
    overview: "Completed 3 years of lower secondary education (Form 1 to Form 3) at Sekolah Menengah Kebangsaan Taman Melawati (SMKTM), building a strong academic foundation in science, mathematics, and co-curricular leadership before transitioning to SM Teknik Melaka.",
    highlights: [
      {
        title: "3-Year Lower Secondary Studies",
        desc: "Form 1 to Form 3 academic curriculum at SMK Taman Melawati (SMKTM).",
        icon: <School className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "PT3 Academic Foundation",
        desc: "Built core foundations in mathematics, science, language literacy, and technical thinking.",
        icon: <BookMarked className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Co-Curricular & Student Clubs",
        desc: "Active engagement in school societies, uniformed bodies, and student team activities.",
        icon: <Users className="w-4 h-4 text-[#2ecc71]" />
      }
    ],
    tags: ["SMK Taman Melawati", "Lower Secondary", "PT3 Foundation", "Form 1 - Form 3"],
    nav: { w: "edu-high", a: "edu-degree", s: "life-youth" }
  }
];

// SECTION 2: WORK EXPERIENCES
const WORK_CARDS: AboutCard[] = [
  {
    id: "work-main",
    title: "WORK EXPERIENCES",
    subtitle: "Professional Timeline & Experience Spectrum",
    description: "A timeline of my professional roles and part-time ventures.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000",
    gridClass: "col-start-1 col-span-1 row-start-1 row-span-4",
    titleClass: "text-4xl md:text-5xl lg:text-6xl",
    overview: "Comprehensive professional journey spanning corporate banking tech internships (UOB), freelance engineering, logistics, customer service, and hospitality.",
    highlights: [
      {
        title: "Corporate Tech Internships",
        desc: "Banking technology operations, quality assurance testing, and system verification for UOB.",
        icon: <Building2 className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Independent Freelancing",
        desc: "Custom web development, hardware troubleshooting, and network configurations for clients.",
        icon: <Laptop className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Operational & Retail Roles",
        desc: "Fast-paced retail operations (Skechers), logistics sorting (Shopee), and F&B hospitality (Ole Ole Bali).",
        icon: <Briefcase className="w-4 h-4 text-[#2ecc71]" />
      }
    ],
    tags: ["Banking Tech Intern", "Quality Assurance", "Freelance Software", "Customer Service", "Logistics Operations"],
    nav: { w: "hero-main", d: "work-intern", s: "edu-main" }
  },
  {
    id: "work-intern",
    title: "GIENTECH (UOB PROJECT)",
    subtitle: "Software QA & Test Analyst Intern",
    badge: "UOB",
    badgeColor: "bg-[#fabb15]",
    badgeTextColor: "text-black",
    description: "Role: Software QA & Testing Engineer Intern",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-1 row-span-2",
    titleClass: "text-3xl md:text-4xl",
    overview: "Embedded within Gientech at UOB Intermark as a Software QA & Test Analyst Intern. Executed enterprise mobile & web automated testing using Perfecto Mobile Cloud, Selenium WebDriver, Tricentis Tosca (AS1 & AS2), and Java Maven pipelines for banking operations.",
    highlights: [
      {
        title: "Perfecto Mobile & Cloud Testing",
        desc: "Automated & manual cloud-based mobile testing across iOS & Android real devices using Perforce Perfecto platform.",
        icon: <Smartphone className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Tricentis Tosca AS1 & AS2 Automation",
        desc: "Model-based test automation, dynamic Test Data Management (TDM), and automated regression runs.",
        icon: <CheckCircle2 className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Selenium WebDriver & Java Maven",
        desc: "Developed cross-browser web testing automation frameworks with Java Maven build runners.",
        icon: <Code2 className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "UOB Corporate Banking QA",
        desc: "Defect logging, test case design, and regression suite execution for core enterprise banking applications.",
        icon: <Building2 className="w-4 h-4 text-purple-400" />
      }
    ],
    tags: ["UOB Intermark", "Gientech", "Perfecto Mobile", "Tricentis Tosca", "Selenium", "Appium", "Banking QA"],
    projectLinks: [
      { label: "VIEW QA AUTOMATION SUITE PROJECT", path: "/projects?active=qa-suite" },
      { label: "VIEW TOSCA AS1 & AS2 CERTIFICATIONS", path: "/certs?active=tosca-as1-as2" }
    ],
    nav: { w: "hero-main", a: "work-main", d: "work-skechers", s: "work-freelance" }
  },
  {
    id: "work-freelance",
    title: "FREELANCE FULL-STACK DEVELOPER",
    subtitle: "Rahmah Consultancy Management System (RCMS)",
    description: "Role: Freelance Full-Stack Web Developer",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-3 row-span-2",
    titleClass: "text-3xl md:text-4xl",
    overview: "Engineered and deployed the Rahmah Consultancy Management System (RCMS) — a PDPA-compliant full-stack Laravel platform on DigitalOcean. Digitized manual intake operations, built admin dashboards, automated PDF document bundle generation, and authored 50+ E2E test cases.",
    highlights: [
      {
        title: "PDPA-Compliant Platform & DigitalOcean Deployment",
        desc: "Digitized manual intake operations reducing client onboarding time by 40% with 100% data privacy compliance.",
        icon: <ShieldCheck className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Automated PDF Document Bundle Engine",
        desc: "Built public submission portals & admin dashboards to merge PDF document bundles, reducing 50% manual administration.",
        icon: <FileText className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "15+ Responsive Interfaces & E2E Testing",
        desc: "Architected submission portals and administrative tools, expediting platform deployment by 3 weeks with 50+ test cases.",
        icon: <Code2 className="w-4 h-4 text-[#2ecc71]" />
      }
    ],
    tags: ["RCMS Full-Stack", "Laravel 10", "DigitalOcean", "PDPA Compliance", "PDF Engine", "E2E Testing"],
    projectLinks: [
      { label: "VIEW RCMS SYSTEM PROJECT", path: "/projects?active=rcms-crm" }
    ],
    nav: { w: "work-intern", a: "work-main", d: "work-ole", s: "edu-degree" }
  },
  {
    id: "work-skechers",
    title: "SKECHERS RETAIL",
    subtitle: "Retail Sales & Customer Specialist",
    description: "Role: Retail Sales & Customer Specialist",
    image: "/Skechers_OutletSign.jpg",
    modalImages: ["/Skechers_StaffCard.webp", "/Skechers_Outlet.webp"],
    modalImageTitle: "GALLERY / IMAGES",
    gridClass: "col-start-3 col-span-1 row-start-1 row-span-1",
    titleClass: "text-xl md:text-2xl",
    overview: "Frontline retail experience managing customer interactions, inventory stocking, point-of-sale (POS) operations, and visual merchandising.",
    highlights: [
      {
        title: "Customer Service Excellence",
        desc: "High-volume customer engagement, personalized product recommendations, and issue resolution.",
        icon: <Smile className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Inventory & POS Operations",
        desc: "Stock auditing, inventory unpacking, size indexing, and floor restocking efficiency.",
        icon: <Package className="w-4 h-4 text-[#00a8ff]" />
      }
    ],
    tags: ["Retail Operations", "Customer Service", "Inventory Indexing", "POS Operations"],
    nav: { w: "hero-main", a: "work-intern", s: "work-shopee" }
  },
  {
    id: "work-shopee",
    title: "SHOPEE HUB & LOGISTICS",
    subtitle: "Logistics & Warehouse Operations Specialist",
    description: "Role: Logistics & Warehouse Operations Specialist",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-2 row-span-1",
    titleClass: "text-xl md:text-2xl",
    overview: "High-speed warehouse sorting operations at Shopee logistics hubs, ensuring accurate parcel categorization and rapid dispatch.",
    highlights: [
      {
        title: "High-Volume Package Sorting",
        desc: "Rapid barcode scanning, regional hub destination routing, and damage inspection.",
        icon: <PackageCheck className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Team Throughput Efficiency",
        desc: "Meeting strict hourly package throughput metrics in a fast-paced environment.",
        icon: <Zap className="w-4 h-4 text-[#00a8ff]" />
      }
    ],
    tags: ["Logistics Sorting", "Warehouse Hub", "Barcode Scanning", "Target Throughput"],
    nav: { w: "work-skechers", a: "work-intern", s: "work-ole" }
  },
  {
    id: "work-ole",
    title: "OLE OLE BALI",
    subtitle: "Waiter & Kitchen Helper",
    description: "Role: Waiter & Kitchen Helper",
    image: "/OOB_sign.png",
    modalImages: [
      "/OOB_sign.png",
      "/OOB_Food.webp",
      "/OOB_Selfie.webp"
    ],
    modalImageTitle: "GALLERY / IMAGES",
    gridClass: "col-start-3 col-span-1 row-start-3 row-span-1",
    titleClass: "text-xl md:text-2xl",
    overview: "Hospitality experience in upscale dining, delivering attentive table service, managing guest orders, supporting kitchen food preparation, and maintaining dining floor workflows.",
    highlights: [
      {
        title: "Guest Hospitality & Dining",
        desc: "Attentive dining service, menu recommendations, and guest satisfaction management.",
        icon: <Utensils className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Kitchen Preparation Support",
        desc: "Assisting kitchen staff with ingredient prep, food station organization, and cleanliness.",
        icon: <Clock className="w-4 h-4 text-[#00a8ff]" />
      }
    ],
    tags: ["F&B Hospitality", "Dining Service", "Kitchen Prep", "Teamwork"],
    nav: { w: "work-shopee", a: "work-freelance", s: "work-waiter" }
  },
  {
    id: "work-waiter",
    title: "AZEEZAH AL-ANSAR STEAKHOUSE",
    subtitle: "Steakhouse Dining Waiter & Service Staff",
    description: "Role: Steakhouse Dining Waiter & Service Staff",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-4 row-span-1",
    titleClass: "text-xl md:text-2xl",
    overview: "Experience in high-tempo steakhouse dining, handling order precision, table setups, and fast-paced service delivery.",
    highlights: [
      {
        title: "Order Precision & Flow",
        desc: "Accurate guest order entry, steak temperature preferences, and table timing.",
        icon: <Receipt className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "High-Pressure Service",
        desc: "Maintaining service standards under pressure during busy weekend shifts.",
        icon: <Flame className="w-4 h-4 text-[#00a8ff]" />
      }
    ],
    tags: ["Front of House", "Order Precision", "Multitasking", "Customer Care"],
    nav: { w: "work-ole", a: "work-freelance", s: "edu-matrics" }
  }
];

// SECTION 3: LIFE EXPERIENCES
const LIFE_CARDS: AboutCard[] = [
  {
    id: "life-main",
    title: "LIFE EXPERIENCES",
    subtitle: "Community Involvement, Speaking & Mentorship",
    description: "Roles beyond the workplace shaping my perspective.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000",
    gridClass: "col-start-1 col-span-1 row-start-1 row-span-2",
    titleClass: "text-4xl md:text-5xl lg:text-6xl",
    overview: "Roles beyond academia and work that have shaped Hazeeq's perspective, leadership qualities, public speaking skills, and commitment to community empowerment.",
    highlights: [
      {
        title: "Public Speaking & Motivation",
        desc: "Conducting motivational talks and sharing personal technical journeys with students.",
        icon: <Mic className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Community Volunteering",
        desc: "Participating in charity drives, community cleanups, and youth empowerment initiatives.",
        icon: <Heart className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Event & Program Management",
        desc: "Organizing structured youth events, workshops, and team-building activities.",
        icon: <Calendar className="w-4 h-4 text-[#2ecc71]" />
      }
    ],
    tags: ["Public Speaking", "Community Service", "Youth Mentorship", "Program Management"],
    nav: { w: "edu-main", d: "life-volunteer" }
  },
  {
    id: "life-volunteer",
    title: "VOLUNTEER",
    subtitle: "Community Outreach & Charitable Initiatives",
    description: "Giving back through organized community efforts.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-1 row-span-1",
    titleClass: "text-2xl md:text-4xl",
    overview: "Active involvement in community service initiatives, humanitarian aid distribution, and neighborhood empowerment programs.",
    highlights: [
      {
        title: "Community Aid Distribution",
        desc: "Organizing care packages, food drives, and emergency assistance for communities in need.",
        icon: <HeartHandshake className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Environmental & Cleanup Drives",
        desc: "Group volunteer participation in local cleanups and community space beautification.",
        icon: <Leaf className="w-4 h-4 text-[#00a8ff]" />
      }
    ],
    tags: ["Community Outreach", "Volunteer Work", "Humanitarian Aid", "Social Responsibility"],
    nav: { w: "edu-degree", a: "life-main", d: "life-youth", s: "life-speaker" }
  },
  {
    id: "life-speaker",
    title: "PUBLIC SPEAKER",
    subtitle: "Public Speaking & Career Guidance",
    description: "Public speaking and sharing personal journeys.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-2 row-span-1",
    titleClass: "text-2xl md:text-4xl",
    overview: "Engaging as a motivational speaker and mentor, delivering inspiring presentations on overcoming challenges, technology careers, and personal development.",
    highlights: [
      {
        title: "Student Keynote Presentations",
        desc: "Speeches delivered to secondary & university students on setting goals and pursuing tech careers.",
        icon: <Volume2 className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Communication & Storytelling",
        desc: "Articulating complex experiences into engaging stories that motivate audiences.",
        icon: <MessageSquare className="w-4 h-4 text-[#00a8ff]" />
      }
    ],
    tags: ["Motivational Speaker", "Keynote Presentations", "Career Mentorship", "Public Speaking"],
    nav: { w: "life-volunteer", a: "life-main", d: "life-program" }
  },
  {
    id: "life-youth",
    title: "YOUTH DEVELOPER",
    subtitle: "Guiding & Empowering Younger Peers",
    description: "Mentoring and guiding younger peers.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-1 row-span-1",
    titleClass: "text-2xl md:text-3xl",
    overview: "Dedicated to mentoring youth through technical guidance, study strategies, skill development workshops, and leadership coaching.",
    highlights: [
      {
        title: "One-on-One Mentorship",
        desc: "Guiding students through academic challenges, coding fundamentals, and university choices.",
        icon: <UserPlus className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Group Leadership Workshops",
        desc: "Facilitating interactive team-building sessions and leadership exercises.",
        icon: <Users className="w-4 h-4 text-[#00a8ff]" />
      }
    ],
    tags: ["Youth Development", "Student Mentorship", "Leadership Coaching", "Skill Workshops"],
    nav: { w: "edu-middle", a: "life-volunteer", s: "life-program" }
  },
  {
    id: "life-program",
    title: "PROGRAM MANAGER",
    subtitle: "Event Planning & Operational Execution",
    description: "Organizing and leading structured events.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-2 row-span-1",
    titleClass: "text-2xl md:text-3xl",
    overview: "Organizing and managing structured programs, workshops, and youth gatherings from initial planning to execution and post-event evaluation.",
    highlights: [
      {
        title: "Event Logistics & Planning",
        desc: "Scheduling agendas, budget allocation, speaker coordination, and venue logistics.",
        icon: <ClipboardList className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Execution & Team Leadership",
        desc: "Directing event operations on-site to ensure smooth schedules and participant satisfaction.",
        icon: <CheckSquare className="w-4 h-4 text-[#00a8ff]" />
      }
    ],
    tags: ["Program Management", "Event Planning", "Logistics Coordination", "Team Leadership"],
    nav: { w: "life-youth", a: "life-speaker" }
  }
];

const ALL_CARDS = [HERO_CARD, ...WORK_CARDS, ...EDUCATION_CARDS, ...LIFE_CARDS];

interface AboutViewProps {
  onNavigate?: (path: string) => void;
  activeTab?: string;
  initialActiveId?: string;
}

function AboutContent({ onNavigate, activeTab = "/about", initialActiveId }: AboutViewProps) {
  const [hoveredCard, setHoveredCard] = useState<AboutCard>(ALL_CARDS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Pass isModalOpen so background WASD navigation is disabled while modal is open
  useWasdNavigation(ALL_CARDS, setHoveredCard, undefined, isModalOpen);

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
    const activeId = initialActiveId || searchParams.get("active");
    if (activeId) {
      const targetCard = ALL_CARDS.find(c => c.id === activeId);
      if (targetCard) {
        setHoveredCard(targetCard);
        
        setTimeout(() => {
          const element = document.getElementById(activeId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      }
    }
  }, [searchParams, initialActiveId]);

  useEffect(() => {
    if (hoveredCard?.id && !isModalOpen) {
      const element = document.getElementById(hoveredCard.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [hoveredCard, isModalOpen]);

  // Background key listener for Enter to open modal when modal is closed
  useEffect(() => {
    const handleKeyDownCapture = (e: KeyboardEvent) => {
      if (!isModalOpen && e.key.toLowerCase() === "enter") {
        e.preventDefault();
        if (hoveredCard.link) {
          handleLinkNavigation(hoveredCard.link);
        } else {
          setIsModalOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDownCapture, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDownCapture, { capture: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredCard, isModalOpen]);

  const handleCardClick = (card: AboutCard) => {
    setHoveredCard(card);
    if (card.link) {
      handleLinkNavigation(card.link);
    } else {
      setIsModalOpen(true);
    }
  };

  const footerText = hoveredCard 
    ? "Select or press ENTER to inspect details for " + hoveredCard.title
    : "Scroll down to discover my background, current roles, and technical journey.";

  const renderCard = (card: AboutCard, customClass?: string) => {
    const isActive = hoveredCard?.id === card.id;

    return (
      <div
        id={card.id} 
        key={card.id}
        onMouseEnter={() => {
          if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
            if (hoveredCard?.id !== card.id) {
              gtaSound.playHover();
              setHoveredCard(card);
            }
          }
        }}
        onClick={() => handleCardClick(card)}
        className={`relative overflow-hidden cursor-pointer transition-all duration-200 rounded-sm ${customClass || card.gridClass} border border-white/20 md:border-[3px] ${
          isActive ? "md:border-white z-10" : "md:border-transparent opacity-100 md:opacity-75 hover:opacity-100"
        }`}
      >
        <img
          src={card.image}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{ transform: isActive ? 'scale(1.04)' : 'scale(1)' }}
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent md:from-black/90 md:via-black/30" />
        
        {card.badge && (
          <div className={`absolute top-1.5 left-1.5 md:top-2 md:left-2 px-1.5 py-0.5 text-[9px] md:text-xs font-bold tracking-wider rounded-sm ${card.badgeColor} ${card.badgeTextColor}`}>
            {card.badge}
          </div>
        )}
        
        <div className="absolute bottom-1.5 left-2 right-2 md:bottom-2 md:left-3 md:right-3">
          <h3 className={`font-gta text-white tracking-wide uppercase drop-shadow-md leading-none text-xs sm:text-sm md:text-3xl ${card.titleClass}`}>
            {card.title}
          </h3>
          {card.id !== "work-main" && card.id !== "edu-main" && card.id !== "life-main" && card.subtitle && (
            <p className="text-[#fabb15] text-[9px] sm:text-xs md:text-sm font-semibold tracking-wide drop-shadow-md mt-0.5 md:mt-1 line-clamp-3 leading-tight uppercase">
              {card.subtitle}
            </p>
          )}
        </div>
      </div>
    );
  };

  const isHeroActive = hoveredCard?.id === "hero-main";

  return (
    <GtaLayout 
      activeTab={activeTab}
      onTabChange={(path) => onNavigate ? onNavigate(path) : router.push(path)}
      footerText={footerText}
      mainContainerClass="flex-grow overflow-y-auto px-2 pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-y snap-mandatory scroll-smooth"
    >
      {/* Hero Section */}
      <div 
        id="hero-main"
        onMouseEnter={() => setHoveredCard(HERO_CARD)}
        onClick={() => handleCardClick(HERO_CARD)}
        className={`snap-start snap-always relative w-full min-h-[calc(100vh-170px)] transition-colors duration-200 cursor-pointer mb-[20vh] ${
          isHeroActive ? "border-[3px] border-white z-10" : "border-[3px] border-transparent opacity-90 hover:opacity-100"
        }`}
      >
        <img
          src={HERO_CARD.image} 
          alt="About Story Mode"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{ transform: isHeroActive ? 'scale(1.02)' : 'scale(1)' }}
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute top-1/3 left-4 sm:left-8 md:left-16 right-4 -translate-y-1/2 flex flex-col drop-shadow-2xl max-w-full overflow-hidden">
          <h1 className="font-gta text-4xl sm:text-7xl md:text-8xl lg:text-[9rem] text-white leading-[0.85] tracking-tighter">
            HAZEEQ
          </h1>
          <h1 className="font-gta text-4xl sm:text-7xl md:text-8xl lg:text-[9rem] text-white leading-[0.85] tracking-tighter ml-4 sm:ml-8 md:ml-16">
            NAJMUDDIN
          </h1>
        </div>

        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-3 sm:gap-4">
          <div>
            <h2 className="font-gta text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-wide uppercase drop-shadow-lg">
              {HERO_CARD.title}
            </h2>
            <p className="text-gray-200 text-xs sm:text-sm md:text-base mt-1 sm:mt-2 drop-shadow-md max-w-2xl font-medium line-clamp-2 sm:line-clamp-none">
              {HERO_CARD.description}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick(HERO_CARD);
            }}
            className="shrink-0 px-4 py-2 bg-[#fabb15] hover:bg-[#e0a710] text-black font-gta text-lg md:text-xl tracking-wider rounded-sm shadow-lg flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
          >
            <span>INSPECT STORY DETAILS</span>
            <span className="hidden md:inline-block text-xs bg-black text-white px-2 py-0.5 rounded font-sans font-bold">ENTER</span>
          </button>
        </div>

        {/* Animated Bopping Scroll Down Arrow Hint */}
        <motion.div
          onClick={(e) => {
            e.stopPropagation();
            const firstWorkCard = document.getElementById("work-main");
            if (firstWorkCard) {
              firstWorkCard.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { duration: 0.5 },
            y: { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-4 right-4 sm:bottom-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 flex flex-col items-center gap-0.5 cursor-pointer z-20 hover:scale-110 transition-transform"
        >
          <span className="text-[9px] sm:text-[10px] font-gta text-[#fabb15] tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-bold">
            DOWN
          </span>
          <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 text-[#fabb15] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" />
        </motion.div>
      </div>

      {/* Section 1: Work Experiences */}
      {/* DESKTOP VIEW (md and up: 3 columns, 4 rows) */}
      <div className="hidden md:grid snap-start snap-always w-full h-[75vh] min-h-[500px] mb-[25vh] grid-cols-3 grid-rows-4 gap-2 md:gap-3">
        {WORK_CARDS.map((card) => renderCard(card))}
      </div>

      {/* MOBILE VIEW ONLY (below md: Dynamic 100% Viewport Height Fill matching sketch) */}
      <div className="md:hidden snap-start snap-always w-full h-[calc(100dvh-130px)] min-h-[460px] mb-[15vh] flex flex-col gap-1.5 pb-2">
        {/* Top Header Card: WORK EXPERIENCES */}
        <div className="flex-[1] min-h-0 w-full">
          {renderCard(WORK_CARDS[0], "w-full h-full")}
        </div>

        {/* 2-Column Grid matching sketch */}
        <div className="flex-[4] min-h-0 grid grid-cols-2 gap-1.5">
          {/* Left Column: GIENTECH (UOB) & FREELANCE */}
          <div className="grid grid-rows-2 gap-1.5 h-full min-h-0">
            <div className="w-full h-full min-h-0">
              {renderCard(WORK_CARDS[1], "w-full h-full")}
            </div>
            <div className="w-full h-full min-h-0">
              {renderCard(WORK_CARDS[2], "w-full h-full")}
            </div>
          </div>

          {/* Right Column: SKECHERS, SHOPEE, OLE OLE BALI, AL-ANSAR STEAKHOUSE */}
          <div className="grid grid-rows-4 gap-1.5 h-full min-h-0">
            <div className="w-full h-full min-h-0">
              {renderCard(WORK_CARDS[3], "w-full h-full")}
            </div>
            <div className="w-full h-full min-h-0">
              {renderCard(WORK_CARDS[4], "w-full h-full")}
            </div>
            <div className="w-full h-full min-h-0">
              {renderCard(WORK_CARDS[5], "w-full h-full")}
            </div>
            <div className="w-full h-full min-h-0">
              {renderCard(WORK_CARDS[6], "w-full h-full")}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Education */}
      {/* DESKTOP VIEW (md and up: 3 columns, 3 rows) */}
      <div className="hidden md:grid snap-start snap-always w-full h-[75vh] min-h-[500px] mb-[25vh] grid-cols-3 grid-rows-3 gap-2 md:gap-3">
        {EDUCATION_CARDS.map((card) => renderCard(card))}
      </div>

      {/* MOBILE VIEW ONLY (below md: Dynamic 100% Viewport Height Fill matching sketch) */}
      <div className="md:hidden snap-start snap-always w-full h-[calc(100dvh-130px)] min-h-[460px] mb-[15vh] flex flex-col gap-1.5 pb-2">
        {/* Top Header Card: EDUCATION OVERVIEW */}
        <div className="flex-[1] min-h-0 w-full">
          {renderCard(EDUCATION_CARDS[0], "w-full h-full")}
        </div>

        {/* 2-Column Grid matching sketch */}
        <div className="flex-[4] min-h-0 grid grid-cols-2 gap-1.5">
          {/* Left Column: SOFTWARE ENGINEERING DEGREE (Full height tall card) */}
          <div className="w-full h-full min-h-0">
            {renderCard(EDUCATION_CARDS[1], "w-full h-full")}
          </div>

          {/* Right Column: MATRICULATION (50%), MIDDLE SCHOOL (25%), HIGH SCHOOL (25%) */}
          <div className="grid grid-rows-4 gap-1.5 h-full min-h-0">
            <div className="row-span-2 w-full h-full min-h-0">
              {renderCard(EDUCATION_CARDS[2], "w-full h-full")}
            </div>
            <div className="row-span-1 w-full h-full min-h-0">
              {renderCard(EDUCATION_CARDS[4], "w-full h-full")}
            </div>
            <div className="row-span-1 w-full h-full min-h-0">
              {renderCard(EDUCATION_CARDS[3], "w-full h-full")}
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Life Experiences */}
      {/* DESKTOP VIEW (md and up: 3 columns, 2 rows) */}
      <div className="hidden md:grid snap-start snap-always w-full h-[75vh] min-h-[400px] mb-[10vh] grid-cols-3 grid-rows-2 gap-2 md:gap-3">
        {LIFE_CARDS.map((card) => renderCard(card))}
      </div>

      {/* MOBILE VIEW ONLY (below md: Dynamic 100% Viewport Height Fill matching sketch) */}
      <div className="md:hidden snap-start snap-always w-full h-[calc(100dvh-130px)] min-h-[440px] mb-[10vh] flex flex-col gap-1.5 pb-2">
        {/* Top Header Card: LIFE EXPERIENCES */}
        <div className="flex-[1] min-h-0 w-full">
          {renderCard(LIFE_CARDS[0], "w-full h-full")}
        </div>

        {/* 2x2 Grid matching sketch */}
        <div className="flex-[4] min-h-0 grid grid-cols-2 grid-rows-2 gap-1.5">
          <div className="w-full h-full min-h-0">
            {renderCard(LIFE_CARDS[1], "w-full h-full")}
          </div>
          <div className="w-full h-full min-h-0">
            {renderCard(LIFE_CARDS[2], "w-full h-full")}
          </div>
          <div className="w-full h-full min-h-0">
            {renderCard(LIFE_CARDS[3], "w-full h-full")}
          </div>
          <div className="w-full h-full min-h-0">
            {renderCard(LIFE_CARDS[4], "w-full h-full")}
          </div>
        </div>
      </div>

      {/* GTA V STYLED POP-UP MODAL */}
      <GtaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        card={hoveredCard}
        onNavigateLink={handleLinkNavigation}
      />
    </GtaLayout>
  );
}

export default function AboutView(props: AboutViewProps) {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-white font-gta">Loading...</div>}>
      <AboutContent {...props} />
    </Suspense>
  );
}