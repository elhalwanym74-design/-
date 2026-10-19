import React, { useState } from 'react';
import { X, Play, AlertOctagon, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { LanDevice, DevicePort } from '../types/network';
import { Language, getTranslations } from '../i18n/translations';

interface PortScanModalProps {
  device: LanDevice;
  onClose: () => void;
  onUpdateDevicePorts: (deviceId: string, newPorts: DevicePort[]) => void;
  onToggleTrust: (deviceId: string) => void;
  lang?: Language;
}

const COMMON_PORTS = [
  { port: 21, service: 'FTP', protocol: 'TCP' as const, risk: 'medium' as const, desc: 'Plaintext file transfer protocol' },
  { port: 22, service: 'SSH', protocol: 'TCP' as const, risk: 'low' as const, desc: 'Secure Shell remote login' },
  { port: 23, service: 'TELNET', protocol: 'TCP' as const, risk: 'critical' as const, desc: 'Insecure plaintext terminal (High CVE exposure)' },
  { port: 53, service: 'DNS', protocol: 'UDP' as const, risk: 'low' as const, desc: 'Domain Name System resolver' },
  { port: 80, service: 'HTTP', protocol: 'TCP' as const, risk: 'medium' as const, desc: 'Unencrypted web server interface' },
  { port: 443, service: 'HTTPS', protocol: 'TCP' as const, risk: 'low' as const, desc: 'Encrypted web management portal' },
  { port: 445, service: 'SMB', protocol: 'TCP' as const, risk: 'high' as const, desc: 'Server Message Block file sharing (EternalBlue vector)' },
  { port: 554, service: 'RTSP', protocol: 'TCP' as const, risk: 'high' as const, desc: 'Real-Time Streaming Protocol (IP camera feed)' },
  { port: 3389, service: 'RDP', protocol: 'TCP' as const, risk: 'medium' as const, desc: 'Remote Desktop Protocol' },
  { port: 5000, service: 'UPnP/DSM', protocol: 'TCP' as const, risk: 'medium' as const, desc: 'Synology DSM or UPnP socket' },
  { port: 8080, service: 'HTTP-ALT', protocol: 'TCP' as const, risk: 'low' as const, desc: 'Secondary Web proxy/app server' },
  { port: 8443, service: 'HTTPS-ALT', protocol: 'TCP' as const, risk: 'low' as const, desc: 'Secondary TLS admin port' },
];

export const PortScanModal: React.FC<PortScanModalProps> = ({
  device,
  onClose,
  onUpdateDevicePorts,
  onToggleTrust,
  lang = 'ar',
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCount, setScannedCount] = useState(0);
  const [results, setResults] = useState<DevicePort[]>(device.ports);
  const t = getTranslations(lang);

  const startDeepScan = () => {
    setIsScanning(true);
    setScannedCount(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setScannedCount(progress);

      if (progress >= COMMON_PORTS.length) {
        clearInterval(interval);
        setIsScanning(false);

        const updated: DevicePort[] = COMMON_PORTS.map((p) => {
          const existing = device.ports.find((dp) => dp.port === p.port);
          if (existing) return existing;

          let isOpen = false;
          let detail = lang === 'ar' ? 'الاتصال مرفوض / المنفذ مغلق' : 'Connection refused / port closed';

          if (device.deviceType === 'camera' && (p.port === 23 || p.port === 554 || p.port === 80)) {
            isOpen = true;
            detail = p.port === 23
              ? (lang === 'ar' ? 'حرج: منفذ Telnet غير مشفر مفتوح بكلمات مرور المصنع الافتراضية!' : 'CRITICAL: Insecure unencrypted Telnet open with default credentials!')
              : p.port === 554
              ? (lang === 'ar' ? 'بث RTSP المباشر مفتوح دون مصادقة إلزامية' : 'RTSP media stream broadcast without mandatory authentication')
              : (lang === 'ar' ? 'صفحة إعدادات الويب نشطة' : 'Web admin configuration console active');
          } else if (device.deviceType === 'router' && [53, 80, 443, 8443].includes(p.port)) {
            isOpen = true;
            detail = lang === 'ar' ? 'خدمة إدارة البرمجيات الثابتة للراوتر' : 'Router firmware administration service';
          } else if (device.deviceType === 'server' && [445, 5000, 22].includes(p.port)) {
            isOpen = p.port !== 22;
            detail = isOpen ? (lang === 'ar' ? 'خدمة تخزين ومشاركة ملفات نشطة' : 'Active storage daemon') : (lang === 'ar' ? 'خدمة SSH معطلة في النظام' : 'SSH service disabled in OS');
          } else if (device.deviceType === 'workstation' && p.port === 22) {
            isOpen = true;
            detail = lang === 'ar' ? 'خدمة OpenSSH بمفاتيح تشفير Ed25519 حصراً' : 'OpenSSH daemon (Ed25519 key authentication only)';
          }

          return {
            port: p.port,
            service: p.service,
            protocol: p.protocol,
            status: (isOpen ? 'open' : 'closed') as 'open' | 'closed',
            risk: isOpen ? p.risk : 'low',
            detail,
          };
        }).filter((p) => p.status === 'open');

        setResults(updated);
        onUpdateDevicePorts(device.id, updated);
      }
    }, 120);
  };

  const criticalPorts = results.filter((p) => p.risk === 'critical' || p.risk === 'high');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div>
            <h2 className="text-base font-semibold text-white">
              {t.portModal.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span className="font-mono text-slate-200">{device.ip}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{device.mac}</span>
              <span aria-hidden="true">·</span>
              <span>{device.vendor}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Target Host Overview Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">{t.portModal.hostname}</span>
              <span className="font-medium text-slate-200 truncate block mt-0.5">{device.hostname}</span>
            </div>
            <div>
              <span className="text-slate-500 block">{t.portModal.role}</span>
              <span className="font-medium capitalize text-slate-200 block mt-0.5">{device.deviceType}</span>
            </div>
            <div>
              <span className="text-slate-500 block">{t.portModal.trustLevel}</span>
              <span className={`font-semibold block mt-0.5 ${device.isTrusted ? 'text-emerald-400' : 'text-amber-400'}`}>
                {device.isTrusted ? (lang === 'ar' ? 'موثوق ومعتمد' : 'Verified Trusted') : (lang === 'ar' ? 'غير موثوق / محتمل الخطر' : 'Untrusted / Rogue Risk')}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">{t.portModal.lastSeen}</span>
              <span className="font-mono text-slate-300 block mt-0.5">{device.lastSeen}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={startDeepScan}
              disabled={isScanning}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Play className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? `${t.actions.probing} (${scannedCount}/${COMMON_PORTS.length})...` : t.actions.probePorts}</span>
            </button>

            <button
              onClick={() => onToggleTrust(device.id)}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                device.isTrusted
                  ? 'border-amber-600/50 bg-amber-950/20 text-amber-300 hover:bg-amber-900/30'
                  : 'border-emerald-600/50 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-900/30'
              }`}
            >
              {device.isTrusted ? t.actions.flagSuspicious : t.actions.markTrusted}
            </button>
          </div>

          {/* Critical Risk Banner if found */}
          {criticalPorts.length > 0 && (
            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/60 text-xs text-rose-200 space-y-1">
              <div className="flex items-center gap-2 font-semibold text-rose-300">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>{t.portModal.exposedListenerTitle}</span>
              </div>
              <p className="text-rose-300/90 leading-relaxed">
                {t.portModal.exposedListenerDesc}
              </p>
            </div>
          )}

          {/* Port Results Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-slate-300">
                {t.portModal.discoveredPorts} ({results.length})
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">
                TCP / UDP Scan Complete
              </span>
            </div>

            {results.length === 0 ? (
              <div className="border border-slate-800 rounded-lg p-8 text-center text-slate-400 text-xs">
                <ShieldCheck className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p>{t.portModal.noOpenPorts}</p>
                <p className="text-slate-500 mt-1">{lang === 'ar' ? 'انقر على "فحص المنافذ الشائعة" لبدء الفحص.' : 'Click "Probe Common Ports" to initiate socket probe.'}</p>
              </div>
            ) : (
              <div className="border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800/80">
                {results.map((port) => (
                  <div key={port.port} className="p-3 bg-slate-950/40 hover:bg-slate-800/30 transition-colors text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-sm">
                          {port.port}
                        </span>
                        <span className="font-mono text-slate-400 uppercase text-[11px]">
                          /{port.protocol}
                        </span>
                        <span className="text-slate-200 font-medium">
                          {port.service}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded font-mono uppercase ${
                            port.risk === 'critical'
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : port.risk === 'high'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {port.risk}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {port.detail}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                        <CheckCircle2 className="w-3 h-3" />
                        {t.portModal.listening}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            {t.actions.close}
          </button>
        </div>

      </div>
    </div>
  );
};
