"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Code2, 
  CheckCircle2, 
  Building2, 
  Award, 
  GraduationCap, 
  BookOpen, 
  School, 
  Heart, 
  Sparkles, 
  Users, 
  Mic, 
  Send, 
  Mail, 
  Download, 
  ExternalLink,
  ChevronUp,
  Gamepad2,
  FileText,
  Wrench,
  Cpu,
  Server,
  Smartphone,
  Layers,
  Cloud,
  ShieldCheck,
  Terminal,
  Calendar,
  Database,
  Lock,
  BarChart3,
  LayoutDashboard
} from "lucide-react";
import GtaModal from "./GtaModal";
import { ModeToggleSwitch } from "./GtaLayout";
import { gtaSound } from "@/utils/gtaSounds";

// -------------------------------------------------------------
// TYPES & DATA DEFINITIONS
// -------------------------------------------------------------
interface HighlightItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export interface SimpleCardItem {
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
  overview: string;
  highlights: HighlightItem[];
  tags: string[];
  githubLinks?: { label: string; url: string }[];
  badgeLinks?: { label: string; url: string }[];
  link?: string;
}

// ABOUT CARDS DATA
const WORK_EXPERIENCES: SimpleCardItem[] = [
  {
    id: "work-gientech",
    title: "GIENTECH (UOB INTERMARK)",
    subtitle: "Enterprise Software Quality Assurance Intern (Jul 2025 – Jan 2026)",
    badge: "BANKING QA",
    badgeColor: "bg-[#4a90e2]",
    badgeTextColor: "text-white",
    description: "Enterprise software quality assurance & automated testing for UOB financial applications.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000",
    overview: "6-month corporate internship embedded in GienTech's Quality Assurance delivery team at UOB Intermark Tower Kuala Lumpur. Managed end-to-end automated test execution across web and mobile banking solutions.",
    highlights: [
      {
        title: "Perfecto Mobile Cloud Test Automation",
        desc: "Executed real-device iOS and Android test automation on Perforce Perfecto Cloud infrastructure.",
        icon: <Smartphone className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Tricentis Tosca AS1 & AS2 Test Suites",
        desc: "Built model-based GUI/API automated test scripts and managed centralized Test Data Service (TDS).",
        icon: <CheckCircle2 className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Selenium WebDriver & Maven Build Runners",
        desc: "Created Java Page Object Model (POM) automated test suites integrated into CI/CD build runners.",
        icon: <Code2 className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "UOB Intermark Corporate Delivery",
        desc: "Collaborated in Agile sprint planning, defect logging, and UAT sign-off documentation for banking releases.",
        icon: <Building2 className="w-4 h-4 text-purple-400" />
      }
    ],
    tags: ["Tricentis Tosca AS1/AS2", "Perfecto Mobile Cloud", "Selenium WebDriver", "Java / Maven", "Banking QA", "Agile Sprints"]
  },
  {
    id: "work-freelance",
    title: "FREELANCE SOFTWARE ENGINEER",
    subtitle: "Full-Stack Web & Mobile Developer (Mar 2024 – Present)",
    badge: "FULL-STACK",
    badgeColor: "bg-[#2ecc71]",
    badgeTextColor: "text-black",
    description: "Developing custom web portals, mobile apps, and database systems for SME clients.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000",
    overview: "Independent software engineering contractor specializing in modern Laravel, React, Next.js, and Flutter cross-platform applications.",
    highlights: [
      {
        title: "Custom Full-Stack Web Development",
        desc: "Built custom Laravel 10 MVC portals and Next.js applications integrated with MySQL/PostgreSQL.",
        icon: <Code2 className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Cross-Platform Mobile Apps",
        desc: "Engineered Flutter mobile applications for iOS & Android with Firebase real-time sync.",
        icon: <Smartphone className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Client System Delivery",
        desc: "Delivered e-commerce platforms, booking engines, and CRM management dashboards for local businesses.",
        icon: <Building2 className="w-4 h-4 text-[#2ecc71]" />
      }
    ],
    tags: ["Laravel 10", "React / Next.js", "Flutter Mobile", "Tailwind CSS", "MySQL", "REST API"]
  },
  {
    id: "work-skechers",
    title: "SKECHERS RETAIL CREW",
    subtitle: "Sales Associate & Customer Service Crew (Jan 2024 – Feb 2024)",
    badge: "RETAIL CREW",
    badgeColor: "bg-[#e17055]",
    badgeTextColor: "text-white",
    description: "Customer service, POS cashiering, and inventory management at Skechers retail outlet.",
    image: "/Skechers_OutletSign.jpg",
    modalImages: ["/Skechers_StaffCard.webp", "/Skechers_Outlet.webp"],
    modalImageTitle: "GALLERY / IMAGES",
    overview: "High-volume retail customer service and POS operations crew member managing inventory stock replenishment and customer inquiries.",
    highlights: [
      {
        title: "Customer Engagement & POS Operations",
        desc: "Managed point-of-sale transactions and assisted retail shoppers with product recommendations.",
        icon: <Users className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Stock Inflow & Inventory Control",
        desc: "Organized inventory stockrooms and ensured accurate product availability tracking.",
        icon: <Building2 className="w-4 h-4 text-[#00a8ff]" />
      }
    ],
    tags: ["Customer Relations", "POS Cashiering", "Stock Audit", "Teamwork"]
  },
  {
    id: "work-shopee",
    title: "SHOPEE WAREHOUSE OPERATIVE",
    subtitle: "Logistics & Fulfillment Hub Assistant (Nov 2021 – Feb 2022)",
    badge: "LOGISTICS",
    badgeColor: "bg-[#ff7675]",
    badgeTextColor: "text-white",
    description: "Package sorting, barcode scanning, and order dispatch at Shopee logistics hub.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000",
    overview: "Fast-paced e-commerce logistics hub operations managing barcode scanning, order parcel sorting, and daily shipping dispatches.",
    highlights: [
      {
        title: "Order Fulfillment & Parcel Sorting",
        desc: "Processed high-volume daily package sorting using handheld barcode scanners.",
        icon: <Building2 className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Logistics Dispatch Accuracy",
        desc: "Maintained zero-error dispatch records for regional e-commerce delivery routes.",
        icon: <CheckCircle2 className="w-4 h-4 text-[#00a8ff]" />
      }
    ],
    tags: ["E-Commerce Logistics", "Barcode Scanning", "Order Dispatch", "Hub Operations"]
  },
  {
    id: "work-ole",
    title: "OLE OLE BALI SERVICE CREW",
    subtitle: "Hospitality & Restaurant Service Staff (Mar 2021 – Oct 2021)",
    badge: "HOSPITALITY",
    badgeColor: "bg-[#00cec9]",
    badgeTextColor: "text-black",
    description: "Dining hospitality, table management, and order entry at Ole Ole Bali restaurant.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000",
    overview: "Premium casual dining service crew handling table reservations, guest hospitality, and order execution.",
    highlights: [
      {
        title: "Guest Hospitality & Dining Service",
        desc: "Delivered attentive table service and maintained restaurant cleanliness standards.",
        icon: <Heart className="w-4 h-4 text-[#fabb15]" />
      }
    ],
    tags: ["Hospitality", "Order Entry", "Customer Satisfaction", "Team Coordination"]
  },
  {
    id: "work-waiter",
    title: "AL-ANSAR STEAKHOUSE CREW",
    subtitle: "Food Service & Kitchen Assistant (Form 4 – Form 5)",
    badge: "FOOD SERVICE",
    badgeColor: "bg-[#fdcb6e]",
    badgeTextColor: "text-black",
    description: "Kitchen helper and dining server during secondary school holidays.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000",
    overview: "Secondary school holiday employment gaining early work ethic, kitchen preparation skills, and customer service experience.",
    highlights: [
      {
        title: "Early Work Ethic & Customer Service",
        desc: "Managed kitchen food prep and table service during evening peak hours.",
        icon: <Award className="w-4 h-4 text-[#fabb15]" />
      }
    ],
    tags: ["Work Ethic", "Food Prep", "Customer Care"]
  }
];

