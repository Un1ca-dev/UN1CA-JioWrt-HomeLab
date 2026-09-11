import React from 'react';
import {
  AlertTriangle,
  ShieldAlert,
} from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityPillars = [
    {
      title: 'Private Keys',
      rule: 'Never publish',
      emoji: '🔐',
      desc: 'Cryptographic private keys (Let\'s Encrypt privkey.pem and WireGuard private keys) are strictly kept on the local host with chmod 600. Never commit or disclose private keys.',
      color: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    },
    {
      title: 'Passwords',
      rule: 'Never publish',
      emoji: '🔑',
      desc: 'Router root credentials, LuCI administrative logins, and VPS SSH account passwords remain strictly confidential and never appear in git commits or markdown files.',
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    },
    {
      title: 'API Tokens',
      rule: 'Never publish',
      emoji: '☁️',
      desc: 'Cloudflare API keys, Dynamic DNS update tokens, and cloud account credentials are sanitized and replaced with [REDACTED] in all public repositories and documentation.',
      color: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    },
    {
      title: 'Exposed Ports',
      rule: 'Only required services',
      emoji: '🌐',
      desc: 'Only essential sockets (TCP 853 for DoT, TCP 8443 for HTTPS Web UI) are forwarded across the tunnel. Standard unencrypted DNS (port 53) is bound strictly to local LAN.',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
    {
      title: 'Firewall',
      rule: 'Restrict unnecessary traffic',
      emoji: '🛡️',
      desc: 'Default-drop policy on all ingress zones. Stateful conntrack tracking and specific iptables PREROUTING DNAT rules reject any unsolicited connection attempts.',
      color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    },
    {
      title: 'TLS',
      rule: 'Use valid certificates',
      emoji: '🔒',
      desc: 'All external communications require valid Let\'s Encrypt certificates chaining to ISRG Root X1. Self-signed or expired certificates are rejected by Android Private DNS.',
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
            <span>Security Center & Defensive Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Security Center
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed font-sans">
            Rigorous cryptographic hygiene, least-privilege firewalling, and strict protection of secrets across the UN1CA JioWrt environment.
          </p>
        </div>

        {/* Visible Warning Banner (User explicit requirement) */}
        <div className="p-5 sm:p-6 rounded-2xl border-2 border-rose-500/50 bg-rose-950/30 shadow-xl shadow-rose-950/20 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-white font-mono uppercase tracking-wide">
              Mandatory Security Posture:
            </h3>
            <p className="text-base font-mono text-rose-200 font-bold leading-relaxed">
              "Never publish secrets in public documentation."
            </p>
            <p className="text-xs text-lab-textMuted font-sans pt-1">
              Never copy private keys, passwords or API tokens into public documentation. All configurations, logs, and shell snippets on this website have been screened and sanitized.
            </p>
          </div>
        </div>

        {/* 6 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-lab-border space-y-3 flex flex-col justify-between hover:border-sky-500/30 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl select-none" role="img" aria-label={pillar.title}>
                      {pillar.emoji}
                    </span>
                    <h4 className="text-sm font-bold text-white font-mono">
                      {pillar.title}
                    </h4>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider font-bold ${pillar.color}`}>
                    {pillar.rule}
                  </span>
                </div>
                <p className="text-xs text-lab-textMuted leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
