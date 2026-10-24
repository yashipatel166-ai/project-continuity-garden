import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function Eyebrow({ children, line = false }: { children: ReactNode; line?: boolean }) {
  return (
    <p className="eyebrow flex items-center gap-3">
      {line && <span className="inline-block h-px w-8 bg-gold" />}
      {children}
    </p>
  );
}

export function Heading({
  main,
  accent,
  as: Tag = "h2",
  className = "",
  light = false,
}: {
  main: ReactNode;
  accent: ReactNode;
  as?: "h1" | "h2";
  className?: string;
  light?: boolean;
}) {
  return (
    <Tag className={`display ${light ? "text-forest-foreground" : "text-primary"} ${className}`}>
      {main} <em className="italic text-gold">{accent}</em>
    </Tag>
  );
}

export function CtaBand({
  main,
  accent,
  search,
}: {
  main: ReactNode;
  accent: ReactNode;
  search?: { division?: string; product?: string };
}) {
  return (
    <section className="bg-forest py-16 text-center sm:py-24">
      <div className="container-site">
        <Heading main={main} accent={accent} light className="mx-auto max-w-3xl text-4xl sm:text-5xl md:text-6xl" />
        <Link
          to="/"
          search={search ?? {}}
          hash="inquiry"
          className="mt-10 inline-flex items-center gap-6 bg-gold px-5 py-4 text-sm font-semibold text-accent-foreground hover:opacity-90"
        >
          Request a quote <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
