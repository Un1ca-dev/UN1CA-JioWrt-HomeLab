import React, { useState } from 'react';
import { Lock, Radio, Compass, Smartphone, Cloud, Split, ShieldCheck, CheckCircle, Terminal } from 'lucide-react';
import { CodeBlock } from '../components/common/CodeBlock';

export const DeepDivesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tls' | 'wireguard' | 'cgnat' | 'private-dns' | 'warp' | 'split-dns'>('tls');

  const tabs = [
    { id: 'tls', label: 'TLS & PKI', icon: Lock },
    { id: 'wireguard', label: 'WireGuard Mesh', icon: Radio },
    { id: 'cgnat', label: 'CGNAT Traversal', icon: Compass },
    { id: 'private-dns', label: 'Android Private DNS', icon: Smartphone },
    { id: 'warp', label: 'Cloudflare WARP', icon: Cloud },
    { id: 'split-dns', label: 'Split-Horizon DNS', icon: Split },
  ];

  return (
    <section id="deep-dives" className="py-20 sm:py-28 border-t border-lab-borderSubtle bg-lab-surface/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Technical Deep Dives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Under-the-Hood Architectural Mechanics
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed">
            Detailed technical breakdowns of the protocols, cryptographic handshakes, and routing decisions powering the UN1CA JioWrt home lab.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-lab-borderSubtle">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                type="button"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold box-glow'
                    : 'bg-lab-surfaceElevated text-lab-textMuted border-lab-border hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-lab-border space-y-8">
          {activeTab === 'tls' && (
            <div className="space-y-6">
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
                  RFC 7858 & Public Key Infrastructure
                </span>
                <h3 className="text-2xl font-bold text-white font-mono">
                  Strict Certificate Validation & The Day 3 Roadblock
                </h3>
                <p className="text-sm text-lab-textMuted leading-relaxed">
                  Unlike traditional web browsers which might display a warning dialog for untrusted or self-signed certificates, Android Private DNS enforces RFC 7858 strictly. If the certificate presented during TLS negotiation on port 853 does not chain to an Android system-trusted CA, or if the private key fails cryptographic signature verification, the operating system drops the connection immediately.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                <div className="bg-black/40 p-5 rounded-2xl border border-lab-borderSubtle space-y-3">
                  <div className="text-sky-400 font-bold uppercase tracking-wider text-[11px]">
                    Cryptographic Integrity Rule
                  </div>
                  <p className="text-lab-textMuted leading-relaxed">
                    The public certificate (<code className="text-sky-300">router-cert.pem</code>) and private key (<code className="text-sky-300">router-key.pem</code>) must belong to the exact same cryptographic pair. When our ACME client renewed the certificate without updating the private key pointer, AdGuard Home caught the mathematical modulus disparity and halted TLS startup.
                  </p>
                </div>

                <div className="bg-black/40 p-5 rounded-2xl border border-lab-borderSubtle space-y-3">
                  <div className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                    POSIX Permissions Hardening
                  </div>
                  <p className="text-lab-textMuted leading-relaxed">
                    Private keys must strictly be protected with chmod 600 (<code className="text-emerald-300">-rw-------</code>), readable only by the dedicated unprivileged <code className="text-white">adguardhome</code> process user. The public certificate requires chmod 644 (<code className="text-emerald-300">-rw-r--r--</code>) so verification utilities can validate the full trust chain.
                  </p>
                </div>
              </div>

              <CodeBlock
                command={`# Verify Modulus Parity Using OpenSSL
openssl x509 -in /etc/adguardhome/router-cert.pem -pubkey -noout | openssl pkey -pubin -outform DER | sha256sum
openssl pkey -in /etc/adguardhome/router-key.pem -pubout | openssl pkey -pubin -outform DER | sha256sum`}
                lang="bash"
                shellTitle="Cryptographic Hash Verification"
                output="a8f190e28d447f525bc839211c4701e82845c48b9911e3895e69bf8fa538e121  -"
                explanation="Extracting and hashing the DER public key guarantees that both files share the identical mathematical modulus."
              />
            </div>
          )}

          {activeTab === 'wireguard' && (
            <div className="space-y-6">
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                  ChaCha20-Poly1305 Overlay
                </span>
                <h3 className="text-2xl font-bold text-white font-mono">
                  High-Performance Kernel Tunneling (wg_oracle)
                </h3>
                <p className="text-sm text-lab-textMuted leading-relaxed">
                  WireGuard runs inside the Linux kernel on both OpenWrt and Ubuntu VPS, providing encrypted packet transport with virtually zero latency penalty. It relies on the Noise protocol framework, Curve25519 key exchange, and ChaCha20-Poly1305 authenticated encryption.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="bg-black/40 p-4 rounded-xl border border-lab-borderSubtle">
                  <div className="text-sky-400 font-bold mb-1">PersistentKeepalive = 25</div>
                  <p className="text-lab-textMuted">Sends an empty authenticated packet every 25 seconds to keep Jio NAT state table open indefinitely.</p>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-lab-borderSubtle">
                  <div className="text-sky-400 font-bold mb-1">Subnet 10.200.0.0/24</div>
                  <p className="text-lab-textMuted">Isolated overlay subnet allocating 10.200.0.1 to VPS and 10.200.0.2 to JioWrt gateway.</p>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-lab-borderSubtle">
                  <div className="text-sky-400 font-bold mb-1">Stateful Re-keying</div>
                  <p className="text-lab-textMuted">Keys automatically rotate every few minutes in the background without dropping active DoT streams.</p>
                </div>
              </div>

              <CodeBlock
                command={`# Inspect WireGuard Tunnel Status on JioWrt
wg show wg_oracle`}
                lang="bash"
                shellTitle="WireGuard State Audit"
                output={`interface: wg_oracle
  public key: [REDACTED_JIOWRT_PUBLIC_KEY]
  listening port: 51820
peer: [REDACTED_VPS_PUBLIC_KEY]
  endpoint: [REDACTED_ORACLE_PUBLIC_IP]:51820
  allowed ips: 10.200.0.0/24
  latest handshake: 14 seconds ago
  transfer: 42.18 MiB received, 18.94 MiB sent
  persistent keepalive: every 25 seconds`}
                explanation="Audit confirms sub-minute handshakes and active bidirectional traffic through the CGNAT barrier."
              />
            </div>
          )}

          {activeTab === 'cgnat' && (
            <div className="space-y-6">
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                  RFC 6598 Traversal Engineering
                </span>
                <h3 className="text-2xl font-bold text-white font-mono">
                  Piercing Jio Carrier-Grade NAT with Reverse Forwarding
                </h3>
                <p className="text-sm text-lab-textMuted leading-relaxed">
                  Jio Fiber assigns client WAN interfaces private IP addresses within 10.103.50.0/24. Because ISP CGNAT gateways block unsolicited inbound packets, opening router ports does not work. We solved this by making the home router initiate an outbound tunnel to our Oracle VPS, then piping inbound traffic backwards.
                </p>
              </div>

              <div className="bg-lab-surfaceElevated/60 p-5 rounded-2xl border border-lab-borderSubtle space-y-3 text-xs font-mono">
                <div className="text-white font-bold uppercase text-[11px]">The 4-Step Reverse Packet Journey</div>
                <div className="space-y-2 text-lab-textMuted">
                  <div className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">1.</span>
                    <span>Android phone resolves <code className="text-white">un1ca.dpdns.org</code> to the Oracle VPS public IP and initiates TCP 853.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">2.</span>
                    <span>Oracle VPS iptables PREROUTING table rewrites packet destination IP to <code className="text-white">10.200.0.2:853</code> (JioWrt).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">3.</span>
                    <span>Packet flows through established <code className="text-white">wg0</code> WireGuard interface straight into Jio router.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">4.</span>
                    <span>JioWrt firewall rule <code className="text-white">Allow-AdGuard-DoT</code> passes TCP 853 into local AdGuard Home socket.</span>
                  </div>
                </div>
              </div>

              <CodeBlock
                command={`# Complete VPS Forwarding Pipeline
sudo sysctl -w net.ipv4.ip_forward=1
sudo iptables -t nat -A PREROUTING -i ens3 -p tcp --dport 853 -j DNAT --to-destination 10.200.0.2:853
sudo iptables -A FORWARD -i ens3 -o wg0 -p tcp -d 10.200.0.2 --dport 853 -m conntrack --ctstate NEW,ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A FORWARD -i wg0 -o ens3 -p tcp -s 10.200.0.2 --sport 853 -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
sudo iptables -t nat -A POSTROUTING -o wg0 -p tcp -d 10.200.0.2 --dport 853 -j MASQUERADE`}
                lang="bash"
                shellTitle="Oracle VPS iptables Pipeline"
                explanation="This atomic iptables setup provides stateful bidirectional translation across the cloud NIC and WireGuard overlay."
              />
            </div>
          )}

          {activeTab === 'private-dns' && (
            <div className="space-y-6">
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
                  Native Android 9+ Security
                </span>
                <h3 className="text-2xl font-bold text-white font-mono">
                  Zero-App Cellular Ad-Blocking & SNI Validation
                </h3>
                <p className="text-sm text-lab-textMuted leading-relaxed">
                  Traditional mobile ad-blocking requires running local VPN apps like Intra or Blokada, which consume battery, consume memory, and show persistent notification icons. By hosting our own DNS-over-TLS endpoint, we utilize native Android Private DNS.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-black/40 p-4 rounded-xl border border-lab-borderSubtle">
                  <div className="text-sky-400 font-bold mb-1">Hostname: un1ca.dpdns.org</div>
                  <p className="text-lab-textMuted">Entered directly into Android Settings. Android automatically queries port 853.</p>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-lab-borderSubtle">
                  <div className="text-sky-400 font-bold mb-1">Battery Consumption: 0%</div>
                  <p className="text-lab-textMuted">Operates entirely in OS network stack; no client VPN processes needed.</p>
                </div>
              </div>

              <CodeBlock
                command={`# Live Inspection of Incoming Android DoT Queries
tail -f /var/log/adguardhome.log | grep -E "DoT|un1ca"`}
                lang="bash"
                shellTitle="AdGuard Query Stream"
                output={`2026/09/13 18:42:01 [info] 10.200.0.1:48212: processing DoT request "graph.instagram.com." [A]
2026/09/13 18:42:01 [info] 10.200.0.1:48212: request was filtered: "graph.instagram.com." matched blocklist (0.0.0.0)
2026/09/13 18:42:02 [info] 10.200.0.1:48212: processing DoT request "api.github.com." [A]
2026/09/13 18:42:02 [info] 10.200.0.1:48212: forwarded to upstream 1.1.1.1:53 -> 140.82.121.6`}
                explanation="Demonstrates instant ad interception on cellular queries arriving from Android phones."
              />
            </div>
          )}

          {activeTab === 'warp' && (
            <div className="space-y-6">
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                  Outbound Anonymity & ISP Bypass
                </span>
                <h3 className="text-2xl font-bold text-white font-mono">
                  The Cloudflare WARP Egress Tunnel (wg_vpn)
                </h3>
                <p className="text-sm text-lab-textMuted leading-relaxed">
                  While <code className="text-sky-300 font-mono">wg_oracle</code> handles incoming DoT queries, <code className="text-amber-300 font-mono">wg_vpn</code> connects the router outbound to Cloudflare WARP. This keeps routine web browsing encrypted past the ISP, preventing DNS spoofing and bandwidth throttling.
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded-xl border border-amber-500/20 text-xs font-mono space-y-2">
                <div className="text-amber-400 font-bold">Cloudflare Endpoint Parameters:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-lab-textMuted">
                  <div>Peer Endpoint: <code className="text-white">162.159.192.1:2408</code></div>
                  <div>Allowed IPs: <code className="text-emerald-400">0.0.0.0/0, ::/0</code></div>
                  <div>Interface Name: <code className="text-white">wg_vpn</code></div>
                  <div>Role: <code className="text-amber-300">Default Gateway Egress</code></div>
                </div>
              </div>

              <CodeBlock
                command={`# Inspect Cloudflare WARP Tunnel on JioWrt
wg show wg_vpn`}
                lang="bash"
                shellTitle="OpenWrt Shell"
                output={`interface: wg_vpn
  public key: [REDACTED_WARP_CLIENT_KEY]
  listening port: 51821
peer: [REDACTED_CLOUDFLARE_WARP_KEY]
  endpoint: 162.159.192.1:2408
  allowed ips: 0.0.0.0/0, ::/0
  latest handshake: 4 seconds ago
  transfer: 1.42 GiB received, 320.15 MiB sent`}
                explanation="High-speed transfer counters verify uninterrupted gigabit egress to Cloudflare edge infrastructure."
              />
            </div>
          )}

          {activeTab === 'split-dns' && (
            <div className="space-y-6">
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  Internal Routing Optimization
                </span>
                <h3 className="text-2xl font-bold text-white font-mono">
                  Split-Horizon DNS & Hairpin Prevention
                </h3>
                <p className="text-sm text-lab-textMuted leading-relaxed">
                  When a device inside our home Wi-Fi asks for <code className="text-sky-300 font-mono">un1ca.dpdns.org</code>, we do not want it routing out to the Oracle VPS and back over WireGuard. AdGuard Home rewrites the response locally to <code className="text-emerald-400 font-mono">192.168.1.1</code>. External queries resolve to the VPS public IP.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-black/40 p-4 rounded-xl border border-lab-borderSubtle">
                  <div className="text-emerald-400 font-bold mb-1">Local LAN Resolution</div>
                  <div className="text-white font-semibold">un1ca.dpdns.org → 192.168.1.1</div>
                  <p className="text-lab-textMuted mt-1">Direct wire-speed Wi-Fi access with sub-millisecond response and zero WAN usage.</p>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-lab-borderSubtle">
                  <div className="text-sky-400 font-bold mb-1">Public WAN Resolution</div>
                  <div className="text-white font-semibold">un1ca.dpdns.org → [ORACLE_VPS_PUBLIC_IP]</div>
                  <p className="text-lab-textMuted mt-1">Routes external cellular 4G/5G queries into our cloud WireGuard bridge.</p>
                </div>
              </div>

              <CodeBlock
                command={`# Test LAN resolution vs Public upstream
nslookup un1ca.dpdns.org
nslookup un1ca.dpdns.org 1.1.1.1`}
                lang="bash"
                shellTitle="Split DNS Verification"
                output={`# Local Query:
Server: 192.168.1.1
Address: 192.168.1.1#53
Name: un1ca.dpdns.org
Address: 192.168.1.1

# Public Upstream Query:
Server: 1.1.1.1
Address: 1.1.1.1#53
Name: un1ca.dpdns.org
Address: [REDACTED_ORACLE_PUBLIC_IP]`}
                explanation="Demonstrates two different answers for the same hostname based on network location."
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
