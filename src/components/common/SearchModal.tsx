import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Terminal, AlertCircle, Calendar, ArrowRight } from 'lucide-react';
import { timelineDaysData } from '../../data/timelineData';
import { troubleshootingData } from '../../data/troubleshootingData';
import { commandsLibrary } from '../../data/commandsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && !isOpen) {
        e.preventDefault();
        // Trigger can be handled in parent
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Documentation Topics (Requirement 18: Architecture, Commands, Troubleshooting, DNS, WireGuard, AdGuard, VPS, Cloudflare, TLS, Firewall)
  const documentationTopics = [
    { title: 'Network Architecture & Conceptual Topology', keywords: ['architecture', 'topology', 'network', 'mesh', 'diagram'], href: '#architecture', badge: 'Architecture' },
    { title: 'Production Shell Commands & Rationale', keywords: ['commands', 'shell', 'cli', 'bash', 'terminal', 'wg show', 'sysctl', 'netstat'], href: '#commands', badge: 'Commands' },
    { title: 'Troubleshooting Journal & Problem Solutions', keywords: ['troubleshooting', 'debug', 'fixes', 'issues', 'problems', 'journal'], href: '#troubleshooting', badge: 'Troubleshooting' },
    { title: 'DNS Resolution & Android Private DNS (RFC 7858)', keywords: ['dns', 'private dns', 'filtering', 'resolver', 'dot', 'doh', 'un1ca.dpdns.org'], href: '#overview', badge: 'DNS' },
    { title: 'WireGuard Point-to-Point Overlay Tunnel', keywords: ['wireguard', 'tunnel', 'overlay', 'vpn', 'keepalive', 'wg0', 'wg_oracle', '51820'], href: '#deep-dives', badge: 'WireGuard' },
    { title: 'AdGuard Home v0.107.78 DNS Engine', keywords: ['adguard', 'adguardhome', 'adguard home', 'port 53', 'port 853', 'port 8443'], href: '#overview', badge: 'AdGuard' },
    { title: 'Oracle Cloud VPS & CGNAT Ingress Anchor', keywords: ['vps', 'oracle', 'ubuntu', '140.238.244.202', 'cloud', 'cgnat'], href: '#cgnat-case-study', badge: 'VPS' },
    { title: 'Cloudflare Pages & Global Edge Infrastructure', keywords: ['cloudflare', 'pages', 'edge', 'un1ca.qzz.io', 'cdn', 'wrangler'], href: '#overview', badge: 'Cloudflare' },
    { title: 'TLS / SSL Cryptographic Verification & ACME', keywords: ['tls', 'ssl', 'certificate', 'modulus', 'openssl', 'sni', 'crypto'], href: '#deep-dives', badge: 'TLS' },
    { title: 'Firewall, iptables NAT & Security Center', keywords: ['firewall', 'iptables', 'nat', 'dnat', 'masquerade', 'security', 'ports'], href: '#security', badge: 'Firewall' },
  ];

  const matchingTopics = documentationTopics.filter(
    (t) => !q || t.title.toLowerCase().includes(q) || t.badge.toLowerCase().includes(q) || t.keywords.some((k) => k.includes(q))
  );

  // Search Results
  const matchingDays = timelineDaysData.filter(
    (d) =>
      !q ||
      d.title.toLowerCase().includes(q) ||
      d.subtitle.toLowerCase().includes(q) ||
      d.goal.toLowerCase().includes(q) ||
      d.commands.some((c) => c.cmd.toLowerCase().includes(q))
  );

  const matchingTroubleshooting = troubleshootingData.filter(
    (t) =>
      !q ||
      t.problem.toLowerCase().includes(q) ||
      (t.diagnosis && t.diagnosis.toLowerCase().includes(q)) ||
      (t.fix && t.fix.toLowerCase().includes(q)) ||
      (t.result && t.result.toLowerCase().includes(q)) ||
      (t.symptom && t.symptom.toLowerCase().includes(q)) ||
      (t.cause && t.cause.toLowerCase().includes(q)) ||
      (t.solution && t.solution.toLowerCase().includes(q))
  );

  const matchingCommands = commandsLibrary.flatMap((cat) =>
    cat.commands
      .filter((c) => !q || c.cmd.toLowerCase().includes(q) || (c.explanation && c.explanation.toLowerCase().includes(q)))
      .map((c) => ({ ...c, category: cat.name }))
  );

  const handleSelect = (href: string) => {
    onClose();
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = href;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-lab-surfaceElevated border border-lab-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-lab-border bg-lab-surface">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search days, commands, iptables, TLS errors, ports..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-lab-textDim focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-lab-textDim hover:text-white"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 space-y-6 text-xs font-mono">
          {/* Documentation Topics & Core Sections */}
          {matchingTopics.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-lab-textDim uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-purple-400" />
                <span>Documentation Sections & Guides ({matchingTopics.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchingTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(topic.href)}
                    type="button"
                    className="text-left p-2.5 rounded-xl bg-lab-surface/80 hover:bg-lab-surface transition-colors flex items-center justify-between group border border-lab-borderSubtle hover:border-purple-500/40"
                  >
                    <div className="truncate pr-2">
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold uppercase mr-1.5">
                        {topic.badge}
                      </span>
                      <span className="text-white font-bold group-hover:text-purple-300 text-xs">
                        {topic.title}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-lab-textDim group-hover:text-purple-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Days */}
          {matchingDays.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-lab-textDim uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                <span>Build Journey Days ({matchingDays.length})</span>
              </div>
              <div className="space-y-1">
                {matchingDays.slice(0, 5).map((day) => (
                  <button
                    key={day.id}
                    onClick={() => handleSelect(`#day-${day.dayNumber}`)}
                    type="button"
                    className="w-full text-left p-2.5 rounded-xl hover:bg-lab-surface transition-colors flex items-center justify-between group border border-transparent hover:border-lab-borderSubtle"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 text-center leading-6 font-bold text-[10px]">
                        D{day.dayNumber}
                      </span>
                      <div>
                        <div className="text-white font-bold group-hover:text-sky-300">
                          {day.title}
                        </div>
                        <div className="text-[11px] text-lab-textMuted line-clamp-1">{day.subtitle}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-lab-textDim group-hover:text-sky-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Troubleshooting */}
          {matchingTroubleshooting.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-lab-textDim uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Troubleshooting Articles ({matchingTroubleshooting.length})</span>
              </div>
              <div className="space-y-1">
                {matchingTroubleshooting.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect('#troubleshooting')}
                    type="button"
                    className="w-full text-left p-2.5 rounded-xl hover:bg-lab-surface transition-colors flex items-center justify-between group border border-transparent hover:border-lab-borderSubtle"
                  >
                    <div>
                      <div className="text-white font-bold group-hover:text-amber-300">
                        {item.problem}
                      </div>
                      <div className="text-[11px] text-lab-textMuted line-clamp-1">{item.symptom}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-lab-textDim group-hover:text-amber-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Commands */}
          {matchingCommands.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-lab-textDim uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Command Snippets ({matchingCommands.length})</span>
              </div>
              <div className="space-y-1">
                {matchingCommands.slice(0, 4).map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect('#commands')}
                    type="button"
                    className="w-full text-left p-2.5 rounded-xl hover:bg-lab-surface transition-colors flex items-center justify-between group border border-transparent hover:border-lab-borderSubtle"
                  >
                    <div className="overflow-hidden">
                      <div className="text-emerald-400 font-mono text-xs truncate">
                        {cmd.cmd}
                      </div>
                      <div className="text-[10px] text-lab-textDim">{cmd.category}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-lab-textDim group-hover:text-emerald-400 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingDays.length === 0 && matchingTroubleshooting.length === 0 && matchingCommands.length === 0 && (
            <div className="py-8 text-center text-lab-textMuted">
              No results found for "{query}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-lab-borderSubtle bg-lab-surface flex items-center justify-between text-[11px] text-lab-textDim">
          <span>Navigate with mouse or jump straight to section</span>
          <kbd className="px-1.5 py-0.5 rounded bg-lab-surfaceElevated border border-lab-borderSubtle">
            ESC to close
          </kbd>
        </div>
      </div>
    </div>
  );
};
