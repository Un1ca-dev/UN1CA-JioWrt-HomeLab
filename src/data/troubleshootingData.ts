import { TroubleshootingItem } from '../types';

export const troubleshootingData: TroubleshootingItem[] = [
  // 1. Certificate/private key mismatch
  {
    id: 'ts-key-mismatch',
    problem: 'Certificate and Private Key Mismatch (TLS Error)',
    category: 'TLS',
    severity: 'high',
    diagnosis: 'AdGuard Home logged "tls: private key does not match public key" and failed to bind to port 853. The active X.509 certificate file (/etc/adguard/fullchain.pem) and the private key (/etc/adguard/privkey.pem) came from two different ACME issuance runs.',
    fix: 'Replaced the mismatched pair with the coherent certificate and private key generated in the same Certbot session. Verified modulus hash equivalence by piping the public keys from both files through OpenSSL DER formatting and sha256sum.',
    result: 'Both public keys produced the identical SHA-256 hash (13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf). AdGuard Home successfully launched its TLS manager on TCP port 853 and 8443.',
    symptom: 'AdGuard Home crashes or fails to initialize TLS listener on port 853 and 8443.',
    cause: 'Private key and public certificate were issued during separate ACME challenge transactions with differing private keys.',
    solution: 'Deploy matching ACME keypair and confirm sha256 modulus hash parity.',
    commands: [
      {
        cmd: 'openssl x509 -in /etc/adguard/fullchain.pem -pubkey -noout | openssl pkey -pubin -outform DER | sha256sum',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Calculates public key hash inside the certificate.',
        output: '13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf  -',
      },
      {
        cmd: 'openssl pkey -in /etc/adguard/privkey.pem -pubout | openssl pkey -pubin -outform DER | sha256sum',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Calculates public key hash derived from private key.',
        output: '13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf  -',
      },
    ],
  },

  // 2. AdGuard Home TLS configuration
  {
    id: 'ts-adguard-tls',
    problem: 'AdGuard Home TLS Configuration & Port Binding',
    category: 'AdGuard',
    severity: 'medium',
    diagnosis: 'AdGuard Home Web UI failed to enforce HTTPS on port 8443, and DoT failed to answer TLS handshakes. Inspection of /etc/adguardhome/adguardhome.yaml showed certificate paths were pointing to outdated /tmp locations and tls.enabled was set to false.',
    fix: 'Updated configuration to permanent paths (/etc/adguard/fullchain.pem and /etc/adguard/privkey.pem), set tls.enabled: true, specified server_name: un1ca.dpdns.org, and assigned file permissions 600 to private key and 644 to cert.',
    result: 'AdGuard Home procd daemon started cleanly. netstat confirmed listeners on :::853 and 0.0.0.0:8443 with valid TLS handshake logs.',
    commands: [
      {
        cmd: "netstat -lntup | grep -E '(:853|:8443)'",
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Audits listening sockets for DoT and HTTPS Web management.',
        output: `tcp    0    0 :::853           :::*         LISTEN    2145/AdGuardHome
tcp    0    0 0.0.0.0:8443     0.0.0.0:*    LISTEN    2145/AdGuardHome`,
      },
    ],
  },

  // 3. Mobile-network Private DNS connectivity
  {
    id: 'ts-mobile-private-dns',
    problem: 'Mobile-Network Private DNS Connectivity Failure',
    category: 'CGNAT',
    severity: 'high',
    diagnosis: 'Android devices connected to home Wi-Fi worked perfectly, but when switching to 4G/5G mobile data, Android displayed "Couldn\'t connect" or "No internet". Tracing showed external cellular queries were reaching Oracle VPS port 853 but dropped before entering the WireGuard tunnel.',
    fix: 'Identified missing iptables FORWARD rule on VPS allowing forwarded stateful connections from eth0 into wg0, and confirmed Oracle Cloud Security List ingress rule for TCP port 853 was enabled.',
    result: 'Android devices on Airtel, Jio, and external Wi-Fi networks connected seamlessly to un1ca.dpdns.org with 0% dropped queries and ~22ms response time.',
    commands: [
      {
        cmd: 'sudo iptables -A FORWARD -p tcp -d 10.200.0.2 --dport 853 -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT',
        lang: 'bash',
        shellTitle: 'Oracle Cloud VPS',
        purpose: 'Allows forwarded TCP packets to traverse from public interface into WireGuard.',
      },
    ],
  },

  // 4. CGNAT limitations
  {
    id: 'ts-cgnat-limitations',
    problem: 'Carrier-Grade NAT (CGNAT) Inbound Blocking',
    category: 'CGNAT',
    severity: 'high',
    diagnosis: 'ISP allocated a 100.x.x.x private WAN address to the Jio router. All external unsolicited connection attempts were instantly discarded at the ISP carrier gateway, making direct router port forwarding impossible.',
    fix: 'Reversed the ingress architecture. Instead of waiting for incoming connections, JioWrt establishes an outbound WireGuard tunnel to a public Oracle VPS with PersistentKeepalive = 25 seconds to preserve state table entries in the carrier NAT.',
    result: 'Uninterrupted bidirectional communication maintained 24/7 without needing an expensive static IP subscription from the ISP.',
    commands: [
      {
        cmd: 'wg show wg_oracle persistent-keepalive',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Verifies active 25-second keepalive timer.',
        output: 'every 25 seconds',
      },
    ],
  },

  // 5. VPS WireGuard routing
  {
    id: 'ts-vps-routing',
    problem: 'VPS WireGuard Routing & Packet Deadlock',
    category: 'WireGuard',
    severity: 'high',
    diagnosis: 'WireGuard handshake between VPS (10.200.0.1) and JioWrt (10.200.0.2) was active, but packets sent to 10.200.0.2 timed out. Investigation showed net.ipv4.ip_forward was disabled by default on Ubuntu 20.04 VPS kernel.',
    fix: 'Enabled IPv4 kernel forwarding via sysctl -w net.ipv4.ip_forward=1 and made it permanent in /etc/sysctl.d/99-sysctl.conf.',
    result: 'Packet traversal unblocked. Ping between 10.200.0.1 and 10.200.0.2 stabilized at ~21ms with 0% loss.',
    commands: [
      {
        cmd: 'sudo sysctl -p /etc/sysctl.d/99-sysctl.conf',
        lang: 'bash',
        shellTitle: 'Oracle Cloud VPS',
        purpose: 'Loads sysctl kernel flags including IPv4 forwarding.',
        output: 'net.ipv4.ip_forward = 1',
      },
    ],
  },

  // 6. Firewall forwarding
  {
    id: 'ts-firewall-forwarding',
    problem: 'Firewall Port Forwarding & NAT Masquerading',
    category: 'Firewall',
    severity: 'medium',
    diagnosis: 'Incoming packets on VPS port 853 were DNAT-ed to 10.200.0.2, but return packets were routed via JioWrt standard WAN default gateway rather than back through wg_oracle, causing asynchronous routing drops.',
    fix: 'Added POSTROUTING MASQUERADE rule on the VPS for traffic destined to 10.200.0.2 so return packets are forced back through the tunnel to the VPS IP.',
    result: 'Conntrack session tracking locked into ESTABLISHED state. Full two-way TCP handshakes succeeded reliably.',
    commands: [
      {
        cmd: 'sudo iptables -t nat -A POSTROUTING -o wg0 -p tcp -d 10.200.0.2 --dport 853 -j MASQUERADE',
        lang: 'bash',
        shellTitle: 'Oracle Cloud VPS',
        purpose: 'Masquerades source IP for forwarded packets to maintain symmetrical routing.',
      },
    ],
  },

  // 7. DNS resolution
  {
    id: 'ts-dns-resolution',
    problem: 'DNS Resolution Loop & Port 53 Port Conflict',
    category: 'DNS',
    severity: 'high',
    diagnosis: 'Upon initial OpenWrt boot, dnsmasq was already bound to port 53. Attempting to start AdGuard Home on port 53 caused "bind: address already in use" fatal error.',
    fix: 'Relocated dnsmasq to port 5353 via uci set dhcp.@dnsmasq[0].port="5353", restarted dnsmasq, and bound AdGuard Home cleanly to port 53 across all interfaces.',
    result: 'Clean separation achieved: dnsmasq manages internal DHCP leases on port 5353, while AdGuard Home handles all system-wide DNS queries on port 53.',
    commands: [
      {
        cmd: `uci set dhcp.@dnsmasq[0].port='5353'
uci commit dhcp
/etc/init.d/dnsmasq restart`,
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        purpose: 'Moves dnsmasq to alternate port to free port 53 for AdGuard Home.',
      },
    ],
  },

  // 8. Cloudflare DNS
  {
    id: 'ts-cloudflare-dns',
    problem: 'Cloudflare DNS Edge Record Alignment',
    category: 'Cloudflare',
    severity: 'medium',
    diagnosis: 'Documentation domain un1ca.qzz.io was resolving with stale DNS records after Cloudflare Pages deployment, and CAA records initially blocked automated SSL issuance.',
    fix: 'Configured proper CNAME flattening for un1ca.qzz.io pointing directly to un1ca-jiowrt.pages.dev and configured Cloudflare SSL/TLS mode to "Full (strict)".',
    result: 'Global DNS propagated in seconds. Edge SSL certificates issued cleanly with A+ SSL Labs grade.',
    commands: [
      {
        cmd: 'dig +short un1ca.qzz.io',
        lang: 'bash',
        shellTitle: 'Client Terminal',
        purpose: 'Verifies edge DNS resolution for custom Cloudflare Pages domain.',
        output: `172.67.182.21
104.21.54.112`,
      },
    ],
  },

  // 9. DoT connectivity
  {
    id: 'ts-dot-connectivity',
    problem: 'DNS-over-TLS (DoT) Connection Dropouts',
    category: 'TLS',
    severity: 'high',
    diagnosis: 'Android Private DNS would periodically disconnect after 10-15 minutes of device idle state. Root cause was identified as aggressive ISP state-table timeouts on idle TCP connections through the NAT.',
    fix: 'Configured TCP keepalive probes inside AdGuard Home configuration and reinforced WireGuard persistent-keepalive on the tunnel interface.',
    result: 'Zero dropouts. Persistent DoT sessions maintained indefinitely across days of testing on mobile cellular networks.',
    commands: [
      {
        cmd: 'openssl s_client -connect un1ca.dpdns.org:853 -servername un1ca.dpdns.org -brief',
        lang: 'bash',
        shellTitle: 'Client Terminal',
        purpose: 'Validates instant TLS handshake and cipher negotiation on port 853.',
        output: `CONNECTION ESTABLISHED
Protocol version: TLSv1.3
Ciphersuite: TLS_AES_256_GCM_SHA384
Verification: OK`,
      },
    ],
  },
];
