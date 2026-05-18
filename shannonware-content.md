---
# ─────────────────────────────────────────────────────────────────────────────
# SHANNONWARE.COM — SITE CONTENT
# ─────────────────────────────────────────────────────────────────────────────
# Target: scroll-animated single-page React site styled after shannonware.jsx
# Tokens: T.body (Special Elite), T.mono (Share Tech Mono), T.ink (#1a1208),
#         T.blue (#18385a, blueprint), T.amber (#7a5c0a, marginalia)
# Layout: 660px max-width centred column, paper background, slide-alerts fixed
#
# Each section below lists ordered content blocks. Component names match the
# jsx vocabulary: Appear, Typed, SH (section heading), InkPanel, Diagram,
# InkGraph, SlideAlert, Ticker. All `text` values are literal — pass straight
# into the matching component's `text` prop.
# ─────────────────────────────────────────────────────────────────────────────

institution_header:
  lines:
    - "Shannon Applied Computing"
    - "Division of Interface Research"
    - "Bantry · West Cork · Ireland"

title_block:
  title: "SHANNONWARE"
  separator: "* * * * * * * * * * * *"
  subtitle: "Interface Systems · Applied Computing · Hire Inquiries Open"

# SlideAlert components, fixed-position, slide in and out at specified delays.
# delay values are wall-clock ms from page load; tune to match scroll timing.
slide_alerts:
  - { side: "right", yPct: "22%", text: "▸ OPERATOR ONLINE",   sub: "Bantry station · channel open",      delay: 10200, accent: "blue"  }
  - { side: "left",  yPct: "48%", text: "⚠ STATUS · AVAILABLE", sub: "open to commission · IRL & remote",   delay: 14400, accent: "amber" }
  - { side: "right", yPct: "72%", text: "▸ SIGNAL CONFIRMED",  sub: "uplink stable · 12 ms",               delay: 18000, accent: "blue"  }
  - { side: "left",  yPct: "88%", text: "⚠ ANNOTATION",        sub: "日本語対応 · German A2 · EN native",   delay: 22000, accent: "amber" }

# Status ticker — scrolling line at the bottom of the page.
# Joined with "  · · · · ·  " between entries by the Ticker component.
ticker:
  - "SYSTEM NOMINAL · INTERFACE ACTIVE · BUILD 2.0.0 · UPTIME 00:14:22"
  - "SHANNON APPLIED COMPUTING · DIVISION OF INTERFACE RESEARCH · BANTRY CO. CORK"
  - "OPERATOR AVAILABLE FOR COMMISSION · IRELAND AND REMOTE · ALL CHANNELS OPEN"
  - "APPLICATION DESIGN · SOFTWARE ENGINEERING · SUPPORT ENGINEERING"

# Site-wide contact data (used by § 10 Channels)
contact:
  operator: "Shannon Douglas Ware"
  email:    "photius@shannonware.com"
  mobile:   "+353 83 441 0345"
  location: "Bantry, Co. Cork, Ireland"
  web:
    - { label: "shannonware.com",   url: "https://www.shannonware.com" }
    - { label: "terzotechnical.com", url: "https://www.terzotechnical.com" }
  channels:
    - { label: "github.com/spycebot",   url: "https://github.com/spycebot" }
    - { label: "linkedin · shannon-ware", url: "https://www.linkedin.com/in/shannon-ware-18a607288" }
    - { label: "bluesky · @bearwaker",  url: "https://bsky.app/profile/bearwaker.bsky.social" }
---

# Shannonware Site Content

The page is one continuous vertical document column (660 px max-width) over the yellowed-paper background defined in `shannonware.jsx`. Sections appear in order, each constructed from the components defined in that file. Every `text:` value below is the literal string to be passed to the matching `<Typed>` / `<InkPanel>` / `<SH>` / etc. component — copy verbatim.

Timings (`delay`, `speed`) are starting suggestions; tune against the actual scroll-trigger system once `IntersectionObserver` is wired in. If `IntersectionObserver` is used (recommended), reset each section's internal delay relative to its entry into the viewport rather than wall-clock from page load.

