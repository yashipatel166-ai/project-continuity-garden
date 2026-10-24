import type React from "react";
// Registry of every admin-editable element, grouped per page, with its default value.
export type FieldType = "text" | "longtext" | "image" | "video" | "select";
export type Field = { key: string; label: string; type: FieldType; default: string; options?: { value: string; label: string }[] };

const SIDE = [{ value: "right", label: "On the right" }, { value: "left", label: "On the left" }];
export type PageId = "home" | "produce" | "tableware" | "site";

export const PAGES: { id: PageId; label: string; fields: Field[] }[] = [
  {
    id: "site",
    label: "Header & footer",
    fields: [
      { key: "footer_tagline", label: "Footer tagline", type: "text", default: "Global Exports, Infinite Reach" },
      { key: "contact_email", label: "Contact email", type: "text", default: "info@aavyaglobex.com" },
      { key: "contact_location", label: "Location", type: "text", default: "India" },
    ],
  },
  {
    id: "home",
    label: "Home page",
    fields: [
      { key: "hero_eyebrow", label: "Hero small heading", type: "text", default: "International sourcing & trade" },
      { key: "hero_text", label: "Hero text", type: "longtext", default: "Garjan face veneer, pomegranates and bagasse tableware — imported and exported for buyers worldwide." },
      { key: "hero_image", label: "Hero image", type: "image", default: "/hero-port.jpg" },
      { key: "hero_layout", label: "Layout — hero image position", type: "select", default: "right", options: SIDE },
      { key: "about_text", label: "About us text", type: "longtext", default: "Rooted in India and focused on the world, AAVYA GLOBEX links dependable producers with buyers who expect consistency. Whether it is fresh fruit, fine veneer or eco-friendly tableware, we handle every shipment with care, clear paperwork and honest communication." },
      { key: "veneer_image", label: "Garjan Face Veneer — image", type: "image", default: "/veneer.jpg" },
      { key: "veneer_text", label: "Garjan Face Veneer — text", type: "longtext", default: "Premium Garjan face veneer from established international origins, sourced for buyers who value consistency." },
      { key: "pomegranate_image", label: "Pomegranate — image", type: "image", default: "/pomegranate.jpg" },
      { key: "pomegranate_text", label: "Pomegranate — text", type: "longtext", default: "Ruby-red, juicy fruit harvested in Gujarat at peak ripeness, then carefully sorted and shipped to buyers abroad." },
      { key: "tableware_image", label: "Bagasse Tableware — image", type: "image", default: "/bagasse-plates.jpg" },
      { key: "tableware_text", label: "Bagasse Tableware — text", type: "longtext", default: "Sugarcane Bagasse | Export Ready | B2B Supply" },
      { key: "farm_video", label: "Farm video", type: "video", default: "/farm.mp4" },
      { key: "farm_layout", label: "Layout — farm video position", type: "select", default: "left", options: SIDE },
      { key: "farm_text", label: "Farm story text", type: "longtext", default: "Every season starts in our orchards in Gujarat. Fruit is picked by hand, sorted by size and colour, and packed to travel well." },
      { key: "story_1", label: "Our story — Our roots", type: "longtext", default: "A family business built on timber, giving us a deep understanding of natural materials, sourcing and quality." },
      { key: "story_2", label: "Our story — Growth", type: "longtext", default: "We expanded into face veneer and pomegranate farming on our own land in Gujarat." },
      { key: "story_3", label: "Our story — Today", type: "longtext", default: "The next generation is building an export business in bagasse tableware with trusted Indian manufacturing partners." },
      { key: "story_4", label: "Our story — Our approach", type: "longtext", default: "Source carefully, understand the product, work with the right partners and build long-term relationships." },
    ],
  },
  {
    id: "produce",
    label: "Pomegranate page",
    fields: [
      { key: "intro", label: "Intro text", type: "longtext", default: "Our orchards in Khirsara, Gujarat, supported by a small circle of partner growers, supply fruit that is graded, packed and fully documented for export." },
      { key: "video", label: "Farm video", type: "video", default: "/farm.mp4" },
      { key: "g1", label: "Gallery photo 1", type: "image", default: "/farm/g1.jpg" },
      { key: "g2", label: "Gallery photo 2", type: "image", default: "/farm/g2.jpg" },
      { key: "g3", label: "Gallery photo 3", type: "image", default: "/farm/g3.jpg" },
      { key: "g4", label: "Gallery photo 4", type: "image", default: "/farm/g4.jpg" },
      { key: "g5", label: "Gallery photo 5", type: "image", default: "/farm/g5.jpg" },
    ],
  },
  {
    id: "tableware",
    label: "Tableware page",
    fields: [
      { key: "intro", label: "Intro text", type: "longtext", default: "Sugarcane Bagasse | Export Ready | B2B Supply — 23 core compostable plates, meal trays, clamshells and bowls. More products and custom branding arranged on request." },
      { key: "beyond_text", label: "\"Need something else?\" text", type: "longtext", default: "Cups, lids, cutlery, dona, custom sizes or printed branding — if it can be moulded from bagasse, we can arrange it for you." },
    ],
  },
];

export function defaultFor(page: PageId, key: string): string {
  if (key.endsWith("__size")) return "100";
  if (key.endsWith("__fit")) return "cover";
  return PAGES.find((p) => p.id === page)?.fields.find((f) => f.key === key)?.default ?? "";
}

/** Size (percent) and fit chosen in the admin for a photo/video field. */
export function mediaStyle(c: (k: string) => string, key: string, baseHeight: number): React.CSSProperties {
  const pct = Number(c(`${key}__size`)) || 100;
  return { height: Math.round((baseHeight * pct) / 100), objectFit: c(`${key}__fit`) === "contain" ? "contain" : "cover" };
}
