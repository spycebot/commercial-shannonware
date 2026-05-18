'use client';

import { T, PAPER } from '@/components/tokens';
import { useInView } from '@/components/hooks';
import Appear from '@/components/Appear';
import Typed from '@/components/Typed';
import SH from '@/components/SH';
import InkPanel from '@/components/InkPanel';
import Diagram from '@/components/Diagram';
import DeliveryDiagram from '@/components/DeliveryDiagram';
import InkGraph from '@/components/InkGraph';
import SlideAlert from '@/components/SlideAlert';
import Ticker from '@/components/Ticker';
import HamburgerMenu from '@/components/HamburgerMenu';
import GearMenu from '@/components/GearMenu';

// ── Section wrapper — fires once when scrolled into view ──────────────────────
function SectionBlock({ children }: { children: (active: boolean) => React.ReactNode }) {
  const [ref, active] = useInView(0.08);
  return <div ref={ref}>{children(active)}</div>;
}

// ── Amber annotation block ────────────────────────────────────────────────────
function Annotation({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: `2px solid ${T.amber}`, paddingLeft: 10, marginBottom: 18 }}>
      <p style={{ fontFamily: T.body, fontSize: 12, color: T.ink, lineHeight: 1.8, margin: 0 }}>
        {children}
      </p>
    </div>
  );
}

// ── Work-history log entry ────────────────────────────────────────────────────
function LogEntry({ dates, role, employer, body, active, delay }: {
  dates: string; role: string; employer: string; body: string; active: boolean; delay: number;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 3 }}>
        <span style={{ fontFamily: T.mono, fontSize: 9, color: T.blue }}>{dates}</span>
        <span style={{ fontFamily: T.body, fontSize: 12, color: T.ink }}>{role} · {employer}</span>
      </div>
      <p style={{ fontFamily: T.body, fontSize: 11, color: T.ink2, lineHeight: 1.7, margin: 0 }}>
        <Typed active={active} delay={delay} speed={18} text={body} />
      </p>
    </div>
  );
}

