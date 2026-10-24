import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, Eyebrow, Heading } from "@/components/site/Ui";

export const Route = createFileRoute("/produce")({
  head: () => ({
    meta: [
      { title: "Fresh Produce & Pomegranates — AAVYA GLOBEX" },
      { name: "description", content: "Pomegranates from our own farms in Khirsara, Gujarat — graded, packed and documented for export." },
      { property: "og:title", content: "Fresh Produce & Pomegranates — AAVYA GLOBEX" },
      { property: "og:description", content: "From our farms in Gujarat to global markets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Produce,
});

const facts = [
  ["Origin", "Khirsara, Gujarat, India"],
  ["Crop", "Pomegranate (own farms + partner growers)"],
  ["Supply", "Graded, packed and documented for export"],
  ["Also", "Seasonal sourced produce on request"],
];

const gallery = [
  { src: "/farm/g1.jpg", alt: "Fresh-cut arils, straight from the orchard", cls: "md:row-span-2" },
  { src: "/farm/g2.jpg", alt: "Ripening fruit, Khirsara, Gujarat", cls: "md:col-span-2" },
  { src: "/farm/g3.jpg", alt: "Export-grade fruit on the tree", cls: "" },
  { src: "/farm/g4.jpg", alt: "Our orchard rows", cls: "" },
  { src: "/farm/g5.jpg", alt: "Peak-season canopy", cls: "md:col-span-2" },
];

function Produce() {
  return (
    <>
      <section className="container-site grid gap-12 pt-12 pb-20 lg:grid-cols-2 lg:items-end">
        <div className="animate-rise">
          <Eyebrow line>Fresh produce &amp; agriculture</Eyebrow>
          <Heading as="h1" main={<>From our<br />farms<br />to</>} accent={<>global<br />markets.</>} className="mt-8 text-7xl md:text-[6rem]" />
        </div>
        <div>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            We grow pomegranates on our own farms in Gujarat and work with selected local growers. Every lot is graded, packed and documented for export.
          </p>
          <dl className="mt-6 grid gap-x-6 sm:grid-cols-2">
            {facts.map(([k, v]) => (
              <div key={k} className="border-t border-border py-4">
                <dt className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-gold">{k}</dt>
                <dd className="mt-1 text-sm text-primary">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-site pb-28">
        <div className="relative aspect-video overflow-hidden">
          <video autoPlay muted loop playsInline poster="/farm.jpg" className="h-full w-full object-cover">
            <source src="/farm.webm" type="video/webm" />
            <source src="/farm.mp4" type="video/mp4" />
          </video>
          <span className="absolute bottom-6 left-7 bg-forest px-3 py-2 font-mono text-[0.65rem] tracking-[0.18em] text-forest-foreground">
            OUR POMEGRANATE FARM · GUJARAT
          </span>
        </div>
        <div className="mt-4 grid auto-rows-[260px] gap-4 md:grid-cols-4">
          {gallery.map((g) => (
            <figure key={g.src} className={`group overflow-hidden ${g.cls}`} title={g.alt}>
              <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </figure>
          ))}
        </div>
      </section>

      <CtaBand main={<>Looking for<br /></>} accent="export supply?" search={{ division: "Fresh Produce & Agriculture", product: "Pomegranates" }} />
    </>
  );
}
