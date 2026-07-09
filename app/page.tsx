'use client';

import { T, PAPER } from '@/components/tokens';
import { useInView } from '@/components/hooks';
import Appear from '@/components/Appear';
import Typed from '@/components/Typed';
import InkPanel from '@/components/InkPanel';
import Parallax from '@/components/Parallax';
import PinnedScrub from '@/components/PinnedScrub';
import BlockDiagram from '@/components/BlockDiagram';
import HamburgerMenu from '@/components/HamburgerMenu';
import GearMenu from '@/components/GearMenu';

// ── Grow-from-rule: one-shot reveal on entering view ─────────────────────────
function Grow({ children }: { children: (active: boolean) => React.ReactNode }) {
  const [ref, active] = useInView(0.3);
  return <div ref={ref}><Appear active={active}>{children(active)}</Appear></div>;
}

// ── Section furniture ─────────────────────────────────────────────────────────
function SectionLabel({ children, mb = 10 }: { children: React.ReactNode; mb?: number }) {
  return (
    <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 2, color: T.blue, marginBottom: mb }}>
      {children}
    </div>
  );
}

function BlueRule() {
  return <div style={{ height: 2, background: T.blue, marginBottom: 20 }} />;
}

function Marginalia({ children, mb = 20 }: { children: React.ReactNode; mb?: number }) {
  return (
    <div style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: 1, color: T.amber, marginBottom: mb }}>
      {children}
    </div>
  );
}

// ── § 2 capability panel — grows on its own scroll trigger ────────────────────
function CapabilityPanel({ title, text }: { title: string; text: string }) {
  const [ref, active] = useInView(0.3);
  // InkPanel renders nothing until active — reserve height so the observer has
  // an intersectable box and the page doesn't jump when the panel grows in.
  const lines = text.split('\n').length;
  return (
    <div ref={ref} style={{ display: 'flex', minHeight: 30 + lines * 20 }}>
      <InkPanel title={title} text={text} active={active} accent={T.blue} />
    </div>
  );
}

// ── § 3 duty-log row ──────────────────────────────────────────────────────────
function DutyRow({ line, body }: { line: string; body: string }) {
  return (
    <div>
      <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 1, color: T.blue }}>{line}</div>
      <p style={{ fontFamily: T.body, fontSize: 11, color: T.ink2, lineHeight: 1.7, margin: '8px 0 0' }}>
        {body}
      </p>
    </div>
  );
}

// ── § 4 telex cell ────────────────────────────────────────────────────────────
function TelexCell({ label, mono, right, bottom, children }: {
  label: string; mono?: boolean; right?: boolean; bottom?: boolean; children: React.ReactNode;
}) {
  return (
    <div style={{
      padding: '12px 14px',
      borderRight: right ? `1px solid rgba(24,56,90,0.27)` : 'none',
      borderBottom: bottom ? `1px solid rgba(24,56,90,0.27)` : 'none',
    }}>
      <div style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: 2, color: T.fade }}>{label}</div>
      <div style={{
        fontFamily: mono ? T.mono : T.body,
        fontSize: mono ? 12 : 14,
        color: T.ink,
        marginTop: 5,
        overflowWrap: 'anywhere',
      }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    title: 'SERVICE_DELIVERY',
    text: 'Over a decade and a half across IT service delivery, application support, and technical project management.\n\nDemonstrated record of reducing cost while improving production service quality.\n\nL2/L3 production support · root cause work · high-pressure SLAs.',
  },
  {
    title: 'SYSTEMS_ARCHITECTURE',
    text: 'From requirement to interface: service design, data flow, component decomposition.\n\nDesigns, builds, deploys and operates cloud-native applications end to end.\n\nOracle eBS · Flask · React · Linux VPS · ITIL4-aligned.',
  },
  {
    title: 'OPTIMISATION',
    text: 'Cost reduction follows from accurate observation, not aggressive optimisation.\n\nPython tooling to manipulate system data and cut service-downtime costs.\n\nWhere existing systems suffice, integrate. Where they do not, build.',
  },
];