---

## § 1. The Analogue–Digital Synthesis

> Opens the page. Establishes the philosophical premise of the site and the operator's design language. Two prose paragraphs, then `FIG. 1` (Diagram).

### SH
```
n:     1
title: "The Analogue–Digital Synthesis"
delay: 4400
```

### Appear → Typed
```
delay: 5100
speed: 10
text:  "The Shannonware interface occupies the boundary between two historically separate domains: the printed page and the electronic display. Whereas these have until now remained distinct — one static, one animated — the synthesis pursued here treats them as two aspects of a single substrate."
```

### Appear → Typed
```
delay: 7300
speed: 12
text:  "The resulting artefact resembles a document from a divergent timeline — one in which computational circuits were printed on paper, dynamic interfaces moved across the page as living electric ink, and a working engineer maintained both."
```

### Appear → Diagram (FIG. 1)
```
caption_above: "FIG. 1 · LAYER ARCHITECTURE OF THE INTERFACE STACK"
caption_below: "（紙と回路の相互浸透 — paper and circuit, mutual permeation）"
caption_below_delay: 11400
```
*Use the existing `Diagram()` component unchanged. The five-box stack — OPERATOR → INTERFACE LAYER → CIRCUIT LAYER / PRINT LAYER → SYNTHESISED OUTPUT — is the philosophical mascot of the site and should remain.*

---

## § 2. Operator Profile

> The "about" section. Establishes who Shannon is, the verifiable facts, and the cross-disciplinary breadth. Three prose paragraphs followed by a marginal annotation block (amber border-left).

### SH
```
n:     2
title: "Operator Profile"
```

### Appear → Typed
```
speed: 11
text:  "Shannon Douglas Ware. Qualified software developer based in Bantry, West Cork. Operates Terzo Technical — a VAT-registered IT services and solutions practice serving SME clients across Munster — and accepts selective long-form engineering commissions in Ireland and remote."
```

### Appear → Typed
```
speed: 12
text:  "Over a decade and a half across IT service delivery, application support, and technical project management. Demonstrated record of reducing cost while improving production service quality. Maintains a Linux VPS cluster; designs, builds, deploys and operates cloud-native applications end to end."
```

### Appear → Typed
```
speed: 12
text:  "Dual Irish–American national. Native English; fluent Japanese (business correspondence, technical translation, proofreading). German A2. Distinctive cross-disciplinary background spanning enterprise systems, modern web stacks, and Japanese-language technical work — a profile especially well-suited to IDA-resident Japanese subsidiaries and bilingual Munster operations."
```

### Appear → Annotation block (amber `borderLeft: 2px solid T.amber`)
```
speed: 14
text:  "“I value your dependability in meeting deadlines. It is crucially important in retaining clients.” — Hugh Oechler, Senior In-house Project Manager, Linguistic Systems Inc., Cambridge MA.   «»   “You went over and beyond my expectations.” — Michel Côté, Siebel Test Lead, GlaxoSmithKline Canada."
```

---

## § 3. Operational Capabilities

> Three `InkPanel` components in a flex row (existing component, unchanged). Each panel = one of the three role objectives. Panel title in monospace small-caps, body text typed in.

### SH
```
n:     3
title: "Operational Capabilities"
```

### Appear → flex row of three `InkPanel`

#### Panel A
```
title:  "APPLICATION_DESIGNER"
accent: blue
text: |
  From requirement
  to interface.

  Service design,
  data flow,
  component decomposition.

  Oracle eBS, Flask,
  React, ITIL4-aligned.
```

#### Panel B
```
title:  "SOFTWARE_ENGINEER"
accent: blue
text: |
  Python 3.14, C# .NET,
  TypeScript, SQL.

  Linux VPS, Docker,
  Heroku, Azure, AWS.

  Build · deploy · operate.
  End to end.
```

#### Panel C
```
title:  "SUPPORT_ENGINEER"
accent: amber
text: |
  L2 / L3 production
  application support.

  Root cause work,
  service-delivery audits,
  high-pressure SLAs.

  Fujitsu / Primark:
  five years on the floor.
```

