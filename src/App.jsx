import { useEffect, useRef } from 'react'
import './App.css'

const CURVES = [
  'M0 30 C 200 6, 420 6, 640 22 S 1000 42, 1200 14',
  'M0 16 C 240 40, 460 40, 700 20 S 1020 2, 1200 26',
  'M0 24 C 180 4, 400 44, 660 26 S 980 6, 1200 20',
  'M0 20 C 260 38, 480 2, 720 24 S 1040 40, 1200 16',
]

function Curve({ index = 0 }) {
  return (
    <div className="curve-wrap" data-parallax>
      <svg
        className="curve reveal-el"
        viewBox="0 0 1200 44"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d={CURVES[index % CURVES.length]} />
      </svg>
    </div>
  )
}

/* Before / after on the same scale. The Basis note argues every result
   here is a time figure; this is that argument made visible. */
function TimeBar({ label, beforeLabel, afterLabel, ratio }) {
  return (
    <div className="timebar reveal-el">
      <p className="timebar-label">{label}</p>
      <div className="timebar-row">
        <span className="timebar-key">Before</span>
        <span className="timebar-track">
          <span className="timebar-fill is-before" />
        </span>
        <span className="timebar-val">{beforeLabel}</span>
      </div>
      <div className="timebar-row">
        <span className="timebar-key">After</span>
        <span className="timebar-track">
          <span
            className="timebar-fill is-after"
            style={{ '--w': `${Math.round(ratio * 100)}%` }}
          />
        </span>
        <span className="timebar-val">{afterLabel}</span>
      </div>
    </div>
  )
}

function NavDiagram() {
  return (
    <figure className="diagram reveal-el">
      <svg
        viewBox="0 0 620 250"
        role="img"
        aria-label="Reconciliation flow: records enter rule lookups; matches clear without a human, and only rule failures escalate to an investigation agent, which flags a likely cause for human review rather than resolving it."
      >
        <defs>
          <marker
            id="nav-arrow"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <polygon points="0,1 8,4 0,7" fill="currentColor" />
          </marker>
        </defs>

        <g className="dg-node" data-step="1">
          <rect x="6" y="20" width="140" height="54" />
          <text x="76" y="44">Four data feeds</text>
          <text x="76" y="61" className="dg-sub">records in</text>
        </g>

        <g className="dg-edge" data-step="2">
          <line x1="146" y1="47" x2="190" y2="47" markerEnd="url(#nav-arrow)" />
        </g>

        <g className="dg-node" data-step="3">
          <rect x="196" y="20" width="140" height="54" />
          <text x="266" y="44">Rule lookups</text>
          <text x="266" y="61" className="dg-sub">deterministic</text>
        </g>

        <g className="dg-edge" data-step="4">
          <line x1="266" y1="74" x2="266" y2="144" markerEnd="url(#nav-arrow)" />
          <text x="278" y="112" className="dg-edge-label is-side">match</text>
        </g>

        <g className="dg-node is-good" data-step="5">
          <rect x="196" y="150" width="140" height="54" />
          <text x="266" y="174">Cleared</text>
          <text x="266" y="191" className="dg-sub">90% of mismatches</text>
        </g>

        <g className="dg-edge" data-step="6">
          <line x1="336" y1="47" x2="414" y2="47" markerEnd="url(#nav-arrow)" />
          <text x="375" y="38" className="dg-edge-label">no match</text>
        </g>

        <g className="dg-node is-halt" data-step="7">
          <rect x="420" y="20" width="140" height="54" />
          <text x="490" y="44">Investigation agent</text>
          <text x="490" y="61" className="dg-sub">semantic + vector</text>
        </g>

        <g className="dg-edge" data-step="8">
          <line x1="490" y1="74" x2="490" y2="144" markerEnd="url(#nav-arrow)" />
          <text x="502" y="112" className="dg-edge-label is-side">flags cause</text>
        </g>

        <g className="dg-node" data-step="9">
          <rect x="420" y="150" width="140" height="54" />
          <text x="490" y="174">Human review</text>
          <text x="490" y="191" className="dg-sub">70% pass first look</text>
        </g>

        <text x="6" y="232" className="dg-note">
          The agent flags a likely cause. It never auto-resolves.
        </text>
      </svg>
      <figcaption>
        The cheap deterministic path runs first. The model is an escalation, not
        a front door.
      </figcaption>
    </figure>
  )
}

