import React from 'react';
import { Radio, Cloud, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { architectureTunnels } from '../../data/architectureData';

export const TunnelComparison: React.FC = () => {
  const [oracleTunnel, warpTunnel] = architectureTunnels;

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-lab-border space-y-6">
      <div className="max-w-2xl">
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
          Dual-Tunnel Architecture
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white font-mono mt-2 tracking-tight">
          wg_oracle vs. wg_vpn: Two Completely Distinct Tunnels
        </h3>
        <p className="text-xs sm:text-sm text-lab-textMuted mt-1 leading-relaxed">
          A common networking pitfall in homelab documentation is conflating VPN tunnels. In UN1CA JioWrt, ingress traversal and egress privacy are handled by two physically independent WireGuard network interfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tunnel 1: wg_oracle */}
        <div className="bg-black/40 rounded-2xl p-6 border border-sky-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-mono">wg_oracle</h4>
                  <div className="text-xs font-mono text-sky-300">CGNAT Ingress Tunnel</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Inbound Relay
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono mb-4">
              <div className="flex justify-between p-2 rounded bg-lab-surfaceElevated/60 border border-lab-borderSubtle">
                <span className="text-lab-textDim">Endpoint:</span>
                <span className="text-white font-semibold">Oracle VPS Public IP:51820</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-lab-surfaceElevated/60 border border-lab-borderSubtle">
                <span className="text-lab-textDim">Subnet / IPs:</span>
                <span className="text-emerald-400 font-semibold">10.200.0.0/24 (JioWrt: .2, VPS: .1)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-lab-surfaceElevated/60 border border-lab-borderSubtle">
                <span className="text-lab-textDim">Direction:</span>
                <span className="text-sky-300 font-semibold">Inbound Cellular DoT Relay</span>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-lab-textMuted">
              {oracleTunnel.configSummary.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-lab-borderSubtle text-[11px] font-mono text-sky-300">
            Primary Mission: Pierces Jio 10.103.50.x CGNAT for remote mobile Android Private DNS.
          </div>
        </div>

        {/* Tunnel 2: wg_vpn */}
        <div className="bg-black/40 rounded-2xl p-6 border border-amber-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-mono">wg_vpn</h4>
                  <div className="text-xs font-mono text-amber-300">Cloudflare WARP Egress</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Outbound Privacy
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono mb-4">
              <div className="flex justify-between p-2 rounded bg-lab-surfaceElevated/60 border border-lab-borderSubtle">
                <span className="text-lab-textDim">Endpoint:</span>
                <span className="text-white font-semibold">162.159.192.1:2408 (Cloudflare Edge)</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-lab-surfaceElevated/60 border border-lab-borderSubtle">
                <span className="text-lab-textDim">Allowed IPs:</span>
                <span className="text-emerald-400 font-semibold">0.0.0.0/0, ::/0</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-lab-surfaceElevated/60 border border-lab-borderSubtle">
                <span className="text-lab-textDim">Direction:</span>
                <span className="text-amber-300 font-semibold">Outbound Internet Browsing</span>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-lab-textMuted">
              {warpTunnel.configSummary.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-lab-borderSubtle text-[11px] font-mono text-amber-300">
            Primary Mission: Shields home LAN web browsing from ISP surveillance and selective throttling.
          </div>
        </div>
      </div>
    </div>
  );
};