// ── Credentials entry ─────────────────────────────────────────────────────────
function CredEntry({ date, line, note }: { date: string; line: string; note?: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontFamily: T.mono, fontSize: 9, color: T.blue }}>{date}</div>
      <div style={{ fontFamily: T.body, fontSize: 11, color: T.ink, marginTop: 1 }}>{line}</div>
      {note && <div style={{ fontFamily: T.body, fontSize: 10, color: T.fade, marginTop: 1 }}>{note}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const TECH_SPEC = `LANGUAGES        Python 3.13/3.14  ·  C# .NET 6–8 (LINQ)
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
                 Visio  ·  PowerPoint  ·  MS Teams`;

  const CHANNELS = `OPERATOR     Shannon Douglas Ware
STATION      Bantry, Co. Cork, Ireland
VOICE        +353 83 441 0345
MAIL         photius@shannonware.com

WEB          shannonware.com
             terzotechnical.com

CODE         github.com/spycebot
PROFILE      linkedin · shannon-ware
TRANSMIT     bluesky · @bearwaker`;

  return (
    <div style={{ minHeight: '100vh', ...PAPER, padding: '0 28px 52px', display: 'flex', justifyContent: 'center' }}>

      {/* Navigation chrome */}
      <HamburgerMenu />
      <GearMenu />

      {/* Slide alerts — fixed viewport */}
      <SlideAlert side="right" yPct="22%" text="▸ OPERATOR ONLINE"    sub="Bantry station · channel open"       delay={10200} accent={T.blue}  />
      <SlideAlert side="left"  yPct="48%" text="⚠ STATUS · AVAILABLE" sub="open to commission · IRL & remote"  delay={14400} accent={T.amber} />
      <SlideAlert side="right" yPct="72%" text="▸ SIGNAL CONFIRMED"   sub="uplink stable · 12 ms"               delay={18000} accent={T.blue}  />
      <SlideAlert side="left"  yPct="88%" text="⚠ ANNOTATION"         sub="日本語対応 · German A2 · EN native"   delay={22000} accent={T.amber} />

      {/* Document column */}
      <div style={{ width: '100%', maxWidth: 660 }}>

        {/* ── Institution header (wall-clock — visible on load) ────────────── */}
        <Appear delay={300}>
          <div style={{
            textAlign: 'center',
            padding: '44px 0 18px',
            borderBottom: `1px solid ${T.ink}2a`,
            marginBottom: 24,
          }}>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.ink2, letterSpacing: 0.5 }}>
              <Typed text="Shannon Applied Computing" delay={500} speed={32} />
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.ink2, marginTop: 3 }}>
              <Typed text="Division of Interface Research" delay={1100} speed={32} />
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.ink2, marginTop: 3 }}>
              <Typed text="Bantry · West Cork · Ireland" delay={1650} speed={32} />
            </div>
          </div>
        </Appear>

        {/* ── Title block ──────────────────────────────────────────────────── */}
        <Appear delay={2100}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontFamily: T.body, fontSize: 22, color: T.ink, letterSpacing: 4, lineHeight: 1.1 }}>
              <Typed text="SHANNONWARE" delay={2300} speed={55} />
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 13, color: T.ink2, letterSpacing: 5, marginTop: 6 }}>
              <Typed text="* * * * * * * * * * * *" delay={3100} speed={44} />
            </div>
            <div style={{ fontFamily: T.body, fontSize: 12, color: T.fade, marginTop: 10, letterSpacing: 0.5 }}>
              <Typed text="Interface Systems · Applied Computing · Hire Inquiries Open" delay={3900} speed={26} />
            </div>
          </div>
        </Appear>

        <div style={{ borderTop: `1px solid ${T.ink}1e`, marginBottom: 6 }} />

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* § 1. The Analogue–Digital Synthesis                               */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionBlock>
          {(active) => (
            <>
              <SH n={1} title="The Analogue–Digital Synthesis" delay={0} active={active} />

              <Appear delay={200} active={active}>
                <p style={{ fontFamily: T.body, fontSize: 13, color: T.ink, lineHeight: 1.82, marginBottom: 14 }}>
                  <Typed
                    active={active} delay={500} speed={10}
                    text="The Shannonware interface occupies the boundary between two historically separate domains: the printed page and the electronic display. Whereas these have until now remained distinct — one static, one animated — the synthesis pursued here treats them as two aspects of a single substrate."
                  />
                </p>
              </Appear>

              <Appear delay={2000} active={active}>
                <p style={{ fontFamily: T.body, fontSize: 13, color: T.ink, lineHeight: 1.82, marginBottom: 18 }}>
                  <Typed
                    active={active} delay={2200} speed={12}
                    text="The resulting artefact resembles a document from a divergent timeline — one in which computational circuits were printed on paper, dynamic interfaces moved across the page as living electric ink, and a working engineer maintained both."
                  />
                </p>
              </Appear>

              <Appear delay={3800} active={active}>
                <div style={{ marginBottom: 22, paddingLeft: 6 }}>
                  <div style={{ fontFamily: T.mono, fontSize: 8, color: T.blue, letterSpacing: 2, marginBottom: 7, opacity: 0.85 }}>
                    FIG. 1 · LAYER ARCHITECTURE OF THE INTERFACE STACK
                  </div>
                  <Diagram active={active} />
                  <div style={{ fontFamily: T.body, fontSize: 10, color: T.fade, marginTop: 5, fontStyle: 'italic' }}>
                    <Typed active={active} delay={6400} speed={30}
                      text="（紙と回路の相互浸透 — paper and circuit, mutual permeation）" />
                  </div>
                </div>
              </Appear>
            </>
          )}
        </SectionBlock>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* § 2. Operator Profile                                             */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionBlock>
          {(active) => (
            <>
              <SH n={2} title="Operator Profile" delay={0} active={active} />

              <Appear delay={200} active={active}>
                <p style={{ fontFamily: T.body, fontSize: 13, color: T.ink, lineHeight: 1.82, marginBottom: 14 }}>
                  <Typed active={active} delay={500} speed={11}
                    text="Shannon Douglas Ware. Qualified software developer based in Bantry, West Cork. Operates Terzo Technical — a VAT-registered IT services and solutions practice serving SME clients across Munster — and accepts selective long-form engineering commissions in Ireland and remote." />
                </p>
              </Appear>

              <Appear delay={1400} active={active}>
                <p style={{ fontFamily: T.body, fontSize: 13, color: T.ink, lineHeight: 1.82, marginBottom: 14 }}>
                  <Typed active={active} delay={1600} speed={12}
                    text="Over a decade and a half across IT service delivery, application support, and technical project management. Demonstrated record of reducing cost while improving production service quality. Maintains a Linux VPS cluster; designs, builds, deploys and operates cloud-native applications end to end." />
                </p>
              </Appear>

              <Appear delay={2800} active={active}>
                <p style={{ fontFamily: T.body, fontSize: 13, color: T.ink, lineHeight: 1.82, marginBottom: 18 }}>
                  <Typed active={active} delay={3000} speed={12}
                    text="Dual Irish–American national. Native English; fluent Japanese (business correspondence, technical translation, proofreading). German A2. Distinctive cross-disciplinary background spanning enterprise systems, modern web stacks, and Japanese-language technical work — a profile especially well-suited to IDA-resident Japanese subsidiaries and bilingual Munster operations." />
                </p>
              </Appear>

              <Appear delay={4600} active={active}>
                <Annotation>
                  <Typed active={active} delay={4800} speed={14}
                    text='"I value your dependability in meeting deadlines. It is crucially important in retaining clients." — Hugh Oechler, Senior In-house Project Manager, Linguistic Systems Inc., Cambridge MA.   «»   "You went over and beyond my expectations." — Michel Côté, Siebel Test Lead, GlaxoSmithKline Canada.' />
                </Annotation>
              </Appear>
            </>
          )}
        </SectionBlock>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* § 3. Operational Capabilities                                     */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionBlock>
          {(active) => (
            <>
              <SH n={3} title="Operational Capabilities" delay={0} active={active} />

              <Appear delay={100} active={active}>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
                  <InkPanel
                    title="APPLICATION_DESIGNER"
                    accent={T.blue}
                    active={active}
                    delay={200}
                    text={"From requirement\nto interface.\n\nService design,\ndata flow,\ncomponent decomposition.\n\nOracle eBS, Flask,\nReact, ITIL4-aligned."}
                  />
                  <InkPanel
                    title="SOFTWARE_ENGINEER"
                    accent={T.blue}
                    active={active}
                    delay={800}
                    text={"Python 3.13/3.14, C# .NET,\nTypeScript, SQL.\n\nLinux VPS, Docker,\nHeroku, Azure, AWS.\n\nBuild · deploy · operate.\nEnd to end."}
                  />
                  <InkPanel
                    title="SUPPORT_ENGINEER"
                    accent={T.amber}
                    active={active}
                    delay={1400}
                    text={"L2 / L3 production\napplication support.\n\nRoot cause work,\nservice-delivery audits,\nhigh-pressure SLAs.\n\nFujitsu / Primark:\nfive years on the floor."}
                  />
                </div>
              </Appear>
            </>
          )}
        </SectionBlock>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* § 4. Delivery Stack                                               */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionBlock>
          {(active) => (
            <>
              <SH n={4} title="Delivery Stack" delay={0} active={active} />

              <Appear delay={200} active={active}>
                <div style={{ marginBottom: 22, paddingLeft: 6 }}>
                  <div style={{ fontFamily: T.mono, fontSize: 8, color: T.blue, letterSpacing: 2, marginBottom: 7, opacity: 0.85 }}>
                    FIG. 2 · DELIVERY STACK — FROM COMMISSION TO PRODUCTION
                  </div>
                  <DeliveryDiagram active={active} />
                  <div style={{ fontFamily: T.body, fontSize: 10, color: T.fade, marginTop: 5, fontStyle: 'italic' }}>
                    (observation precedes optimisation)
                  </div>
                </div>
              </Appear>
            </>
          )}
        </SectionBlock>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* § 5. Current Field Activity                                       */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionBlock>
          {(active) => (
            <>
              <SH n={5} title="Current Field Activity" delay={0} active={active} />

              <Appear delay={200} active={active}>
                <div style={{
                  border: `1px solid ${T.blue}`,
                  padding: '10px 12px',
                  marginBottom: 20,
                  background: 'rgba(242,232,200,0.42)',
                }}>
                  <div style={{ fontFamily: T.mono, fontSize: 8, color: T.blue, letterSpacing: 2, marginBottom: 10, opacity: 0.85 }}>
                    REAL-TIME TELEMETRY · OPERATOR INTERFACE ACTIVITY
                  </div>
                  <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 12 }}>
                    <InkGraph label="DEPLOYMENT ACTIVITY · COMMITS PER WEEK" w={270} h={52} />
                    <InkGraph label="AVAILABLE CAPACITY · HOURS / WEEK"       w={270} h={52} />
                  </div>
                  <Appear delay={800} active={active}>
                    <p style={{ fontFamily: T.body, fontSize: 12, color: T.ink, lineHeight: 1.75, margin: 0 }}>
                      <Typed active={active} delay={1000} speed={12}
                        text="Currently shipping: terzo-audio (Python TTS utility with Google Cloud free-tier guard), goats-path-woolen-mills (Flask e-commerce for Irish wool, on Heroku), and nz-industry (Pandas exploratory analysis of Stats NZ enterprise data). Capacity exists for one additional medium-term commission." />
                    </p>
                  </Appear>
                </div>
              </Appear>
            </>
          )}
        </SectionBlock>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* § 6. Technical Specification                                      */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionBlock>
          {(active) => (
            <>
              <SH n={6} title="Technical Specification" delay={0} active={active} />

              <Appear delay={200} active={active}>
                <pre style={{
                  fontFamily: T.mono,
                  fontSize: 11,
                  color: T.ink2,
                  lineHeight: 1.75,
                  margin: '0 0 12px',
                  whiteSpace: 'pre-wrap',
                }}>
                  <Typed active={active} delay={400} speed={14} text={TECH_SPEC} />
                </pre>
              </Appear>

              <Appear delay={3200} active={active}>
                <Annotation>
                  <Typed active={active} delay={3400} speed={14}
                    text="Where existing systems suffice, the operator integrates. Where they do not, the operator builds. Cost reduction follows from accurate observation, not aggressive optimisation. The aesthetic of this site is the aesthetic of the work: legible, annotated, maintainable." />
                </Annotation>
              </Appear>
            </>
          )}
        </SectionBlock>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* § 7. Field Record                                                 */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionBlock>
          {(active) => (
            <>
              <SH n={7} title="Field Record" delay={0} active={active} />

              <Appear delay={200} active={active}>
                <div style={{ marginBottom: 12 }}>
                  <LogEntry active={active} delay={400}
                    dates="2024.08 — PRESENT"
                    role="Liferaft Service Technician"
                    employer="SNG · Castletownbere, Co. Cork"
                    body="Liferaft service workload coordination, EPIRB/PLB programming, pyrotechnic compliance with An Garda Síochána and the Defence Forces, safety representative duties, AI-assisted business development."
                  />
                  <LogEntry active={active} delay={1100}
                    dates="2024.06 — PRESENT"
                    role="Principal"
                    employer="Terzo Technical · Bantry, Co. Cork"
                    body="Founded VAT-registered IT services practice. Designs, builds and deploys Flask applications to Heroku for client lead generation; e-government account configuration; business continuity planning; Python back-end development under 3.13/3.14."
                  />
                  <LogEntry active={active} delay={1800}
                    dates="2022.09 — 2024.05"
                    role="Junior Service Architect"
                    employer="Fujitsu Ireland · Swords, Co. Dublin"
                    body="Led investigation of in-flight Oracle eBS services to identify gaps and advocate improvements. Took accountability for service-design documentation. Project-managed DoD/DF Oracle eBusiness implementation: task estimation, allocation, daily progress reporting, liaison between production and senior management."
                  />
                  <LogEntry active={active} delay={2500}
                    dates="2017.09 — 2022.09"
                    role="Technical Services Specialist"
                    employer="Fujitsu Ireland · Swords, Co. Dublin"
                    body="Onsite application support and service delivery for Primark in a fast-paced production environment. Built Python applications to manipulate system data, reducing service-downtime costs. L2/L3 help-desk: root cause investigation, service-delivery audits, monthly performance reporting. Validated disaster recovery; participated in data-centre fire drills."
                  />
                  <LogEntry active={active} delay={3200}
                    dates="2015.11 — 2017.02"
                    role="Customer Service & Business Data Technician"
                    employer="Moravia IT s.r.o. · Cork City"
                    body="Large-scale validation of business and location data for Apple Maps against Google Maps, Bing, and Yandex. Articulated written justifications under continuously evolving evaluation criteria."
                  />
                  <LogEntry active={active} delay={3900}
                    dates="2010 — 2015"
                    role="Japanese > English Translation Contractor"
                    employer="Linguistic Systems · KJI · Transperfect · Gongwell · others"
                    body="Translated technical and legal documents: mechanical patents, drug reaction case studies, automotive engineering, nuclear controller manuals. Implemented translation-accuracy process improvements; developed Python tooling to reduce cost in phonetic transcription."
                  />
                  <LogEntry active={active} delay={4600}
                    dates="2008 — 2010"
                    role="Siebel Test Contractor"
                    employer="GlaxoSmithKline Canada · Mississauga, Ontario"
                    body="Manual and QTP automated test scripts against a bespoke Siebel implementation. Translated Japanese UAT scripts into English for regression testing. SME for creation, verification and execution of automated test scripts."
                  />
                  <LogEntry active={active} delay={5300}
                    dates="2007 — 2008"
                    role="Game Developer"
                    employer="Visual Sports Systems · Concord, Ontario"
                    body="Led custom video-game project management and asset development; Mono .NET implementation for macOS; designed interactive 3D games and prototypes."
                  />
                  <LogEntry active={active} delay={6000}
                    dates="2005 — 2006"
                    role="Customer Service Professional"
                    employer="Connexion by Boeing · Toronto, Ontario"
                    body="Level 1 Japanese-language technical support for in-flight wireless connectivity by phone, Sametime, and email."
                  />
                </div>
              </Appear>

              <Appear delay={7000} active={active}>
                <p style={{ fontFamily: T.body, fontSize: 11, color: T.fade, fontStyle: 'italic', marginBottom: 18 }}>
                  <Typed active={active} delay={7200} speed={24}
                    text="(earlier roles — Rheem Manufacturing, Fort Smith AR, 1998–2001 — on request)" />
                </p>
              </Appear>
            </>
          )}
        </SectionBlock>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* § 8. Personal Projects                                            */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionBlock>
          {(active) => (
            <>
              <SH n={8} title="Personal Projects" delay={0} active={active} />

              <Appear delay={100} active={active}>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
                  <InkPanel
                    title="TERZO_AUDIO"
                    accent={T.blue}
                    active={active}
                    delay={200}
                    text={"Text-to-speech utility:\npages or pasted text\nto MP3 audio.\n\nRuns as CLI, importable\nPython module, or Flask\nservice.\n\nThree-strategy URL\nextraction · Google\nCloud free-tier guard."}
                  />
                  <InkPanel
                    title="GOATS_PATH"
                    accent={T.blue}
                    active={active}
                    delay={600}
                    text={"Flask web application\nselling skeins and cakes\nof premium Donegal Tweed\nand Irish wools.\n\nDeployed to Heroku\nvia Procfile / WSGI.\n\nFull-stack: HTML5/CSS/JS\nfront, Python/Flask back."}
                  />
                  <InkPanel
                    title="NZ_INDUSTRY"
                    accent={T.blue}
                    active={active}
                    delay={1000}
                    text={"Exploratory data analysis\nof Stats NZ Annual\nEnterprise Survey (2024).\n\nPandas + Matplotlib.\n\nLinear-regression slopes\nper industry, 2013–2024.\nTwenty largest industries\nplus all in contraction."}
                  />
                  <InkPanel
                    title="VENTRILOQUIST"
                    accent={T.amber}
                    active={active}
                    delay={1400}
                    text={"Python application:\nreal-time speech-to-text\nand text-to-speech.\n\nWebSockets for\ndistributed blocking\nand non-blocking\nbehaviour.\n\nBantry, July 2024."}
                  />
                  <InkPanel
                    title="STAGEMASTER"
                    accent={T.amber}
                    active={active}
                    delay={1800}
                    text={"Text-to-speech AI\nvoice synthesis app:\nverbal sock puppets.\n\nCritical evaluation\nof TTS technology\nand UI blocking\nbehaviour.\n\nBantry, April 2024."}
                  />
                </div>
              </Appear>
            </>
          )}
        </SectionBlock>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* § 9. Credentials                                                  */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionBlock>
          {(active) => (
            <>
              <SH n={9} title="Credentials" delay={0} active={active} />

              <Appear delay={200} active={active}>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 14 }}>

                  {/* Education */}
                  <div style={{ flex: '1 1 200px' }}>
                    <div style={{ fontFamily: T.mono, fontSize: 9, color: T.blue, letterSpacing: 2, marginBottom: 10 }}>
                      EDUCATION
                    </div>
                    <CredEntry date="OCT 2025" line="Software Developer — CENIT College, Naas, Kildare" note="Future in Tech / Technology Ireland ICT Skillnet" />
                    <CredEntry date="2007" line="Ontario College Graduate Certificate, Digital Design — Game Design" note="George Brown College, Toronto" />
                    <CredEntry date="1996" line="Bachelor of Arts, Japanese Language & Literature" note="University of Massachusetts, Amherst" />
                    <CredEntry date="1991–92" line="Monbushō Fellowship — Japanese Ministry of Education" note="University of Hokkaido, Sapporo" />
                  </div>

                  {/* Certifications */}
                  <div style={{ flex: '1 1 200px' }}>
                    <div style={{ fontFamily: T.mono, fontSize: 9, color: T.blue, letterSpacing: 2, marginBottom: 10 }}>
                      CERTIFICATIONS
                    </div>
                    <CredEntry date="SEP 2025" line="Pearson IT Specialist — Python" />
                    <CredEntry date="JUN 2025" line="Certiport IT Specialist — Software Development (C#, .NET, SQL)" />
                    <CredEntry date="MAY 2023" line="ITIL4 High Velocity IT" />
                    <CredEntry date="OCT 2022" line="ITIL4 Foundation" />
                    <CredEntry date="JUN 2022" line="Microsoft Azure Data Fundamentals (DP-900)" />
                    <CredEntry date="MAR 2020" line="Microsoft Azure Fundamentals (AZ-900)" />
                    <CredEntry date="2016–17" line="Hardware Security · Software Security · Cryptography · Usable Security" note="University of Maryland, College Park (Coursera)" />
                  </div>
                </div>
              </Appear>

              <Appear delay={1800} active={active}>
                <p style={{ fontFamily: T.body, fontSize: 11, color: T.fade, fontStyle: 'italic', marginBottom: 18 }}>
                  <Typed active={active} delay={2000} speed={22}
                    text="Driving licence: Category B (Ireland). Nationality: dual Irish–American. VAT registered, VIES verified." />
                </p>
              </Appear>
            </>
          )}
        </SectionBlock>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* § 10. Channels                                                    */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <SectionBlock>
          {(active) => (
            <>
              <SH n={10} title="Channels" delay={0} active={active} />

              <Appear delay={200} active={active}>
                <pre style={{
                  fontFamily: T.mono,
                  fontSize: 11,
                  color: T.ink,
                  lineHeight: 1.7,
                  margin: '0 0 12px',
                  whiteSpace: 'pre-wrap',
                }}>
                  <Typed active={active} delay={400} speed={16} text={CHANNELS} />
                </pre>
              </Appear>

              <Appear delay={2000} active={active}>
                <Annotation>
                  <Typed active={active} delay={2200} speed={14}
                    text="Commissions accepted in Ireland and remote. Onsite within Munster preferred for service-design and support engagements; remote welcome for application work. Brief inquiries: a paragraph is enough. 日本語可." />
                </Annotation>
              </Appear>
            </>
          )}
        </SectionBlock>

        {/* ── Footer links ──────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          gap: 18,
          flexWrap: 'wrap',
          padding: '18px 0 6px',
          borderTop: `1px solid ${T.ink}1e`,
          marginTop: 8,
        }}>
          {[
            { label: 'Impressum', id: 'impressum' },
            { label: 'Contact',   id: 'contact'   },
            { label: 'Terms',     id: 'terms'      },
            { label: 'Privacy',   id: 'privacy'    },
          ].map(({ label, id }) => (
            <a
              key={id}
              id={id}
              href={`#${id}`}
              style={{ fontFamily: T.mono, fontSize: 9, color: T.fade, textDecoration: 'none', letterSpacing: 1 }}
            >
              {label.toUpperCase()}
            </a>
          ))}
        </div>

        <Ticker />

      </div>
    </div>
  );
}