function McpDiagram() {
  return (
    <figure className="diagram reveal-el">
      <svg
        viewBox="0 0 620 150"
        role="img"
        aria-label="The profile workflow queries a custom MCP server, which reads the Dynamo CRM over REST against an OpenAPI spec, so every figure returns from a source record rather than from the model's memory."
      >
        <defs>
          <marker
            id="mcp-arrow"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <polygon points="0,1 8,4 0,7" fill="currentColor" />
          </marker>
        </defs>

        <g className="dg-node" data-step="1">
          <rect x="6" y="16" width="150" height="52" />
          <text x="81" y="39">Profile workflow</text>
          <text x="81" y="56" className="dg-sub">drafts the document</text>
        </g>

        <g className="dg-edge" data-step="2">
          <line x1="156" y1="42" x2="228" y2="42" markerEnd="url(#mcp-arrow)" />
          <text x="192" y="33" className="dg-edge-label">query</text>
        </g>

        <g className="dg-node is-good" data-step="3">
          <rect x="236" y="16" width="150" height="52" />
          <text x="311" y="39">MCP server</text>
          <text x="311" y="56" className="dg-sub">internal infra</text>
        </g>

        <g className="dg-edge" data-step="4">
          <line x1="386" y1="42" x2="462" y2="42" markerEnd="url(#mcp-arrow)" />
          <text x="424" y="33" className="dg-edge-label">REST</text>
        </g>

        <g className="dg-node" data-step="5">
          <rect x="470" y="16" width="144" height="52" />
          <text x="542" y="39">Dynamo CRM</text>
          <text x="542" y="56" className="dg-sub">system of record</text>
        </g>

        <g className="dg-edge is-return" data-step="6">
          <polyline
            points="542,68 542,100 81,100 81,74"
            markerEnd="url(#mcp-arrow)"
          />
          <text x="311" y="120" className="dg-edge-label">
            every figure resolves to a source record
          </text>
        </g>
      </svg>
      <figcaption>
        The workflow reads from the record, not from the model’s memory.
        Unsourced claims are held for human review rather than drafted.
      </figcaption>
    </figure>
  )
}

/* ------------------------------------------------------------------
   Generative field.

   Seeded value-noise flow field. Most paths resolve along the field;
   a small minority diverge and are drawn in the escalation colour.
   Same argument the page makes, drawn rather than stated. Seeded, so
   the composition is identical on every load.
   ------------------------------------------------------------------ */
const FIELD_SEED = 20240701

