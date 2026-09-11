import React, { useState } from 'react';
import { quickStatsData, homeLabMetrics } from '../data/statsData';
import { StatCard } from '../components/stats/StatCard';
import {
  Cpu,
  Server,
  Network,
  Shield,
  Globe,
  Cloud,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Cpu,
  Server,
  Network,
  Shield,
  Globe,
  Cloud,
};

export const StatsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'infrastructure' | 'ports'>('infrastructure');

  return (
    <section id="stats" className="py-14 sm:py-20 border-y border-lab-borderSubtle bg-lab-surface/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header with Tab Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-lab-borderSubtle">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Infrastructure Metrics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
              Home Lab At A Glance
            </h2>
            <p className="text-xs sm:text-sm text-lab-textMuted max-w-xl font-sans">
              Key operational components and network bindings running across the UN1CA JioWrt environment.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center p-1 rounded-xl bg-lab-surfaceElevated border border-lab-border text-xs font-mono">
            <button
              onClick={() => setActiveTab('infrastructure')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'infrastructure'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-lab-textMuted hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Overview Metrics</span>
            </button>
            <button
              onClick={() => setActiveTab('ports')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'ports'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-lab-textMuted hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Ports & Subnets</span>
            </button>
          </div>
        </div>

        {/* Tab 1: 6 Core Home Lab Stats */}
        {activeTab === 'infrastructure' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {homeLabMetrics.map((item, idx) => {
              const IconComp = iconMap[item.iconName] || Cpu;
              return (
                <div
                  key={idx}
                  className="glass-panel p-4 sm:p-5 rounded-2xl border border-lab-border hover:border-sky-400/40 transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                      Active
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight group-hover:text-sky-300 transition-colors">
                      {item.value}
                    </div>
                    <div className="text-xs font-bold text-white font-mono">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-sky-400 font-mono font-medium">
                      {item.sublabel}
                    </div>
                  </div>

                  <p className="text-[10px] text-lab-textDim mt-3 pt-2 border-t border-lab-borderSubtle leading-snug">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Core Active Ports & Topology Allocations */}
        {activeTab === 'ports' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {quickStatsData.map((stat, idx) => (
                <StatCard key={idx} stat={stat} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