const EDUCATION_ITEMS: SimpleCardItem[] = [
  {
    id: "edu-degree",
    title: "DEGREE IN SOFTWARE ENGINEERING",
    subtitle: "Universiti Malaysia Pahang Al-Sultan Abdullah (2022 – 2026)",
    badge: "FIRST CLASS",
    badgeColor: "bg-[#fabb15]",
    badgeTextColor: "text-black",
    description: "Bachelor of Computer Science (Software Engineering) With Honors.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000",
    overview: "Graduated with First-Class Honors in Bachelor of Computer Science (Software Engineering) With Honors from UMPSA. Specializations in Full-Stack Web Development, Software QA & Automation, Machine Learning, and Database Architecture.",
    highlights: [
      {
        title: "Bachelor's Degree Thesis & FYP (AutoMate)",
        desc: "Engineered AutoMate vehicle service system with Python Decision Tree AI diagnostic classification algorithms.",
        icon: <GraduationCap className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Dean's List Academic Honors",
        desc: "Achieved Dean's List academic recognition across multiple semesters at UMPSA.",
        icon: <Award className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Core Software Engineering Modules",
        desc: "Software Architecture, Quality Assurance & Testing, Data Structures, Machine Learning, Web & Mobile Dev.",
        icon: <BookOpen className="w-4 h-4 text-[#2ecc71]" />
      }
    ],
    tags: ["Software Engineering Degree", "UMPSA Honors", "Dean's List", "Laravel & React", "Machine Learning Thesis"]
  },
  {
    id: "edu-matrics",
    title: "ENGINEERING MATRICULATION",
    subtitle: "Kolej Matrikulasi Kejuruteraan Pahang (2020 – 2021)",
    badge: "CGPA 3.92",
    badgeColor: "bg-[#00a8ff]",
    badgeTextColor: "text-white",
    description: "Pre-University Electrical Engineering Fast-Track Program.",
    image: "/Matrik_Classmate.jpg",
    modalImages: [
      "/Matrik_Classmate.jpg",
      "/Matrik_Badar.JPG",
      "/Matrik_Hall.jpg"
    ],
    modalImageTitle: "GALLERY / IMAGES",
    overview: "Completed 1-year fast-track Electrical Engineering pre-university matriculation at KMKPh Jengka with High Academic Honors (CGPA 3.92). Advanced coursework in Engineering Physics, Calculus, and Computer Programming.",
    highlights: [
      {
        title: "High Honors CGPA 3.92",
        desc: "Graduated among top-tier engineering matriculation candidates nationwide.",
        icon: <Award className="w-4 h-4 text-[#fabb15]" />
      }
    ],
    tags: ["Engineering Physics", "Calculus & Mathematics", "Programming Logic", "KMKPh Honors"]
  },
  {
    id: "edu-high",
    title: "TECHNICAL HIGH SCHOOL (SM TEKNIK MELAKA)",
    subtitle: "Electrical & Electronic Engineering Stream (2018 – 2019)",
    badge: "7As SPM",
    badgeColor: "bg-[#2ecc71]",
    badgeTextColor: "text-black",
    description: "Technical secondary education with 7As in SPM examination.",
    image: "/Teknik_Award.jpg",
    modalImages: [
      "/Teknik_Award.jpg",
      "/Teknik_Classmate.jpg",
      "/Teknik_Dormmate.jpg",
      "/Teknik_KRS.jpg"
    ],
    modalImageTitle: "GALLERY / IMAGES",
    overview: "2-year technical engineering secondary stream at SM Teknik Bukit Piatu Melaka. Achieved 7As in SPM including Grade A in Electrical & Electronic Engineering Studies (Pengajian Kejuruteraan Elektrik & Elektronik).",
    highlights: [
      {
        title: "SPM 7As Technical Honors",
        desc: "Grade A in Electrical & Electronic Engineering, Mathematics, Science, and Technical Drawing.",
        icon: <School className="w-4 h-4 text-[#fabb15]" />
      }
    ],
    tags: ["SM Teknik Melaka", "7As SPM", "Electrical & Electronics", "Engineering Drawing"]
  },
  {
    id: "edu-middle",
    title: "LOWER SECONDARY (SMK TAMAN MELAWATI)",
    subtitle: "Form 1 to Form 3 STEM Foundation (2015 – 2017)",
    badge: "PT3 DISTINCTION",
    badgeColor: "bg-purple-500",
    badgeTextColor: "text-white",
    description: "Lower secondary academic foundation and STEM co-curricular activities.",
    image: "/SMKTM_Raya.jpg",
    modalImages: [
      "/SMKTM_Award.jpg",
      "/SMKTM_Classmates.jpg",
      "/SMKTM_KRS.jpg",
      "/SMKTM_Raya.jpg"
    ],
    modalImageTitle: "GALLERY / IMAGES",
    overview: "3-year Form 1 to Form 3 academic foundation at SMK Taman Melawati Kuala Lumpur building science logic, co-curricular leadership, and IT skills.",
    highlights: [
      {
        title: "PT3 Distinction & STEM Clubs",
        desc: "Active participation in Robotics Club, Computer Science Society, and District Athletics.",
        icon: <BookOpen className="w-4 h-4 text-[#fabb15]" />
      }
    ],
    tags: ["SMK Taman Melawati", "STEM Foundation", "Robotics Club", "PT3 Exams"]
  }
];

