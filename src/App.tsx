import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NetworkSubBar } from './components/NetworkSubBar';
import { OverviewView } from './components/OverviewView';
import { AirwavesView } from './components/AirwavesView';
import { LanDevicesView } from './components/LanDevicesView';
import { SpeedPingView } from './components/SpeedPingView';
import { ToolsView } from './components/ToolsView';
import { PortScanModal } from './components/PortScanModal';
import { AuditReportModal } from './components/AuditReportModal';
import { InstallAppModal } from './components/InstallAppModal';
import { Language, getTranslations } from './i18n/translations';
import {
  INITIAL_WIFI_NETWORKS,
  INITIAL_LAN_DEVICES,
  INITIAL_SECURITY_CHECKS,
  INITIAL_ALERTS,
  INITIAL_PING_TARGETS,
  INITIAL_CHANNELS_24,
  INITIAL_CHANNELS_5,
} from './services/networkEngine';
import { WifiNetwork, LanDevice, SecurityAuditItem, SecurityAlert, DevicePort, PingTargetResult } from './types/network';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('wifiguard_lang');
    return (saved === 'en' || saved === 'ar') ? saved : 'ar';
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'airwaves' | 'devices' | 'speed' | 'tools'>('overview');
  const [networks, setNetworks] = useState<WifiNetwork[]>(INITIAL_WIFI_NETWORKS);
  const [devices, setDevices] = useState<LanDevice[]>(INITIAL_LAN_DEVICES);
  const [auditItems, setAuditItems] = useState<SecurityAuditItem[]>(INITIAL_SECURITY_CHECKS);
  const [alerts, setAlerts] = useState<SecurityAlert[]>(INITIAL_ALERTS);
  const [pingTargets, setPingTargets] = useState<PingTargetResult[]>(INITIAL_PING_TARGETS);
  const [channels24, setChannels24] = useState(INITIAL_CHANNELS_24);
  const [channels5, setChannels5] = useState(INITIAL_CHANNELS_5);

  const [isAuditing, setIsAuditing] = useState(false);
  const [isScanningAirwaves, setIsScanningAirwaves] = useState(false);
  const [isScanningSubnet, setIsScanningSubnet] = useState(false);
  const [isArpPoisoned, setIsArpPoisoned] = useState(false);

  const [selectedDeviceForScan, setSelectedDeviceForScan] = useState<LanDevice | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Sync document RTL/LTR direction
  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('wifiguard_lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = getTranslations(lang);

  const currentNetwork = networks.find((n) => n.isCurrentNetwork) || networks[0];

  // Calculate dynamic security posture score (0 - 100)
  const calculateScore = () => {
    let score = 100;
    auditItems.forEach((item) => {
      if (item.status === 'critical') score -= 22;
      else if (item.status === 'warning') score -= 7;
    });
    if (isArpPoisoned) score -= 25;
    return Math.max(10, Math.min(100, score));
  };

  const securityScore = calculateScore();
  const threatCount = auditItems.filter((i) => i.status === 'critical' || i.status === 'warning').length + (isArpPoisoned ? 1 : 0);

  // Run deep audit simulation
  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      // Add fresh alert
      const newAlert: SecurityAlert = {
        id: `alt-${Date.now()}`,
        timestamp: 'Just now',
        severity: 'info',
        title: 'Deep Subnet Audit Completed',
        message: 'Scanned 254 IPv4 addresses and 6 BSSIDs. Cryptographic hashes validated.',
        source: 'Security Engine',
        resolved: true,
      };
      setAlerts((prev) => [newAlert, ...prev]);
    }, 1500);
  };

  // Scan airwaves
  const handleScanAirwaves = () => {
    setIsScanningAirwaves(true);
    setTimeout(() => {
      setIsScanningAirwaves(false);
      // Slight signal fluctuation
      setNetworks((prev) =>
        prev.map((n) => ({
          ...n,
          signalDbm: Math.min(-35, Math.max(-90, n.signalDbm + Math.floor(Math.random() * 5 - 2))),
        }))
      );
    }, 1200);
  };

  // Sweep subnet
  const handleScanSubnet = () => {
    setIsScanningSubnet(true);
    setTimeout(() => {
      setIsScanningSubnet(false);
      setDevices((prev) =>
        prev.map((d) => ({
          ...d,
          lastSeen: 'Just now',
          rxBytes: d.rxBytes + Math.floor(Math.random() * 500000),
          txBytes: d.txBytes + Math.floor(Math.random() * 300000),
        }))
      );
    }, 1200);
  };

  // Toggle ARP spoofing attack simulation
  const handleToggleArpSimulation = () => {
    const nextState = !isArpPoisoned;
    setIsArpPoisoned(nextState);

    // Update audit checks and alerts
    setAuditItems((prev) =>
      prev.map((item) => {
        if (item.category === 'arp_poison') {
          return {
            ...item,
            status: nextState ? 'critical' : 'passed',
            summary: nextState
              ? 'ACTIVE INTRUSION: Conflicting MAC detected claiming ownership of Gateway 192.168.1.1'
              : 'Gateway MAC mapping is stable and authenticated (no ARP poisoning)',
            technicalDetails: nextState
              ? 'Gratuitous ARP frame collision: Host EC:62:60:DE:89:01 broadcasted ARP reply for IP 192.168.1.1, attempting to overwrite baseline MAC 3C:37:12:4A:88:91.'
              : 'ARP cache verified. Gateway IP 192.168.1.1 is strictly mapped to Netgear MAC 3C:37:12:4A:88:91.',
          };
        }
        return item;
      })
    );

    if (nextState) {
      const intrusionAlert: SecurityAlert = {
        id: `alt-${Date.now()}`,
        timestamp: 'Just now',
        severity: 'critical',
        title: 'ARP Poisoning Collision Detected!',
        message: 'Rogue host EC:62:60:DE:89:01 is impersonating Default Gateway 192.168.1.1.',
        source: 'ARP Watchdog',
        resolved: false,
      };
      setAlerts((prev) => [intrusionAlert, ...prev]);
    }
  };

  // Mitigate Evil Twin impostor
  const handleMitigateEvilTwin = () => {
    setNetworks((prev) => prev.filter((n) => !n.isEvilTwinSuspect));
    setAuditItems((prev) =>
      prev.map((item) =>
        item.category === 'rogue_ap'
          ? {
              ...item,
              status: 'passed',
              summary: 'Zero rogue access points detected in physical proximity',
              technicalDetails: 'Blacklisted impostor BSSID 82:2A:44:11:09:FE. Active beacon frames strictly match authorized certificates.',
            }
          : item
      )
    );
    const resolvedAlert: SecurityAlert = {
      id: `alt-${Date.now()}`,
      timestamp: 'Just now',
      severity: 'info',
      title: 'Evil Twin BSSID Blacklisted',
      message: 'Impostor network 82:2A:44:11:09:FE blocked by local radio filter.',
      source: 'Rogue AP Shield',
      resolved: true,
    };
    setAlerts((prev) => [resolvedAlert, ...prev]);
  };

  // Fix vulnerability item
  const handleFixVulnerability = (vulnId: string) => {
    setAuditItems((prev) =>
      prev.map((item) => {
        if (item.id === vulnId) {
          if (item.id === 'sec-telnet') {
            // Isolate camera & close telnet
            setDevices((devs) =>
              devs.map((d) =>
                d.id === 'dev-camera'
                  ? {
                      ...d,
                      ports: d.ports.filter((p) => p.port !== 23),
                      notes: 'Camera secured: Telnet listener disabled & isolated in IoT VLAN',
                    }
                  : d
              )
            );
            return {
              ...item,
              status: 'passed',
              summary: 'Insecure plaintext Telnet service disabled on all hosts',
              technicalDetails: 'Port 23 closed on host 192.168.1.189. All remote management restricted to SSH or TLS.',
            };
          }
          if (item.id === 'sec-evil-twin') {
            handleMitigateEvilTwin();
            return {
              ...item,
              status: 'passed',
              summary: 'Zero rogue access points detected in physical proximity',
            };
          }
          if (item.id === 'sec-wps') {
            return {
              ...item,
              status: 'passed',
              summary: 'WPS registration mode disabled on monitored access points',
              technicalDetails: 'WPS push-button and PIN modes disabled. Reaver brute-force resistance active.',
            };
          }
          return {
            ...item,
            status: 'passed',
            summary: 'Remediation applied successfully.',
          };
        }
        return item;
      })
    );
  };

  // Toggle device trust
  const handleToggleTrust = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === deviceId ? { ...d, isTrusted: !d.isTrusted } : d))
    );
  };

  // Update ports for device
  const handleUpdateDevicePorts = (deviceId: string, newPorts: DevicePort[]) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === deviceId ? { ...d, ports: newPorts } : d))
    );
    if (selectedDeviceForScan && selectedDeviceForScan.id === deviceId) {
      setSelectedDeviceForScan((prev) => (prev ? { ...prev, ports: newPorts } : null));
    }
  };

  // Resolve alert
  const handleResolveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, resolved: true } : a))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* 3-Zone Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRunAudit={handleRunAudit}
        isAuditing={isAuditing}
        threatCount={threatCount}
        lang={lang}
        onToggleLang={toggleLang}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Zero-Pill Context Sub-Bar */}
      <NetworkSubBar
        currentNetwork={currentNetwork}
        isArpPoisoned={isArpPoisoned}
        onToggleArpSimulation={handleToggleArpSimulation}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        lang={lang}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <OverviewView
            currentNetwork={currentNetwork}
            devices={devices}
            auditItems={auditItems}
            alerts={alerts}
            securityScore={securityScore}
            onNavigateTab={setActiveTab}
            onResolveAlert={handleResolveAlert}
            onFixVulnerability={handleFixVulnerability}
            lang={lang}
          />
        )}

        {activeTab === 'airwaves' && (
          <AirwavesView
            networks={networks}
            channels24={channels24}
            channels5={channels5}
            onScanAirwaves={handleScanAirwaves}
            isScanning={isScanningAirwaves}
            onMitigateEvilTwin={handleMitigateEvilTwin}
            lang={lang}
          />
        )}

        {activeTab === 'devices' && (
          <LanDevicesView
            devices={devices}
            onScanSubnet={handleScanSubnet}
            isScanning={isScanningSubnet}
            onSelectDeviceForScan={setSelectedDeviceForScan}
            onToggleTrust={handleToggleTrust}
            isArpPoisoned={isArpPoisoned}
            lang={lang}
          />
        )}

        {activeTab === 'speed' && (
          <SpeedPingView
            pingTargets={pingTargets}
            onUpdatePingTargets={setPingTargets}
            lang={lang}
          />
        )}

        {activeTab === 'tools' && (
          <ToolsView
            isArpPoisoned={isArpPoisoned}
            onToggleArpSimulation={handleToggleArpSimulation}
            lang={lang}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">WiFiGuard</span>
            <span>·</span>
            <span>{t?.footer?.desc || (lang === 'ar' ? 'وحدة الدفاع عن الشبكة المحلية والتدقيق التشفيري' : 'Local Network Defense Console')}</span>
            <span>·</span>
            <span className="font-mono">v1.4.2</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t?.footer?.exportAssessment || (lang === 'ar' ? 'تصدير التقرير الأمني' : 'Export Assessment')}
            </button>
            <span>·</span>
            <span className="font-mono text-emerald-400">{t?.footer?.activeLinkNominal || (lang === 'ar' ? 'اتصال نشط وسليم' : 'Active Link Nominal')}</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedDeviceForScan && (
        <PortScanModal
          device={selectedDeviceForScan}
          onClose={() => setSelectedDeviceForScan(null)}
          onUpdateDevicePorts={handleUpdateDevicePorts}
          onToggleTrust={handleToggleTrust}
          lang={lang}
        />
      )}

      {isReportModalOpen && (
        <AuditReportModal
          currentNetwork={currentNetwork}
          devices={devices}
          auditItems={auditItems}
          alerts={alerts}
          securityScore={securityScore}
          onClose={() => setIsReportModalOpen(false)}
          lang={lang}
        />
      )}

      {isInstallModalOpen && (
        <InstallAppModal
          onClose={() => setIsInstallModalOpen(false)}
          lang={lang}
        />
      )}

    </div>
  );
}