---

## § 4. Delivery Stack

> Second diagram. Where § 1's `FIG. 1` is philosophical, `FIG. 2` is Shannon's actual delivery stack — what he ships when commissioned. Use the same SVG vocabulary as `Diagram()` (rectangles, arrow markers, blueprint blue) but a different topology.

### SH
```
n:     4
title: "Delivery Stack"
```

### Appear → Diagram (FIG. 2)

```
caption_above: "FIG. 2 · DELIVERY STACK — FROM COMMISSION TO PRODUCTION"
caption_below: "(observation precedes optimisation)"
viewBox:       "0 0 400 215"
```

**Boxes** (top → bottom; same `Box` component, sequenced `i` values for fade-in):
```
i=0   x=140  y=6     w=120  h=22   label="CLIENT COMMISSION"        sub="brief · constraints · budget"
i=1   x=140  y=44    w=120  h=22   label="SERVICE DESIGN"           sub="ITIL4 · data flow · SLAs"
i=2   x=28   y=88    w=160  h=26   label="APPLICATION LAYER"        sub="Python · C# · TS · Flask · React"
i=3   x=212  y=88    w=160  h=26   label="INTEGRATION LAYER"        sub="REST · WebSockets · SQL · Oracle eBS"
i=4   x=80   y=140   w=240  h=26   label="INFRASTRUCTURE LAYER"     sub="Linux VPS · Heroku · Azure · AWS"
i=5   x=140  y=184   w=120  h=22   label="OPERATING SERVICE"        sub="monitored · documented · billed"
```

**Lines** (blueprint blue, same `Arr`/`Ln` vocabulary):
```
Arr  150→150  28→44     i=0   (commission → design)
Arr  150→100  66→88     i=1   (design → application)
Arr  150→292  66→88     i=1   (design → integration)
Arr  108→150  114→140   i=2   (application → infrastructure)
Arr  292→250  114→140   i=3   (integration → infrastructure)
Arr  200→200  166→184   i=4   (infrastructure → service)
```

---

## § 5. Current Field Activity

> Signal-monitor section. Two live `InkGraph` components followed by a short prose summary of current commissions. Graphs do not need to represent real data — they are atmospheric — but the labels should make it clear they stand in for *current activity*.

### SH
```
n:     5
title: "Current Field Activity"
```

### Appear → bordered container `border: 1px solid T.blue`

#### Container header (monospace, blueprint blue)
```
text: "REAL-TIME TELEMETRY · OPERATOR INTERFACE ACTIVITY"
```

#### Two `InkGraph` side-by-side
```
graph_1:
  label: "DEPLOYMENT ACTIVITY · COMMITS PER WEEK"
  w: 270
  h: 52

graph_2:
  label: "AVAILABLE CAPACITY · HOURS / WEEK"
  w: 270
  h: 52
```

### Appear → Typed (below graphs, inside the same container)
```
speed: 12
text:  "Currently shipping: terzo-audio (Python TTS utility with Google Cloud free-tier guard), goats-path-woolen-mills (Flask e-commerce for Irish wool, on Heroku), and nz-industry (Pandas exploratory analysis of Stats NZ enterprise data). Capacity exists for one additional medium-term commission."
```

---

## § 6. Technical Specification

> Pre-formatted technical-spec block in `T.mono` — the visual analogue of §4 in the jsx file (`Halblogarithmisch dual` etc.) but listing Shannon's actual stack. Followed by an amber margin-annotation block.

### SH
```
n:     6
title: "Technical Specification"
```

### Appear → Typed `<pre>` (monospace, `T.ink2`, lineHeight 1.75)

