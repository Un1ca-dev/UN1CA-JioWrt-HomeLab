import React, { useState } from 'react';
import { cgnatCaseStudySteps } from '../data/cgnatCaseStudyData';
import {
  Compass,
  CheckCircle2,
  ChevronRight,
  Terminal,
  Server,
  ArrowDown,
  ArrowRight,
  Shield,
  AlertTriangle,
  Radio,
  Cpu,
  Smartphone,
  Network,
  Globe,
} from 'lucide-react';
import { CodeBlock } from '../components/common/CodeBlock';

export const CgnatCaseStudySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const currentStep = cgnatCaseStudySteps.find((s) => s.stepNumber === activeStep) || cgnatCaseStudySteps[0];

  const cgnatFlowStages = [
    {
      title: 'Mobile / ISP Network',
      sub: 'Client Queries (4G/5G)',
      desc: 'External smartphones and cellular clients send DNS-over-TLS (port 853) queries towards un1ca.dpdns.org.',
      icon: Smartphone,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
    {
      title: 'CGNAT Barrier',
      sub: 'ISP Carrier NAT (100.64.0.0/10)',
      desc: 'ISP strictly drops unsolicited inbound ports. Home router cannot be reached directly via public IPv4.',
      icon: AlertTriangle,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      title: 'JioWrt Gateway',
      sub: 'OpenWrt (10.200.0.2)',
      desc: 'Home router initiates outbound UDP tunnel to VPS with PersistentKeepalive=25 to keep ISP NAT state open.',
      icon: Cpu,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    },
    {
      title: 'WireGuard Tunnel',
      sub: 'Kernel Overlay (10.200.0.0/24)',
      desc: 'Encrypted bi-directional ChaCha20-Poly1305 channel carrying encapsulated TCP 853 / 8443 traffic.',
      icon: Radio,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      title: 'Public VPS Anchor',
      sub: 'Oracle Cloud (140.238.244.202)',
      desc: 'Publicly reachable static IP with iptables PREROUTING DNAT rules forwarding TCP 853/8443 into the tunnel.',
      icon: Server,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    },
    {
      title: 'Internet / Remote Clients',
      sub: 'Global Ad-Free DNS Access',
      desc: 'Any device anywhere in the world reaches the home lab AdGuard Home resolver transparently.',
      icon: Globe,
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
    },
  ];

  return (
    <section id="cgnat-case-study" className="py-20 sm:py-28 border-t border-lab-borderSubtle bg-lab-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Compass className="w-3.5 h-3.5" />
            <span>Dedicated Architectural Section</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
            CGNAT Traversal Architecture
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed font-sans">
            How the UN1CA JioWrt Home Lab exposes private DNS services behind carrier-grade NAT without paying for a static IP or port forwarding on the ISP router.
          </p>
        </div>

        {/* Dedicated Visual Flow: Mobile -> CGNAT -> JioWrt -> WireGuard Tunnel -> Public VPS -> Internet */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#120f0a] via-[#090b10] to-[#05070a] shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-lab-borderSubtle pb-4">
            <div>
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <Network className="w-4 h-4 text-amber-400" />
                <span>End-to-End CGNAT Traversal Chain</span>
              </h3>
              <p className="text-xs text-lab-textMuted font-mono mt-0.5">
                Outbound persistent tunnel orchestration from behind carrier network NAT
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified in Production</span>
            </div>
          </div>

          {/* Flow Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {cgnatFlowStages.map((stage, idx) => {
              const StageIcon = stage.icon;
              return (
                <div
                  key={idx}
                  className="bg-black/40 p-4 rounded-2xl border border-lab-borderSubtle flex flex-col justify-between space-y-3 relative group hover:border-amber-500/40 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${stage.color}`}>
                        <StageIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-lab-textDim">
                        Step 0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white font-mono leading-tight">
                        {stage.title}
                      </h4>
                      <div className="text-[10px] text-amber-300/80 font-mono mt-0.5">
                        {stage.sub}
                      </div>
                    </div>

                    <p className="text-[11px] text-lab-textMuted leading-relaxed font-sans">
                      {stage.desc}
                    </p>
                  </div>

                  {idx < cgnatFlowStages.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-amber-500/50">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Technical Accuracy Notice Box */}
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs font-sans space-y-1 text-amber-200/90 leading-relaxed">
            <div className="font-mono font-bold text-amber-400 flex items-center gap-1.5 uppercase text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Core Architectural Principle (No Router Port Forwarding)</span>
            </div>
            <p>
              The Oracle Cloud VPS provides a static, public reachable endpoint (<code className="text-white font-mono">140.238.244.202</code>) while the JioWrt router resides strictly behind CGNAT.
              <strong> CGNAT cannot be bypassed directly by port forwarding on the router</strong> because the ISP gateway discards unsolicited inbound connections. Instead, JioWrt initiates an outbound persistent WireGuard connection to the VPS, and the VPS uses <code className="text-white font-mono">iptables DNAT</code> to relay public traffic down the established tunnel.
            </p>
          </div>
        </div>

        {/* 15 Steps Interactive Case Study */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
              15-Step Implementation Journey
            </h3>
            <p className="text-xs sm:text-sm text-lab-textMuted font-sans">
              Step-by-step breakdown of commands, firewall parameters, and configuration files used to assemble this pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Steps Nav (Col 1 to 5) */}
            <div className="lg:col-span-5 glass-panel rounded-2xl p-3 border border-lab-border max-h-[680px] overflow-y-auto space-y-1">
              <div className="p-3 border-b border-lab-borderSubtle text-[11px] font-mono text-lab-textDim uppercase font-bold flex items-center justify-between">
                <span>Chronological Steps (1 to 15)</span>
                <span className="text-sky-400 font-bold">Step {activeStep} of 15</span>
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

              <div className="text-xs sm:text-sm text-lab-textMuted leading-relaxed space-y-3 bg-black/40 p-4 rounded-2xl border border-lab-borderSubtle font-sans">
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
                  type="button"
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
                  type="button"
                >
                  Next Step →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
