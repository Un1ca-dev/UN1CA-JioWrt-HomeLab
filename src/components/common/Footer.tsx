import React from 'react';
import { Terminal, ArrowUpRight, Github, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerNavLinks = [
    { label: 'Home', href: '#' },
    { label: 'Home Lab', href: '#homelab' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Projects', href: '#projects' },
    { label: 'Commands', href: '#commands' },
    { label: 'Troubleshooting', href: '#troubleshooting' },
    { label: 'About', href: '#about' },
  ];

  return (
    <footer className="border-t border-lab-border bg-[#05070a] text-xs text-lab-textMuted font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-base text-white block">UN1CA JioWrt</span>
                <span className="text-[11px] text-sky-400">Advanced Jio Router Home Lab</span>
              </div>
            </div>
            <p className="text-lab-textMuted max-w-md text-xs leading-relaxed font-sans">
              Built & documented by <strong className="text-white font-mono">Suman Sheikh</strong>. A real-world journey from an ISP-locked Jio router to a self-hosted networking infrastructure with OpenWrt, AdGuard Home v0.107.78, WireGuard, Oracle Cloud VPS, and Cloudflare.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-emerald-400/90">Gateway Status: Online / Protected (un1ca.dpdns.org)</span>
            </div>
          </div>

          {/* Quick Links (Exact User Required List) */}
          <div className="space-y-2.5">
            <div className="text-white font-semibold text-xs tracking-wider uppercase">Navigation</div>
            <ul className="space-y-1.5">
              {footerNavLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-sky-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Repositories */}
          <div className="space-y-2.5">
            <div className="text-white font-semibold text-xs tracking-wider uppercase">Repository & Identity</div>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://github.com/Un1ca-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1 group"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                  <ArrowUpRight className="w-3 h-3 text-lab-textDim group-hover:text-sky-400" />
                </a>
              </li>
              <li>
                <a href="#cgnat-case-study" className="hover:text-amber-400 transition-colors">
                  CGNAT Case Study
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-rose-400 transition-colors">
                  Security & Hardening
                </a>
              </li>
              <li>
                <a
                  href="https://un1ca.qzz.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1 group"
                >
                  <span>un1ca.qzz.io</span>
                  <ArrowUpRight className="w-3 h-3 text-lab-textDim group-hover:text-sky-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-lab-borderSubtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-lab-textDim text-center sm:text-left">
            © {currentYear} UN1CA JioWrt Home Lab • Built & documented by{' '}
            <strong className="text-white">Suman Sheikh</strong> (Un1ca-dev)
          </p>
          <div className="flex items-center gap-4 text-lab-textDim">
            <span>OpenWrt / JioWrt</span>
            <span>•</span>
            <span>WireGuard</span>
            <span>•</span>
            <span>AdGuard Home</span>
            <span>•</span>
            <span>Cloudflare</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
