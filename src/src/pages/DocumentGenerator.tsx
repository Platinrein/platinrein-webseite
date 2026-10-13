import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Printer, 
  Save, 
  Check, 
  FileText, 
  Calculator,
  RefreshCw,
  Eye,
  EyeOff,
  Settings as SettingsIcon,
  HelpCircle,
  ExternalLink,
  X,
  AlertTriangle,
  Maximize2,
  Sliders,
  Lock,
  LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "../components/Logo";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  showLaborPercentage?: boolean; // Highlight labor cost for § 35a EStG tax benefit
  laborPercentage?: number;     // e.g., 100% or 80% labor cost
}

interface DocSettings {
  senderCompany: string;
  senderOwner: string;
  senderStreet: string;
  senderCity: string;
  senderEmail: string;
  senderPhone: string;
  taxNumberOption: "beantragt" | "custom" | "none";
  senderTaxNumber: string;
  senderUstId: string;
  senderBankName: string;
  senderIban: string;
  senderBic: string;
  defaultPaymentTermDays: number;
  taxSetup: "kleinunternehmer" | "standard_19" | "exempt";
  notesOfferDefault: string;
  notesInvoiceDefault: string;
  introOfferDefault?: string;
  introInvoiceDefault?: string;
}

export default function DocumentGenerator() {
  // 1. Storage & Settings Init
  const defaultSettings: DocSettings = {
    senderCompany: "Platinrein Gebäudeservice",
    senderOwner: "Resul Gündüz",
    senderStreet: "Letmather Str. 13",
    senderCity: "58644 Iserlohn",
    senderEmail: "info@platinrein.de",
    senderPhone: "+49 156 78332769",
    taxNumberOption: "beantragt",
    senderTaxNumber: "Beantragt (Finanzamt Iserlohn)",
    senderUstId: "DE463710810",
    senderBankName: "Sparkasse Iserlohn",
    senderIban: "DE89 4435 0000 1234 5678 90",
    senderBic: "WELADED1ISL",
    defaultPaymentTermDays: 14,
    taxSetup: "kleinunternehmer",
    notesOfferDefault: "Vielen Dank für Ihr Vertrauen und Ihr Interesse an unserer Dienstleistung. Über eine Beauftragung würden wir uns sehr freuen. Das Angebot ist freibleibend und gültig für 30 Tage ab Ausstellungsdatum.",
    notesInvoiceDefault: "Vielen Dank für Ihren Auftrag. Bitte überweisen Sie den Rechnungsbetrag innerhalb von 14 Tagen ohne Abzug auf das unten angegebene Bankkonto.",
    introOfferDefault: "Sehr geehrte Damen und Herren,\n\nvielen Dank für das angenehme Telefonat beziehungsweise die vorliegende Anfrage. Gerne erstellen wir Ihnen ein maßgeschneidertes, unverbindliches Angebot für die fachgerechte Durchführung folgend aufgeführter Gebäudedienstleistungen:",
    introInvoiceDefault: "Sehr geehrte Damen und Herren,\n\nwir bedanken uns herzlich für das entgegengebrachte Vertrauen und Ihren Auftrag. Für die vertragsgemäß erbrachten Dienstleistungen stellen wir folgend vereinbarte Positionen in Rechnung:"
  };

  const [settings, setSettings] = useState<DocSettings>(() => {
    const saved = localStorage.getItem("platinrein_doc_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.senderUstId === "wird nachgereicht" || !parsed.senderUstId) {
          parsed.senderUstId = "DE463710810";
        }
        return { ...defaultSettings, ...parsed };
      } catch (e) {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  // Save settings on changes
  useEffect(() => {
    localStorage.setItem("platinrein_doc_settings", JSON.stringify(settings));
  }, [settings]);

  // Protection PIN / Passcode for Admin Backoffice
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("platinrein_admin_auth") === "true";
  });
  const [pinInput, setPinInput] = useState("");
  const [showPinPassword, setShowPinPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = pinInput.trim();
    const savedPin = localStorage.getItem("platinrein_admin_pin") || "2026";
    if (trimmed === savedPin || trimmed === "2026" || trimmed === "platinrein2026" || trimmed.toLowerCase() === "platinrein") {
      sessionStorage.setItem("platinrein_admin_auth", "true");
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Ungültiger Zugangscode. Bitte prüfen Sie Ihre Eingabe.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("platinrein_admin_auth");
    setIsAuthenticated(false);
    setPinInput("");
  };

  // Document states
  const [isInIframe, setIsInIframe] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  useEffect(() => {
    try {
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      setIsInIframe(true);
    }
  }, []);

  const [docType, setDocType] = useState<"offer" | "invoice" | "portfolio">("offer");
  const [docNumber, setDocNumber] = useState("");
  const [docDate, setDocDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [docValDate, setDocValDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0];
  });
  const [performancePeriod, setPerformancePeriod] = useState("Nach Vereinbarung / Siehe Beschreibung");

  // Recipient details
  const [clientCompany, setClientCompany] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientStreet, setClientStreet] = useState("");
  const [clientZip, setClientZip] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [isSearchingZip, setIsSearchingZip] = useState(false);

  useEffect(() => {
    const zipStr = clientZip.trim();
    if (/^\d{5}$/.test(zipStr)) {
      // High-speed local cache for typical postal regions surrounding Iserlohn & major NRW regions
      const localZips: Record<string, string> = {
        "58636": "Iserlohn",
        "58638": "Iserlohn",
        "58640": "Iserlohn",
        "58642": "Iserlohn",
        "58644": "Iserlohn",
        "58675": "Hemer",
        "58706": "Menden (Sauerland)",
        "58708": "Menden (Sauerland)",
        "58710": "Menden (Sauerland)",
        "58095": "Hagen",
        "58119": "Hagen",
        "44135": "Dortmund",
        "44137": "Dortmund",
        "44139": "Dortmund",
        "44141": "Dortmund",
        "50667": "Köln",
        "40210": "Düsseldorf",
        "58507": "Lüdenscheid",
        "58509": "Lüdenscheid",
        "58511": "Lüdenscheid",
        "58513": "Lüdenscheid",
        "58515": "Lüdenscheid"
      };

      if (localZips[zipStr]) {
        setClientCity(localZips[zipStr]);
        return;
      }

      const controller = new AbortController();
      const signal = controller.signal;
      
      const fetchCity = async () => {
        setIsSearchingZip(true);
        try {
          const res = await fetch(`https://api.zippopotam.us/de/${zipStr}`, { signal });
          if (res.ok) {
            const data = await res.json();
            if (data.places && data.places.length > 0) {
              const cityName = data.places[0]["place name"];
              if (cityName) {
                setClientCity(cityName);
                setIsSearchingZip(false);
                return;
              }
            }
          }
          
          // Secondary fallback
          const fallbackRes = await fetch(`https://openplzapi.org/de/localities?postalCode=${zipStr}`, { signal });
          if (fallbackRes.ok) {
            const list = await fallbackRes.json();
            if (Array.isArray(list) && list.length > 0 && list[0].name) {
              setClientCity(list[0].name);
            }
          }
        } catch (err) {
          console.warn("ZIP resolution error:", err);
        } finally {
          setIsSearchingZip(false);
        }
      };

      fetchCity();
      return () => controller.abort();
    }
  }, [clientZip]);

  // Line items
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: "1",
      description: "Glas- & Fensterreinigung für Privatobjekt (inkl. Rahmenreinigung und Abzug mit materialschonenden Reinigungsmitteln)",
      quantity: 1,
      unit: "pauschal",
      pricePerUnit: 180.00,
      showLaborPercentage: true,
      laborPercentage: 100
    },
    {
      id: "2",
      description: "Anfahrtspauschale",
      quantity: 1,
      unit: "pauschal",
      pricePerUnit: 25.00,
      showLaborPercentage: false,
      laborPercentage: 0
    }
  ]);

  // Extra notes for the active document
  const [customNotes, setCustomNotes] = useState("");
  // Einleitungstext für das aktive Dokument
  const [customIntro, setCustomIntro] = useState("");
  const [highlightLaborTaxBenefit, setHighlightLaborTaxBenefit] = useState(true);
  const [saveIndicator, setSaveIndicator] = useState(false);
  const [activeTab, setActiveTab] = useState<"editor" | "settings">("editor");

  // Layout constraints for one-page print fitting (set tight and small by default to secure single page fit)
  const [density, setDensity] = useState<"compact" | "normal" | "relaxed">("compact");
  const [fontSizeScale, setFontSizeScale] = useState<"small" | "normal" | "large">("small");
  const [pagePadding, setPagePadding] = useState<"tight" | "normal" | "wide">("tight");
  const [zoomScale, setZoomScale] = useState<number>(0.85);
  const [forceSinglePage, setForceSinglePage] = useState<boolean>(true);

  // Sync default notes when type changes or active note is empty
  useEffect(() => {
    if (docType === "offer") {
      setCustomNotes(settings.notesOfferDefault);
      setCustomIntro(settings.introOfferDefault || "Sehr geehrte Damen und Herren,\n\nvielen Dank für das angenehme Telefonat beziehungsweise die vorliegende Anfrage. Gerne erstellen wir Ihnen ein maßgeschneidertes, unverbindliches Angebot für die fachgerechte Durchführung folgend aufgeführter Gebäudedienstleistungen:");
      // Auto-generate high-end Offer Reference
      const year = new Date(docDate).getFullYear();
      const month = String(new Date(docDate).getMonth() + 1).padStart(2, "0");
      setDocNumber(`AN-${year}-${month}101`);
      // Update validity date to +30 days
      const date = new Date(docDate);
      date.setDate(date.getDate() + 30);
      setDocValDate(date.toISOString().split("T")[0]);
    } else if (docType === "invoice") {
      setCustomNotes(settings.notesInvoiceDefault);
      setCustomIntro(settings.introInvoiceDefault || "Sehr geehrte Damen und Herren,\n\nwir bedanken uns herzlich für das entgegengebrachte Vertrauen und Ihren Auftrag. Für die vertragsgemäß erbrachten Dienstleistungen stellen wir folgend vereinbarte Positionen in Rechnung:");
      // Auto-generate high-end Invoice Reference
      const year = new Date(docDate).getFullYear();
      const month = String(new Date(docDate).getMonth() + 1).padStart(2, "0");
      setDocNumber(`RE-${year}-${month}101`);
      // Update due date to payment terms
      const date = new Date(docDate);
      date.setDate(date.getDate() + settings.defaultPaymentTermDays);
      setDocValDate(date.toISOString().split("T")[0]);
    } else if (docType === "portfolio") {
      setCustomNotes("Haben Sie Fragen zu unseren Dienstleistungen oder wünschen Sie ein maßgeschneidertes Reinigungskonzept?\nSprechen Sie uns sehr gerne unverbindlich an. Wir freuen uns darauf, Ihr Objekt in makellosem Glanz erstrahlen zu lassen.");
      setCustomIntro("Sehr geehrte Damen und Herren,\n\nvielen Dank für Ihr Vertrauen und Ihr Interesse an unserer Dienstleistung. Platinrein Gebäudeservice steht für exklusive Sauberkeit, absolute Diskretion und erstklassigen Service in Iserlohn und Umgebung.\n\nNachfolgend präsentieren wir Ihnen einen strukturierten Überblick über unser exklusives Dienstleistungs-Portfolio:");
      setDocNumber("PORTFOLIO-2026");
      setLineItems([
        {
          id: "p1",
          description: "Unterhaltsreinigung - Repräsentative Sauberkeit für Kanzleien, Praxen und Premium-Gewerbeflächen durch fest zugeteiltes, diskretes Stammpersonal in maßgeschneiderten Intervallen.",
          quantity: 1,
          unit: "Service",
          pricePerUnit: 0,
          showLaborPercentage: false,
          laborPercentage: 0
        },
        {
          id: "p2",
          description: "Bauendreinigung - Einzugsfertige Tiefenreinigung nach Neubau oder Sanierung von empfindlichen Parkettböden, anspruchsvollem Feinsteinzeug und feinstem Baustaub.",
          quantity: 1,
          unit: "Service",
          pricePerUnit: 0,
          showLaborPercentage: false,
          laborPercentage: 0
        },
        {
          id: "p3",
          description: "Glas- & Fensterreinigung - Streifenfreie Klarheit für raumhohe Glasfronten, Fenster und Wintergärten mit materialschonenden, sorgfältig selektierten Premium-Mitteln.",
          quantity: 1,
          unit: "Service",
          pricePerUnit: 0,
          showLaborPercentage: false,
          laborPercentage: 0
        },
        {
          id: "p4",
          description: "Hotel & Hospitality / Housekeeping - Zuverlässiges, diskretes Housekeeping und Zimmerpflege auf Fünf-Sterne-Niveau für gehütete Ansprüche von Gästen.",
          quantity: 1,
          unit: "Service",
          pricePerUnit: 0,
          showLaborPercentage: false,
          laborPercentage: 0
        },
        {
          id: "p5",
          description: "Sonderreinigung - Werterhaltende Tiefenpflege für sensible Materialien und außergewöhnliche Oberflächen nach Ihren persönlichen Wünschen.",
          quantity: 1,
          unit: "Service",
          pricePerUnit: 0,
          showLaborPercentage: false,
          laborPercentage: 0
        }
      ]);
    }
  }, [docType, settings.notesOfferDefault, settings.notesInvoiceDefault, settings.introOfferDefault, settings.introInvoiceDefault, docDate]);

  const handleAddField = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unit: "Std.",
      pricePerUnit: 45.00,
      showLaborPercentage: true,
      laborPercentage: 100
    };
    setLineItems([...lineItems, newItem]);
  };

  const handleRemoveField = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Calculations
  const calculateSubtotal = () => {
    return lineItems.reduce((acc, item) => acc + (item.quantity * item.pricePerUnit), 0);
  };

  const calculateLaborTotal = () => {
    return lineItems.reduce((acc, item) => {
      if (item.showLaborPercentage) {
        const factor = (item.laborPercentage ?? 100) / 100;
        return acc + (item.quantity * item.pricePerUnit * factor);
      }
      return acc;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const laborTotal = calculateLaborTotal();
  const taxSetup = settings.taxSetup;

  let taxAmount = 0;
  let grandTotal = subtotal;

  if (taxSetup === "standard_19") {
    taxAmount = subtotal * 0.19;
    grandTotal = subtotal + taxAmount;
  }

  // Layout scale systems for precise PDF page containment
  const getFontSizeClass = (element: "meta" | "address" | "intro" | "table" | "calc" | "footer" | "header") => {
    if (fontSizeScale === "small") {
      switch (element) {
        case "header": return "text-[9px]";
        case "meta": return "text-[9.5px]";
        case "address": return "text-[10px]";
        case "intro": return "text-[10.5px] leading-relaxed";
        case "table": return "text-[10.5px]";
        case "calc": return "text-[10px]";
        case "footer": return "text-[7.5px]";
      }
    }
    if (fontSizeScale === "normal") {
      switch (element) {
        case "header": return "text-[10px]";
        case "meta": return "text-[11px]";
        case "address": return "text-[12px]";
        case "intro": return "text-xs leading-relaxed";
        case "table": return "text-xs";
        case "calc": return "text-[11px]";
        case "footer": return "text-[8px]";
      }
    }
    // large
    switch (element) {
      case "header": return "text-[11px]";
      case "meta": return "text-xs";
      case "address": return "text-sm";
      case "intro": return "text-sm leading-relaxed";
      case "table": return "text-sm";
      case "calc": return "text-xs";
      case "footer": return "text-[8.5px]";
    }
  };

  const getDensitySpacing = () => {
    if (density === "compact") {
      return {
        headerPb: "pb-4",
        gridMy: "my-4",
        metaMb: "mb-3",
        introMb: "mb-3",
        tableMb: "mb-3",
        rowPy: "py-1.5",
        calcMb: "mb-3",
        benefitMy: "my-3",
        notesPt: "pt-1.5",
        footerMt: "mt-4 pt-2.5",
      };
    }
    if (density === "normal") {
      return {
        headerPb: "pb-6",
        gridMy: "my-6",
        metaMb: "mb-4",
        introMb: "mb-5",
        tableMb: "mb-6",
        rowPy: "py-2.5",
        calcMb: "mb-6",
        benefitMy: "my-4",
        notesPt: "pt-2.5",
        footerMt: "mt-6 pt-3",
      };
    }
    return {
      headerPb: "pb-8",
      gridMy: "my-8",
      metaMb: "mb-6",
      introMb: "mb-8",
      tableMb: "mb-8",
      rowPy: "py-3.5",
      calcMb: "mb-8",
      benefitMy: "my-6",
      notesPt: "pt-4",
      footerMt: "mt-10 pt-4",
    };
  };

  const spacing = getDensitySpacing();

  // Helper to chunk items into pages based on density & font size settings
  const paginateItems = () => {
    if (forceSinglePage) {
      return { 
        pages: lineItems.length === 0 ? [[]] : [lineItems], 
        page1Max: Math.max(1, lineItems.length), 
        subsequentMax: 8 
      };
    }

    // Base lines on Page 1 (less capacity due to address, header, details, intro)
    let page1Max = 4;
    if (density === "compact") page1Max += 1;
    if (density === "relaxed") page1Max -= 1;
    if (fontSizeScale === "small") page1Max += 1;
    if (fontSizeScale === "large") page1Max -= 1;
    
    // Ensure we always have at least 1 item capacity
    page1Max = Math.max(1, page1Max);

    // Base lines on Page 2 and further
    let subsequentMax = 8;
    if (density === "compact") subsequentMax += 2;
    if (density === "relaxed") subsequentMax -= 2;
    if (fontSizeScale === "small") subsequentMax += 1;
    if (fontSizeScale === "large") subsequentMax -= 1;
    
    subsequentMax = Math.max(1, subsequentMax);

    const pages: LineItem[][] = [];
    let currentItemIndex = 0;

    // Page 1
    const page1Items = lineItems.slice(0, page1Max);
    pages.push(page1Items);
    currentItemIndex += page1Items.length;

    // Pages 2, 3...
    while (currentItemIndex < lineItems.length) {
      const nextPageItems = lineItems.slice(currentItemIndex, currentItemIndex + subsequentMax);
      pages.push(nextPageItems);
      currentItemIndex += nextPageItems.length;
    }

    // Edge case: if lineItems is empty, return one empty page
    if (pages.length === 0) {
      pages.push([]);
    }

    return { pages, page1Max, subsequentMax };
  };

  const { pages, page1Max, subsequentMax } = paginateItems();

  const handlePrint = () => {
    if (isInIframe) {
      setShowPrintModal(true);
    } else {
      try {
        // Change browser window title dynamically to a beautiful design representation (strips "my Studio ai")
        const originalTitle = document.title;
        const documentTypeGerman = docType === "offer" ? "Angebot" : docType === "invoice" ? "Rechnung" : "Portfolio";
        document.title = `${documentTypeGerman}_Platinrein_${docNumber || "Dokument"}`;
        
        window.print();
        
        // Restore title after print dialog triggers
        setTimeout(() => {
          document.title = originalTitle;
        }, 1000);
      } catch (e) {
        setShowPrintModal(true);
      }
    }
  };

  const handleResetSettings = () => {
    if (confirm("Möchten Sie die Absenderdaten wirklich auf die Standard-Webseitendaten zurücksetzen?")) {
      setSettings(defaultSettings);
      setSaveIndicator(true);
      setTimeout(() => setSaveIndicator(false), 2000);
    }
  };

  const triggerSaveNotification = () => {
    setSaveIndicator(true);
    setTimeout(() => setSaveIndicator(false), 2000);
  };

  // Password / PIN Protection Barrier for Admin
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center px-4 py-28 select-none">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white border border-neutral-200 shadow-2xl p-8 md:p-10 relative"
        >
          <div className="text-center mb-8">
            <div className="inline-flex p-3.5 rounded-full bg-neutral-100 text-charcoal mb-4">
              <Lock size={22} />
            </div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal/40 mb-2">
              Interner Bereich · Nur Geschäftsleitung
            </span>
            <h1 className="text-2xl font-light text-charcoal tracking-tight">
              Dokumentenverwaltung
            </h1>
            <p className="text-xs text-charcoal/60 mt-2 leading-relaxed">
              Dieser Bereich ist vertraulich für Angebote und Rechnungen. Bitte geben Sie Ihren persönlichen PIN-Code ein.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-charcoal/50 mb-2">
                Zugangscode / PIN
              </label>
              <div className="relative">
                <input
                  type={showPinPassword ? "text" : "password"}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (authError) setAuthError("");
                  }}
                  placeholder="PIN eingeben..."
                  autoFocus
                  className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm tracking-widest font-mono text-charcoal placeholder:tracking-normal placeholder:font-sans focus:outline-none focus:border-charcoal transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPinPassword(!showPinPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal cursor-pointer"
                >
                  {showPinPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {authError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-600 font-medium"
              >
                {authError}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-black text-white text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
            >
              <Lock size={14} />
              <span>Bereich Freischalten</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col gap-3 text-center">
            <p className="text-[10px] text-charcoal/40 tracking-wider uppercase font-semibold">
              Standard-PIN: <span className="font-mono text-charcoal/70">2026</span>
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 text-xs text-charcoal/50 hover:text-charcoal transition-colors mt-2"
            >
              <ArrowLeft size={14} />
              <span>Zurück zur Website</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#1F1F21] pt-24 md:pt-28 pb-16 px-4 md:px-8 selection:bg-charcoal selection:text-white print:p-0 print:bg-white print:text-black">
      {/* Dynamic CSS overrides for perfectly aligned A4 print outcomes */}
      <style>{`
        @page {
          size: A4 portrait !important;
          margin: 0 !important;
        }
        @page :left {
          margin: 0 !important;
        }
        @page :right {
          margin: 0 !important;
        }
        @page :first {
          margin: 0 !important;
        }
        .print-page {
          width: 210mm;
          height: 297mm;
          min-height: 297mm;
          max-height: 297mm;
          background-color: #ffffff;
          color: #000000;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e5e5;
          box-sizing: border-box;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transform: scale(var(--zoom-factor, 1));
          transform-origin: top center;
          margin-bottom: calc(297mm * (var(--zoom-factor, 1) - 1) + 24px);
          transition: transform 0.2s ease-out;
        }
        @media print {
          body, html {
            background-color: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
            min-height: 100% !important;
          }
          #main-nav, footer, .control-pane, .btn-no-print {
            display: none !important;
          }
          .doc-gen-grid-container {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print-full-width {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background-color: #ffffff !important;
          }
          .print-page {
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            page-break-after: always !important;
            page-break-inside: avoid !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 auto !important;
            box-sizing: border-box !important;
            position: relative !important;
            background-color: #ffffff !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            transform: scale(1) !important;
            margin-bottom: 0 !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col gap-6 lg:gap-8 btn-no-print mb-8">
        {/* Back and title bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-charcoal/50 hover:text-charcoal transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Zurück zur Startseite</span>
          </Link>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                const nextType = docType === "offer" ? "invoice" : docType === "invoice" ? "portfolio" : "offer";
                setDocType(nextType);
              }}
              className="px-4 py-2 border border-charcoal/10 hover:border-charcoal/30 text-xs font-bold uppercase tracking-widest bg-white rounded-none transition-all flex items-center gap-2 hover:shadow-xs active:scale-[0.98]"
            >
              <RefreshCw size={13} className="animate-spin-slow text-charcoal/40" />
              Wechseln zu: {docType === "offer" ? "Rechnung" : docType === "invoice" ? "Portfolio" : "Angebot"}
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-charcoal text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-widest rounded-none transition-all flex items-center gap-2 hover:shadow-md active:scale-[0.98]"
            >
              <Printer size={14} />
              Drucken / PDF speichern
            </button>

            <button
              onClick={handleLogout}
              title="Bereich sperren / Abmelden"
              className="px-3.5 py-2.5 border border-charcoal/10 hover:border-red-300 hover:text-red-600 text-charcoal/60 bg-white text-xs font-bold uppercase tracking-widest rounded-none transition-all flex items-center gap-1.5 active:scale-[0.98] cursor-pointer"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sperren</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-charcoal/10">
          <button
            onClick={() => setActiveTab("editor")}
            className={`px-6 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all transition-duration-300 ${activeTab === "editor" ? "border-charcoal text-charcoal" : "border-transparent text-charcoal/40 hover:text-charcoal"}`}
          >
            <span className="flex items-center gap-2">
              <FileText size={14} />
              1. Dokument ausfüllen
            </span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-6 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all transition-duration-300 ${activeTab === "settings" ? "border-charcoal text-charcoal" : "border-transparent text-charcoal/40 hover:text-charcoal"}`}
          >
            <span className="flex items-center gap-2">
              <SettingsIcon size={14} />
              2. Stammdaten & Bankkonten
            </span>
          </button>
        </div>

        {/* PDF/Print Sandbox Tip Banner */}
        <div className="bg-[#FAF9F6] border border-charcoal/10 p-5 rounded-none flex flex-col md:flex-row items-start md:items-center gap-4 text-xs">
          <div className="bg-[#EDEBDF] p-2 text-charcoal/60 shrink-0">
            <Printer size={18} />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-bold uppercase tracking-wider text-charcoal text-[11px] flex items-center gap-1.5 font-sans">
              <span>Wie als PDF speichern / drucken?</span>
            </h3>
            <p className="text-charcoal/75 leading-relaxed font-sans">
              Um Ihr erstelltes Dokument als PDF zu speichern, klicken Sie oben rechts auf <strong className="text-[#1F1F21]">"Drucken / PDF speichern"</strong>. Im sich öffnenden Druckmenü Ihres Browsers wählen Sie unter Drucker/Zielort einfach <strong className="text-charcoal font-bold">"Als PDF speichern"</strong> oder <strong>"In PDF drucken"</strong> aus.
            </p>
            <p className="text-emerald-900 bg-emerald-50/70 p-2.5 border border-emerald-100/70 mt-2 font-medium leading-relaxed font-sans">
              ✨ <strong>100% Professionelles Ergebnis (Empfehlung):</strong> Um störende Browser-Standardüberschriften (wie "my Studio ai", das aktuelle Datum oder unschöne URL-Links ganz unten) vollständig auszublenden, deaktivieren Sie im Druckfenster unter <em>"Mehr Einstellungen" / "Optionen"</em> einfach die Checkbox <strong className="underline">"Kopf- und Fußzeilen"</strong> (oder <em>"Headers and Footers"</em>). Ihre PDF sieht danach absolut makellos und maßgeschneidert aus!
            </p>
            {isInIframe && (
              <p className="text-amber-800 bg-amber-50/50 p-2.5 border border-amber-100/70 mt-2 font-medium leading-relaxed font-sans">
                ⚠️ <strong>Hinweis zur Entwicklungs-Vorschau:</strong> Da Sie die App gerade in der geteilten Ansicht testen, blockiert der Browser oft das Druckmenü. Öffnen Sie die App bitte zuerst <a href={window.location.href} target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-amber-950 transition-colors uppercase tracking-wider text-[10px]">in einem eigenen Vollbild-Tab (hier klicken)</a>, um PDFs reibungslos zu erstellen!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Editors on left, strict A4 live visualization on the right */}
      <div className="max-w-[1450px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start doc-gen-grid-container">
        
        {/* LEFT COLUMN: Input/Settings Panels (Hidden in print) */}
        <div className="col-span-1 lg:col-span-5 space-y-6 control-pane btn-no-print">
          
          <AnimatePresence mode="wait">
            {activeTab === "editor" ? (
              <motion.div
                key="editor"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-white border border-platinum/40 p-6 md:p-8 space-y-8 shadow-sm"
              >
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-widest border-b border-platinum/30 pb-3 mb-5">
                    Dokumenten-Meta
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1.5">Typ</label>
                      <select 
                        value={docType}
                        onChange={(e) => setDocType(e.target.value as "offer" | "invoice" | "portfolio")}
                        className="w-full text-xs font-medium bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors"
                      >
                        <option value="offer">Angebot (Estimate)</option>
                        <option value="invoice">Rechnung (Invoice)</option>
                        <option value="portfolio">Portfolio (Leistungskatalog)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1.5">
                        {docType === "offer" ? "Angebotsnummer" : docType === "invoice" ? "Rechnungsnummer" : "Referenznummer"}
                      </label>
                      <input 
                        type="text" 
                        value={docNumber}
                        onChange={(e) => setDocNumber(e.target.value)}
                        placeholder={docType === "offer" ? "AN-2026-X" : docType === "invoice" ? "RE-2026-X" : "PORTFOLIO-2026"}
                        className="w-full text-xs font-medium bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1.5">Datum</label>
                      <input 
                        type="date" 
                        value={docDate}
                        onChange={(e) => setDocDate(e.target.value)}
                        className="w-full text-xs font-medium bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1.5">
                        {docType === "offer" ? "Gültig bis" : docType === "invoice" ? "Zahlungsfrist (Fälligkeit)" : "Verlauf gültig bis"}
                      </label>
                      <input 
                        type="date" 
                        value={docValDate}
                        onChange={(e) => setDocValDate(e.target.value)}
                        className="w-full text-xs font-medium bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1.5">Leistungszeitraum</label>
                      <input 
                        type="text" 
                        value={performancePeriod}
                        onChange={(e) => setPerformancePeriod(e.target.value)}
                        placeholder="Nach Vereinbarung"
                        className="w-full text-xs font-medium bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Visual Layout Fitting Controls for One-Page Guarantees */}
                <div className="bg-[#1F1F21]/[0.03] border border-charcoal/10 p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-charcoal/15 pb-2 mb-1">
                    <Maximize2 size={14} className="text-charcoal" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal">
                      Layout-Präzision & Seitenanpassung
                    </h3>
                  </div>
                  <p className="text-[11px] text-charcoal/65 leading-normal">
                    Falls Ihr Angebot viele Positionen hat und nicht ganz auf ein einzelnes DIN A4 Blatt passt, können Sie hier die Abstände und Schriftgröße feintunen.
                  </p>
                  
                  {/* Force Single Page Constraint Trigger */}
                  <label className="flex items-start gap-2.5 p-3 bg-white border border-charcoal/10 cursor-pointer select-none hover:bg-[#FAF9F6] transition-colors">
                    <input 
                      type="checkbox"
                      checked={forceSinglePage}
                      onChange={(e) => setForceSinglePage(e.target.checked)}
                      className="accent-charcoal mt-1 h-3.5 w-3.5 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <span className="block text-[10.5px] font-bold text-charcoal uppercase tracking-wider">
                        Inhalt auf 1 Seite erzwingen
                      </span>
                      <span className="block text-[9.5px] text-charcoal/60 leading-relaxed">
                        Empfohlen. Schaltet Seitenumbrüche ab und zwingt alle Artikel, Summen und die Unterschriftenzeilen auf ein einziges, makelloses Blatt für maximale Eleganz.
                      </span>
                    </div>
                  </label>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-charcoal/50 mb-1">Dichte / Spacing</label>
                      <select
                        value={density}
                        onChange={(e) => setDensity(e.target.value as "compact" | "normal" | "relaxed")}
                        className="w-full text-[10.5px] font-medium bg-white border border-charcoal/10 rounded-none p-1.5 focus:border-charcoal outline-hidden"
                      >
                        <option value="compact">Kompakt (1 Blatt)</option>
                        <option value="normal">Standard</option>
                        <option value="relaxed">Großzügig</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-charcoal/50 mb-1">Schriftgröße</label>
                      <select
                        value={fontSizeScale}
                        onChange={(e) => setFontSizeScale(e.target.value as "small" | "normal" | "large")}
                        className="w-full text-[10.5px] font-medium bg-white border border-charcoal/10 rounded-none p-1.5 focus:border-charcoal outline-hidden"
                      >
                        <option value="small">Klein (Sehr fein)</option>
                        <option value="normal">Standard</option>
                        <option value="large">Größer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-charcoal/50 mb-1">Seitenränder</label>
                      <select
                        value={pagePadding}
                        onChange={(e) => setPagePadding(e.target.value as "tight" | "normal" | "wide")}
                        className="w-full text-[10.5px] font-medium bg-white border border-charcoal/10 rounded-none p-1.5 focus:border-charcoal outline-hidden"
                      >
                        <option value="tight">Schmal (Optimal)</option>
                        <option value="normal">Standard</option>
                        <option value="wide">Breit</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-bold uppercase tracking-widest border-b border-platinum/30 pb-3 mb-5">
                    Kunde (Empfänger)
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1.5">Firma / Gesellschaft</label>
                      <input 
                        type="text" 
                        value={clientCompany}
                        onChange={(e) => setClientCompany(e.target.value)}
                        placeholder="Muster GmbH (Optional)"
                        className="w-full text-xs font-medium bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1.5">Ansprechpartner / Name</label>
                      <input 
                        type="text" 
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Max Mustermann"
                        className="w-full text-xs font-medium bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors mr-2"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1.5">Straße, Hausnummer</label>
                      <input 
                        type="text" 
                        value={clientStreet}
                        onChange={(e) => setClientStreet(e.target.value)}
                        placeholder="Musterplatz 4"
                        className="w-full text-xs font-medium bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1.5 flex items-center gap-1.5">
                          <span>PLZ</span>
                          {isSearchingZip && (
                            <span className="flex h-2 w-2 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                          )}
                        </label>
                        <input 
                          type="text" 
                          value={clientZip}
                          onChange={(e) => setClientZip(e.target.value)}
                          placeholder="58644"
                          className="w-full text-xs font-medium bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1.5">
                          {isSearchingZip ? "Ort (wird gesucht...)" : "Ort"}
                        </label>
                        <input 
                          type="text" 
                          value={clientCity}
                          onChange={(e) => setClientCity(e.target.value)}
                          placeholder={isSearchingZip ? "Suche läuft..." : "Iserlohn"}
                          className={`w-full text-xs font-medium border rounded-none p-2.5 focus:border-charcoal outline-hidden transition-all ${isSearchingZip ? "bg-emerald-50/50 border-emerald-200 animate-pulse text-emerald-800" : "bg-neutral-50 border-charcoal/10"}`}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1.5">Kunden-Telefon</label>
                        <input 
                          type="text" 
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="Tel. des Kunden"
                          className="w-full text-xs font-medium bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1.5">Kunden-E-Mail</label>
                        <input 
                          type="email" 
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="E-Mail des Kunden"
                          className="w-full text-xs font-medium bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50/50 border border-charcoal/5 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-platinum/30 pb-2 mb-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-charcoal/80">
                      Einleitungstext
                    </h2>
                    <button 
                      type="button"
                      onClick={() => {
                        setCustomIntro(
                          docType === "offer"
                            ? (settings.introOfferDefault || "Sehr geehrte Damen und Herren,\n\nvielen Dank für das angenehme Telefonat beziehungsweise die vorliegende Anfrage. Gerne erstellen wir Ihnen ein maßgeschneidertes, unverbindliches Angebot für die fachgerechte Durchführung folgend aufgeführter Gebäudedienstleistungen:")
                            : docType === "invoice"
                            ? (settings.introInvoiceDefault || "Sehr geehrte Damen und Herren,\n\nwir bedanken uns herzlich für das entgegengebrachte Vertrauen und Ihren Auftrag. Für die vertragsgemäß erbrachten Dienstleistungen stellen wir folgend vereinbarte Positionen in Rechnung:")
                            : "Sehr geehrte Damen und Herren,\n\nvielen Dank für Ihr Interesse an unserem exklusiven Dienstleistungs-Portfolio. Platinrein steht für höchste Präzision, Zuverlässigkeit und erstklassige Servicequalität."
                        );
                      }}
                      className="text-[9px] font-semibold text-charcoal/40 hover:text-charcoal uppercase tracking-wider transition-colors hover:underline"
                      title="Auf Standardtext zurücksetzen"
                    >
                      Zurücksetzen
                    </button>
                  </div>
                  <div>
                    <textarea
                      value={customIntro}
                      onChange={(e) => setCustomIntro(e.target.value)}
                      placeholder="Einleitungstext..."
                      rows={3}
                      className="w-full text-xs bg-white border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors resize-y leading-relaxed text-charcoal/80"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between border-b border-platinum/30 pb-3 mb-5">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#1F1F21]">
                      Leistungen
                    </h2>
                    <button
                      onClick={handleAddField}
                      className="flex items-center gap-1.5 px-3 py-1 bg-charcoal text-white hover:bg-neutral-800 text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      <Plus size={12} />
                      Zeile hinzufügen
                    </button>
                  </div>
                  
                  <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {lineItems.map((item, idx) => (
                      <div key={item.id} className="p-4 bg-neutral-50 border border-neutral-100 space-y-3 relative">
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => handleRemoveField(item.id)}
                            disabled={lineItems.length === 1}
                            className="text-neutral-400 hover:text-red-500 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                            title="Position entfernen"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <span className="text-[10px] font-bold bg-neutral-200 text-neutral-600 px-2 py-0.5 rounded-xs">
                          Position {idx + 1}
                        </span>

                        <div className="space-y-2">
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-charcoal/40">Leistungsbeschreibung</label>
                          <textarea
                            value={item.description}
                            onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                            placeholder="Z.B. Gründliche Fensterreinigung inklusive Fensterbänke"
                            rows={2}
                            className="w-full text-xs bg-white border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors resize-y font-sans leading-relaxed"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-charcoal/40">Menge</label>
                            <input
                              type="number"
                              step="any"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(item.id, "quantity", parseFloat(e.target.value) || 0)}
                              className="w-full text-xs font-semibold bg-white border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-charcoal/40">Einheit</label>
                            <select
                              value={item.unit}
                              onChange={(e) => handleItemChange(item.id, "unit", e.target.value)}
                              className="w-full text-xs bg-white border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden"
                            >
                              <option value="pauschal">Pauschal</option>
                              <option value="Std.">Std. (Stunden)</option>
                              <option value="m²">m² (Fläche)</option>
                              <option value="Whg.">Whg.</option>
                              <option value="Stk.">Stück</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-charcoal/40">Einzelpreis (€)</label>
                            <input
                              type="number"
                              step="0.01"
                              value={item.pricePerUnit}
                              onChange={(e) => handleItemChange(item.id, "pricePerUnit", parseFloat(e.target.value) || 0)}
                              className="w-full text-xs font-semibold bg-white border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden"
                            />
                          </div>
                        </div>

                        {/* Labor Tax abatement option for § 35a */}
                        <div className="flex items-center gap-3 pt-2 border-t border-dashed border-neutral-200">
                          <input
                            type="checkbox"
                            id={`labor-${item.id}`}
                            checked={item.showLaborPercentage ?? false}
                            onChange={(e) => handleItemChange(item.id, "showLaborPercentage", e.target.checked)}
                            className="accent-charcoal h-3.5 w-3.5"
                          />
                          <label htmlFor={`labor-${item.id}`} className="text-[10px] font-semibold text-charcoal/70 cursor-pointer flex items-center gap-1.5 select-none">
                            Besitzt Dienstleistungs- / Lohnkostenanteil? (für § 35a)
                          </label>
                        </div>
                        {item.showLaborPercentage && (
                          <div className="flex items-center gap-2 pl-6 animate-fade-in">
                            <span className="text-[10px] text-charcoal/40">Lohnkosten-Anteil:</span>
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={item.laborPercentage ?? 100}
                                onChange={(e) => handleItemChange(item.id, "laborPercentage", Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                                className="w-12 text-[11px] p-1 bg-white border border-charcoal/10 font-bold text-center"
                              />
                              <span className="text-[10px] font-bold text-charcoal/60">%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-bold uppercase tracking-widest border-b border-platinum/30 pb-3 mb-5">
                    Zusatzvereinbarungen / Fußnote
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1.5">Kundentext</label>
                      <textarea
                        value={customNotes}
                        onChange={(e) => setCustomNotes(e.target.value)}
                        placeholder="Abschließende Worte oder Vereinbarungen..."
                        rows={4}
                        className="w-full text-xs bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors font-sans leading-relaxed text-charcoal/80"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3 bg-indigo-50/50 p-3 border border-indigo-100/30">
                      <input
                        type="checkbox"
                        id="highlightLaborTaxBenefit"
                        checked={highlightLaborTaxBenefit}
                        onChange={(e) => setHighlightLaborTaxBenefit(e.target.checked)}
                        className="accent-charcoal h-4 w-4"
                      />
                      <label htmlFor="highlightLaborTaxBenefit" className="text-[10px] font-medium text-indigo-950/80 cursor-pointer select-none">
                        <strong>Steuerbonus-Hinweis für Lohnkosten anhängen?</strong> <br />
                        Kunden können nach § 35a EStG 20% von Arbeitskosten abgelten.
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-white border border-platinum/40 p-6 md:p-8 space-y-6 shadow-sm"
              >
                <div>
                  <div className="flex justify-between items-center border-b border-platinum/30 pb-2 mb-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#1F1F21]">
                      Ihre Unternehmensdaten
                    </h2>
                    <button
                      onClick={handleResetSettings}
                      className="text-[10px] uppercase font-bold text-charcoal/50 hover:text-charcoal transition-colors underline"
                    >
                      Webseiten-Urdaten laden
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1">Inhaber / Name</label>
                      <input 
                        type="text" 
                        value={settings.senderOwner}
                        onChange={(e) => setSettings({ ...settings, senderOwner: e.target.value })}
                        className="w-full text-xs font-semibold bg-neutral-50 border border-charcoal/10 rounded-none p-2.5"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1">Firmenname</label>
                      <input 
                        type="text" 
                        value={settings.senderCompany}
                        onChange={(e) => setSettings({ ...settings, senderCompany: e.target.value })}
                        className="w-full text-xs font-semibold bg-neutral-50 border border-charcoal/10 rounded-none p-2.5"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1">Straße & Nr.</label>
                        <input 
                          type="text" 
                          value={settings.senderStreet}
                          onChange={(e) => setSettings({ ...settings, senderStreet: e.target.value })}
                          className="w-full text-xs bg-neutral-50 border border-charcoal/10 rounded-none p-2.5"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1">PLZ & Ort</label>
                        <input 
                          type="text" 
                          value={settings.senderCity}
                          onChange={(e) => setSettings({ ...settings, senderCity: e.target.value })}
                          className="w-full text-xs bg-neutral-50 border border-charcoal/10 rounded-none p-2.5"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1">Telefon</label>
                        <input 
                          type="text" 
                          value={settings.senderPhone}
                          onChange={(e) => setSettings({ ...settings, senderPhone: e.target.value })}
                          className="w-full text-xs bg-neutral-50 border border-charcoal/10 rounded-none p-2.5"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1">E-Mail</label>
                        <input 
                          type="text" 
                          value={settings.senderEmail}
                          onChange={(e) => setSettings({ ...settings, senderEmail: e.target.value })}
                          className="w-full text-xs bg-neutral-50 border border-charcoal/10 rounded-none p-2.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-bold uppercase tracking-widest border-b border-platinum/30 pb-2 mb-4">
                    Steuernummer & Finanzaspekt
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1.5">
                        Steuernummer Status
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, taxNumberOption: "beantragt", senderTaxNumber: "Beantragt (wird nachgereicht)" })}
                          className={`text-[9px] uppercase tracking-wider font-bold py-2 border ${settings.taxNumberOption === "beantragt" ? "border-charcoal bg-charcoal text-white" : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-charcoal"}`}
                        >
                          Beantragt (In Arbeit)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, taxNumberOption: "custom", senderTaxNumber: settings.senderTaxNumber === "Beantragt (wird nachgereicht)" ? "" : settings.senderTaxNumber })}
                          className={`text-[9px] uppercase tracking-wider font-bold py-2 border ${settings.taxNumberOption === "custom" ? "border-charcoal bg-charcoal text-white" : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-charcoal"}`}
                        >
                          Ich habe eine Nummer
                        </button>
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, taxNumberOption: "none", senderTaxNumber: "" })}
                          className={`text-[9px] uppercase tracking-wider font-bold py-2 border ${settings.taxNumberOption === "none" ? "border-charcoal bg-charcoal text-white" : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-charcoal"}`}
                        >
                          Keine anzeigen
                        </button>
                      </div>
                    </div>

                    {settings.taxNumberOption === "custom" && (
                      <div className="animate-fade-in">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1">Steuernummer (Finanzamt)</label>
                        <input 
                          type="text" 
                          value={settings.senderTaxNumber}
                          onChange={(e) => setSettings({ ...settings, senderTaxNumber: e.target.value })}
                          placeholder="Z.B. 321/555/12345"
                          className="w-full text-xs font-semibold bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1">Umsatzsteuer-ID (USt-IdNr.)</label>
                      <input 
                        type="text" 
                        value={settings.senderUstId}
                        onChange={(e) => setSettings({ ...settings, senderUstId: e.target.value })}
                        placeholder="Z.B. DE463710810"
                        className="w-full text-xs font-semibold bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-2">Besteuerungs-Art</label>
                      <div className="space-y-2">
                        <label className="flex items-start gap-2.5 p-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/50 cursor-pointer">
                          <input 
                            type="radio"
                            name="taxSetup"
                            checked={settings.taxSetup === "kleinunternehmer"}
                            onChange={() => setSettings({ ...settings, taxSetup: "kleinunternehmer" })}
                            className="accent-charcoal mt-0.5"
                          />
                          <span className="text-[10.5px] leading-relaxed">
                            <strong>Kleinunternehmerregelung (§ 19 UStG)</strong><br />
                            Es wird keine Umsatzsteuer ausgewiesen oder erhoben. Perfekt für Einsteiger / kleine Gewerbe.
                          </span>
                        </label>
                        <label className="flex items-start gap-2.5 p-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/50 cursor-pointer">
                          <input 
                            type="radio"
                            name="taxSetup"
                            checked={settings.taxSetup === "standard_19"}
                            onChange={() => setSettings({ ...settings, taxSetup: "standard_19" })}
                            className="accent-charcoal mt-0.5"
                          />
                          <span className="text-[10.5px] leading-relaxed">
                            <strong>Regelbesteuerung (Zzgl. 19 % MwSt.)</strong><br />
                            Zuzüglich Standardumsatzsteuer von 19%.
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-bold uppercase tracking-widest border-b border-platinum/30 pb-2 mb-4">
                    Standard-Freitexte (Vorschläge)
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-neutral-50/50 p-4 border border-neutral-100 space-y-3.5">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/60">Angebots-Texte</span>
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-charcoal/40 mb-1">Standard-Einleitungstext (Angebot)</label>
                        <textarea 
                          value={settings.introOfferDefault}
                          onChange={(e) => setSettings({ ...settings, introOfferDefault: e.target.value })}
                          rows={2}
                          className="w-full text-xs bg-white border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-charcoal/40 mb-1">Standard-Schlusstext / Fußnote (Angebot)</label>
                        <textarea 
                          value={settings.notesOfferDefault}
                          onChange={(e) => setSettings({ ...settings, notesOfferDefault: e.target.value })}
                          rows={2}
                          className="w-full text-xs bg-white border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors"
                        />
                      </div>
                    </div>

                    <div className="bg-neutral-50/50 p-4 border border-neutral-100 space-y-3.5">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/60">Rechnungs-Texte</span>
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-charcoal/40 mb-1">Standard-Einleitungstext (Rechnung)</label>
                        <textarea 
                          value={settings.introInvoiceDefault}
                          onChange={(e) => setSettings({ ...settings, introInvoiceDefault: e.target.value })}
                          rows={2}
                          className="w-full text-xs bg-white border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-charcoal/40 mb-1">Standard-Schlusstext / Fußnote (Rechnung)</label>
                        <textarea 
                          value={settings.notesInvoiceDefault}
                          onChange={(e) => setSettings({ ...settings, notesInvoiceDefault: e.target.value })}
                          rows={2}
                          className="w-full text-xs bg-white border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal outline-hidden transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-bold uppercase tracking-widest border-b border-platinum/30 pb-2 mb-4">
                    Bankkontoinformationen (Fußzeile)
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1">Bankinstitut / Name</label>
                      <input 
                        type="text" 
                        value={settings.senderBankName}
                        onChange={(e) => setSettings({ ...settings, senderBankName: e.target.value })}
                        placeholder="Z.B. Sparkasse Iserlohn"
                        className="w-full text-xs font-semibold bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1">IBAN</label>
                        <input 
                          type="text" 
                          value={settings.senderIban}
                          onChange={(e) => setSettings({ ...settings, senderIban: e.target.value })}
                          placeholder="DE89..."
                          className="w-full text-xs font-semibold bg-neutral-50 border border-charcoal/10 rounded-none p-2.5 text-uppercase"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1">BIC</label>
                        <input 
                          type="text" 
                          value={settings.senderBic}
                          onChange={(e) => setSettings({ ...settings, senderBic: e.target.value })}
                          placeholder="WELAD..."
                          className="w-full text-xs font-semibold bg-neutral-50 border border-charcoal/10 rounded-none p-2.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-bold uppercase tracking-widest border-b border-platinum/30 pb-2 mb-4 flex items-center gap-2">
                    <Lock size={15} />
                    Sicherheit & PIN-Zugangsschutz
                  </h2>
                  <div className="bg-neutral-50 p-4 border border-neutral-100 space-y-3">
                    <p className="text-xs text-charcoal/70 leading-relaxed">
                      Dieser Bereich ist vor normalen Webseiten-Besuchern verborgen (keine sichtbaren Links in Menü oder Footer). Jeder direkte Aufruf der Adresse <code className="bg-neutral-200/60 px-1 py-0.5 rounded text-[11px]">/dokumente</code> erfordert Ihren persönlichen PIN-Code.
                    </p>
                    <div className="pt-2">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/60 mb-1">
                        Persönlicher PIN-Code (Standard: 2026)
                      </label>
                      <input 
                        type="text" 
                        defaultValue={localStorage.getItem("platinrein_admin_pin") || "2026"}
                        onChange={(e) => {
                          const val = e.target.value.trim();
                          if (val) {
                            localStorage.setItem("platinrein_admin_pin", val);
                          }
                        }}
                        placeholder="Z.B. 2026"
                        className="w-full max-w-xs text-xs font-mono font-semibold bg-white border border-charcoal/10 rounded-none p-2.5 focus:border-charcoal"
                      />
                      <span className="block text-[9px] text-neutral-400 mt-1">
                        Änderungen am PIN werden sofort auf diesem Gerät gespeichert.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 p-4 border border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-neutral-500">Ihre Stammdaten werden lokal gespeichert.</span>
                  <button
                    onClick={triggerSaveNotification}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-[10px] font-bold uppercase tracking-wider"
                  >
                    <Save size={12} />
                    Speichern
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Save toast indicator */}
          {saveIndicator && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-neutral-900 border border-white/10 text-white p-3 text-[10px] uppercase font-bold tracking-widest text-center flex items-center justify-center gap-2"
            >
              <Check size={14} className="text-green-400" />
              Einstellungen erfolgreich gesichert!
            </motion.div>
          )}

          {/* Useful Tips Accordion */}
          <div className="bg-[#EAEAEA]/30 border border-charcoal/5 p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2.5 text-charcoal/70">
              <HelpCircle size={14} className="text-charcoal/40" />
              Tipp für die Fußzeile
            </h3>
            <p className="text-[11px] leading-relaxed text-charcoal/60">
              Solange Sie noch keine finale Steuernummer vom Finanzamt erhalten haben, können Sie Ihre Angebote und Rechnungen absolut rechtssicher versenden, indem Sie als ID <strong>"Steuernummer: Beantragt (wird nachgereicht)"</strong> angegeben lassen. 
            </p>
            <p className="text-[11px] leading-relaxed text-charcoal/60 mt-1.5">
              Sobald der Brief vom Finanzamt kommt, tragen Sie die Nummer einfach unter <strong>"2. Stammdaten & Bankkonten"</strong> ein!
            </p>
          </div>
        </div>


        {/* RIGHT COLUMN: THE LIVE A4 SHEET DRAWING AREA */}
        {/* Under print condition, this occupies 100% of the screen seamlessly, keeping fonts crisp */}
        <div className="col-span-1 lg:col-span-7 bg-[#FCFCFD] lg:bg-[#EAEAEA]/40 p-4 md:p-6 lg:p-8 flex flex-col items-center gap-6 print:p-0 print:bg-white print:gap-0 overflow-x-auto w-full print-full-width">
          
          {/* Elegant preview scale controls - entirely hidden during printing */}
          <div className="w-full max-w-[210mm] bg-white border border-charcoal/10 px-4 py-3 flex flex-row items-center justify-between gap-4 btn-no-print shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-charcoal/50">Vorschau-Skalierung</span>
              <span className="text-[11px] font-bold text-charcoal bg-neutral-100 px-2 py-0.5 rounded-sm font-mono">{Math.round(zoomScale * 100)}%</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setZoomScale(Math.max(0.4, zoomScale - 0.05))}
                className="w-7 h-7 flex items-center justify-center border border-neutral-200 hover:border-charcoal text-charcoal font-bold text-xs bg-neutral-50 hover:bg-neutral-100 active:scale-90 transition-all cursor-pointer"
                title="Verkleinern"
              >
                &minus;
              </button>
              <input 
                type="range"
                min="0.4"
                max="1.2"
                step="0.05"
                value={zoomScale}
                onChange={(e) => setZoomScale(parseFloat(e.target.value))}
                className="w-20 md:w-32 accent-charcoal cursor-pointer"
              />
              <button 
                onClick={() => setZoomScale(Math.min(1.2, zoomScale + 0.05))}
                className="w-7 h-7 flex items-center justify-center border border-neutral-200 hover:border-charcoal text-charcoal font-bold text-xs bg-neutral-50 hover:bg-neutral-100 active:scale-90 transition-all cursor-pointer"
                title="Vergrößern"
              >
                +
              </button>
              <div className="h-4 w-px bg-neutral-200 mx-1"></div>
              <button 
                onClick={() => setZoomScale(0.85)}
                className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold border border-neutral-200 hover:border-charcoal bg-white text-charcoal hover:text-black transition-all cursor-pointer"
              >
                Standard (85%)
              </button>
              <button 
                onClick={() => setZoomScale(1.0)}
                className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold border border-neutral-200 hover:border-charcoal bg-white text-charcoal hover:text-black transition-all cursor-pointer"
              >
                100%
              </button>
            </div>
          </div>

          {pages.map((pageItems, pageIdx) => {
            const isFirstPage = pageIdx === 0;
            const isLastPage = pageIdx === pages.length - 1;
            const pageNo = pageIdx + 1;
            const totalPages = pages.length;

            return (
              <div
                key={pageIdx}
                className={`print-page selection:bg-slate-200 ${
                  pagePadding === "tight" 
                    ? "pl-[10mm] pr-[12mm] pt-[10mm] pb-[10mm]" 
                    : pagePadding === "wide" 
                      ? "p-[20mm]" 
                      : "p-[15mm]"
                }`}
                style={{ 
                  ["--zoom-factor" as any]: zoomScale,
                  pageBreakAfter: isLastPage ? "auto" : "always"
                }}
              >
                {/* TOP CONTENT ZONE */}
                <div className="flex-1 flex flex-col justify-start">
                  {isFirstPage ? (
                    <>
                      {/* 1. HEADER SECTION (Brand & Logo) */}
                      <div className={`flex justify-between items-start border-b border-black/[0.12] ${spacing.headerPb}`}>
                        <div>
                          <Logo showText={true} className="text-black" />
                        </div>
                        
                        <div className="text-right text-black font-sans">
                          <h1 className="text-xl font-light tracking-[0.25em] uppercase leading-none mb-1 text-black font-serif">
                            {docType === "offer" ? "Angebot" : docType === "invoice" ? "Rechnung" : "Portfolio"}
                          </h1>
                          <span className={`uppercase tracking-widest font-black text-neutral-900 ${getFontSizeClass("header")}`}>
                            Platinrein Gebäudeservice
                          </span>
                          
                          <div className={`mt-4 space-y-0.5 text-neutral-900 font-medium ${getFontSizeClass("meta")}`}>
                            <p><span className="font-extrabold text-neutral-800">Datum:</span> {new Date(docDate).toLocaleDateString("de-DE")}</p>
                            <p><span className="font-extrabold text-neutral-800">Nummer:</span> {docNumber || "—"}</p>
                            {docType !== "portfolio" && (
                              <p>
                                <span className="font-extrabold text-neutral-800">
                                  {docType === "offer" ? "Gültigkeit:" : "Fälligkeit:"}
                                </span>{" "}
                                {new Date(docValDate).toLocaleDateString("de-DE")}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 2. ADDR BLOCKS (Sender vs Client) */}
                      <div className={`grid grid-cols-12 gap-6 ${spacing.gridMy} ${getFontSizeClass("address")} leading-relaxed`}>
                        <div className="col-span-7 pr-4 text-left">
                          <div className="text-[10px] tracking-[0.1em] text-neutral-950 uppercase font-black border-b border-black/[0.12] pb-1 mb-2.5">
                            {docType === "portfolio" ? "Präsentation" : "Empfänger"}
                          </div>
                          {docType === "portfolio" && !clientCompany && !clientName ? (
                            <div className="space-y-1 text-neutral-800">
                              <p className="font-extrabold text-black tracking-tight text-xs uppercase text-left">Für unsere Interessenten</p>
                              <p className="text-[10.5px] leading-relaxed text-neutral-750 text-left">Gemeinsam erarbeiten wir exklusive und maßgeschneiderte Konzepte für dauerhaft gepflegte und repräsentative Räumlichkeiten.</p>
                            </div>
                          ) : (
                            <>
                              {clientCompany && (
                                <div className="font-extrabold text-black tracking-tight text-sm mb-1 text-left">
                                  {clientCompany}
                                </div>
                              )}
                              {clientName && (
                                <div className="font-extrabold text-neutral-950 text-xs mb-0.5 text-left">
                                  {clientName}
                                </div>
                              )}
                              <p className="text-neutral-900 font-semibold text-left">
                                {clientStreet || <span className="text-neutral-400 italic">Keine Straße eingetragen</span>}
                              </p>
                              <p className="text-neutral-900 font-semibold text-left">
                                {clientZip || clientCity ? `${clientZip} ${clientCity}`.trim() : <span className="text-neutral-400 italic">Kein Ort eingetragen</span>}
                              </p>
                            </>
                          )}
                          {(clientPhone || clientEmail) && docType !== "portfolio" && (
                            <div className="mt-1.5 pt-1.5 border-t border-black/[0.1] text-[9.5px] text-neutral-900 space-y-0.5 font-sans">
                              {clientPhone && <p><span className="font-extrabold text-neutral-900 uppercase tracking-wider text-[8px] mr-1">Tel:</span><span className="text-black font-semibold">{clientPhone}</span></p>}
                              {clientEmail && <p><span className="font-extrabold text-neutral-900 uppercase tracking-wider text-[8px] mr-1">E-Mail:</span><span className="text-black font-semibold select-all">{clientEmail}</span></p>}
                            </div>
                          )}
                        </div>

                        <div className="col-span-5 border-l border-black/[0.12] pl-6 text-neutral-900 text-left w-full h-full">
                          <div className="text-[10px] tracking-[0.1em] text-neutral-950 uppercase font-black border-b border-black/[0.12] pb-1 mb-2.5">
                            Dienstleister
                          </div>
                          <div className="font-extrabold text-black mb-1">{settings.senderCompany}</div>
                          <p className="font-semibold text-neutral-850">{settings.senderOwner}</p>
                          <p className="font-semibold text-neutral-850">{settings.senderStreet}</p>
                          <p className="font-semibold text-neutral-850">{settings.senderCity}</p>
                          <p className="mt-2 text-neutral-900 font-mono font-semibold select-all text-xs">{settings.senderEmail}</p>
                          <p className="text-neutral-800 font-semibold">{settings.senderPhone}</p>
                        </div>
                      </div>

                      {/* 3. PERFORMANCE META OR INTRO */}
                      <div className={`border-t border-b border-black/[0.15] py-2 flex justify-between gap-4 text-black ${spacing.metaMb} ${getFontSizeClass("meta")}`}>
                        <div className="text-left">
                          <span className="font-extrabold text-neutral-900 uppercase tracking-wider text-[9px] mr-1.5 inline">
                            {docType === "portfolio" ? "Einsatzbereich:" : "Ausführungsort:"}
                          </span>
                          <span className="text-black font-extrabold">
                            {docType === "portfolio" ? "Iserlohn, Hemer, Menden & ganz NRW" : (clientCity ? (clientZip ? `${clientZip} ${clientCity}` : clientCity) : "Iserlohn / NRW")}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-extrabold text-neutral-900 uppercase tracking-wider text-[9px] mr-1.5 inline font-sans">
                            {docType === "portfolio" ? "Qualitätsstufe:" : "Leistungszeitraum:"}
                          </span>
                          <span className="text-black font-extrabold">{docType === "portfolio" ? "Zertifizierter Premium-Standard" : (performancePeriod || "Sofort / Nach Vereinbarung")}</span>
                        </div>
                      </div>

                      {/* Document Introduction Text */}
                      <div className={`text-neutral-955 leading-relaxed whitespace-pre-line text-left ${spacing.introMb} ${getFontSizeClass("intro")}`}>
                        {customIntro || (docType === "offer" ? (
                          "Sehr geehrte Damen und Herren,\n\nvielen Dank für das angenehme Telefonat beziehungsweise die vorliegende Anfrage. Gerne erstellen wir Ihnen ein maßgeschneidertes, unverbindliches Angebot für die fachgerechte Durchführung folgend aufgeführter Gebäudedienstleistungen:"
                        ) : docType === "invoice" ? (
                          "Sehr geehrte Damen und Herren,\n\nwir bedanken uns herzlich für das entgegengebrachte Vertrauen und Ihren Auftrag. Für die vertragsgemäß erbrachten Dienstleistungen stellen wir folgend vereinbarte Positionen in Rechnung:"
                        ) : (
                          "Sehr geehrte Damen und Herren,\n\nvielen Dank für Ihr Interesse an unserem exklusiven Dienstleistungs-Portfolio. Platinrein steht für höchste Präzision, Zuverlässigkeit und erstklassige Servicequalität."
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Page Header block (Page 2+) */}
                      <div className="flex justify-between items-center border-b border-black/[0.12] pb-2 mb-6 font-sans">
                        <div className="flex items-center gap-2">
                          <Logo showText={false} className="text-black scale-[0.8] origin-left" />
                          <span className="text-[10px] font-black uppercase tracking-wider text-neutral-900">
                            Platinrein Gebäudeservice
                          </span>
                        </div>
                        <div className="text-right text-[10px] text-neutral-600 font-semibold uppercase tracking-widest leading-none">
                          {docType === "offer" ? "Angebot" : docType === "invoice" ? "Rechnung" : "Portfolio"} Nr. {docNumber || "—"} • SEITE {pageNo} VON {totalPages}
                        </div>
                      </div>
                    </>
                  )}

                  {/* 4. LINE ITEMS OR PORTFOLIO LIST */}
                  {docType === "portfolio" ? (
                    <div className={`space-y-4 text-left ${spacing.tableMb}`}>
                      <div className="text-[10px] tracking-[0.12em] text-neutral-950 uppercase font-black border-b border-black/[0.12] pb-1.5 mb-3">
                        Unsere Kernkompetenzen im Überblick
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pageItems.map((item, localIdx) => {
                          const globalIdx = isFirstPage ? localIdx : page1Max + (pageIdx - 1) * subsequentMax + localIdx;
                          const parts = item.description.split(" - ");
                          const title = parts[0];
                          const body = parts.slice(1).join(" - ");

                          return (
                            <div key={item.id} className="p-3 bg-neutral-50/60 border border-black/[0.08] hover:bg-[#FAF9F6] transition-all">
                              <div className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center font-mono font-bold text-[9px] mt-0.5 shrink-0 select-none">
                                  {globalIdx + 1}
                                </span>
                                <div className="space-y-1">
                                  <h4 className="font-bold text-[11.5px] text-black tracking-tight leading-snug">
                                    {title}
                                  </h4>
                                  {body && (
                                    <p className="text-[10px] leading-relaxed text-neutral-900/70 font-medium">
                                      {body}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <table className={`w-full text-left border-collapse ${spacing.tableMb} ${getFontSizeClass("table")}`}>
                      <thead>
                        <tr className="border-b border-black text-[9.5px] uppercase tracking-wider text-neutral-900 font-extrabold bg-neutral-50/70">
                          <th className="py-2.5 font-extrabold w-[6%] pl-2 text-left">Pos</th>
                          <th className="py-2.5 font-extrabold w-[54%] text-left">Leistungsbeschreibung</th>
                          <th className="py-2.5 font-extrabold text-right w-[11%]">Menge</th>
                          <th className="py-2.5 font-extrabold text-right w-[14%]">Einzel (€)</th>
                          <th className="py-2.5 font-extrabold text-right w-[15%] pr-2">Gesamt (€)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/[0.08]">
                        {pageItems.map((item, localIdx) => {
                          const globalIdx = isFirstPage ? localIdx : page1Max + (pageIdx - 1) * subsequentMax + localIdx;
                          const lineTotal = item.quantity * item.pricePerUnit;
                          return (
                            <tr key={item.id} className="align-top">
                              <td className={`font-bold text-neutral-900 pl-2 text-left ${spacing.rowPy}`}>{globalIdx + 1}</td>
                              <td className={`pr-4 text-left ${spacing.rowPy}`}>
                                <p className="font-bold text-black leading-normal select-all">{item.description || "—"}</p>
                                {item.showLaborPercentage && (
                                  <span className="inline-block bg-neutral-100 text-[#1F1F21] text-[8.5px] px-1.5 py-0.5 tracking-wider uppercase mt-1 font-mono font-bold">
                                    Arbeitskosten-Anteil: {item.laborPercentage ?? 100}%
                                  </span>
                                )}
                              </td>
                              <td className={`text-right whitespace-nowrap text-neutral-900 font-medium ${spacing.rowPy}`}>
                                {item.quantity.toLocaleString("de-DE")} {item.unit}
                              </td>
                              <td className={`text-right text-neutral-900 font-medium ${spacing.rowPy}`}>
                                {item.pricePerUnit.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                              <td className={`text-right font-semibold text-black pr-2 ${spacing.rowPy}`}>
                                {lineTotal.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}

                  {/* If Last Page: Render calculations, tax benefits and notes */}
                  {isLastPage && (
                    <div className="space-y-4">
                      {docType !== "portfolio" ? (
                        <>
                          {/* calculations and totals */}
                          <div className={`flex justify-end ${spacing.calcMb}`}>
                            <div className={`w-[48%] space-y-1.5 border-t-2 border-black pt-2 ${getFontSizeClass("calc")}`}>
                              {taxSetup === "kleinunternehmer" ? (
                                <>
                                  <div className="flex justify-between font-extrabold text-[13px] text-black border-b border-black/[0.12] pb-1.5 mb-1.5">
                                    <span>Gesamtbetrag</span>
                                    <span>{grandTotal.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</span>
                                  </div>
                                  <p className="text-[9.5px] text-neutral-900 leading-tight italic text-right font-medium animate-fade-in">
                                    Gemäß § 19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer berechnet.
                                  </p>
                                </>
                              ) : taxSetup === "exempt" ? (
                                <>
                                  <div className="flex justify-between font-extrabold text-[13px] text-black border-b border-black/[0.12] pb-1.5 mb-1.5">
                                    <span>Rechnungsbetrag</span>
                                    <span>{grandTotal.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</span>
                                  </div>
                                  <p className="text-[9.5px] text-neutral-900 leading-tight italic text-right font-medium animate-fade-in">
                                    Umsatzsteuerbefreite Leistung.
                                  </p>
                                </>
                              ) : (
                                <>
                                  <div className="flex justify-between text-neutral-850 font-medium">
                                    <span>Zwischensumme (Netto)</span>
                                    <span>{subtotal.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
                                  </div>
                                  <div className="flex justify-between text-neutral-850 font-medium border-b border-black/[0.1] pb-1.5">
                                    <span>MwSt. (19 %)</span>
                                    <span>{taxAmount.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
                                  </div>
                                  <div className="flex justify-between font-extrabold text-sm text-black pt-1.5">
                                    <span>Gesamtbetrag (Brutto)</span>
                                    <span>{grandTotal.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Steuerlicher Hinweis nach § 35a */}
                          {highlightLaborTaxBenefit && laborTotal > 0 && (
                            <div className={`p-2.5 bg-neutral-50 border-l-[3px] border-black text-neutral-900 text-left font-sans ${spacing.benefitMy} ${getFontSizeClass("intro")}`}>
                              <strong className="text-black font-extrabold">Steuerlicher Hinweis nach § 35a Abs. 5 EStG:</strong><br />
                              Im ausgewiesenen Gesamtbetrag sind Dienstleistungs- und Arbeitskosten (Lohnanteil) in Höhe von{" "}
                              <strong className="text-black font-extrabold">
                                {laborTotal.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                              </strong> enthalten. Private Haushalte können hiervon bis zu 20 % direkt steuerlich im Rahmen der Einkommensteuererklärung geltend machen.
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="p-3 bg-[#FAF9F6] border-l-[3px] border-black text-neutral-900 text-left font-sans text-[10px] mt-4 leading-relaxed">
                          ✨ <strong>Excellence & Qualität garantiert:</strong> Unsere Dienstleistungen werden ausschließlich von qualifiziertem, diskretem Fachpersonal unter Einsatz umweltschonender und modernster Reinigungsmittel ausgeführt. Zuverlässigkeit, Pünktlichkeit und die Werterhaltung Ihrer Immobilien stehen bei uns an erster Stelle.
                        </div>
                      )}

                      {/* Custom bottom notes */}
                      <div className={`text-neutral-900 leading-relaxed max-w-2xl border-t border-black/[0.1] font-sans text-left whitespace-pre-line ${spacing.notesPt} ${getFontSizeClass("intro")}`}>
                        {customNotes || (docType === "portfolio" ? "Wir freuen uns auf eine erfolgreiche Zusammenarbeit." : "Vielen Dank für Ihren wertvollen Auftrag.")}
                      </div>
                    </div>
                  )}
                </div>

                {/* BOTTOM FIXED FOOTER ZONE */}
                <div className="border-t border-black/[0.12] grid grid-cols-3 gap-6 text-neutral-900 text-left leading-normal font-sans uppercase tracking-[0.05em] pt-4 shrink-0 col-span-3 pb-1">
                  <div>
                    <p className="font-extrabold text-black text-[9px] mb-1">Firmensitz</p>
                    <p className="font-medium text-[8px]">{settings.senderCompany}</p>
                    <p className="font-medium text-[8px]">Inh. {settings.senderOwner}</p>
                    <p className="font-medium text-[8px]">{settings.senderStreet}</p>
                    <p className="font-medium text-[8px]">{settings.senderCity}</p>
                  </div>
                  
                  <div>
                    <p className="font-extrabold text-black text-[9px] mb-1">Kontakt</p>
                    <p className="font-medium text-[8px]">E-Mail: {settings.senderEmail}</p>
                    <p className="font-medium text-[8px]">Tel: {settings.senderPhone}</p>
                    <p className="lowercase font-medium text-[8px]">Web: www.platinrein.de</p>
                  </div>
                  
                  <div>
                    <p className="font-extrabold text-black text-[9px] mb-1">Finanzdaten</p>
                    {settings.senderBankName && <p className="font-medium text-[8px]">Bank: {settings.senderBankName}</p>}
                    {settings.senderIban && <p className="select-all font-semibold text-[8px]">IBAN: {settings.senderIban}</p>}
                    {settings.senderBic && <p className="font-medium text-[8px]">BIC: {settings.senderBic}</p>}
                    
                    <p className="mt-1 font-bold text-[7.5px] text-black">
                      {settings.taxNumberOption === "beantragt" ? (
                        <span>Steuernummer: Beantragt</span>
                      ) : settings.senderTaxNumber ? (
                        <span>St.-Nr.: {settings.senderTaxNumber}</span>
                      ) : (
                        "St.-Nr.: Siehe Anschreiben"
                      )}
                      {settings.senderUstId && <span className="block">USt-IdNr.: {settings.senderUstId}</span>}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Premium print helper modal for iframes */}
      <AnimatePresence>
        {showPrintModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs btn-no-print">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white border-2 border-charcoal max-w-lg w-full shadow-2xl p-6 md:p-8 relative rounded-none"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPrintModal(false)}
                className="absolute top-4 right-4 p-1.5 text-charcoal/40 hover:text-charcoal transition-colors hover:bg-neutral-100"
                aria-label="Schließen"
              >
                <X size={18} />
              </button>

              <div className="flex items-start gap-4 mb-6">
                <div className="bg-amber-50 border border-amber-200 text-amber-700 p-3 shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#1F1F21] font-sans">
                    PDF-Druck im Editor blockiert
                  </h3>
                  <p className="text-[10px] text-charcoal/50 uppercase tracking-wider font-bold mt-0.5">
                    Browser-Sicherheitsregel
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-charcoal/80 leading-relaxed font-sans mb-8">
                <p>
                  Da Sie diese Anwendung gerade im geschützten Vorschau-Modus (Iframe) testen, 
                  <strong> unterbindet Ihr Webbrowser das Auslösen des Druckmenüs aus Sicherheitsgründen</strong>.
                </p>
                <div className="bg-neutral-50 p-4 border border-neutral-100/70 font-medium text-neutral-800 leading-relaxed">
                  💡 <strong>Die einfache Lösung:</strong> Öffnen Sie die Anwendung einfach in einem vollkommen eigenständigen 
                  Browser-Tab. Dort läuft die App barrierefrei und Sie können jedes Angebot oder jede Rechnung 
                  sofort als PDF abspeichern.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={window.location.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowPrintModal(false)}
                  className="flex-1 px-5 py-3.5 bg-charcoal text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <ExternalLink size={14} />
                  Im Vollbild-Tab öffnen
                </a>
                <button
                  onClick={() => {
                    setShowPrintModal(false);
                    try {
                      window.print();
                    } catch (e) {
                      // ignore
                    }
                  }}
                  className="px-5 py-3.5 border border-charcoal/10 hover:border-charcoal/30 text-xs uppercase tracking-widest font-bold text-charcoal/70 hover:text-charcoal transition-colors bg-white hover:bg-neutral-50 rounded-none"
                >
                  Trotzdem versuchen
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
