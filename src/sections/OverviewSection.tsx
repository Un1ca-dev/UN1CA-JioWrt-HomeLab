import React from 'react';
import { labComponentsData } from '../data/componentsData';
import { ComponentCard } from '../components/overview/ComponentCard';
import { Layers, ShieldCheck } from 'lucide-react';

export const OverviewSection: React.FC = () => {
  return (
    <section id="homelab" className="py-20 sm:py-28 border-t border-lab-borderSubtle bg-lab-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Layers className="w-3.5 h-3.5" />
            <span>Homelab Components Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Home Lab Ecosystem & Technical Roles
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed">
            Every layer in the stack was deliberately chosen to resolve specific challenges: from kernel routing and automated PKI certificate issuance to overlay tunneling and mobile DNS-over-TLS interception.
          </p>
        </div>

        {/* 10 Required Component Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {labComponentsData.map((comp) => (
            <ComponentCard key={comp.id} component={comp} />
          ))}
        </div>
      </div>
    </section>
  );
};
