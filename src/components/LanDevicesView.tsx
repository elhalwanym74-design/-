import React, { useState } from 'react';
import {
  Search,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Laptop,
  Smartphone,
  Server,
  Camera,
  Tv,
  Cpu,
  Router,
  CheckCircle2,
} from 'lucide-react';
import { LanDevice, DeviceType } from '../types/network';
import { Language, getTranslations } from '../i18n/translations';

interface LanDevicesViewProps {
  devices: LanDevice[];
  onScanSubnet: () => void;
  isScanning: boolean;
  onSelectDeviceForScan: (device: LanDevice) => void;
  onToggleTrust: (deviceId: string) => void;
  isArpPoisoned: boolean;
  lang?: Language;
}

export const LanDevicesView: React.FC<LanDevicesViewProps> = ({
  devices,
  onScanSubnet,
  isScanning,
  onSelectDeviceForScan,
  onToggleTrust,
  isArpPoisoned,
  lang = 'ar',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const t = getTranslations(lang);

  const getDeviceIcon = (type: DeviceType) => {
    switch (type) {
      case 'router':
        return <Router className="w-4 h-4 text-emerald-400" />;
      case 'workstation':
        return <Laptop className="w-4 h-4 text-cyan-400" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-violet-400" />;
      case 'server':
        return <Server className="w-4 h-4 text-blue-400" />;
      case 'camera':
        return <Camera className="w-4 h-4 text-rose-400" />;
      case 'iot':
        return <Tv className="w-4 h-4 text-amber-400" />;
      default:
        return <Cpu className="w-4 h-4 text-slate-400" />;
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes >= 1000000000) return `${(bytes / 1000000000).toFixed(1)} GB`;
    if (bytes >= 1000000) return `${(bytes / 1000000).toFixed(0)} MB`;
    return `${(bytes / 1000).toFixed(0)} KB`;
  };

  const filteredDevices = devices.filter((d) => {
    const matchesSearch =
      d.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.mac.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.hostname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.vendor.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'trusted') return d.isTrusted;
    if (filterType === 'untrusted') return !d.isTrusted;
    if (filterType === 'iot') return d.deviceType === 'iot' || d.deviceType === 'camera';
    if (filterType === 'vulnerable') return d.ports.some((p) => p.risk === 'critical' || p.risk === 'high');

    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-white">
            {t.devices.title}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.devices.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onScanSubnet}
            disabled={isScanning}
            className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? t.devices.subtitle : t.actions.sweepSubnet}</span>
          </button>
        </div>
      </div>

      {/* Gateway ARP Integrity Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            isArpPoisoned
              ? 'bg-rose-950/60 text-rose-400 border border-rose-800'
              : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
          }`}>
            {isArpPoisoned ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{t.devices.arpIntegrityTitle}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                isArpPoisoned
                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                {isArpPoisoned ? t.devices.arpCollision : t.devices.arpAuthenticated}
              </span>
            </div>
            <p className="text-slate-400 mt-0.5 text-[11px]">
              {isArpPoisoned ? t.devices.arpWarning : t.devices.arpNormal}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px] shrink-0">
          <span>{t.devices.staticBinding}</span>
        </div>
      </div>

      {/* Devices Main Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
        
        {/* Search & Filter Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className={`w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 ${lang === 'ar' ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.devices.searchPlaceholder}
              className={`w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-emerald-500 ${lang === 'ar' ? 'pr-8 pl-3' : 'pl-8 pr-3'}`}
            />
          </div>

          {/* Filter Tabs */}
          <div className="inline-flex rounded-lg p-0.5 bg-slate-950 border border-slate-800 text-xs overflow-x-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                filterType === 'all' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.devices.filterAll} ({devices.length})
            </button>
            <button
              onClick={() => setFilterType('trusted')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                filterType === 'trusted' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.devices.filterTrusted} ({devices.filter((d) => d.isTrusted).length})
            </button>
            <button
              onClick={() => setFilterType('untrusted')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                filterType === 'untrusted' ? 'bg-slate-800 text-amber-300 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.devices.filterUntrusted} ({devices.filter((d) => !d.isTrusted).length})
            </button>
            <button
              onClick={() => setFilterType('iot')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                filterType === 'iot' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.devices.filterIot}
            </button>
            <button
              onClick={() => setFilterType('vulnerable')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                filterType === 'vulnerable' ? 'bg-slate-800 text-rose-300 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.devices.filterVulnerable} ({devices.filter((d) => d.ports.some((p) => p.risk === 'critical' || p.risk === 'high')).length})
            </button>
          </div>

        </div>

        {/* Devices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">{t.devices.colHostname}</th>
                <th className="py-3 px-4">{t.devices.colIp}</th>
                <th className="py-3 px-4">{t.devices.colMac}</th>
                <th className="py-3 px-4">{t.devices.colPorts}</th>
                <th className="py-3 px-4">{t.devices.colTraffic}</th>
                <th className="py-3 px-4">{t.devices.colTrust}</th>
                <th className="py-3 px-4 text-right">{t.devices.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDevices.map((device) => {
                const hasCritical = device.ports.some((p) => p.risk === 'critical');

                return (
                  <tr
                    key={device.id}
                    className={`hover:bg-slate-800/30 transition-colors ${
                      hasCritical ? 'bg-rose-950/15' : !device.isTrusted ? 'bg-amber-950/10' : ''
                    }`}
                  >
                    {/* Endpoint / Hostname */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-md bg-slate-800/80 border border-slate-700/60 shrink-0">
                          {getDeviceIcon(device.deviceType)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-white">
                              {device.hostname}
                            </span>
                            {device.isGateway && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
                                {lang === 'ar' ? 'بوابة التوجيه' : 'GATEWAY'}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 block capitalize">
                            {device.deviceType} · {device.status}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* IP */}
                    <td className="py-3 px-4 font-mono font-medium text-slate-200 tabular-nums">
                      {device.ip}
                    </td>

                    {/* MAC & Vendor */}
                    <td className="py-3 px-4">
                      <div className="font-mono text-slate-300 text-[11px]">
                        {device.mac}
                      </div>
                      <div className="text-slate-400 text-[11px] truncate max-w-[150px]">
                        {device.vendor}
                      </div>
                    </td>

                    {/* Ports */}
                    <td className="py-3 px-4">
                      {device.ports.length === 0 ? (
                        <span className="text-slate-500 font-mono text-[11px]">{t.devices.stealth}</span>
                      ) : (
                        <div className="flex flex-wrap gap-1 items-center">
                          {device.ports.slice(0, 3).map((p) => (
                            <span
                              key={p.port}
                              className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                                p.risk === 'critical'
                                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                  : p.risk === 'high'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {p.port}/{p.service}
                            </span>
                          ))}
                          {device.ports.length > 3 && (
                            <span className="text-[10px] text-slate-500 font-mono">
                              +{device.ports.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Subnet Traffic */}
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400 tabular-nums">
                      ↓ {formatBytes(device.rxBytes)} / ↑ {formatBytes(device.txBytes)}
                    </td>

                    {/* Trust Status */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => onToggleTrust(device.id)}
                        className={`inline-flex items-center gap-1 text-[11px] font-medium cursor-pointer ${
                          device.isTrusted ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {device.isTrusted ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{t.actions.trust}</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>{t.actions.untrust}</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectDeviceForScan(device)}
                        className="px-2.5 py-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded border border-slate-700/60 transition-colors cursor-pointer"
                      >
                        {t.actions.inspectPorts}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
