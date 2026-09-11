import { TimelineDay } from '../types';

export const timelineDaysData: TimelineDay[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    title: 'JioWrt Foundation & Subnet Mapping',
    subtitle: 'Flashing OpenWrt & Establishing Core Interfaces',
    badge: 'OpenWrt Core',
    status: 'completed',
    goal: 'Turn the stock Jio router into a flexible OpenWrt-based home-lab gateway with root SSH control and customized routing tables.',
    description: 'Replacing the stock ISP firmware with OpenWrt unlocks granular routing and kernel capabilities. We mapped the subnets to isolate home clients, Wi-Fi devices, and identify the upstream Jio WAN interface.',
    networks: [
      { label: 'LAN (br-lan)', value: '192.168.1.1 / 192.168.1.0/24', desc: 'Ethernet-connected workstations, test benches, and wired homelab gear' },
      { label: 'Wi-Fi AP (phy1-ap1)', value: '192.168.10.1 / 192.168.10.0/24', desc: 'Wireless access point subnet for mobile phones, laptops, and IoT devices' },
      { label: 'WAN Interface (wan)', value: '10.103.50.2 / 10.103.50.0/24', desc: 'Jio upstream interface assigned a private non-routable address behind CGNAT' },
      { label: 'WAN Gateway', value: '10.103.50.1', desc: 'Default upstream carrier gateway router for outbound packet traversal' },
    ],
    keyPoints: [
      'Separation of LAN (192.168.1.0/24) and Wi-Fi (192.168.10.0/24) keeps wireless broadcasts isolated.',
      'Recognized that the WAN IP (10.103.50.2) belongs to carrier space — direct inbound traffic from the internet is impossible.',
      'Verified Linux kernel IPv4 forwarding is active (net.ipv4.ip_forward = 1) to enable inter-interface routing.',
    ],
    commands: [
      {
        cmd: 'ip -4 addr show',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Inspects all IPv4 addresses configured across br-lan, phy1-ap1, and the wan interface.',
        why: 'Confirms interface IP assignments before configuring firewall zones or services.',
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
        explanation: 'Displays the active routing table, identifying the default route towards Jio telecom gateway.',
        why: 'Confirms that packets destined for external subnets route properly through the WAN gateway.',
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
        explanation: 'Verifies the Linux kernel packet forwarding flag is enabled (1).',
        why: 'If set to 0, the router will drop transit packets and fail to route LAN traffic to WAN.',
        output: 'net.ipv4.ip_forward = 1',
      },
    ],
  },
  {
    id: 'day-2',
    dayNumber: 2,
    title: 'AdGuard Home v0.107.78 Deployment',
    subtitle: 'Demoting dnsmasq & Claiming Standard Port 53',
    badge: 'DNS Architecture',
    status: 'completed',
    goal: 'Install AdGuard Home v0.107.78 directly on router storage and configure it as the primary LAN DNS resolver on standard port 53, moving dnsmasq to port 5353.',
    description: 'OpenWrt defaults to dnsmasq for DHCP and DNS resolution on port 53. To give AdGuard Home full interception authority without losing local DHCP hostname resolution, we relocated dnsmasq to port 5353 and bound AdGuard Home to :::53.',
    keyPoints: [
      'AdGuard Home version 0.107.78 installed and running as a native daemon on router storage.',
      'dnsmasq remapped to 5353: acts purely as a DHCP coordinator and internal .lan hostname resolver.',
      'AdGuard Home takes :::53 (TCP/UDP) and :::853 (DoT): handles ad-blocking, statistics, and encrypted resolution.',
      'AdGuard Web UI accessible at 192.168.1.1:8080 and encrypted at :8443.',
    ],
    commands: [
      {
        cmd: "netstat -lntup | grep -E '(:53|:853|:8443)'",
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Audits network listeners to ensure AdGuard Home binds properly to standard DNS and TLS ports.',
        why: 'Detects socket conflicts before starting services, ensuring dnsmasq is not occupying port 53.',
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
        explanation: 'Restarts the AdGuard Home service daemon under OpenWrt procd init system.',
        why: 'Applies updated YAML configuration settings from /etc/adguardhome/adguardhome.yaml.',
        output: '[OK] Stopping AdGuardHome daemon...\n[OK] Starting AdGuardHome v0.107.78 on 192.168.1.1...',
      },
      {
        cmd: 'logread | grep -i adguard | tail -30',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Inspects real-time kernel and service logs from OpenWrt circular log buffer.',
        why: 'Ensures no startup panics occurred and checks listening socket bindings.',
        output: `daemon.info AdGuardHome[2145]: [info] AdGuard Home version 0.107.78 is available
daemon.info AdGuardHome[2145]: [info] Listening on :::53 (UDP/TCP)
daemon.info AdGuardHome[2145]: [info] Listening on :::853 (DoT TCP)
daemon.info AdGuardHome[2145]: [info] Listening on 192.168.1.1:8443 (HTTPS Web UI)
daemon.info AdGuardHome[2145]: [info] Initialization complete`,
      },
    ],
  },
  {
    id: 'day-3',
    dayNumber: 3,
    title: 'The TLS Milestone Roadblock',
    subtitle: 'Cryptographic Failure: Public/Private Key Mismatch',
    badge: 'Troubleshooting Milestone',
    status: 'critical-fix',
    goal: 'Enable DNS-over-TLS (DoT on 853) and HTTPS (on 8443) using an ACME certificate — encountering the real-world roadblock.',
    description: 'When loading the certificate files generated for un1ca.dpdns.org, AdGuard Home rejected TLS initialization with a critical cryptographic error. This was an authentic troubleshooting milestone: understanding how key pairs operate.',
    errorLog: {
      raw: 'tls: private key does not match public key',
      explanation: 'The private key file located at /etc/adguardhome/router-key.pem did not contain the mathematical matching private component for the public key embedded in /etc/adguardhome/router-cert.pem. A certificate renewal had written a new public cert while retaining an orphaned private key from an earlier ACME CSR.',
    },
    keyPoints: [
      'Real engineering requires confronting failures head-on rather than masking them.',
      'Android Private DNS refuses connection outright if TLS handshake terminates with an untrusted or broken key pair.',
      'Diagnosed that AdGuard Home validated the RSA/ECDSA modulo upon load and aborted DoT socket binding.',
    ],
    commands: [
      {
        cmd: 'logread | grep -i tls',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Filters router logs to isolate the exact TLS initialization trace.',
        why: 'Pinpoints the exact error message that caused the service to fail TLS binding.',
        output: `daemon.err AdGuardHome[2210]: [error] control/tls: validating certificate: tls: private key does not match public key
daemon.err AdGuardHome[2210]: [error] failed to start TLS server: listening on :853 failed: private key does not match public key`,
      },
    ],
  },
  {
    id: 'day-4',
    dayNumber: 4,
    title: 'The TLS Rectification & Permissions',
    subtitle: 'Pairing Matching ACME Keys & Strict Permissions',
    badge: 'Cryptographic Repair',
    status: 'completed',
    goal: 'Replace mismatched certificate files with the coherent ACME key pair and enforce POSIX least-privilege permissions.',
    description: 'We located the true active ACME output directories under /etc/acme, backed up existing configs to /etc/adguardhome/adguardhome.yaml.tls-bak, copied both the verified public certificate and matching private key, and set strict 600 permissions on the private key.',
    keyPoints: [
      'Configuration backed up to /etc/adguardhome/adguardhome.yaml.tls-bak before editing.',
      'Public certificate copied from /etc/acme/un1ca.dpdns.org/cert.pem to /etc/adguardhome/router-cert.pem.',
      'Private key copied from /etc/acme/private/un1ca.dpdns.org/key.pem to /etc/adguardhome/router-key.pem.',
      'Private keys must be owned by adguardhome:adguardhome with permissions 600 (read/write by owner only).',
      'Certificates (public) are set to 644 (readable by processes, writable only by root).',
    ],
    commands: [
      {
        cmd: '/etc/init.d/adguardhome stop',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Stops the AdGuard Home daemon to avoid file locking while swapping certificates.',
        why: 'Prevents race conditions or half-written certificate states during disk operations.',
      },
      {
        cmd: `cp /etc/adguardhome/router-cert.pem /etc/adguardhome/router-cert.pem.bak
cp /etc/adguardhome/router-key.pem /etc/adguardhome/router-key.pem.bak
cp /etc/adguardhome/adguardhome.yaml /etc/adguardhome/adguardhome.yaml.tls-bak`,
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Creates backups of previous certificate and YAML files.',
        why: 'Safe operational practice allowing quick rollback.',
      },
      {
        cmd: `cp /etc/acme/un1ca.dpdns.org/cert.pem /etc/adguardhome/router-cert.pem
cp /etc/acme/private/un1ca.dpdns.org/key.pem /etc/adguardhome/router-key.pem`,
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Copies the newly verified matching certificate and private key generated by the ACME client.',
        why: 'Ensures both files stem from the identical certificate issuance ceremony.',
      },
      {
        cmd: 'chown adguardhome:adguardhome /etc/adguardhome/router-cert.pem /etc/adguardhome/router-key.pem',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Changes ownership of both certificate files to the adguardhome service user and group.',
        why: 'AdGuard Home runs as an unprivileged service account and cannot read files owned exclusively by root without proper ownership.',
      },
      {
        cmd: `chmod 644 /etc/adguardhome/router-cert.pem
chmod 600 /etc/adguardhome/router-key.pem`,
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Sets 644 on public certificate and strict 600 on private key file.',
        why: 'Crucial security hardening: prevents other unprivileged local users or rogue processes from reading the private key.',
      },
    ],
  },
  {
    id: 'day-5',
    dayNumber: 5,
    title: 'Mathematical Modulus Verification',
    subtitle: 'Proving Key Pair Modulus Parity with OpenSSL',
    badge: 'Mathematical Proof',
    status: 'verified',
    goal: 'Mathematically prove that the public certificate and private key belong to the exact same cryptographic pair before starting services.',
    description: 'We extracted the public key component from both the X.509 certificate and the private key file, encoded them in DER format, and computed their SHA-256 digests. The resulting hash 13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf matched character-for-character.',
    verificationOutput: {
      command: 'openssl sha256 hash comparison',
      output: `Certificate Public Key Hash:
13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf  -

Private Key Public Key Hash:
13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf  -

[MATCH VERIFIED: Key pair is mathematically authentic]`,
      explanation: 'When both SHA-256 hashes match character-for-character, the private key is guaranteed to be capable of signing and decrypting for this certificate.',
    },
    commands: [
      {
        cmd: `openssl x509 -in /etc/adguardhome/router-cert.pem -pubkey -noout | \\
openssl pkey -pubin -outform DER | sha256sum`,
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Extracts the public key from the X.509 certificate and calculates its canonical SHA-256 digest.',
        why: 'Derives the public identity of the certificate without relying on metadata.',
        output: '13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf  -',
      },
      {
        cmd: `openssl pkey -in /etc/adguardhome/router-key.pem -pubout | \\
openssl pkey -pubin -outform DER | sha256sum`,
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Extracts the public key component mathematically derived from the private key and computes its SHA-256 digest.',
        why: 'Proves modulus and exponent match the certificate.',
        output: '13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf  -',
      },
    ],
  },
  {
    id: 'day-6',
    dayNumber: 6,
    title: 'AdGuard TLS Activation & Verification',
    subtitle: 'DNS-over-TLS (853) & HTTPS Admin (8443) Live',
    badge: 'TLS Operational',
    status: 'completed',
    goal: 'Start AdGuard Home with the validated certificates, binding DNS-over-TLS on port 853 and Web UI on HTTPS port 8443.',
    description: 'With matching certificates loaded, AdGuard Home successfully parses the multi-PEM chain, verifies Let\'s Encrypt intermediates, and opens encrypted TLS sockets.',
    keyPoints: [
      'HTTPS Web UI now accessible at https://un1ca.dpdns.org:8443 and 192.168.1.1:8443 with green padlock.',
      'DNS-over-TLS listening on :::853 ready to handle encrypted queries.',
      'Intermediate CA chains (Let\'s Encrypt / YE1) validated without missing link errors.',
    ],
    commands: [
      {
        cmd: '/etc/init.d/adguardhome start && logread | grep -i tls_manager | tail -15',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Launches AdGuard Home and inspects the TLS manager lifecycle log output.',
        why: 'Confirms that certificate chains are successfully ingested into memory.',
        output: `daemon.info AdGuardHome[2390]: [info] tls_manager: parsing multiple pem certificates
daemon.info AdGuardHome[2390]: [info] tls_manager: verifying certificate chain
daemon.info AdGuardHome[2390]: [info] tls_manager: certificate chain is valid for un1ca.dpdns.org
daemon.info AdGuardHome[2390]: [info] webapi: serving url=https://un1ca.dpdns.org:8443
daemon.info AdGuardHome[2390]: [info] starting https server
daemon.info AdGuardHome[2390]: [info] Listening on :::853 (DoT TCP)
daemon.info AdGuardHome[2390]: [info] Listening on 0.0.0.0:8443 (HTTPS TCP)`,
      },
    ],
  },
  {
    id: 'day-7',
    dayNumber: 7,
    title: 'Split-Horizon DNS Architecture',
    subtitle: 'Internal LAN Resolution vs External VPS Routing',
    badge: 'DNS Architecture',
    status: 'completed',
    goal: 'Implement Split DNS so un1ca.dpdns.org resolves directly to 192.168.1.1 on home Wi-Fi/LAN, but resolves to the public Oracle VPS IP (140.238.244.202) when queried externally.',
    description: 'Without split DNS, internal devices trying to access the router\'s domain would route out to the WAN gateway and hit NAT hairpinning loops. With AdGuard Home DNS rewrites, local clients get instantaneous internal IP resolution.',
    keyPoints: [
      'Inside Home Network: un1ca.dpdns.org -> 192.168.1.1 (0.1ms ping, zero WAN bandwidth consumed).',
      'Outside (Public DNS): un1ca.dpdns.org -> 140.238.244.202 (directing cellular traffic to our cloud ingress).',
      'Avoids NAT loopback limitations and ensures seamless HTTPS certificate trust in both environments.',
    ],
    commands: [
      {
        cmd: 'nslookup un1ca.dpdns.org',
        lang: 'bash',
        shellTitle: 'Internal LAN Client (Laptop / Wi-Fi)',
        explanation: 'Queries the local AdGuard Home resolver from a LAN machine.',
        why: 'Confirms that local split-horizon DNS override intercepts the query and serves the LAN IP.',
        output: `Server:    192.168.1.1
Address:   192.168.1.1#53

Name:      un1ca.dpdns.org
Address:   192.168.1.1`,
      },
      {
        cmd: 'dig +short un1ca.dpdns.org',
        lang: 'bash',
        shellTitle: 'External Public DNS Query',
        explanation: 'Performs a direct DNS query against public authoritative nameservers.',
        why: 'Confirms that public internet resolves un1ca.dpdns.org to the Oracle VPS public IP.',
        output: '140.238.244.202',
      },
      {
        cmd: 'nslookup un1ca.dpdns.org 1.1.1.1',
        lang: 'bash',
        shellTitle: 'Public Resolver Check (Cloudflare 1.1.1.1)',
        explanation: 'Queries an external public DNS resolver to verify global authoritative propagation.',
        why: 'Proves that public internet devices resolve un1ca.dpdns.org to our public cloud entrypoint.',
        output: `Server:    1.1.1.1
Address:   1.1.1.1#53

Non-authoritative answer:
Name:      un1ca.dpdns.org
Address:   140.238.244.202`,
      },
    ],
  },
  {
    id: 'day-8',
    dayNumber: 8,
    title: 'The CGNAT Challenge & Architecture',
    subtitle: 'Overcoming Private Carrier-Grade NAT (10.103.50.2)',
    badge: 'CGNAT Traversal',
    status: 'completed',
    goal: 'Analyze why the Jio WAN cannot accept direct incoming DoT connections from mobile cellular data and design the reverse tunnel architecture.',
    description: 'Jio fiber allocates non-routable private IP address 10.103.50.2 behind Carrier-Grade NAT (RFC 6598). Because the carrier firewall drops all unsolicited inbound packets, opening ports on the Jio router is ineffective. We designed a reverse WireGuard architecture anchoring to a public cloud VPS.',
    keyPoints: [
      'Problem: The public internet cannot initiate a connection into JioWrt behind 10.103.50.2 CGNAT.',
      'Solution: JioWrt initiates an outbound persistent WireGuard connection to public Oracle VPS (140.238.244.202).',
      'Result: Inbound cellular traffic enters the VPS public IP, which is DNAT-relayed backwards through the tunnel into JioWrt.',
    ],
    commands: [
      {
        cmd: 'ip -4 addr show dev wan && ip -4 route show | grep default',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Audits the WAN interface IP and default upstream gateway.',
        why: 'Demonstrates that the router WAN IP (10.103.50.2) is within private space, proving CGNAT presence.',
        output: `4: wan: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP
    inet 10.103.50.2/24 brd 10.103.50.255 scope global wan
default via 10.103.50.1 dev wan`,
      },
    ],
  },
  {
    id: 'day-9',
    dayNumber: 9,
    title: 'Oracle Cloud VPS Provisioning',
    subtitle: 'Ubuntu 20.04.6 LTS & WireGuard Server (wg0)',
    badge: 'Cloud Infrastructure',
    status: 'completed',
    goal: 'Deploy an Oracle Cloud Always Free VPS (140.238.244.202), configure network interface ens3, and set up WireGuard server wg0 on 10.200.0.1/24.',
    description: 'Provisioned an Ubuntu 20.04.6 LTS cloud instance. Configured WireGuard wg0 on 10.200.0.1/24 with public key oXU65nSKCfc1TfLuFJYUfTZ2y8onxeHwa+prtkCm51U= awaiting the connection from JioWrt (10.200.0.2).',
    keyPoints: [
      'Host OS: Ubuntu 20.04.6 LTS, Interface ens3 (internal vNIC 10.0.0.90/24 with 1:1 public IP mapping 140.238.244.202).',
      'WireGuard wg0 address: 10.200.0.1/24 listening on UDP port 51820.',
      'VPS Public Key: oXU65nSKCfc1TfLuFJYUfTZ2y8onxeHwa+prtkCm51U=.',
      'Configured WireGuard peer for JioWrt with AllowedIPs = 10.200.0.0/24.',
    ],
    commands: [
      {
        cmd: 'sudo ip -4 addr show ens3 && sudo ip -4 addr show wg0',
        lang: 'bash',
        shellTitle: 'Oracle VPS (Ubuntu 20.04.6 LTS)',
        explanation: 'Audits network interfaces on the Oracle VPS instance.',
        why: 'Confirms both the cloud virtual network interface and the WireGuard tunnel interface are operational.',
        output: `2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 9000 qdisc mq state UP
    inet 10.0.0.90/24 brd 10.0.0.255 scope global ens3
3: wg0: <POINTOPOINT,NOARP,UP,LOWER_UP> mtu 1420 qdisc noqueue state UNKNOWN
    inet 10.200.0.1/24 scope global wg0`,
      },
      {
        cmd: 'sudo wg show wg0',
        lang: 'bash',
        shellTitle: 'Oracle VPS (Ubuntu 20.04.6 LTS)',
        explanation: 'Inspects active WireGuard interfaces, listening ports, and configured peers on the VPS.',
        why: 'Verifies the server is ready to accept handshakes on UDP port 51820.',
        output: `interface: wg0
  public key: oXU65nSKCfc1TfLuFJYUfTZ2y8onxeHwa+prtkCm51U=
  private key: (hidden)
  listening port: 51820

peer: [REDACTED_JIOWRT_PUBLIC_KEY]
  allowed ips: 10.200.0.0/24`,
      },
    ],
  },
  {
    id: 'day-10',
    dayNumber: 10,
    title: 'WireGuard Tunnel Piercing Across CGNAT',
    subtitle: 'Establishing the wg_oracle Link (10.200.0.2)',
    badge: 'WireGuard Mesh',
    status: 'completed',
    goal: 'Establish the point-to-point tunnel between JioWrt (interface wg_oracle, 10.200.0.2) and Oracle VPS (interface wg0, 10.200.0.1).',
    description: 'We configured OpenWrt network interface wg_oracle (listening port 60353), configured the endpoint to point to the Oracle VPS public IP (140.238.244.202:51820), and set PersistentKeepalive = 25. This forces Jio\'s stateful NAT tables to keep the outbound pinhole permanently open.',
    keyPoints: [
      'JioWrt WireGuard interface: wg_oracle (IP: 10.200.0.2/24, port: 60353).',
      'VPS Endpoint: 140.238.244.202:51820 with AllowedIPs = 10.200.0.0/24.',
      'PersistentKeepalive = 25 sends dummy UDP packets every 25 seconds, preventing NAT timeouts.',
      'Route: 10.200.0.0/24 dev wg_oracle; host route: 140.238.244.202 via 10.103.50.1 dev wan.',
    ],
    commands: [
      {
        cmd: 'wg show wg_oracle',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Inspects WireGuard tunnel status and real-time transfer counters from the router.',
        why: 'Proves the tunnel has successfully shaken hands and packets are traversing in both directions.',
        output: `interface: wg_oracle
  public key: [REDACTED_JIOWRT_PUBLIC_KEY]
  private key: (hidden)
  listening port: 60353

peer: oXU65nSKCfc1TfLuFJYUfTZ2y8onxeHwa+prtkCm51U=
  endpoint: 140.238.244.202:51820
  allowed ips: 10.200.0.0/24
  latest handshake: 14 seconds ago
  transfer: 42.18 MiB received, 18.94 MiB sent
  persistent keepalive: every 25 seconds`,
      },
      {
        cmd: 'ip -4 route show | grep 10.200.0',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Verifies the kernel routing table directs the 10.200.0.0/24 subnet to the wg_oracle interface.',
        why: 'Without this route, reply packets back to the VPS would follow the default WAN route and get lost.',
        output: '10.200.0.0/24 dev wg_oracle proto kernel scope link src 10.200.0.2',
      },
    ],
  },
  {
    id: 'day-11',
    dayNumber: 11,
    title: 'VPS Port Forwarding & NAT Relay',
    subtitle: 'The 5-Rule iptables Forwarding Pipeline',
    badge: 'DevOps & Linux Networking',
    status: 'completed',
    goal: 'Configure iptables on the Oracle VPS to forward inbound DNS-over-TLS (TCP port 853) traffic arriving on ens3 across WireGuard to JioWrt (10.200.0.2:853).',
    description: 'Incoming DoT packets arrive at the VPS public IP (140.238.244.202). We built an atomic iptables pipeline enabling kernel IP forwarding, performing PREROUTING Destination NAT (DNAT), allowing stateful conntrack forwarding between interfaces, and executing POSTROUTING MASQUERADE.',
    keyPoints: [
      'Rule 1: sysctl ip_forward=1 enables transit packet routing between ens3 and wg0.',
      'Rule 2: PREROUTING DNAT intercepts incoming TCP 853 and rewrites target destination to 10.200.0.2:853.',
      'Rule 3 & 4: FORWARD rules permit stateful transit for NEW, ESTABLISHED, and RELATED packets in both directions.',
      'Rule 5: POSTROUTING MASQUERADE rewrites source IP so replies route back through the WireGuard interface.',
    ],
    commands: [
      {
        cmd: 'sudo sysctl -w net.ipv4.ip_forward=1',
        lang: 'bash',
        shellTitle: 'Oracle VPS (Ubuntu 20.04.6 LTS)',
        explanation: 'Enables IPv4 forwarding in the Linux kernel on the cloud VPS.',
        why: 'Required by the Linux network stack to route packets between disparate interfaces (ens3 and wg0).',
        output: 'net.ipv4.ip_forward = 1',
      },
      {
        cmd: `sudo iptables -t nat -A PREROUTING -i ens3 \\
-p tcp --dport 853 \\
-j DNAT --to-destination 10.200.0.2:853`,
        lang: 'bash',
        shellTitle: 'Oracle VPS (Ubuntu 20.04.6 LTS)',
        explanation: 'Destination NAT: Any TCP packet entering public interface ens3 on port 853 has its destination IP rewritten to JioWrt wg_oracle IP (10.200.0.2:853).',
        why: 'The core translation mechanism that steers external mobile queries into our private home tunnel.',
      },
      {
        cmd: `sudo iptables -A FORWARD -i ens3 -o wg0 \\
-p tcp -d 10.200.0.2 --dport 853 \\
-m conntrack --ctstate NEW,ESTABLISHED,RELATED -j ACCEPT`,
        lang: 'bash',
        shellTitle: 'Oracle VPS (Ubuntu 20.04.6 LTS)',
        explanation: 'Authorizes iptables firewall to pass matched packets arriving on ens3 forward into WireGuard interface wg0.',
        why: 'Default cloud firewall policies drop forwarded packets; this rule explicitly permits DoT traffic.',
      },
      {
        cmd: `sudo iptables -A FORWARD -i wg0 -o ens3 \\
-p tcp -s 10.200.0.2 --sport 853 \\
-m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT`,
        lang: 'bash',
        shellTitle: 'Oracle VPS (Ubuntu 20.04.6 LTS)',
        explanation: 'Allows response packets originating from JioWrt (10.200.0.2:853) to pass back out through ens3 to the mobile client.',
        why: 'Maintains bidirectional TCP session state for DoT handshakes.',
      },
      {
        cmd: `sudo iptables -t nat -A POSTROUTING -o wg0 \\
-p tcp -d 10.200.0.2 --dport 853 \\
-j MASQUERADE`,
        lang: 'bash',
        shellTitle: 'Oracle VPS (Ubuntu 20.04.6 LTS)',
        explanation: 'Source NAT (SNAT/MASQUERADE): Rewrites source IP on packets entering the tunnel to 10.200.0.1.',
        why: 'Ensures JioWrt sends DoT reply packets back to the VPS tunnel endpoint rather than attempting direct WAN routing.',
      },
      {
        cmd: 'sudo iptables -t nat -L PREROUTING -n -v | grep 853',
        lang: 'bash',
        shellTitle: 'Oracle VPS (Ubuntu 20.04.6 LTS)',
        explanation: 'Inspects packet and byte counters for the port 853 DNAT rule in the PREROUTING table.',
        why: 'Provides real-time confirmation that inbound packets are hitting the rule and being forwarded.',
        output: ' 1248   74880 DNAT  tcp  --  ens3  *  0.0.0.0/0  0.0.0.0/0  tcp dpt:853 to:10.200.0.2:853',
      },
    ],
  },
  {
    id: 'day-12',
    dayNumber: 12,
    title: 'JioWrt OpenWrt Firewall Rules',
    subtitle: 'Allow-AdGuard-DoT & AdGuard-DoH-8443 Redirect',
    badge: 'Firewall Policy',
    status: 'completed',
    goal: 'Configure OpenWrt UCI firewall rules to accept forwarded DoT packets arriving from the WireGuard tunnel and redirect management port 8443.',
    description: 'By default, OpenWrt firewall drops unsolicited packets from external zones. We defined the Allow-AdGuard-DoT rule in /etc/config/firewall to accept incoming TCP 853 and configured management redirect AdGuard-DoH-8443.',
    keyPoints: [
      'UCI rule Allow-AdGuard-DoT: src: wan, proto: tcp, dest_port: 853, target: ACCEPT.',
      'Redirect AdGuard-DoH-8443: src: wan, src_dport: 8443, dest: lan, dest_ip: 192.168.1.1, dest_port: 8443.',
      'Firewall zone association ensures wg_oracle traffic is treated with appropriate trust level.',
    ],
    commands: [
      {
        cmd: "uci show firewall | grep -E '853|8443'",
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Inspects all UCI firewall definitions referencing DoT (853) and HTTPS management (8443).',
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
        explanation: 'Displays the complete configuration block for firewall rule index 9.',
        why: 'Verifies proto, target, and port parameters are precisely aligned.',
        output: `firewall.@rule[9]=rule
firewall.@rule[9].name='Allow-AdGuard-DoT'
firewall.@rule[9].src='wan'
firewall.@rule[9].dest_port='853'
firewall.@rule[9].proto='tcp'
firewall.@rule[9].target='ACCEPT'`,
      },
    ],
  },
  {
    id: 'day-13',
    dayNumber: 13,
    title: 'Android Private DNS Integration',
    subtitle: 'Zero-App Cellular Ad-Blocking Over DoT',
    badge: 'Client Integration',
    status: 'completed',
    goal: 'Configure native Android Private DNS with un1ca.dpdns.org, verifying the entire end-to-end packet journey across cellular 5G.',
    description: 'Android requires no background battery-draining apps. By entering un1ca.dpdns.org in Android Private DNS settings, Android initiates a TLS handshake directly on TCP port 853. The connection travels: Android -> Mobile Network -> 140.238.244.202 (VPS) -> wg0 -> 10.200.0.2 (JioWrt) -> AdGuard Home.',
    keyPoints: [
      'Android Settings -> Network & Internet -> Private DNS -> Hostname: un1ca.dpdns.org.',
      'Strict SNI verification: Android verifies the hostname in the TLS Server Hello against Let\'s Encrypt SAN.',
      'If any link in the chain fails (wrong port, expired cert, dropped packet), Android reports "Couldn\'t connect" — but our pipeline reports instant success.',
    ],
    commands: [
      {
        cmd: 'tail -f /var/log/adguardhome.log | grep -E "DoT|un1ca"',
        lang: 'bash',
        shellTitle: 'JioWrt Live Query Monitor',
        explanation: 'Monitors incoming DNS queries arriving over DNS-over-TLS from remote cellular clients.',
        why: 'Proves mobile phone requests are reaching AdGuard Home and being actively filtered in real time.',
        output: `2026/09/13 18:42:01 [info] 10.200.0.1:48212: processing DoT request "graph.instagram.com." [A]
2026/09/13 18:42:01 [info] 10.200.0.1:48212: request was filtered: "graph.instagram.com." matched blocklist (0.0.0.0)
2026/09/13 18:42:02 [info] 10.200.0.1:48212: processing DoT request "api.github.com." [A]
2026/09/13 18:42:02 [info] 10.200.0.1:48212: forwarded to upstream 1.1.1.1:53 -> 140.82.121.6`,
      },
    ],
  },
  {
    id: 'day-14',
    dayNumber: 14,
    title: 'End-to-End Cryptographic Validation',
    subtitle: 'Rigorous OpenSSL s_client Validation',
    badge: 'Quality Assurance',
    status: 'verified',
    goal: 'Execute automated external and local TLS handshakes to verify certificate chain authority, SNI negotiation, and return codes.',
    description: 'We tested the full loop using openssl s_client against un1ca.dpdns.org:853 both externally over the internet and locally over LAN to guarantee RFC compliance.',
    verificationOutput: {
      command: 'openssl s_client -connect un1ca.dpdns.org:853 -servername un1ca.dpdns.org',
      output: `CONNECTED(00000003)
depth=2 C = US, O = Internet Security Research Group, CN = ISRG Root X1
verify return:1
depth=1 C = US, O = Let's Encrypt, CN = YE1
verify return:1
depth=0 CN = un1ca.dpdns.org
verify return:1
---
Certificate chain
 0 s:CN = un1ca.dpdns.org
   i:C = US, O = Let's Encrypt, CN = YE1
 1 s:C = US, O = Let's Encrypt, CN = YE1
   i:C = US, O = Internet Security Research Group, CN = ISRG Root X1
---
Server certificate
-----BEGIN CERTIFICATE-----
[REDACTED_PUBLIC_CERTIFICATE_CONTENT]
-----END CERTIFICATE-----
subject=CN = un1ca.dpdns.org
issuer=C = US, O = Let's Encrypt, CN = YE1
---
No client certificate CA names sent
Peer signing digest: SHA256
Server Temp Key: X25519, 253 bits
---
SSL handshake has read 3218 bytes and written 394 bytes
Verification: OK
Verify return code: 0 (ok)`,
      explanation: 'Return code 0 (ok) proves the certificate is trusted, non-expired, and has a complete unbroken chain back to ISRG Root X1.',
    },
    commands: [
      {
        cmd: `openssl s_client \\
-connect un1ca.dpdns.org:853 \\
-servername un1ca.dpdns.org`,
        lang: 'bash',
        shellTitle: 'External Internet Terminal',
        explanation: 'Performs a live TLS handshake against the DoT port with Server Name Indication (SNI).',
        why: 'Simulates the exact TLS negotiation performed by Android Private DNS.',
        output: `CONNECTED(00000003)
subject=CN=un1ca.dpdns.org
issuer=C=US, O=Let's Encrypt, CN=YE1
---
SSL handshake has read 3218 bytes and written 394 bytes
Verify return code: 0 (ok)`,
      },
      {
        cmd: `openssl s_client \\
-connect 192.168.1.1:853 \\
-servername un1ca.dpdns.org`,
        lang: 'bash',
        shellTitle: 'Local Home LAN Terminal',
        explanation: 'Performs a direct TLS handshake against the router LAN IP passing the same SNI hostname.',
        why: 'Verifies that local Wi-Fi clients also receive the identical trusted certificate without warnings.',
        output: `CONNECTED(00000003)
subject=CN=un1ca.dpdns.org
issuer=C=US, O=Let's Encrypt, CN=YE1
Verify return code: 0 (ok)`,
      },
    ],
  },
];

