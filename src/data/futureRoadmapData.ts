export interface RoadmapItem {
  id: string;
  title: string;
  category: 'Networking' | 'Monitoring' | 'Automation' | 'Security' | 'Cloud';
  description: string;
  status: 'configured' | 'planned';
  priority: 'High' | 'Medium' | 'Low';
  details: string;
}

export const roadmapItems: RoadmapItem[] = [
  {
    id: 'plan-cf-tunnel',
    title: 'Cloudflare Tunnel (cloudflared)',
    category: 'Cloud',
    description: 'Deploy zero-trust cloudflared daemon on JioWrt to expose select internal web dashboards without open inbound ports.',
    status: 'planned',
    priority: 'High',
    details: 'Will allow accessing OpenWrt LuCI and AdGuard web interface securely via Cloudflare Access identity verification.',
  },
  {
    id: 'plan-grafana',
    title: 'Grafana Telemetry Dashboard',
    category: 'Monitoring',
    description: 'Rich graphical dashboards visualizing DNS query rates, blocked telemetry percentage, and latency percentiles.',
    status: 'planned',
    priority: 'High',
    details: 'Will display query spikes, top queried domains, and WireGuard throughput metrics in real time.',
  },
  {
    id: 'plan-prometheus',
    title: 'Prometheus Metrics Exporter',
    category: 'Monitoring',
    description: 'Scraping metrics from OpenWrt collectd, AdGuard Home exporter, and WireGuard kernel stats into a time-series database.',
    status: 'planned',
    priority: 'Medium',
    details: 'Prometheus instance hosted on the Oracle VPS pulling metrics securely over the 10.200.0.0/24 WireGuard tunnel.',
  },
  {
    id: 'plan-uptime',
    title: 'Automated Uptime Kuma Monitoring',
    category: 'Monitoring',
    description: '24/7 automated ping, TCP 853 port probe, and DNS resolution health checks with push notifications on failure.',
    status: 'planned',
    priority: 'High',
    details: 'Sends instant alerts to Telegram / Discord if the WireGuard tunnel drops or if Let\'s Encrypt certificates near expiration.',
  },
  {
    id: 'plan-backups',
    title: 'Automated Nightly Configuration Backups',
    category: 'Automation',
    description: 'Automated cron scripts generating encrypted tarballs of /etc/config, adguardhome.yaml, and ACME keys backed up to private S3.',
    status: 'planned',
    priority: 'Medium',
    details: 'Ensures instantaneous router disaster recovery with one-command restoration scripts.',
  },
  {
    id: 'plan-filtering',
    title: 'Extended Threat Intelligence Filtering',
    category: 'Security',
    description: 'Ingesting advanced threat feeds including OISD Full, HaGeZi Pro++, and curated malicious C2 domain blocklists.',
    status: 'configured',
    priority: 'High',
    details: 'Currently running optimized standard blocklists with sub-millisecond RAM matching, planned for dynamic automated feed updates.',
  },
  {
    id: 'plan-vlans',
    title: 'VLAN Segmentation (802.1Q)',
    category: 'Networking',
    description: 'Physical and wireless network isolation partitioning Trusted LAN, Guest Wi-Fi, and untrusted Smart Home IoT devices.',
    status: 'planned',
    priority: 'High',
    details: 'Assigns isolated subnets (e.g. 192.168.20.0/24 for IoT) preventing compromised smart devices from scanning the main lab.',
  },
  {
    id: 'plan-iot-isolation',
    title: 'Strict IoT Firewall Policies & mDNS Reflector',
    category: 'Security',
    description: 'Drop IoT outbound internet access where unneeded and reflect multicast DNS (Avahi/umdns) for casting.',
    status: 'planned',
    priority: 'Medium',
    details: 'Enables casting to smart speakers from the trusted LAN while blocking smart devices from initiating inbound connections.',
  },
  {
    id: 'plan-ipv6',
    title: 'IPv6 Routing & IPv6 DoT Relay',
    category: 'Networking',
    description: 'Assigning routed /64 or /56 IPv6 delegations from Oracle VPS across WireGuard down to JioWrt.',
    status: 'planned',
    priority: 'Medium',
    details: 'Enables native IPv6 DNS-over-TLS endpoints in addition to current IPv4 10.200.0.0/24 overlay.',
  },
  {
    id: 'plan-cert-automation',
    title: 'Automated ACME Certificate Lifecycle Renewal',
    category: 'Automation',
    description: 'Zero-touch ACME DNS-01 challenge automation with post-renewal hooks automatically updating and restarting AdGuard Home.',
    status: 'planned',
    priority: 'High',
    details: 'Eliminates manual certificate file swapping and guarantees seamless 60-day renewal ceremonies.',
  },
  {
    id: 'plan-ansible',
    title: 'Infrastructure as Code (Ansible / Shell Automation)',
    category: 'Automation',
    description: 'Declarative playbooks to provision the Oracle VPS iptables rules, WireGuard configs, and OpenWrt UCI stanzas idempotently.',
    status: 'planned',
    priority: 'Medium',
    details: 'Allows spinning up a replacement VPS in any cloud region within 2 minutes.',
  },
  {
    id: 'plan-vps-docker',
    title: 'Docker Microservices on Oracle VPS',
    category: 'Cloud',
    description: 'Containerized auxiliary homelab services running on the cloud VM (Vaultwarden, Nginx Proxy Manager, Tailscale DERP relay).',
    status: 'planned',
    priority: 'Low',
    details: 'Utilizes remaining RAM and CPU cores on the Always Free VM instance.',
  },
  {
    id: 'plan-dashboard',
    title: 'Personal Homelab Status Dashboard',
    category: 'Monitoring',
    description: 'A unified single-pane-of-glass status page displaying live connectivity status of JioWrt, VPS, and DNS latency.',
    status: 'planned',
    priority: 'Medium',
    details: 'Public status page hosted on Cloudflare Pages providing external transparency into home lab uptime.',
  },
];
