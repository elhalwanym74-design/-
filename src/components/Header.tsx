import React from 'react';
import { ShieldCheck, RefreshCw, Radio, HardDrive, Gauge, Wrench, Languages, Smartphone } from 'lucide-react';
import { Language, translations, getTranslations } from '../i18n/translations';

interface HeaderProps {
  activeTab: 'overview' | 'airwaves' | 'devices' | 'speed' | 'tools';
  setActiveTab: (tab: 'overview' | 'airwaves' | 'devices' | 'speed' | 'tools') => void;
  onRunAudit: () => void;
  isAuditing: boolean;
  threatCount: number;
  lang?: Language;
  onToggleLang: () => void;
  onOpenInstallModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onRunAudit,
  isAuditing,
  threatCount,
  lang = 'ar',
  onToggleLang,
  onOpenInstallModal,
}) => {
  const t = getTranslations(lang) || (translations ? (translations[lang as Language] || translations.ar || translations.en) : null);

  const tabsLabels = {
    overview: t?.tabs?.overview ?? (lang === 'ar' ? 'نظرة عامة' : 'Overview'),
    airwaves: t?.tabs?.airwaves ?? (lang === 'ar' ? 'الموجات اللاسلكية' : 'Airwaves'),
    devices: t?.tabs?.devices ?? (lang === 'ar' ? 'أجهزة الشبكة' : 'LAN Devices'),
    speed: t?.tabs?.speed ?? (lang === 'ar' ? 'السرعة والاستجابة' : 'Speed & Ping'),
    tools: t?.tabs?.tools ?? (lang === 'ar' ? 'أدوات الأمان' : 'Security Tools'),
  };

  const auditLabel = isAuditing
    ? (t?.actions?.auditing ?? (lang === 'ar' ? 'جارٍ فحص الشبكة...' : 'Auditing Subnet...'))
    : (t?.actions?.runAudit ?? (lang === 'ar' ? 'فحص أمني شامل' : 'Run Deep Audit'));

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
            {lang === 'ar' ? 'حارس الشبكة WiFiGuard' : 'WiFiGuard'}
          </span>
        </div>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-slate-800 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <span>{tabsLabels.overview}</span>
            {threatCount > 0 && (
              <span className="text-[11px] font-mono font-semibold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {threatCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('airwaves')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'airwaves'
                ? 'bg-slate-800 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{tabsLabels.airwaves}</span>
          </button>

          <button
            onClick={() => setActiveTab('devices')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'devices'
                ? 'bg-slate-800 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>{tabsLabels.devices}</span>
          </button>

          <button
            onClick={() => setActiveTab('speed')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'speed'
                ? 'bg-slate-800 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>{tabsLabels.speed}</span>
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tools'
                ? 'bg-slate-800 text-white font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>{tabsLabels.tools}</span>
          </button>
        </nav>

        {/* Zone 3: Language switcher + APK button + Primary action */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenInstallModal && (
            <button
              onClick={onOpenInstallModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-emerald-300 hover:text-emerald-100 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-600/40 rounded-lg transition-colors cursor-pointer"
              title={lang === 'ar' ? 'تثبيت كـ تطبيق أندرويد APK' : 'Install APK on Android'}
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold">{lang === 'ar' ? 'تطبيق الهاتف (APK)' : 'Install APK'}</span>
            </button>
          )}

          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            title={lang === 'en' ? 'التحويل إلى العربية' : 'Switch to English'}
          >
            <Languages className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          <button
            onClick={onRunAudit}
            disabled={isAuditing}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{auditLabel}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav strip */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-800/80 bg-slate-950/95 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'overview' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          {tabsLabels.overview}
        </button>
        <button
          onClick={() => setActiveTab('airwaves')}
          className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'airwaves' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          {tabsLabels.airwaves}
        </button>
        <button
          onClick={() => setActiveTab('devices')}
          className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'devices' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          {tabsLabels.devices}
        </button>
        <button
          onClick={() => setActiveTab('speed')}
          className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'speed' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          {tabsLabels.speed}
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'tools' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          {tabsLabels.tools}
        </button>
      </div>
    </header>
  );
};