const LIFE_ITEMS: SimpleCardItem[] = [
  {
    id: "life-volunteer",
    title: "COMMUNITY VOLUNTEERING",
    subtitle: "Flood Relief & Youth Social Causes",
    badge: "VOLUNTEER",
    badgeColor: "bg-[#e84393]",
    badgeTextColor: "text-white",
    description: "Volunteering for flood disaster relief and community food drives.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000",
    overview: "Active participation in local community aid initiatives, disaster flood relief cleanups in Temerloh & Mentakab, and distributing food packages to underprivileged families.",
    highlights: [
      {
        title: "Disaster Relief & Aid Distribution",
        desc: "Participated in emergency flood cleanup efforts and essential supply logistics.",
        icon: <Heart className="w-4 h-4 text-[#fabb15]" />
      }
    ],
    tags: ["Community Volunteer", "Flood Relief", "Social Welfare", "Disaster Management"]
  },
  {
    id: "life-speaker",
    title: "PUBLIC MOTIVATIONAL SPEAKER",
    subtitle: "Student Study Skills & Exam Seminars",
    badge: "SPEAKER",
    badgeColor: "bg-[#fdcb6e]",
    badgeTextColor: "text-black",
    description: "Delivering motivational study techniques and SPM prep workshops for secondary students.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000",
    overview: "Invited speaker for secondary school academic seminars delivering study strategies, SPM exam preparation techniques, and tech career roadmaps to Form 4 & Form 5 students.",
    highlights: [
      {
        title: "Student Study Skill Seminars",
        desc: "Conducted interactive workshops on time management, memory retention, and STEM career pathways.",
        icon: <Mic className="w-4 h-4 text-[#fabb15]" />
      }
    ],
    tags: ["Public Speaking", "Motivational Workshops", "Student Mentorship", "SPM Seminars"]
  },
  {
    id: "life-youth",
    title: "YOUTH EVENT ORGANIZER",
    subtitle: "Campus Tech & Cultural Festivals",
    badge: "LEADERSHIP",
    badgeColor: "bg-[#00a8ff]",
    badgeTextColor: "text-white",
    description: "Organizing committee lead for campus computer science hackathons and cultural events.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000",
    overview: "Served on organizing committees for UMPSA computer science hackathons, gaming tournaments, and orientation weeks managing stage logistics, sponsorship outreach, and participant registration.",
    highlights: [
      {
        title: "Campus Hackathons & Tournaments",
        desc: "Coordinated technical event setup, livestreaming production, and sponsor relations.",
        icon: <Users className="w-4 h-4 text-[#fabb15]" />
      }
    ],
    tags: ["Event Planning", "Hackathon Logistics", "Campus Leadership", "Sponsorship Outreach"]
  },
  {
    id: "life-program",
    title: "STUDENT DEVELOPMENT PROGRAM",
    subtitle: "Leadership Camps & Tech Innovation Workshops",
    badge: "WORKSHOPS",
    badgeColor: "bg-[#6c5ce7]",
    badgeTextColor: "text-white",
    description: "Attending national student leadership summits and technology innovation bootcamps.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000",
    overview: "Participated in national youth development bootcamps, soft-skill leadership retreats, and software developer meetups across Malaysia.",
    highlights: [
      {
        title: "Youth Leadership Bootcamps",
        desc: "Completed team-building retreats and software innovation workshops.",
        icon: <Sparkles className="w-4 h-4 text-[#fabb15]" />
      }
    ],
    tags: ["Leadership Camp", "Soft Skills", "Tech Workshops", "Networking"]
  }
];

