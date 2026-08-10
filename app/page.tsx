"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GtaMenu from "@/components/GtaMenu";
import AboutView from "@/components/AboutView";
import ProjectsView from "@/components/ProjectsView";
import CertsView from "@/components/CertsView";
import ConnectView from "@/components/ConnectView";
import GtaWelcomeModal from "@/components/GtaWelcomeModal";

function MainPortfolioApp() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("/");
  const [activeSubId, setActiveSubId] = useState<string | null>(null);

  // Sync state from searchParams on initial load / URL update
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const activeParam = searchParams.get("active");
    if (tabParam) {
      setActiveTab(tabParam.startsWith("/") ? tabParam : `/${tabParam}`);
    }
    if (activeParam) {
      setActiveSubId(activeParam);
    }
  }, [searchParams]);

  const handleNavigate = (url: string) => {
    // URL can be like "/about", "/projects?active=qa-suite", "/about?active=work-main"
    const [path, query] = url.split("?");
    const params = new URLSearchParams(query || "");
    const subId = params.get("active");

    const cleanPath = path || "/";
    setActiveTab(cleanPath);
    setActiveSubId(subId || null);

    // Update browser URL query string smoothly without route reload
    const tabName = cleanPath === "/" ? "" : cleanPath.replace("/", "");
    let newUrl = window.location.pathname;
    if (tabName || subId) {
      const qParams = new URLSearchParams();
      if (tabName) qParams.set("tab", tabName);
      if (subId) qParams.set("active", subId);
      newUrl += `?${qParams.toString()}`;
    }
    window.history.pushState({}, "", newUrl);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case "/about":
        return <AboutView onNavigate={handleNavigate} activeTab={activeTab} initialActiveId={activeSubId || undefined} />;
      case "/projects":
        return <ProjectsView onNavigate={handleNavigate} activeTab={activeTab} initialActiveId={activeSubId || undefined} />;
      case "/certs":
        return <CertsView onNavigate={handleNavigate} activeTab={activeTab} initialActiveId={activeSubId || undefined} />;
      case "/connect":
        return <ConnectView onNavigate={handleNavigate} activeTab={activeTab} />;
      case "/":
      default:
        return <GtaMenu onNavigate={handleNavigate} activeTab={activeTab} />;
    }
  };

  return (
    <main>
      <GtaWelcomeModal />
      {renderActiveView()}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="h-screen bg-black text-white flex items-center justify-center font-sans select-none">LOADING...</div>}>
      <MainPortfolioApp />
    </Suspense>
  );
}