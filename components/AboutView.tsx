"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import GtaLayout from "./GtaLayout";
import { useWasdNavigation } from "@/hooks/useWasdNavigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, CheckCircle2, GraduationCap, BookOpen, School, Cpu, Laptop, 
  ShieldCheck, Calculator, Terminal, FlaskConical, Medal, BookMarked, 
  Users, Building2, Briefcase, Smile, Package, PackageCheck, Zap, 
  Utensils, Clock, Receipt, Flame, Mic, Heart, Calendar, Code2, Award, 
  HeartHandshake, Leaf, Volume2, MessageSquare, UserPlus, ClipboardList, 
  CheckSquare, Wrench, UserCheck, Search, Database, Lock, LayoutDashboard, FileText
} from "lucide-react";

export interface AboutDetailHighlight {
  title: string;
  desc: string;
  icon: React.ReactNode;
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
  gridClass: string;
  titleClass: string;
  overview: string;
  highlights: AboutDetailHighlight[];
  tags: string[];
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
      desc: "Corporate internship experience embedded within financial technology divisions at UOB Intermark & CIMB.",
      icon: <Building2 className="w-4 h-4 text-[#2ecc71]" />
    },
    {
      title: "Continuous Leadership & Growth",
      desc: "Active involvement in youth development, motivational speaking, community volunteering, and event management.",
      icon: <Award className="w-4 h-4 text-purple-400" />
    }
  ],
  tags: ["Software Engineering", "Full-Stack Dev", "QA Automation", "Laravel", "React / Next.js", "Flutter"],
  nav: { s: "edu-main" }
};

