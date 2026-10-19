import React from 'react';
import { Wifi, ShieldAlert, FileText, AlertTriangle } from 'lucide-react';
import { WifiNetwork } from '../types/network';
import { Language, getTranslations } from '../i18n/translations';

interface NetworkSubBarProps {
  currentNetwork: WifiNetwork;
  isArpPoisoned: boolean;
  onToggleArpSimulation: () => void;
  onOpenReportModal: () => void;
  lang?: Language;
}

export const NetworkSubBar: React.FC<NetworkSubBarProps> = ({
  currentNetwork,
  isArpPoisoned,
  onToggleArpSimulation,
  onOpenReportModal,
  lang = 'ar',
}) => {
  const t = getTranslations(lang);

  return (
    <section className="border-b border-slate-800/80 bg-slate-900/50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Zero-Pill Unboxed Metadata with typographic separators */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
            <Wifi className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{currentNetwork.ssid}</span>
          </div>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="font-mono text-slate-300">{currentNetwork.bssid}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{t.subbar.channel} {currentNetwork.channel} ({currentNetwork.band}, {currentNetwork.channelWidthMhz}MHz)</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{t.subbar.subnet} <span className="font-mono text-slate-300">192.168.1.0/24</span></span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="font-mono text-emerald-400">{currentNetwork.signalDbm} dBm</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-300">{currentNetwork.security}</span>
        </div>

        {/* Quick actions & Threat Simulators */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleArpSimulation}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 border cursor-pointer ${
              isArpPoisoned
                ? 'bg-rose-950/60 border-rose-600/60 text-rose-300 hover:bg-rose-900/60'
                : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {isArpPoisoned ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>{t.actions.arpActive}</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.actions.simulateArp}</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenReportModal}
            className="px-3 py-1 text-xs font-medium rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.actions.auditReport}</span>
          </button>
        </div>

      </div>

      {isArpPoisoned && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2.5">
          <div className="bg-rose-950/40 border border-rose-500/50 rounded-lg p-3 text-xs text-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>{t.subbar.arpAlertTitle}:</strong> {t.subbar.arpAlertMsg}
              </span>
            </div>
            <button
              onClick={onToggleArpSimulation}
              className="px-2.5 py-1 text-xs bg-rose-600 hover:bg-rose-500 text-white rounded font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              {t.actions.neutralizeArp}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
