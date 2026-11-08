# Competitor Analysis — Triana Café & Restaurant (triana.ma)

> **Scope:** a full scan of [triana.ma](https://triana.ma/), the main competing restaurant website in Chefchaouen, and a plan for making the Bacha Rouge website clearly better.
> **Scanned:** 7 November 2026 · homepage, all main inner pages, sitemap, robots.txt, structured data, and load measurements.
> **Note:** Sections 1–7 describe what was observed on Triana's site. Sections 8–9 are recommendations for Bacha Rouge.

---

## 1. Executive summary

Triana's website is **search-engine first**. It is a tri-lingual (EN/FR/ES) Next.js site with 94 indexed URLs, a 17-post blog, keyword landing pages ("best restaurant", "rooftop restaurant", "restaurant with alcohol") and very complete structured data. It is built to rank on Google and in AI answers for nearly any "where to eat in Chefchaouen" search.

Visually, though, it is **conventional**: a cream and olive "premium template" look, card grids, a dark logo-only hero, a very long homepage that repeats its inner pages, and almost no motion or storytelling.

**Bacha Rouge's opportunity:** keep the far stronger visual identity we already have (the "red room in the blue city", cinematic GSAP scroll scenes, the tagine ritual) and close the **content and SEO gap** that currently makes Triana the default answer on Google.

### Top 5 moves to win

1. **Make the basics real before launch.** That means a priced menu, a working reservation flow that confirms by WhatsApp or email, and the real address, hours, phone and Instagram.
2. **Ship structured data and metadata from day one:** `Restaurant` with `ReserveAction`, `FAQPage`, Open Graph images, a sitemap and robots.txt.
3. **Launch in FR and ES (plus Arabic)**, with hreflang. Triana already covers three languages, and our audience is international.
4. **Split the one-page site into focused pages** (Menu, Reservation, Gallery, Story, FAQ, Contact) while keeping the homepage as the cinematic showpiece.
5. **Own search niches Triana doesn't**, such as "romantic dinner", "Moroccan tagine", "theatrical / design restaurant Chefchaouen" and "red restaurant Chefchaouen". Use a small journal plus an FAQ to do it.

---

## 2. How the site is built (tech stack)

| Area | What Triana uses | Evidence |
|---|---|---|
| Framework | **Next.js – Pages Router**, statically generated | `/_next/static/chunks/pages/index-*.js`, `_buildManifest.js`, `_ssgManifest.js` |
| Styling | **Tailwind CSS** with custom colour tokens | classes like `bg-triana-cream`, `bg-triana-olive`, `bg-triana-ink`, `text-triana-charcoal`, `bg-arabesque` |
| Fonts | **Fraunces** (serif headings), **Inter** (body), **WindSong** (script accents), self-hosted via `next/font` | `document.fonts` |
| Images | Responsive **AVIF / WebP** sets, lazy-loaded below the fold | e.g. `/webp/assaoud-hero-2026-1280w.avif` |
| Analytics | **Google Tag Manager + gtag** | `googletagmanager.com/gtm.js` |
| Map | Embedded **Google Maps iframe** | `google.com/maps?...&output=embed` |
| PWA hints | `theme-color`, Apple web-app meta tags | `<meta name="apple-mobile-web-app-capable">` |
| Builder | External freelance developer (credit link in footer) | footer link |

### Measured load (homepage, desktop, in-app browser)

| Metric | Value |
|---|---|
| HTML | ~15 KB |
| JavaScript | ~147 KB across 13 files |
| CSS | 1 file, ~5 KB transferred |
| Initial transfer | ~540 KB (fonts and images are lazy or preloaded) |
| DOMContentLoaded | ~1.3 s |
| Full load | ~2.6 s |
| Images on homepage | 17 (only 3 load at first; the rest are lazy) |

**Takeaway:** technically solid, light and fast. Their engineering is not their weakness, so we have to match it, especially on page weight.

---

## 3. Site map — pages and languages

The sitemap lists **94 URLs** in **3 languages** (English at `/`, French at `/fr/`, Spanish at `/es/`). Every page carries hreflang alternates. There are also separate **image** and **video** sitemaps.

| Page | URL | Purpose |
|---|---|---|
| Home | `/` | Long one-page overview (see §4) |
| Menu | `/menu/` | Full priced menu with category tabs |
| Drinks | `/drinks/` | Cocktails, wine, spirits, mocktails |
| Reservation | `/reservation/` | Table request form |
| Events | `/events/` | Live music, concerts, New Year's Eve |
| About / Our Story | `/about/` | Brand story ("Two Shores"), team |
| Gallery | `/gallery/` | ~96 photos |
| Reviews | `/review/` (`/fr/avis/`, `/es/resenas/`) | Curated Google / TripAdvisor quotes |
| FAQ | `/faq/` | 12 questions, many about alcohol and views |
| Contact | `/contact/` | Address, phone/WhatsApp, email, hours |
| Blog ("Triana Journal") | `/blog/` + 17 posts | SEO content and guides |
| **SEO landing pages** | `/best-restaurant-chefchaouen/`, `/rooftop-restaurant-chefchaouen/`, `/restaurant-with-alcohol-chefchaouen/`, `/wine-cocktails-chefchaouen/` | Pages built purely to rank for those keywords |
| Brochure | `/triana-restaurant-brochure-en.pdf` | Downloadable PDF |

### Blog topics (17 posts)

- **Press and social proof:** FIFA President visit; *The Amazing Race Australia* filmed there.
- **City guides:** best things to do in Chefchaouen, at night; best rooftop restaurants (a "2026 guide" ranking themselves #1).
- **Food and culture:** Moroccan-Andalusian paella; spices; Andalusian music; the blue city's kitchen.
- **Selling pages written as articles:** romantic sunset dinner, cocktails and wine, live music, flamenco nights, New Year's Eve, private events, "why Triana", "Top #1 restaurant".

Most posts exist in all 3 languages.

---

## 4. Homepage — sections in order

| # | Section | Content |
|---|---|---|
| 0 | **Header** (fixed) | Hamburger menu (also on desktop), "Book now", EN/FR/ES switch, Instagram icon |
| 1 | **Hero** | Logo on a dark photo; tagline "Rooftop terrace · Wine & cocktails · Live music"; live **"Open now · 08:00–22:30"** badge; *Make a Reservation* and *View Menu* buttons; link to the dining-guide blog post |
| 2 | **Our Story** | "A Bridge Between Cultures": the Seville-Triana / Andalusia-Morocco "Two Shores" concept; a rooftop-sunset block; brochure and FAQ links; team block (mentions a FIFA president visit); values (Mediterranean roots, rooftop conviviality, live atmosphere); a photo collage |
| 3 | **The Experience** | "Luxury rooftop dining in Chefchaouen" with a **6-card feature grid**: rooftop view, sunset, wine & cocktails, Mediterranean + Moroccan, live music, tourist-friendly |
| 4 | **Menu teaser** | Intro copy plus **5 category cards** (Starters, Pizza, Mediterranean, Cocktails, Desserts) linking to the menu |
| 5 | **Photo bands** | Olive and cream image strips (lazy-loaded) |
| 6 | **Journal teaser** | "Explore the Triana Journal" with a link to the blog |
| 7 | **Reviews** | Auto-scrolling carousel of ~8 Google / TripAdvisor quotes, duplicated for the loop; links to Google, TripAdvisor, Instagram, TikTok |
| 8 | **FAQ** | 4 questions (rooftop? alcohol? live music? near Ras El Maa?) with a link to the full FAQ |
| 9 | **Location** | Address, hours, phone and WhatsApp, Reserve button, Waze directions, Google Maps embed |
| 10 | **Footer** | Navigation, contact, socials, developer credit |

---

## 5. Key inner pages

### Menu (`/menu/`)
- **12 category tabs:** Breakfast, Cold starters, Hot starters, Fish, Meat, Vegetarian, Pasta, Pizzas, Burgers, Moroccan, Desserts, Drinks.
- **Real prices in dirhams** (breakfast set menus from 28 to 45 dhs, à la carte from 9 dhs), with short descriptions and tags (Local, Healthy, Vegetarian, New, Premium).
- A kitchen story block: a 200 m² kitchen, a Josper wood-fired grill, RATIONAL ovens, and a "From sea to table" paella section. This turns the menu into a credibility page.

### Reservation (`/reservation/`)
- Form fields: **name, phone, email, date picker, time** (30-minute slots), **guests, seating area** (rooftop or inside), **special requests** (allergies, occasion).
- Submitted by JavaScript to their own API. Copy says "reserve 24 hours in advance; sunset tables fill fast". It is a **request**, not an instant confirmation.

### Events (`/events/`)
- A resident flamenco guitarist, nightly live music, a featured concert (a Moroccan rock band), New Year's Eve, and explainers on Andalusian music styles.
- Each event is marked up as `MusicEvent` structured data, so it can appear in Google event results.

### FAQ (`/faq/`)
- 12 questions with `FAQPage` schema. Several target **alcohol searches** ("Where can I drink alcohol in Chefchaouen?", "Is alcohol legal for tourists?"), a clear niche in a city where few venues serve it.

### Gallery, Reviews, Contact
- **Gallery:** about 96 photos with descriptive alt text, under one heading.
- **Reviews:** about 18 curated quotes in EN/FR/ES. These are static quotes, not a live rating feed.
- **Contact:** address, phone/WhatsApp, email and hours. No contact form.

---

## 6. SEO and marketing strengths (what they do well)

1. **Structured data everywhere.** Types found: `Restaurant`, `WebSite` with `ReserveAction`, `WebPage`, `Organization`, `BreadcrumbList`, `FAQPage`, `MusicEvent`, `CollectionPage`, `Article`.
2. **Local SEO signals:** geo meta tags (coordinates, region, place name), full address, hours, and Google Maps, Waze and TripAdvisor links.
3. **Social sharing:** complete Open Graph and Twitter cards with a dedicated OG image and alt text.
4. **Keyword-targeted titles,** e.g. "Best Rooftop Restaurant in Chefchaouen", "Restaurant with alcohol Chefchaouen".
5. **Keyword landing pages and a blog** cover almost every tourist search intent.
6. **AI-crawler friendly:** robots.txt explicitly allows Google-Extended and Applebot-Extended, so they show up in AI answers.
7. **Three languages with hreflang,** matching the tourist mix (English, French, Spanish).
8. **Social proof:** reviews, celebrity visits, a TV show, and links to TripAdvisor, Instagram and TikTok.
9. **Conversion shortcuts:** "Book now" always visible, WhatsApp click-to-chat, Waze directions, and an "Open now" badge.

---

## 7. Weaknesses and gaps (where we can beat them)

| Weakness | Why it matters |
|---|---|
| **Generic visual identity:** cream + olive, card grids, arabesque background | Looks like many hotel and restaurant templates and has no memorable "wow" |
| **Weak hero:** dark photo, logo only, no strong image or motion | The first 3 seconds don't sell the experience |
| **Very long homepage that repeats inner pages** (story, menu, reviews, FAQ, location all appear twice across the site) | Dilutes the message and makes visitors scroll a lot |
| **Hamburger menu even on desktop** | Hides the navigation; extra clicks to reach Menu or Reservation |
| **Self-awarded claims** ("Top #1", "Best restaurant") and keyword-stuffed copy | Feels like advertising and lowers trust with discerning travellers |
| **Little motion or storytelling** | A static, brochure-like experience |
| **Lazy images flash blank on fast scroll** | Looks unfinished on quick scrolls |
| **Copy errors and inconsistent capitalisation** (e.g. "morocco Blue Pearl", "triana menu") | Small, but hurts a "luxury" positioning |
| **Reviews are hand-picked quotes,** with no live Google star rating | Less credible than a live rating and count |
| **Reservation is a request only,** with no instant confirmation or availability | Friction; guests may book elsewhere while waiting |
| **Positioning is broad** (breakfast to cocktails, pizza to tagine) | No single sharp identity, so there is room for a more focused concept |

---

## 8. Bacha Rouge today vs Triana

| Area | Bacha Rouge (current) | Triana |
|---|---|---|
| Visual identity and motion | ✅ **Much stronger:** distinctive red / ivory / gold palette, cinematic GSAP scroll scenes, arches, frames, tagine reveal | ⚠️ Conventional template |
| Stack | Next.js 16 **App Router**, Tailwind v4, GSAP | Next.js Pages Router, Tailwind |
| Languages | 1 (EN) | 3 (EN / FR / ES) |
| Pages | 1 one-page site | 15+ pages, 94 URLs |
| Menu | ❌ Placeholder dishes and prices | ✅ Full, priced, tagged |
| Reservation | ⚠️ Form UI only; no backend (shows "Merci" locally) | ✅ Request form with API |
| Contact details | ❌ Placeholders (address, hours, phone, email, Instagram) | ✅ Complete, plus WhatsApp and Waze |
| Structured data / SEO metadata | ❌ Title and description only | ✅ Extensive |
| Sitemap / robots | ❌ None | ✅ Full, plus image and video sitemaps |
| Reviews / FAQ / Events / Blog | ❌ None | ✅ All |
| Image weight | ⚠️ Two ~2.5 MB PNG textures served as CSS backgrounds | ✅ AVIF/WebP |
| Accessibility | ✅ Reduced-motion fallback already built in | Basic |

---

## 9. How to beat them — prioritised roadmap

### P0 — before launch (must-have)
1. **Real menu** with dish names, descriptions and prices in MAD, plus dietary tags (vegetarian, gluten-free, spicy). Keep our elegant "La Carte" design.
2. **A working reservation flow.** Send each request to the restaurant by WhatsApp and email, show the guest a clear confirmation, and use time slots that match real opening hours. Add a "Reserve on WhatsApp" alternative.
3. **Real contact block:** address, hours, phone, WhatsApp, email, Instagram, and Google Maps / Waze directions.
4. **SEO foundations in Next.js:**
   - per-page `metadata` (title, description, Open Graph, Twitter);
   - `opengraph-image` for each page;
   - `app/sitemap.ts` and `app/robots.ts`;
   - JSON-LD `Restaurant` (address, geo, hours, cuisine, price range, menu URL) and `WebSite` + `ReserveAction`.
5. **Performance:** convert `plaster.png` and `herringbone.png` (~2.5 MB each) to AVIF/WebP. Keep the GSAP experience smooth on mid-range phones.
6. **A Google Business Profile** that is claimed and linked. This is the biggest local-SEO lever of all.

### P1 — shortly after launch
1. **FR + ES (and Arabic) versions** with hreflang, using App Router i18n routing (`/fr`, `/es`, `/ar`).
2. **Dedicated pages:** `/menu`, `/reservation`, `/gallery`, `/notre-histoire` (story), `/faq`, `/contact`. The homepage stays a focused cinematic tour with clear links into each page, not a repeat of everything.
3. **Visible desktop navigation.** Don't hide it behind a hamburger. We already have this, so keep it.
4. **Reviews done better:** show the **live Google rating and review count**, plus 3–5 strong quotes. Avoid self-awarded "#1" claims.
5. **An FAQ with `FAQPage` schema** answering real tourist questions: dress code, alcohol policy, vegetarian options, kids, price range, how to find us in the medina, card payment.
6. **An "Open now / closes at" badge** and a sticky "Reserve" button on mobile.

### P2 — growth
1. **Journal (blog)** targeting searches Triana doesn't own: "romantic dinner in Chefchaouen", "best tagine in Chefchaouen", "unique / design restaurant Chefchaouen", "the story of our red room", "Moroccan dining etiquette". Aim for quality over quantity; 4–6 excellent bilingual posts beat 17 thin ones.
2. **Private dining and groups page** (birthdays, weddings, tour groups), with an enquiry form.
3. **Events page** if Bacha Rouge has music or special evenings, with `Event` schema.
4. **Downloadable PDF menu** and a QR menu for in-house use.
5. **Instagram feed or reel strip** to keep the site feeling alive.

### Differentiate — don't copy
- **Lean into what Triana can't copy:** the concept ("a red room in the blue city"), the interior (velvet, brass, plaster, masks), the tagine ritual, and the theatrical scroll experience. Triana's identity is "rooftop + sunset + Andalusia"; ours is "**immersive interior + ceremony + Moroccan cuisine**".
- **Keep the homepage a story, not a directory.** One strong narrative, with detail on inner pages.
- **Copy quality = luxury signal.** Write carefully edited, bilingual copy with no keyword stuffing and no typos.
- **Hold a performance budget:** a fast first paint, light images, and motion that never blocks reading. The reduced-motion support is already in place.

---

## 10. Appendix

### A. Triana URLs (English versions; FR/ES mirror them)
- **Core:** `/`, `/menu/`, `/drinks/`, `/reservation/`, `/events/`, `/about/`, `/gallery/`, `/review/`, `/faq/`, `/contact/`, `/blog/`
- **SEO landings:** `/best-restaurant-chefchaouen/`, `/rooftop-restaurant-chefchaouen/`, `/restaurant-with-alcohol-chefchaouen/`, `/wine-cocktails-chefchaouen/`
- **Blog posts:** `fifa-president-gianni-infantino-chefchaouen`, `amazing-race-australia-triana-chefchaouen`, `why-triana-chefchaouen`, `best-rooftop-restaurants-chefchaouen`, `paella-moroccan-andalusian`, `spices-atlantic-andalusia`, `chefchaouen-blue-city-kitchen`, `top-restaurant-chefchaouen`, `things-to-do-chefchaouen`, `live-music-chefchaouen`, `cocktails-wine-chefchaouen`, `flamenco-nights-triana`, `new-years-eve-chefchaouen`, `private-events-triana`, `things-to-do-chefchaouen-at-night`, `andalusian-music-morocco-spain`, `romantic-dinner-chefchaouen-sunset`

### B. Structured-data types found
`WebSite` (+ `ReserveAction`), `Organization`, `WebPage`, `Restaurant`, `BreadcrumbList`, `FAQPage`, `MusicEvent`, `CollectionPage`, `Article`

### C. Other technical notes
- robots.txt allows all crawlers, blocks `/api/` and `/admin/`, and lists 5 sitemaps (EN, FR, ES, images, videos).
- Meta tags include geo tags (`geo.position`, `ICBM`), `og:type=restaurant` and `theme-color #4F5E3A` (olive).
- Advertised hours: daily 08:00–22:30. Location: near Ras El Maa waterfall.