// PROJECTS DATA
const FEATURED_PROJECTS: SimpleCardItem[] = [
  {
    id: "automate",
    title: "AUTOMATE SYSTEM",
    subtitle: "Degree FYP Thesis & Vehicle Workshop Platform",
    badge: "DEGREE FYP",
    badgeColor: "bg-[#fabb15]",
    badgeTextColor: "text-black",
    description: "An intelligent full-stack vehicle service and workshop management platform.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000",
    overview: "AutoMate is an end-to-end vehicle service and workshop management platform engineered for Hazeeq's Software Engineering Bachelor's Degree Final Year Project (FYP). Multi-repository architecture connecting a main Laravel 10 MVC web app with Python Flask AI microservices executing Scikit-Learn Decision Tree classification algorithms for vehicle fault prediction.",
    highlights: [
      {
        title: "Workshop Management System",
        desc: "Digital service history tracking, job card scheduling, parts inventory management, and automated invoicing.",
        icon: <Wrench className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Decision Tree Diagnostic AI Engine",
        desc: "Integrated Scikit-Learn decision tree classification models assisting mechanics with predictive maintenance.",
        icon: <Cpu className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Degree Thesis & Academic Research",
        desc: "Authored formal degree thesis detailing system architecture, machine learning evaluation, and accuracy benchmarks.",
        icon: <FileText className="w-4 h-4 text-[#2ecc71]" />
      },
      {
        title: "Laravel 10 Admin & REST Microservice API",
        desc: "Robust MVC architecture connecting web clients to isolated Python Flask AI microservice endpoints.",
        icon: <Server className="w-4 h-4 text-purple-400" />
      }
    ],
    tags: ["Laravel 10", "PHP 8.2", "Python Flask API", "Decision Tree AI", "Scikit-Learn", "MySQL", "Degree Thesis"],
    githubLinks: [
      { label: "MAIN WEB REPO", url: "https://github.com/hazeeqnajmuddin/automate" },
      { label: "AI MICROSERVICE API", url: "https://github.com/hazeeqnajmuddin/automate-ai-api" },
      { label: "DECISION TREE AI MODEL", url: "https://github.com/hazeeqnajmuddin/automate_dt_ai" }
    ]
  },
  {
    id: "qa-suite",
    title: "QA & TEST AUTOMATION",
    subtitle: "Enterprise Software Quality Assurance Suite",
    badge: "ENTERPRISE",
    badgeColor: "bg-[#4a90e2]",
    badgeTextColor: "text-white",
    description: "Enterprise software quality assurance & automated test execution suites.",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000",
    overview: "Comprehensive enterprise automated test execution framework built with Perforce Perfecto Mobile Cloud, Selenium WebDriver, Java/Maven, and Tricentis Tosca (AS1 & AS2). Ensures seamless regression testing, real device mobile validation, and quality benchmarks for banking releases.",
    highlights: [
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
    tags: ["Tricentis Tosca AS1/AS2", "Selenium WebDriver", "Perfecto Cloud", "Java / Maven", "Page Object Model", "Banking QA"],
    link: "https://github.com/hazeeqnajmuddin"
  },
  {
    id: "preacher",
    title: "PREACHER MONITORING SYSTEM",
    subtitle: "Flutter Mobile App & Firebase Realtime Cloud Backend",
    badge: "FLUTTER MOBILE",
    badgeColor: "bg-[#00a8ff]",
    badgeTextColor: "text-white",
    description: "A mobile & web Preacher Monitoring System (PMS) constructed with Flutter, Firebase Cloud Database, and Laravel backend.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000",
    overview: "The Preacher Monitoring System (PMS) is a multi-platform mobile application engineered with Flutter, Firebase NoSQL Cloud Database, and Firebase Authentication. Enables real-time schedule tracking, preacher assignment monitoring, lecture topic cataloging, and instant cloud data synchronization.",
    highlights: [
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
    tags: ["Flutter", "Dart", "Firebase", "Cloud Firestore", "Firebase Auth", "Laravel", "REST APIs"]
  },
  {
    id: "telecom-analytics",
    title: "TELECOM DATA ANALYTICS",
    subtitle: "INFINI Technology: 1.4M+ Transactions Data Science Capstone",
    badge: "DATA ANALYTICS",
    badgeColor: "bg-purple-600",
    badgeTextColor: "text-white",
    description: "Analyzed over 1.4M+ transaction records using Pareto analysis, K-Means clustering, and interactive Power BI dashboards.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
    overview: "A comprehensive Telecommunications Data Analytics Capstone for INFINI Technology. Ingested and cleaned 1.4M+ raw transaction records into a master dataset, applied Pareto Analysis (80/20 rule) across 150,000+ items, and performed K-Means clustering on 4,000+ customer accounts to deliver interactive Power BI dashboards driving RM931.05M in total revenue insights.",
    highlights: [
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
    tags: ["Python", "Pandas", "K-Means Clustering", "Power BI", "Pareto Analysis", "Jupyter", "Data Science"],
    link: "https://github.com/hazeeqnajmuddin/GIFT_DA_Capstone"
  },
  {
    id: "chillax-app",
    title: "CHILLAX MOBILE APP",
    subtitle: "Native Android Mobile Experience & Lifestyle Platform",
    badge: "ANDROID APP",
    badgeColor: "bg-emerald-600",
    badgeTextColor: "text-white",
    description: "Developed using Android Studio and Kotlin. Designed for seamless mobile user interaction and responsive UI.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000",
    overview: "A native Android mobile application engineered using Kotlin and Android Studio. Features structured Kotlin architecture, responsive user interface layouts, Gradle build automation, and smooth mobile user workflows designed for modern smartphone experiences.",
    highlights: [
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
      }
    ],
    tags: ["Kotlin", "Android Studio", "Android SDK", "Gradle (KTS)", "Jetpack", "Mobile Dev"],
    link: "https://github.com/hazeeqnajmuddin/ChillaxApp"
  },
  {
    id: "rcms-crm",
    title: "RCMS - LEAD CRM & PIPELINE",
    subtitle: "Relationship & Customer Lead Pipeline Engine",
    badge: "FULL-STACK",
    badgeColor: "bg-[#fabb15]",
    badgeTextColor: "text-black",
    description: "A full-stack Laravel application engineered for customer lead acquisition, sales pipeline tracking, and analytics.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000",
    overview: "A comprehensive full-stack Relationship and Customer Lead Management System (RCMS) constructed with Laravel 10, PHP 8.2, MySQL, and TailwindCSS. Streamlines multi-channel lead acquisition, logs sales pipeline transitions, categorizes customer issues, automates compliance document merging, and provides real-time executive dashboard analytics.",
    highlights: [
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
      }
    ],
    tags: ["Laravel 10", "PHP 8.2", "MySQL", "TailwindCSS", "Vite", "Blade", "PDF Engine"],
    link: "https://rahmahconsultancy.com/"
  },
  {
    id: "gta-portfolio",
    title: "GTA V THEMED PORTFOLIO",
    subtitle: "Interactive Grand Theft Auto V Web Application",
    badge: "NEXT.JS 14",
    badgeColor: "bg-[#2ecc71]",
    badgeTextColor: "text-black",
    description: "Interactive web portfolio built with Next.js 14, Tailwind CSS, and Framer Motion.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
    overview: "Interactive web application mimicking the iconic Grand Theft Auto V Pause Menu and character select interfaces. Designed with full WASD keyboard navigation, sound effects, mobile bento grid layouts, and dynamic theme switching.",
    highlights: [
      {
        title: "Next.js 14 & React Server Components",
        desc: "Built with Next.js App Router, TypeScript, and modern React state hooks.",
        icon: <Code2 className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "GTA WASD Keyboard Navigation Engine",
        desc: "Custom React hook handling WASD/Arrow key grid movement, sound triggers, and modal traps.",
        icon: <Gamepad2 className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Recruiter Simple Mode & Bento Grid",
        desc: "Includes dual navigation modes: Interactive GTA Pause Menu and recruiter-optimized single-page scroll mode.",
        icon: <Layers className="w-4 h-4 text-[#2ecc71]" />
      }
    ],
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "GTA Theme", "WASD Engine"],
    link: "https://github.com/hazeeqnajmuddin/gta-theme-portfolio"
  }
];

