import { Globe } from "lucide-react";
import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: { translate: { TranslateElement: new (opts: object, id: string) => unknown } };
  }
}

/** Google Translate widget: translates the whole site live into any language. */
export function LanguageSwitcher({ id }: { id: string }) {
  useEffect(() => {
    const init = () => {
      const el = document.getElementById(id);
      if (!el || el.childElementCount || !window.google?.translate) return;
      new window.google.translate.TranslateElement({ pageLanguage: "en", autoDisplay: false }, id);
    };
    const prev = window.googleTranslateElementInit;
    window.googleTranslateElementInit = () => {
      prev?.();
      init();
    };
    if (window.google?.translate) init();
    else if (!document.getElementById("google-translate-script")) {
      const s = document.createElement("script");
      s.id = "google-translate-script";
      s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      document.body.appendChild(s);
    }
  }, [id]);

  return (
    <div className="lang-switch flex items-center gap-1.5" title="Translate this website">
      <Globe className="h-4 w-4 text-gold" aria-hidden />
      <div id={id} />
    </div>
  );
}
