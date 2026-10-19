import React, { useState } from 'react';
import {
  Calculator,
  Search,
  Key,
  ShieldAlert,
} from 'lucide-react';
import { lookupMacVendor } from '../services/networkEngine';
import { Language, getTranslations } from '../i18n/translations';

interface ToolsViewProps {
  isArpPoisoned: boolean;
  onToggleArpSimulation: () => void;
  lang?: Language;
}

export const ToolsView: React.FC<ToolsViewProps> = ({
  isArpPoisoned,
  onToggleArpSimulation,
  lang = 'ar',
}) => {
  const [calcIp, setCalcIp] = useState('192.168.1.42');
  const [cidrPrefix, setCidrPrefix] = useState(24);

  const [macQuery, setMacQuery] = useState('3C:37:12:4A:88:9C');
  const [macResult, setMacResult] = useState<string | null>(lookupMacVendor('3C:37:12:4A:88:9C'));

  const [wifiPass, setWifiPass] = useState('TitanShield#2026!');
  const t = getTranslations(lang);

  const calculateSubnet = () => {
    try {
      const parts = calcIp.trim().split('.').map(Number);
      if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
        return null;
      }

      const totalHosts = Math.pow(2, 32 - cidrPrefix);
      const usableHosts = cidrPrefix >= 31 ? 0 : totalHosts - 2;

      const maskBinary = '1'.repeat(cidrPrefix) + '0'.repeat(32 - cidrPrefix);
      const maskParts = [];
      for (let i = 0; i < 4; i++) {
        maskParts.push(parseInt(maskBinary.slice(i * 8, (i + 1) * 8), 2));
      }
      const netmask = maskParts.join('.');

      const ipNum = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
      const maskNum = (maskParts[0] << 24) | (maskParts[1] << 16) | (maskParts[2] << 8) | maskParts[3];
      const netNum = (ipNum & maskNum) >>> 0;
      const bcastNum = (netNum | (~maskNum >>> 0)) >>> 0;

      const numToIp = (num: number) => [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255,
      ].join('.');

      const networkAddr = numToIp(netNum);
      const broadcastAddr = numToIp(bcastNum);
      const firstUsable = numToIp(netNum + 1);
      const lastUsable = numToIp(bcastNum - 1);

      return {
        netmask,
        networkAddr,
        broadcastAddr,
        usableRange: `${firstUsable} — ${lastUsable}`,
        usableHosts,
      };
    } catch {
      return null;
    }
  };

  const subnetResult = calculateSubnet();

  const handleLookupMac = () => {
    setMacResult(lookupMacVendor(macQuery));
  };

  const evaluatePassphrase = (pass: string) => {
    let charset = 0;
    if (/[a-z]/.test(pass)) charset += 26;
    if (/[A-Z]/.test(pass)) charset += 26;
    if (/[0-9]/.test(pass)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(pass)) charset += 32;

    const entropy = Math.round(pass.length * Math.log2(Math.max(charset, 2)));
    const combinations = Math.pow(Math.max(charset, 2), pass.length);
    const secondsToCrack = combinations / 500000;

    let crackTime = lang === 'ar' ? 'فوراً' : 'Instantly';
    if (secondsToCrack > 31536000 * 1000000) crackTime = lang === 'ar' ? '> 100 مليون سنة' : '> 100 Million Years';
    else if (secondsToCrack > 31536000 * 1000) crackTime = lang === 'ar' ? '> 1,000 سنة' : '> 1,000 Years';
    else if (secondsToCrack > 31536000) crackTime = lang === 'ar' ? `${Math.round(secondsToCrack / 31536000)} سنة` : `${Math.round(secondsToCrack / 31536000)} Years`;
    else if (secondsToCrack > 86400) crackTime = lang === 'ar' ? `${Math.round(secondsToCrack / 86400)} يوم` : `${Math.round(secondsToCrack / 86400)} Days`;
    else if (secondsToCrack > 3600) crackTime = lang === 'ar' ? `${Math.round(secondsToCrack / 3600)} ساعة` : `${Math.round(secondsToCrack / 3600)} Hours`;
    else if (secondsToCrack > 60) crackTime = lang === 'ar' ? `${Math.round(secondsToCrack / 60)} دقيقة` : `${Math.round(secondsToCrack / 60)} Minutes`;

    let strength = lang === 'ar' ? 'ضعيفة' : 'Weak';
    if (entropy >= 80) strength = lang === 'ar' ? 'تشفير فائق' : 'Cryptographic';
    else if (entropy >= 60) strength = lang === 'ar' ? 'قوية جداً' : 'Strong';
    else if (entropy >= 45) strength = lang === 'ar' ? 'متوسطة' : 'Moderate';

    return { entropy, crackTime, strength };
  };

  const passStats = evaluatePassphrase(wifiPass);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-base font-semibold text-white">
          {t.tools.title}
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          {t.tools.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Tool 1: Subnet & CIDR Calculator */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              {t.tools.subnetCalcTitle}
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="text-[11px] text-slate-400 block mb-1">{t.tools.hostIp}</label>
              <input
                type="text"
                value={calcIp}
                onChange={(e) => setCalcIp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">{t.tools.cidrPrefix}</label>
              <select
                value={cidrPrefix}
                onChange={(e) => setCidrPrefix(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-emerald-500 cursor-pointer"
              >
                {[8, 12, 16, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((p) => (
                  <option key={p} value={p}>
                    /{p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {subnetResult ? (
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs space-y-2 font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">{t.tools.networkId}:</span>
                <span className="text-white font-semibold">{subnetResult.networkAddr}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">{t.tools.subnetMask}:</span>
                <span className="text-slate-200">{subnetResult.netmask}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">{t.tools.usableRange}:</span>
                <span className="text-emerald-400">{subnetResult.usableRange}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">{t.tools.usableHosts}:</span>
                <span className="text-slate-200">{subnetResult.usableHosts.toLocaleString()} IPs</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">{t.tools.broadcastIp}:</span>
                <span className="text-slate-300">{subnetResult.broadcastAddr}</span>
              </div>
            </div>
          ) : (
            <div className="p-3 text-xs text-rose-400 bg-rose-950/20 border border-rose-900 rounded-lg">
              {lang === 'ar' ? 'صيغة عنوان IPv4 غير صالحة.' : 'Invalid IPv4 address format.'}
            </div>
          )}
        </div>

        {/* Tool 2: MAC OUI Vendor Lookup */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              {t.tools.macLookupTitle}
            </h3>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">
              MAC Address or 6-Hex OUI Prefix
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={macQuery}
                onChange={(e) => setMacQuery(e.target.value)}
                placeholder={t.tools.macPlaceholder}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-cyan-500 uppercase"
              />
              <button
                onClick={handleLookupMac}
                className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
              >
                {t.actions.lookup}
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{t.tools.identifiedVendor}:</span>
              <span className="text-white font-semibold font-mono">{macResult}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-800/80">
              <span>IEEE Registry: Registered OUI</span>
              <span className="text-slate-500 font-mono">Unicast Burned-in Address</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
            {t.tools.macTip}
          </div>
        </div>

        {/* Tool 3: WPA Key Strength Evaluator */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              {t.tools.passEvaluatorTitle}
            </h3>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">
              {t.tools.passInput}
            </label>
            <input
              type="text"
              value={wifiPass}
              onChange={(e) => setWifiPass(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg">
              <span className="text-[11px] text-slate-500 block">{t.tools.entropy}</span>
              <span className="font-mono font-bold text-white text-base block mt-0.5">
                {passStats.entropy} bits
              </span>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg">
              <span className="text-[11px] text-slate-500 block">{t.tools.crackTime}</span>
              <span className="font-mono font-bold text-emerald-400 text-xs block mt-1.5 truncate">
                {passStats.crackTime}
              </span>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg">
              <span className="text-[11px] text-slate-500 block">{t.tools.rating}</span>
              <span className="font-mono font-bold text-xs block mt-1.5 text-emerald-400">
                {passStats.strength}
              </span>
            </div>
          </div>
        </div>

        {/* Tool 4: ARP Spoofing / MITM Attack Sandbox */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              {t.tools.arpSandboxTitle}
            </h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {t.tools.arpSandboxDesc}
          </p>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-2 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{t.tools.currentGateway}:</span>
              <span className="text-white">192.168.1.1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{t.tools.authenticMac}:</span>
              <span className="text-emerald-400">3C:37:12:4A:88:91 (Netgear)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{t.tools.simStatus}:</span>
              <span className={`font-bold ${isArpPoisoned ? 'text-rose-400' : 'text-emerald-400'}`}>
                {isArpPoisoned ? (lang === 'ar' ? 'هجوم انتحال نشط' : 'INTRUSION TRIGGERED') : (lang === 'ar' ? 'مستقر وموثق' : 'QUIET / SECURE')}
              </span>
            </div>
          </div>

          <button
            onClick={onToggleArpSimulation}
            className={`w-full py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              isArpPoisoned
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-amber-600 hover:bg-amber-500 text-slate-950'
            }`}
          >
            {isArpPoisoned ? t.tools.haltArpSim : t.tools.triggerArpSim}
          </button>
        </div>

      </div>

    </div>
  );
};
