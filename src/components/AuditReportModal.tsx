import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText } from 'lucide-react';
import { WifiNetwork, LanDevice, SecurityAuditItem, SecurityAlert } from '../types/network';
import { Language, getTranslations } from '../i18n/translations';
import { AUDIT_TRANSLATIONS_AR } from '../i18n/auditTranslations';

interface AuditReportModalProps {
  currentNetwork: WifiNetwork;
  devices: LanDevice[];
  auditItems: SecurityAuditItem[];
  alerts: SecurityAlert[];
  securityScore: number;
  onClose: () => void;
  lang?: Language;
}

export const AuditReportModal: React.FC<AuditReportModalProps> = ({
  currentNetwork,
  devices,
  auditItems,
  alerts,
  securityScore,
  onClose,
  lang = 'ar',
}) => {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'markdown' | 'json'>('markdown');
  const t = getTranslations(lang);

  const generateMarkdown = () => {
    const date = new Date().toISOString();
    if (lang === 'ar') {
      return `# تقرير التدقيق الأمني لشبكة الواي فاي (WiFiGuard)
**تاريخ التقرير:** ${date}
**مستوى الأمان التشفيري الإجمالي:** ${securityScore} / 100
**اسم الشبكة الأساسية (SSID):** ${currentNetwork.ssid} (${currentNetwork.bssid})
**القناة والتردد:** ${currentNetwork.channel} (${currentNetwork.band}, ${currentNetwork.channelWidthMhz} ميغاهرتز)
**معيار التشفير:** ${currentNetwork.security}
**قوة الإشارة (RSSI):** ${currentNetwork.signalDbm} dBm (${currentNetwork.qualityPercent}%)

---

## 1. الملخص التنفيذي وحالة الشبكة
- إجمالي الأجهزة النشطة على النطاق الفرعي: ${devices.length}
- الأجهزة الموثوقة: ${devices.filter((d) => d.isTrusted).length}
- الأجهزة غير الموثوقة / المشبوهة: ${devices.filter((d) => !d.isTrusted).length}
- الثغرات الحرجة المكتشفة: ${auditItems.filter((a) => a.status === 'critical').length}
- التحذيرات الأمنية: ${auditItems.filter((a) => a.status === 'warning').length}

---

## 2. نتائج قائمة التدقيق الأمني
${auditItems
  .map((item, idx) => {
    const ar = AUDIT_TRANSLATIONS_AR[item.id];
    const title = ar ? ar.title : item.title;
    const summary = ar ? ar.summary : item.summary;
    const tech = ar ? ar.technicalDetails : item.technicalDetails;
    const impact = ar ? ar.impact : item.impact;
    const remediation = ar ? ar.remediation : item.remediation;

    return `### ${idx + 1}. ${title} [الحالة: ${item.status === 'passed' ? 'سليم' : item.status === 'warning' ? 'تحذير' : 'حرج'}]
- **الملخص:** ${summary}
- **التشخيص الفني:** ${tech}
- **الأثر الأمني المحتمل:** ${impact}
- **خطوات المعالجة المقترحة:**
${remediation.map((r) => `  * ${r}`).join('\n')}
`;
  })
  .join('\n')}

---

## 3. سجل الأجهزة المتصلة بالنطاق المحلي (192.168.1.0/24)
| عنوان IP | عنوان MAC | اسم الجهاز | المصنّع / OUI | النوع | حالة الثقة | المنافذ المفتوحة |
|---|---|---|---|---|---|---|
${devices
  .map(
    (d) =>
      `| ${d.ip} | ${d.mac} | ${d.hostname} | ${d.vendor} | ${d.deviceType} | ${d.isTrusted ? 'موثوق' : 'غير موثوق'} | ${
        d.ports.length > 0 ? d.ports.map((p) => `${p.port}/${p.service}`).join(', ') : 'لا يوجد'
      } |`
  )
  .join('\n')}

---

## 4. سجل أحداث المراقبة والإنذارات الأمنية
${alerts
  .map((a) => `- [${a.timestamp}] [${a.severity.toUpperCase()}] **${a.title}**: ${a.message} (المصدر: ${a.source})`)
  .join('\n')}

---
*تم اعتماد التقرير وفحص الحزم بواسطة محرك WiFiGuard الأمني المحلي.*
`;
    }

    return `# WiFiGuard Network Security Audit Assessment
**Generated Date:** ${date}
**Overall Security Posture Score:** ${securityScore} / 100
**Primary SSID:** ${currentNetwork.ssid} (${currentNetwork.bssid})
**Channel:** ${currentNetwork.channel} (${currentNetwork.band}, ${currentNetwork.channelWidthMhz} MHz)
**Encryption Standard:** ${currentNetwork.security}
**Signal Strength (RSSI):** ${currentNetwork.signalDbm} dBm (${currentNetwork.qualityPercent}%)

---

## 1. Executive Summary & Security Posture
- Total Monitored LAN Devices: ${devices.length}
- Trusted Endpoints: ${devices.filter((d) => d.isTrusted).length}
- Untrusted / Flagged Endpoints: ${devices.filter((d) => !d.isTrusted).length}
- Critical Vulnerabilities: ${auditItems.filter((a) => a.status === 'critical').length}
- Warnings: ${auditItems.filter((a) => a.status === 'warning').length}

---

## 2. Security Audit Checklist Findings
${auditItems
  .map(
    (item, idx) => `### ${idx + 1}. ${item.title} [Status: ${item.status.toUpperCase()}]
- **Summary:** ${item.summary}
- **Technical Detail:** ${item.technicalDetails}
- **Potential Impact:** ${item.impact}
- **Remediation Steps:**
${item.remediation.map((r) => `  * ${r}`).join('\n')}
`
  )
  .join('\n')}

---

## 3. Discovered Subnet Devices Inventory (192.168.1.0/24)
| IP Address | MAC Address | Hostname | Vendor / OUI | Role | Trust Level | Open Ports |
|---|---|---|---|---|---|---|
${devices
  .map(
    (d) =>
      `| ${d.ip} | ${d.mac} | ${d.hostname} | ${d.vendor} | ${d.deviceType} | ${d.isTrusted ? 'Trusted' : 'Untrusted'} | ${
        d.ports.length > 0 ? d.ports.map((p) => `${p.port}/${p.service}`).join(', ') : 'None'
      } |`
  )
  .join('\n')}

---

## 4. Security Incident & Watchdog Event Log
${alerts
  .map((a) => `- [${a.timestamp}] [${a.severity.toUpperCase()}] **${a.title}**: ${a.message} (Source: ${a.source})`)
  .join('\n')}

---
*Report certified by WiFiGuard Network Security Engine.*
`;
  };

  const generateJson = () => {
    return JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        securityScore,
        network: currentNetwork,
        auditItems,
        devices,
        alerts,
      },
      null,
      2
    );
  };

  const content = exportFormat === 'markdown' ? generateMarkdown() : generateJson();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `wifiguard-audit-report-${new Date().toISOString().slice(0, 10)}.${exportFormat === 'markdown' ? 'md' : 'json'}`;
    const blob = new Blob([content], { type: exportFormat === 'markdown' ? 'text/markdown' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">
                {t.reportModal.title}
              </h2>
              <p className="text-xs text-slate-400">
                {t.reportModal.subtitle}
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

        {/* Format Selector Bar */}
        <div className="px-6 py-2.5 border-b border-slate-800/80 bg-slate-900 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">{t.reportModal.format}:</span>
            <div className="inline-flex rounded-md p-0.5 bg-slate-950 border border-slate-800">
              <button
                onClick={() => setExportFormat('markdown')}
                className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                  exportFormat === 'markdown' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Markdown (.md)
              </button>
              <button
                onClick={() => setExportFormat('json')}
                className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                  exportFormat === 'json' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                JSON (.json)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.actions.copied : t.actions.copy}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.actions.downloadFile}</span>
            </button>
          </div>
        </div>

        {/* Report Preview */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs bg-slate-950 text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-emerald-500/20">
          {content}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-500">
          <span>{t.reportModal.verifiedHash}</span>
          <button
            onClick={onClose}
            className="px-3 py-1 text-slate-400 hover:text-slate-200"
          >
            {t.actions.close}
          </button>
        </div>

      </div>
    </div>
  );
};
