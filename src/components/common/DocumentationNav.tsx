import React, { useState } from 'react';
import { BookOpen, ChevronRight, X } from 'lucide-react';
import { timelineDaysData } from '../../data/timelineData';

interface DocumentationNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationNav: React.FC<DocumentationNavProps> = ({ isOpen, onClose }) => {
  const [daysExpanded, setDaysExpanded] = useState(true);

  if (!isOpen) return null;

  const handleNavClick = (href: string) => {
    onClose();
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = href;
    }
  };

  const coreSections = [
    { label: '1. Home & Status Matrix', href: '#' },
    { label: '2. Project Overview', href: '#homelab' },
    { label: '3. Network Architecture', href: '#architecture' },
    { label: '4. JioWrt Hardware & Interfaces', href: '#homelab' },
    { label: '5. Oracle Ubuntu VPS', href: '#homelab' },
    { label: '6. WireGuard Dual-Mesh', href: '#deep-dives' },
    { label: '7. AdGuard Home v0.107.78', href: '#homelab' },
    { label: '8. Private DNS Integration', href: '#deep-dives' },
    { label: '9. DNS-over-TLS (TCP 853)', href: '#deep-dives' },
    { label: '10. HTTPS & Let\'s Encrypt TLS', href: '#deep-dives' },
    { label: '11. Cloudflare WARP & Edge', href: '#deep-dives' },
    { label: '12. OpenWrt Firewall Rules', href: '#commands' },
    { label: '13. Routing Tables & iptables', href: '#deep-dives' },
    { label: '14. CGNAT Case Study (15 Steps)', href: '#cgnat-case-study' },
    { label: '15. Command Library (OS Target)', href: '#commands' },
    { label: '16. Troubleshooting Playbook', href: '#troubleshooting' },
    { label: '17. Security & Hardening', href: '#security' },
    { label: '18. Future Plans & Roadmap', href: '#future-plans' },
    { label: '19. Project Timeline (14 Days)', href: '#journey' },
    { label: '20. Credits & Dedication', href: '#dedication' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm bg-lab-surfaceElevated border-l border-lab-border h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-lab-border bg-lab-surface">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span className="font-mono font-bold text-sm text-white">Documentation Index</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-lab-textDim hover:text-white hover:bg-lab-surfaceElevated"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs font-mono">
          {/* 20 Core Sections */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider mb-2">
              All 20 Documentation Sections
            </div>
            {coreSections.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.href)}
                className="w-full text-left px-3 py-1.5 rounded-lg text-lab-textMuted hover:text-white hover:bg-lab-surface transition-colors flex items-center justify-between text-[11px]"
              >
                <span className="truncate">{item.label}</span>
                <ChevronRight className="w-3 h-3 text-lab-textDim shrink-0" />
              </button>
            ))}
          </div>

          {/* Build Journey Days (Day 1 - 14 + Final Result) */}
          <div className="space-y-1 pt-2 border-t border-lab-borderSubtle">
            <div className="flex items-center justify-between text-[10px] font-bold text-lab-textDim uppercase tracking-wider mb-2">
              <span>Chronological Logs (Days 1 to 14)</span>
              <button
                onClick={() => setDaysExpanded(!daysExpanded)}
                className="text-sky-400 hover:underline lowercase"
              >
                {daysExpanded ? 'collapse' : 'expand'}
              </button>
            </div>

            {daysExpanded && (
              <div className="space-y-0.5 max-h-56 overflow-y-auto pr-1">
                {timelineDaysData.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleNavClick(`#day-${d.dayNumber}`)}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-lab-textMuted hover:text-sky-300 hover:bg-lab-surface transition-colors flex items-center justify-between text-[11px]"
                  >
                    <span className="truncate">
                      Day {d.dayNumber}: {d.title}
                    </span>
                    <span className="text-[9px] text-lab-textDim shrink-0 ml-1">D{d.dayNumber}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-lab-border bg-lab-surface text-[11px] font-mono text-lab-textDim text-center">
          Suman Sheikh • UN1CA JioWrt Home Lab
        </div>
      </div>
    </div>
  );
};
