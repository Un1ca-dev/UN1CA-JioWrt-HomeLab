import React, { useState } from 'react';
import { LabComponent } from '../../types';
import {
  Cpu,
  Shield,
  Key,
  Server,
  Layers,
  Compass,
  Smartphone,
  Cloud,
  Filter,
  Lock,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';

interface ComponentCardProps {
  component: LabComponent;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Cpu,
  Shield,
  Key,
  Server,
  Layers,
  Compass,
  Smartphone,
  Cloud,
  Filter,
  Lock,
};

export const ComponentCard: React.FC<ComponentCardProps> = ({ component }) => {
  const [expanded, setExpanded] = useState(false);
  const IconComponent = iconMap[component.iconName] || Server;

  const getAccent = () => {
    switch (component.accentColor) {
      case 'emerald':
        return {
          border: 'hover:border-emerald-500/40',
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          icon: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        };
      case 'purple':
        return {
          border: 'hover:border-purple-500/40',
          badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          icon: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
        };
      case 'amber':
        return {
          border: 'hover:border-amber-500/40',
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          icon: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        };
      case 'cyan':
      default:
        return {
          border: 'hover:border-sky-500/40',
          badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
          icon: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
        };
    }
  };

  const accent = getAccent();

  return (
    <div
      className={`glass-panel rounded-2xl p-6 border border-lab-border transition-all duration-200 ${accent.border} flex flex-col justify-between`}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${accent.icon}`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono tracking-tight">
                {component.name}
              </h3>
              <p className="text-xs text-lab-textMuted font-mono">
                {component.role}
              </p>
            </div>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${accent.badge}`}>
            {component.badge}
          </span>
        </div>

        {/* 3 Core Points Required: What it is, Why I used it, What role it plays */}
        <div className="space-y-3.5 text-xs text-lab-text leading-relaxed">
          {/* What it is */}
          <div className="bg-lab-surface/70 p-3 rounded-xl border border-lab-borderSubtle">
            <div className="text-[10px] font-mono uppercase tracking-wider text-lab-textMuted font-bold mb-1 flex items-center gap-1">
              <Info className="w-3 h-3 text-sky-400" />
              What It Is
            </div>
            <p className="text-lab-textMuted">{component.whatItIs}</p>
          </div>

          {/* Why I used it */}
          <div className="bg-lab-surface/70 p-3 rounded-xl border border-lab-borderSubtle">
            <div className="text-[10px] font-mono uppercase tracking-wider text-lab-textMuted font-bold mb-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Why I Used It
            </div>
            <p className="text-lab-textMuted">{component.whyUsed}</p>
          </div>

          {/* Role in Lab */}
          <div className="bg-lab-surface/70 p-3 rounded-xl border border-lab-borderSubtle">
            <div className="text-[10px] font-mono uppercase tracking-wider text-lab-textMuted font-bold mb-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              Role in Home Lab
            </div>
            <p className="text-lab-textMuted">{component.roleInLab}</p>
          </div>
        </div>
      </div>

      {/* Technical Specs Footer */}
      <div className="mt-5 pt-4 border-t border-lab-borderSubtle">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-xs font-mono text-lab-textMuted hover:text-white py-1"
          type="button"
        >
          <span>Technical Parameters ({component.specs.length})</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {expanded && (
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-mono">
            {component.specs.map((spec, idx) => (
              <div key={idx} className="bg-black/40 p-2 rounded-lg border border-lab-borderSubtle">
                <div className="text-lab-textDim text-[10px]">{spec.label}</div>
                <div className="text-sky-300 font-semibold truncate">{spec.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
