import { WrkrsMark } from "@/components/brand/wrkrs-mark";
import { TerminalChrome } from "@/components/terminal/terminal-chrome";
import { principles, workflow } from "@/lib/landing-content";

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="wrkrs home">
          <WrkrsMark />
          <span>wrkrs</span>
        </a>
        <div className="nav-links">
          <a href="#how-it-works">CLI</a>
          <a href="#workflow">Worker model</a>
          <a href="#open-source">Open source</a>
        </div>
        <a className="nav-cta" href="#install">
          Get started <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="hero grid-shell" id="top">
        <div className="hero-copy">
          <div className="status-line">
            <span className="status-dot" />
            Open-source CLI · Workers are AI agents
          </div>
          <h1>Install an AI team into any repository.</h1>
          <p className="hero-deck">
            wrkrs is a CLI that adds a small development team to your existing
            codebase. Each <strong>worker</strong> is an AI agent with a clear role,
            the right expertise, and approval rules you control.
          </p>
          <div className="hero-actions">
            <a className="hero-command" href="#how-it-works">
              <span>$</span>
              <code>npx wrkrs init</code>
              <span aria-hidden="true">→</span>
            </a>
            <a className="text-action" href="#configuration">
              See what the CLI installs
            </a>
          </div>
        </div>

        <div className="terminal-visual" aria-label="A macOS terminal running wrkrs inside the Zerro repository">
          <TerminalChrome title="zerro — zsh — 118×32" />
          <div className="terminal-screen terminal-screen-hero">
            <div className="shell-prompt">
              <span className="prompt-user">colin@MacBook-Pro</span>{" "}
              <span className="prompt-path">zerro</span>{" "}
              <span className="prompt-mark">%</span>{" "}
              <strong>npx wrkrs init</strong>
            </div>

            <div className="terminal-output terminal-output-hero">
              <div className="terminal-row"><span className="tree">┌</span><p><b>wrkrs</b> <span className="terminal-dim">v0.1.0</span></p></div>
              <div className="terminal-row terminal-spacer"><span className="tree">│</span><p /></div>
              <div className="terminal-row"><span className="terminal-green">◇</span><p>Project detected</p></div>
              <div className="terminal-row terminal-detail"><span className="tree">│</span><p>SmartScaleAI/Zerro · Swift · GitHub Actions</p></div>
              <div className="terminal-row terminal-spacer"><span className="tree">│</span><p /></div>
              <div className="terminal-row"><span className="terminal-amber">◆</span><p>Existing Claude Code configuration found</p></div>
              <div className="terminal-row terminal-detail"><span className="tree">│</span><p>CLAUDE.md · .claude/settings.json · 3 existing agents</p></div>
              <div className="terminal-row terminal-spacer"><span className="tree">│</span><p /></div>
              <div className="terminal-row"><span className="terminal-green">◇</span><p>Worker roster proposed</p></div>
              <div className="terminal-row terminal-detail"><span className="tree">│</span><p>Product Manager · Designer · Engineer · QA</p></div>
              <div className="terminal-row terminal-spacer"><span className="tree">│</span><p /></div>
              <div className="terminal-row"><span className="terminal-green">◇</span><p>Installation plan <span className="terminal-dim">(no files changed)</span></p></div>
              <div className="terminal-plan-row"><span className="tree">│</span><b className="plan-keep">KEEP</b><code>CLAUDE.md</code></div>
              <div className="terminal-plan-row"><span className="tree">│</span><b className="plan-reuse">REUSE</b><code>.claude/agents/swift-engineer.md</code></div>
              <div className="terminal-plan-row"><span className="tree">│</span><b className="plan-merge">MERGE</b><code>.claude/settings.json</code></div>
              <div className="terminal-plan-row"><span className="tree">│</span><b className="plan-add">ADD</b><code>.wrkrs/</code></div>
              <div className="terminal-row terminal-spacer"><span className="tree">│</span><p /></div>
              <div className="terminal-row"><span className="terminal-green">└</span><p>Ready. Run again with <code>--apply</code> to install.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Product attributes">
        <span>Command-line installer</span>
        <span>Workers = AI agents</span>
        <span>One engineer role</span>
        <span>Many specialized instances</span>
      </section>

      <section className="how-section grid-shell" id="how-it-works">
        <div className="how-heading">
          <p className="section-kicker">How the CLI works</p>
          <h2>From existing repo to a team of workers.</h2>
          <p>
            Workers are simply AI agents configured with a role, expertise,
            tools, and guardrails. wrkrs sets them up and gets out of the way.
          </p>
        </div>
        <div className="how-grid">
          <article className="how-card">
            <div className="how-number">01</div>
            <div className="mini-cli visual-surface">
              <TerminalChrome title="your-repository — zsh" />
              <div className="mini-terminal-screen">
                <div className="mini-shell-prompt">
                  <span>colin@MacBook-Pro</span> your-repository % <strong>npx wrkrs init</strong>
                </div>
                <div className="mini-output">
                  <p><span>┌</span><b>wrkrs</b> <i>v0.1.0</i></p>
                  <p><em>◇</em> Repository detected</p>
                  <p className="mini-detail"><span>│</span> Next.js · TypeScript · GitHub</p>
                  <p><em>◇</em> Claude Code detected</p>
                  <p className="mini-detail"><span>│</span> 2 existing agents found</p>
                  <p><em>└</em> Preparing team configuration…</p>
                </div>
              </div>
            </div>
            <h3>Run it inside your repo.</h3>
            <p>The CLI detects your stack, current Claude setup, and available project tools.</p>
          </article>

          <article className="how-card">
            <div className="how-number">02</div>
            <div className="mini-install-diff visual-surface">
              <TerminalChrome title="your-repository — zsh" />
              <div className="mini-terminal-screen diff-terminal-screen">
                <div className="mini-shell-prompt">
                  <span>colin@MacBook-Pro</span> your-repository % <strong>npx wrkrs init --dry-run</strong>
                </div>
                <p className="install-plan-label">INSTALL PLAN</p>
                <div className="diff-line"><b className="plan-keep">KEEP</b><code>CLAUDE.md</code></div>
                <div className="diff-line"><b className="plan-reuse">REUSE</b><code>.claude/agents/swift-engineer.md</code></div>
                <div className="diff-line"><b className="plan-merge">MERGE</b><code>.claude/settings.json</code></div>
                <div className="diff-line"><b className="plan-add">ADD</b><code>.wrkrs/</code></div>
                <div className="confirm-prompt"><span>?</span> Apply these changes? <b>(y/N)</b><i /></div>
              </div>
            </div>
            <h3>Review every change.</h3>
            <p>wrkrs shows exactly what it will add, merge, preserve, or reuse before touching files.</p>
          </article>

          <article className="how-card">
            <div className="how-number">03</div>
            <div className="mini-runtime visual-surface">
              <TerminalChrome title="your-repository — claude" />
              <div className="mini-terminal-screen claude-terminal-screen">
                <div className="claude-heading"><span>✻</span><b>Claude Code</b><small>~/code/your-repository</small></div>
                <div className="claude-rule" />
                <div className="claude-command"><span>›</span><p>/wrkrs:feature Add search to history</p></div>
                <div className="claude-response">
                  <span>✦</span>
                  <div><strong>Product Manager worker</strong><p>I’ll inspect the repository and prepare a plan before implementation.</p></div>
                </div>
                <div className="claude-status"><span>Loaded from repository</span><code>.wrkrs/team.yaml</code></div>
              </div>
            </div>
            <h3>Keep using Claude Code.</h3>
            <p>Start features inside your existing coding agent. Claude runs the workers defined in your repo.</p>
          </article>
        </div>
      </section>

      <section className="statement grid-shell">
        <p className="section-kicker">Not another platform</p>
        <h2>No dashboard. No new workspace. No proprietary runtime.</h2>
        <p>
          wrkrs configures workers; it does not host or replace your coding
          agent. Your code stays in Git, your work stays in Claude Code, and
          your project data stays in the tools you already chose.
        </p>
      </section>

      <section className="principles grid-shell" aria-label="wrkrs principles">
        {principles.map((principle, index) => (
          <article className="principle" key={principle.eyebrow}>
            <div className="principle-head">
              <span className="mono-label">0{index + 1}</span>
              <span>{principle.eyebrow}</span>
            </div>
            <h3>{principle.title}</h3>
            <p>{principle.body}</p>
          </article>
        ))}
      </section>

      <section className="workflow-section" id="workflow">
        <div className="grid-shell workflow-intro">
          <p className="section-kicker">The worker model</p>
          <h2>Workers are AI agents, organized like a small development team.</h2>
          <p>
            Roles define responsibility. Specializations add expertise. Worker
            instances perform the work. Claude Code runs the agents underneath.
          </p>
        </div>

        <div className="worker-model grid-shell">
          <div className="worker-definition" aria-label="A worker is a configured AI agent">
            <div>
              <span>wrkrs term</span>
              <strong>Worker</strong>
            </div>
            <span className="definition-equals" aria-hidden="true">=</span>
            <div>
              <span>Under the hood</span>
              <strong>AI agent</strong>
            </div>
            <span className="definition-plus" aria-hidden="true">+</span>
            <div>
              <span>Project context</span>
              <strong>Role + expertise</strong>
            </div>
          </div>

          <div className="worker-crew" aria-label="A Product Manager starting three specialized Software Engineer workers">
            <div className="crew-head">
              <span className="mono-label">Example task crew</span>
              <span>4 active workers · 4 AI agents</span>
            </div>

            <div className="lead-worker-card">
              <div className="worker-id">PM</div>
              <div>
                <span className="worker-type">Worker · AI agent</span>
                <strong>Product Manager</strong>
                <small>Plans, delegates, and coordinates handoffs</small>
              </div>
              <span className="worker-state">Coordinating</span>
            </div>

            <div className="crew-branch">
              <span>starts only the engineer workers this task needs</span>
            </div>

            <div className="engineer-workers">
              <article>
                <div className="worker-card-top"><span>worker-01</span><i>AI agent</i></div>
                <strong>Software Engineer</strong>
                <small>macOS · Swift</small>
                <p>Owns the native app changes.</p>
              </article>
              <article>
                <div className="worker-card-top"><span>worker-02</span><i>AI agent</i></div>
                <strong>Software Engineer</strong>
                <small>Web · TypeScript</small>
                <p>Owns the web experience.</p>
              </article>
              <article>
                <div className="worker-card-top"><span>worker-03</span><i>AI agent</i></div>
                <strong>Software Engineer</strong>
                <small>Backend · Supabase</small>
                <p>Owns the service changes.</p>
              </article>
            </div>

            <p className="crew-note">
              <strong>One Software Engineer role. As many workers as the task needs.</strong>
              Each instance shares the same responsibility, receives only the context relevant to its assignment, and can run in parallel when the work is independent.
            </p>
          </div>
        </div>

        <div className="workflow-grid">
          {workflow.map((step) => (
            <article className="workflow-step" key={step.number}>
              <span className="step-number">{step.number}</span>
              <div className="step-copy">
                <span className="step-owner">{step.owner}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="config-section grid-shell" id="configuration">
        <div className="config-copy">
          <p className="section-kicker">Portable by default</p>
          <h2>The workers live with the project.</h2>
          <p>
            A worker is just an agent configured from plain files in your
            repository—not a character or setting trapped inside one platform.
          </p>
          <ul className="check-list">
            <li><span>01</span> Review every file before installation</li>
            <li><span>02</span> Preserve existing Claude configuration</li>
            <li><span>03</span> Update or uninstall only what wrkrs owns</li>
          </ul>
        </div>

        <div className="code-window">
          <div className="code-window-bar">
            <span>.wrkrs/team.yaml</span>
            <span className="code-state">Committed</span>
          </div>
          <pre>
            <code>
              <span className="code-muted">team:</span>{"\n"}
              {"  "}<span className="code-key">lead:</span> product-manager{"\n"}
              {"  "}<span className="code-key">worker_roles:</span>{"\n"}
              {"    "}- product-designer{"\n"}
              {"    "}- software-engineer{"\n"}
              {"    "}- qa-engineer{"\n\n"}
              <span className="code-muted">software_engineer:</span>{"\n"}
              {"  "}<span className="code-key">instances:</span> dynamic{"\n"}
              {"  "}<span className="code-key">specializations:</span>{"\n"}
              {"    "}- macos-swift{"\n"}
              {"    "}- web-frontend{"\n"}
              {"    "}- backend{"\n\n"}
              <span className="code-muted">approval:</span> [plan, merge, release]
            </code>
          </pre>
        </div>
      </section>

      <section className="install-safety grid-shell">
        <div className="install-report">
          <div className="report-head">
            <span className="mono-label">INSTALL PREVIEW</span>
            <span>No files changed</span>
          </div>
          <div className="report-row">
            <span className="report-action keep">KEEP</span>
            <code>CLAUDE.md</code>
            <span>Existing instructions preserved</span>
          </div>
          <div className="report-row">
            <span className="report-action merge">MERGE</span>
            <code>.claude/settings.json</code>
            <span>2 namespaced entries</span>
          </div>
          <div className="report-row">
            <span className="report-action reuse">REUSE</span>
            <code>swift-engineer.md</code>
            <span>Software Engineer + macOS/Swift</span>
          </div>
          <div className="report-row">
            <span className="report-action add">ADD</span>
            <code>.wrkrs/</code>
            <span>Portable team configuration</span>
          </div>
        </div>
        <div className="safety-copy">
          <p className="section-kicker">Adds without taking over</p>
          <h2>Your repository stays yours.</h2>
          <p>
            wrkrs inspects first, explains every change, and stops when it
            cannot merge safely. Existing Claude agents can be reused as
            workers instead of replaced.
          </p>
        </div>
      </section>

      <section className="runtime-section grid-shell" id="open-source">
        <div>
          <p className="section-kicker">Open, not locked in</p>
          <h2>Claude Code today. Your runtime tomorrow.</h2>
        </div>
        <div className="runtime-list">
          <div className="runtime-row available">
            <span>Claude Code</span>
            <span>First runtime</span>
          </div>
          <div className="runtime-row">
            <span>Cursor</span>
            <span>Adapter planned</span>
          </div>
          <div className="runtime-row">
            <span>Codex</span>
            <span>Adapter planned</span>
          </div>
          <div className="runtime-row">
            <span>Your runtime</span>
            <span>Open adapter spec</span>
          </div>
        </div>
      </section>

      <section className="final-cta grid-shell" id="install">
        <div className="final-mark"><WrkrsMark /></div>
        <p className="section-kicker">Workers, not another workspace</p>
        <h2>Give your AI agents a real team structure.</h2>
        <p>
          Install reusable roles. Start only the workers each task needs.
        </p>
        <div className="command-line">
          <span className="prompt">$</span>
          <code>npx wrkrs init</code>
          <span className="command-note">Private alpha</span>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#top">
          <WrkrsMark />
          <span>wrkrs</span>
        </a>
        <p>Workers are AI agents, configured as a team.</p>
        <span className="mono-label">© 2026</span>
      </footer>
    </main>
  );
}