// CERTS DATA
const CERTIFICATIONS_ITEMS: SimpleCardItem[] = [
  {
    id: "aws-cloud",
    title: "AWS CLOUD PRACTITIONER",
    subtitle: "Amazon Web Services Official Certification (Apr 2026)",
    badge: "VERIFIED",
    badgeColor: "bg-[#fabb15]",
    badgeTextColor: "text-black",
    description: "Officially certified by Amazon Web Services (AWS) in core cloud infrastructure.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000",
    overview: "Officially certified AWS Cloud Practitioner (April 2026). Validates core cloud engineering knowledge across EC2 compute, S3 storage, RDS databases, VPC network isolation, IAM security policies, and cost optimization strategies.",
    highlights: [
      {
        title: "Cloud Architecture & Global Infrastructure",
        desc: "AWS Global Regions, Availability Zones, Edge Locations, and Shared Responsibility Model.",
        icon: <Cloud className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Core Infrastructure & Database Services",
        desc: "EC2 virtual servers, S3 object storage, RDS databases, VPC networking, and IAM policies.",
        icon: <Server className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Security, Compliance & IAM Governance",
        desc: "AWS KMS encryption, Security Groups, Network ACLs, IAM roles, and AWS WAF protection.",
        icon: <ShieldCheck className="w-4 h-4 text-[#2ecc71]" />
      }
    ],
    tags: ["AWS Cloud", "EC2 & S3", "IAM Security", "VPC Architecture", "CloudWatch"],
    link: "https://www.credly.com/badges/a19f3ba4-96ce-404a-a085-b9701bf76496/linked_in_profile",
    badgeLinks: [
      { label: "VERIFY CREDLY BADGE", url: "https://www.credly.com/badges/a19f3ba4-96ce-404a-a085-b9701bf76496/linked_in_profile" }
    ]
  },
  {
    id: "tosca-as1-as2",
    title: "TRICENTIS TOSCA AS1 & AS2",
    subtitle: "Automation Specialist 1 & 2 Certifications (Mar 2026)",
    badge: "AUTOMATION",
    badgeColor: "bg-[#4a90e2]",
    badgeTextColor: "text-white",
    description: "Dual professional certifications in Tricentis Tosca test automation.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000",
    overview: "Earned dual professional certifications from Tricentis Tosca: AS1 (Automating Web Application Testing) and AS2 (Optimizing Test Automation with Centralized Test Data). Demonstrates model-based test automation, dynamic test data management (TDS), and banking QA execution.",
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
      }
    ],
    tags: ["Tricentis Tosca AS1", "Tricentis Tosca AS2", "Model-Based Testing", "Test Data Service (TDS)", "Automated Regression"],
    link: "https://www.tricentis.com/"
  }
];

