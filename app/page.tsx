import Link from "next/link";
import { WrkrsMark } from "@/components/brand/wrkrs-mark";
import { CopyCommand } from "@/components/hero/copy-command";
import { GitHubIcon } from "@/components/icons/github-icon";
import { SetupTerminalAnimation } from "@/components/terminal/setup-terminal-animation";
import { siteDescription, siteUrl } from "@/lib/site";
import {
  additions,
  command,
  controls,
  docsUrl,
  faq,
  installedFiles,
  issuesUrl,
  projectFacts,
  proofPoints,
  repositoryUrl,
  runtimes,
  steps,
  team,
  workerDefinition,
} from "@/lib/landing-content";

const newTab = <span className="sr-only"> (opens in a new tab)</span>;

/** Minimal schema.org description built only from verified facts (no ratings, pricing, or OS claims). */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "wrkrs",
  description: siteDescription,
  url: siteUrl,
  applicationCategory: "DeveloperApplication",
  license: "https://opensource.org/license/mit",
  softwareRequirements: "Node.js 22.12 or newer and Git",
  sameAs: [repositoryUrl],
  author: { "@type": "Organization", name: "SmartScale AI", url: "https://github.com/SmartScaleAI" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <nav className="site-nav" aria-label="Primary">
          <Link className="brand" href="/" aria-label="wrkrs home">
            <WrkrsMark />
            <span>wrkrs</span>
          </Link>
          <div className="nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#installed">What gets installed</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-actions">
            <a className="nav-docs" href={docsUrl} target="_blank" rel="noreferrer">
              Docs{newTab}
            </a>
            <a className="nav-cta" href={repositoryUrl} target="_blank" rel="noreferrer">
              <GitHubIcon />
              GitHub
              <span className="sr-only"> repository (opens in a new tab)</span>
            </a>
          </div>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
      <section className="hero grid-shell" id="top">
        <div className="hero-copy">
          <div className="status-line">
            <span className="status-dot" />
            Open-source CLI
          </div>
          <h1>Install an AI team into any repository.</h1>
          <p className="hero-deck">
            wrkrs is an open-source CLI that installs a small team of configured
            AI agents, called workers, into your repository. Your coding agent
            runs the team from configuration your repo owns.
          </p>
          <div className="hero-actions">
            <CopyCommand command={command} />
            <a className="text-action" href="#installed">
              See what the CLI installs
            </a>
          </div>
        </div>

        <SetupTerminalAnimation />
      </section>

      <section className="signal-strip" aria-label="How wrkrs treats your repository">
        {proofPoints.map((point) => (
          <span key={point}>{point}</span>
        ))}
      </section>

      <section className="section grid-shell" id="how-it-works">
        <div className="section-heading">
          <p className="section-kicker">How it works</p>
          <h2>Analyze, review, install, run.</h2>
          <p>Analysis happens before any write. Installation waits for your approval.</p>
        </div>
        <ol className="steps">
          {steps.map((step) => (
            <li className="step" key={step.number}>
              <span className="step-index">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section section-dark" id="adds">
        <div className="grid-shell">
          <div className="section-heading">
            <p className="section-kicker">The difference</p>
            <h2>What wrkrs adds to your coding agent</h2>
            <p>
              Your coding agent already writes code. wrkrs gives it a team: who
              does what, in what order, and which decisions stay with you.
            </p>
          </div>
          <ul className="feature-grid">
            {additions.map((item) => (
              <li className="feature" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section grid-shell" id="team">
        <div className="section-heading">
          <p className="section-kicker">Example team</p>
          <h2>A recommended team, not a fixed one.</h2>
          <p>
            <strong>{workerDefinition}</strong> wrkrs recommends this roster for
            your repository and attaches the specializations it detects, such as
            TypeScript or Apple platforms. Edit any of it in <code>.wrkrs/</code>.
          </p>
        </div>
        <ul className="feature-grid team-grid">
          {team.map((role) => (
            <li className="feature" key={role.id}>
              <span className="role-id">
                {role.id}
                {role.primary ? <em>primary</em> : null}
              </span>
              <h3>{role.title}</h3>
              <p>{role.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section split grid-shell" id="installed">
        <div className="section-heading">
          <p className="section-kicker">What gets installed</p>
          <h2>Plain files, owned by your repository.</h2>
          <p>
            <code>npx wrkrs init</code> creates these paths and nothing else.
            Seeded files are yours to edit; managed files are regenerated from
            them and tracked by hash in the manifest.
          </p>
          <p className="canonical">
            wrkrs installs the team. Your coding agent runs it. Your repo owns
            the configuration.
          </p>
        </div>
        <div className="code-window">
          <div className="code-window-bar">
            <span>npx wrkrs init · planned paths</span>
            <span className="code-state">12 files created · 0 modified</span>
          </div>
          <ul className="file-tree">
            {installedFiles.map((file) => (
              <li key={file.path}>
                <code>{file.path}</code>
                <span className={`file-mode ${file.mode}`}>{file.mode}</span>
                <span className="file-note">{file.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section grid-shell" id="control">
        <div className="section-heading">
          <p className="section-kicker">Control and safety</p>
          <h2>You approve every write.</h2>
        </div>
        <ul className="control-list">
          {controls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section split grid-shell" id="runtimes">
        <div className="section-heading">
          <p className="section-kicker">Runtimes</p>
          <h2>Runtime compatibility</h2>
          <p>
            Claude Code is currently the supported runtime. Additional
            coding-agent runtimes are planned.
          </p>
        </div>
        <ul className="runtime-list">
          {runtimes.map((runtime) => (
            <li className={runtime.supported ? "runtime-row available" : "runtime-row"} key={runtime.name}>
              <span>{runtime.name}</span>
              <span>{runtime.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section split grid-shell" id="open-source">
        <div className="section-heading">
          <p className="section-kicker">Open source</p>
          <h2>Built in the open.</h2>
          <p>The CLI, role templates, and design documents live in one public repository.</p>
        </div>
        <dl className="facts">
          {projectFacts.map((fact) => (
            <div className="fact" key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>
                {"href" in fact ? (
                  <a href={fact.href} target="_blank" rel="noreferrer">
                    {fact.value}
                    {newTab}
                  </a>
                ) : "code" in fact ? (
                  <code>{fact.value}</code>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section grid-shell" id="faq">
        <div className="section-heading">
          <p className="section-kicker">FAQ</p>
          <h2>Before you run it.</h2>
        </div>
        <div className="faq-list">
          {faq.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta grid-shell" id="install">
        <div className="final-mark"><WrkrsMark /></div>
        <p className="section-kicker">Try it</p>
        <h2>Install the team in your repository.</h2>
        <p>Review the plan, approve the install, and keep working in your coding agent.</p>
        <CopyCommand command={command} className="hero-command cta-command" />
        <div className="cta-links">
          <a href={repositoryUrl} target="_blank" rel="noreferrer">
            View on GitHub{newTab}
          </a>
          <a href={docsUrl} target="_blank" rel="noreferrer">
            Read the docs{newTab}
          </a>
        </div>
      </section>
      </main>

      <footer className="site-footer">
        <Link className="brand" href="/" aria-label="wrkrs home">
          <WrkrsMark />
          <span>wrkrs</span>
        </Link>
        <p>An open-source AI team framework and CLI.</p>
        <div className="footer-links">
          <a href={repositoryUrl} target="_blank" rel="noreferrer">
            GitHub{newTab}
          </a>
          <a href={docsUrl} target="_blank" rel="noreferrer">
            Docs{newTab}
          </a>
          <a href={issuesUrl} target="_blank" rel="noreferrer">
            Issues{newTab}
          </a>
          <span className="mono-label">MIT · © 2026</span>
        </div>
      </footer>
    </>
  );
}
