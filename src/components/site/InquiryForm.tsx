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
// Inquiries are delivered by FormSubmit (formsubmit.co) straight to this inbox — no email app needed.
const INQUIRY_ENDPOINT = "https://formsubmit.co/ajax/info@aavyaglobex.com";

const label = "mb-1 block text-[0.7rem] tracking-[0.08em] uppercase text-forest-muted";

export function InquiryForm({ division, product }: { division?: string | undefined; product?: string | undefined }) {
  const [div, setDiv] = useState(division ?? "");
  const [spec, setSpec] = useState(product ?? "");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (division) setDiv(division);
    if (product) setSpec(product);
  }, [division, product]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    if (d.get("_honey")) return; // spam bot filled the hidden field
    setStatus("sending");
    const name = String(d.get("name") ?? "");
    const payload = {
      _subject: `New trade inquiry${div ? ` — ${div}` : ""} from ${name}`,
      _replyto: String(d.get("email") ?? ""),
      _template: "table",
      _captcha: "false",
      "Name": name,
      "Company": String(d.get("company") ?? ""),
      "Email": String(d.get("email") ?? ""),
      "Phone / WhatsApp": String(d.get("phone") ?? ""),
      "Product / division": div,
      "Quantity / volume": String(d.get("quantity") ?? ""),
      "Specification": spec,
      "Destination country": String(d.get("destination") ?? ""),
      "Message": String(d.get("message") ?? ""),
      "Page": typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      const res = await fetch(INQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") throw new Error(json.message || "Submission failed");
      setStatus("sent");
      form.reset();
      setDiv("");
      setSpec("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section id="inquiry" className="scroll-mt-4 bg-forest py-16 sm:py-24 text-forest-foreground">
      <div className="container-site grid gap-16 lg:grid-cols-2">
        <div>
          <Eyebrow>For buyers</Eyebrow>
          <Heading main="Request" accent={<><br />a quote.</>} light className="mt-6 text-5xl sm:text-6xl" />
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
          <input type="checkbox" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <button type="submit" disabled={status === "sending"} className="flex items-center justify-center gap-6 bg-gold py-4 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60 sm:col-span-2">
            {status === "sending" ? "Sending…" : "Submit trade inquiry"} <ArrowRight className="h-4 w-4" />
          </button>
          {status === "sent" && (
            <p role="status" className="text-sm text-gold sm:col-span-2">Thank you — your inquiry has been sent. Our team will get back to you within 24 hours.</p>
          )}
          {status === "error" && (
            <p role="alert" className="text-sm text-forest-foreground sm:col-span-2">
              Sorry, your inquiry couldn’t be sent. Please try again, or email us at{" "}
              <a href="mailto:info@aavyaglobex.com" className="underline hover:text-gold">info@aavyaglobex.com</a> or WhatsApp +91 63596 59599.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
