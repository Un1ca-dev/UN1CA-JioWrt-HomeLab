import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Shield,
  Radio,
  Server,
  Cpu,
  Smartphone,
  Lock,
  Github,
  BookOpen,
  Network,
  Compass,
  User,
  Sparkles,
  Terminal,
  ExternalLink,
} from 'lucide-react';
import { heroMetaStats } from '../data/statsData';

export const HeroSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Animated packet progression: Android -> Internet -> Oracle VPS -> WireGuard -> JioWrt -> AdGuard Home
  const packetStages = [
    { label: 'Android Phone', sub: 'un1ca.dpdns.org:853', icon: Smartphone, color: 'text-purple-400' },
    { label: 'Cellular 4G/5G', sub: 'Carrier Transit', icon: Network, color: 'text-sky-400' },
    { label: 'Oracle Cloud VPS', sub: '140.238.244.202:853', icon: Server, color: 'text-blue-400' },
    { label: 'WireGuard Tunnel', sub: 'wg_oracle 10.200.0.0/24', icon: Radio, color: 'text-emerald-400' },
    { label: 'JioWrt Gateway', sub: 'OpenWrt 192.168.1.1', icon: Cpu, color: 'text-amber-400' },
    { label: 'AdGuard Home', sub: 'v0.107.78 Interception', icon: Shield, color: 'text-emerald-400' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % packetStages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [packetStages.length]);

  return (
    <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-28 overflow-hidden bg-dot-pattern">
      {/* Radial Gradient Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Creator Profile Badge with Real Photo -> Links to GitHub */}
          <a
            href="https://github.com/Un1ca-dev"
            target="_blank"
            rel="noopener noreferrer"
            title="View Suman Sheikh's GitHub Profile"
            className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-full glass-panel border border-sky-500/30 hover:border-sky-400/60 hover:bg-sky-950/30 transition-all shadow-lg shadow-sky-950/30 group"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-sky-400 shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/profile.png"
                alt="Suman Sheikh - Creator of UN1CA JioWrt Home Lab"
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-lab-bg" />
            </div>
            <div className="text-left font-mono">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white leading-tight group-hover:text-sky-300 transition-colors">
                  {heroMetaStats.owner}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 flex items-center gap-1">
                  <Github className="w-2.5 h-2.5" />
                  <span>Un1ca-dev</span>
                </span>
              </div>
              <p className="text-[10px] text-lab-textMuted leading-tight">
                Home Lab Builder • Linux & Networking Enthusiast
              </p>
            </div>
          </a>

          {/* Domain Status Pill */}
          <div className="flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-lab-border text-xs font-mono text-sky-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-white font-semibold">{heroMetaStats.hostname}</span>
              <span className="text-emerald-400 font-bold">● {heroMetaStats.status}</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-300 border border-sky-500/20">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Advanced Jio Router Home Lab</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-mono">
              UN1CA <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">JioWrt</span>
            </h1>
            <p className="text-base sm:text-xl font-mono text-sky-200/90 font-medium tracking-wide">
              "From a Jio Router to a complete self-hosted networking environment."
            </p>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-lab-textMuted max-w-3xl mx-auto leading-relaxed font-sans">
            A fully documented OpenWrt-powered home gateway by <strong className="text-white">{heroMetaStats.owner}</strong> — featuring <strong className="text-white">AdGuard Home v0.107.78</strong>, <strong className="text-white">Let's Encrypt TLS</strong>, <strong className="text-white">Oracle Cloud VPS (140.238.244.202)</strong>, <strong className="text-white">Dual WireGuard Tunnels</strong>, and <strong className="text-white">Android Private DNS</strong> engineered to bypass carrier NAT constraints.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#homelab"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs sm:text-sm font-bold shadow-lg shadow-sky-500/25 transition-all hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>Explore Home Lab</span>
            </a>

            <a
              href="#architecture"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-lab-surfaceElevated hover:bg-lab-surfaceHover border border-lab-border text-white font-mono text-xs sm:text-sm font-medium transition-all hover:border-sky-500/40"
            >
              <Network className="w-4 h-4 text-purple-400" />
              <span>Architecture</span>
            </a>

            <a
              href="#commands"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-lab-surfaceElevated hover:bg-lab-surfaceHover border border-lab-border text-white font-mono text-xs sm:text-sm font-medium transition-all hover:border-sky-500/40"
            >
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>Documentation</span>
            </a>

            <a
              href="https://github.com/Un1ca-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-sky-500/40 hover:border-sky-400 text-sky-300 hover:text-white font-mono text-xs sm:text-sm font-semibold transition-all shadow-lg hover:-translate-y-0.5"
            >
              <Github className="w-4 h-4 text-sky-400" />
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Live Packet Flow Visualization Widget */}
        <div className="mt-14 max-w-5xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-lab-border shadow-2xl relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-lab-borderSubtle pb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Live DNS-over-TLS Ingress Pipeline
              </span>
            </div>
            <div className="text-[11px] font-mono text-lab-textDim">
              Target: <code className="text-sky-300">un1ca.dpdns.org:853</code> (Forwarded via <code className="text-emerald-300">140.238.244.202</code>)
            </div>
          </div>

          {/* Pipeline Stages */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative">
            {packetStages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                    isActive
                      ? 'bg-sky-950/40 border-sky-400 box-glow scale-105 z-10'
                      : isPast
                      ? 'bg-lab-surfaceElevated/70 border-emerald-500/30'
                      : 'bg-black/30 border-lab-borderSubtle opacity-70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-lab-textDim">0{idx + 1}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                      )}
                    </div>
                    <div className={`w-8 h-8 rounded-lg bg-lab-surface flex items-center justify-center mb-2 ${stage.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-mono font-bold text-white leading-tight">
                      {stage.label}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-lab-textMuted mt-2 truncate">
                    {stage.sub}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Under-the-hood summary */}
          <div className="mt-6 pt-4 border-t border-lab-borderSubtle flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-lab-textMuted gap-2">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>TLS 1.3 • RFC 7858 DoT • Modulus 13dff6ee... • 0.0.0.0 ad blocking</span>
            </div>
            <div className="text-emerald-400 font-semibold">
              VPS Public IP: 140.238.244.202
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
