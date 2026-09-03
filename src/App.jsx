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
        aria-label="Reconciliation flow: records enter rule lookups. Matches clear outright and need no review, covering 90% of mismatches. Only rule failures escalate to an investigation agent, which flags a likely cause; every one of those goes to a human, and 70% are approved unchanged."
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
          <text x="266" y="191" className="dg-sub">90%, no review</text>
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
          <text x="490" y="191" className="dg-sub">70% approved as-is</text>
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
        viewBox="0 0 620 596"
        role="img"
        aria-label="Two research agents read the Dynamo CRM through a custom MCP server. A collator merges their output into one source of truth, a checker verifies every citation and reviews their flags, and a human approves the content and facts before a presentation agent builds the deck. After QA, a director agent absorbs the feedback and evolves each run."
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
          <rect x="185" y="8" width="250" height="48" />
          <text x="310" y="30">Dynamo CRM via MCP server</text>
          <text x="310" y="47" className="dg-sub">system of record</text>
        </g>

        <g className="dg-edge" data-step="2">
          <polyline points="310,56 310,74 145,74 145,86" markerEnd="url(#mcp-arrow)" />
          <polyline points="310,56 310,74 475,74 475,86" markerEnd="url(#mcp-arrow)" />
        </g>

        <g className="dg-node" data-step="3">
          <rect x="20" y="90" width="250" height="52" />
          <text x="145" y="114">Research agent</text>
          <text x="145" y="131" className="dg-sub">financial detail</text>
        </g>

        <g className="dg-node" data-step="3">
          <rect x="350" y="90" width="250" height="52" />
          <text x="475" y="114">Research agent</text>
          <text x="475" y="131" className="dg-sub">people · Amplify</text>
        </g>

        <g className="dg-edge" data-step="4">
          <polyline points="145,142 145,163 310,163 310,178" markerEnd="url(#mcp-arrow)" />
          <polyline points="475,142 475,163 310,163" />
        </g>

        <g className="dg-node" data-step="5">
          <rect x="185" y="182" width="250" height="52" />
          <text x="310" y="206">Collator</text>
          <text x="310" y="223" className="dg-sub">one source of truth</text>
        </g>

        <g className="dg-edge" data-step="6">
          <line x1="310" y1="234" x2="310" y2="260" markerEnd="url(#mcp-arrow)" />
        </g>

        <g className="dg-node" data-step="7">
          <rect x="185" y="264" width="250" height="52" />
          <text x="310" y="288">Checker</text>
          <text x="310" y="305" className="dg-sub">citations · prior flags</text>
        </g>

        <g className="dg-edge" data-step="8">
          <line x1="310" y1="316" x2="310" y2="342" markerEnd="url(#mcp-arrow)" />
        </g>

        <g className="dg-node is-good" data-step="9">
          <rect x="185" y="346" width="250" height="52" />
          <text x="310" y="370">Human review</text>
          <text x="310" y="387" className="dg-sub">content and facts</text>
        </g>

        <g className="dg-edge" data-step="9">
          <line x1="310" y1="398" x2="310" y2="424" markerEnd="url(#mcp-arrow)" />
          <text x="322" y="416" className="dg-edge-label is-side">approves</text>
        </g>

        <g className="dg-node" data-step="9">
          <rect x="185" y="428" width="250" height="52" />
          <text x="310" y="452">Presentation agent</text>
          <text x="310" y="469" className="dg-sub">builds the deck</text>
        </g>

        <g className="dg-edge" data-step="9">
          <line x1="310" y1="480" x2="310" y2="506" markerEnd="url(#mcp-arrow)" />
          <text x="322" y="498" className="dg-edge-label is-side">after QA</text>
        </g>

        <g className="dg-node" data-step="9">
          <rect x="185" y="510" width="250" height="52" />
          <text x="310" y="534">Director agent</text>
          <text x="310" y="551" className="dg-sub">evolves on feedback</text>
        </g>

        <text x="6" y="584" className="dg-note">
          Every number is verified twice, independently. Unsourced numbers are flagged, not written.
        </text>
      </svg>
      <figcaption>
        Seven stages, one human gate. Nothing reaches a director’s desk that a
        person has not approved, and the last agent absorbs their feedback:
        after roughly thirty runs it carries most of it.
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
    team: 'EPIC Investment Partners · 2024– · 2–3 engineers, 1 designer, 1 QA',
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
        text: ' The eval ran one company’s enquiries over a single month: payroll data for 200+ employees, up to five fields each. The sources were a legacy payroll system, scattered email threads the agent had to scan, and several badly formatted Excel files. No API access, so nothing could be read at source. The 70% pass threshold was fixed in writing before the build started. After a full data-cleanup pass the eval capped at 53%. The failures were not prompt failures: the model was filling gaps because the input frequently did not hold the answer.',
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
        text: ' The threshold did its job. It was fixed before the build, so 53% against 70% was a clear answer rather than a negotiation, and the work was being willing to read it. The expensive lesson sat upstream of the model. Every failure traced back to ingestion: no pipeline, and data arriving scattered across a legacy system, mailboxes and malformed spreadsheets. Ingestion is the deciding factor in AI automation. No amount of prompting or model selection compensates for a pipeline that was never built.',
      },
    ],
  },
  {
    title: 'KYC Extraction: Choosing the Model',
    stamp: { tone: 'delivered', label: 'Delivered' },
    team: 'EPIC Investment Partners \u00b7 2024\u2013 \u00b7 2\u20133 engineers, 1 designer, 1 QA',
    time: {
      label: 'Manual data entry per form',
      beforeLabel: '15 minutes',
      afterLabel: 'under 3 minutes',
      ratio: 0.2,
    },
    body: [
      {
        lead: 'The problem.',
        text: ' KYC forms were keyed in by hand, around fifteen minutes each. Any model could plausibly do the extraction. The question was which one to put into production, and how to know rather than guess.',
      },
      {
        lead: 'How I decided to find out.',
        text: ' A golden dataset, built before any model was chosen: 50 documents, 100+ fields each, scored field by field against the operations team\u2019s own manual extraction. That is 5,000+ field-level comparisons, and it made the question answerable instead of arguable.',
      },
      {
        lead: 'The field.',
        text: ' Six frontier models, benchmarked through OpenRouter \u2014 ChatGPT, Claude Sonnet, Grok, Gemini, Kimi and GLM.',
      },
      {
        lead: 'The decision.',
        text: ' Google Document AI with Gemini Flash. Chosen on cost, effectiveness and accuracy together rather than accuracy alone: at this volume the difference between models is paid every single day, and a marginally better score is not worth an unbounded bill.',
      },
      {
        lead: 'Result.',
        text: ' In production across 12 document types. Capacity went from 30 to 300+ forms a day with no added headcount, and manual entry fell from fifteen minutes a form to under three. Clean-pass runs 90%+ on UK English-language documents and around 70% on German, French and Swiss ones; the rest are handled by hand.',
      },
      {
        lead: 'What I take from it.',
        text: ' Build the golden set before picking the model. Once the scoring is fixed and public, model choice stops being a matter of taste and becomes a matter of arithmetic \u2014 and the arithmetic usually includes a cost column that the benchmark leaderboards leave out.',
      },
    ],
  },
  {
    title: 'Agentic NAV Reconciliation',
    stamp: { tone: 'delivered', label: 'Delivered' },
    team: 'EPIC Investment Partners · 2024– · 2–3 engineers, 1 designer, 1 QA',
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
        text: ' The rules clear 90% of mismatches outright, and those need no review. The remaining 10% are what the agent sees, and every one of them goes to a human: 70% are approved as they stand, without a change. Cycle time went from four hours to thirty minutes. Output quality spot-checked via LLM-as-judge review. These are operational figures from running the system, not a formal audited evaluation.',
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
    team: 'EPIC Investment Partners · 2024– · 2–3 engineers, 1 designer, 1 QA',
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
        text: ' Short investment profiles for multi-million dollar pitches took twelve hours to assemble, with the underlying data sitting in Dynamo, a legacy CRM. The first version ingested that data from a PDF downloaded off the Dynamo site, and hallucinated numbers often enough that the output could not be trusted unread.',
      },
      {
        lead: 'The constraint that shaped everything.',
        text: ' This is a document where a wrong figure is not a formatting error.',
      },
      {
        lead: 'The decision.',
        text: ' I replaced the PDF ingestion with a custom Model Context Protocol server on internal infrastructure, integrating Dynamo over REST against an OpenAPI spec, so the workflow reads from the record rather than from the model’s memory. Two rules carry the rest: every number is pulled and verified twice, independently, and any number without a citation behind it is flagged rather than written. Prompt routing and context-window optimisation cut token usage by around 40%.',
      },
      {
        lead: 'The shape of it.',
        text: ' Two research agents, one for financial detail and one for people, the second wired to Amplify. A collator merges their output into a single source of truth. A checker verifies every citation and reviews the flags the research agents raised. A person then reviews content and facts, and only after that does a presentation agent build the deck. After QA, a director agent takes the directors’ feedback on the finished output; after roughly thirty runs it carries most of it.',
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
    meta: 'EPIC Investment Partners · 2024–',
    text: ' the firm’s AI governance and enablement programme: an eight-module curriculum taking teams from prompting through connectors, research and custom skill-building, alongside a dossier of the twelve AI skills running in production. I defined the operating rule that runs through all of it — AI drafts, a person reviews and approves, and nothing is final until they do.',
    links: [
      { href: 'https://epicipprojects.com/epic-ai-guide/index.html', label: 'Programme' },
      { href: 'https://epicipprojects.com/epic-ai-guide/skills-library.html', label: 'Skills library' },
    ],
    stamps: [{ tone: 'delivered', label: 'Delivered' }],
  },
  {
    name: 'GenAI KIIDs/PRIIPs generator',
    meta: 'EPIC Investment Partners · 2024–',
    text: ' UCITS compliance drafting, 2 hours to 30 minutes per document, across 50+ fund documents.',
    stamps: [{ tone: 'delivered', label: 'Delivered' }],
  },
  {
    name: 'Whittard Analytics Dashboard',
    meta: 'EPIC portfolio company · 2024–',
    text: ' consolidated Island Pacific retail data, WSSI and warehouse Excel into one Databricks source of truth with a LangChain NL-to-SQL layer. Replaced per-team spreadsheets across procurement, warehouse, stores, shipment.',
    stamps: [
      { tone: 'delivered', label: 'Delivered' },
      { tone: 'halted', label: 'TimesFM in development' },
    ],
  },
  {
    name: 'Monolith to microservices',
    meta: 'EPIC Investment Partners · 2024–',
    text: ' legacy PHP to event-driven Node.js, phased zero-downtime. 3× API concurrency, 50 to 150+ concurrent requests.',
    stamps: [{ tone: 'halted', label: 'In progress' }],
  },
  {
    name: 'AppSec and third-party audit',
    meta: 'EPIC Investment Partners · 2024–',
    text: ' established the firm’s first AppSec process; initiated and drove a third-party VAPT and SOC 2 / GDPR review to completion. Critical vulnerabilities 12 to zero over six months.',
    stamps: [{ tone: 'delivered', label: 'Delivered' }],
  },
  {
    name: 'E-Shops',
    meta: 'SnackMagic / Stadium · 2020–24',
    text: ' white-labelled self-service enterprise snack stores, launched 0-to-1. $600K incremental monthly revenue within six months (2024), with 30% adoption among top-tier enterprise accounts.',
    stamps: [{ tone: 'delivered', label: 'Delivered' }],
  },
  {
    name: 'Swag Catalog',
    meta: 'SnackMagic / Stadium · 2020–24',
    text: ' self-service swag configurator and bulk ordering portal: a 3,000+ SKU catalogue, a live logo mockup-and-preview tool, and a warehouse intake flow for customers shipping their own inventory. Delivered to scope and handed to BAU.',
    stamps: [{ tone: 'delivered', label: 'Delivered' }],
  },
  {
    name: 'Swag Locker',
    meta: 'SnackMagic / Stadium · 2020–24',
    text: ' virtual inventory letting recipients store and redeem corporate gifts on demand. 20% lift in engagement and a $300K+ monthly revenue stream (2024).',
    stamps: [{ tone: 'delivered', label: 'Delivered' }],
  },
  {
    name: 'AI Personalization Engine',
    meta: 'SnackMagic / Stadium · 2020–24',
    text: ' collaborative-filtering recommender built from scratch in 12 weeks. AOV $45 to $55, a 22% lift, and $300K incremental monthly revenue (2024) — validated over an 8-week A/B test, 15,000 users per cohort, at 95% confidence.',
    stamps: [{ tone: 'delivered', label: 'Delivered' }],
  },
]

