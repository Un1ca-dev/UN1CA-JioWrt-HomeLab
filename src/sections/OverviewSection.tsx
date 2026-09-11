import React, { useState } from 'react';
import { labComponentsData, overviewArchitectureFlow, OverviewFlowStage } from '../data/componentsData';
import { ComponentCard } from '../components/overview/ComponentCard';
import {
  Layers,
  Network,
  Cpu,
  Terminal,
  Shield,
  Lock,
  Radio,
  Server,
  Cloud,
  Smartphone,
  ArrowRight,
  ArrowDown,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const flowIconMap: Record<string, React.FC<{ className?: string }>> = {
  Cpu,
  Terminal,
  Shield,
  Lock,
  Radio,
  Server,
  Cloud,
  Smartphone,
};

export const OverviewSection: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<OverviewFlowStage>(overviewArchitectureFlow[0]);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Core' | 'DNS' | 'Cloud' | 'Security'>('All');

  const filteredComponents = activeCategory === 'All'
    ? labComponentsData
    : labComponentsData.filter((c) => c.category === activeCategory);

  return (
    <section id="homelab" className="py-20 sm:py-28 border-t border-lab-borderSubtle bg-lab-surface/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Network className="w-3.5 h-3.5" />
            <span>Home Lab Architecture Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            End-to-End Home Lab Flow
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed font-sans">
            How a consumer Jio router evolved into an interconnected self-hosted infrastructure spanning local hardware, kernel tunnels, cloud relays, and secure mobile endpoints.
          </p>
        </div>

        {/* 1. Visual Overview Flow (Interactive / Animated) */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-lab-border shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-lab-borderSubtle pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Architecture Progression Flow</span>
              </div>
              <p className="text-xs text-lab-textMuted font-mono mt-0.5">
                Click any stage in the chain to inspect its functional role and bindings
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>8-Node Integrated Pipeline</span>
            </div>
          </div>

          {/* Interactive Flow Chain: Horizontal on desktop, vertical on mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {overviewArchitectureFlow.map((stage, idx) => {
              const Icon = flowIconMap[stage.iconName] || Server;
              const isSelected = selectedStage.id === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage)}
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-sky-950/40 border-sky-400 shadow-lg shadow-sky-950/40'
                      : 'bg-black/30 border-lab-borderSubtle hover:border-lab-border hover:bg-lab-surfaceElevated'
                  }`}
                  type="button"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-extrabold text-sky-400">
                      0{stage.step}
                    </span>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${isSelected ? 'text-sky-300' : 'text-lab-textDim'}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-white font-mono leading-tight truncate">
                      {stage.name}
                    </div>
                    <div className="text-[10px] text-lab-textMuted font-mono truncate">
                      {stage.sub}
                    </div>
                  </div>

                  {idx < overviewArchitectureFlow.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-sky-500/40">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Live Inspected Stage Details */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-sky-500/20 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  Selected Node 0{selectedStage.step} • {selectedStage.badge}
                </span>
                <span className="text-xs font-mono text-white font-semibold">
                  {selectedStage.name}
                </span>
              </div>
              <p className="text-xs text-lab-text leading-relaxed font-sans">
                {selectedStage.description}
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <div className="bg-lab-surfaceElevated px-3.5 py-2 rounded-xl border border-lab-border text-xs font-mono text-sky-300">
                <span className="text-[10px] text-lab-textDim block uppercase">Binding / Address</span>
                <span className="font-bold">{selectedStage.portsOrIp}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Detailed Projects Section */}
        <div id="projects" className="space-y-8 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-lab-borderSubtle pb-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Layers className="w-3.5 h-3.5" />
                <span>Detailed Projects</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono">
                14 Functional Project Modules
              </h3>
              <p className="text-xs sm:text-sm text-lab-textMuted font-sans">
                Comprehensive cards detailing what each technology does, why it was implemented, and how it connects to the Home Lab.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-lab-surfaceElevated border border-lab-border text-xs font-mono">
              {(['All', 'Core', 'DNS', 'Cloud', 'Security'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeCategory === cat
                      ? 'bg-sky-500 text-slate-950 font-bold shadow'
                      : 'text-lab-textMuted hover:text-white'
                  }`}
                  type="button"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 14 Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredComponents.map((comp) => (
              <ComponentCard key={comp.id} component={comp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
