import './App.css'

const projects = [
  {
    title: 'Multi-Agent Investment Profiles',
    tags: ['MCP', 'Human-in-the-Loop', 'Claude'],
    description:
      'HITL multi-agent workflow for investment pitches. Custom MCP server grounds every figure to a source record; unsourced claims are held for human review. Cut short-profile creation from 12 hours to 1.5 hours.',
  },
  {
    title: 'Agentic NAV Reconciliation Engine',
    tags: ['RAG', 'Pinecone', 'LLM-as-judge'],
    description:
      'Hybrid rule-based + retrieval-augmented reconciliation across four data feeds. 90% of NAV mismatches clear without human intervention; reconciliation cycle time cut from 4 hours to 30 minutes.',
  },
  {
    title: 'KYC Model Evaluation Harness',
    tags: ['LLM Eval', 'OpenRouter'],
    description:
      'Benchmarked 6 LLMs against a 50-document golden extraction dataset (5,000+ field-level comparisons) to select the production KYC extraction model.',
  },
  {
    title: 'GenAI Compliance Generator',
    tags: ['GPT-4', 'RegTech'],
    description:
      'GenAI-powered KIIDs/PRIIPs generator for UCITS fund compliance. Cut manual drafting time from 2 hours to 30 minutes per document.',
  },
  {
    title: 'E-Shops & AI Personalization Engine',
    tags: ['0-to-1', 'B2B SaaS'],
    description:
      'At SnackMagic (founding team, #8): launched a white-labeled self-service snack store product, and a collaborative-filtering recommendation engine that lifted AOV 22% ($45 → $55).',
  },
]

function App() {
  return (
    <div className="page">
      <header>
        <h1>Vishal Diwan</h1>
        <p className="tagline">
          Senior Technical Product Manager — AI/Agentic Systems, FinTech, RegTech
        </p>
      </header>

      <nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      <main>
        <section id="about">
          <h2>About</h2>
          <p>
            Senior Technical Product Manager and hands-on AI builder, specialized
            in LLM-powered products at fintech and B2B SaaS scale. Founding team
            member (#8) at SnackMagic, contributing to the company's $0 → $20M
            ARR scale in 8 months and $15M Series A. Currently Founding Product
            Manager at EPIC Investment Partners (UK fintech, £3bn+ AUM
            administered) — first PM in the firm's history — leading AI
            platform modernization and P&L strategy.
          </p>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <h3>{project.title}</h3>
                <ul className="tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact">
          <h2>Contact</h2>
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
        </section>
      </main>
    </div>
  )
}

export default App
