export interface CommandItem {
  cmd: string;
  lang?: string;
  shellTitle?: string;
  output?: string;
  explanation?: string;
  why?: string;
}

export interface TimelineDay {
  id: string;
  dayNumber: number | string;
  title: string;
  subtitle: string;
  badge: string;
  status: 'completed' | 'critical-fix' | 'troubleshooting' | 'verified';
  goal: string;
  description: string;
  commands: CommandItem[];
  keyPoints?: string[];
  networks?: { label: string; value: string; desc?: string }[];
  errorLog?: {
    raw: string;
    explanation: string;
  };
  verificationOutput?: {
    command: string;
    output: string;
    explanation: string;
  };
}

export interface QuickStat {
  label: string;
  value: string;
  port?: number | string;
  protocol: string;
  description: string;
  status: 'online' | 'active' | 'forwarded';
  iconName: string;
}

export interface LabComponent {
  id: string;
  name: string;
  badge: string;
  role: string;
  whatItIs: string;
  whyUsed: string;
  roleInLab: string;
  iconName: string;
  specs: { label: string; value: string }[];
  accentColor: 'cyan' | 'emerald' | 'purple' | 'amber';
}

export interface TroubleshootingItem {
  id: string;
  problem: string;
  category: 'TLS' | 'CGNAT' | 'WireGuard' | 'AdGuard' | 'DNS' | 'Firewall';
  symptom: string;
  cause: string;
  solution: string;
  commands: CommandItem[];
  severity: 'high' | 'medium' | 'info';
}

export interface ArchitectureNode {
  id: string;
  name: string;
  subtitle: string;
  ipOrHost: string;
  role: string;
  details: string[];
  ports: string[];
  type: 'client' | 'cloud' | 'gateway' | 'dns' | 'upstream';
}

export interface ArchitectureTunnel {
  id: string;
  name: string;
  interfaceName: string;
  source: string;
  destination: string;
  ipRange: string;
  purpose: string;
  color: string;
  configSummary: string[];
}
