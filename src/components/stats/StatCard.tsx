import React from 'react';
import { QuickStat } from '../../types';
import { Shield, Lock, Globe, Terminal, Cpu, Network } from 'lucide-react';

interface StatCardProps {
  stat: QuickStat;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Shield,
  Lock,
  Globe,
  Terminal,
  Cpu,
  Network,
};

export const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const IconComponent = iconMap[stat.iconName] || Terminal;

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-lab-border relative overflow-hidden group">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl group-hover:bg-sky-500/10 transition-colors pointer-events-none" />

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-lab-surfaceElevated border border-lab-border flex items-center justify-center text-sky-400 group-hover:border-sky-400/40 group-hover:scale-105 transition-all">
          <IconComponent className="w-5 h-5" />
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-lab-surface text-[10px] font-mono uppercase tracking-wider text-sky-400 border border-lab-borderSubtle">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{stat.protocol}</span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-xs font-mono text-lab-textMuted uppercase tracking-wider font-semibold">
          {stat.label}
        </div>
        <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight flex items-baseline gap-2">
          <span>{stat.value}</span>
          {stat.port && (
            <span className="text-xs font-normal text-lab-textDim font-sans">
              Port
            </span>
          )}
        </div>
      </div>

      <p className="mt-3 text-xs text-lab-textMuted leading-relaxed line-clamp-2">
        {stat.description}
      </p>
    </div>
  );
};