const FIELD_RECORD = [
  {
    line: '2024.08 — PRESENT · LIFERAFT SERVICE TECHNICIAN · SNG, CASTLETOWNBERE',
    body: 'Liferaft service workload coordination, EPIRB/PLB programming, pyrotechnic compliance with An Garda Síochána and the Defence Forces, safety representative duties, AI-assisted business development.',
  },
  {
    line: '2024.06 — PRESENT · PRINCIPAL · TERZO TECHNICAL, BANTRY',
    body: 'Founded VAT-registered IT services practice. Designs, builds and deploys Flask applications to Heroku for client lead generation; e-government account configuration; business continuity planning; Python back-end development under 3.13/3.14.',
  },
  {
    line: '2022.09 — 2024.05 · JUNIOR SERVICE ARCHITECT · FUJITSU IRELAND, SWORDS',
    body: 'Led investigation of in-flight Oracle eBS services to identify gaps and advocate improvements. Took accountability for service-design documentation. Project-managed DoD/DF Oracle eBusiness implementation: task estimation, allocation, daily progress reporting, liaison between production and senior management.',
  },
  {
    line: '2017.09 — 2022.09 · TECHNICAL SERVICES SPECIALIST · FUJITSU IRELAND, SWORDS',
    body: 'Onsite application support and service delivery for Primark in a fast-paced production environment. Built Python applications to manipulate system data, reducing service-downtime costs. L2/L3 help-desk: root cause investigation, service-delivery audits, monthly performance reporting. Validated disaster recovery; participated in data-centre fire drills.',
  },
  {
    line: '2015.11 — 2017.02 · BUSINESS DATA TECHNICIAN · MORAVIA IT, CORK CITY',
    body: 'Large-scale validation of business and location data for Apple Maps against Google Maps, Bing, and Yandex. Articulated written justifications under continuously evolving evaluation criteria.',
  },
  {
    line: '2010 — 2015 · JP→EN TRANSLATION CONTRACTOR · LINGUISTIC SYSTEMS ET AL.',
    body: 'Translated technical and legal documents: mechanical patents, drug reaction case studies, automotive engineering, nuclear controller manuals. Implemented translation-accuracy process improvements; developed Python tooling to reduce cost in phonetic transcription.',
  },
  {
    line: '2008 — 2010 · SIEBEL TEST CONTRACTOR · GLAXOSMITHKLINE CANADA',
    body: 'Manual and QTP automated test scripts against a bespoke Siebel implementation. Translated Japanese UAT scripts into English for regression testing. SME for creation, verification and execution of automated test scripts.',
  },
  {
    line: '2007 — 2008 · GAME DEVELOPER · VISUAL SPORTS SYSTEMS, CONCORD ON',
    body: 'Led custom video-game project management and asset development; Mono .NET implementation for macOS; designed interactive 3D games and prototypes.',
  },
  {
    line: '2005 — 2006 · CUSTOMER SERVICE PROFESSIONAL · CONNEXION BY BOEING, TORONTO',
    body: 'Level 1 Japanese-language technical support for in-flight wireless connectivity by phone, Sametime, and email.',
  },
];

const GRID_BG = [
  'repeating-linear-gradient(90deg, transparent 0 40px, rgba(24,56,90,0.10) 40px 41px)',
  'repeating-linear-gradient(0deg, transparent 0 40px, rgba(24,56,90,0.10) 40px 41px)',
].join(',');

