import React from 'react';
import { Terminal, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-lab-border bg-[#05070a] text-xs text-lab-textMuted font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white">UN1CA JioWrt Home Lab</span>
            </div>
            <p className="text-lab-textMuted max-w-md text-xs leading-relaxed">
              Engineered, configured, and documented by <strong className="text-white">Suman Sheikh</strong>. A real-world journey from a CGNAT-limited Jio router to an advanced private DNS infrastructure powered by OpenWrt, AdGuard Home v0.107.78, WireGuard, and Oracle Cloud.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] text-emerald-400/90">Gateway Status: Online / Protected (un1ca.dpdns.org)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <div className="text-white font-semibold text-xs tracking-wider uppercase">Navigation</div>
            <ul className="space-y-1.5">
              <li>
                <a href="#cgnat-case-study" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>CGNAT Solution Case Study</span>
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <span>Network Architecture</span>
                </a>
              </li>
              <li>
                <a href="#homelab" className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <span>Home Lab Overview</span>
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <span>14-Day Build Journey</span>
                </a>
              </li>
              <li>
                <a href="#deep-dives" className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <span>Technical Deep Dives</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Resources & External */}
          <div className="space-y-2.5">
            <div className="text-white font-semibold text-xs tracking-wider uppercase">Reference & Roadmap</div>
            <ul className="space-y-1.5">
              <li>
                <a href="#commands" className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <span>Command Library (OS Split)</span>
                </a>
              </li>
              <li>
                <a href="#troubleshooting" className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <span>Troubleshooting Playbook</span>
                </a>
              </li>
              <li>
                <a href="#future-plans" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  <span>Future Roadmap</span>
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-sky-400 transition-colors flex items-center gap-1">
                  <span>Security & Hardening</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Un1ca-dev/UN1CA-JioWrt-HomeLab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1 group"
                >
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3 h-3 text-lab-textDim group-hover:text-sky-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-lab-borderSubtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {currentYear} UN1CA JioWrt Home Lab. Built & Documented by Suman Sheikh.
          </div>
          <div className="flex items-center gap-2 text-lab-textDim">
            <span>OpenWrt • WireGuard • AdGuard Home • Oracle Cloud</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