export const finalVerificationStatus = {
  title: 'Final Architectural Operational State',
  summary: 'All subsystems verified across cellular mobile and local wireless environments by Suman Sheikh.',
  checks: [
    { label: 'Wi-Fi Private DNS', status: 'WORKING', detail: 'Resolves via Split DNS to 192.168.1.1 in < 1ms' },
    { label: 'Mobile Network Private DNS', status: 'WORKING', detail: 'Traverses Oracle VPS (140.238.244.202) & WireGuard over 4G/5G' },
    { label: 'AdGuard DNS Queries', status: 'RECEIVING', detail: 'Ad-blocking and telemetry filtering active 24/7 on v0.107.78' },
    { label: 'TLS Cryptographic Chain', status: 'VALID', detail: 'Modulus hash (13dff6ee...) verified; return code: 0 (ok)' },
    { label: 'CA Certificate Authority', status: 'LET\'S ENCRYPT', detail: 'Full chain to ISRG Root X1 trusted by Android OS' },
    { label: 'WireGuard Ingress Tunnel', status: 'CONNECTED', detail: 'wg_oracle (10.200.0.2) to VPS (10.200.0.1:51820)' },
    { label: 'Cloudflare WARP Egress', status: 'CONNECTED', detail: 'wg_vpn independent egress to 162.159.192.1:2408' },
    { label: 'CGNAT Barrier', status: 'BYPASSED', detail: 'Reverse DNAT forwarding over private overlay' },
  ],
};
