import React from 'react';
import {
  ShieldCheck,
  Lock,
  AlertTriangle,
  Key,
  FileCheck,
  EyeOff,
  ShieldAlert,
  Server,
  Globe,
  Radio,
} from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityPillars = [
    {
      title: 'Private Keys Are Never Published',
      desc: 'Cryptographic private keys (Let\'s Encrypt privkey.pem and WireGuard private keys) are strictly kept on the device and protected with chmod 600. They are never published or shared.',
      icon: Lock,
      color: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    },
    {
      title: 'Firewall Exposes Only Required Ports',
      desc: 'Strict default-drop firewall policy. Only TCP 853 (DNS-over-TLS) and TCP 8443 (Management) are routed through the VPS DNAT. All other incoming ports are dropped.',
      icon: ShieldCheck,
      color: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    },
    {
      title: 'HTTPS & TLS Everywhere',
      desc: 'Plain text unencrypted protocols are prohibited on external boundaries. Port 853 uses TLS 1.3 with full Let\'s Encrypt certificate chain validation, and Web UI uses HTTPS.',
      icon: FileCheck,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
    {
      title: 'DNS Services Not Unnecessarily Exposed',
      desc: 'Unencrypted standard DNS (port 53) is strictly bound to internal LAN interfaces (192.168.1.1, 127.0.0.1) and is never forwarded to the public internet to prevent amplification attacks.',
      icon: Globe,
      color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    },
    {
      title: 'Correct VPS Firewall Configuration',
      desc: 'Oracle Cloud Security Lists and host iptables explicitly enforce conntrack stateful inspection, restricting PREROUTING DNAT rules exclusively to verified destination ports.',
      icon: Server,
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    },
    {
      title: 'Credentials & Tokens Remain Private',
      desc: 'Cloudflare API tokens, router root passwords, dynamic DNS credentials, and WireGuard preshared keys are omitted or replaced with [REDACTED] in all documentation.',
      icon: EyeOff,
      color: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
    },
  ];

  return (
    <section id="security" className="py-20 sm:py-28 border-t border-lab-borderSubtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Operational Security & Defensive Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Security Posture & Defensive Design
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed font-sans">
            Running internet-facing services behind CGNAT requires rigorous cryptographic hygiene, least-privilege firewall rules, and absolute protection of private material.
          </p>
        </div>

        {/* Visible Warning Banner (User explicit requirement) */}
        <div className="p-5 sm:p-6 rounded-2xl border-2 border-rose-500/50 bg-rose-950/30 shadow-xl shadow-rose-950/20 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-white font-mono uppercase tracking-wide">
              Mandatory Security Warning:
            </h3>
            <p className="text-sm font-mono text-rose-200 font-bold leading-relaxed">
              "Never copy private keys, passwords or API tokens into public documentation."
            </p>
            <p className="text-xs text-lab-textMuted font-sans pt-1">
              All configurations, logs, and shell snippets on this website have been screened and sanitized. Live tokens, private keys, and passwords must never be committed to source code or displayed publicly.
            </p>
          </div>
        </div>

        {/* 6 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-lab-border space-y-3 flex flex-col justify-between hover:border-sky-500/30 transition-all"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${pillar.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white font-mono">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-lab-textMuted leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
