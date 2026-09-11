import React from 'react';
import { ShieldCheck, Lock, AlertOctagon, Key, FileCheck, EyeOff, ShieldAlert } from 'lucide-react';
import { CodeBlock } from '../components/common/CodeBlock';

export const SecuritySection: React.FC = () => {
  const securityRules = [
    {
      title: 'Private Key Permissions (chmod 600)',
      desc: 'Cryptographic private keys must only be readable and writable by the service owner. We enforce chmod 600 on /etc/adguardhome/router-key.pem and WireGuard private key files, preventing unprivileged processes from extracting key material.',
      icon: Lock,
      color: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    },
    {
      title: 'Public Certificate Permissions (chmod 644)',
      desc: 'Public X.509 certificates contain no secrets and need to be readable by cryptographic verification tools and user-space Daemons. chmod 644 is standard and secure for certificate chains.',
      icon: FileCheck,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
    {
      title: 'Zero-Secret Exposure in Git & Docs',
      desc: 'Never commit WireGuard private keys, ACME credentials, cloud API tokens, or root passwords to version control repositories. All configurations and terminal outputs on this site strictly use [REDACTED] placeholders.',
      icon: EyeOff,
      color: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    },
    {
      title: 'Principle of Least Privilege',
      desc: 'AdGuard Home executes under an unprivileged service account (adguardhome:adguardhome) rather than root. Firewall rules explicitly bind to exact ports and destination IPs with conntrack stateful inspection.',
      icon: ShieldCheck,
      color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    },
  ];

  return (
    <section id="security" className="py-20 sm:py-28 border-t border-lab-borderSubtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Operational Security & Hardening</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Security Posture & Defensive Design
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed">
            Running internet-facing infrastructure requires strict adherence to cryptographic hygiene, least-privilege access, and defensive firewall rules.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityRules.map((rule, idx) => {
            const Icon = rule.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-lab-border space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${rule.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white font-mono">
                      {rule.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-lab-textMuted leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Audit Terminal Example */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-2">
            <Key className="w-4 h-4" />
            <span>Permissions Hardening Audit</span>
          </div>
          <CodeBlock
            command={`# Enforce POSIX permissions on PKI assets
chmod 644 /etc/adguardhome/router-cert.pem
chmod 600 /etc/adguardhome/router-key.pem
chown adguardhome:adguardhome /etc/adguardhome/router-cert.pem /etc/adguardhome/router-key.pem

# Audit permissions state
ls -la /etc/adguardhome/router-*.pem`}
            lang="bash"
            shellTitle="OpenWrt Security Hardening"
            output={`-rw-r--r-- 1 adguardhome adguardhome 5642 Sep 04 11:20 router-cert.pem
-rw------- 1 adguardhome adguardhome 1704 Sep 04 11:20 router-key.pem`}
            explanation="Ensures root and adguardhome are the only entities capable of accessing the private key."
            why="If private keys are world-readable (e.g. 644 or 777), any compromised process or web server on the router can steal the TLS key and impersonate your DNS endpoint."
          />
        </div>
      </div>
    </section>
  );
};
