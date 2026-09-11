import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { BackToTop } from './components/common/BackToTop';
import { SearchModal } from './components/common/SearchModal';
import { DocumentationNav } from './components/common/DocumentationNav';
import { HeroSection } from './sections/HeroSection';
import { StatsSection } from './sections/StatsSection';
import { AboutCreatorSection } from './sections/AboutCreatorSection';
import { ArchitectureSection } from './sections/ArchitectureSection';
import { OverviewSection } from './sections/OverviewSection';
import { CgnatCaseStudySection } from './sections/CgnatCaseStudySection';
import { TimelineSection } from './sections/TimelineSection';
import { DeepDivesSection } from './sections/DeepDivesSection';
import { CommandsSection } from './sections/CommandsSection';
import { TroubleshootingSection } from './sections/TroubleshootingSection';
import { FutureRoadmapSection } from './sections/FutureRoadmapSection';
import { SecuritySection } from './sections/SecuritySection';
import { StorySection } from './sections/StorySection';
import { DedicationSection } from './sections/DedicationSection';
import { ListFilter } from 'lucide-react';

export const App: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [docNavOpen, setDocNavOpen] = useState(false);

  // Global hotkey listener for '/' or Cmd/Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) &&
        !searchOpen &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  return (
    <div className="min-h-screen bg-lab-bg text-lab-text flex flex-col font-sans selection:bg-sky-500/30 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenDocsIndex={() => setDocNavOpen(true)}
      />

      {/* Main Content Flow */}
      <main className="flex-grow">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Core Stats & Ports */}
        <StatsSection />

        {/* 3. Dedicated About Creator & Journey Section */}
        <AboutCreatorSection />

        {/* 4. Homelab Overview (10 Component Cards) */}
        <OverviewSection />

        {/* 5. Network Architecture & Dual-Tunnels */}
        <ArchitectureSection />

        {/* 6. CGNAT Case Study (15 Steps) */}
        <CgnatCaseStudySection />

        {/* 7. Chronological 14-Day Build Journey */}
        <TimelineSection />

        {/* 8. Under-the-hood Deep Dives (TLS, WG, Routing, etc.) */}
        <DeepDivesSection />

        {/* 9. Command Library (OS Disambiguated) */}
        <CommandsSection />

        {/* 10. Searchable Troubleshooting Playbook */}
        <TroubleshootingSection />

        {/* 11. Future Plans & Architecture Roadmap */}
        <FutureRoadmapSection />

        {/* 12. Security Hardening & Permissions */}
        <SecuritySection />

        {/* 13. "Why I Built This" Project Story */}
        <StorySection />

        {/* 14. Dedication & Credits to Suman Sheikh */}
        <DedicationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Utilities */}
      <BackToTop />

      {/* Floating Quick Docs Index Button */}
      <button
        onClick={() => setDocNavOpen(true)}
        type="button"
        className="fixed bottom-6 left-6 z-40 px-3.5 py-2.5 rounded-xl bg-lab-surfaceElevated/90 hover:bg-lab-surfaceHover border border-lab-border text-xs font-mono text-white shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-sky-400 flex items-center gap-2 group"
        title="Open Documentation Index"
      >
        <ListFilter className="w-4 h-4 text-sky-400 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline font-semibold">Docs Index</span>
      </button>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Documentation Sidebar Drawer */}
      <DocumentationNav isOpen={docNavOpen} onClose={() => setDocNavOpen(false)} />
    </div>
  );
};

export default App;
