import React from 'react';
import { ConceptualTopologyMap } from '../components/architecture/ConceptualTopologyMap';
import { ArchitectureDiagram } from '../components/architecture/ArchitectureDiagram';
import { TunnelComparison } from '../components/architecture/TunnelComparison';
import { Network, Sparkles, ShieldCheck } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section id="architecture" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Network className="w-3.5 h-3.5" />
            <span>Interactive Infrastructure Map</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            The Hybrid Cloud-to-Edge Architecture
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed">
            By coupling an Always Free Oracle Cloud VPS with reverse WireGuard point-to-point tunneling, incoming DNS-over-TLS packets from mobile clients bypass the Jio ISP Carrier-Grade NAT (CGNAT) constraint seamlessly.
          </p>
        </div>

        {/* Conceptual Topology Map (Requirement 3 & 17) */}
        <ConceptualTopologyMap />

        {/* Interactive Architecture Diagram */}
        <ArchitectureDiagram />

        {/* Deep Tunnel Comparison (wg_oracle vs wg_vpn) */}
        <TunnelComparison />
      </div>
    </section>
  );
};
