import React from 'react';
import { quickStatsData } from '../data/statsData';
import { StatCard } from '../components/stats/StatCard';
import { Server, Activity } from 'lucide-react';

export const StatsSection: React.FC = () => {
  return (
    <section className="py-12 border-y border-lab-borderSubtle bg-lab-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              <span>Core Network Matrix</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
              Active Ports & Topology Allocations
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-lab-textMuted bg-lab-surfaceElevated px-3 py-1.5 rounded-xl border border-lab-borderSubtle">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>6/6 Endpoints Active & Verified</span>
          </div>
        </div>

        {/* 6 Core Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {quickStatsData.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};