```
speed: 14
text: |
  LANGUAGES        Python 3.13/3.14  ·  C# .NET 6–8 (LINQ)
                   TypeScript / JavaScript ES6  ·  SQL
                   C / C++  ·  Bash  ·  Kotlin  ·  PHP

  WEB & CLOUD      Flask  ·  Heroku  ·  Azure (AZ-900, DP-900)
                   Google Cloud  ·  AWS  ·  React  ·  Angular
                   Docker  ·  WebSockets  ·  REST APIs

  DATA & AI        Pandas  ·  Matplotlib  ·  Tableau  ·  Power BI
                   PostgreSQL  ·  SQLite  ·  SQL Server 2022 / SSMS
                   Hugging Face  ·  OpenAI tooling  ·  TTS pipelines

  INFRASTRUCTURE   Ubuntu 24  ·  Rocky Linux 10  ·  CentOS  ·  Debian
                   Apache  ·  Git / GitHub / GitLab  ·  CI/CD  ·  DataDog

  MANAGEMENT       ITIL4 (HV)  ·  Agile / Scrum  ·  Kanban  ·  Jira
                   Excel  (FORECAST.LINEAR · AGGREGATE · XLOOKUP)
                   Visio  ·  PowerPoint  ·  MS Teams
```

### Appear → Annotation block (amber `borderLeft: 2px solid T.amber`)
```
speed: 14
text:  "Where existing systems suffice, the operator integrates. Where they do not, the operator builds. Cost reduction follows from accurate observation, not aggressive optimisation. The aesthetic of this site is the aesthetic of the work: legible, annotated, maintainable."
```

---

## § 7. Field Record

> Work history rendered as a duty-log / ship's-log of typed entries. Each entry: a left-aligned date range in `T.mono` and a right-aligned role/employer in `T.body`, with a one-line description typed below in `T.ink2`. Visually echoes a printed roster.

### SH
```
n:     7
title: "Field Record"
```

### Appear → list of log entries

Each entry is rendered as a small block (no border) containing:
1. A header row: date range (mono, blueprint blue) — tab — role + employer + location (Special Elite, ink).
2. A typed body line summarising the duty.

```
entries:
  - dates:    "2024.08 — PRESENT"
    role:     "Liferaft Service Technician"
    employer: "SNG · Castletownbere, Co. Cork"
    body:     "Liferaft service workload coordination, EPIRB/PLB programming, pyrotechnic compliance with An Garda Síochána and the Defence Forces, safety representative duties, AI-assisted business development."

  - dates:    "2024.06 — PRESENT"
    role:     "Principal"
    employer: "Terzo Technical · Bantry, Co. Cork"
    body:     "Founded VAT-registered IT services practice. Designs, builds and deploys Flask applications to Heroku for client lead generation; e-government account configuration; business continuity planning; Python back-end development under 3.13/3.14."

  - dates:    "2022.09 — 2024.05"
    role:     "Junior Service Architect"
    employer: "Fujitsu Ireland · Swords, Co. Dublin"
    body:     "Led investigation of in-flight Oracle eBS services to identify gaps and advocate improvements. Took accountability for service-design documentation. Project-managed DoD/DF Oracle eBusiness implementation: task estimation, allocation, daily progress reporting, liaison between production and senior management."

  - dates:    "2017.09 — 2022.09"
    role:     "Technical Services Specialist"
    employer: "Fujitsu Ireland · Swords, Co. Dublin"
    body:     "Onsite application support and service delivery for Primark in a fast-paced production environment. Built Python applications to manipulate system data, reducing service-downtime costs. L2/L3 help-desk: root cause investigation, service-delivery audits, monthly performance reporting. Validated disaster recovery; participated in data-centre fire drills."

  - dates:    "2015.11 — 2017.02"
    role:     "Customer Service & Business Data Technician"
    employer: "Moravia IT s.r.o. · Cork City"
    body:     "Large-scale validation of business and location data for Apple Maps against Google Maps, Bing, and Yandex. Articulated written justifications under continuously evolving evaluation criteria."

  - dates:    "2010 — 2015"
    role:     "Japanese > English Translation Contractor"
    employer: "Linguistic Systems · KJI · Transperfect · Gongwell · others"
    body:     "Translated technical and legal documents: mechanical patents, drug reaction case studies, automotive engineering, nuclear controller manuals. Implemented translation-accuracy process improvements; developed Python tooling to reduce cost in phonetic transcription."

  - dates:    "2008 — 2010"
    role:     "Siebel Test Contractor"
    employer: "GlaxoSmithKline Canada · Mississauga, Ontario"
    body:     "Manual and QTP automated test scripts against a bespoke Siebel implementation. Translated Japanese UAT scripts into English for regression testing. SME for creation, verification and execution of automated test scripts."

  - dates:    "2007 — 2008"
    role:     "Game Developer"
    employer: "Visual Sports Systems · Concord, Ontario"
    body:     "Led custom video-game project management and asset development; Mono .NET implementation for macOS; designed interactive 3D games and prototypes."

  - dates:    "2005 — 2006"
    role:     "Customer Service Professional"
    employer: "Connexion by Boeing · Toronto, Ontario"
    body:     "Level 1 Japanese-language technical support for in-flight wireless connectivity by phone, Sametime, and email."
```

