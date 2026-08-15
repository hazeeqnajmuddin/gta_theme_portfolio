import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hazeeq.my"),
  title: {
    default: "Muhammad Hazeeq Najmuddin Roshidi | Software Engineer & QA Specialist",
    template: "%s | Hazeeq Najmuddin Portfolio",
  },
  description:
    "Official portfolio of Muhammad Hazeeq Najmuddin Roshidi — Software Engineer, Full-Stack Developer (Laravel, React, Next.js), and Quality Assurance Specialist (Selenium, Tosca, Automation). Graduated with Honors from UMPSA.",
  keywords: [
    "Hazeeq Najmuddin",
    "Muhammad Hazeeq Najmuddin Roshidi",
    "Hazeeq Najmuddin Portfolio",
    "Hazeeq Najmuddin Software Engineer",
    "Hazeeq Najmuddin QA Specialist",
    "Software Engineer Malaysia",
    "Quality Assurance Specialist Malaysia",
    "UMPSA Software Engineering",
    "GienTech QA Intern",
    "UOB GienTech",
    "AutoMate System FYP",
  ],
  authors: [{ name: "Muhammad Hazeeq Najmuddin Roshidi", url: "https://hazeeq.my" }],
  creator: "Muhammad Hazeeq Najmuddin Roshidi",
  publisher: "Muhammad Hazeeq Najmuddin Roshidi",
  alternates: {
    canonical: "https://hazeeq.my",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hazeeq.my",
    title: "Muhammad Hazeeq Najmuddin Roshidi | Software Engineer & QA Specialist",
    description:
      "Interactive GTA V-themed portfolio & recruiter resume of Muhammad Hazeeq Najmuddin Roshidi. Explore full-stack applications, QA automation suites, and professional career milestones.",
    siteName: "Hazeeq Najmuddin Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Hazeeq Najmuddin Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Hazeeq Najmuddin Roshidi | Software Engineer & QA Specialist",
    description:
      "Full-Stack Software Engineer & QA Automation Specialist. UMPSA First-Class Honors graduate.",
    images: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "SMG8u9fnPl1In2d_4YoolEbHGeTZh9PCsZJSmTXs0S0",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Hazeeq Najmuddin Roshidi",
  alternateName: ["Hazeeq Najmuddin", "Hazeeq"],
  url: "https://hazeeq.my",
  image: "https://hazeeq.my/Skechers_StaffCard.webp",
  jobTitle: "Software Engineer & Quality Assurance Specialist",
  worksFor: {
    "@type": "Organization",
    name: "GienTech Systems",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Universiti Malaysia Pahang Al-Sultan Abdullah (UMPSA)",
  },
  sameAs: [
    "https://www.linkedin.com/in/hazeeqnajmuddin",
    "https://github.com/hazeeqnajmuddin",
    "https://instagram.com/hazeeqnajmuddin",
    "https://www.tiktok.com/@hazyck_",
  ],
  knowsAbout: [
    "Software Engineering",
    "Quality Assurance",
    "Automated Testing",
    "Selenium WebDriver",
    "Tricentis Tosca",
    "Laravel",
    "React.js",
    "Next.js",
    "Python",
    "Full-Stack Web Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
