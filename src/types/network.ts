export type SecurityRating = 'secure' | 'moderate' | 'vulnerable' | 'critical';

export interface WifiNetwork {
  ssid: string;
  bssid: string;
  signalDbm: number;
  qualityPercent: number;
  channel: number;
  band: '2.4GHz' | '5GHz' | '6GHz';
  frequencyMhz: number;
  security: 'WPA3-Personal' | 'WPA2/WPA3-Mixed' | 'WPA2-PSK' | 'WEP' | 'Open';
  channelWidthMhz: 20 | 40 | 80 | 160;
  isCurrentNetwork: boolean;
  isEvilTwinSuspect: boolean;
  wpsEnabled: boolean;
  hidden: boolean;
  vendor: string;
}

export type DeviceType = 'router' | 'workstation' | 'mobile' | 'iot' | 'server' | 'camera' | 'unknown';

export interface DevicePort {
  port: number;
  service: string;
  protocol: 'TCP' | 'UDP';
  status: 'open' | 'closed' | 'filtered';
  risk: 'low' | 'medium' | 'high' | 'critical';
  detail: string;
}

export interface LanDevice {
  id: string;
  ip: string;
  mac: string;
  hostname: string;
  vendor: string;
  deviceType: DeviceType;
  status: 'online' | 'idle' | 'offline';
  isGateway: boolean;
  isTrusted: boolean;
  firstSeen: string;
  lastSeen: string;
  rxBytes: number;
  txBytes: number;
  ports: DevicePort[];
  notes?: string;
}

export interface SecurityAuditItem {
  id: string;
  category: 'encryption' | 'rogue_ap' | 'arp_poison' | 'dns' | 'ports' | 'wps' | 'gateway';
  title: string;
  status: 'passed' | 'warning' | 'critical';
  summary: string;
  technicalDetails: string;
  impact: string;
  remediation: string[];
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  source: string;
  resolved: boolean;
}

export interface PingTargetResult {
  name: string;
  host: string;
  ip: string;
  latencyMs: number | null;
  jitterMs: number;
  lossPercent: number;
  status: 'nominal' | 'degraded' | 'unreachable';
}

export interface SpeedTestState {
  phase: 'idle' | 'ping' | 'download' | 'upload' | 'complete';
  pingMs: number;
  jitterMs: number;
  downloadMbps: number;
  uploadMbps: number;
  bufferbloatGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  progress: number;
}

export interface SpectrumChannelData {
  channel: number;
  band: '2.4GHz' | '5GHz';
  frequencyMhz: number;
  networkCount: number;
  utilizationPercent: number;
  interferenceScore: number; // 0 (clean) to 100 (congested)
  recommended: boolean;
  networks: string[];
}
