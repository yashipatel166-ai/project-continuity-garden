import { Link } from "@tanstack/react-router";
import { Logo } from "./Header";
import { useContent } from "@/hooks/use-content";

export function Footer() {
  const c = useContent("site");
  const head = "font-mono text-[0.7rem] tracking-[0.2em] uppercase text-gold mb-5";
  const item = "block text-sm text-muted-foreground hover:text-foreground mb-3";
  return (
    <footer className="container-site pt-16 pb-10">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo large />
          <p className="mt-6 text-xs text-muted-foreground">{c("footer_tagline")}</p>
        </div>
        <div>
          <p className={head}>Business</p>
          <Link to="/" search={{ division: "Face Veneer" }} hash="inquiry" className={item}>Garjan Face Veneer</Link>
          <Link to="/produce" className={item}>Pomegranate</Link>
          <Link to="/tableware" className={item}>Tableware Catalogue</Link>
        </div>
        <div>
          <p className={head}>Trade</p>
          <Link to="/" hash="certifications" className={item}>Certifications</Link>
          <Link to="/" hash="inquiry" className={item}>Request a Quote</Link>
          <Link to="/" search={{ division: "Something else / sourcing request", product: "Become a supplier" }} hash="inquiry" className={item}>Become a Supplier</Link>
        </div>
        <div>
          <p className={head}>Contact</p>
          <span className={item}>{c("contact_location")}</span>
          <a href={`mailto:${c("contact_email")}`} className={item}>{c("contact_email")}</a>
          <a href="https://wa.me/916359659599" target="_blank" rel="noreferrer" className={item}>WhatsApp us ↗</a>
        </div>
      </div>
      <div className="mt-12 border-t border-border pt-8 font-mono text-[0.7rem] tracking-wider text-muted-foreground">
        © 2026 AAVYA GLOBEX
      </div>
    </footer>
  );
}
