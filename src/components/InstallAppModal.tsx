import React, { useState } from 'react';
import { X, Smartphone, Download, ExternalLink, Check, Copy, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language } from '../i18n/translations';

interface InstallAppModalProps {
  onClose: () => void;
  lang?: Language;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ onClose, lang = 'ar' }) => {
  const [copied, setCopied] = useState(false);
  const appUrl = 'https://ais-pre-f7bvt4obtowiagfwz462ap-849204643580.europe-west2.run.app';

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAr = lang === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">
                {isAr ? 'تثبيت تطبيق WiFiGuard على هاتفك الأندرويد' : 'Install WiFiGuard on Android'}
              </h2>
              <p className="text-xs text-slate-400">
                {isAr ? 'طريقتان لتشغيل التطبيق كـ APK على أجهزة Android' : 'Two ways to run as an APK on Android'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Method 1: WebAPK (Direct native install via Chrome) */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold flex items-center justify-center">1</span>
                <h3 className="font-semibold text-white">
                  {isAr ? 'التثبيت الفوري كـ تطبيق (WebAPK) — الأسهل والأنسب' : 'Instant WebAPK Install — Recommended'}
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {isAr ? 'مباشر وتلقائي' : 'Zero Setup'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isAr
                ? 'يدعم التطبيق معيار PWA الرسمي. عند فتح الرابط في متصفح Google Chrome على هاتفك، يقوم نظام أندرويد تلقائياً بتوليد وتثبيت حزمة APK كاملة على هاتفك بدون الحاجة لمتجر Google Play.'
                : 'WiFiGuard is fully PWA compliant. Opening this link in Google Chrome on your Android phone triggers Android WebAPK generation, installing a real app on your home screen.'}
            </p>
            <ol className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside pr-1">
              <li>{isAr ? 'افتح الرابط أدناه في متصفح Chrome على الهاتف' : 'Open the link below in Chrome on your phone'}</li>
              <li>{isAr ? 'انقر على القائمة (ثلاث نقاط ⋮) في أعلى المتصفح' : 'Tap the menu (⋮) in Chrome'}</li>
              <li>{isAr ? 'اختر "تثبيت التطبيق" (Install app) أو "إضافة إلى الشاشة الرئيسية"' : 'Select "Install app" or "Add to Home Screen"'}</li>
            </ol>
            
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                readOnly
                value={appUrl}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono select-all"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ الرابط' : 'Copy')}</span>
              </button>
            </div>
          </div>

          {/* Method 2: Download raw APK via PWABuilder */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center">2</span>
                <h3 className="font-semibold text-white">
                  {isAr ? 'توليد وتحميل ملف .APK مستقل عبر PWABuilder' : 'Generate Standalone .APK via PWABuilder'}
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                .APK File
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isAr
                ? 'إذا كنت تريد ملف تثبيت APK مباشر (.apk) للتثبيت اليدوي أو الإرسال عبر البلوتوث والواتساب، يمكنك استخدام منصة PWABuilder (أداة رسمية مجانية من Microsoft لتحويل PWA إلى APK جاهز):'
                : 'If you need a standalone .apk installation file for sideloading or sharing, PWABuilder compiles any verified PWA into an Android APK.'}
            </p>
            <ol className="text-xs text-slate-400 space-y-1 list-decimal list-inside pr-1">
              <li>{isAr ? 'ادخل على موقع PWABuilder' : 'Visit PWABuilder'}</li>
              <li>{isAr ? 'الصق رابط التطبيق واضغط Start' : 'Paste the app URL and click Start'}</li>
              <li>{isAr ? 'اضغط Package for Android لتحميل ملف الـ APK فوراً' : 'Click "Package for Android" to download your APK'}</li>
            </ol>
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={`https://www.pwabuilder.com?url=${encodeURIComponent(appUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
              >
                <span>{isAr ? 'فتح أداة تحزيم الـ APK (PWABuilder)' : 'Open PWABuilder APK Generator'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>{isAr ? 'ملف الـ Manifest والأيقونات مجهزة 100%' : 'Manifest & App Icons Verified'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors cursor-pointer"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