const SCOPE = [
  { key: 'Reporting', value: 'Direct to UK Managing Director. CEO skip-level.' },
  {
    key: 'Team',
    value:
      'Leads a 12-person cross-functional squad. 2 direct reports.',
  },
  {
    key: 'P&L',
    value:
      'Legalads, an EPIC-acquired solicitor SaaS subsidiary. £8M ARR, 1,000+ solicitor firm customers. Mandate to £10M over 18 months.',
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
  'The third rule follows from the second, and I hold it as a principle rather than a war story: sometimes the correct decision is to wait.',
  'The capability curve is steep at the moment. A workflow that today needs six pieces of custom scaffolding to reach an acceptable pass rate may need one, or none, in a year, when the models handle natively what you are currently propping up. Build the elaborate version now and you own it. You will still own it after the capability lands and quietly makes it redundant.',
  'Waiting is not the same as doing nothing. The deterministic system that solves the problem today is not a consolation prize: it is a smaller surface with fewer failure modes, and if the models later get good enough to take more of it, that is a far cleaner thing to extend than a pile of workarounds would have been. I would rather inherit that than a scaffold built to prop up a capability that arrived a year later anyway.',
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
            Employee #8 at a company that had no product team. First PM at a
            fintech that had no product function. What follows is the record.
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
              {c.team ? <p className="case-team">{c.team}</p> : null}
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
                  {w.meta ? <span className="work-meta">{w.meta}</span> : null}
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
