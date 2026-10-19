import React, { useState } from 'react';
import {
  Radio,
  ShieldAlert,
  AlertTriangle,
  Lock,
  Unlock,
  RefreshCw,
  Sparkles,
  Wifi,
} from 'lucide-react';
import { WifiNetwork, SpectrumChannelData } from '../types/network';
import { Language, getTranslations } from '../i18n/translations';

interface AirwavesViewProps {
  networks: WifiNetwork[];
  channels24: SpectrumChannelData[];
  channels5: SpectrumChannelData[];
  onScanAirwaves: () => void;
  isScanning: boolean;
  onMitigateEvilTwin: () => void;
  lang?: Language;
}

export const AirwavesView: React.FC<AirwavesViewProps> = ({
  networks,
  channels24,
  channels5,
  onScanAirwaves,
  isScanning,
  onMitigateEvilTwin,
  lang = 'ar',
}) => {
  const [selectedBand, setSelectedBand] = useState<'2.4GHz' | '5GHz'>('5GHz');
  const [filterSecurity, setFilterSecurity] = useState<'all' | 'secure' | 'open' | 'rogue'>('all');
  const t = getTranslations(lang);

  const filteredNetworks = networks.filter((net) => {
    if (filterSecurity === 'secure') return net.security !== 'Open' && net.security !== 'WEP';
    if (filterSecurity === 'open') return net.security === 'Open' || net.security === 'WEP';
    if (filterSecurity === 'rogue') return net.isEvilTwinSuspect;
    return true;
  });

  const activeSpectrum = selectedBand === '2.4GHz' ? channels24 : channels5;
  const bestChannel = activeSpectrum.reduce((best, cur) =>
    cur.interferenceScore < best.interferenceScore ? cur : best
  );

  const evilTwin = networks.find((n) => n.isEvilTwinSuspect);
  const legitAp = networks.find((n) => n.isCurrentNetwork);

  return (
    <div className="space-y-6">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-white">
            {t.airwaves.title}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.airwaves.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onScanAirwaves}
            disabled={isScanning}
            className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? t.airwaves.passiveCapture : t.actions.rescanAirwaves}</span>
          </button>
        </div>
      </div>

      {/* Evil Twin / Rogue AP Alert Box if detected */}
      {evilTwin && (
        <div className="bg-amber-950/30 border border-amber-600/50 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-amber-200">
                  {t.airwaves.evilTwinAlertTitle}
                </h3>
                <p className="text-xs text-amber-300/80 mt-0.5">
                  {t.airwaves.evilTwinAlertDesc}
                </p>
              </div>
            </div>
            <button
              onClick={onMitigateEvilTwin}
              className="px-3 py-1.5 text-xs font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              {t.airwaves.blacklistImpostor}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-emerald-400">{t.airwaves.authorizedAp}</span>
                <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase">{lang === 'ar' ? 'موثوق' : 'AUTHENTIC'}</span>
              </div>
              <div className="space-y-1 text-slate-300 font-mono text-[11px]">
                <div>SSID: <strong className="text-white">{legitAp?.ssid}</strong></div>
                <div>BSSID: {legitAp?.bssid} ({legitAp?.vendor})</div>
                <div>{t.airwaves.colEncryption}: {legitAp?.security}</div>
                <div>{t.airwaves.colSignal}: {legitAp?.signalDbm} dBm</div>
              </div>
            </div>

            <div className="bg-rose-950/30 border border-rose-800/60 rounded-lg p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-rose-300">{t.airwaves.impostorRogue}</span>
                <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">{lang === 'ar' ? 'خبيث' : 'UNTRUSTED / ROGUE'}</span>
              </div>
              <div className="space-y-1 text-rose-200 font-mono text-[11px]">
                <div>SSID: <strong className="text-white">{evilTwin.ssid}</strong></div>
                <div>BSSID: {evilTwin.bssid} ({evilTwin.vendor})</div>
                <div>{t.airwaves.colEncryption}: <span className="text-rose-400 font-bold">{evilTwin.security} ({lang === 'ar' ? 'بدون تشفير!' : 'No Encryption!'})</span></div>
                <div>{t.airwaves.colSignal}: {evilTwin.signalDbm} dBm</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spectrum Graph & Channel Recommendation */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              {t.airwaves.spectrumTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.airwaves.spectrumDesc}
            </p>
          </div>

          {/* Band Selector */}
          <div className="inline-flex rounded-lg p-1 bg-slate-950 border border-slate-800 shrink-0">
            <button
              onClick={() => setSelectedBand('5GHz')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedBand === '5GHz'
                  ? 'bg-slate-800 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.airwaves.band5g}
            </button>
            <button
              onClick={() => setSelectedBand('2.4GHz')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedBand === '2.4GHz'
                  ? 'bg-slate-800 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.airwaves.band24g}
            </button>
          </div>
        </div>

        {/* Spectrum Recommendation Banner */}
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>{t.airwaves.optimizationRec}:</strong> {t.subbar.channel}{' '}
              <span className="font-mono text-emerald-400 font-bold">{bestChannel.channel}</span> ({bestChannel.frequencyMhz} MHz) {lang === 'ar' ? `هي الأقل ضوضاءً بنسبة تشويش ${bestChannel.interferenceScore}%.` : `has the lowest noise floor (${bestChannel.interferenceScore}% interference score).`}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {activeSpectrum.length} {lang === 'ar' ? 'قناة مراقبة' : 'channels monitored'}
          </span>
        </div>

        {/* Visual Spectrum Bars & Bell Curve representations */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {activeSpectrum.map((ch) => {
              const isRec = ch.recommended || ch.channel === bestChannel.channel;
              return (
                <div
                  key={ch.channel}
                  className={`p-3 rounded-lg border flex flex-col justify-between transition-colors ${
                    isRec
                      ? 'bg-emerald-950/20 border-emerald-800/60'
                      : ch.interferenceScore > 75
                      ? 'bg-rose-950/20 border-rose-800/50'
                      : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-white">Ch {ch.channel}</span>
                    {isRec ? (
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">BEST</span>
                    ) : ch.interferenceScore > 75 ? (
                      <span className="text-[10px] text-rose-400 font-mono font-bold">BUSY</span>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono">OK</span>
                    )}
                  </div>

                  {/* Channel Utilization Bar */}
                  <div className="my-2 space-y-1">
                    <div className="h-16 w-full bg-slate-900 rounded flex items-end p-1 overflow-hidden">
                      <div
                        className={`w-full rounded-xs transition-all duration-300 ${
                          ch.interferenceScore > 75
                            ? 'bg-rose-500'
                            : ch.interferenceScore > 40
                            ? 'bg-amber-400'
                            : 'bg-emerald-400'
                        }`}
                        style={{ height: `${Math.max(15, ch.interferenceScore)}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 space-y-0.5">
                    <div>{ch.frequencyMhz} MHz</div>
                    <div>{ch.networkCount} APs detected</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
            <span>2.4 GHz non-overlapping channels: 1, 6, 11 · 5 GHz offers 24 non-overlapping 20MHz channels</span>
            <span className="font-mono">Noise Floor: -92 dBm nominal</span>
          </div>
        </div>

      </div>

      {/* Discovered Wi-Fi Networks Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
        
        {/* Table Filter Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              {t.airwaves.discoveredAps} ({filteredNetworks.length})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.airwaves.passiveCapture}
            </p>
          </div>

          {/* Interactive Filter Buttons */}
          <div className="inline-flex rounded-lg p-0.5 bg-slate-950 border border-slate-800 text-xs">
            <button
              onClick={() => setFilterSecurity('all')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterSecurity === 'all' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.airwaves.filterAll} ({networks.length})
            </button>
            <button
              onClick={() => setFilterSecurity('secure')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterSecurity === 'secure' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.airwaves.filterSecure}
            </button>
            <button
              onClick={() => setFilterSecurity('open')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterSecurity === 'open' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.airwaves.filterOpen}
            </button>
            <button
              onClick={() => setFilterSecurity('rogue')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterSecurity === 'rogue' ? 'bg-slate-800 text-amber-300 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.airwaves.filterRogue} ({networks.filter((n) => n.isEvilTwinSuspect).length})
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">{t.airwaves.colSsid}</th>
                <th className="py-3 px-4">{t.airwaves.colBssid}</th>
                <th className="py-3 px-4">{t.airwaves.colSignal}</th>
                <th className="py-3 px-4">{t.airwaves.colChannel}</th>
                <th className="py-3 px-4">{t.airwaves.colEncryption}</th>
                <th className="py-3 px-4">{t.airwaves.colVendor}</th>
                <th className="py-3 px-4 text-right">{t.airwaves.colStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredNetworks.map((net) => {
                const isRogue = net.isEvilTwinSuspect;
                return (
                  <tr
                    key={net.bssid}
                    className={`hover:bg-slate-800/30 transition-colors ${
                      net.isCurrentNetwork
                        ? 'bg-emerald-950/15'
                        : isRogue
                        ? 'bg-rose-950/15'
                        : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Wifi className={`w-3.5 h-3.5 shrink-0 ${net.isCurrentNetwork ? 'text-emerald-400' : isRogue ? 'text-rose-400' : 'text-slate-400'}`} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-white">
                              {net.hidden ? '<Hidden SSID>' : net.ssid}
                            </span>
                            {net.isCurrentNetwork && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                                CONNECTED
                              </span>
                            )}
                            {isRogue && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800 font-semibold">
                                ROGUE AP
                              </span>
                            )}
                          </div>
                          {net.wpsEnabled && (
                            <span className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5">
                              <AlertTriangle className="w-2.5 h-2.5" />
                              WPS 1.0 Active (Brute-force vulnerable)
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-300 text-[11px]">
                      {net.bssid}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono tabular-nums text-slate-200">
                          {net.signalDbm} dBm
                        </span>
                        <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              net.signalDbm > -60 ? 'bg-emerald-400' : net.signalDbm > -75 ? 'bg-amber-400' : 'bg-slate-500'
                            }`}
                            style={{ width: `${net.qualityPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-300">
                      Ch {net.channel} ({net.band})
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        {net.security === 'Open' || net.security === 'WEP' ? (
                          <Unlock className="w-3.5 h-3.5 text-rose-400" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                        <span
                          className={`font-medium ${
                            net.security === 'Open' || net.security === 'WEP' ? 'text-rose-400 font-semibold' : 'text-slate-300'
                          }`}
                        >
                          {net.security}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-400 truncate max-w-[140px]">
                      {net.vendor}
                    </td>

                    <td className="py-3 px-4 text-right">
                      {isRogue ? (
                        <button
                          onClick={onMitigateEvilTwin}
                          className="px-2 py-1 text-[11px] font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded cursor-pointer"
                        >
                          Block Impostor
                        </button>
                      ) : net.isCurrentNetwork ? (
                        <span className="text-emerald-400 font-medium">Secured Baseline</span>
                      ) : (
                        <span className="text-slate-500">Adjacent WLAN</span>
                      )}
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