// ── § 0 Premise — needs its own inView so the focal sentence types on reveal ──
function Premise() {
  const [ref, active] = useInView(0.3);
  return (
    <section style={{ padding: '70px 0' }}>
      <SectionLabel>§ 0 · PREMISE</SectionLabel>
      <BlueRule />
      <div ref={ref}>
        <Appear active={active}>
          <div style={{ fontFamily: T.body, fontSize: 25, lineHeight: 1.42, color: T.ink }}>
            <Typed active={active} delay={250} speed={26}
              text="Working circuits, printed on paper. Interfaces that move across the page as living ink." />
          </div>
          <div style={{ marginTop: 26 }}>
            <p style={{ fontFamily: T.body, fontSize: 13, color: T.ink, lineHeight: 1.82, margin: '0 0 14px' }}>
              The Shannonware interface occupies the boundary between two historically separate
              domains: the printed page and the electronic display. Whereas these have until now
              remained distinct — one static, one animated — the synthesis pursued here treats
              them as two aspects of a single substrate.
            </p>
            <p style={{ fontFamily: T.body, fontSize: 13, color: T.ink, lineHeight: 1.82, margin: 0 }}>
              The resulting artefact resembles a document from a divergent timeline — one in
              which computational circuits were printed on paper, dynamic interfaces moved across
              the page as living electric ink, and a working engineer maintained both.
            </p>
          </div>
        </Appear>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', ...PAPER }}>

      {/* Navigation chrome */}
      <HamburgerMenu />
      <GearMenu />

      {/* ── 1. Masthead — full viewport, paper/circuit parallax ─────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 28px',
        textAlign: 'center',
      }}>
        <Parallax factor={0.16} style={{ position: 'absolute', inset: '-140px -20px', zIndex: 0, backgroundImage: GRID_BG }} />
        <Parallax factor={0.16} style={{ position: 'absolute', left: '6%', top: '22%', width: 150, height: 1.5, background: 'rgba(24,56,90,0.5)', zIndex: 0 }} />
        <Parallax factor={0.16} style={{ position: 'absolute', right: '7%', top: '74%', width: 110, height: 1.5, background: 'rgba(24,56,90,0.5)', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 2, color: T.blue, marginBottom: 22 }}>
            PERSONAL PROMOTION SITE · REV 2026.07
          </div>
          <h1 style={{
            fontFamily: T.body,
            fontSize: 'clamp(30px, 9vw, 38px)',
            fontWeight: 'normal',
            letterSpacing: 7,
            color: T.ink,
            lineHeight: 1.05,
            margin: 0,
          }}>
            SHANNON<br />WARE
          </h1>
          <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: 3, color: T.fade, margin: '20px 0 6px' }}>
            * * * * * * * * *
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 2, color: T.ink2 }}>
            SOFTWARE ENGINEER · BANTRY · CO. CORK · IE
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 26,
          left: 0,
          right: 0,
          fontFamily: T.mono,
          fontSize: 9,
          letterSpacing: 2,
          color: T.blue,
          zIndex: 2,
          animation: 'blink 1.4s steps(1) infinite',
        }}>
          ▾ SCROLL
        </div>
      </section>

      {/* ── Reading column ──────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 660, margin: '0 auto', padding: '0 28px' }}>

        {/* ── 2. § 0 Premise — grows from its rule ──────────────────────────── */}
        <Premise />

        {/* ── 3. § 1 Synthesis — pinned, self-drawing schematic ─────────────── */}
        <PinnedScrub height="220vh">
          {(p) => (
            <div style={{
              padding: '44px 0 34px',
              height: 'calc(100vh - 68px)',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <SectionLabel mb={6}>§ 1 · SYNTHESIS</SectionLabel>
              <div style={{ fontFamily: T.body, fontSize: 20, color: T.ink, marginBottom: 4 }}>
                FIG. 1 — Paper, circuit, interface.
              </div>
              <Marginalia mb={16}>⚠ SCROLL ▸ SCHEMATIC DRAWS ITSELF, STEP BY STEP</Marginalia>
              <div style={{
                flex: 1,
                position: 'relative',
                border: `1px solid rgba(24,56,90,0.27)`,
                backgroundImage: 'radial-gradient(rgba(24,56,90,0.16) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 0,
              }}>
                <BlockDiagram progress={p} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
                <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: 1, color: T.blue, minWidth: 36 }}>
                  {String(Math.round(p * 100)).padStart(3, '0')}%
                </span>
                <div style={{ flex: 1, height: 2, background: 'rgba(24,56,90,0.18)' }}>
                  <div style={{ width: `${(p * 100).toFixed(0)}%`, height: '100%', background: T.blue }} />
                </div>
              </div>
            </div>
          )}
        </PinnedScrub>

        {/* ── 4. § 2 Capability — three panels, each grows in turn ──────────── */}
        <section style={{ padding: '60px 0' }}>
          <SectionLabel mb={6}>§ 2 · CAPABILITY</SectionLabel>
          <Marginalia>⚠ SCROLL ▸ ONE PANEL GROWS IN AT A TIME</Marginalia>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            {CAPABILITIES.map((c) => (
              <CapabilityPanel key={c.title} title={c.title} text={c.text} />
            ))}
          </div>
        </section>

        {/* ── 5. § 3 Field Record — duty-log, grows in ──────────────────────── */}
        <section style={{ padding: '60px 0' }}>
          <SectionLabel>§ 3 · FIELD RECORD</SectionLabel>
          <BlueRule />
          <Grow>
            {() => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                {FIELD_RECORD.map((r) => (
                  <DutyRow key={r.line} line={r.line} body={r.body} />
                ))}
                <p style={{ fontFamily: T.body, fontSize: 11, color: T.fade, fontStyle: 'italic', margin: 0 }}>
                  (earlier roles — Rheem Manufacturing, Fort Smith AR, 1998–2001 — on request)
                </p>
              </div>
            )}
          </Grow>
        </section>

        {/* ── 6. § 4 Telex — contact card + sign-off ────────────────────────── */}
        <section style={{ padding: '60px 0 80px' }}>
          <SectionLabel>§ 4 · TELEX</SectionLabel>
          <BlueRule />
          <Grow>
            {() => (
              <div style={{ border: `1px solid ${T.blue}` }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <TelexCell label="OPERATOR" right bottom>S. D. WARE</TelexCell>
                  <TelexCell label="STATION" bottom>BANTRY, IE</TelexCell>
                  <TelexCell label="VOICE" mono right>
                    <a href="tel:+353834410345" style={{ color: T.ink, textDecoration: 'none' }}>+353 83 441 0345</a>
                  </TelexCell>
                  <TelexCell label="MAIL" mono>
                    <a href="mailto:photius@shannonware.com" style={{ color: T.ink, textDecoration: 'none' }}>▸ photius@shannonware.com</a>
                  </TelexCell>
                </div>
              </div>
            )}
          </Grow>

          <div style={{ textAlign: 'center', marginTop: 36, fontFamily: T.body, fontSize: 16, letterSpacing: 5, color: T.ink }}>
            SHANNONWARE
          </div>
          <div style={{ textAlign: 'center', fontFamily: T.mono, fontSize: 8, letterSpacing: 2, color: T.fade, marginTop: 8 }}>
            SYSTEM NOMINAL · INTERFACE ACTIVE
          </div>

          {/* Footer links */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 18,
            flexWrap: 'wrap',
            padding: '26px 0 6px',
            borderTop: `1px solid rgba(26,18,8,0.16)`,
            marginTop: 44,
          }}>
            {[
              { label: 'IMPRESSUM', href: '/impressum' },
              { label: 'CONTACT',   href: '/contact'   },
              { label: 'TERMS',     href: '/terms'     },
              { label: 'PRIVACY',   href: '/privacy'   },
            ].map(({ label, href }) => (
              <a key={href} href={href}
                style={{ fontFamily: T.mono, fontSize: 9, color: T.fade, textDecoration: 'none', letterSpacing: 1 }}>
                {label}
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