function mulberry32(a) {
  return function rng() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeNoise(rng) {
  const size = 64
  const lattice = new Float32Array(size * size)
  for (let i = 0; i < lattice.length; i += 1) lattice[i] = rng()
  const smooth = (t) => t * t * (3 - 2 * t)
  return function noise(x, y) {
    const xi = Math.floor(x)
    const yi = Math.floor(y)
    const xf = smooth(x - xi)
    const yf = smooth(y - yi)
    const at = (gx, gy) =>
      lattice[(((gy % size) + size) % size) * size + (((gx % size) + size) % size)]
    const a = at(xi, yi)
    const b = at(xi + 1, yi)
    const c = at(xi, yi + 1)
    const d = at(xi + 1, yi + 1)
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf
  }
}

function Field() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let paths = []
    let step = 0
    let steps = 96

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (!w || !h) return
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const rng = mulberry32(FIELD_SEED)
      const noise = makeNoise(rng)
      const count = Math.max(60, Math.round(w / 5))
      const scale = 0.0042

      paths = []
      for (let i = 0; i < count; i += 1) {
        // A small minority diverge from the field. Those are the escalations.
        const diverges = rng() < 0.055
        paths.push({
          x: rng() * w,
          y: rng() * h,
          diverges,
          drift: (rng() - 0.5) * 0.9,
          pts: [],
        })
      }

      for (let s = 0; s < steps; s += 1) {
        paths.forEach((p) => {
          p.pts.push([p.x, p.y])
          const n = noise(p.x * scale * 12, p.y * scale * 12)
          const angle = n * Math.PI * 2 + (p.diverges ? p.drift * s * 0.02 : 0)
          p.x += Math.cos(angle) * 2.1
          p.y += Math.sin(angle) * 2.1 * 0.55
        })
      }
      step = reduce ? steps : 0
    }

    const paint = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)
      paths.forEach((p) => {
        const upto = Math.min(step, p.pts.length)
        if (upto < 2) return
        ctx.beginPath()
        ctx.moveTo(p.pts[0][0], p.pts[0][1])
        for (let i = 1; i < upto; i += 1) ctx.lineTo(p.pts[i][0], p.pts[i][1])
        ctx.strokeStyle = p.diverges
          ? 'rgba(138, 98, 32, 0.5)'
          : 'rgba(35, 32, 27, 0.14)'
        ctx.lineWidth = p.diverges ? 1.1 : 0.8
        ctx.stroke()
      })
    }

    const tick = () => {
      if (step < steps) {
        step += 1
        paint()
        raf = window.requestAnimationFrame(tick)
      }
    }

    const start = () => {
      build()
      paint()
      if (!reduce && step < steps) raf = window.requestAnimationFrame(tick)
    }

    start()

    let resizeTimer
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        window.cancelAnimationFrame(raf)
        start()
      }, 200)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <figure className="field">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="A generated flow field. Most paths resolve along the same underlying field; a small number diverge and are drawn in the escalation colour."
      />
      <figcaption>Most paths resolve. A few escalate.</figcaption>
    </figure>
  )
}

/* A small seeded seal. Each principle gets its own mark, generated
   rather than drawn, so the set feels of a piece without repeating. */
function polar(cx, cy, r, deg) {
  const a = ((deg - 90) * Math.PI) / 180
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
}

