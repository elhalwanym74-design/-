import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  Radio,
  HardDrive,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { WifiNetwork, LanDevice, SecurityAuditItem, SecurityAlert } from '../types/network';
import { Language, getTranslations } from '../i18n/translations';
import { AUDIT_TRANSLATIONS_AR } from '../i18n/auditTranslations';

interface OverviewViewProps {
  currentNetwork: WifiNetwork;
  devices: LanDevice[];
  auditItems: SecurityAuditItem[];
  alerts: SecurityAlert[];
  securityScore: number;
  onNavigateTab: (tab: 'overview' | 'airwaves' | 'devices' | 'speed' | 'tools') => void;
  onResolveAlert: (alertId: string) => void;
  onFixVulnerability: (vulnId: string) => void;
  lang?: Language;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  currentNetwork,
  devices,
  auditItems,
  alerts,
  securityScore,
  onNavigateTab,
  onResolveAlert,
  onFixVulnerability,
  lang = 'ar',
}) => {
  const [expandedCheckId, setExpandedCheckId] = useState<string | null>(null);
  const t = getTranslations(lang);

  const criticalCount = auditItems.filter((i) => i.status === 'critical').length;
  const warningCount = auditItems.filter((i) => i.status === 'warning').length;
  const passedCount = auditItems.filter((i) => i.status === 'passed').length;

  const toggleExpand = (id: string) => {
    setExpandedCheckId((prev) => (prev === id ? null : id));
  };

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-6">
      
      {/* 4-Column Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Security Posture */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{t.overview.securityPosture}</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-white tabular-nums">
                {securityScore}
              </span>
              <span className="text-sm text-slate-400 font-mono">/ 100</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  securityScore >= 80 ? 'bg-emerald-400' : securityScore >= 60 ? 'bg-amber-400' : 'bg-rose-500'
                }`}
                style={{ width: `${securityScore}%` }}
              />
            </div>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>
              {criticalCount} {t.overview.critical} · {warningCount} {t.overview.warning}
            </span>
            <span className="text-emerald-400 font-medium">
              {lang === 'ar' ? 'المستوى' : 'Grade'} {securityScore >= 85 ? 'A' : securityScore >= 70 ? 'B+' : 'C'}
            </span>
          </div>
        </div>

        {/* Metric 2: Monitored Subnet Hosts */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{t.overview.monitoredEndpoints}</span>
            <HardDrive className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-white tabular-nums">
                {devices.length}
              </span>
              <span className="text-xs text-slate-400 font-mono">{t.overview.hostsActive}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 truncate">
              {t.subbar.subnet} <span className="font-mono text-slate-300">192.168.1.0/24</span>
            </p>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>
              {devices.filter((d) => d.isTrusted).length} {lang === 'ar' ? 'موثوق' : 'verified trusted'}
            </span>
            <button
              onClick={() => onNavigateTab('devices')}
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>{t.overview.viewArp}</span>
              <ArrowIcon className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 3: RF Signal & Channel */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{t.overview.signalCongestion}</span>
            <Radio className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-white tabular-nums">
                {currentNetwork.signalDbm}
              </span>
              <span className="text-xs text-slate-400 font-mono">dBm ({currentNetwork.qualityPercent}%)</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {t.subbar.channel} {currentNetwork.channel} · {currentNetwork.band} (80 MHz)
            </p>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span className="text-emerald-400">{t.overview.excellentRf}</span>
            <button
              onClick={() => onNavigateTab('airwaves')}
              className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>{t.overview.spectrum}</span>
              <ArrowIcon className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 4: Rogue AP Watchdog */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{t.overview.rogueWatchdog}</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-amber-400 tabular-nums">
                1
              </span>
              <span className="text-xs text-slate-400">{t.overview.suspectSsid}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 truncate font-mono">
              Aegis-Secure-Net_Guest
            </p>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span className="text-amber-400">{lang === 'ar' ? 'مرشح كنقطة وهمية' : 'Evil Twin Candidate'}</span>
            <button
              onClick={() => onNavigateTab('airwaves')}
              className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>{t.overview.inspect}</span>
              <ArrowIcon className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Grid: Left (Audit Checklist 60%) + Right (AP Specs, Mesh Visual & Alerts 40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Security Audit Checklist */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">
                {t.overview.auditChecklistTitle}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.overview.auditChecklistSubtitle}
              </p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              <span className="text-emerald-400">{passedCount} {t.overview.passed}</span> · <span className="text-amber-400">{warningCount} {t.overview.warning}</span> · <span className="text-rose-400">{criticalCount} {t.overview.critical}</span>
            </div>
          </div>

          <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800/80 bg-slate-900/60 shadow-xs">
            {auditItems.map((item) => {
              const isExpanded = expandedCheckId === item.id;
              const arTranslation = AUDIT_TRANSLATIONS_AR[item.id];
              const displayTitle = lang === 'ar' && arTranslation ? arTranslation.title : item.title;
              const displaySummary = lang === 'ar' && arTranslation ? arTranslation.summary : item.summary;
              const displayTechnical = lang === 'ar' && arTranslation ? arTranslation.technicalDetails : item.technicalDetails;
              const displayImpact = lang === 'ar' && arTranslation ? arTranslation.impact : item.impact;
              const displayRemediation = lang === 'ar' && arTranslation ? arTranslation.remediation : item.remediation;

              const statusLabel =
                item.status === 'passed'
                  ? t.overview.passed
                  : item.status === 'warning'
                  ? t.overview.warning
                  : t.overview.critical;

              return (
                <div key={item.id} className="transition-colors">
                  
                  {/* Row Header */}
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className="p-4 flex items-start sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-850/60 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="mt-0.5 sm:mt-0 shrink-0">
                        {item.status === 'passed' && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                        {item.status === 'warning' && (
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                        )}
                        {item.status === 'critical' && (
                          <AlertOctagon className="w-4 h-4 text-rose-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-semibold text-white">
                            {displayTitle}
                          </h3>
                          <span
                            className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                              item.status === 'passed'
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                                : item.status === 'warning'
                                ? 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                                : 'bg-rose-950/60 text-rose-300 border border-rose-800/60'
                            }`}
                          >
                            {statusLabel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {displaySummary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.status !== 'passed' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onFixVulnerability(item.id);
                          }}
                          className="px-2.5 py-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700/60 transition-colors cursor-pointer"
                        >
                          {t.actions.remediate}
                        </button>
                      )}
                      <button className="text-slate-400 hover:text-slate-200 p-1">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Technical Details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 bg-slate-950/50 border-t border-slate-800/60 text-xs space-y-3">
                      <div>
                        <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider mb-1">
                          {lang === 'ar' ? 'التشخيص الفني والتقني' : 'Technical Discovery'}
                        </span>
                        <p className="text-slate-300 font-mono text-[11px] leading-relaxed bg-slate-950 p-2.5 rounded border border-slate-800">
                          {displayTechnical}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider mb-1">
                          {lang === 'ar' ? 'الأثر الأمني المحتمل' : 'Potential Threat Impact'}
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {displayImpact}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider mb-1">
                          {lang === 'ar' ? 'خطوات المعالجة والتأمين' : 'Remediation Action Items'}
                        </span>
                        <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                          {displayRemediation.map((rem, rIdx) => (
                            <li key={rIdx} className="leading-relaxed">
                              {rem}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => onFixVulnerability(item.id)}
                          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded text-xs transition-colors cursor-pointer"
                        >
                          {item.status === 'passed' ? (lang === 'ar' ? 'إعادة الفحص' : 'Re-audit Check') : (lang === 'ar' ? 'تطبيق المعالجة التلقائية' : 'Apply Automated Mitigation')}
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Access Point Hardware Specs + Mesh Visual + Security Alerts */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AP Specs Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-white uppercase tracking-wider">
                {t.overview.bssidSpecsTitle}
              </h2>
              <span className="text-[11px] font-mono text-emerald-400">802.11ax / Wi-Fi 6</span>
            </div>

            <div className="space-y-2 text-xs divide-y divide-slate-800/80">
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">{t.overview.gatewayVendor}</span>
                <span className="text-slate-200 font-medium">{currentNetwork.vendor}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">{t.overview.opFrequency}</span>
                <span className="font-mono text-slate-200 tabular-nums">{currentNetwork.frequencyMhz} MHz ({t.subbar.channel} {currentNetwork.channel})</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">{t.overview.channelBandwidth}</span>
                <span className="font-mono text-slate-200 tabular-nums">{currentNetwork.channelWidthMhz} MHz</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">{t.overview.cipherSuite}</span>
                <span className="font-mono text-slate-200">AES-CCMP / GCMP-256</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">{t.overview.pmfStatus}</span>
                <span className="text-emerald-400 font-medium">802.11w Capable</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">{t.overview.wpsStatus}</span>
                <span className="text-emerald-400 font-medium">{lang === 'ar' ? 'معطل (محمي)' : 'Disabled (Protected)'}</span>
              </div>
            </div>
          </div>

          {/* Visual Network Mesh Graphic Banner */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <div className="relative aspect-16/9 bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src="/src/assets/images/wifiguard_network_mesh_1791767873838.jpg"
                alt="WiFiGuard Network Defense Topology"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
                <span className="text-xs font-semibold text-white">
                  {t.overview.meshBannerTitle}
                </span>
                <p className="text-[11px] text-slate-400">
                  {t.overview.meshBannerDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Security Alerts Log */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-white uppercase tracking-wider">
                {t.overview.watchdogLogTitle}
              </h2>
              <span className="text-[11px] text-slate-400">
                {alerts.filter((a) => !a.resolved).length} {t.overview.activeThreats}
              </span>
            </div>

            <div className="space-y-2.5">
              {alerts.slice(0, 4).map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border text-xs space-y-1 transition-colors ${
                    alert.severity === 'critical'
                      ? 'bg-rose-950/20 border-rose-800/50 text-rose-200'
                      : alert.severity === 'warning'
                      ? 'bg-amber-950/20 border-amber-800/50 text-amber-200'
                      : 'bg-slate-950/40 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{alert.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{alert.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {alert.message}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-500">{lang === 'ar' ? 'المصدر' : 'Source'}: {alert.source}</span>
                    {!alert.resolved && (
                      <button
                        onClick={() => onResolveAlert(alert.id)}
                        className="text-[11px] font-medium text-slate-300 hover:text-white underline cursor-pointer"
                      >
                        {t.actions.acknowledge}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
