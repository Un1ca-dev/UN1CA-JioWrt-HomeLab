import React from 'react';
import {
  User,
  Cpu,
  ShieldCheck,
  Radio,
  Server,
  Lock,
  Globe,
  Award,
  Terminal,
  Code2,
  Sparkles,
  Cloud,
  FileText,
  ChevronRight,
  Github,
  ExternalLink,
} from 'lucide-react';

export const AboutCreatorSection: React.FC = () => {
  const creatorSkills = [
    {
      name: 'OpenWrt & Linux Networking',
      desc: 'Firmware flashing, sysctl kernel routing, interface bridging (br-lan, phy1-ap1), and UCI firewall management.',
      icon: Cpu,
      color: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    },
    {
      name: 'AdGuard Home & DoT Filtering',
      desc: 'Deploying v0.107.78 on embedded hardware, remapping ports (53, 853, 8443), and configuring custom blocklists.',
      icon: ShieldCheck,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
    {
      name: 'WireGuard Tunnel Engineering',
      desc: 'Dual-interface routing (wg_oracle & wg_vpn), handshake monitoring, and PersistentKeepalive NAT piercing.',
      icon: Radio,
      color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    },
    {
      name: 'Cloud VPS & iptables NAT',
      desc: 'Oracle Cloud Ubuntu 20.04 administration, PREROUTING DNAT, conntrack forwarding, and POSTROUTING MASQUERADE.',
      icon: Server,
      color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    },
    {
      name: 'PKI & Cryptographic TLS',
      desc: 'ACME Let\'s Encrypt certificate issuance, modulus fingerprint matching with OpenSSL, and strict permissions (600/644).',
      icon: Lock,
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    },
    {
      name: 'Mobile Private DNS Integration',
      desc: 'Zero-app Android Private DNS over cellular 5G networks, strict SNI verification, and split-horizon DNS routing.',
      icon: Globe,
      color: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    },
  ];

  // Exactly matching the 8 milestones requested
  const homeLabJourney = [
    {
      step: '01',
      title: 'Jio Router',
      desc: 'Started experimenting with the Jio Router.',
      icon: Cpu,
      badge: 'Hardware Exploration',
    },
    {
      step: '02',
      title: 'OpenWrt',
      desc: 'Converted the router into a more flexible Linux-based networking platform.',
      icon: Terminal,
      badge: 'Linux Migration',
    },
    {
      step: '03',
      title: 'AdGuard Home',
      desc: 'Configured network-wide DNS filtering and DNS management.',
      icon: ShieldCheck,
      badge: 'DNS Filtering',
    },
    {
      step: '04',
      title: 'Private DNS',
      desc: 'Configured a custom hostname and secure DNS access.',
      icon: Globe,
      badge: 'Secure DoT',
    },
    {
      step: '05',
      title: 'WireGuard',
      desc: 'Built encrypted connectivity between the JioWrt router and VPS.',
      icon: Radio,
      badge: 'Tunneling',
    },
    {
      step: '06',
      title: 'VPS',
      desc: 'Added a VPS as a public networking endpoint because the ISP connection uses CGNAT.',
      icon: Server,
      badge: 'CGNAT Relay',
    },
    {
      step: '07',
      title: 'Cloudflare',
      desc: 'Configured Cloudflare services, DNS and website hosting.',
      icon: Cloud,
      badge: 'Cloud & Edge',
    },
    {
      step: '08',
      title: 'Home Lab Documentation',
      desc: 'Started documenting the complete setup, commands and troubleshooting process.',
      icon: FileText,
      badge: 'Open Knowledge',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 border-t border-lab-borderSubtle bg-lab-surface/20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <User className="w-3.5 h-3.5" />
            <span>About the Creator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Meet Suman Sheikh
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed">
            The hands-on builder, networking enthusiast, and developer behind the UN1CA JioWrt Home Lab.
          </p>
        </div>

        {/* Creator Hero Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-lab-border shadow-2xl bg-gradient-to-br from-[#0c121e] via-[#080c14] to-[#05080f]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Profile Avatar Column */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative group">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-400 via-teal-400 to-indigo-500 opacity-30 blur-lg group-hover:opacity-60 transition duration-500" />

                {/* Profile Image container with authentic photo */}
                <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-sky-400/50 bg-black/60 shadow-2xl">
                  <img
                    src="/profile.png"
                    alt="Suman Sheikh - Creator of UN1CA JioWrt Home Lab"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Status Overlay Pill */}
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-lab-border flex items-center justify-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Lab Active & Online</span>
                  </div>
                </div>
              </div>

              {/* Creator Metadata */}
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                  Suman Sheikh
                </h3>
                <p className="text-xs sm:text-sm text-sky-400 font-mono font-medium">
                  Home Lab Builder • Linux & Networking Enthusiast
                </p>
                <p className="text-[11px] text-lab-textDim font-mono">
                  Project: UN1CA JioWrt Home Lab
                </p>
                <div className="pt-2">
                  <a
                    href="https://github.com/Un1ca-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 hover:border-sky-400 text-sky-300 hover:text-white font-mono text-xs transition-all shadow-sm group/gh"
                  >
                    <Github className="w-3.5 h-3.5 text-sky-400 group-hover/gh:scale-110 transition-transform" />
                    <span>GitHub @Un1ca-dev</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>
            </div>

            {/* Introduction & Bio Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Introduction Quote Box (Direct user-requested text) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-sky-950/30 border border-sky-500/40 text-xs sm:text-sm text-sky-100/95 leading-relaxed font-sans relative shadow-lg">
                <span className="text-sky-400 font-serif text-4xl absolute top-2 left-3 select-none opacity-40">“</span>
                <p className="pl-6 pt-1 font-mono text-xs sm:text-sm text-sky-200 leading-relaxed font-medium">
                  I'm Suman Sheikh, the creator of UN1CA JioWrt Home Lab.
                  <br /><br />
                  This project started with a Jio Router and gradually evolved into a powerful self-hosted networking environment. I experimented with OpenWrt, AdGuard Home, WireGuard, VPS infrastructure, Private DNS, Cloudflare and secure remote access.
                  <br /><br />
                  This website documents that journey — including the architecture, configuration, troubleshooting and commands used along the way.
                </p>
              </div>

              {/* Quick Spec Tags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs font-mono">
                <div className="bg-black/50 p-2.5 rounded-xl border border-lab-borderSubtle">
                  <span className="text-lab-textDim text-[10px] block uppercase">Core Gateway</span>
                  <span className="text-white font-bold">JioWrt / OpenWrt</span>
                </div>
                <div className="bg-black/50 p-2.5 rounded-xl border border-lab-borderSubtle">
                  <span className="text-lab-textDim text-[10px] block uppercase">DNS Engine</span>
                  <span className="text-emerald-400 font-bold">AdGuard Home</span>
                </div>
                <div className="bg-black/50 p-2.5 rounded-xl border border-lab-borderSubtle">
                  <span className="text-lab-textDim text-[10px] block uppercase">Tunneling</span>
                  <span className="text-sky-400 font-bold">Dual WireGuard</span>
                </div>
                <div className="bg-black/50 p-2.5 rounded-xl border border-lab-borderSubtle">
                  <span className="text-lab-textDim text-[10px] block uppercase">Cloud Ingress</span>
                  <span className="text-purple-400 font-bold">Oracle Cloud VPS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: My Home Lab Journey (8 Timeline Steps) */}
        <div id="journey" className="space-y-6 pt-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>My Home Lab Journey</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-white font-mono">
              From Jio Router to Autonomous Self-Hosted Infrastructure
            </h3>
            <p className="text-xs sm:text-sm text-lab-textMuted max-w-2xl font-sans">
              The 8 milestone phases of experimenting, building, and refining the UN1CA JioWrt Home Lab.
            </p>
          </div>

          {/* 8 Timeline Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {homeLabJourney.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-5 rounded-2xl border border-lab-border flex flex-col justify-between space-y-3 hover:border-amber-500/40 hover:-translate-y-1 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-lg">
                        {item.step}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-lab-surfaceElevated border border-lab-border flex items-center justify-center text-lab-textMuted group-hover:text-amber-400 transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-lab-textDim uppercase tracking-wider block">
                        {item.badge}
                      </span>
                      <h4 className="text-base font-bold text-white font-mono mt-0.5">
                        {item.title}
                      </h4>
                    </div>

                    <p className="text-xs text-lab-textMuted leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technologies & Hands-On Engineering Disciplines */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>Core Disciplines & Technologies</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-white font-mono">
              Hands-On Competencies Mastered
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {creatorSkills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-5 rounded-2xl border border-lab-border space-y-3 flex flex-col justify-between hover:border-emerald-500/30 transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${skill.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white font-mono">
                        {skill.name}
                      </h4>
                    </div>
                    <p className="text-xs text-lab-textMuted leading-relaxed font-sans">
                      {skill.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Dedication Highlight Box */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/30 bg-gradient-to-r from-sky-950/20 via-black/40 to-black/60 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Project Dedication</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-white font-mono">
            Documenting Every Real-World Command, Failure, and Fix
          </h4>
          <p className="text-xs sm:text-sm text-lab-textMuted leading-relaxed font-sans">
            This website is dedicated to recording the complete technical setup behind my JioWrt Home Lab. Rather than presenting a sanitized tutorial where everything works immediately, it documents the authentic process: discovering key pair mismatches, debugging kernel IP forwarding, formulating iptables rules, and proving cryptographic validity.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-sky-300">
            <span>• OpenWrt Gateway</span>
            <span>• Oracle Cloud VPS</span>
            <span>• WireGuard Mesh</span>
            <span>• AdGuard Home DoT</span>
            <span>• Android Private DNS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
