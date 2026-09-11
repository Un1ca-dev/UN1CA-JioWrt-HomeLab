import React, { useState } from 'react';
import { cgnatCaseStudySteps } from '../data/cgnatCaseStudyData';
import { Compass, CheckCircle2, ChevronRight, Terminal, Server, ArrowDown, Shield } from 'lucide-react';
import { CodeBlock } from '../components/common/CodeBlock';

export const CgnatCaseStudySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const currentStep = cgnatCaseStudySteps.find((s) => s.stepNumber === activeStep) || cgnatCaseStudySteps[0];

  return (
    <section id="cgnat-case-study" className="py-20 sm:py-28 border-t border-lab-borderSubtle bg-lab-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Compass className="w-3.5 h-3.5" />
            <span>Architectural Highlight & Case Study</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
            How I Exposed Private DNS Behind CGNAT
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed">
            A comprehensive 15-step breakdown of how a carrier-constrained home router (10.103.50.2) was transformed into a globally accessible DNS-over-TLS resolver without paying for an ISP static IP or port forwarding.
          </p>
        </div>

        {/* 15 Steps Horizontal/Vertical Interactive Browser */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Steps Nav (Col 1 to 5) */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-3 border border-lab-border max-h-[680px] overflow-y-auto space-y-1">
            <div className="p-3 border-b border-lab-borderSubtle text-[11px] font-mono text-lab-textDim uppercase font-bold flex items-center justify-between">
              <span>Chronological Steps (1 to 15)</span>
              <span className="text-sky-400">Step {activeStep} of 15</span>
            </div>

            {cgnatCaseStudySteps.map((step) => {
              const isSelected = activeStep === step.stepNumber;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStep(step.stepNumber)}
                  type="button"
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-500/40 text-white shadow-md'
                      : 'border-transparent hover:bg-lab-surfaceElevated text-lab-textMuted hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span
                      className={`w-6 h-6 rounded-lg text-center leading-6 text-xs font-mono font-bold shrink-0 border ${
                        isSelected
                          ? 'bg-sky-400 text-slate-950 border-sky-300'
                          : 'bg-lab-surface text-lab-textDim border-lab-borderSubtle'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-mono font-bold truncate">{step.title}</div>
                      <div className="text-[10px] text-lab-textDim font-mono truncate">{step.badge}</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-sky-400 translate-x-0.5' : 'text-lab-textDim'}`} />
                </button>
              );
            })}
          </div>

          {/* Active Step Deep Dive Card (Col 6 to 12) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-sky-500/30 bg-gradient-to-br from-[#0c121d] via-[#090d15] to-[#06080e] shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lab-borderSubtle pb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 font-mono font-bold flex items-center justify-center border border-sky-500/30 text-sm">
                  {currentStep.stepNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-sky-500/10 text-sky-300 border border-sky-500/20">
                  {currentStep.badge}
                </span>
              </div>
              {currentStep.shellType && (
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-lab-surfaceElevated text-emerald-400 border border-emerald-500/30 font-semibold">
                  Execute on: {currentStep.shellType}
                </span>
              )}
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                {currentStep.title}
              </h3>
              <p className="text-xs sm:text-sm text-sky-200/80 font-mono mt-1">
                {currentStep.summary}
              </p>
            </div>

            <div className="text-xs sm:text-sm text-lab-textMuted leading-relaxed space-y-3 bg-black/40 p-4 rounded-2xl border border-lab-borderSubtle">
              <p>{currentStep.details}</p>
            </div>

            {currentStep.commandSnippet && (
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Technical Execution ({currentStep.shellType})</span>
                </div>
                <CodeBlock
                  command={currentStep.commandSnippet}
                  lang="bash"
                  shellTitle={`${currentStep.shellType} Shell`}
                />
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-lab-borderSubtle text-xs font-mono">
              <button
                disabled={activeStep === 1}
                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 rounded-xl bg-lab-surfaceElevated text-lab-textMuted hover:text-white disabled:opacity-40 disabled:hover:text-lab-textMuted border border-lab-border"
              >
                ← Previous Step
              </button>
              <span className="text-lab-textDim">
                {activeStep} / 15
              </span>
              <button
                disabled={activeStep === 15}
                onClick={() => setActiveStep((prev) => Math.min(15, prev + 1))}
                className="px-4 py-2 rounded-xl bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-500/40 font-bold disabled:opacity-40"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