### Appear → Typed (italic caption beneath the list)
```
speed: 24
text:  "(earlier roles — Rheem Manufacturing, Fort Smith AR, 1998–2001 — on request)"
```

---

## § 8. Personal Projects

> Five `InkPanel`-like project cards arranged in a flex grid. Each card has a monospace project name in the title bar, a one-line tagline, and a typed-in description. Where a repo exists, surface it.

### SH
```
n:     8
title: "Personal Projects"
```

### Appear → grid of project panels

```
projects:
  - title:    "TERZO_AUDIO"
    accent:   blue
    repo:     "github.com/spycebot/terzo-audio"
    tagline:  "Web-page → MP3, with cost-guard"
    text: |
      Text-to-speech utility:
      pages or pasted text
      to MP3 audio.

      Runs as CLI, importable
      Python module, or Flask
      service.

      Three-strategy URL
      extraction · Google
      Cloud free-tier guard.

  - title:    "GOATS_PATH"
    accent:   blue
    repo:     "github.com/spycebot/goats-path-woolen-mills"
    tagline:  "Flask e-commerce for Donegal Tweed"
    text: |
      Flask web application
      selling skeins and cakes
      of premium Donegal Tweed
      and Irish wools.

      Deployed to Heroku
      via Procfile / WSGI.

      Full-stack: HTML5/CSS/JS
      front, Python/Flask back.

  - title:    "NZ_INDUSTRY"
    accent:   blue
    repo:     "github.com/spycebot/nz-industry"
    tagline:  "Twelve-year industry trend analysis"
    text: |
      Exploratory data analysis
      of Stats NZ Annual
      Enterprise Survey (2024).

      Pandas + Matplotlib.

      Linear-regression slopes
      per industry, 2013–2024.
      Twenty largest industries
      plus all in contraction.

  - title:    "VENTRILOQUIST"
    accent:   amber
    repo:     "—"
    tagline:  "Real-time speech-to-text-to-speech"
    text: |
      Python application:
      real-time speech-to-text
      and text-to-speech.

      WebSockets for
      distributed blocking
      and non-blocking
      behaviour.

      Bantry, July 2024.

  - title:    "STAGEMASTER"
    accent:   amber
    repo:     "—"
    tagline:  "TTS AI voice synthesis"
    text: |
      Text-to-speech AI
      voice synthesis app:
      verbal sock puppets.

      Critical evaluation
      of TTS technology
      and UI blocking
      behaviour.

      Bantry, April 2024.
```

---

## § 9. Credentials

> Two-column block: education on the left, certifications on the right. Both rendered in `T.mono` for the date/code, `T.body` for the title. Typed in entry by entry.

### SH
```
n:     9
title: "Credentials"
```

### Appear → two-column flex row

#### Column A — Education (header in `T.mono`, blueprint blue, "EDUCATION")
```
entries:
  - date: "OCT 2025"
    line: "Software Developer — CENIT College, Naas, Kildare"
    note: "Future in Tech / Technology Ireland ICT Skillnet"
  - date: "2007"
    line: "Ontario College Graduate Certificate, Digital Design — Game Design"
    note: "George Brown College, Toronto"
  - date: "1996"
    line: "Bachelor of Arts, Japanese Language & Literature"
    note: "University of Massachusetts, Amherst"
  - date: "1991–92"
    line: "Monbushō Fellowship — Japanese Ministry of Education"
    note: "University of Hokkaido, Sapporo"
```