export default function SimpleView() {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<SimpleCardItem | null>(null);
  const [activeSection, setActiveSection] = useState<string>("about");

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = ["about", "work", "education", "projects", "certs", "life", "connect"];

    const handleScroll = () => {
      // If scrolled near bottom of page, activate last section ('connect')
      const isAtBottom = window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 120;
      if (isAtBottom) {
        setActiveSection("connect");
        return;
      }

      const scrollPosition = window.scrollY + 250; // Offset for sticky header
      
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen to 'M' key shortcut to toggle back to Interactive GTA mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm' && !selectedCard) {
        gtaSound.playToggle();
        router.push("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, selectedCard]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#fabb15] selection:text-black pb-20">
      
      {/* ------------------------------------------------------------- */}
      {/* STICKY RECRUITER NAVIGATION HEADER */}
      {/* ------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Pricedown Emblem Badge */}
          <div className="w-8 h-8 bg-gradient-to-br from-[#fabb15] to-[#c79207] text-black font-gta font-bold flex items-center justify-center text-xl rounded-sm shadow-md">
            H
          </div>
          <div>
            <div className="font-gta text-white text-base sm:text-xl tracking-wider leading-none">
              HAZEEQ NAJMUDDIN
            </div>
            <div className="text-[10px] sm:text-xs text-[#fabb15] font-bold tracking-widest uppercase">
              RECRUITER SIMPLE MODE
            </div>
          </div>
        </div>

        {/* Center Quick Jump Section Pills */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-sm text-xs font-medium">
          <button 
            onClick={() => scrollToSection("about")} 
            className={`px-3 py-1 font-gta tracking-wider text-xs font-bold rounded transition-all ${
              activeSection === "about"
                ? "bg-[#fabb15] text-black shadow-md scale-105"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            ABOUT
          </button>
          <button 
            onClick={() => scrollToSection("work")} 
            className={`px-3 py-1 font-gta tracking-wider text-xs font-bold rounded transition-all ${
              activeSection === "work"
                ? "bg-[#fabb15] text-black shadow-md scale-105"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            EXPERIENCE
          </button>
          <button 
            onClick={() => scrollToSection("education")} 
            className={`px-3 py-1 font-gta tracking-wider text-xs font-bold rounded transition-all ${
              activeSection === "education"
                ? "bg-[#fabb15] text-black shadow-md scale-105"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            EDUCATION
          </button>
          <button 
            onClick={() => scrollToSection("projects")} 
            className={`px-3 py-1 font-gta tracking-wider text-xs font-bold rounded transition-all ${
              activeSection === "projects"
                ? "bg-[#fabb15] text-black shadow-md scale-105"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            PROJECTS
          </button>
          <button 
            onClick={() => scrollToSection("certs")} 
            className={`px-3 py-1 font-gta tracking-wider text-xs font-bold rounded transition-all ${
              activeSection === "certs"
                ? "bg-[#fabb15] text-black shadow-md scale-105"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            CERTS
          </button>
          <button 
            onClick={() => scrollToSection("life")} 
            className={`px-3 py-1 font-gta tracking-wider text-xs font-bold rounded transition-all ${
              activeSection === "life"
                ? "bg-[#fabb15] text-black shadow-md scale-105"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            LIFE
          </button>
          <button 
            onClick={() => scrollToSection("connect")} 
            className={`px-3 py-1 font-gta tracking-wider text-xs font-bold rounded transition-all ${
              activeSection === "connect"
                ? "bg-[#fabb15] text-black shadow-md scale-105"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            CONNECT
          </button>
        </nav>

        {/* Right Toggle Back to GTA Interactive Mode */}
        <ModeToggleSwitch isSimpleMode={true} />
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-16 sm:space-y-24">

        {/* ------------------------------------------------------------- */}
        {/* SECTION 1: HERO / RECRUITER SUMMARY (#about) */}
        {/* ------------------------------------------------------------- */}
        <section id="about" className="pt-4 scroll-mt-20">
          <div className="relative overflow-hidden rounded-md border-2 border-white/20 bg-gradient-to-r from-black via-[#141414] to-black p-6 sm:p-10 shadow-2xl">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-[#fabb15]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fabb15]/20 border border-[#fabb15]/40 text-[#fabb15] text-xs font-bold font-gta tracking-wider rounded-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OPEN TO FULL-STACK & QA OPPORTUNITIES</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-gta text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none drop-shadow-md">
                  MUHAMMAD HAZEEQ NAJMUDDIN
                </h1>
                <p className="text-gray-300 text-base sm:text-xl font-medium max-w-3xl">
                  Full-Stack Software Engineer & Software Quality Assurance Specialist
                </p>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-4xl font-normal">
                Software Engineering honors graduate from <span className="text-[#fabb15] font-semibold">Universiti Malaysia Pahang Al-Sultan Abdullah (UMPSA)</span> with corporate internship experience in <span className="text-white font-semibold">GienTech (UOB Intermark)</span> delivering automated test execution pipelines (Perfecto Cloud, Selenium, Tosca, Maven). Experienced full-stack developer in Laravel, React, Next.js, and Flutter cross-platform applications.
              </p>

              {/* Recruiter Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="/Resume_Muhammad Hazeeq Najmuddin Roshidi.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#fabb15] hover:bg-[#e0a710] text-black font-gta text-sm sm:text-base font-bold tracking-wider rounded-sm shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD RESUME (PDF)</span>
                </a>

                <a
                  href="https://wa.me/601124759458?text=Hi%20Hazeeq,%20I'm%20reaching%20out%20from%20your%20portfolio!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#25d366] hover:bg-[#20bd5a] text-black font-gta text-sm sm:text-base font-bold tracking-wider rounded-sm shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                  <span>WHATSAPP DIRECT</span>
                </a>

                <a
                  href="mailto:hazeeqnajmuddin@gmail.com?subject=Hello%20Hazeeq"
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-gta text-sm font-bold tracking-wider rounded-sm border border-white/20 flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#fabb15]" />
                  <span>EMAIL INBOX</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/hazeeqnajmuddin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#0077b5]/20 hover:bg-[#0077b5]/30 text-[#0077b5] font-gta text-sm font-bold tracking-wider rounded-sm border border-[#0077b5]/40 flex items-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LINKEDIN</span>
                </a>

                <a
                  href="https://github.com/hazeeqnajmuddin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-gta text-sm font-bold tracking-wider rounded-sm border border-white/20 flex items-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>GITHUB</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 2: WORK EXPERIENCES (#work) */}
        {/* ------------------------------------------------------------- */}
        <section id="work" className="scroll-mt-20 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-3 h-8 bg-[#fabb15] rounded-sm shrink-0" />
            <h2 className="font-gta text-2xl sm:text-4xl text-white tracking-wider uppercase">
              WORK EXPERIENCES & ENTERPRISE ROLES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WORK_EXPERIENCES.map((work) => (
              <div
                key={work.id}
                onClick={() => setSelectedCard(work)}
                className="group relative bg-[#141414] border border-white/15 hover:border-[#fabb15] rounded-sm p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-2xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-sm ${work.badgeColor} ${work.badgeTextColor}`}>
                      {work.badge}
                    </span>
                    <span className="text-gray-400 text-xs font-medium flex items-center gap-1 group-hover:text-[#fabb15] transition-colors">
                      <span>INSPECT</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-gta text-xl text-white tracking-wide uppercase group-hover:text-[#fabb15] transition-colors">
                      {work.title}
                    </h3>
                    <p className="text-[#fabb15] text-xs font-semibold mt-0.5">
                      {work.subtitle}
                    </p>
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm line-clamp-3 font-normal">
                    {work.overview}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mt-4">
                  {work.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 text-gray-300 text-[10px] font-medium rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 3: EDUCATION (#education) */}
        {/* ------------------------------------------------------------- */}
        <section id="education" className="scroll-mt-20 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-3 h-8 bg-[#00a8ff] rounded-sm shrink-0" />
            <h2 className="font-gta text-2xl sm:text-4xl text-white tracking-wider uppercase">
              ACADEMIC EDUCATION & DEGREES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EDUCATION_ITEMS.map((edu) => (
              <div
                key={edu.id}
                onClick={() => setSelectedCard(edu)}
                className="group relative bg-[#141414] border border-white/15 hover:border-[#00a8ff] rounded-sm p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-sm ${edu.badgeColor} ${edu.badgeTextColor}`}>
                      {edu.badge}
                    </span>
                    <span className="text-gray-400 text-xs font-medium flex items-center gap-1 group-hover:text-[#00a8ff] transition-colors">
                      <span>INSPECT</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-gta text-xl text-white tracking-wide uppercase group-hover:text-[#00a8ff] transition-colors">
                      {edu.title}
                    </h3>
                    <p className="text-[#00a8ff] text-xs font-semibold mt-0.5">
                      {edu.subtitle}
                    </p>
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm line-clamp-3 font-normal">
                    {edu.overview}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mt-4">
                  {edu.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 text-gray-300 text-[10px] font-medium rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 4: FEATURED PROJECTS (#projects) */}
        {/* ------------------------------------------------------------- */}
        <section id="projects" className="scroll-mt-20 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-3 h-8 bg-[#2ecc71] rounded-sm shrink-0" />
            <h2 className="font-gta text-2xl sm:text-4xl text-white tracking-wider uppercase">
              FEATURED SYSTEMS & PROJECTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_PROJECTS.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedCard(project)}
                className="group relative bg-[#141414] border border-white/15 hover:border-[#2ecc71] rounded-sm overflow-hidden transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-lg"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/40 to-transparent" />

                  {project.badge && (
                    <div className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-sm ${project.badgeColor} ${project.badgeTextColor}`}>
                      {project.badge}
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-gta text-lg text-white tracking-wide uppercase group-hover:text-[#2ecc71] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-xs line-clamp-3 font-normal">
                      {project.overview}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 bg-white/5 text-gray-300 text-[9px] font-medium rounded-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[#2ecc71] text-xs font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
                      <span>DETAILS</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 5: CERTIFICATIONS (#certs) */}
        {/* ------------------------------------------------------------- */}
        <section id="certs" className="scroll-mt-20 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-3 h-8 bg-purple-500 rounded-sm shrink-0" />
            <h2 className="font-gta text-2xl sm:text-4xl text-white tracking-wider uppercase">
              OFFICIAL CERTIFICATIONS & CREDENTIALS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CERTIFICATIONS_ITEMS.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCard(cert)}
                className="group relative bg-[#141414] border border-white/15 hover:border-purple-400 rounded-sm p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-sm ${cert.badgeColor} ${cert.badgeTextColor}`}>
                      {cert.badge}
                    </span>
                    <span className="text-purple-400 text-xs font-medium flex items-center gap-1 group-hover:underline">
                      <span>VERIFY CREDLY</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-gta text-xl text-white tracking-wide uppercase group-hover:text-purple-400 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-purple-400 text-xs font-semibold mt-0.5">
                      {cert.subtitle}
                    </p>
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm line-clamp-3 font-normal">
                    {cert.overview}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mt-4">
                  {cert.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 text-gray-300 text-[10px] font-medium rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 6: LIFE & VOLUNTEERING (#life) */}
        {/* ------------------------------------------------------------- */}
        <section id="life" className="scroll-mt-20 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-3 h-8 bg-[#e84393] rounded-sm shrink-0" />
            <h2 className="font-gta text-2xl sm:text-4xl text-white tracking-wider uppercase">
              VOLUNTEERING, LEADERSHIP & COMMUNITY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LIFE_ITEMS.map((life) => (
              <div
                key={life.id}
                onClick={() => setSelectedCard(life)}
                className="group relative bg-[#141414] border border-white/15 hover:border-[#e84393] rounded-sm p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-sm ${life.badgeColor} ${life.badgeTextColor}`}>
                      {life.badge}
                    </span>
                    <span className="text-gray-400 text-xs font-medium flex items-center gap-1 group-hover:text-[#e84393] transition-colors">
                      <span>INSPECT</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-gta text-xl text-white tracking-wide uppercase group-hover:text-[#e84393] transition-colors">
                      {life.title}
                    </h3>
                    <p className="text-[#e84393] text-xs font-semibold mt-0.5">
                      {life.subtitle}
                    </p>
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm line-clamp-3 font-normal">
                    {life.overview}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mt-4">
                  {life.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 text-gray-300 text-[10px] font-medium rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 7: CONNECT & CONTACT (#connect) */}
        {/* ------------------------------------------------------------- */}
        <section id="connect" className="scroll-mt-20 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-3 h-8 bg-[#25d366] rounded-sm shrink-0" />
            <h2 className="font-gta text-2xl sm:text-4xl text-white tracking-wider uppercase">
              GET IN TOUCH & SOCIAL NETWORKS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <a
              href="https://wa.me/601124759458?text=Hi%20Hazeeq,%20I'm%20reaching%20out%20from%20your%20portfolio!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#141414] border border-[#25d366]/30 hover:border-[#25d366] p-5 rounded-sm flex flex-col justify-between transition-all hover:scale-[1.02] shadow-lg group"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 bg-[#25d366]/20 text-[#25d366] rounded flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <h3 className="font-gta text-xl text-white tracking-wide uppercase group-hover:text-[#25d366]">
                  WHATSAPP DIRECT
                </h3>
                <p className="text-gray-300 text-xs font-normal">
                  Connect via WhatsApp for quick inquiries & project chats.
                </p>
              </div>
              <span className="text-[#25d366] text-xs font-bold uppercase mt-4 flex items-center gap-1">
                <span>SEND MESSAGE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>

            <a
              href="mailto:hazeeqnajmuddin@gmail.com?subject=Hello%20Hazeeq"
              className="bg-[#141414] border border-[#fabb15]/30 hover:border-[#fabb15] p-5 rounded-sm flex flex-col justify-between transition-all hover:scale-[1.02] shadow-lg group"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 bg-[#fabb15]/20 text-[#fabb15] rounded flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-gta text-xl text-white tracking-wide uppercase group-hover:text-[#fabb15]">
                  DIRECT EMAIL
                </h3>
                <p className="text-gray-300 text-xs font-normal">
                  Send formal inquiries or project specs to hazeeqnajmuddin@gmail.com.
                </p>
              </div>
              <span className="text-[#fabb15] text-xs font-bold uppercase mt-4 flex items-center gap-1">
                <span>OPEN EMAIL CLIENT</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>

            <a
              href="/Resume_Muhammad Hazeeq Najmuddin Roshidi.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#141414] border border-blue-400/30 hover:border-blue-400 p-5 rounded-sm flex flex-col justify-between transition-all hover:scale-[1.02] shadow-lg group"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <h3 className="font-gta text-xl text-white tracking-wide uppercase group-hover:text-blue-400">
                  DOWNLOAD RESUME
                </h3>
                <p className="text-gray-300 text-xs font-normal">
                  Download the latest PDF resume formatted for HR & tech recruiters.
                </p>
              </div>
              <span className="text-blue-400 text-xs font-bold uppercase mt-4 flex items-center gap-1">
                <span>VIEW PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
        </section>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* RECRUITER FOOTER */}
      {/* ------------------------------------------------------------- */}
      <footer className="mt-20 border-t border-white/10 pt-8 pb-12 px-4 sm:px-6 text-center space-y-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <div className="w-6 h-6 bg-[#fabb15] text-black font-gta font-bold flex items-center justify-center text-sm rounded-sm">
            H
          </div>
          <span className="font-gta text-lg text-white tracking-wider">
            HAZEEQ NAJMUDDIN PORTFOLIO
          </span>
        </div>

        <p className="text-gray-400 text-xs max-w-xl mx-auto font-normal">
          Software Engineer & Software Quality Assurance Specialist. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.
        </p>

        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={scrollToTop}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white font-gta text-xs font-bold tracking-wider rounded-sm flex items-center gap-1.5 transition-colors"
          >
            <ChevronUp className="w-4 h-4" />
            <span>BACK TO TOP</span>
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-1.5 bg-[#fabb15] hover:bg-[#e0a710] text-black font-gta text-xs font-bold tracking-wider rounded-sm flex items-center gap-1.5 transition-colors"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>INTERACTIVE MODE</span>
          </button>
        </div>
      </footer>

      {/* ------------------------------------------------------------- */}
      {/* DETAIL INSPECTION MODAL */}
      {/* ------------------------------------------------------------- */}
      {selectedCard && (
        <GtaModal
          card={selectedCard}
          isOpen={Boolean(selectedCard)}
          onClose={() => setSelectedCard(null)}
        />
      )}

    </div>
  );
}
