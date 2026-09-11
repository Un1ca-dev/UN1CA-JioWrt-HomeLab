import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Terminal, Search, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenDocsIndex?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenDocsIndex }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Home Lab', href: '#homelab' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Projects', href: '#projects' },
    { label: 'CGNAT Flow', href: '#cgnat-case-study' },
    { label: 'Commands', href: '#commands' },
    { label: 'Troubleshooting', href: '#troubleshooting' },
    { label: 'Security', href: '#security' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-lab-bg/85 backdrop-blur-md border-b border-lab-border py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand with Profile Avatar */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-sky-400/50 shadow-md group-hover:scale-105 transition-transform shrink-0">
            <img
              src="/profile.png"
              alt="Suman Sheikh - Creator of UN1CA JioWrt Home Lab"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white font-mono">
                UN1CA <span className="text-sky-400">JioWrt</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Online
              </span>
            </div>
            <p className="text-[11px] text-lab-textMuted font-mono hidden md:block">
              By Suman Sheikh • un1ca.dpdns.org
            </p>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-lab-surface/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-lab-borderSubtle text-xs font-mono">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-full text-lab-textMuted hover:text-white hover:bg-lab-surfaceElevated transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-lab-surfaceElevated border border-lab-border text-lab-textMuted hover:text-white hover:border-lab-accent text-xs font-mono transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-lab-accent" />
              <span>Search Docs</span>
              <kbd className="text-[10px] bg-lab-surface px-1 py-0.5 rounded text-lab-textDim border border-lab-borderSubtle">
                /
              </kbd>
            </button>
          )}

          <a
            href="https://github.com/Un1ca-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-lab-surfaceElevated hover:bg-lab-surfaceHover text-lab-text text-xs font-mono font-medium border border-lab-border transition-all hover:border-sky-400/50"
          >
            <Github className="w-4 h-4 text-lab-accent" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              type="button"
              className="p-2 rounded-lg bg-lab-surfaceElevated border border-lab-border text-lab-textMuted hover:text-white"
              aria-label="Search documentation"
            >
              <Search className="w-4 h-4 text-lab-accent" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 rounded-lg bg-lab-surfaceElevated border border-lab-border text-lab-textMuted hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-lab-border bg-lab-bg/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-mono text-lab-textMuted hover:text-white hover:bg-lab-surfaceElevated transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-lab-textDim" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-lab-borderSubtle flex flex-col gap-2">
            <a
              href="https://github.com/Un1ca-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-lab-surfaceElevated text-sm font-mono text-white border border-lab-border"
            >
              <Github className="w-4 h-4 text-sky-400" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