function arcPath(cx, cy, r, start, end) {
  const [x1, y1] = polar(cx, cy, r, start)
  const [x2, y2] = polar(cx, cy, r, end)
  const large = end - start > 180 ? 1 : 0
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

function Glyph({ seed }) {
  const rng = mulberry32(seed * 2654435761)
  const rings = []
  const count = 3 + Math.floor(rng() * 3)
  for (let i = 0; i < count; i += 1) {
    const r = 7 + i * 5.5 + rng() * 2
    const start = rng() * 360
    const sweep = 70 + rng() * 190
    rings.push({ r, start, end: start + sweep, accent: i === count - 1 })
  }
  const dot = polar(24, 24, 4 + rng() * 3, rng() * 360)
  return (
    <svg className="glyph" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {rings.map((g) => (
        <path
          key={`${g.r}-${g.start}`}
          d={arcPath(24, 24, g.r, g.start, g.end)}
          className={g.accent ? 'glyph-accent' : undefined}
        />
      ))}
      <circle cx={dot[0]} cy={dot[1]} r="1.4" className="glyph-dot" />
    </svg>
  )
}

const PRINCIPLES = [
  {
    line: 'Not everything needs AI.',
    note: 'Most workflows that look like AI problems are not. Saying so early is cheaper than proving it late.',
  },
  {
    line: 'The cheapest correct answer runs first.',
    note: 'Deterministic rules take the cases that were never ambiguous. The model is an escalation path.',
  },
  {
    line: 'AI drafts. A person approves.',
    note: 'The rule I wrote for the firm, and the one that sits at the top of every module and every skill in production.',
  },
  {
    line: 'Write the threshold down before the eval runs.',
    note: 'A number agreed afterwards is a negotiation, and the negotiation ends with the model shipping.',
  },
  {
    line: 'The best system is the one nobody has to rescue.',
    note: 'Scaffolding is real software. Someone inherits it, re-tunes it, and explains it long after you have moved on.',
  },
]

function Stamp({ tone, children }) {
  return (
    <span className="stamp" data-tone={tone}>
      {children}
    </span>
  )
}

const CASES = [
  {
    title: 'AI Payroll Automation',
    stamp: { tone: 'halted', label: 'Killed' },
    figure: true,
    time: {
      label: 'Time to close an enquiry',
      beforeLabel: '3 days',
      afterLabel: '1–2 days',
      ratio: 0.5,
    },
    body: [
      {
        lead: 'The problem.',
        text: ' Payroll enquiries arrived as unstructured email, scattered across mailboxes and buried in reply chains. Every one was resolved by hand, averaging three days to close.',
      },
      {
        lead: 'What the evidence said.',
        text: ' No API access to the source payroll software, so nothing could be read at source. After a full data-cleanup pass, the eval pass rate capped at 53% against a 70% threshold. The failures were not prompt failures. Recurring hallucinations traced back to the unstructured input itself.',
      },
      {
        lead: 'The decision.',
        text: ' I killed the AI approach and shipped a rule-based, human-in-the-loop system instead: the Payroll Enquiry Tracker. Deterministic routing rules, and an interface that walks the requester through the flow so the enquiry arrives complete and never leaves the system.',
      },
      {
        lead: 'Result.',
        text: ' Enquiries now close in one to two days, against a previous average of three. None of that came from a model. It came from writing down the rules and fixing the path the user was already on.',
      },
      {
        lead: 'What I take from it.',
        text: ' Automation is often not a question of building something intelligent. It is a question of defining the rules properly and taking the existing system to the point where it stops leaking. The second lesson is cheaper and I learned it the expensive way: set the pass threshold before the eval runs. A threshold agreed afterwards is not a threshold, it is a negotiation, and the negotiation always ends with the model shipping. 53% against 70% is a clear answer. The work is being willing to read it.',
      },
    ],
  },
  {
    title: 'Agentic NAV Reconciliation',
    stamp: { tone: 'delivered', label: 'Delivered' },
    diagram: 'nav',
    time: {
      label: 'Reconciliation cycle',
      beforeLabel: '4 hours',
      afterLabel: '30 minutes',
      ratio: 0.125,
    },
    body: [
      {
        lead: 'The problem.',
        text: ' NAV reconciliation ran across four source data feeds and took four hours a cycle.',
      },
      {
        lead: 'The option I rejected.',
        text: ' Put an LLM across every mismatch. Most NAV mismatches are deterministic. Sending them through a probabilistic system costs more, runs slower, and produces a worse audit trail for the cases that were never ambiguous.',
      },
      {
        lead: 'The decision.',
        text: ' Hybrid, with the cheap path first. Structured rule lookups resolve standard mismatches. Only on rule failure does an investigation agent activate: semantic reasoning over Pinecone vector embeddings, determining the likely cause of the mismatch. It flags findings for human review. It does not auto-resolve.',
      },
      {
        lead: 'Result.',
        text: ' 90% of NAV mismatches clear without human intervention, rules and AI combined. Of the cases that do reach a human, 70% pass clean on first look. Cycle time went from four hours to thirty minutes. Output quality spot-checked via LLM-as-judge review. These are operational figures from running the system, not a formal audited evaluation.',
      },
      {
        lead: 'What I take from it.',
        text: ' The cheapest correct answer should run first. An LLM is an escalation path, not a front door.',
      },
    ],
  },
  {
    title: 'Multi-Agent Investment Profiles',
    stamp: { tone: 'delivered', label: 'Delivered' },
    diagram: 'mcp',
    time: {
      label: 'Time to assemble a short profile',
      beforeLabel: '12 hours',
      afterLabel: '90 minutes',
      ratio: 0.125,
    },
    body: [
      {
        lead: 'The problem.',
        text: ' Short investment profiles for multi-million dollar pitches took twelve hours to assemble, with the underlying data sitting in Dynamo, a legacy CRM.',
      },
      {
        lead: 'The constraint that shaped everything.',
        text: ' This is a document where a wrong figure is not a formatting error.',
      },
      {
        lead: 'The decision.',
        text: ' I built a custom Model Context Protocol server on internal infrastructure, integrating Dynamo over REST against an OpenAPI spec, so the workflow reads from the record rather than from the model’s memory. The grounding rule is absolute: every figure resolves to a source record, and unsourced claims are held for human review. Prompt routing and context-window optimisation cut token usage by around 40% without losing output fidelity.',
      },
      { lead: 'Result.', text: ' Twelve hours to ninety minutes.' },
      {
        lead: 'What I take from it.',
        text: ' Human-in-the-loop is not a safety layer you bolt on at the end. It is a decision made at design time about which claims the model is permitted to assert unsupervised. Here the answer was none.',
      },
    ],
  },
]

const WORK = [
  {
    name: 'EPIC AI Learning Programme & Live Skills Library',
    text: ' the firm’s AI governance and enablement programme: an eight-module curriculum taking teams from prompting through connectors, research and custom skill-building, alongside a dossier of the twelve AI skills running in production. I defined the operating rule that runs through all of it — AI drafts, a person reviews and approves, and nothing is final until they do.',
    links: [
      {
        href: 'https://epicipprojects.com/epic-ai-guide/index.html',
        label: 'Programme',
      },
      {
        href: 'https://epicipprojects.com/epic-ai-guide/skills-library.html',
        label: 'Skills library',
      },
    ],
    stamps: [{ tone: 'delivered', label: 'Delivered' }],
  },
  {
    name: 'KYC Model Evaluation Harness',
    text: ' benchmarked 6 LLMs via OpenRouter against a 50-document golden extraction dataset, 100+ fields per document, to select the production extraction model.',
    stamps: [{ tone: 'delivered', label: 'Delivered' }],
  },
  {
    name: 'KYC processing at scale',
    text: ' Google Document AI across 12 document types took capacity from 30 to 300+ forms/day with no added headcount. Clean-pass runs 90%+ on UK English-language documents, ~70% on German/French/Swiss.',
    stamps: [{ tone: 'delivered', label: 'Delivered' }],
  },
  {
    name: 'GenAI KIIDs/PRIIPs generator',
    text: ' UCITS compliance drafting, 2 hours to 30 minutes per document, across 50+ fund documents.',
    stamps: [{ tone: 'delivered', label: 'Delivered' }],
  },
  {
    name: 'Whittard Analytics Dashboard',
    text: ' consolidated Island Pacific retail data, WSSI and warehouse Excel into one Databricks source of truth with a LangChain NL-to-SQL layer. Replaced per-team spreadsheets across procurement, warehouse, stores, shipment.',
    stamps: [
      { tone: 'delivered', label: 'Delivered' },
      { tone: 'halted', label: 'TimesFM in development' },
    ],
  },
  {
    name: 'Monolith to microservices',
    text: ' legacy PHP to event-driven Node.js, phased zero-downtime. 3× API concurrency, 50 to 150+ concurrent requests.',
    stamps: [{ tone: 'halted', label: 'In progress' }],
  },
  {
    name: 'SnackMagic E-Shops / Swag Catalog / Personalization Engine',
    text: ' 0-to-1 launches, 2024: $600K and $300K incremental monthly revenue, AOV $45 to $55 validated over an 8-week A/B test at 95% confidence.',
    stamps: [{ tone: 'delivered', label: 'Delivered' }],
  },
  {
    name: 'AppSec and third-party audit',
    text: ' established the firm’s first AppSec process; initiated and drove a third-party VAPT and SOC 2 / GDPR review to completion. Critical vulnerabilities 12 to zero over six months.',
    stamps: [{ tone: 'delivered', label: 'Delivered' }],
  },
]

const SCOPE = [
  { key: 'Reporting', value: 'Direct to UK Managing Director. CEO skip-level.' },
  {
    key: 'Team',
    value: '2 direct reports. Leads a 12-person cross-functional squad.',
  },
  {
    key: 'P&L',
    value:
      'Legalads, £8M ARR, 1,000+ solicitor firm customers. Mandate to £10M over 18 months.',
    stamp: { tone: 'halted', label: 'In progress' },
  },
  {
    key: 'Built from zero',
    value: 'Product function. PM process. AI governance.',
  },
  {
    key: 'Firm-wide',
    value: 'AI governance and enablement. Forward-deployed with business teams.',
  },
]

const ESSAY = [
  'The interesting question about an AI feature is almost never whether the model can do it. Given enough scaffolding it usually can, on a good day, in a demo. The question is whether the thing you build will still be worth running in two years, and who is going to keep it alive.',
  'I am the first product manager EPIC Investment Partners has had. Part of that job was writing down what an AI system has to prove before an operations team is allowed to act on its output. The rule I settled on is unglamorous, and it now runs through everything the firm does with AI: the model drafts, a person reviews and approves, and nothing is final until they do. It sits at the top of every module in the firm’s AI programme and inside every one of the skills running in production.',
  'That rule is not there because the models are weak. It is there because the cost of a wrong figure in a fund document is not symmetrical with the cost of a slower one.',
  'The second rule is harder to hold, because it disappoints people: most workflows that look like AI problems are not.',
  'We tried to automate payroll enquiries with a language model. They arrived as email, scattered across mailboxes, buried in reply chains. It looked ideal. Unstructured text in, structured answer out. It did not work, and the eval said so before anyone’s feelings were involved: the pass rate capped at 53% against a threshold of 70% that we had written down before the build started. The failures were not prompt failures. The model was filling gaps in the input, because the input frequently did not contain the answer.',
  'So we shipped a rule-based tracker with a human in the loop, and an interface that makes the enquiry arrive complete. Resolution went from an average of three days to one or two. None of it came from a model.',
  'The part worth taking from that is not the number. It is what the alternative would have cost. To force the model over the line we would have had to build scaffolding around it: extraction heuristics, fallback rules, a correction interface, some notion of confidence, and an eval suite to keep the whole arrangement honest. All of that is real software. It has to be maintained, re-tuned when a vendor deprecates a model, re-evaluated when the data drifts, and explained to every new person who inherits it.',
  'A complicated system solving a simple problem is not a clever outcome. It is a liability with a long tail, and the tail is usually paid by whoever comes after you.',
  'The third rule follows from the second. Sometimes the correct decision is to wait.',
  'The capability curve is steep at the moment. A workflow that today needs six pieces of custom scaffolding to reach an acceptable pass rate may need one, or none, in a year, when the models handle natively what you are currently propping up. Build the elaborate version now and you own it. You will still own it after the capability lands and quietly makes it redundant.',
  'Waiting is not the same as doing nothing. In the payroll case it meant shipping the deterministic system that solved the actual problem and leaving the door open. The tracker is not a consolation prize. It is a smaller surface with fewer failure modes, and if the models later get good enough to take more of it, that is a far cleaner thing to extend than a pile of workarounds would have been.',
  'What this looks like day to day is fairly mundane. Write the pass threshold down before the eval runs, where other people can see it, because a threshold agreed afterwards is a negotiation, and the negotiation tends to end with the model shipping. Run the cheap deterministic path first and treat the model as an escalation rather than a front door. Make human approval an explicit design decision about which claims the system is permitted to assert on its own.',
  'And be willing to say not yet. That is the one that is genuinely hard, because from the outside it can look like a lack of ambition, and it always costs you the demo.',
  'The AI work I am most confident about is not the most sophisticated. It is the part that is still running, unattended, that nobody has had to come back and rescue.',
]

function ThresholdFigure() {
  return (
    <figure className="figure reveal-el">
      <p className="figure-value">53%</p>
      <figcaption className="figure-caption">
        Eval pass rate after the data-cleanup pass.
      </figcaption>
      <div className="track">
        <div className="fill" />
        <div className="threshold" />
      </div>
      <div className="figure-scale">
        <span>0%</span>
        <span>100%</span>
      </div>
      <p className="threshold-note">
        The vertical rule is the 70% ship threshold, set in writing before the
        build started.
      </p>
    </figure>
  )
}

function App() {
  const progressRef = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('reveal-ready')

    const els = Array.from(document.querySelectorAll('.reveal-el'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const revealAll = () => els.forEach((el) => el.classList.add('in'))

    let observer
    let safety
    if (reduce || typeof IntersectionObserver === 'undefined') {
      revealAll()
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in')
              observer.unobserve(entry.target)
            }
          })
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
      )
      els.forEach((el) => {
        // Anything already in view (or scrolled past) shows immediately —
        // never wait on an observer for content the reader can already see.
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('in')
        } else {
          observer.observe(el)
        }
      })
      // Last resort: if an observer callback never lands, the page must not
      // be left with invisible content.
      safety = window.setTimeout(revealAll, 4000)
    }

    const parallax = reduce ? [] : Array.from(document.querySelectorAll('[data-parallax]'))
    let ticking = false

    const paint = () => {
      ticking = false
      const bar = progressRef.current
      if (bar) {
        const max = document.body.scrollHeight - window.innerHeight
        const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0
        bar.style.transform = `scaleX(${p})`
      }
      const mid = window.innerHeight / 2
      parallax.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return
        // Drift the dividers slightly against the scroll so the page has depth.
        el.style.transform = `translateY(${((rect.top - mid) / mid) * -9}px)`
      })
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(paint)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (observer) observer.disconnect()
      if (safety) window.clearTimeout(safety)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      root.classList.remove('reveal-ready')
    }
  }, [])

  return (
    <div className="page">
      <div className="progress" ref={progressRef} aria-hidden="true" />

      <header className="masthead">
        <div className="col">
          <p className="greeting">Hello — I’m</p>
          <h1>Vishal Diwan</h1>
          <p className="positioning">Product, AI platforms, regulated fintech.</p>
          <p className="role">
            Senior Technical Product Manager (AI Platform), EPIC Investment
            Partners.
          </p>
          <p className="standfirst">
            Employee #8 at a company with no product team. First PM at a fintech
            with no product function. What follows is the record.
          </p>
        </div>
        <div className="col">
          <Field />
        </div>
      </header>

      <div className="col">
        <Curve index={0} />
      </div>

      <section className="section reveal-el">
        <div className="col prose">
          <p>
            In 2020 I joined a lunch-delivery startup as employee number eight.
            Two months later there was a pandemic and no lunches. We pivoted to
            corporate gifting and the company went from zero to $20M ARR in eight
            months. My first build was not a feature. It was the QA and release
            infrastructure, because at that growth rate nothing else was going to
            hold.
          </p>
          <p>
            In 2024 I became the first Product Manager in EPIC Investment
            Partners’ history. A UK investment and fund administration business,
            decades of operating history, £3bn+ in administered assets, and no
            product function. Before I could ship anything I had to settle what a
            PRD meant here, who signs off on an AI system that touches client
            money, and what evidence a model has to produce before an operations
            team will act on its output.
          </p>
          <p className="pull">Both times, the job started before the product did.</p>
        </div>
      </section>

      <div className="col">
        <Curve index={2} />
      </div>

      <section className="section reveal-el">
        <div className="col">
          <span className="section-label">How I work</span>
          <ul className="principles">
            {PRINCIPLES.map((p, i) => (
              <li className="principle" key={p.line}>
                <Glyph seed={i + 3} />
                <div>
                  <p className="principle-line">{p.line}</p>
                  <p className="principle-note">{p.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="aside">
            I like being early. Both times I have joined a company it had no
            product function, and the first thing I built was the thing that let
            everyone else build. I would rather ship something small that works
            on Tuesday than something clever that needs a specialist to keep it
            alive. I am also happy to be wrong in public: the killed project
            below is on this page precisely because stopping it was the right
            call.
          </p>
        </div>
      </section>

      <div className="col">
        <Curve index={1} />
      </div>

      <section className="section reveal-el">
        <div className="col">
          <span className="section-label">Basis</span>
          <div className="basis">
            <p>A note on how to read the numbers on this page.</p>
            <p>
              Almost every result here is a time figure. Twelve hours to ninety
              minutes. Four hours to thirty minutes. Three days to one. Very few
              of them are scale figures, and that is deliberate.
            </p>
            <p>
              EPIC is a fund administration business with decades of operating
              history. Volumes are large but they are not doubling next quarter.
              Nobody here needs a system that handles ten times the load. They
              need the four hours back, on Tuesday, from the person who is
              currently spending it. At a firm this age the binding constraint is
              operator time, not throughput ceiling, and optimising for the
              constraint you don’t have is the most expensive mistake available.
            </p>
            <p>
              So the target was efficiency, and the numbers report efficiency.
              When they look modest next to a growth-stage portfolio, that is the
              right read of the environment, not a limit of the work.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="col">
          <span className="section-label">Case studies</span>
        </div>
        {CASES.map((c, i) => (
          <article className="case reveal-el" key={c.title}>
            <div className="col">
              <div className="case-head">
                <h3>{c.title}</h3>
                <Stamp tone={c.stamp.tone}>{c.stamp.label}</Stamp>
              </div>
              {c.figure ? <ThresholdFigure /> : null}
              {c.diagram === 'nav' ? <NavDiagram /> : null}
              {c.diagram === 'mcp' ? <McpDiagram /> : null}
              <div className="case-body">
                {c.body.map((p) =>
                  p.lead.startsWith('What I take') ? (
                    <div
                      className={
                        p.text.trim().length > 200
                          ? 'takeaway is-long'
                          : 'takeaway'
                      }
                      key={p.lead}
                    >
                      <span className="takeaway-label">{p.lead}</span>
                      <p className="case-takeaway">{p.text.trim()}</p>
                    </div>
                  ) : (
                    <p key={p.lead}>
                      <b>{p.lead}</b>
                      {p.text}
                    </p>
                  ),
                )}
              </div>
              {c.time ? <TimeBar {...c.time} /> : null}
              {i < CASES.length - 1 ? <Curve index={i + 2} /> : null}
            </div>
          </article>
        ))}
      </section>

      <div className="col">
        <Curve index={1} />
      </div>

      <section className="section reveal-el">
        <div className="col">
          <span className="section-label">Selected work</span>
          <ul className="work-list">
            {WORK.map((w) => (
              <li className="work-item" key={w.name}>
                <p className="work-text">
                  <b>{w.name}</b>
                  {' —'}
                  {w.text}
                  {w.links ? (
                    <span className="work-links">
                      {w.links.map((l) => (
                        <a
                          className="work-link"
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          key={l.href}
                        >
                          {l.label}
                        </a>
                      ))}
                    </span>
                  ) : null}
                </p>
                <span className="work-stamps">
                  {w.stamps.map((s) => (
                    <Stamp tone={s.tone} key={s.label}>
                      {s.label}
                    </Stamp>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section reveal-el">
        <div className="col">
          <span className="section-label">Scope</span>
          <div className="scope">
            {SCOPE.map((row) => (
              <div className="scope-row" key={row.key}>
                <p className="scope-key">{row.key}</p>
                <p className="scope-val">
                  {row.value}
                  {row.stamp ? (
                    <Stamp tone={row.stamp.tone}>{row.stamp.label}</Stamp>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="col">
        <Curve index={3} />
      </div>

      <section className="section reveal-el essay">
        <div className="col">
          <span className="section-label">Writing</span>
          <h3>When Not to Build</h3>
          <p className="essay-standfirst">
            Most of the judgement in AI product work is deciding what not to
            automate, and when to wait for the technology instead of building
            around it.
          </p>
          <div className="essay-body">
            {ESSAY.map((para, i) => {
              // Three beats of the argument are set as display type. Same
              // sentences, lifted out of the column so the piece breathes.
              const display = i === 3 || i === 8 || i === 13
              return (
                <p
                  className={
                    i === 0 ? 'lede' : display ? 'essay-display' : undefined
                  }
                  key={para.slice(0, 40)}
                >
                  {para}
                </p>
              )
            })}
          </div>
        </div>
      </section>

      <div className="col">
        <Curve index={2} />
      </div>

      <section className="contact reveal-el">
        <div className="col">
          <span className="section-label">Contact</span>
          <ul className="contact-list">
            <li>
              <a href="mailto:vishaldiwan396@gmail.com">
                vishaldiwan396@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/vishaldiwan396"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/vishaldiwan396
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default App
