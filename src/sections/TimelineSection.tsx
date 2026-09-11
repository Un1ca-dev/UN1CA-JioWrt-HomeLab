import React, { useState } from 'react';
import { timelineDaysData, finalVerificationStatus } from '../data/timelineData';
import { TimelineDayCard } from '../components/timeline/TimelineDayCard';
import {
  Calendar,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Filter,
  Sparkles,
} from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const [activeDayFilter, setActiveDayFilter] = useState<string>('all');
  const [expandAll, setExpandAll] = useState(false);

  const filteredDays = activeDayFilter === 'all'
    ? timelineDaysData
    : activeDayFilter === 'milestones'
    ? timelineDaysData.filter((d) => d.status === 'critical-fix' || d.status === 'verified')
    : timelineDaysData.filter((d) => d.dayNumber.toString() === activeDayFilter);

  return (
    <section id="journey" className="py-20 sm:py-28 border-t border-lab-borderSubtle">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Calendar className="w-3.5 h-3.5" />
            <span>14-Day Engineering Log</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
            From Router to Private DNS Infrastructure
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed">
            A chronological engineering trajectory documenting every configuration step, unexpected failure, cryptographic roadblock, and mathematical verification.
          </p>
        </div>

        {/* Day Navigation & Filter Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-lab-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 text-xs font-mono">
            <button
              onClick={() => setActiveDayFilter('all')}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                activeDayFilter === 'all'
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                  : 'bg-lab-surfaceElevated text-lab-textMuted border-lab-border hover:text-white'
              }`}
            >
              All 14 Days
            </button>
            <button
              onClick={() => setActiveDayFilter('milestones')}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                activeDayFilter === 'milestones'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                  : 'bg-lab-surfaceElevated text-lab-textMuted border-lab-border hover:text-white'
              }`}
            >
              Key Milestones Only
            </button>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto text-xs font-mono text-lab-textMuted">
            <span>Showing {filteredDays.length} logs</span>
          </div>
        </div>

        {/* Timeline Cards */}
        <div className="space-y-6">
          {filteredDays.map((day, idx) => (
            <TimelineDayCard
              key={day.id}
              day={day}
              isExpandedDefault={expandAll || idx === 0 || day.status === 'critical-fix'}
            />
          ))}
        </div>

        {/* Final Result Card (Section 7: Final Result) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/40 bg-gradient-to-br from-emerald-950/20 via-black/40 to-black/60 shadow-2xl relative overflow-hidden">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Mission Accomplished
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-mono mt-0.5">
                  {finalVerificationStatus.title}
                </h3>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-lab-textMuted leading-relaxed mb-6 font-mono">
            {finalVerificationStatus.summary}
          </p>

          {/* Grid of verified checks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            {finalVerificationStatus.checks.map((check, idx) => (
              <div
                key={idx}
                className="bg-black/50 p-3.5 rounded-2xl border border-emerald-500/20 flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="text-lab-textDim text-[10px] uppercase font-bold">
                    {check.label}
                  </div>
                  <div className="text-emerald-300 font-bold text-sm mt-0.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{check.status}</span>
                  </div>
                </div>
                <p className="text-[11px] text-lab-textMuted leading-relaxed border-t border-lab-borderSubtle/60 pt-2">
                  {check.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
