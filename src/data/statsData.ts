import { QuickStat } from '../types';

export interface HomeLabMetric {
  value: string;
  count: number;
  label: string;
  sublabel: string;
  description: string;
  iconName: string;
  color: string;
}

export const homeLabMetrics: HomeLabMetric[] = [
  {
    value: '1',
    count: 1,
    label: 'Router',
    sublabel: 'JioWrt / OpenWrt',
    description: 'Unlocked Jio hardware running OpenWrt with root Linux control and iptables',
    iconName: 'Cpu',
    color: 'sky',
  },
  {
    value: '1',
    count: 1,
    label: 'VPS',
    sublabel: 'Oracle Cloud VPS',
    description: 'Ubuntu 20.04 cloud node (140.238.244.202) acting as public ingress anchor',
    iconName: 'Server',
    color: 'indigo',
  },
  {
    value: '1',
    count: 1,
    label: 'WireGuard Network',
    sublabel: '10.200.0.0/24 Subnet',
    description: 'Encrypted tunnel linking JioWrt (10.200.0.2) to VPS (10.200.0.1) across CGNAT',
    iconName: 'Network',
    color: 'emerald',
  },
  {
    value: '1',
    count: 1,
    label: 'AdGuard Home',
    sublabel: 'v0.107.78 Instance',
    description: 'Central DNS resolver handling port 53 LAN queries, port 853 DoT, and 8443 UI',
    iconName: 'Shield',
    color: 'teal',
  },
  {
    value: '1',
    count: 1,
    label: 'Custom DNS Hostname',
    sublabel: 'un1ca.dpdns.org',
    description: 'Dynamic DNS identity bound to Let\'s Encrypt TLS for Android Private DNS',
    iconName: 'Globe',
    color: 'purple',
  },
  {
    value: '1',
    count: 1,
    label: 'Cloudflare Website',
    sublabel: 'un1ca.qzz.io',
    description: 'Production documentation portal deployed on Cloudflare Pages with edge CDN',
    iconName: 'Cloud',
    color: 'amber',
  },
];

export const quickStatsData: QuickStat[] = [
  {
    label: 'Standard DNS Resolver',
    value: '53',
    port: 53,
    protocol: 'TCP / UDP (:::53)',
    description: 'AdGuard Home v0.107.78 core recursive ad-blocking and filtering socket',
    status: 'online',
    iconName: 'Shield',
  },
  {
    label: 'DNS-over-TLS (DoT)',
    value: '853',
    port: 853,
    protocol: 'TCP / TLS (:::853)',
    description: 'Encrypted endpoint for Android Private DNS via un1ca.dpdns.org',
    status: 'active',
    iconName: 'Lock',
  },
  {
    label: 'HTTPS Web Management',
    value: '8443',
    port: 8443,
    protocol: 'TCP / HTTPS',
    description: 'Encrypted admin UI (https://un1ca.dpdns.org:8443 & 192.168.1.1:8443)',
    status: 'online',
    iconName: 'Globe',
  },
  {
    label: 'WireGuard VPS Endpoint',
    value: '51820',
    port: 51820,
    protocol: 'UDP / wg0',
    description: 'Oracle VPS listener (140.238.244.202:51820, JioWrt port: 60353)',
    status: 'online',
    iconName: 'Terminal',
  },
  {
    label: 'JioWrt Gateway LAN',
    value: '192.168.1.1',
    protocol: 'IPv4 / br-lan',
    description: 'Core OpenWrt router (LAN: 192.168.1.1, Wi-Fi: 192.168.10.1 on phy1-ap1)',
    status: 'online',
    iconName: 'Cpu',
  },
  {
    label: 'WireGuard Mesh Subnet',
    value: '10.200.0.0/24',
    protocol: 'WireGuard Tunnel',
    description: 'VPS: 10.200.0.1, JioWrt: 10.200.0.2 (PersistentKeepalive = 25s)',
    status: 'online',
    iconName: 'Network',
  },
];

export const heroMetaStats = {
  hostname: 'un1ca.dpdns.org',
  status: 'Online / Protected',
  domain: 'un1ca.qzz.io',
  owner: 'Suman Sheikh',
  role: 'Home Lab Builder • Linux & Networking Enthusiast',
  tagline: 'From a Jio Router to a complete self-hosted Home Lab.',
  uptime: '99.98%',
  latency: '22ms',
  blockedToday: '14,892',
};
