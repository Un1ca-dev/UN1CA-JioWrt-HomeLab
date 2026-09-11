import React from 'react';
import { troubleshootingData } from '../data/troubleshootingData';
import { TroubleshootingTable } from '../components/troubleshooting/TroubleshootingTable';
import { AlertCircle, Wrench, ShieldAlert } from 'lucide-react';

export const TroubleshootingSection: React.FC = () => {
  return (
    <section id="troubleshooting" className="py-20 sm:py-28 border-t border-lab-borderSubtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Wrench className="w-3.5 h-3.5" />
            <span>Field Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Troubleshooting & Diagnostic Playbook
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed">
            Every homelab experiences failures. Here are the exact symptoms, root causes, and terminal diagnostic commands used to resolve each issue encountered during the UN1CA JioWrt project.
          </p>
        </div>

        {/* Troubleshooting Table Component */}
        <TroubleshootingTable items={troubleshootingData} />
      </div>
    </section>
  );
};
