import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Eyebrow, Heading } from "./Ui";

export const DIVISIONS = [
  "Face Veneer",
  "Fresh Produce & Agriculture",
  "Sustainable Tableware",
  "Something else / sourcing request",
];

const field =
  "w-full border-0 border-b border-forest-line bg-transparent py-2.5 text-sm tracking-wide text-forest-foreground placeholder:text-forest-muted/70 focus:border-gold focus:outline-none";
const label = "mb-1 block text-[0.7rem] tracking-[0.08em] uppercase text-forest-muted";

export function InquiryForm({ division, product }: { division?: string; product?: string }) {
  const [div, setDiv] = useState(division ?? "");
  const [spec, setSpec] = useState(product ?? "");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (division) setDiv(division);
    if (product) setSpec(product);
  }, [division, product]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const lines = [
      ["Name", d.get("name")],
      ["Company", d.get("company")],
      ["Email", d.get("email")],
      ["Phone / WhatsApp", d.get("phone")],
      ["Product / division", div],
      ["Quantity / volume", d.get("quantity")],
      ["Specification", spec],
      ["Destination country", d.get("destination")],
      ["Message", d.get("message")],
    ]
      .map(([k, v]) => `${k}: ${v ?? ""}`)
      .join("\n");
    const subject = `Trade inquiry${div ? ` — ${div}` : ""}`;
    window.location.href = `mailto:info@aavyaglobex.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
    setSent(true);
  }

  return (
    <section id="inquiry" className="scroll-mt-4 bg-forest py-24 text-forest-foreground">
      <div className="container-site grid gap-16 lg:grid-cols-2">
        <div>
          <Eyebrow>For buyers</Eyebrow>
          <Heading main="Request" accent={<><br />a quote.</>} light className="mt-6 text-6xl" />
          <div className="mt-14 border-t border-forest-line pt-6 text-sm">
            <p className="text-forest-muted">Prefer a direct line?</p>
            <a href="mailto:info@aavyaglobex.com" className="mt-2 block hover:text-gold">info@aavyaglobex.com</a>
            <a href="https://wa.me/916359659599" target="_blank" rel="noreferrer" className="mt-2 block hover:text-gold">
              +91 63596 59599 · WhatsApp
            </a>
          </div>
        </div>
        <form onSubmit={onSubmit} className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
          <div><label className={label}>Full name</label><input required name="name" placeholder="Your name" className={field} /></div>
          <div><label className={label}>Company</label><input name="company" placeholder="Company name" className={field} /></div>
          <div><label className={label}>Work email</label><input required type="email" name="email" placeholder="you@company.com" className={field} /></div>
          <div><label className={label}>Phone / WhatsApp</label><input name="phone" placeholder="+91 ..." className={field} /></div>
          <div className="relative">
            <label className={label}>Product / division</label>
            <select value={div} onChange={(e) => setDiv(e.target.value)} className={`${field} appearance-none ${div ? "" : "text-forest-muted/70"}`}>
              <option value="" className="text-foreground">Select a business</option>
              {DIVISIONS.map((x) => <option key={x} value={x} className="text-foreground">{x}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-1 bottom-3 h-4 w-4 text-gold" />
          </div>
          <div><label className={label}>Quantity / volume</label><input name="quantity" placeholder="Approximate requirement" className={field} /></div>
          <div><label className={label}>Specification</label><input value={spec} onChange={(e) => setSpec(e.target.value)} placeholder="Grade, size, material, etc." className={field} /></div>
          <div><label className={label}>Destination country</label><input name="destination" placeholder="Where should it go?" className={field} /></div>
          <div className="sm:col-span-2"><label className={label}>Tell us a little more</label><textarea name="message" rows={3} placeholder="Share your requirement, timeline, or sourcing question." className={field} /></div>
          <button type="submit" className="flex items-center justify-center gap-6 bg-gold py-4 text-sm font-semibold text-accent-foreground hover:opacity-90 sm:col-span-2">
            Submit trade inquiry <ArrowRight className="h-4 w-4" />
          </button>
          {sent && <p className="text-sm text-forest-muted sm:col-span-2">Your email app should open with the inquiry filled in. Just press send.</p>}
        </form>
      </div>
    </section>
  );
}
