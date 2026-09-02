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
    <svg
      className="curve reveal-el"
      viewBox="0 0 1200 44"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={CURVES[index % CURVES.length]} />
    </svg>
  )
}

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

    const onScroll = () => {
      const bar = progressRef.current
      if (!bar) return
      const max = document.body.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      bar.style.transform = `scaleX(${p})`
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
              <div className="case-body">
                {c.body.map((p) => (
                  <p key={p.lead}>
                    <b>{p.lead}</b>
                    {p.text}
                  </p>
                ))}
              </div>
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
            {ESSAY.map((para, i) => (
              <p className={i === 0 ? 'lede' : undefined} key={para.slice(0, 40)}>
                {para}
              </p>
            ))}
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
