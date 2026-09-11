import React from 'react';

interface StatusBadgeProps {
  status: 'online' | 'active' | 'forwarded' | 'completed' | 'critical-fix' | 'troubleshooting' | 'verified' | 'bypassed';
  text?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text, className = '' }) => {
  const getStyles = () => {
    switch (status) {
      case 'online':
      case 'completed':
      case 'verified':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          dot: 'bg-emerald-400',
          defaultText: status.toUpperCase(),
        };
      case 'active':
      case 'forwarded':
      case 'bypassed':
        return {
          bg: 'bg-sky-500/10 border-sky-500/30 text-sky-400',
          dot: 'bg-sky-400',
          defaultText: status.toUpperCase(),
        };
      case 'critical-fix':
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
          dot: 'bg-rose-400',
          defaultText: 'CRITICAL MILESTONE',
        };
      case 'troubleshooting':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          dot: 'bg-amber-400',
          defaultText: 'TROUBLESHOOTING',
        };
      default:
        return {
          bg: 'bg-lab-surfaceElevated border-lab-border text-lab-textMuted',
          dot: 'bg-lab-textMuted',
          defaultText: status,
        };
    }
  };

  const style = getStyles();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${style.bg} ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${style.dot} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${style.dot}`}></span>
      </span>
      <span>{text || style.defaultText}</span>
    </span>
  );
};
