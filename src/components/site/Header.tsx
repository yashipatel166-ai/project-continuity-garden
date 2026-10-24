import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

function BusinessLinks({ className }: { className: string }) {
  return (
    <>
      <Link to="/" search={{ division: "Face Veneer" }} hash="inquiry" className={className}>Garjan Face Veneer</Link>
      <Link to="/produce" className={className}>Pomegranate</Link>
      <Link to="/tableware" className={className}>Bagasse Tableware</Link>
    </>
  );
}

export function Logo({ large = false }: { large?: boolean }) {
  return (
    <Link to="/" className="notranslate flex shrink-0 items-center gap-3 whitespace-nowrap" translate="no">
      <img src="/logo-mark.png" alt="" className={large ? "h-16 w-auto" : "h-12 w-auto"} />
      <span className={large ? "text-3xl font-bold" : "text-xl font-bold tracking-[0.12em] md:text-2xl"}>
        {large ? (
          "Aavya Globex"
        ) : (
          <>
            <b className="font-extrabold">AAVYA</b> GLOBEX
          </>
        )}
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const navCls = "whitespace-nowrap text-xs font-semibold tracking-[0.12em] uppercase hover:text-gold transition-colors";
  return (
    <header className="container-site flex h-[84px] items-center justify-between gap-4">
      <Logo />
      <nav className="hidden items-center gap-8 lg:flex">
        <div className="group relative">
          <button className={`${navCls} flex items-center gap-1`}>
            Our businesses <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <div className="invisible absolute left-0 top-full z-30 w-64 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
            <div className="border border-border bg-card py-2 shadow-lg">
              <BusinessLinks className="block px-5 py-2.5 text-sm hover:bg-secondary hover:text-gold" />
            </div>
          </div>
        </div>
        <Link to="/" hash="about" className={navCls}>About us</Link>
        <Link to="/" hash="inquiry" className={navCls}>Contact</Link>
      </nav>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <Link
          to="/"
          hash="inquiry"
          className="hidden items-center gap-1.5 whitespace-nowrap bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 lg:flex"
        >
          Request a quote <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="absolute inset-x-0 top-[84px] z-40 border-b border-border bg-background px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4" onClick={() => setOpen(false)}>
            <BusinessLinks className={navCls} />
            <Link to="/" hash="about" className={navCls}>About us</Link>
            <Link to="/" hash="inquiry" className={navCls}>Contact</Link>
            <Link to="/" hash="inquiry" className="bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground">
              Request a quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
