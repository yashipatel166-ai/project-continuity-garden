import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { Eyebrow, Heading } from "@/components/site/Ui";
import { InquiryForm } from "@/components/site/InquiryForm";
import { useContent } from "@/hooks/use-content";
import { mediaStyle } from "@/lib/content-fields";

type Search = { division?: string | undefined; product?: string | undefined };

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    division: typeof s["division"] === "string" ? s["division"] : undefined,
    product: typeof s["product"] === "string" ? s["product"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "AAVYA GLOBEX — Global sourcing. Trusted trade." },
      { name: "description", content: "Garjan face veneer, pomegranates and bagasse tableware — imported and exported for buyers worldwide." },
      { property: "og:title", content: "AAVYA GLOBEX — Global sourcing. Trusted trade." },
      { property: "og:description", content: "India-based import–export company: face veneer, pomegranates and bagasse tableware." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const story = ["Our roots", "Growth", "Today", "Our approach"];

const docs = [
  { code: "FSSAI", title: "Central Food Licence", sub: "Importer • Exporter • Wholesaler", href: "/docs/fssai-licence.pdf" },
  { code: "IEC", title: "Import Export Code", sub: "DGFT • Kandla SEZ", href: "/docs/iec-certificate.pdf" },
  { code: "RCMC", title: "APEDA Membership", sub: "Agricultural & Processed Food Products Export Development Authority", href: "/docs/rcmc-apeda.pdf" },
];

function Home() {
  const { division, product } = Route.useSearch();
  const c = useContent("home");
  return (
    <>
      {/* Hero */}
      <section className="container-site grid items-center gap-10 pt-8 pb-16 sm:gap-14 sm:pt-12 sm:pb-28 lg:grid-cols-2">
        <div className={`animate-rise ${c("hero_layout") === "left" ? "lg:order-2" : ""}`}>
          <Eyebrow line>{c("hero_eyebrow")}</Eyebrow>
          <h1 className="display mt-6 text-[3.4rem] text-primary sm:mt-8 sm:text-7xl md:text-[6.2rem]">
            Global<br />sourcing.<br />
            <em className="italic text-gold">Trusted<br />trade.</em>
          </h1>
          <p className="mt-10 max-w-md leading-7 text-muted-foreground">
            {c("hero_text")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#businesses" className="inline-flex items-center gap-5 bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Explore our businesses <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#inquiry" className="link-underline text-primary">Start a trade inquiry <ArrowUpRight className="h-3.5 w-3.5" /></a>
          </div>
        </div>
        <div className="relative animate-rise [animation-delay:150ms]">
          <div className="absolute -bottom-6 -left-6 h-28 w-28 bg-gold" />
          <div className="relative overflow-hidden bg-secondary">
            <img src={c("hero_image")} alt="Container ship at port" style={mediaStyle(c, "hero_image", 560)} className="w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />
            <div className="absolute top-8 right-8 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-forest-foreground/70 text-forest-foreground">
              <span className="font-mono text-[0.55rem] tracking-[0.2em]">EST.</span>
              <span className="font-display text-xl">2026</span>
              <span className="font-mono text-[0.55rem] tracking-[0.2em]">INDIA</span>
            </div>
            <div className="absolute bottom-6 left-6 text-forest-foreground">
              <p className="eyebrow text-[0.6rem]">Origin to market</p>
              <p className="mt-2 font-display text-2xl italic leading-tight">Grown with care.<br />Shipped with trust.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="container-site grid scroll-mt-4 gap-10 py-16 lg:grid-cols-2">
        <div>
          <Eyebrow>About us</Eyebrow>
          <Heading main={<>Connecting origins<br />with</>} accent="opportunity." className="mt-6 text-4xl sm:text-5xl md:text-[4.2rem]" />
        </div>
        <div className="lg:pt-14">
          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            {c("about_text")}
          </p>
          <a href="#businesses" className="link-underline mt-8 text-primary">Explore our businesses <ArrowDownRight className="h-3.5 w-3.5" /></a>
        </div>
      </section>

      {/* Businesses */}
      <section id="businesses" className="container-site scroll-mt-4 py-16 sm:py-24">
        <Eyebrow>Our businesses</Eyebrow>
        <Heading main={<>Three divisions.<br /></>} accent="One partner." className="mt-6 text-4xl sm:text-5xl md:text-[4.2rem]" />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <DivisionCard n="01" tag="Import / Face Veneer" img={c("veneer_image")} imgStyle={mediaStyle(c, "veneer_image", 280)} bar="border-muted-foreground" title={<>Garjan Face<br />Veneer</>}
            body={c("veneer_text")}
            chips="Garjan Face Veneer"
            link={<Link to="/" search={{ division: "Face Veneer" }} hash="inquiry" className="link-underline text-primary">Explore this business <ArrowUpRight className="h-3.5 w-3.5" /></Link>} />
          <DivisionCard n="02" tag="Export / Agriculture" img={c("pomegranate_image")} imgStyle={mediaStyle(c, "pomegranate_image", 280)} bar="border-pomegranate" title={<>Pomegranate</>}
            body={c("pomegranate_text")}
            chips="Our Pomegranates • Own Farms, Gujarat"
            link={<Link to="/produce" className="link-underline text-primary">See our farms <ArrowUpRight className="h-3.5 w-3.5" /></Link>} />
          <DivisionCard n="03" tag="Export / Sustainable Products" img={c("tableware_image")} imgStyle={mediaStyle(c, "tableware_image", 280)} bar="border-primary" title={<>Sustainable<br />Tableware</>}
            body={<><span className="block text-xs font-bold tracking-[0.12em] text-primary">CORE FOODSERVICE RANGE</span>{c("tableware_text")}</>}
            chips="Bagasse Tableware • Plates • Bowls • Meal Trays • Clamshells"
            link={<Link to="/tableware" className="link-underline text-primary">View catalogue <ArrowUpRight className="h-3.5 w-3.5" /></Link>} />
        </div>
      </section>

      {/* Farm story */}
      <section className="grid lg:grid-cols-2">
        <div className={`relative bg-forest ${c("farm_layout") === "right" ? "lg:order-2" : ""}`}>
          <video key={c("farm_video")} src={c("farm_video")} autoPlay muted loop playsInline poster="/farm.jpg" style={mediaStyle(c, "farm_video", 620)} className="w-full lg:h-full" />
          <span className="absolute bottom-3 left-3 sm:bottom-6 sm:left-7 bg-forest px-3 py-2 font-mono text-[0.65rem] tracking-[0.18em] text-forest-foreground">
            OUR POMEGRANATE FARM · GUJARAT
          </span>
        </div>
        <div className="bg-forest px-6 py-16 text-forest-foreground sm:px-8 sm:py-24 md:px-28">
          <Eyebrow>Our agricultural story</Eyebrow>
          <Heading main={<>From our farms<br />to</>} accent="global markets." light className="mt-6 text-4xl sm:text-5xl md:text-[4.2rem]" />
          <p className="mt-8 max-w-md text-sm leading-7 text-forest-muted">
            {c("farm_text")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5 border-y border-forest-line py-5 text-sm font-semibold">
            {["Our farm", "Harvest", "Selection", "Export"].map((s, i) => (
              <span key={s} className="flex items-center gap-5">
                {i > 0 && <span className="text-gold">→</span>}{s}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-8">
            <Link to="/" search={{ division: "Fresh Produce & Agriculture", product: "Pomegranates" }} hash="inquiry" className="link-underline">
              Ask about our export supply <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/produce" className="link-underline">See the farm <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section id="certifications" className="container-site scroll-mt-4 py-16 sm:py-28">
        <Eyebrow>Documentation</Eyebrow>
        <Heading main={<>Registered.<br /></>} accent="Export-ready." className="mt-6 text-4xl sm:text-5xl md:text-[4.2rem]" />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {docs.map((d) => (
            <div key={d.code} className="flex flex-col border border-border border-t-2 border-t-gold bg-card p-7">
              <p className="font-mono text-xs tracking-[0.2em] text-gold">{d.code}</p>
              <h3 className="mt-4 font-display text-2xl text-primary">{d.title}</h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{d.sub}</p>
              <a href={d.href} target="_blank" rel="noreferrer" className="link-underline mt-8 self-start text-primary">
                View certificate <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="container-site scroll-mt-4 grid gap-12 border-t border-border py-16 sm:py-24 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow>Our story</Eyebrow>
          <Heading main={<>Rooted in<br />our</>} accent="heritage." className="mt-6 text-4xl sm:text-5xl md:text-[4.2rem]" />
          <p className="mt-8 font-display text-xl italic text-gold">Growing into a new generation of global trade.</p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2">
          {story.map((title, i) => (
            <li key={title} className="border border-border border-t-2 border-t-gold bg-card p-6">
              <p className="font-mono text-xs tracking-[0.2em] text-gold">0{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl text-primary">{title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{c(`story_${i + 1}`)}</p>
            </li>
          ))}
        </ol>
      </section>

      <InquiryForm division={division} product={product} />
    </>
  );
}

function DivisionCard(props: {
  n: string; tag: string; img: string; imgStyle: React.CSSProperties; bar: string; title: React.ReactNode; body: React.ReactNode; chips: string; link: React.ReactNode;
}) {
  return (
    <article className="group flex flex-col border border-border bg-card">
      <div className={`relative overflow-hidden bg-secondary border-b-4 ${props.bar}`}>
        <img src={props.img} alt="" style={props.imgStyle} className="w-full transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent" />
        <span className="absolute top-5 left-4 font-mono text-xs text-forest-foreground">{props.n}</span>
        <span className="absolute bottom-5 left-4 font-mono text-[0.65rem] tracking-[0.15em] uppercase text-forest-foreground">{props.tag}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-3xl leading-tight text-primary">{props.title}</h3>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{props.body}</p>
        <p className="mt-6 font-mono text-[0.68rem] tracking-[0.12em] uppercase text-gold">{props.chips}</p>
        <div className="mt-5">{props.link}</div>
      </div>
    </article>
  );
}