// SECTION 1: EDUCATION
const EDUCATION_CARDS: AboutCard[] = [
  {
    id: "edu-main",
    title: "EDUCATION OVERVIEW",
    subtitle: "Academic Journey & Computer Science Foundations",
    description: "My academic background and foundations.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000",
    gridClass: "col-start-1 col-span-1 row-start-1 row-span-3",
    titleClass: "text-4xl md:text-5xl lg:text-6xl",
    overview: "A comprehensive summary of Hazeeq's educational journey from secondary school science stream and pre-university matriculation to a Bachelor's Degree in Software Engineering.",
    highlights: [
      {
        title: "Bachelor of Computer Science (Software Engineering)",
        desc: "Specialized degree curriculum covering software design, database systems, AI diagnostics, and testing.",
        icon: <GraduationCap className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Pre-University Matriculation Program",
        desc: "Strong STEM foundation specializing in Physical Science, Advanced Mathematics, and Computer Science.",
        icon: <BookOpen className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Secondary School (Pure Science Stream)",
        desc: "Pure Science SPM credentials with focus on Additional Mathematics, Physics, and Chemistry.",
        icon: <School className="w-4 h-4 text-[#2ecc71]" />
      }
    ],
    tags: ["Software Engineering", "Computer Science", "STEM Foundation", "High Academic Standing"],
    nav: { w: "hero-main", d: "edu-degree", s: "work-main" } 
  },
  {
    id: "edu-degree",
    title: "SOFTWARE ENGINEERING DEGREE",
    subtitle: "Bachelor of Computer Science (Software Engineering)",
    badge: "CURRENT",
    badgeColor: "bg-[#4a90e2]",
    badgeTextColor: "text-white",
    description: "Final-year Software Engineering student.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
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
    nav: { w: "hero-main", a: "edu-main", d: "edu-matrics", s: "work-intern" } 
  },
  {
    id: "edu-matrics",
    title: "PRE-U MATRICULATION",
    subtitle: "Physical Science & Computer Science Track",
    description: "Pre-university matriculation program.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-1 row-span-1",
    titleClass: "text-xl md:text-3xl",
    overview: "Completed intensive pre-university matriculation program specializing in Physical Science, Mathematics, Computer Science, and Physics.",
    highlights: [
      {
        title: "Physical Science & Mathematics",
        desc: "Mastery of advanced calculus, linear algebra, and physics principles.",
        icon: <Calculator className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Introduction to Computer Science",
        desc: "Fundamental programming logic, algorithm design, and problem solving.",
        icon: <Terminal className="w-4 h-4 text-[#00a8ff]" />
      }
    ],
    tags: ["Pre-University", "Physical Science", "Advanced Math", "Computer Science Logic"],
    nav: { w: "hero-main", a: "edu-degree", s: "edu-high" } 
  },
  {
    id: "edu-high",
    title: "HIGH SCHOOL (SPM)",
    subtitle: "Secondary Education - Pure Science Stream",
    description: "Secondary education credentials.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-2 row-span-1",
    titleClass: "text-xl md:text-3xl",
    overview: "Completed SPM secondary education with distinction in Pure Science stream (Additional Mathematics, Physics, Chemistry, Biology).",
    highlights: [
      {
        title: "Pure Science Stream",
        desc: "Academic foundation in analytical thinking, scientific methodology, and problem solving.",
        icon: <FlaskConical className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Student Leadership & Co-Curriculars",
        desc: "Active participant in school societies, sports, and student leadership councils.",
        icon: <Medal className="w-4 h-4 text-[#00a8ff]" />
      }
    ],
    tags: ["SPM Science Stream", "Additional Mathematics", "Physics & Chemistry", "Student Leadership"],
    nav: { w: "edu-matrics", a: "edu-degree", s: "edu-middle" }
  },
  {
    id: "edu-middle",
    title: "MIDDLE SCHOOL (PT3)",
    subtitle: "Lower Secondary Academic Foundation",
    description: "Early education years.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-3 row-span-1",
    titleClass: "text-xl md:text-3xl",
    overview: "Foundation years in lower secondary education building academic excellence, discipline, and team collaboration skills.",
    highlights: [
      {
        title: "Core Academic Curriculum",
        desc: "Solid foundation across mathematics, science, languages, and humanities.",
        icon: <BookMarked className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Co-Curricular Engagement",
        desc: "Participation in uniformed bodies, sports tournaments, and club leadership.",
        icon: <Users className="w-4 h-4 text-[#00a8ff]" />
      }
    ],
    tags: ["Lower Secondary", "Core Curriculum", "Co-Curriculars", "Teamwork"],
    nav: { w: "edu-high", a: "edu-degree", s: "work-skechers" }
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
    overview: "Comprehensive professional journey spanning corporate banking tech internships (UOB, CIMB), freelance engineering, logistics, customer service, and hospitality.",
    highlights: [
      {
        title: "Corporate Tech Internships",
        desc: "Banking technology operations, quality assurance testing, and system verification at UOB & CIMB.",
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
    nav: { w: "edu-main", d: "work-intern", s: "life-main" }
  },
  {
    id: "work-intern",
    title: "CORPORATE INTERNSHIPS",
    subtitle: "Banking Tech Operations & Quality Assurance (UOB & CIMB)",
    badge: "UOB",
    badgeColor: "bg-[#fabb15]",
    badgeTextColor: "text-black",
    description: "Professional internships focusing on corporate tech environments.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-1 row-span-2",
    titleClass: "text-3xl md:text-4xl",
    overview: "Professional software engineering internships embedded within enterprise banking environments at UOB (Intermark) and CIMB, focusing on automated software quality assurance, system testing, and corporate workflows.",
    highlights: [
      {
        title: "UOB Intermark Tech Operations",
        desc: "Software testing, test execution runs, and defect verification in corporate banking tech division.",
        icon: <Building2 className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "CIMB Banking Internship",
        desc: "Enterprise software workflows, user acceptance testing (UAT), and system documentation.",
        icon: <Briefcase className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Automated QA Execution",
        desc: "Hands-on test script execution using Selenium WebDriver, Maven, and Tricentis Tosca.",
        icon: <CheckCircle2 className="w-4 h-4 text-[#2ecc71]" />
      }
    ],
    tags: ["UOB Intermark", "CIMB Banking", "Enterprise QA", "Tricentis Tosca", "Selenium", "System Testing"],
    nav: { w: "edu-degree", a: "work-main", d: "work-skechers", s: "work-freelance" }
  },
  {
    id: "work-freelance",
    title: "FREELANCE ENGINEERING",
    subtitle: "Independent Systems & Custom Web Development",
    description: "Independent projects, troubleshooting, and system setups.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1000",
    gridClass: "col-start-2 col-span-1 row-start-3 row-span-2",
    titleClass: "text-3xl md:text-4xl",
    overview: "Provided freelance technical solutions including custom web application development, server setups, hardware diagnostics, and IT troubleshooting for small businesses and individual clients.",
    highlights: [
      {
        title: "Web Application Development",
        desc: "Custom Laravel, PHP, and responsive web interface design tailored to client requirements.",
        icon: <Code2 className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Hardware & Network Diagnostics",
        desc: "PC assembly, OS optimization, local network configurations, and troubleshooting.",
        icon: <Wrench className="w-4 h-4 text-[#00a8ff]" />
      },
      {
        title: "Client Communications & Milestones",
        desc: "Scoping project requirements, managing delivery milestones, and providing technical support.",
        icon: <UserCheck className="w-4 h-4 text-[#2ecc71]" />
      }
    ],
    tags: ["Freelance Developer", "Custom Web Apps", "Laravel", "Hardware Setup", "IT Support"],
    nav: { w: "work-intern", a: "work-main", d: "work-ole", s: "life-volunteer" }
  },
  {
    id: "work-skechers",
    title: "SKECHERS RETAIL",
    subtitle: "Retail Customer Specialist & Inventory Operations",
    description: "Retail operations and customer service.",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000",
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
    nav: { w: "edu-middle", a: "work-intern", s: "work-shopee" }
  },
  {
    id: "work-shopee",
    title: "SHOPEE LOGISTICS",
    subtitle: "Warehouse Distribution & Package Sorting",
    description: "Logistics and fast-paced warehouse organization.",
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
    subtitle: "F&B Operations & Front-of-House Dining",
    description: "F&B hospitality and operational flow.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000",
    gridClass: "col-start-3 col-span-1 row-start-3 row-span-1",
    titleClass: "text-xl md:text-2xl",
    overview: "Hospitality experience in upscale dining, delivering attentive table service, managing guest orders, and maintaining dining floor workflows.",
    highlights: [
      {
        title: "Guest Hospitality & Dining",
        desc: "Attentive dining service, menu recommendations, and guest satisfaction management.",
        icon: <Utensils className="w-4 h-4 text-[#fabb15]" />
      },
      {
        title: "Operational Multitasking",
        desc: "Coordinating orders with kitchen staff during peak lunch & dinner rush hours.",
        icon: <Clock className="w-4 h-4 text-[#00a8ff]" />
      }
    ],
    tags: ["F&B Hospitality", "Dining Service", "Order Coordination", "Teamwork"],
    nav: { w: "work-shopee", a: "work-freelance", s: "work-waiter" }
  },
  {
    id: "work-waiter",
    title: "STEAKHOUSE WAITER",
    subtitle: "Front-of-House Dining & Service Flow",
    description: "Front-of-house dining experience.",
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
    nav: { w: "work-ole", a: "work-freelance", s: "life-youth" }
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
    nav: { w: "work-main", d: "life-volunteer" }
  },
  {
    id: "life-volunteer",
    title: "VOLUNTEERING",
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
    nav: { w: "work-freelance", a: "life-main", d: "life-youth", s: "life-speaker" }
  },
  {
    id: "life-speaker",
    title: "MOTIVATIONAL SPEAKER",
    subtitle: "Public Speaking & Career Guidance",
    description: "Public speaking and sharing personal journeys.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000",
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
    title: "YOUTH DEVELOPMENT",
    subtitle: "Guiding & Empowering Younger Peers",
    description: "Mentoring and guiding younger peers.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000",
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
    nav: { w: "work-waiter", a: "life-volunteer", s: "life-program" }
  },
  {
    id: "life-program",
    title: "PROGRAM MANAGEMENT",
    subtitle: "Event Planning & Operational Execution",
    description: "Organizing and leading structured events.",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=1000",
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

const ALL_CARDS = [HERO_CARD, ...EDUCATION_CARDS, ...WORK_CARDS, ...LIFE_CARDS];

interface AboutViewProps {
  onNavigate?: (path: string) => void;
  activeTab?: string;
  initialActiveId?: string;
}

function AboutContent({ onNavigate, activeTab = "/about", initialActiveId }: AboutViewProps) {
  const [hoveredCard, setHoveredCard] = useState<AboutCard>(ALL_CARDS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalBodyRef = useRef<HTMLDivElement>(null);
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
          if (hoveredCard.link) {
            handleLinkNavigation(hoveredCard.link);
          } else {
            setIsModalOpen(true);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDownCapture, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDownCapture, { capture: true });
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

  const renderCard = (card: AboutCard) => {
    const isActive = hoveredCard?.id === card.id;

    return (
      <div
        id={card.id} 
        key={card.id}
        onMouseEnter={() => setHoveredCard(card)}
        onClick={() => handleCardClick(card)}
        className={`relative overflow-hidden cursor-pointer transition-all duration-200 ${card.gridClass} ${
          isActive ? "border-[3px] border-white z-10" : "border-[3px] border-transparent opacity-75 hover:opacity-100"
        }`}
      >
        <img
          src={card.image}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{ transform: isActive ? 'scale(1.04)' : 'scale(1)' }}
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        {card.badge && (
          <div className={`absolute top-2 left-2 px-1.5 py-0.5 text-[10px] md:text-xs font-bold tracking-wider ${card.badgeColor} ${card.badgeTextColor}`}>
            {card.badge}
          </div>
        )}
        
        <div className="absolute bottom-2 left-3 right-3">
          <h3 className={`font-gta text-white tracking-wide uppercase drop-shadow-md leading-none ${card.titleClass}`}>
            {card.title}
          </h3>
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
        
        <div className="absolute top-1/3 left-8 md:left-16 -translate-y-1/2 flex flex-col drop-shadow-2xl">
          <h1 className="font-gta text-7xl md:text-8xl lg:text-[9rem] text-white leading-[0.8] tracking-tighter">
            HAZEEQ
          </h1>
          <h1 className="font-gta text-7xl md:text-8xl lg:text-[9rem] text-white leading-[0.8] tracking-tighter ml-8 md:ml-16">
            NAJMUDDIN
          </h1>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <h2 className="font-gta text-2xl md:text-3xl lg:text-4xl text-white tracking-wide uppercase drop-shadow-lg">
              {HERO_CARD.title}
            </h2>
            <p className="text-gray-200 text-sm md:text-base mt-2 drop-shadow-md max-w-2xl font-medium">
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
            <span className="hidden md:inline-block text-xs bg-black text-white px-2 py-0.5 rounded font-sans font-bold">↵ ENTER</span>
          </button>
        </div>
      </div>

      {/* Section 1: Education */}
      <div className="snap-start snap-always w-full h-[75vh] min-h-[500px] mb-[25vh] grid grid-cols-3 grid-rows-3 gap-2 md:gap-3">
        {EDUCATION_CARDS.map(renderCard)}
      </div>

      {/* Section 2: Work Experiences */}
      <div className="snap-start snap-always w-full h-[75vh] min-h-[500px] mb-[25vh] grid grid-cols-3 grid-rows-4 gap-2 md:gap-3">
        {WORK_CARDS.map(renderCard)}
      </div>

      {/* Section 3: Life Experiences */}
      <div className="snap-start snap-always w-full h-[75vh] min-h-[400px] mb-[10vh] grid grid-cols-3 grid-rows-2 gap-2 md:gap-3">
        {LIFE_CARDS.map(renderCard)}
      </div>

      {/* GTA V STYLED POP-UP MODAL */}
      <AnimatePresence>
        {isModalOpen && hoveredCard && (
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
                  src={hoveredCard.image}
                  alt={hoveredCard.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16181c] via-black/40 to-transparent" />
                
                {/* Top Badge */}
                <div className="absolute top-4 left-6 flex items-center gap-2">
                  {hoveredCard.badge && (
                    <span className={`px-2 py-0.5 text-xs font-bold tracking-wider rounded-sm ${hoveredCard.badgeColor} ${hoveredCard.badgeTextColor}`}>
                      {hoveredCard.badge}
                    </span>
                  )}
                  <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-bold tracking-wider rounded-sm backdrop-blur-sm">
                    STORY DOSSIER
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
                    {hoveredCard.title}
                  </h2>
                  <p className="text-gray-300 text-xs md:text-sm font-medium mt-1">
                    {hoveredCard.subtitle}
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
                    DOSSIER OVERVIEW
                  </h3>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    {hoveredCard.overview}
                  </p>
                </div>

                {/* Highlights Grid */}
                {hoveredCard.highlights && hoveredCard.highlights.length > 0 && (
                  <div>
                    <h3 className="font-gta text-xl text-[#fabb15] tracking-wider mb-3 uppercase">
                      KEY HIGHLIGHTS & ACHIEVEMENTS
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {hoveredCard.highlights.map((item, idx) => (
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
                )}

                {/* Tags / Focus Areas */}
                {hoveredCard.tags && hoveredCard.tags.length > 0 && (
                  <div>
                    <h3 className="font-gta text-xl text-[#fabb15] tracking-wider mb-2 uppercase">
                      FOCUS DOMAINS & SKILLS
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {hoveredCard.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 bg-white/10 text-white text-xs font-semibold rounded-sm border border-white/10 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-[#2ecc71]" />
                          {tag}
                        </span>
                      ))}
                    </div>
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

export default function AboutView(props: AboutViewProps) {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-white font-gta">Loading...</div>}>
      <AboutContent {...props} />
    </Suspense>
  );
}