#### Column B — Certifications (header in `T.mono`, blueprint blue, "CERTIFICATIONS")
```
entries:
  - date: "SEP 2025"
    line: "Pearson IT Specialist — Python"
  - date: "JUN 2025"
    line: "Certiport IT Specialist — Software Development (C#, .NET, SQL)"
  - date: "MAY 2023"
    line: "ITIL4 High Velocity IT"
  - date: "OCT 2022"
    line: "ITIL4 Foundation"
  - date: "JUN 2022"
    line: "Microsoft Azure Data Fundamentals (DP-900)"
  - date: "MAR 2020"
    line: "Microsoft Azure Fundamentals (AZ-900)"
  - date: "2016–17"
    line: "Hardware Security · Software Security · Cryptography · Usable Security"
    note: "University of Maryland, College Park (Coursera)"
```

### Appear → Typed (italic caption beneath, full width)
```
speed: 22
text:  "Driving licence: Category B (Ireland). Nationality: dual Irish–American. VAT registered, VIES verified."
```

---

## § 10. Channels

> Final section before the `Ticker`. A monospace contact ledger — laid out like an old telex routing card — with one line per channel.

### SH
```
n:     10
title: "Channels"
```

### Appear → Typed `<pre>` (monospace, ink, lineHeight 1.7)

```
speed: 16
text: |
  OPERATOR     Shannon Douglas Ware
  STATION      Bantry, Co. Cork, Ireland
  VOICE        +353 83 441 0345
  MAIL         photius@shannonware.com

  WEB          shannonware.com
               terzotechnical.com

  CODE         github.com/spycebot
  PROFILE      linkedin · shannon-ware
  TRANSMIT     bluesky · @bearwaker
```

### Appear → Annotation block (amber `borderLeft: 2px solid T.amber`, full width)
```
speed: 14
text:  "Commissions accepted in Ireland and remote. Onsite within Munster preferred for service-design and support engagements; remote welcome for application work. Brief inquiries: a paragraph is enough. 日本語可."
```

---

## Closing — Ticker

The `Ticker` component renders unchanged at page foot, scrolling its messages from `ticker:` in the frontmatter.

---

## Notes for Claude Code

### Section delays and scroll triggering
The original `shannonware.jsx` uses hard-coded wall-clock `delay` values that count from page load. That works for the four-section teaser; it will *not* work for a ten-section site, because nobody reaches §10 in the 20–25 seconds the existing timing assumes. **Replace the wall-clock delays with `IntersectionObserver`-driven section entry.** Each section's first component fires `delay: 0` on entry; downstream components stagger off that. Keep the `delay` values shown above as *relative* offsets within each section.

### Component reuse
Every component named here exists in `shannonware.jsx`. The only new geometry is **FIG. 2** in § 4 (six boxes, six arrows); reuse `Box`, `Arr`, `Ln` and the existing SVG marker definition.

### Slide alerts
The four `slide_alerts` in frontmatter are intentionally fewer than would saturate a long page. They are designed to land at meaningful scroll positions (`yPct: 22%, 48%, 72%, 88%`) — recompute these if the page total height changes substantially.

### Typography and accessibility
`Special Elite` and `Share Tech Mono` ship from Google Fonts via the inline `@import` in the existing JSX. Keep that. Add `prefers-reduced-motion: reduce` overrides for the `Typed`, `Appear`, `InkPanel`, and `SlideAlert` components — when reduced motion is requested, render final state immediately (no typewriter, no grow-from-line, no slide-in). This is currently missing from the jsx.

### Source of truth
This file is the source of truth for **what the site says**. The jsx is the source of truth for **how it says it**. When the two disagree, this file wins for content and the jsx wins for behaviour.

— *prepared for Shannon Douglas Ware · Terzo Technical · Bantry, May 2026*
