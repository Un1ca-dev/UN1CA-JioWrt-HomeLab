import { QuickStat } from '../types';

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
  owner: 'Suman Sheikh',
  vpsPublicIp: '140.238.244.202',
  jioWrtIp: '192.168.1.1',
  wanIp: '10.103.50.2',
  wanGateway: '10.103.50.1',
  adguardVersion: '0.107.78',
  vpsWgPublicKey: 'oXU65nSKCfc1TfLuFJYUfTZ2y8onxeHwa+prtkCm51U=',
  modulusHash: '13dff6ee5978a97789a3e0e713533be1ebe542e03a4f24c8f54a7cb7363799bf',
};
