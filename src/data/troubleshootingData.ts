import { TroubleshootingItem } from '../types';

export const troubleshootingData: TroubleshootingItem[] = [
  {
    id: 'ts-key-mismatch',
    problem: 'Private key does not match public key (tls error)',
    category: 'TLS',
    severity: 'high',
    symptom: 'AdGuard Home crashes or logs "tls: private key does not match public key". Port 853 and 8443 fail to open.',
    cause: 'The active X.509 certificate file (/etc/adguardhome/router-cert.pem) and private key file (/etc/adguardhome/router-key.pem) were generated from different ACME issuance runs.',
    solution: 'Back up both files, copy the coherent certificate and matching private key from /etc/acme/un1ca.dpdns.org/cert.pem and /etc/acme/private/un1ca.dpdns.org/key.pem, ensure ownership is adguardhome:adguardhome (chmod 644/600), and verify modulus hash equivalence with openssl.',
    commands: [
      {
        cmd: `openssl x509 -in /etc/adguardhome/router-cert.pem -pubkey -noout | \\
openssl pkey -pubin -outform DER | sha256sum`,
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Computes SHA-256 hash of the public key inside the certificate.',
        output: '13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf  -',
      },
      {
        cmd: `openssl pkey -in /etc/adguardhome/router-key.pem -pubout | \\
openssl pkey -pubin -outform DER | sha256sum`,
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Computes SHA-256 hash of the public key derived from the private key. Both must match 13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf.',
        output: '13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf  -',
      },
      {
        cmd: 'logread | grep -i tls_manager',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Confirms TLS startup success and certificate chain validation.',
        output: `daemon.info AdGuardHome[2390]: [info] tls_manager: parsing multiple pem certificates
daemon.info AdGuardHome[2390]: [info] tls_manager: verifying certificate chain
daemon.info AdGuardHome[2390]: [info] tls_manager: certificate chain is valid for un1ca.dpdns.org
daemon.info AdGuardHome[2390]: [info] webapi: serving url=https://un1ca.dpdns.org:8443
daemon.info AdGuardHome[2390]: [info] starting https server`,
      },
    ],
  },
  {
    id: 'ts-wifi-vs-mobile',
    problem: 'Wi-Fi Private DNS works, but Mobile Cellular network fails',
    category: 'CGNAT',
    severity: 'high',
    symptom: 'Android displays "Couldn\'t connect" or "No internet" when leaving home Wi-Fi and connecting over 4G/5G mobile data.',
    cause: 'Split DNS resolves properly on local Wi-Fi, but external cellular traffic is either dropped by the Oracle VPS firewall, missing WireGuard persistent keepalives, or iptables DNAT counters are zero.',
    solution: 'Verify public DNS record un1ca.dpdns.org returns 140.238.244.202. Verify WireGuard tunnel handshake on both VPS and JioWrt. Check iptables PREROUTING DNAT rules on VPS.',
    commands: [
      {
        cmd: 'dig +short un1ca.dpdns.org',
        lang: 'bash',
        shellTitle: 'External DNS Verification',
        explanation: 'Confirm public DNS returns the Oracle VPS public IP address (140.238.244.202).',
        output: '140.238.244.202',
      },
      {
        cmd: 'sudo iptables -t nat -L PREROUTING -n -v | grep 853',
        lang: 'bash',
        shellTitle: 'Oracle VPS Terminal',
        explanation: 'Check if packet counters increment when mobile device queries Private DNS.',
        output: ' 1248   74880 DNAT  tcp  --  ens3  *  0.0.0.0/0  0.0.0.0/0  tcp dpt:853 to:10.200.0.2:853',
      },
      {
        cmd: 'wg show wg_oracle',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Ensure latest handshake is under 120 seconds and persistent keepalive is set to 25.',
      },
    ],
  },
  {
    id: 'ts-adguard-port53',
    problem: 'AdGuard Home is not listening on Port 53',
    category: 'AdGuard',
    severity: 'high',
    symptom: 'LAN devices have no internet access or fallback to secondary DNS. AdGuard Home logs "bind: address already in use".',
    cause: 'dnsmasq was not moved to port 5353 and is holding port 53 exclusively.',
    solution: 'Configure dnsmasq to listen on port 5353 in /etc/config/dhcp, restart dnsmasq, and restart AdGuard Home.',
    commands: [
      {
        cmd: "netstat -lntup | grep -E '(:53|:853|:8443)'",
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Check which process PID currently binds to UDP/TCP port 53.',
      },
      {
        cmd: `uci set dhcp.@dnsmasq[0].port='5353'
uci commit dhcp
/etc/init.d/dnsmasq restart
/etc/init.d/adguardhome restart`,
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Rebinds dnsmasq to 5353 and clears port 53 for AdGuard Home.',
      },
    ],
  },
  {
    id: 'ts-wireguard-down',
    problem: 'WireGuard tunnel shows zero transfer or no handshake',
    category: 'WireGuard',
    severity: 'high',
    symptom: 'wg show on JioWrt shows no "latest handshake" timestamp or 0 bytes received from VPS peer.',
    cause: 'UDP 51820 dropped by Oracle Cloud Security List/NSG, mismatched public keys, or wrong endpoint IP.',
    solution: 'Verify Oracle Cloud Ingress Rules allow UDP port 51820 on 0.0.0.0/0. Verify WireGuard peer public keys (VPS: oXU65nSKCfc1TfLuFJYUfTZ2y8onxeHwa+prtkCm51U=) and ensure PersistentKeepalive = 25 is present.',
    commands: [
      {
        cmd: 'wg show wg_oracle',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Review handshake time, endpoint host (140.238.244.202:51820), and allowed IPs on router.',
      },
      {
        cmd: 'sudo iptables -L INPUT -n -v | grep 51820',
        lang: 'bash',
        shellTitle: 'Oracle VPS Terminal',
        explanation: 'Confirm that UDP 51820 is permitted in the VPS Linux firewall.',
      },
    ],
  },
  {
    id: 'ts-vps-forwarding-853',
    problem: 'VPS receives packets on Port 853 but does not forward them',
    category: 'CGNAT',
    severity: 'medium',
    symptom: 'Mobile connection hangs during TLS handshake; packet capture on JioWrt shows no incoming traffic on wg_oracle.',
    cause: 'Kernel IPv4 forwarding is disabled (net.ipv4.ip_forward = 0) or FORWARD table drops transit packets between ens3 and wg0.',
    solution: 'Enable net.ipv4.ip_forward in sysctl and append conntrack stateful ACCEPT rules to the FORWARD iptables chain.',
    commands: [
      {
        cmd: 'cat /proc/sys/net/ipv4/ip_forward',
        lang: 'bash',
        shellTitle: 'Oracle VPS Terminal',
        explanation: 'Must return 1. If 0, kernel silently discards transit packets.',
      },
      {
        cmd: `sudo iptables -A FORWARD -i ens3 -o wg0 -p tcp -d 10.200.0.2 --dport 853 -m conntrack --ctstate NEW,ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A FORWARD -i wg0 -o ens3 -p tcp -s 10.200.0.2 --sport 853 -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT`,
        lang: 'bash',
        shellTitle: 'Oracle VPS Terminal',
        explanation: 'Authorizes two-way traffic flow between cloud NIC and WireGuard overlay.',
      },
    ],
  },
  {
    id: 'ts-cert-warning',
    problem: 'Certificate warning or untrusted authority on Android / Browser',
    category: 'TLS',
    severity: 'medium',
    symptom: 'Browser flags "Your connection is not private" or Android rejects Private DNS hostname.',
    cause: 'Incomplete certificate chain served by AdGuard Home or expired Let\'s Encrypt certificate.',
    solution: 'Ensure fullchain.pem is loaded rather than leaf cert.pem alone, and verify date validity via OpenSSL.',
    commands: [
      {
        cmd: `openssl s_client -connect un1ca.dpdns.org:853 -servername un1ca.dpdns.org < /dev/null 2>&1 | \\
grep -E "Verify return code|issuer|depth"`,
        lang: 'bash',
        shellTitle: 'External Client Terminal',
        explanation: 'Verifies the full trust hierarchy up to ISRG Root X1.',
      },
      {
        cmd: 'openssl x509 -in /etc/adguardhome/router-cert.pem -noout -dates',
        lang: 'bash',
        shellTitle: 'JioWrt OpenWrt Shell',
        explanation: 'Confirms notBefore and notAfter timestamps on the active certificate.',
      },
    ],
  },
  {
    id: 'ts-dns-unexpected-ip',
    problem: 'DNS resolves to an unexpected or stale IP address',
    category: 'DNS',
    severity: 'info',
    symptom: 'nslookup returns a stale IP address or queries fail to hit the router when inside the home network.',
    cause: 'DNS cache on client device has not expired, or dynamic DNS (dpdns) record has not updated to 140.238.244.202.',
    solution: 'Flush client OS DNS cache, verify DDNS update client logs, and test direct lookup against authoritative nameserver.',
    commands: [
      {
        cmd: 'dig +short un1ca.dpdns.org',
        lang: 'bash',
        shellTitle: 'External Client Terminal',
        explanation: 'Verifies global DNS record points to 140.238.244.202.',
      },
      {
        cmd: 'nslookup un1ca.dpdns.org 192.168.1.1',
        lang: 'bash',
        shellTitle: 'Home LAN Terminal',
        explanation: 'Confirms internal Split DNS override answers with 192.168.1.1.',
      },
    ],
  },
];
