export type Language = 'en' | 'ar';

export interface Translations {
  appName: string;
  tabs: {
    overview: string;
    airwaves: string;
    devices: string;
    speed: string;
    tools: string;
  };
  actions: {
    runAudit: string;
    auditing: string;
    simulateArp: string;
    arpActive: string;
    neutralizeArp: string;
    auditReport: string;
    inspectPorts: string;
    rescanAirwaves: string;
    scanningAirwaves: string;
    sweepSubnet: string;
    sweepingSubnet: string;
    pingNow: string;
    pinging: string;
    startSpeedTest: string;
    testing: string;
    remediate: string;
    acknowledge: string;
    close: string;
    copy: string;
    copied: string;
    downloadFile: string;
    lookup: string;
    trust: string;
    untrust: string;
    markTrusted: string;
    flagSuspicious: string;
    blockImpostor: string;
    probePorts: string;
    probing: string;
  };
  subbar: {
    currentNetwork: string;
    channel: string;
    subnet: string;
    arpAlertTitle: string;
    arpAlertMsg: string;
  };
  overview: {
    securityPosture: string;
    monitoredEndpoints: string;
    signalCongestion: string;
    rogueWatchdog: string;
    hostsActive: string;
    excellentRf: string;
    suspectSsid: string;
    viewArp: string;
    spectrum: string;
    inspect: string;
    auditChecklistTitle: string;
    auditChecklistSubtitle: string;
    passed: string;
    warning: string;
    critical: string;
    bssidSpecsTitle: string;
    gatewayVendor: string;
    opFrequency: string;
    channelBandwidth: string;
    cipherSuite: string;
    pmfStatus: string;
    wpsStatus: string;
    meshBannerTitle: string;
    meshBannerDesc: string;
    watchdogLogTitle: string;
    activeThreats: string;
  };
  airwaves: {
    title: string;
    subtitle: string;
    evilTwinAlertTitle: string;
    evilTwinAlertDesc: string;
    blacklistImpostor: string;
    authorizedAp: string;
    impostorRogue: string;
    spectrumTitle: string;
    spectrumDesc: string;
    band5g: string;
    band24g: string;
    optimizationRec: string;
    noiseFloor: string;
    discoveredAps: string;
    passiveCapture: string;
    filterAll: string;
    filterSecure: string;
    filterOpen: string;
    filterRogue: string;
    colSsid: string;
    colBssid: string;
    colSignal: string;
    colChannel: string;
    colEncryption: string;
    colVendor: string;
    colStatus: string;
  };
  devices: {
    title: string;
    subtitle: string;
    arpIntegrityTitle: string;
    arpCollision: string;
    arpAuthenticated: string;
    arpWarning: string;
    arpNormal: string;
    staticBinding: string;
    searchPlaceholder: string;
    filterAll: string;
    filterTrusted: string;
    filterUntrusted: string;
    filterIot: string;
    filterVulnerable: string;
    colHostname: string;
    colIp: string;
    colMac: string;
    colPorts: string;
    colTraffic: string;
    colTrust: string;
    colActions: string;
    stealth: string;
  };
  speed: {
    title: string;
    subtitle: string;
    pingTargets: string;
    throughputTitle: string;
    throughputSubtitle: string;
    downloadRate: string;
    uploadRate: string;
    bufferbloatScore: string;
    underLoad: string;
    voipSmoothness: string;
    educationalTitle: string;
    educationalBody: string;
  };
  tools: {
    title: string;
    subtitle: string;
    subnetCalcTitle: string;
    hostIp: string;
    cidrPrefix: string;
    networkId: string;
    subnetMask: string;
    usableRange: string;
    usableHosts: string;
    broadcastIp: string;
    macLookupTitle: string;
    macPlaceholder: string;
    identifiedVendor: string;
    macTip: string;
    passEvaluatorTitle: string;
    passInput: string;
    entropy: string;
    crackTime: string;
    rating: string;
    arpSandboxTitle: string;
    arpSandboxDesc: string;
    currentGateway: string;
    authenticMac: string;
    simStatus: string;
    triggerArpSim: string;
    haltArpSim: string;
  };
  portModal: {
    title: string;
    hostname: string;
    role: string;
    trustLevel: string;
    lastSeen: string;
    probeButton: string;
    exposedListenerTitle: string;
    exposedListenerDesc: string;
    discoveredPorts: string;
    noOpenPorts: string;
    listening: string;
  };
  reportModal: {
    title: string;
    subtitle: string;
    format: string;
    verifiedHash: string;
  };
  footer: {
    desc: string;
    activeLinkNominal: string;
    exportAssessment: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'WiFiGuard',
    tabs: {
      overview: 'Overview',
      airwaves: 'Airwaves',
      devices: 'LAN Devices',
      speed: 'Speed & Ping',
      tools: 'Security Tools',
    },
    actions: {
      runAudit: 'Run Deep Audit',
      auditing: 'Auditing Subnet...',
      simulateArp: 'Simulate ARP Attack',
      arpActive: 'ARP Attack Active (Stop)',
      neutralizeArp: 'Neutralize Attack',
      auditReport: 'Audit Report',
      inspectPorts: 'Inspect Ports',
      rescanAirwaves: 'Rescan Airwaves',
      scanningAirwaves: 'Probing 802.11 Beacons...',
      sweepSubnet: 'Sweep LAN Subnet',
      sweepingSubnet: 'Sweeping Subnet /24...',
      pingNow: 'Ping Targets Now',
      pinging: 'Pinging Targets...',
      startSpeedTest: 'Start Speed & Bufferbloat Test',
      testing: 'Testing',
      remediate: 'Remediate',
      acknowledge: 'Acknowledge',
      close: 'Close',
      copy: 'Copy',
      copied: 'Copied',
      downloadFile: 'Download File',
      lookup: 'Lookup',
      trust: 'Trusted',
      untrust: 'Untrusted',
      markTrusted: 'Mark as Trusted Device',
      flagSuspicious: 'Flag as Suspicious / Quarantine',
      blockImpostor: 'Block Impostor',
      probePorts: 'Probe Common Ports (1–8443)',
      probing: 'Probing Sockets',
    },
    subbar: {
      currentNetwork: 'Current Network',
      channel: 'Ch',
      subnet: 'Subnet',
      arpAlertTitle: 'CRITICAL SECURITY INTRUSION DETECTED',
      arpAlertMsg: 'Rogue host is sending unsolicited gratuitous ARP replies claiming ownership of Default Gateway IP. Outbound packets may be subject to Man-In-The-Middle interception!',
    },
    overview: {
      securityPosture: 'Security Posture',
      monitoredEndpoints: 'Monitored LAN Endpoints',
      signalCongestion: 'Signal & Congestion',
      rogueWatchdog: 'Rogue Watchdog',
      hostsActive: 'Hosts Active',
      excellentRf: 'Excellent RF Link',
      suspectSsid: 'Suspect SSID',
      viewArp: 'View ARP',
      spectrum: 'Spectrum',
      inspect: 'Inspect',
      auditChecklistTitle: 'Cryptographic & Subnet Audit Checklist',
      auditChecklistSubtitle: 'Real-time evaluation against NIST SP 800-153 and Wi-Fi Alliance baselines',
      passed: 'passed',
      warning: 'warning',
      critical: 'critical',
      bssidSpecsTitle: 'Active BSSID Link Specifications',
      gatewayVendor: 'Gateway Vendor',
      opFrequency: 'Operating Frequency',
      channelBandwidth: 'Channel Bandwidth',
      cipherSuite: 'Cipher Suite',
      pmfStatus: 'Protected Mgmt Frames',
      wpsStatus: 'WPS Status',
      meshBannerTitle: 'Real-Time Topology Integrity Grid',
      meshBannerDesc: 'Continuous zero-trust socket & broadcast frame validation',
      watchdogLogTitle: 'Watchdog Event Log',
      activeThreats: 'active threats',
    },
    airwaves: {
      title: 'RF Airwaves & Spectrum Diagnostics',
      subtitle: 'Real-time beacon probe, 802.11 spectrum utilization, and rogue access point hunter',
      evilTwinAlertTitle: 'Evil Twin / Impostor Access Point Detected in Proximity',
      evilTwinAlertDesc: 'An unverified BSSID is broadcasting an SSID pattern that closely mimics your legitimate network, but lacks WPA encryption.',
      blacklistImpostor: 'Blacklist Impostor BSSID',
      authorizedAp: 'Authorized Access Point',
      impostorRogue: 'Impostor Rogue Node',
      spectrumTitle: 'Wi-Fi Channel Spectrum & Overlap Analysis',
      spectrumDesc: 'Visual RF bell-curves displaying co-channel and adjacent-channel interference',
      band5g: '5 GHz Band (Clean UNII)',
      band24g: '2.4 GHz Band (Legacy)',
      optimizationRec: 'Spectrum Optimization Recommendation',
      noiseFloor: 'Noise Floor: -92 dBm nominal',
      discoveredAps: 'Discovered Over-The-Air Access Points',
      passiveCapture: 'Passive beacon frame capture on active radio interface',
      filterAll: 'All',
      filterSecure: 'WPA2/WPA3',
      filterOpen: 'Open / WEP',
      filterRogue: 'Rogue Threats',
      colSsid: 'SSID / Network',
      colBssid: 'BSSID (MAC)',
      colSignal: 'Signal (dBm)',
      colChannel: 'Channel & Band',
      colEncryption: 'Encryption',
      colVendor: 'Vendor',
      colStatus: 'Security State',
    },
    devices: {
      title: 'LAN Host Inventory & ARP Watchdog',
      subtitle: 'Local subnet 192.168.1.0/24 · ARP cache spoofing protection · Port vulnerability inspection',
      arpIntegrityTitle: 'Gateway ARP Cache Integrity',
      arpCollision: 'COLLISION DETECTED (MITM)',
      arpAuthenticated: 'AUTHENTICATED',
      arpWarning: 'WARNING: Conflicting MAC addresses broadcasted for default router IP 192.168.1.1!',
      arpNormal: '192.168.1.1 strictly maps to authentic gateway MAC. No gratuitous spoof frames detected.',
      staticBinding: 'Static MAC Binding: ENFORCED',
      searchPlaceholder: 'Search IP, MAC, hostname, or vendor...',
      filterAll: 'All',
      filterTrusted: 'Trusted',
      filterUntrusted: 'Untrusted',
      filterIot: 'IoT / Cams',
      filterVulnerable: 'Vulnerable',
      colHostname: 'Endpoint / Hostname',
      colIp: 'IP Address',
      colMac: 'MAC & OUI Vendor',
      colPorts: 'Discovered Ports',
      colTraffic: 'Subnet Traffic',
      colTrust: 'Trust Status',
      colActions: 'Actions',
      stealth: '0 open (stealth)',
    },
    speed: {
      title: 'Latency Matrix & Bufferbloat Quality Test',
      subtitle: 'Round-trip delay time (RTT), packet jitter, and throughput under network saturation',
      pingTargets: 'Ping Targets Now',
      throughputTitle: 'Bandwidth Throughput & Bufferbloat Grade',
      throughputSubtitle: 'Tests queue latency under full upload/download load to verify VoIP & gaming smoothness',
      downloadRate: 'Download Rate',
      uploadRate: 'Upload Rate',
      bufferbloatScore: 'Bufferbloat Score',
      underLoad: '(+4 ms under full load)',
      voipSmoothness: 'Exceptional for real-time video & VoIP',
      educationalTitle: 'Understanding Bufferbloat in Wi-Fi Networks',
      educationalBody: 'Bufferbloat occurs when excess router buffers become congested with high-volume packet queues (e.g. streaming 4K video or massive file downloads), causing simultaneous real-time traffic like Zoom calls, gaming, and DNS requests to experience high latency spikes. A score of A+ or A signifies effective SQM (Smart Queue Management) or CAKE scheduling.',
    },
    tools: {
      title: 'Network Engineering & Security Toolset',
      subtitle: 'CIDR subnet calculators, MAC OUI vendor databases, cryptographic entropy testers, and attack simulators',
      subnetCalcTitle: 'IPv4 Subnet & CIDR Calculator',
      hostIp: 'Host IP Address',
      cidrPrefix: 'CIDR Prefix',
      networkId: 'Network ID',
      subnetMask: 'Subnet Mask',
      usableRange: 'Usable Host Range',
      usableHosts: 'Usable Hosts',
      broadcastIp: 'Broadcast IP',
      macLookupTitle: 'MAC Hardware OUI Vendor Lookup',
      macPlaceholder: 'e.g. 3C:37:12 or EC:62:60',
      identifiedVendor: 'Identified Manufacturer',
      macTip: 'Security Tip: Modern smartphones randomize MAC addresses by default when probing Wi-Fi networks to prevent persistent physical tracking.',
      passEvaluatorTitle: 'Wi-Fi Passphrase Entropy & Hashcat Resistance',
      passInput: 'Wi-Fi Passphrase to Test',
      entropy: 'Shannon Entropy',
      crackTime: 'Crack Time (8x RTX 4090)',
      rating: 'Security Rating',
      arpSandboxTitle: 'ARP Poisoning Defense Sandbox',
      arpSandboxDesc: 'ARP poisoning exploits the stateless nature of the Address Resolution Protocol by sending unsolicited ARP packets that associate an attacker\'s MAC address with the IP address of an authorized gateway.',
      currentGateway: 'Current Gateway IP',
      authenticMac: 'Authentic MAC',
      simStatus: 'Simulation Status',
      triggerArpSim: 'Trigger ARP Spoofing Simulation',
      haltArpSim: 'Halt Simulated ARP Spoofing Attack',
    },
    portModal: {
      title: 'Port Vulnerability Inspector',
      hostname: 'Hostname',
      role: 'Device Role',
      trustLevel: 'Trust Level',
      lastSeen: 'Last Seen',
      probeButton: 'Probe Common Ports (1–8443)',
      exposedListenerTitle: 'Exposed High-Risk Listener Detected',
      exposedListenerDesc: 'This endpoint is running unencrypted or vulnerable listeners (e.g. Telnet 23 or unauthenticated RTSP 554). If not disabled, an attacker on the same local subnet can attempt brute-force exploitation.',
      discoveredPorts: 'Discovered Open Ports',
      noOpenPorts: 'No open listeners exposed to the local subnet, or port probe hasn\'t been executed yet.',
      listening: 'LISTENING',
    },
    reportModal: {
      title: 'Network Security Audit Report',
      subtitle: 'Formal cryptographic assessment & device inventory',
      format: 'Format',
      verifiedHash: 'Cryptographic hash verified by WiFiGuard Local Analyzer',
    },
    footer: {
      desc: 'Local Network Defense & Cryptographic Audit Console',
      activeLinkNominal: 'Active Link Nominal',
      exportAssessment: 'Export Assessment',
    },
  },
  ar: {
    appName: 'حارس الشبكة (WiFiGuard)',
    tabs: {
      overview: 'نظرة عامة',
      airwaves: 'الموجات اللاسلكية',
      devices: 'أجهزة الشبكة',
      speed: 'السرعة والاستجابة',
      tools: 'أدوات الأمان',
    },
    actions: {
      runAudit: 'فحص أمني شامل',
      auditing: 'جارٍ فحص الشبكة...',
      simulateArp: 'محاكاة هجوم ARP',
      arpActive: 'هجوم ARP نشط (إيقاف)',
      neutralizeArp: 'صد الهجوم فوراً',
      auditReport: 'تقرير الأمان',
      inspectPorts: 'فحص المنافذ',
      rescanAirwaves: 'إعادة مسح الإشارات',
      scanningAirwaves: 'جارٍ التقاط إشارات 802.11...',
      sweepSubnet: 'مسح نطاق الشبكة LAN',
      sweepingSubnet: 'جارٍ مسح النطاق 192.168.1.0/24...',
      pingNow: 'قياس زمن الاستجابة (Ping)',
      pinging: 'جارٍ إرسال حزم الاختبار...',
      startSpeedTest: 'بدء اختبار السرعة وانتفاخ الذاكرة',
      testing: 'اختبار',
      remediate: 'معالجة الثغرة',
      acknowledge: 'تأكيد وقراءة',
      close: 'إغلاق',
      copy: 'نسخ',
      copied: 'تم النسخ',
      downloadFile: 'تحميل التقرير',
      lookup: 'بحث',
      trust: 'موثوق',
      untrust: 'غير موثوق',
      markTrusted: 'تعيين كجهاز موثوق',
      flagSuspicious: 'تمييز كجهاز مشبوه / عزل',
      blockImpostor: 'حظر النقطة الوهمية',
      probePorts: 'فحص المنافذ الشائعة (1–8443)',
      probing: 'جارٍ فحص المقابس',
    },
    subbar: {
      currentNetwork: 'الشبكة الحالية',
      channel: 'القناة',
      subnet: 'النطاق الفرعي',
      arpAlertTitle: 'تحذير أمني حرج: رصد محاولة اختراق',
      arpAlertMsg: 'جهاز غريب يرسل حزم ARP غير مصرح بها يدّعي فيها ملكية عنوان بوابة التوجيه الافتراضية (192.168.1.1). قد تتعرض بياناتك لاعتراض من نوع هجوم الوسيط (Man-In-The-Middle)!',
    },
    overview: {
      securityPosture: 'مستوى الأمان الإجمالي',
      monitoredEndpoints: 'الأجهزة النشطة على الشبكة',
      signalCongestion: 'قوة الإشارة والازدحام',
      rogueWatchdog: 'مراقب النقاط الوهمية',
      hostsActive: 'جهاز نشط',
      excellentRf: 'رابط لاسلكي ممتاز',
      suspectSsid: 'شبكة مشبوهة',
      viewArp: 'جدول ARP',
      spectrum: 'طيف الترددات',
      inspect: 'فحص',
      auditChecklistTitle: 'قائمة التدقيق الأمني والتشفيري',
      auditChecklistSubtitle: 'تقييم فوري مطابق لمعايير NIST SP 800-153 وتحالف Wi-Fi Alliance',
      passed: 'سليم',
      warning: 'تحذير',
      critical: 'حرج',
      bssidSpecsTitle: 'المواصفات الفنية لنقطة الاتصال النشطة',
      gatewayVendor: 'الشركة المصنعة للراوتر',
      opFrequency: 'تردد التشغيل',
      channelBandwidth: 'عرض القناة اللاسلكية',
      cipherSuite: 'خوارزمية التشفير',
      pmfStatus: 'إطارات الإدارة المحمية (PMF)',
      wpsStatus: 'حالة WPS',
      meshBannerTitle: 'مصفوفة حماية بنية الشبكة في الوقت الحقيقي',
      meshBannerDesc: 'مراقبة دائمة بحسب معيار انعدام الثقة (Zero-Trust) لحزم البث والمقابس',
      watchdogLogTitle: 'سجل أحداث المراقبة الأمنية',
      activeThreats: 'تهديدات نشطة',
    },
    airwaves: {
      title: 'تشخيص الموجات اللاسلكية وطيف الترددات',
      subtitle: 'مسح فوري لحزم المنارات (Beacons)، قياس استهلاك الطيف، واصطياد نقاط الوصول المخادعة',
      evilTwinAlertTitle: 'رصد نقطة اتصال خبيثة / توأم شرير (Evil Twin) في المحيط',
      evilTwinAlertDesc: 'تم رصد نقطة وصول غير موثقة تبث اسماً مطابقاً لشبكتك ولكن بدون تشفير WPA، مما يهدف لخداع المستخدمين وسرقة بياناتهم.',
      blacklistImpostor: 'إدراج النقطة الخبيثة في القائمة السوداء',
      authorizedAp: 'نقطة الوصول الرسمية المعتمدة',
      impostorRogue: 'نقطة الوصول الدخيلة المخادعة',
      spectrumTitle: 'تحليل طيف القنوات وتداخل الترددات',
      spectrumDesc: 'منحنيات بيانية دقيقة توضح التداخل عبر القنوات المتطابقة والمجاورة',
      band5g: 'نطاق 5 غيغاهرتز (نظيف وسريع)',
      band24g: 'نطاق 2.4 غيغاهرتز (واسع المدى)',
      optimizationRec: 'توصية تحسين التردد',
      noiseFloor: 'مستوى الضوضاء: -92 dBm طبيعي',
      discoveredAps: 'نقاط الوصول اللاسلكية الملتقطة في الهواء',
      passiveCapture: 'التقاط صامت لحزم المنارات عبر واجهة الراديو النشطة',
      filterAll: 'الكل',
      filterSecure: 'مشفر WPA2/WPA3',
      filterOpen: 'مفتوح / WEP ضعيف',
      filterRogue: 'تهديدات خبيثة',
      colSsid: 'اسم الشبكة (SSID)',
      colBssid: 'عنوان النقطة (BSSID)',
      colSignal: 'الإشارة (dBm)',
      colChannel: 'القناة والنطاق',
      colEncryption: 'التشفير',
      colVendor: 'المصنّع',
      colStatus: 'حالة الأمان',
    },
    devices: {
      title: 'سجل أجهزة الشبكة ومراقب جدول ARP',
      subtitle: 'النطاق المحلي 192.168.1.0/24 · حماية من انتحال الذاكرة الوسيطة ARP · فحص ثغرات المنافذ',
      arpIntegrityTitle: 'سلامة تطابق عنوان بوابة الراوتر في ARP',
      arpCollision: 'تم رصد تضارب وانتحال (MITM)',
      arpAuthenticated: 'موثق وسليم',
      arpWarning: 'تحذير: تم بث عناوين MAC متناقضة تدّعي ملكية الراوتر 192.168.1.1!',
      arpNormal: 'العنوان 192.168.1.1 مرتبط حصرياً ببطاقة Netgear الأصلية. لا توجد حزم انتحال.',
      staticBinding: 'الربط الثابت للعنوان MAC: مفعّل',
      searchPlaceholder: 'ابحث برقم IP أو MAC أو اسم الجهاز أو المصنّع...',
      filterAll: 'الكل',
      filterTrusted: 'أجهزة موثوقة',
      filterUntrusted: 'غير موثوقة',
      filterIot: 'إنترنت الأشياء والكاميرات',
      filterVulnerable: 'أجهزة تحوي ثغرات',
      colHostname: 'اسم الجهاز',
      colIp: 'عنوان IP',
      colMac: 'عنوان MAC والمصنّع',
      colPorts: 'المنافذ المفتوحة',
      colTraffic: 'حركة البيانات',
      colTrust: 'مستوى الثقة',
      colActions: 'الإجراءات',
      stealth: '0 مفتوح (مخفي)',
    },
    speed: {
      title: 'مصفوفة زمن الاستجابة وجودة إدارة الحزم',
      subtitle: 'قياس زمن الذهاب والإياب (RTT)، تذبذب الحزم (Jitter)، ومعدل نقل البيانات تحت الضغط',
      pingTargets: 'فحص الاستجابة الآن (Ping)',
      throughputTitle: 'معدل نقل البيانات واختبار انتفاخ الذاكرة المؤقتة (Bufferbloat)',
      throughputSubtitle: 'قياس زمن تأخر الحزم أثناء التحميل الأقصى لضمان سلاسة مكالمات الصوت والألعاب',
      downloadRate: 'سرعة التنزيل',
      uploadRate: 'سرعة الرفع',
      bufferbloatScore: 'تقييم Bufferbloat',
      underLoad: '(+4 ميلي ثانية تحت التحميل الكامل)',
      voipSmoothness: 'ممتاز لمكالمات الفيديو والاتصال الصوتي',
      educationalTitle: 'ما هو انتفاخ الذاكرة المؤقتة (Bufferbloat) في شبكات الواي فاي؟',
      educationalBody: 'يحدث انتفاخ الذاكرة المؤقتة عندما تمتلئ ذاكرة التخزين المؤقت في جهاز التوجيه (الراوتر) بحزم البيانات الكبيرة أثناء التحميل أو المشاهدة العالية، مما يؤدي إلى تأخر حزم البيانات الفورية مثل مكالمات Zoom والألعاب المباشرة. حصولك على تقييم A+ أو A يعني أن جهازك يدير طوابير الانتظار بذكاء فائق عبر خوارزميات SQM أو CAKE.',
    },
    tools: {
      title: 'حقيبة أدوات هندسة وأمن الشبكات',
      subtitle: 'حواسب الشبكات الفرعية، قواعد بيانات OUI للمصنّعين، اختبار تعقيد التشفير، ومحاكيات الهجمات',
      subnetCalcTitle: 'حاسبة النطاق الفرعي IPv4 و CIDR',
      hostIp: 'عنوان IP للجهاز',
      cidrPrefix: 'بادئة CIDR',
      networkId: 'عنوان الشبكة (Network ID)',
      subnetMask: 'قناع الشبكة (Subnet Mask)',
      usableRange: 'نطاق العناوين القابلة للاستخدام',
      usableHosts: 'عدد الأجهزة المتاحة',
      broadcastIp: 'عنوان البث العام (Broadcast)',
      macLookupTitle: 'البحث عن الشركة المصنعة لبطاقة الشبكة (OUI)',
      macPlaceholder: 'مثال: 3C:37:12 أو EC:62:60',
      identifiedVendor: 'الشركة المصنعة المحددة',
      macTip: 'معلومة أمنية: تقوم الهواتف الذكية الحديثة بإنشاء عناوين MAC عشوائية عند فحص شبكات الواي فاي لحماية خصوصية المستخدم ومنع التعقب الجغرافي.',
      passEvaluatorTitle: 'مقياس تعقيد كلمة المرور ومقاومة أجهزة التكسير',
      passInput: 'كلمة مرور الواي فاي للاختبار',
      entropy: 'مقياس شانون للعشوائية (Entropy)',
      crackTime: 'زمن التخمين (مصفوفة 8x RTX 4090)',
      rating: 'مستوى الأمان التشفيري',
      arpSandboxTitle: 'بيئة اختبار محاكاة هجوم انتحال ARP',
      arpSandboxDesc: 'يستغل هجوم انتحال ARP الطبيعة غير الموثقة للبروتوكول عبر إرسال حزم رد مزيفة تربط عنوان المهاجم بعنوان بوابة التوجيه، مما يمكّنه من التجسس على حركة المرور.',
      currentGateway: 'عنوان البوابة الحالي',
      authenticMac: 'عنوان MAC الأصلي',
      simStatus: 'حالة المحاكاة',
      triggerArpSim: 'تشغيل محاكاة هجوم انتحال ARP',
      haltArpSim: 'إيقاف محاكاة الهجوم واستعادة الاستقرار',
    },
    portModal: {
      title: 'فاحص ثغرات المنافذ والخدمات',
      hostname: 'اسم الجهاز',
      role: 'نوع الجهاز',
      trustLevel: 'مستوى الثقة',
      lastSeen: 'آخر ظهور',
      probeButton: 'فحص المنافذ الشائعة (1–8443)',
      exposedListenerTitle: 'تم رصد خدمة مكشوفة عالية الخطورة',
      exposedListenerDesc: 'هذا الجهاز يشغّل خدمات غير مشفرة أو قديمة مثل منفذ Telnet 23 أو بث RTSP 554 غير المحمي. إذا لم تُغلق، يمكن لأي جهاز على الشبكة استغلالها واختراق الجهاز.',
      discoveredPorts: 'المنافذ المفتوحة المكتشفة',
      noOpenPorts: 'لا توجد منافذ مفتوحة مكشوفة للشبكة المحلية، أو لم يتم إجراء فحص المنافذ بعد.',
      listening: 'يستمع (نشط)',
    },
    reportModal: {
      title: 'تقرير التدقيق الأمني للشبكة',
      subtitle: 'تقييم تشفيري معتمد وسجل كامل لأجهزة الشبكة المحلية',
      format: 'صيغة التقرير',
      verifiedHash: 'تم التحقق من البصمة التشفيرية بواسطة محرك WiFiGuard المحلي',
    },
    footer: {
      desc: 'وحدة الدفاع عن الشبكة المحلية والتدقيق التشفيري',
      activeLinkNominal: 'اتصال نشط وسليم',
      exportAssessment: 'تصدير التقرير الأمني',
    },
  },
};

export function getTranslations(lang?: Language | string): Translations {
  if (lang === 'en' && translations?.en) return translations.en;
  if (translations?.ar) return translations.ar;
  if (translations?.en) return translations.en;
  return (translations?.ar || translations?.en) as Translations;
}
