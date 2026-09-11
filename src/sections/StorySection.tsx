import React from 'react';
import { BookOpen, Lightbulb, Compass, Cpu, ShieldAlert, Check } from 'lucide-react';

export const StorySection: React.FC = () => {
  const learningTopics = [
    { title: 'Networking Fundamentals', desc: 'Subnet segmentation, gateway routing, and packet flow under Linux.' },
    { title: 'DNS Engineering', desc: 'Recursive resolvers, split-horizon DNS, upstream caching, and DNSSEC.' },
    { title: 'Modern PKI & TLS', desc: 'X.509 cert chains, RSA/ECDSA modulus verification, and strict SNI.' },
    { title: 'CGNAT Traversal', desc: 'Overcoming non-routable carrier NAT using persistent reverse tunnels.' },
    { title: 'WireGuard Architecture', desc: 'Kernel-level ChaCha20-Poly1305 tunnels and keepalive mechanics.' },
    { title: 'Cloud Infrastructure', desc: 'Oracle Cloud VPS provisioning, network security groups, and virtual NICs.' },
    { title: 'Linux Firewalling', desc: 'iptables PREROUTING DNAT, stateful conntrack FORWARD, and POSTROUTING MASQUERADE.' },
    { title: 'Native Private DNS', desc: 'RFC 7858 DNS-over-TLS protocol mechanics across mobile 5G networks.' },
    { title: 'True Self-Hosting', desc: 'Running mission-critical privacy services on low-power consumer hardware.' },
  ];

  return (
    <section id="story" className="py-20 sm:py-28 border-t border-lab-borderSubtle bg-lab-surface/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>The Homelab Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Why I Built This
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed">
            This project started as an experiment on a standard ISP Jio router and evolved into a resilient, production-quality home-lab infrastructure.
          </p>
        </div>

        {/* Story Narrative Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-lab-border space-y-6 text-sm sm:text-base text-lab-text leading-relaxed font-sans">
          <p>
            The goal was never just to "install software" or run an automated one-line script. The true objective was to <strong className="text-white">deeply understand how modern network infrastructure fits together</strong> — from the silicon of consumer router hardware to cloud virtual machines and cryptographic handshakes across cellular networks.
          </p>
          <p>
            Most tutorials online present a sanitized, unrealistic picture where every command works instantaneously on the first attempt. In reality, real systems break:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono py-2">
            <div className="bg-black/50 p-4 rounded-xl border border-rose-500/30 text-rose-200">
              <span className="text-rose-400 font-bold block mb-1">Breakdown 1</span>
              Certificates mismatching private keys and crashing the DoT daemon on startup.
            </div>
            <div className="bg-black/50 p-4 rounded-xl border border-amber-500/30 text-amber-200">
              <span className="text-amber-400 font-bold block mb-1">Breakdown 2</span>
              Carrier-Grade NAT silently dropping incoming cellular queries at the ISP boundary.
            </div>
            <div className="bg-black/50 p-4 rounded-xl border border-blue-500/30 text-blue-200">
              <span className="text-blue-400 font-bold block mb-1">Breakdown 3</span>
              Split DNS loops attempting to route internal LAN requests out to public cloud IP.
            </div>
          </div>

          <p>
            By documenting the failures, diagnosing the kernel logs with <code className="text-sky-300 font-mono text-xs bg-lab-surfaceElevated px-1.5 py-0.5 rounded border border-lab-borderSubtle">logread</code>, proving modulus parity with <code className="text-sky-300 font-mono text-xs bg-lab-surfaceElevated px-1.5 py-0.5 rounded border border-lab-borderSubtle">openssl</code>, and verifying iptables hit counters, this home lab transformed from a toy router into an ironclad self-hosted DNS gateway.
          </p>
        </div>

        {/* Mastered Disciplines Grid */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
            Core Disciplines Mastered Through Building UN1CA JioWrt
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
            {learningTopics.map((topic, idx) => (
              <div
                key={idx}
                className="bg-lab-surfaceElevated p-3.5 rounded-xl border border-lab-borderSubtle flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-md bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 mt-0.5 border border-sky-500/20">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-white font-bold text-[11px]">{topic.title}</div>
                  <div className="text-lab-textMuted text-[10px] mt-0.5 leading-normal">{topic.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
