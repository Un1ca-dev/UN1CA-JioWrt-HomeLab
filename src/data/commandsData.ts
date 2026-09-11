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
  {
    id: 'openwrt-foundation',
    name: 'OpenWrt Network & Interface Auditing',
    description: 'Kernel routing tables, interface addresses, and IP forwarding flags on the Jio router gateway.',
    badge: 'JioWrt OpenWrt',
    targetOs: 'JioWrt (OpenWrt)',
    commands: [
      {
        cmd: 'ip -4 addr show',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Lists all IPv4 network addresses configured across physical and virtual interfaces.',
        why: 'Crucial for confirming br-lan (192.168.1.1), phy1-ap1 (192.168.10.1), and wan (10.103.50.2) states.',
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
        explanation: 'Dumps the kernel IPv4 routing table showing default gateway, overlay routes, and WAN paths.',
        why: 'Confirms that packets destined for external subnets use 10.103.50.1, while overlay traffic routes via wg_oracle.',
        output: `default via 10.103.50.1 dev wan
10.103.50.0/24 dev wan
10.200.0.0/24 dev wg_oracle
140.238.244.202 via 10.103.50.1 dev wan
162.159.192.1 via 10.103.50.1 dev wan
192.168.1.0/24 dev br-lan
192.168.10.0/24 dev phy1-ap1`,
      },
      {
        cmd: 'sysctl net.ipv4.ip_forward',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Audits whether kernel packet forwarding is active.',
        why: 'If set to 0, router drops all traffic between LAN, Wi-Fi, and WAN interfaces.',
        output: 'net.ipv4.ip_forward = 1',
      },
    ],
  },
  {
    id: 'adguard-service',
    name: 'AdGuard Home v0.107.78 Service & Sockets',
    description: 'Daemon management, socket binding audit, and runtime TLS manager log monitoring.',
    badge: 'AdGuard Core',
    targetOs: 'JioWrt (OpenWrt)',
    commands: [
      {
        cmd: "netstat -lntup | grep -E '(:53|:853|:8443)'",
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Inspects all listening TCP/UDP sockets for standard DNS (53), DoT (853), and HTTPS (8443).',
        why: 'Prevents port conflicts with dnsmasq and ensures AdGuard has bound to all necessary protocols.',
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
        explanation: 'Executes procd restart script for the AdGuard Home service daemon.',
        why: 'Forces AdGuard Home to reload /etc/adguardhome/adguardhome.yaml and refresh TLS certificates.',
      },
      {
        cmd: 'logread | grep -i tls_manager',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Filters memory circular log buffer for the AdGuard TLS manager subsystem.',
        why: 'Proves certificate chain parsing succeeded without errors and identifies active HTTPS/DoT sockets.',
        output: `daemon.info AdGuardHome[2390]: [info] tls_manager: parsing multiple pem certificates
daemon.info AdGuardHome[2390]: [info] tls_manager: verifying certificate chain
daemon.info AdGuardHome[2390]: [info] tls_manager: certificate chain is valid for un1ca.dpdns.org
daemon.info AdGuardHome[2390]: [info] webapi: serving url=https://un1ca.dpdns.org:8443
daemon.info AdGuardHome[2390]: [info] starting https server`,
      },
    ],
  },
  {
    id: 'tls-verification',
    name: 'Let\'s Encrypt TLS & Modulus Fingerprinting',
    description: 'Cryptographic parity verification and file permission hardening commands.',
    badge: 'OpenSSL / PKI',
    targetOs: 'JioWrt (OpenWrt)',
    commands: [
      {
        cmd: `openssl x509 -in /etc/adguardhome/router-cert.pem -pubkey -noout | \\
openssl pkey -pubin -outform DER | sha256sum`,
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Extracts public key from the X.509 certificate, converts to DER binary, and computes SHA-256 hash.',
        why: 'Produces a canonical fingerprint of the certificate\'s public modulus to compare against the private key.',
        output: '13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf  -',
      },
      {
        cmd: `openssl pkey -in /etc/adguardhome/router-key.pem -pubout | \\
openssl pkey -pubin -outform DER | sha256sum`,
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Computes the SHA-256 hash of the public key derived from the private key file.',
        why: 'If the hash matches the certificate\'s hash, modulus equality is guaranteed and TLS will not fail.',
        output: '13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf  -',
      },
      {
        cmd: `chown adguardhome:adguardhome /etc/adguardhome/router-cert.pem /etc/adguardhome/router-key.pem
chmod 644 /etc/adguardhome/router-cert.pem
chmod 600 /etc/adguardhome/router-key.pem`,
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Sets least-privilege ownership and permissions on certificate and key files.',
        why: 'Protects the private key from non-root processes (600) while allowing AdGuard to load it.',
      },
    ],
  },
  {
    id: 'dns-testing',
    name: 'DNS Resolution & OpenSSL Handshake Testing',
    description: 'Split-Horizon DNS verification, public DNS lookups, and simulated client TLS handshakes.',
    badge: 'DNS & SSL Tests',
    targetOs: 'Any Client (Linux / macOS / Windows)',
    commands: [
      {
        cmd: 'dig +short un1ca.dpdns.org',
        lang: 'bash',
        shellTitle: 'External Public Terminal',
        explanation: 'Queries authoritative DNS for the external A-record of un1ca.dpdns.org.',
        why: 'Verifies that the hostname properly resolves to Oracle VPS public IP (140.238.244.202).',
        output: '140.238.244.202',
      },
      {
        cmd: 'nslookup un1ca.dpdns.org 1.1.1.1',
        lang: 'bash',
        shellTitle: 'External Public Terminal',
        explanation: 'Queries Cloudflare public DNS (1.1.1.1) to confirm global internet propagation.',
        why: 'Confirms external mobile networks reach the Oracle VPS ingress anchor.',
        output: `Server:    1.1.1.1
Address:   1.1.1.1#53

Name:      un1ca.dpdns.org
Address:   140.238.244.202`,
      },
      {
        cmd: 'nslookup un1ca.dpdns.org',
        lang: 'bash',
        shellTitle: 'Local Home LAN / Wi-Fi Terminal',
        explanation: 'Queries default local router DNS from a home device.',
        why: 'Confirms that local Split DNS rewrite returns 192.168.1.1 for local zero-latency routing.',
        output: `Server:    192.168.1.1
Address:   192.168.1.1#53

Name:      un1ca.dpdns.org
Address:   192.168.1.1`,
      },
      {
        cmd: 'openssl s_client -connect un1ca.dpdns.org:853 -servername un1ca.dpdns.org',
        lang: 'bash',
        shellTitle: 'External Internet Terminal',
        explanation: 'Performs an encrypted TLS handshake against port 853 with Server Name Indication (SNI).',
        why: 'Simulates the exact RFC 7858 handshake performed by Android Private DNS.',
        output: `CONNECTED(00000003)
depth=2 C = US, O = Internet Security Research Group, CN = ISRG Root X1
verify return:1
depth=1 C = US, O = Let's Encrypt, CN = YE1
verify return:1
depth=0 CN = un1ca.dpdns.org
verify return:1
---
Verify return code: 0 (ok)`,
      },
      {
        cmd: 'openssl s_client -connect 192.168.1.1:853 -servername un1ca.dpdns.org',
        lang: 'bash',
        shellTitle: 'Local Home LAN Terminal',
        explanation: 'Validates local TLS handshake against the router IP passing the SNI hostname.',
        why: 'Ensures Wi-Fi clients also receive the identical trusted Let\'s Encrypt certificate.',
        output: `CONNECTED(00000003)
subject=CN=un1ca.dpdns.org
issuer=C=US, O=Let's Encrypt, CN=YE1
Verify return code: 0 (ok)`,
      },
    ],
  },
  {
    id: 'vps-iptables',
    name: 'Oracle VPS Reverse DNAT & Routing Rules',
    description: 'Kernel forwarding, PREROUTING port translation, and masquerade rules on Ubuntu 20.04.',
    badge: 'Ubuntu 20.04 VPS',
    targetOs: 'Oracle Cloud (Ubuntu 20.04)',
    commands: [
      {
        cmd: 'sudo sysctl -w net.ipv4.ip_forward=1',
        lang: 'bash',
        shellTitle: 'Oracle VPS (Ubuntu 20.04)',
        explanation: 'Enables packet forwarding in the Linux kernel on the cloud VPS.',
        why: 'Allows the VPS kernel to route transit packets between network interface ens3 and WireGuard wg0.',
        output: 'net.ipv4.ip_forward = 1',
      },
      {
        cmd: `sudo iptables -t nat -A PREROUTING -i ens3 \\
-p tcp --dport 853 \\
-j DNAT --to-destination 10.200.0.2:853`,
        lang: 'bash',
        shellTitle: 'Oracle VPS (Ubuntu 20.04)',
        explanation: 'Rewrites destination of inbound TCP 853 packets to JioWrt WireGuard address (10.200.0.2:853).',
        why: 'Bypasses CGNAT by funneling public traffic into the reverse tunnel.',
      },
      {
        cmd: `sudo iptables -A FORWARD -i ens3 -o wg0 \\
-p tcp -d 10.200.0.2 --dport 853 \\
-m conntrack --ctstate NEW,ESTABLISHED,RELATED -j ACCEPT`,
        lang: 'bash',
        shellTitle: 'Oracle VPS (Ubuntu 20.04)',
        explanation: 'Permits stateful forwarded traffic from public NIC ens3 into WireGuard overlay wg0.',
        why: 'Ensures the firewall does not discard the translated DNAT packets.',
      },
      {
        cmd: `sudo iptables -A FORWARD -i wg0 -o ens3 \\
-p tcp -s 10.200.0.2 --sport 853 \\
-m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT`,
        lang: 'bash',
        shellTitle: 'Oracle VPS (Ubuntu 20.04)',
        explanation: 'Allows response packets from JioWrt to exit back out to the mobile client over ens3.',
        why: 'Maintains bidirectional communication for the DoT session.',
      },
      {
        cmd: `sudo iptables -t nat -A POSTROUTING -o wg0 \\
-p tcp -d 10.200.0.2 --dport 853 \\
-j MASQUERADE`,
        lang: 'bash',
        shellTitle: 'Oracle VPS (Ubuntu 20.04)',
        explanation: 'Applies Source NAT to packets traversing into wg0.',
        why: 'Guarantees that JioWrt routes responses back over the WireGuard tunnel rather than trying WAN.',
      },
      {
        cmd: 'sudo iptables -t nat -L PREROUTING -n -v | grep 853',
        lang: 'bash',
        shellTitle: 'Oracle VPS (Ubuntu 20.04)',
        explanation: 'Views packet and byte hit counters for the port 853 DNAT rule.',
        why: 'Immediate confirmation that mobile queries are being received and forwarded.',
        output: ' 1248   74880 DNAT  tcp  --  ens3  *  0.0.0.0/0  0.0.0.0/0  tcp dpt:853 to:10.200.0.2:853',
      },
    ],
  },
  {
    id: 'wireguard-ops',
    name: 'WireGuard Tunnel Interface Monitoring',
    description: 'Interface inspection, peer statistics, and route verification for wg_oracle and wg_vpn.',
    badge: 'WireGuard VPN',
    targetOs: 'JioWrt (OpenWrt)',
    commands: [
      {
        cmd: 'wg show wg_oracle',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Displays WireGuard interface statistics, listening port (60353), handshake, and byte counters.',
        why: 'Quickly verifies if the tunnel is healthy or if handshakes have timed out.',
        output: `interface: wg_oracle
  public key: [REDACTED_JIOWRT_PUBLIC_KEY]
  listening port: 60353
peer: oXU65nSKCfc1TfLuFJYUfTZ2y8onxeHwa+prtkCm51U=
  endpoint: 140.238.244.202:51820
  allowed ips: 10.200.0.0/24
  latest handshake: 14 seconds ago
  transfer: 42.18 MiB received, 18.94 MiB sent
  persistent keepalive: every 25 seconds`,
      },
      {
        cmd: 'sudo wg show wg0',
        lang: 'bash',
        shellTitle: 'Oracle VPS (Ubuntu 20.04)',
        explanation: 'Inspects the server-side WireGuard interface on the Oracle VPS.',
        why: 'Confirms that the VPS sees the incoming connection from JioWrt and reports active transfer.',
        output: `interface: wg0
  public key: oXU65nSKCfc1TfLuFJYUfTZ2y8onxeHwa+prtkCm51U=
  listening port: 51820
peer: [REDACTED_JIOWRT_PUBLIC_KEY]
  allowed ips: 10.200.0.0/24
  latest handshake: 14 seconds ago`,
      },
      {
        cmd: 'wg show wg_vpn',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell (Cloudflare WARP)',
        explanation: 'Displays the state of the separate Cloudflare WARP egress interface.',
        why: 'Proves that the secondary egress tunnel to 162.159.192.1:2408 is active alongside wg_oracle.',
        output: `interface: wg_vpn
  public key: [REDACTED_WARP_CLIENT_KEY]
peer: [REDACTED_CLOUDFLARE_WARP_KEY]
  endpoint: 162.159.192.1:2408
  allowed ips: 0.0.0.0/0, ::/0
  latest handshake: 4 seconds ago
  transfer: 1.42 GiB received, 320.15 MiB sent`,
      },
    ],
  },
  {
    id: 'firewall-uci',
    name: 'OpenWrt UCI Firewall Configuration',
    description: 'Declarative firewall queries and verification commands on JioWrt.',
    badge: 'OpenWrt UCI',
    targetOs: 'JioWrt (OpenWrt)',
    commands: [
      {
        cmd: "uci show firewall | grep -E '853|8443'",
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Queries UCI configuration system for firewall rules containing ports 853 and 8443.',
        why: 'Quickly audits active firewall rules to verify syntax and zone bindings.',
        output: `firewall.@rule[9].name='Allow-AdGuard-DoT'
firewall.@rule[9].src='wan'
firewall.@rule[9].dest_port='853'
firewall.@rule[9].proto='tcp'
firewall.@rule[9].target='ACCEPT'
firewall.@redirect[2].name='AdGuard-DoH-8443'
firewall.@redirect[2].src='wan'
firewall.@redirect[2].src_dport='8443'
firewall.@redirect[2].dest='lan'
firewall.@redirect[2].dest_ip='192.168.1.1'
firewall.@redirect[2].dest_port='8443'`,
      },
      {
        cmd: 'uci show firewall.@rule[9]',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Displays the complete configuration stanza for the DoT accept rule.',
        why: 'Confirms rule name, protocol, source zone, and target parameters.',
      },
    ],
  },
];
