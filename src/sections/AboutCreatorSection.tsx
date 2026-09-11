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
  ExternalLink,
  Code2,
  CheckCircle2,
  Sparkles,
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

  const milestones = [
    {
      year: 'Phase 1',
      title: 'Router Unlocking & OpenWrt Migration',
      desc: 'Replaced restricted ISP stock firmware with OpenWrt on Jio router hardware, establishing root SSH access and network segmentation.',
    },
    {
      year: 'Phase 2',
      title: 'Local AdGuard Home v0.107.78 Core',
      desc: 'Moved dnsmasq to port 5353 and deployed AdGuard Home on port 53, establishing network-wide ad blocking and telemetry defense.',
    },
    {
      year: 'Phase 3',
      title: 'Overcoming CGNAT with Oracle VPS',
      desc: 'Provisioned Ubuntu 20.04 VPS with public IP 140.238.244.202, connected via WireGuard wg_oracle with 25s keepalives, and built the iptables DNAT pipeline.',
    },
    {
      year: 'Phase 4',
      title: 'Cryptographic Hardening & Android Private DNS',
      desc: 'Resolved the TLS key modulus mismatch, verified Let\'s Encrypt certificates with OpenSSL, and activated 24/7 mobile ad-blocking via un1ca.dpdns.org.',
    },
    {
      year: 'Phase 5',
      title: 'Dual-Tunnel WireGuard & Cloudflare Egress',
      desc: 'Separated incoming CGNAT relay (wg_oracle) from outbound browsing privacy (wg_vpn to Cloudflare WARP 162.159.192.1:2408).',
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
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
            Meet the Builder Behind UN1CA JioWrt
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed">
            The personal engineering story, hands-on homelab journey, and technical milestones of Suman Sheikh.
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

                {/* Profile Image container */}
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
                  Home Lab Builder / Linux & Networking Enthusiast
                </p>
                <p className="text-[11px] text-lab-textDim font-mono">
                  Project: UN1CA JioWrt Home Lab
                </p>
              </div>
            </div>

            {/* Introduction & Bio Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Introduction Quote Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-sky-950/20 border border-sky-500/30 text-xs sm:text-sm text-sky-100/90 leading-relaxed font-sans relative">
                <span className="text-sky-400 font-serif text-3xl absolute top-3 left-4 select-none opacity-50">“</span>
                <p className="pl-6 pt-1 font-mono text-xs sm:text-sm text-sky-200 leading-relaxed">
                  I’m Suman Sheikh, the creator of UN1CA JioWrt Home Lab. This project documents my journey of building, configuring and experimenting with OpenWrt, AdGuard Home, WireGuard, VPS, DNS, Cloudflare and self-hosted infrastructure.
                </p>
              </div>

              {/* Extended Philosophy Description */}
              <div className="space-y-3 text-xs sm:text-sm text-lab-textMuted leading-relaxed font-sans">
                <p>
                  Like many home lab builders, I started with consumer-grade hardware locked down by ISP firmware and trapped behind <strong className="text-white font-mono">Carrier-Grade NAT (CGNAT)</strong>. Rather than settling for limited defaults, I turned this constraint into an in-depth learning journey across the entire modern networking and Linux stack.
                </p>
                <p>
                  From compiling and flashing OpenWrt firmware to configuring reverse WireGuard tunnels on an Oracle Cloud VPS, mathematically verifying RSA/ECDSA key modulus parity with OpenSSL, and implementing native Android Private DNS across cellular networks — every single line of configuration on this website was built, tested, and verified in real-world conditions.
                </p>
              </div>

              {/* Quick Spec Tags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs font-mono">
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

        {/* My Home Lab Journey (Phase Milestones) */}
        <div id="creator-journey" className="space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>My Home Lab Journey & Project Evolution</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-white font-mono">
              From Stock Firmware to Autonomous DNS Infrastructure
            </h3>
            <p className="text-xs sm:text-sm text-lab-textMuted max-w-2xl">
              The progressive engineering phases tackled while designing and building the UN1CA JioWrt infrastructure.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-lab-border flex flex-col justify-between space-y-3 hover:border-sky-500/40 transition-all"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold uppercase">
                    {m.year}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white font-mono leading-snug">
                    {m.title}
                  </h4>
                  <p className="text-xs text-lab-textMuted leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
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
                    <p className="text-xs text-lab-textMuted leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Dedication Highlight Box */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-black/40 to-black/60 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Project Dedication</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-white font-mono">
            Documenting Every Real-World Command, Failure, and Fix
          </h4>
          <p className="text-xs sm:text-sm text-lab-textMuted leading-relaxed">
            This website is dedicated to recording the complete technical setup behind my JioWrt Home Lab. Rather than presenting a sanitized tutorial where everything works immediately, it documents the authentic process: discovering key pair mismatches, debugging kernel IP forwarding, formulating iptables rules, and proving cryptographic validity.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-amber-300">
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
