import React, { useState } from 'react';
import { roadmapItems } from '../data/futureRoadmapData';
import { Sparkles, CheckCircle2, Clock, Filter, Layers, Server } from 'lucide-react';

export const FutureRoadmapSection: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const categories = ['ALL', 'Networking', 'Monitoring', 'Automation', 'Security', 'Cloud'];

  const filteredItems = roadmapItems.filter(
    (item) => filterCategory === 'ALL' || item.category === filterCategory
  );

  return (
    <section id="future-plans" className="py-20 sm:py-28 border-t border-lab-borderSubtle bg-lab-surface/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Evolution & Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Future Plans & Architecture Roadmap
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed">
            The UN1CA JioWrt project is continuously evolving. Below is the technical breakdown clearly distinguishing completed production features from planned future enhancements.
          </p>
        </div>

        {/* Completed vs Planned Highlights Matrix (Requirement 22) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Completed Features */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-emerald-500/30 bg-emerald-950/10 space-y-4">
            <div className="flex items-center justify-between border-b border-lab-borderSubtle pb-3">
              <div className="flex items-center gap-2 font-mono font-bold text-white text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Completed Baseline Features</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold uppercase">
                8 / 8 Production Ready
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
              {[
                { name: 'OpenWrt', sub: 'Custom firmware gateway' },
                { name: 'AdGuard Home', sub: 'DNS filtering engine' },
                { name: 'Private DNS', sub: 'Android DoT port 853' },
                { name: 'WireGuard', sub: 'Kernel overlay tunnel' },
                { name: 'VPS', sub: 'Public ingress endpoint' },
                { name: 'CGNAT architecture', sub: 'Reverse DNAT traversal' },
                { name: 'TLS', sub: 'Let\'s Encrypt verification' },
                { name: 'Cloudflare', sub: 'Pages & edge DNS' },
              ].map((item, idx) => (
                <div key={idx} className="bg-black/40 p-2.5 rounded-xl border border-emerald-500/20 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <div className="text-white font-bold text-[11px]">{item.name}</div>
                    <div className="text-lab-textDim text-[10px]">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Future Planned Features */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-purple-500/30 bg-purple-950/10 space-y-4">
            <div className="flex items-center justify-between border-b border-lab-borderSubtle pb-3">
              <div className="flex items-center gap-2 font-mono font-bold text-white text-sm">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Future Roadmap Milestones</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold uppercase">
                7 Planned
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
              {[
                { name: 'Certificate monitoring', sub: 'Automated expiry alerts' },
                { name: 'Service monitoring', sub: 'Uptime Kuma & status checks' },
                { name: 'Backup automation', sub: 'Encrypted S3 snapshots' },
                { name: 'More self-hosted services', sub: 'Internal homelab apps' },
                { name: 'IPv6 improvements', sub: 'Native IPv6 DoT routing' },
                { name: 'Automated deployment', sub: 'CI/CD pipeline hooks' },
                { name: 'Better observability', sub: 'Prometheus & Grafana' },
              ].map((item, idx) => (
                <div key={idx} className="bg-black/40 p-2.5 rounded-xl border border-purple-500/20 flex items-start gap-2">
                  <span className="text-purple-400 font-bold">○</span>
                  <div>
                    <div className="text-white font-bold text-[11px]">{item.name}</div>
                    <div className="text-lab-textDim text-[10px]">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              type="button"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-colors border ${
                filterCategory === cat
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold'
                  : 'bg-lab-surfaceElevated text-lab-textMuted border-lab-border hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Roadmap Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-5 rounded-2xl border border-lab-border flex flex-col justify-between hover:border-purple-500/30 transition-all space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lab-surface text-lab-textDim uppercase tracking-wider border border-lab-borderSubtle">
                    {item.category}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
                      item.status === 'configured'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {item.status === 'configured' ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Configured</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>Planned</span>
                      </>
                    )}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white font-mono">
                  {item.title}
                </h3>
                <p className="text-xs text-lab-textMuted mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-lab-borderSubtle text-[11px] font-mono text-lab-textDim bg-black/30 p-2.5 rounded-xl">
                <span className="text-purple-300 font-semibold block mb-0.5">Implementation Details:</span>
                <span className="text-lab-textMuted">{item.details}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
