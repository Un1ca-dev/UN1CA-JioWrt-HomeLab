import React, { useState } from 'react';
import { TimelineDay } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { CodeBlock } from '../common/CodeBlock';
import {
  AlertTriangle,
  CheckCircle2,
  Network,
  Terminal,
  Target,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

interface TimelineDayCardProps {
  day: TimelineDay;
  isExpandedDefault?: boolean;
}

export const TimelineDayCard: React.FC<TimelineDayCardProps> = ({
  day,
  isExpandedDefault = false,
}) => {
  const [expanded, setExpanded] = useState(isExpandedDefault);

  return (
    <div
      id={`day-${day.dayNumber}`}
      className={`glass-panel rounded-2xl border transition-all duration-300 relative overflow-hidden ${
        day.status === 'critical-fix'
          ? 'border-rose-500/40 shadow-lg shadow-rose-950/20'
          : day.status === 'verified'
          ? 'border-emerald-500/40 shadow-lg shadow-emerald-950/20'
          : 'border-lab-border hover:border-sky-500/30'
      }`}
    >
      {/* Top Banner Bar */}
      <div className="p-5 sm:p-6 cursor-pointer select-none" onClick={() => setExpanded(!expanded)}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Day Number Pill */}
            <div
              className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono font-bold shrink-0 border ${
                day.status === 'critical-fix'
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  : day.status === 'verified'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-lab-surfaceElevated text-sky-400 border-lab-border'
              }`}
            >
              <span className="text-[10px] text-lab-textMuted uppercase">Day</span>
              <span className="text-lg leading-none">{day.dayNumber}</span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <StatusBadge status={day.status} />
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-lab-surfaceElevated text-lab-textDim border border-lab-borderSubtle">
                  {day.badge}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-mono tracking-tight">
                {day.title}
              </h3>
              <p className="text-xs sm:text-sm text-lab-textMuted font-mono">
                {day.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <span className="text-xs font-mono text-sky-400 hidden md:inline">
              {expanded ? 'Collapse' : 'Inspect Commands'}
            </span>
            <button
              type="button"
              className="p-1.5 rounded-lg bg-lab-surfaceElevated border border-lab-border text-lab-textMuted hover:text-white"
              aria-label={expanded ? 'Collapse day details' : 'Expand day details'}
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Goal Preview */}
        <div className="mt-4 flex items-start gap-2 bg-lab-surface/60 p-3 rounded-xl border border-lab-borderSubtle text-xs">
          <Target className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white font-mono mr-1">Goal:</span>
            <span className="text-lab-textMuted">{day.goal}</span>
          </div>
        </div>
      </div>

      {/* Expanded Content Body */}
      {expanded && (
        <div className="px-5 pb-6 sm:px-6 space-y-6 border-t border-lab-borderSubtle pt-5">
          {/* Detailed Narrative */}
          <div className="text-sm text-lab-text leading-relaxed">
            {day.description}
          </div>

          {/* Subnet Mapping Table if present (Day 1) */}
          {day.networks && day.networks.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                <Network className="w-4 h-4" />
                <span>Segmented Subnets & Network Roles</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {day.networks.map((net, idx) => (
                  <div key={idx} className="bg-black/40 p-3 rounded-xl border border-lab-borderSubtle text-xs font-mono">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-lab-textMuted">{net.label}</span>
                      <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        {net.value}
                      </span>
                    </div>
                    {net.desc && <div className="text-[11px] text-lab-textDim">{net.desc}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Real-World Error Milestone Callout (Day 3 TLS failure) */}
          {day.errorLog && (
            <div className="rounded-xl border border-rose-500/40 bg-rose-950/20 p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Encountered Error Log (Milestone Failure)</span>
              </div>
              <div className="bg-black/70 p-3 rounded-lg border border-rose-500/30 text-rose-300 font-mono text-xs overflow-x-auto">
                {day.errorLog.raw}
              </div>
              <p className="text-xs text-rose-200/90 leading-relaxed">
                {day.errorLog.explanation}
              </p>
            </div>
          )}

          {/* Key Architectural Points */}
          {day.keyPoints && day.keyPoints.length > 0 && (
            <div className="bg-lab-surfaceElevated/40 p-4 rounded-xl border border-lab-borderSubtle space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-lab-text font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Architectural Takeaways</span>
              </div>
              <ul className="space-y-1.5 text-xs text-lab-textMuted">
                {day.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold font-mono">›</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Terminal Command Sequence */}
          {day.commands && day.commands.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                <span>Executed Commands & Verification ({day.commands.length})</span>
              </div>
              <div className="space-y-3">
                {day.commands.map((cmd, idx) => (
                  <CodeBlock
                    key={idx}
                    command={cmd.cmd}
                    lang={cmd.lang || 'bash'}
                    shellTitle={cmd.shellTitle || `Step ${idx + 1}`}
                    explanation={cmd.explanation}
                    why={cmd.why}
                    output={cmd.output}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Verification Hash / OpenSSL Output Box */}
          {day.verificationOutput && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Mathematical Proof & Verification</span>
              </div>
              <div className="bg-black/70 p-3 rounded-lg border border-emerald-500/30 text-emerald-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                {day.verificationOutput.output}
              </div>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                {day.verificationOutput.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
