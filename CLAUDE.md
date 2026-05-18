# Project: Shannon Douglas Ware
## Type: Personal professional promotion site
## Tech Stack: Node-based approach Next.js, PostgreSQL
## Deployment: UVH VPS running Ubuntu 24.04 (requires upgrade)
## Coding Standards: Best pratcice
## Test Framework: Best practice
## Key constraints: Mobile-first

Repository: https://github.com/spycebot/commercial-shannonware.git
Production URL: https://shannonware.com
Working directory: /var/www/shannonware.com/commercial-shannonware
Content: shannonware-content.md

### Overall Description

This is a remake of the personal website for Shannon Douglas Ware. The site hosted from an Ubuntu 24 VPS hosted by OVH. The landing page for this site will begin as an online resume for Shannon was a software engineer. The visitor will then scroll down into blog posts. The site navigation will link to articles that will serve as technical references Shannon.

### Example look and feel

The divergent timeline detail. The block diagram draws its boxes and arrows one by one, and the technical spec from the Z4 manual appears verbatim — the German notation grounds the page in that specific early-computing aesthetic, then the English prose recontextualises it.

The fonts are Special Elite (typewriter body) and Share Tech Mono (data/HUD labels), with blueprint blue (#18385a) for all circuit-layer elements and annotation amber (#7a5c0a) for secondary notes — both dark enough to read as ink rather than as light.

Reference file: shannonware.jsx

### Look description

The look — CSS-only yellowed paper. The background is ten overlapping radial gradients on a warm cream base: four edge-vignettes (simulating oxidation at the margins), six randomly-placed "age spot" patches at irregular positions, plus a directional base gradient. No bitmap. The result is uneven yellowing that reads as old computer-manual paper rather than craft paper or parchment.

### Website Animation and Interaction (Feel) Description

The feel — living HUD on the page. Every section grows from a single horizontal line via a scaleY spring animation. Text types itself in at a speed calibrated to content (fast for data, slower for prose). Three floating alerts slide in from alternating sides at timed intervals, then depart the same way. The two graphs scroll continuously, with a dot-matrix grid background that evokes early printer output. The bottom ticker loops status messages across the footer.

### Site Structure

1. The landing page is scroll driven. The content under the first three or more headers in the content markdown file takes up one view, resembling a PowerPoint presentation. Scrolling down, new sections and text below dynamically come into view, resembling a living heads-up display.
2. The hamburger icon in the top left corner of the page reveals a slide-out list of *articles*.
3. The gear icon in the top right of the page reveals a panel for items like log in / log out, accessibility controls, Impressum (about), contact, terms, and privacy policy.
4. The site utilises Google Authentication () for user authentication. For the time being the authentication API is set to beta mode, so the only user will be me, Shannon.
5. Authenticated users have access to an edit page. Content edited on the edit page is written in markdown and saved to the database. Content written on the edit page will be designated as (1) and *article* or (2) a *story". Articles are listed on the articles panel. Stories are listed at the bottom of the landing page in reverse order (newest articles first, shown after the content from the content markdown file `Shannonware content: shannonware-content.md` .
6. At the very bottom of the landing page, there are links to pages listed in the gear icon panel: Impressum (about), contact, terms, and privacy policy 

### References

Scroll behaviour: https://www.nomic.ai/developer
Content markdown file: `Shannonware content: shannonware-content.md`  
Google Authentication implementation: https://github.com/spycebot/dopaminemenu
Look and feel: `shannonware.jsx`

### Technical environment

OVH hosted VPS running Ubuntu 24.04 (requires upgrade). As of the writing of this document node.js is not installed.

### Outcomes

The primary outcome of this site should be to demonstrate the technical ability of its creator. In the first instance, this is global, secure web hosting with little or no latency. In the second instance, Shannon is utilising leading edge tools such as Claude.ai and Claude Code to design and execute the site, which may be one of the most important hard skills in the present job market. Additionally, the site will be useful for Shannon himself, both as a repository for technical notes, and as a touchstone when accessing the internet from a new host.
