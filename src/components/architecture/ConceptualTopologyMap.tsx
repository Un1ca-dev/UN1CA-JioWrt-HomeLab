import React, { useState } from 'react';
import {
  Server,
  Radio,
  Cpu,
  ShieldCheck,
  Network,
  Cloud,
  Lock,
  ArrowDown,
  Info,
  CheckCircle2,
  Globe,
} from 'lucide-react';

interface ComponentDetail {
  id: string;
  name: string;
  badge: string;
  role: string;
  ipOrPort: string;
  description: string;
  keyDetails: string[];
}

const componentDetails: Record<string, ComponentDetail> = {
  vps: {
    id: 'vps',
    name: 'PUBLIC VPS (Oracle Cloud)',
    badge: 'Public Endpoint',
    role: 'Public networking endpoint & CGNAT Ingress Anchor',
    ipOrPort: 'Public IP: 140.238.244.202 | WireGuard: 10.200.0.1/24',
    description:
      'An Always Free Oracle Cloud Ubuntu 20.04 LTS instance providing a static, reachable IPv4 address on the open internet to receive incoming traffic and relay it into the WireGuard tunnel.',
    keyDetails: [
      'Operating System: Ubuntu 20.04 LTS',
      'WireGuard Server interface: wg0 (10.200.0.1/24, UDP port 51820)',
      'Kernel packet forwarding: net.ipv4.ip_forward = 1',
      'iptables PREROUTING DNAT forwarding TCP port 853 into 10.200.0.2:853',
      'iptables POSTROUTING MASQUERADE ensuring symmetric return routing',
      'No private keys or credentials exposed',
    ],
  },
  wireguard: {
    id: 'wireguard',
    name: 'WireGuard Tunnel',
    badge: 'Secure Tunnel',
    role: 'Encrypted Point-to-Point Overlay Network',
    ipOrPort: 'Subnet: 10.200.0.0/24 | Listen Port: UDP 51820',
    description:
      'High-speed kernel-level encrypted tunnel establishing an outbound persistent connection from the home router behind CGNAT to the public VPS.',
    keyDetails: [
      'VPS Peer IP: 10.200.0.1 / JioWrt Peer IP: 10.200.0.2',
      'PersistentKeepalive: 25 seconds (keeps carrier NAT pinhole permanently open)',
      'Modern ChaCha20-Poly1305 cryptographic transport in Linux kernel',
      'AllowedIPs: 10.200.0.0/24 for bidirectional overlay communication',
      'Cryptographic isolation with zero secrets published',
    ],
  },
  jiowrt: {
    id: 'jiowrt',
    name: 'JioWrt Router',
    badge: 'Gateway & Controller',
    role: 'Home router / Home Lab gateway',
    ipOrPort: 'Tunnel: 10.200.0.2 | LAN: 192.168.1.1 | Wi-Fi: 192.168.10.1',
    description:
      'Consumer Jio router unlocked and flashed with OpenWrt embedded Linux, serving as the master controller, local DHCP coordinator, firewall, and host for AdGuard Home.',
    keyDetails: [
      'Firmware: OpenWrt Linux kernel with root SSH access',
      'LAN Interface (br-lan): 192.168.1.1/24',
      'Wi-Fi AP Interface (phy1-ap1): 192.168.10.1/24',
      'WAN Interface (behind CGNAT): Carrier IP 10.103.50.2',
      'OpenWrt UCI firewall rules allowing DoT and HTTPS forwarding',
      'Hosts AdGuard Home v0.107.78 directly on local storage',
    ],
  },
  adguard: {
    id: 'adguard',
    name: 'AdGuard Home',
    badge: 'DNS Engine',
    role: 'DNS filtering & Security Engine',
    ipOrPort: 'DNS: 53 (TCP/UDP) | DoT: 853 (TCP) | HTTPS: 8443 (TCP)',
    description:
      'Autonomous DNS resolution daemon running natively on the JioWrt router. Intercepts local and remote queries, enforces ad and telemetry blocklists, and serves DNS-over-TLS.',
    keyDetails: [
      'Version: v0.107.78 running on embedded OpenWrt',
      'Standard DNS (Port 53): Local network query resolution and caching',
      'DNS-over-TLS (Port 853): Encrypted private DNS with Let\'s Encrypt TLS',
      'Web Dashboard (Port 8443): Secure HTTPS administrative control',
      'Upstream DNS: Encrypted DoH / Cloudflare resolvers',
    ],
  },
  lan: {
    id: 'lan',
    name: 'Local LAN Clients',
    badge: 'Internal Network',
    role: 'Home workstations, IoT devices, and local clients',
    ipOrPort: 'Subnet: 192.168.1.0/24 & 192.168.10.0/24',
    description:
      'Wired Ethernet workstations, home lab servers, and wireless devices connected to the JioWrt router receiving DHCP and ad-filtered DNS locally.',
    keyDetails: [
      'LAN Subnet: 192.168.1.0/24 (Ethernet clients & lab gear)',
      'Wi-Fi Subnet: 192.168.10.0/24 (Smartphones & IoT devices)',
      'dnsmasq remapped to port 5353 for DHCP lease coordination',
      'Split-Horizon DNS: un1ca.dpdns.org resolves locally to 192.168.1.1 in < 1ms',
    ],
  },
  cloudflare: {
    id: 'cloudflare',
    name: 'Cloudflare',
    badge: 'Edge & CDN',
    role: 'Domain / DNS / website infrastructure',
    ipOrPort: 'Host: un1ca.qzz.io | CDN Edge',
    description:
      'Global authoritative DNS resolution, TLS edge termination, and high-performance Jamstack hosting for the UN1CA JioWrt documentation website.',
    keyDetails: [
      'Hosts un1ca-jiowrt.pages.dev and un1ca.qzz.io via Cloudflare Pages',
      'Edge CDN distribution across 300+ worldwide data centers',
      'DNS CNAME flattening and automatic SSL certificate generation',
      'Zero hosting cost and 100% SLA uptime',
    ],
  },
  letsencrypt: {
    id: 'letsencrypt',
    name: 'Let\'s Encrypt',
    badge: 'Certificate Authority',
    role: 'Publicly Trusted TLS Certificate',
    ipOrPort: 'Host: un1ca.dpdns.org | Port 853 TLS',
    description:
      'Automated X.509 certificate authority providing full-chain certificate verification recognized by Android Private DNS and standard mobile operating systems.',
    keyDetails: [
      'Domain: un1ca.dpdns.org with ISRG Root X1 trust chain',
      'Verified with OpenSSL: "Verify return code: 0 (ok)"',
      'Matching modulus parity between router-cert.pem and router-key.pem',
      'Private key strictly protected with chmod 600',
    ],
  },
};

