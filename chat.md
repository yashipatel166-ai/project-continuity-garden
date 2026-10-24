# chat.md — Central Project Memory

_Last updated: 2026-10-24_

## How to use this file
- Read this file and all referenced project files before any task.
- Update it whenever new files, instructions, or significant changes arrive.
- Never record assumptions as confirmed facts. Preserve history when requirements change.

## 1. Project purpose & overview
- Website for **AAVYA GLOBEX**, an India-based import–export company (face veneer from Indonesia, pomegranates from own farms in Khirsara, Gujarat, sugarcane bagasse tableware).
- Goal (from `message1040.txt`): replicate the user's Emergent AI preview site **exactly**, then make changes on top of it.
- Reference site: https://globex-harvest.preview.emergentagent.com/

## 2. What has been built
- **Home `/`**: hero (port photo, EST. 2026 badge), About, Our Story, Three divisions cards, Our origins, farm video + agricultural story, Documentation (3 certificate PDFs), Request-a-quote form.
- **`/produce`**: hero + facts, farm video, 5-photo gallery, CTA.
- **`/tableware`**: 23-product catalogue with filters (All / Plates / Meal Trays / Clamshells / Bowls), "Full specs" toggle, Request quote, "Need something else?" card, CTA.
- Shared header (with Our businesses dropdown, mobile menu) and footer.
- Design copied from reference: ivory background, forest green, warm gold; fonts Playfair Display / Source Sans 3 (body, larger size) / DM Mono.
- All reference photos, farm video, logo, favicon and certificate PDFs copied into `public/` (same paths as reference).
- "Request quote" buttons pre-fill the form's division/product via `/?division=…&product=…#inquiry` (same as reference).

## 3. Requested changes
- 2026-10-24: Replicate reference site exactly — DONE (first version).
- 2026-10-24 (`instruction3741.txt`): Garjan Face Veneer added; Fresh Produce renamed Pomegranate; Bagasse Tableware added under Sustainable Tableware; Our Story moved to end of home page, shortened into 4 cards; Our Origins (Indonesia/India) removed; body font changed to Source Sans 3 and text enlarged; videos confirmed looping (`loop` attribute) — DONE.
- Admin panel (Google login, authorized Gmail only, edit text/images/videos per page) — PENDING: needs the list of allowed Gmail addresses and Lovable Cloud.

## 4. Errors / bugs
- User reported `src/pages/NotFound.tsx(12,20): TS2345 string | undefined`. That file **does not exist** in this project (this app has no `src/pages` folder), so it could not be fixed directly. While building, several similar "string | undefined" type errors appeared and were fixed. Project now typechecks with zero errors.

## 5. Task status
- Completed: chat.md created; site replicated (3 pages); type errors fixed.
- Pending / needs user input:
  - Form currently opens the visitor's email app (mailto to info@aavyaglobex.com). Saving inquiries to a database / sending email automatically needs Lovable Cloud — ask the user.
  - "Full specs" on the reference expands nothing visible; here it shows Material / Finish / Category / Custom branding. These extra lines were written by the AI and should be confirmed by the user.
  - Face Veneer has no own page on the reference ("Explore this business" jumps to the quote form with Face Veneer pre-selected) — kept identical.

## 6. Next steps
- Wait for user's requested changes on top of the replica.

## 7. Must NOT be changed / removed / implemented
- Never rewrite the whole project for small changes.
- Never remove existing functionality without explicit permission.
- No AI-generated images (from `message1040.txt`); use the reference's real photos, code, Tailwind, SVG / Lucide icons only.

## 8. Standing instructions from the user
- Read all provided files (any name/extension) before working; judge by content, not filename.
- Latest applicable instructions are the source of truth; ask when unclear or contradictory.
- Make only necessary changes; verify fixes; report honestly what remains.
- After each task, summarize: what changed, errors fixed, files modified, what remains, whether chat.md was updated.

## 9. Reference files
| File | Purpose |
|------|---------|
| `instruction3741.txt` (upload, 2026-10-24) | Content/font changes + admin panel request. |
| `message1040.txt` (upload, 2026-10-24) | Feature spec: replicate the Emergent preview site exactly; no AI images; full implementations. |

## 10. Key files
- `src/routes/index.tsx`, `src/routes/produce.tsx`, `src/routes/tableware.tsx`
- `src/components/site/` (Header, Footer, InquiryForm, Ui helpers)
- `src/lib/tableware.ts` (product data — edit prices/specs here)
- `src/styles.css` (colours, fonts)

## Update 2026-10-24 — Admin panel
- Admin panel at `/admin`: Google sign-in; only **yashipatel166@gmail.com** gets admin rights (automatic on first sign-in). Edits text, photos and videos per page (Header & footer, Home, Pomegranate, Tableware), with "Restore original".
- Uses Lovable Cloud (enabled). Workspace blocks public file buckets, so uploaded media get a 10-year link.
- To add another admin email: ask the AI (it's a database rule).

## Update 2026-10-24 — `query2680.txt`
- Error reported (`src/pages/NotFound.tsx` TS2694 useRef): file does not exist in this project; nothing to fix. Followed the file's instructions instead.
- Admin: every photo/video now has a size slider (40–180%) and "Fill the space / Show whole" option. New layout options: hero image left/right, farm video left/right.
- Logo text larger and bold (header + footer).
- About text rewritten; pomegranate texts reworded to avoid repeating "own farms and trusted growers" (wording written by the AI — user may confirm/replace in /admin).

## Update 2026-10-24 — `instruction5556.txt`
- Error reported (`src/lib/utils.ts` TS7006 useCallback): utils.ts has no such parameter; nothing to fix. Followed the file instead.
- Request: remove all Lovable branding/badge. Added `#lovable-badge { display:none !important; ... }` to src/styles.css. Badge on the published site is controlled by the project's "Hide Lovable badge" setting (needs a paid plan). Lovable sign-in code in /admin is functional (Google login), not branding — kept.

## Update 2026-10-24 — `hub_prompt8103.txt`
- Error reported (`src/App.tsx` TS2551 variant): file does not exist in this project; nothing to fix. Followed the file instead.
- Admin: every photo/video now has a "Shape (layout)" choice (original, 16:9, 9:16, 21:9 widescreen, 4:3, 3:4, 1:1) and manual crop (zoom 100–300%, move left/right, up/down) with a live preview. Saved with "Save size, shape & crop".

## Update 2026-10-24 — `context1524.txt` / `input1862.txt`
- Error reported (`src/lib/utils.ts` TS2532): utils.ts line 5 is a safe one-line `cn()` helper; nothing undefined there, nothing to fix. `input1862.txt` contained no request.
- Request: bigger body/information text. Small text sizes enlarged site-wide in src/styles.css (small text ~15px→~18px, extra-small ~13px→~15px).

## Update 2026-10-24 — `input3681.txt`
- Error reported (`src/pages/Index.tsx` TS2339 handleClose): file does not exist in this project; nothing to fix. Followed the file instead.
- Request: sitewide language button linked to Google Translate. Added globe + language dropdown (Google Translate widget) in the header on desktop and mobile; translates the whole site live. Google's top banner hidden.
