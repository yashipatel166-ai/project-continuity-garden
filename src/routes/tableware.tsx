import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { CtaBand, Eyebrow, Heading } from "@/components/site/Ui";
import { CATEGORIES, PRODUCTS, type Category, type Product } from "@/lib/tableware";

export const Route = createFileRoute("/tableware")({
  head: () => ({
    meta: [
      { title: "Bagasse Tableware Catalogue — AAVYA GLOBEX" },
      { name: "description", content: "23 compostable sugarcane bagasse plates, meal trays, clamshells and bowls. Export ready, B2B supply." },
      { property: "og:title", content: "Bagasse Tableware Catalogue — AAVYA GLOBEX" },
      { property: "og:description", content: "Compostable bagasse plates, trays, clamshells and bowls for foodservice buyers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Tableware,
});

const badges = ["100% compostable", "Microwave safe", "Freezer safe", "Oil & water resistant", "Food safe"];

function Tableware() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const list = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
  return (
    <>
      <section className="container-site grid gap-12 pt-12 pb-14 lg:grid-cols-2">
        <div className="animate-rise">
          <Eyebrow line>Sustainable tableware</Eyebrow>
          <Heading as="h1" main={<>Bagasse<br /></>} accent="tableware." className="mt-8 text-7xl md:text-[6rem]" />
        </div>
        <div className="lg:pt-6">
          <p className="text-xs font-bold tracking-[0.12em] text-primary">CORE FOODSERVICE RANGE</p>
          <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
            Sugarcane Bagasse | Export Ready | B2B Supply — 23 core compostable plates, meal trays, clamshells and bowls. More products and custom branding arranged on request.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {badges.map((b) => (
              <li key={b} className="border border-border bg-card px-3 py-2 font-mono text-[0.62rem] tracking-[0.15em] uppercase text-primary">{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-site border-t border-border pt-7 pb-28">
        <div className="flex flex-wrap gap-2">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                filter === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="eyebrow mt-7 text-[0.7rem]">{list.length} products</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.name} p={p} />)}
          {filter === "All" && (
            <div className="flex flex-col justify-center border border-dashed border-gold bg-card p-7">
              <p className="eyebrow text-[0.65rem]">Beyond the range</p>
              <h3 className="mt-3 font-display text-2xl text-primary">Need something else?</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Cups, lids, cutlery, dona, custom sizes or printed branding — if it can be moulded from bagasse, we can arrange it for you.
              </p>
              <Link to="/" search={{ division: "Sustainable Tableware", product: "Custom requirement" }} hash="inquiry" className="link-underline mt-6 self-start text-primary">
                Tell us what you need <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <CtaBand main={<>Need a mixed container<br />or</>} accent="private label?" search={{ division: "Sustainable Tableware" }} />
    </>
  );
}

function ProductCard({ p }: { p: Product }) {
  const [open, setOpen] = useState(false);
  const container = p.container === "On request" ? "On request" : `${p.container} cases`;
  const rows: [string, string][] = [
    ["Qty / case", p.qty],
    ["Weight", p.weight],
    ["40ft container", container],
  ];
  const extra: [string, string][] = [
    ["Material", "Sugarcane bagasse"],
    ["Finish", p.unbleached ? "Unbleached (natural)" : "Bleached (white)"],
    ["Category", p.category],
    ["Custom branding", "On request"],
  ];
  return (
    <article className="flex flex-col border border-border bg-card">
      <div className="relative aspect-square overflow-hidden border-b-4 border-primary">
        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
        {p.unbleached && (
          <span className="absolute top-3 left-3 bg-card px-2 py-1 font-mono text-[0.6rem] tracking-[0.15em] uppercase text-primary">Unbleached</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-gold">{p.category}</p>
        <h3 className="mt-2 font-display text-xl text-primary">{p.name}</h3>
        <dl className="mt-3 text-xs">
          {(open ? [...rows, ...extra] : rows).map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-dashed border-border py-2.5">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="font-medium text-primary">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto flex items-center justify-between pt-5">
          <button onClick={() => setOpen(!open)} className="link-underline gap-3 text-xs text-primary">
            {open ? "Less" : "Full specs"} <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          <Link to="/" search={{ division: "Sustainable Tableware", product: p.name }} hash="inquiry" className="link-underline gap-3 text-xs text-primary">
            Request quote <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