export const ConceptualTopologyMap: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string>('vps');
  const activeComponent = componentDetails[selectedComponentId] || componentDetails.vps;

  return (
    <div className="space-y-6">
      {/* Topology Header */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-sky-500/30 bg-gradient-to-br from-[#0c1322] via-[#080d18] to-[#04070d]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-lab-borderSubtle pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-300 border border-sky-500/20 mb-2">
              <Network className="w-3.5 h-3.5" />
              <span>Interactive Conceptual Topology</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
              UN1CA JioWrt Network Topology
            </h3>
            <p className="text-xs sm:text-sm text-lab-textMuted font-sans">
              Click any node in the topology diagram below to inspect its role, port allocations, and routing mechanics.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl self-start md:self-auto">
            <CheckCircle2 className="w-4 h-4" />
            <span>Interactive Node Inspector Active</span>
          </div>
        </div>

        {/* Main 2-Column Inspector: Interactive Diagram on Left, Detail Panel on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
          {/* Conceptual Tree Column (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-center space-y-3">
            {/* 1. Internet / Clients */}
            <div className="w-full max-w-md p-3.5 rounded-2xl bg-black/50 border border-lab-border text-center shadow-lg">
              <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>INTERNET / Remote Mobile Clients</span>
              </div>
              <p className="text-[11px] text-lab-textDim font-mono mt-0.5">
                Android 4G/5G Clients requesting <code className="text-sky-300">un1ca.dpdns.org:853</code>
              </p>
            </div>

            {/* Down Arrow */}
            <div className="flex flex-col items-center text-sky-400">
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>

            {/* 2. Public VPS Node */}
            <button
              type="button"
              onClick={() => setSelectedComponentId('vps')}
              className={`w-full max-w-md p-4 rounded-2xl border text-left transition-all group ${
                selectedComponentId === 'vps'
                  ? 'bg-sky-950/40 border-sky-400 ring-2 ring-sky-400/20 shadow-lg shadow-sky-950/50'
                  : 'bg-lab-surfaceElevated border-lab-border hover:border-sky-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold font-mono text-white flex items-center gap-2">
                      <span>PUBLIC VPS</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        140.238.244.202
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-lab-textMuted">
                      Ubuntu 20.04 LTS • iptables DNAT • WireGuard 51820
                    </div>
                  </div>
                </div>
                <Info className="w-4 h-4 text-lab-textDim group-hover:text-sky-300" />
              </div>
            </button>

            {/* Down Arrow with WireGuard label */}
            <div className="flex flex-col items-center text-purple-400">
              <span className="text-[10px] font-mono font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                WireGuard 10.200.0.0/24 (UDP 51820)
              </span>
              <ArrowDown className="w-4 h-4 mt-1" />
            </div>

            {/* 3. WireGuard Tunnel Node (Quick Select) */}
            <button
              type="button"
              onClick={() => setSelectedComponentId('wireguard')}
              className={`w-full max-w-md p-3.5 rounded-2xl border text-left transition-all group ${
                selectedComponentId === 'wireguard'
                  ? 'bg-purple-950/40 border-purple-400 ring-2 ring-purple-400/20 shadow-lg'
                  : 'bg-lab-surfaceElevated border-lab-border hover:border-purple-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold font-mono text-white">
                      WireGuard Overlay Tunnel
                    </div>
                    <div className="text-[11px] font-mono text-lab-textMuted">
                      PersistentKeepalive=25 • ChaCha20-Poly1305
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  CGNAT Bypass
                </span>
              </div>
            </button>

            {/* Down Arrow */}
            <div className="flex flex-col items-center text-sky-400">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* 4. JioWrt Router Node */}
            <button
              type="button"
              onClick={() => setSelectedComponentId('jiowrt')}
              className={`w-full max-w-md p-4 rounded-2xl border text-left transition-all group ${
                selectedComponentId === 'jiowrt'
                  ? 'bg-sky-950/40 border-sky-400 ring-2 ring-sky-400/20 shadow-lg shadow-sky-950/50'
                  : 'bg-lab-surfaceElevated border-lab-border hover:border-sky-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold font-mono text-white flex items-center gap-2">
                      <span>JioWrt Router</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                        10.200.0.2
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-lab-textMuted">
                      OpenWrt Kernel • LAN 192.168.1.1 • Wi-Fi 192.168.10.1
                    </div>
                  </div>
                </div>
                <Info className="w-4 h-4 text-lab-textDim group-hover:text-sky-300" />
              </div>
            </button>

            {/* Fork Split to AdGuard Home and LAN */}
            <div className="w-full max-w-md grid grid-cols-2 gap-3 pt-2">
              {/* 5A. AdGuard Home */}
              <button
                type="button"
                onClick={() => setSelectedComponentId('adguard')}
                className={`p-4 rounded-2xl border text-left transition-all group ${
                  selectedComponentId === 'adguard'
                    ? 'bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-400/20 shadow-lg'
                    : 'bg-lab-surfaceElevated border-lab-border hover:border-emerald-500/40'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold font-mono text-white">
                  AdGuard Home
                </div>
                <div className="text-[10px] font-mono text-emerald-300 space-y-0.5 mt-1">
                  <div>DNS :53</div>
                  <div>DoT :853</div>
                  <div>HTTPS :8443</div>
                </div>
              </button>

              {/* 5B. LAN Subnet */}
              <button
                type="button"
                onClick={() => setSelectedComponentId('lan')}
                className={`p-4 rounded-2xl border text-left transition-all group ${
                  selectedComponentId === 'lan'
                    ? 'bg-indigo-950/40 border-indigo-400 ring-2 ring-indigo-400/20 shadow-lg'
                    : 'bg-lab-surfaceElevated border-lab-border hover:border-indigo-500/40'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-2">
                  <Network className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold font-mono text-white">
                  LAN Subnet
                </div>
                <div className="text-[10px] font-mono text-indigo-300 space-y-0.5 mt-1">
                  <div>192.168.1.0/24</div>
                  <div>Wi-Fi 192.168.10.0/24</div>
                  <div>DHCP :5353</div>
                </div>
              </button>
            </div>

            {/* Cloud & Crypto Peers (Cloudflare & Let's Encrypt) */}
            <div className="w-full max-w-md grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedComponentId('cloudflare')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2 ${
                  selectedComponentId === 'cloudflare'
                    ? 'bg-orange-950/40 border-orange-400 ring-1 ring-orange-400/30'
                    : 'bg-black/30 border-lab-borderSubtle hover:border-orange-500/40'
                }`}
              >
                <Cloud className="w-4 h-4 text-orange-400 shrink-0" />
                <div className="truncate">
                  <div className="text-[11px] font-bold font-mono text-white">Cloudflare</div>
                  <div className="text-[10px] font-mono text-lab-textDim truncate">un1ca.qzz.io</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedComponentId('letsencrypt')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2 ${
                  selectedComponentId === 'letsencrypt'
                    ? 'bg-teal-950/40 border-teal-400 ring-1 ring-teal-400/30'
                    : 'bg-black/30 border-lab-borderSubtle hover:border-teal-500/40'
                }`}
              >
                <Lock className="w-4 h-4 text-teal-400 shrink-0" />
                <div className="truncate">
                  <div className="text-[11px] font-bold font-mono text-white">Let's Encrypt</div>
                  <div className="text-[10px] font-mono text-lab-textDim truncate">TLS Cert :853</div>
                </div>
              </button>
            </div>
          </div>

          {/* Component Information Panel (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-5 sm:p-6 rounded-2xl border border-lab-border bg-[#070b12] space-y-4">
            <div className="space-y-4">
              {/* Active Node Header */}
              <div className="flex items-start justify-between gap-2 border-b border-lab-borderSubtle pb-3">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase tracking-wider font-bold">
                    {activeComponent.badge}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white font-mono mt-1.5">
                    {activeComponent.name}
                  </h4>
                  <p className="text-xs text-sky-300 font-mono">
                    {activeComponent.role}
                  </p>
                </div>
              </div>

              {/* Technical Addressing */}
              <div className="bg-black/50 p-3 rounded-xl border border-lab-borderSubtle">
                <span className="text-[10px] font-mono uppercase text-lab-textDim block">
                  Addressing & Allocations
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {activeComponent.ipOrPort}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-lab-text leading-relaxed font-sans">
                {activeComponent.description}
              </p>

              {/* Key Technical Details List */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider block">
                  Operational Parameters:
                </span>
                <ul className="space-y-1.5 text-[11px] font-mono text-lab-textMuted">
                  {activeComponent.keyDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sky-400 mt-0.5 font-bold">›</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Defensive Hygiene Notice */}
            <div className="pt-3 border-t border-lab-borderSubtle flex items-center gap-2 text-[10px] font-mono text-lab-textDim">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Cryptographic hygiene verified: zero secrets or private keys exposed.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
