import React, { useState } from 'react';
import {
  Smartphone,
  Server,
  Cpu,
  Shield,
  Cloud,
  Globe,
  ArrowDown,
  ArrowRight,
  Radio,
  Lock,
  Zap,
  Info,
  Layers,
} from 'lucide-react';
import { architectureNodes } from '../../data/architectureData';

export const ArchitectureDiagram: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('android-client');
  const [activeTunnelView, setActiveTunnelView] = useState<'all' | 'oracle' | 'warp'>('all');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  const selectedNode = architectureNodes.find((n) => n.id === selectedNodeId) || architectureNodes[0];

  return (
    <div className="space-y-6">
      {/* Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-lab-border">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Tunnel Focus:
          </span>
          <div className="flex items-center gap-1 bg-lab-surfaceElevated p-1 rounded-xl border border-lab-border text-xs font-mono">
            <button
              onClick={() => setActiveTunnelView('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTunnelView === 'all'
                  ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30'
                  : 'text-lab-textMuted hover:text-white'
              }`}
            >
              Unified Architecture
            </button>
            <button
              onClick={() => setActiveTunnelView('oracle')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTunnelView === 'oracle'
                  ? 'bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30'
                  : 'text-lab-textMuted hover:text-white'
              }`}
            >
              wg_oracle (CGNAT Ingress)
            </button>
            <button
              onClick={() => setActiveTunnelView('warp')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTunnelView === 'warp'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-lab-textMuted hover:text-white'
              }`}
            >
              wg_vpn (Cloudflare Egress)
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsSimulating(!isSimulating)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-colors ${
            isSimulating
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-lab-surfaceElevated text-lab-textMuted border-lab-border'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 ${isSimulating ? 'text-emerald-400' : ''}`} />
          <span>{isSimulating ? 'Packet Flow Active' : 'Flow Paused'}</span>
        </button>
      </div>

      {/* Main Diagram Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Graph Area (Col 1 to 8) */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border border-lab-border relative overflow-hidden bg-grid-pattern">
          {/* Subtle background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center gap-6 relative z-10">
            {/* 1. Android / Mobile Network */}
            <div
              onClick={() => setSelectedNodeId('android-client')}
              className={`w-full max-w-md p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                selectedNodeId === 'android-client'
                  ? 'bg-sky-950/30 border-sky-400 box-glow'
                  : 'bg-lab-surfaceElevated/90 border-lab-border hover:border-sky-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-white">Android / Mobile Client</div>
                    <div className="text-[11px] font-mono text-purple-300">Private DNS: un1ca.dpdns.org</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  TCP 853
                </span>
              </div>
            </div>

            {/* Ingress Link 1 */}
            <div className="flex flex-col items-center gap-1 text-xs font-mono text-lab-textMuted">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-lab-surface border border-lab-borderSubtle">
                <Lock className="w-3 h-3 text-sky-400" />
                <span>DNS-over-TLS (Strict SNI un1ca.dpdns.org:853)</span>
              </div>
              <div className="h-6 w-0.5 bg-gradient-to-b from-purple-500 via-sky-400 to-sky-500 relative">
                {isSimulating && (
                  <span className="w-2 h-2 rounded-full bg-sky-400 absolute -left-[3px] animate-ping" />
                )}
              </div>
              <ArrowDown className="w-4 h-4 text-sky-400" />
            </div>

            {/* 2. Oracle Ubuntu VPS */}
            <div
              onClick={() => setSelectedNodeId('oracle-vps')}
              className={`w-full max-w-md p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                selectedNodeId === 'oracle-vps'
                  ? 'bg-sky-950/30 border-sky-400 box-glow'
                  : 'bg-lab-surfaceElevated/90 border-lab-border hover:border-sky-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-white">Oracle Ubuntu VPS</div>
                    <div className="text-[11px] font-mono text-blue-300">Public IP • ens3: 10.0.0.90 • wg0: 10.200.0.1</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    DNAT :853
                  </span>
                </div>
              </div>
            </div>

            {/* Ingress Link 2 (WireGuard wg_oracle CGNAT Tunnel) */}
            <div className="flex flex-col items-center gap-1 text-xs font-mono text-lab-textMuted w-full max-w-md">
              <div className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-[11px]">
                <div className="flex items-center gap-1.5 text-blue-300 font-bold">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-blue-400" />
                  <span>wg_oracle WireGuard Tunnel (10.200.0.0/24)</span>
                </div>
                <span className="text-emerald-400 font-semibold">CGNAT Bypassed</span>
              </div>
              <div className="h-6 w-0.5 bg-gradient-to-b from-blue-500 to-sky-400 relative">
                {isSimulating && (
                  <span className="w-2 h-2 rounded-full bg-blue-400 absolute -left-[3px] animate-ping" />
                )}
              </div>
              <ArrowDown className="w-4 h-4 text-sky-400" />
            </div>

            {/* 3. Core Gateway: JioWrt */}
            <div
              onClick={() => setSelectedNodeId('jiowrt-gateway')}
              className={`w-full max-w-lg p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                selectedNodeId === 'jiowrt-gateway'
                  ? 'bg-sky-950/40 border-sky-400 box-glow'
                  : 'bg-lab-surfaceElevated/90 border-lab-border hover:border-sky-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-mono font-bold text-white">UN1CA JioWrt Gateway</div>
                    <div className="text-xs font-mono text-sky-300">OpenWrt 23.05 • 192.168.1.1</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Home Core
                </span>
              </div>

              {/* Sub-interfaces Badge Row */}
              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono pt-2 border-t border-lab-borderSubtle">
                <div className="bg-black/40 p-1.5 rounded text-center border border-lab-borderSubtle">
                  <span className="text-lab-textDim block">LAN / Wi-Fi</span>
                  <span className="text-lab-text font-semibold">192.168.1.1</span>
                </div>
                <div className="bg-blue-500/10 p-1.5 rounded text-center border border-blue-500/20">
                  <span className="text-blue-300 block">wg_oracle</span>
                  <span className="text-white font-semibold">10.200.0.2</span>
                </div>
                <div className="bg-amber-500/10 p-1.5 rounded text-center border border-amber-500/20">
                  <span className="text-amber-300 block">wg_vpn</span>
                  <span className="text-white font-semibold">WARP Egress</span>
                </div>
              </div>
            </div>

            {/* Split row: AdGuard Home & Cloudflare WARP Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
              {/* 4. AdGuard Home */}
              <div
                onClick={() => setSelectedNodeId('adguard-home')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  selectedNodeId === 'adguard-home'
                    ? 'bg-emerald-950/30 border-emerald-400 box-glow-emerald'
                    : 'bg-lab-surfaceElevated/90 border-lab-border hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-white">AdGuard Home</div>
                    <div className="text-[10px] font-mono text-emerald-300">Port 53 / 853 / 8443</div>
                  </div>
                </div>
                <div className="text-[11px] text-lab-textMuted font-mono">
                  Let's Encrypt TLS • Ad & Telemetry Filter
                </div>
              </div>

              {/* 5. Cloudflare WARP (Separate Egress Tunnel wg_vpn) */}
              <div
                onClick={() => setSelectedNodeId('cloudflare-warp')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  selectedNodeId === 'cloudflare-warp'
                    ? 'bg-amber-950/30 border-amber-400 box-glow'
                    : 'bg-lab-surfaceElevated/90 border-lab-border hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Cloud className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-white">Cloudflare WARP</div>
                    <div className="text-[10px] font-mono text-amber-300">wg_vpn • 162.159.192.1</div>
                  </div>
                </div>
                <div className="text-[11px] text-lab-textMuted font-mono">
                  Separate Egress VPN • ISP Privacy
                </div>
              </div>
            </div>

            {/* Downward to Upstream Internet */}
            <div className="flex flex-col items-center gap-1 text-xs font-mono text-lab-textMuted">
              <ArrowDown className="w-4 h-4 text-emerald-400" />
              <div
                onClick={() => setSelectedNodeId('upstream-dns')}
                className={`px-5 py-2 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  selectedNodeId === 'upstream-dns'
                    ? 'bg-sky-950/30 border-sky-400'
                    : 'bg-lab-surfaceElevated border-lab-border hover:border-sky-400/40'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-mono text-white">
                  <Globe className="w-4 h-4 text-sky-400" />
                  <span>Clean Filtered Internet & Upstream DNS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Separation Notice Banner inside Canvas */}
          <div className="mt-8 p-3 rounded-xl bg-lab-surface border border-lab-borderSubtle text-[11px] font-mono text-lab-textDim flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              <span>
                <strong className="text-sky-300">wg_oracle</strong> = VPS Ingress / CGNAT Traversal
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>
                <strong className="text-amber-300">wg_vpn</strong> = Cloudflare WARP Egress Tunnel
              </span>
            </div>
          </div>
        </div>

        {/* Node Inspector Panel (Col 9 to 12) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-lab-border flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-lab-borderSubtle pb-3">
              <div className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                <span>Node Inspector</span>
              </div>
              <span className="text-[10px] font-mono bg-lab-surface px-2 py-0.5 rounded text-lab-textDim border border-lab-borderSubtle">
                Click any component
              </span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white font-mono">{selectedNode.name}</h4>
              <p className="text-xs text-lab-textMuted font-mono mt-0.5">{selectedNode.subtitle}</p>
            </div>

            <div className="bg-black/50 p-3 rounded-xl border border-lab-borderSubtle font-mono text-xs">
              <div className="text-lab-textDim text-[10px] uppercase">IP / Hostname Address</div>
              <div className="text-sky-300 font-semibold mt-0.5 break-all">{selectedNode.ipOrHost}</div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-lab-text uppercase tracking-wider">
                Listening Ports / Protocols
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.ports.map((port, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded bg-lab-surfaceElevated border border-lab-border text-[11px] font-mono text-emerald-400 font-medium"
                  >
                    {port}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-lab-text uppercase tracking-wider">
                Architectural Role & Function
              </div>
              <ul className="space-y-2 text-xs text-lab-textMuted leading-relaxed">
                {selectedNode.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold font-mono">›</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-lab-borderSubtle text-[11px] font-mono text-lab-textDim">
            Active in current mesh topology. Encrypted with ChaCha20-Poly1305 / TLS 1.3.
          </div>
        </div>
      </div>
    </div>
  );
};
