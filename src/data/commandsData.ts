import { CommandItem } from '../types';

export interface CommandCategory {
  id: string;
  name: string;
  description: string;
  badge: string;
  targetOs: 'JioWrt (OpenWrt)' | 'Oracle Cloud (Ubuntu 20.04)' | 'Any Client (Linux / macOS / Windows)';
  commands: CommandItem[];
}

export const commandsLibrary: CommandCategory[] = [
  // 1. OpenWrt
  {
    id: 'openwrt',
    name: 'OpenWrt Interface & Kernel Administration',
    description: 'Kernel routing tables, interface addresses, and IP forwarding flags on the Jio router gateway.',
    badge: 'OpenWrt',
    targetOs: 'JioWrt (OpenWrt)',
    commands: [
      {
        cmd: 'ip -4 addr show',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Lists all IPv4 network addresses configured across physical and virtual interfaces.',
        explanation: 'Audits network bindings to confirm br-lan (192.168.1.1), phy1-ap1 (192.168.10.1), and wan.',
        warningOrNotes: 'Verify that br-lan is bound to 192.168.1.1/24 before applying firewall changes.',
        output: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN
2: br-lan: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP
    inet 192.168.1.1/24 brd 192.168.1.255 scope global br-lan
3: phy1-ap1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP
    inet 192.168.10.1/24 brd 192.168.10.255 scope global phy1-ap1
4: wan: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP
    inet 10.103.50.2/24 brd 10.103.50.255 scope global wan`,
      },
      {
        cmd: 'ip -4 route show',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Dumps the kernel IPv4 routing table showing default gateway, overlay routes, and WAN paths.',
        explanation: 'Confirms that packets destined for external subnets use WAN gateway, while overlay traffic routes via wg_oracle.',
        output: `default via 10.103.50.1 dev wan
10.103.50.0/24 dev wan
10.200.0.0/24 dev wg_oracle
140.238.244.202 via 10.103.50.1 dev wan
192.168.1.0/24 dev br-lan
192.168.10.0/24 dev phy1-ap1`,
      },
      {
        cmd: 'sysctl net.ipv4.ip_forward',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Audits whether kernel packet forwarding is active on the router.',
        explanation: 'If set to 0, router drops all traffic traversing between LAN, Wi-Fi, and WAN interfaces.',
        output: 'net.ipv4.ip_forward = 1',
      },
    ],
  },

  // 2. WireGuard
  {
    id: 'wireguard',
    name: 'WireGuard Tunnel & Peer Monitoring',
    description: 'Interface status, handshakes, transfer metrics, and keepalive inspection on wg_oracle and wg_vpn.',
    badge: 'WireGuard',
    targetOs: 'JioWrt (OpenWrt)',
    commands: [
      {
        cmd: 'wg show wg_oracle',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Displays live cryptographic status, public keys, and transfer counters for the VPS ingress tunnel.',
        explanation: 'Proves bidirectional encrypted communication across CGNAT. Latest handshake must be under 2 minutes.',
        output: `interface: wg_oracle
  public key: [REDACTED_PUBLIC_KEY]
  private key: (hidden)
  listening port: 60353

peer: [REDACTED_VPS_PEER_KEY]
  endpoint: 140.238.244.202:51820
  allowed ips: 10.200.0.0/24
  latest handshake: 14 seconds ago
  transfer: 1.42 MiB received, 2.18 MiB sent
  persistent keepalive: every 25 seconds`,
      },
      {
        cmd: 'wg show wg_vpn',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Audits outbound privacy tunnel status connecting to Cloudflare WARP egress.',
        explanation: 'Ensures upstream queries sent through WARP are actively handshaking and flowing.',
        output: `interface: wg_vpn
  public key: [REDACTED_PUBLIC_KEY]
  private key: (hidden)
  listening port: 51821

peer: [REDACTED_WARP_PEER_KEY]
  endpoint: 162.159.193.10:2408
  allowed ips: 0.0.0.0/0
  latest handshake: 42 seconds ago
  transfer: 8.94 MiB received, 3.21 MiB sent`,
      },
    ],
  },

  // 3. AdGuard Home
  {
    id: 'adguard-home',
    name: 'AdGuard Home v0.107.78 Service & Sockets',
    description: 'Daemon control, listening ports audit (53/853/8443), and real-time query logging.',
    badge: 'AdGuard Home',
    targetOs: 'JioWrt (OpenWrt)',
    commands: [
      {
        cmd: "netstat -lntup | grep -E '(:53|:853|:8443)'",
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Inspects all listening sockets for standard DNS (53), DoT (853), and HTTPS Web UI (8443).',
        explanation: 'Prevents port conflicts with dnsmasq and verifies that AdGuard has claimed all necessary ports.',
        output: `tcp    0    0 :::53            :::*         LISTEN    2145/AdGuardHome
tcp    0    0 :::853           :::*         LISTEN    2145/AdGuardHome
tcp    0    0 0.0.0.0:8443     0.0.0.0:*    LISTEN    2145/AdGuardHome
udp    0    0 :::53            :::*                   2145/AdGuardHome
udp    0    0 0.0.0.0:5353     0.0.0.0:*              1420/dnsmasq`,
      },
      {
        cmd: '/etc/init.d/adguardhome restart',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Restarts the AdGuard Home background service daemon.',
        explanation: 'Reloads configuration file /etc/adguardhome/adguardhome.yaml and re-reads TLS certificates.',
        output: 'Restarting AdGuardHome... OK',
      },
      {
        cmd: 'logread | grep -i AdGuardHome | tail -n 10',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Displays recent operational logs from the AdGuard Home daemon.',
        explanation: 'Inspects real-time query processing and confirms TLS socket initialization.',
        output: `daemon.info AdGuardHome[2145]: [info] tcp: listening on [::]:53
daemon.info AdGuardHome[2145]: [info] udp: listening on [::]:53
daemon.info AdGuardHome[2145]: [info] tls: listening on [::]:853 (DoT)
daemon.info AdGuardHome[2145]: [info] web: listening on 0.0.0.0:8443 (HTTPS)
daemon.info AdGuardHome[2145]: [info] AdGuard Home is ready`,
      },
    ],
  },

  // 4. DNS
  {
    id: 'dns',
    name: 'DNS Resolution & Query Auditing',
    description: 'Local loopback testing, remote DNS lookups, and Private DNS domain resolution verification.',
    badge: 'DNS Resolution',
    targetOs: 'JioWrt (OpenWrt)',
    commands: [
      {
        cmd: 'nslookup google.com 127.0.0.1',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Tests local AdGuard Home port 53 resolution directly on the router loopback.',
        explanation: 'Verifies that AdGuard Home responds in under 1ms and successfully forwards queries to upstreams.',
        output: `Server:    127.0.0.1
Address:   127.0.0.1:53

Non-authoritative answer:
Name:      google.com
Address:   142.250.196.78`,
      },
      {
        cmd: 'nslookup un1ca.dpdns.org 192.168.1.1',
        lang: 'bash',
        shellTitle: 'LAN Client Terminal',
        purpose: 'Verifies Split-Horizon DNS resolution for local LAN clients.',
        explanation: 'Confirms that internal Wi-Fi/Ethernet clients resolve un1ca.dpdns.org directly to 192.168.1.1.',
        output: `Server:    192.168.1.1
Address:   192.168.1.1:53

Name:      un1ca.dpdns.org
Address:   192.168.1.1`,
      },
      {
        cmd: 'dig +short un1ca.dpdns.org @1.1.1.1',
        lang: 'bash',
        shellTitle: 'External Internet Terminal',
        purpose: 'Verifies public internet DNS resolution for remote clients.',
        explanation: 'Confirms that external clients resolve un1ca.dpdns.org to the Oracle VPS public IP.',
        output: '140.238.244.202',
      },
    ],
  },

  // 5. TLS / SSL
  {
    id: 'tls-ssl',
    name: 'TLS / SSL & Modulus Verification',
    description: 'Certificate chain validation, public/private key matching, and OpenSSL mathematical fingerprinting.',
    badge: 'TLS & Crypto',
    targetOs: 'JioWrt (OpenWrt)',
    commands: [
      {
        cmd: "openssl x509 -in /etc/adguardhome/router-cert.pem -pubkey -noout | openssl pkey -pubin -outform DER | sha256sum",
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Calculates the SHA-256 modulus hash of the public key inside the certificate.',
        explanation: 'Must match the private key hash identically; fixes the "private key does not match public key" error.',
        output: '13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf  -',
      },
      {
        cmd: "openssl pkey -in /etc/adguardhome/router-key.pem -pubout | openssl pkey -pubin -outform DER | sha256sum",
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Calculates the SHA-256 modulus hash of the private key.',
        explanation: 'Comparing this against the certificate hash mathematically proves public/private key pair parity.',
        warningOrNotes: 'Never disclose the contents of router-key.pem. Run sha256sum on the derived public key only.',
        output: '13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf  -',
      },
      {
        cmd: 'ls -l /etc/adguardhome/router-*.pem',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Inspects file permissions and ownership on the cryptographic certificates.',
        explanation: 'Enforces strict chmod 600 on the private key and chmod 644 on the public certificate.',
        output: `-rw-r--r--    1 root     root          5628 Sep 11 22:30 /etc/adguardhome/router-cert.pem
-rw-------    1 root     root          3272 Sep 11 22:30 /etc/adguardhome/router-key.pem`,
      },
    ],
  },

  // 6. Cloudflare
  {
    id: 'cloudflare',
    name: 'Cloudflare Pages & Edge Deployment',
    description: 'Building, testing, and deploying the documentation website to Cloudflare Pages edge network.',
    badge: 'Cloudflare',
    targetOs: 'Any Client (Linux / macOS / Windows)',
    commands: [
      {
        cmd: 'npm run build',
        lang: 'bash',
        shellTitle: 'Local Workstation',
        purpose: 'Compiles the TypeScript source files into an optimized static production bundle in dist/.',
        explanation: 'Runs tsc and Vite bundler to produce production assets, HTML, and service configs.',
        output: `vite v5.4.21 building for production...
✓ 1612 modules transformed.
dist/index.html                   2.88 kB
dist/assets/index-B12xL1OT.css   43.68 kB
dist/assets/index-xii-dJ1M.js   376.60 kB
✓ built in 2.00s`,
      },
      {
        cmd: 'npx wrangler pages deploy dist --project-name un1ca-jiowrt',
        lang: 'bash',
        shellTitle: 'Local Workstation',
        purpose: 'Uploads and publishes the production bundle to Cloudflare Pages edge network.',
        explanation: 'Transfers static files, _headers, and _redirects to Cloudflare global infrastructure.',
        output: `✨ Success! Uploaded 4 files (1.88 sec)
✨ Uploading _headers
✨ Uploading _redirects
🌎 Deploying...
✨ Deployment complete! https://un1ca-jiowrt.pages.dev`,
      },
    ],
  },

  // 7. VPS
  {
    id: 'vps',
    name: 'Oracle Cloud VPS Administration',
    description: 'Ubuntu 20.04 cloud node service status, WireGuard server status, and kernel forwarding.',
    badge: 'Oracle Cloud',
    targetOs: 'Oracle Cloud (Ubuntu 20.04)',
    commands: [
      {
        cmd: 'sudo systemctl status wg-quick@wg0',
        lang: 'bash',
        shellTitle: 'Oracle Cloud VPS (Ubuntu 20.04)',
        purpose: 'Checks the service status of the WireGuard server daemon on the public VPS.',
        explanation: 'Ensures the wg0 interface is active and listening on UDP port 51820.',
        output: `● wg-quick@wg0.service - WireGuard via wg-quick(8) for wg0
     Loaded: loaded (/lib/systemd/system/wg-quick@.service; enabled)
     Active: active (exited) since Sat 2026-09-05 14:10:22 UTC
   Main PID: 742 (code=exited, status=0/SUCCESS)`,
      },
      {
        cmd: 'sudo wg show wg0',
        lang: 'bash',
        shellTitle: 'Oracle Cloud VPS (Ubuntu 20.04)',
        purpose: 'Displays all active WireGuard peers connected to the VPS.',
        explanation: 'Confirms that the JioWrt peer (10.200.0.2) is connected and actively sending handshakes.',
        output: `interface: wg0
  public key: [REDACTED_VPS_KEY]
  private key: (hidden)
  listening port: 51820

peer: [REDACTED_JIOWRT_KEY]
  endpoint: [ISP_PUBLIC_CGNAT_IP]:60353
  allowed ips: 10.200.0.2/32
  latest handshake: 18 seconds ago
  transfer: 2.18 MiB received, 1.42 MiB sent`,
      },
    ],
  },

  // 8. Network Diagnostics
  {
    id: 'network-diagnostics',
    name: 'Network Diagnostics & Connectivity Testing',
    description: 'End-to-end ping latency, MTU discovery, and DoT SSL client connectivity verification.',
    badge: 'Diagnostics',
    targetOs: 'Any Client (Linux / macOS / Windows)',
    commands: [
      {
        cmd: 'ping -c 4 10.200.0.1',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Pings the Oracle VPS internal tunnel address from the JioWrt router.',
        explanation: 'Verifies bidirectional WireGuard tunnel latency (typically 20-25ms across broadband).',
        output: `PING 10.200.0.1 (10.200.0.1): 56 data bytes
64 bytes from 10.200.0.1: seq=0 ttl=64 time=22.141 ms
64 bytes from 10.200.0.1: seq=1 ttl=64 time=21.890 ms
64 bytes from 10.200.0.1: seq=2 ttl=64 time=22.312 ms
64 bytes from 10.200.0.1: seq=3 ttl=64 time=21.954 ms
--- 10.200.0.1 ping statistics ---
4 packets transmitted, 4 packets received, 0% packet loss`,
      },
      {
        cmd: 'openssl s_client -connect un1ca.dpdns.org:853 -servername un1ca.dpdns.org -brief',
        lang: 'bash',
        shellTitle: 'Client Terminal (Linux / macOS)',
        purpose: 'Tests the full TLS handshake on port 853 from an external internet connection.',
        explanation: 'Validates that the certificate chain is accepted and TLS 1.3 is negotiated.',
        output: `CONNECTION ESTABLISHED
Protocol version: TLSv1.3
Ciphersuite: TLS_AES_256_GCM_SHA384
Peer certificate: CN = un1ca.dpdns.org
Verification: OK`,
      },
    ],
  },

  // 9. Firewall
  {
    id: 'firewall',
    name: 'iptables NAT & Packet Forwarding Rules',
    description: 'PREROUTING DNAT, POSTROUTING MASQUERADE, and conntrack stateful inspection on the VPS.',
    badge: 'iptables Firewall',
    targetOs: 'Oracle Cloud (Ubuntu 20.04)',
    commands: [
      {
        cmd: 'sudo iptables -t nat -L PREROUTING -n -v --line-numbers',
        lang: 'bash',
        shellTitle: 'Oracle Cloud VPS (Ubuntu 20.04)',
        purpose: 'Inspects the PREROUTING NAT chain to verify packet redirection into the WireGuard tunnel.',
        explanation: 'Monitors real-time packet counters for DoT (port 853) and AdGuard UI (port 8443).',
        output: `num   pkts bytes target prot opt in   out   source    destination
1     1420 89.4K DNAT   tcp  --  eth0 *     0.0.0.0/0 0.0.0.0/0 tcp dpt:853 to:10.200.0.2:853
2      210 12.8K DNAT   tcp  --  eth0 *     0.0.0.0/0 0.0.0.0/0 tcp dpt:8443 to:10.200.0.2:8443`,
      },
      {
        cmd: `sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 853 -j DNAT --to-destination 10.200.0.2:853
sudo iptables -t nat -A POSTROUTING -o wg0 -p tcp -d 10.200.0.2 --dport 853 -j MASQUERADE`,
        lang: 'bash',
        shellTitle: 'Oracle Cloud VPS (Ubuntu 20.04)',
        purpose: 'Installs the PREROUTING DNAT and POSTROUTING MASQUERADE rules for DNS-over-TLS (Example configuration).',
        explanation: 'Directs incoming public port 853 requests through wg0 into JioWrt at 10.200.0.2.',
        warningOrNotes: 'Example command. Persist with iptables-persistent or netfilter-persistent across reboots.',
        isExample: true,
      },
    ],
  },

  // 10. Troubleshooting
  {
    id: 'troubleshooting',
    name: 'Troubleshooting & Rapid Recovery',
    description: 'Probing conntrack state tables, flushing dead sockets, and diagnosing Private DNS errors.',
    badge: 'Diagnostics',
    targetOs: 'JioWrt (OpenWrt)',
    commands: [
      {
        cmd: "conntrack -L -p tcp --dport 853",
        lang: 'bash',
        shellTitle: 'Oracle Cloud VPS (Ubuntu 20.04)',
        purpose: 'Dumps the Linux kernel connection tracking table for active Private DNS sessions.',
        explanation: 'Shows external client IPs, translation states, and NAT session lifetimes.',
        output: `tcp      6 431998 ESTABLISHED src=49.37.12.184 dst=140.238.244.202 sport=48212 dport=853 src=10.200.0.2 dst=10.200.0.1 sport=853 dport=48212 [ASSURED] mark=0 use=1`,
      },
      {
        cmd: 'logread -f -e AdGuardHome',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Streams real-time live logs from AdGuard Home to monitor incoming DoT queries as they occur.',
        explanation: 'Immediately detects TLS negotiation failures or handshake terminations.',
        output: `2026/09/12 00:15:22 [info] 10.200.0.1:48212: processing DoT request "connectivitycheck.gstatic.com." [A]
2026/09/12 00:15:22 [info] 10.200.0.1:48212: resolved successfully in 1.2ms`,
      },
    ],
  },
];
