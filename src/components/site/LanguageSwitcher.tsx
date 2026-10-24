import { Check, Globe } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: { translate: { TranslateElement: new (opts: object, id: string) => unknown } };
  }
}

const LANGS: [code: string, native: string, english: string][] = [
  ["en", "English", "English"], ["hi", "हिन्दी", "Hindi"], ["gu", "ગુજરાતી", "Gujarati"],
  ["mr", "मराठी", "Marathi"], ["bn", "বাংলা", "Bengali"], ["ta", "தமிழ்", "Tamil"],
  ["te", "తెలుగు", "Telugu"], ["kn", "ಕನ್ನಡ", "Kannada"], ["ml", "മലയാളം", "Malayalam"],
  ["pa", "ਪੰਜਾਬੀ", "Punjabi"], ["ur", "اردو", "Urdu"], ["ar", "العربية", "Arabic"],
  ["zh-CN", "中文 (简体)", "Chinese"], ["ja", "日本語", "Japanese"], ["ko", "한국어", "Korean"],
  ["fr", "Français", "French"], ["de", "Deutsch", "German"], ["es", "Español", "Spanish"],
  ["pt", "Português", "Portuguese"], ["it", "Italiano", "Italian"], ["nl", "Nederlands", "Dutch"],
  ["ru", "Русский", "Russian"], ["tr", "Türkçe", "Turkish"], ["fa", "فارسی", "Persian"],
  ["id", "Bahasa Indonesia", "Indonesian"], ["ms", "Bahasa Melayu", "Malay"], ["th", "ไทย", "Thai"],
  ["vi", "Tiếng Việt", "Vietnamese"], ["pl", "Polski", "Polish"], ["uk", "Українська", "Ukrainian"],
  ["sw", "Kiswahili", "Swahili"], ["ne", "नेपाली", "Nepali"], ["si", "සිංහල", "Sinhala"],
  ["he", "עברית", "Hebrew"], ["el", "Ελληνικά", "Greek"], ["sv", "Svenska", "Swedish"],
];

const HOST_ID = "google_translate_host";

function currentLang() {
  const m = document.cookie.match(/googtrans=\/[^/]*\/([^;]+)/);
  return m?.[1] ?? "en";
}

function loadGoogle() {
  if (document.getElementById(HOST_ID)) return;
  const host = document.createElement("div");
  host.id = HOST_ID;
  host.className = "gt-hidden-host";
  document.body.appendChild(host);
  window.googleTranslateElementInit = () => {
    new window.google!.translate.TranslateElement({ pageLanguage: "en", autoDisplay: false }, HOST_ID);
  };
  const s = document.createElement("script");
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.body.appendChild(s);
}

function applyLang(code: string) {
  if (code === "en") {
    const host = location.hostname;
    for (const d of ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`]) {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
    }
    location.reload();
    return;
  }
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!combo) {
    document.cookie = `googtrans=/en/${code}; path=/`;
    location.reload();
    return;
  }
  combo.value = code;
  combo.dispatchEvent(new Event("change"));
}

/** Language picker modelled on the reference site: pill button, searchable list, live translation. */
export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [lang, setLang] = useState("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGoogle();
    setLang(currentLang());
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? LANGS.filter(([c, n, e]) => `${c} ${n} ${e}`.toLowerCase().includes(t)) : LANGS;
  }, [q]);

  const active = LANGS.find(([c]) => c === lang);

  return (
    <div ref={ref} className="notranslate relative" translate="no">
      <button
        type="button"
        aria-label="Choose language"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-border p-1.5 text-sm sm:pr-3 font-semibold transition-colors hover:border-gold"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary">
          <Globe className="h-3.5 w-3.5 text-gold" />
        </span>
        <span className="hidden max-w-[9rem] truncate sm:inline">{lang === "en" || !active ? "Language" : active[1]}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 border border-border bg-card shadow-lg">
          <div className="border-b border-border p-2">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search or type any language…"
              className="w-full border border-primary bg-background px-3 py-2 text-sm outline-none"
            />
          </div>
          <ul className="max-h-72 overflow-y-auto py-1">
            {list.map(([code, native, english]) => (
              <li key={code}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setQ("");
                    if (code === lang) return;
                    setLang(code);
                    applyLang(code);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-secondary"
                >
                  <span className="text-sm font-semibold">{native}</span>
                  <span className="text-xs text-muted-foreground">{english}</span>
                  {code === lang && <Check className="ml-auto h-4 w-4 text-primary" />}
                </button>
              </li>
            ))}
            {list.length === 0 && <li className="px-4 py-3 text-sm text-muted-foreground">No language found</li>}
          </ul>
          <p className="border-t border-border px-4 py-2 text-xs leading-snug text-muted-foreground">
            Pages are translated automatically. The brand name and logo stay in English.
          </p>
        </div>
      )}
    </div>
  );
}
