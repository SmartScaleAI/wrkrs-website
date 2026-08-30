/**
 * Landing-page copy. Every product claim here is grounded in the wrkrs CLI
 * repository (README.md, architecture.md, mvp.md, decisions.md) and the
 * behavior of `wrkrs init` / `wrkrs check` as implemented.
 */

export const repositoryUrl = "https://github.com/SmartScaleAI/wrkrs";
export const docsUrl = "https://github.com/SmartScaleAI/wrkrs#readme";
export const issuesUrl = "https://github.com/SmartScaleAI/wrkrs/issues";
export const command = "npx wrkrs init";

/** Ordered proof points shown directly under the hero. */
export const proofPoints = [
  "Read-only analysis first",
  "Exact changes shown before install",
  "Nothing written without approval",
  "Open source, MIT licensed",
] as const;

export const steps = [
  {
    number: "01",
    title: "Analyze",
    body: "wrkrs inspects the repository, its stack, existing coding-agent configuration, and project tools. Nothing is written.",
  },
  {
    number: "02",
    title: "Review",
    body: "You see the recommended team, every file it would create or preserve, warnings, and the exact diffs.",
  },
  {
    number: "03",
    title: "Install",
    body: "After you approve, wrkrs writes the files in one transaction with rollback. Existing setup stays byte for byte.",
  },
  {
    number: "04",
    title: "Run",
    body: "Keep working in your coding agent. Start the team with /wrkrs and the outcome you want.",
  },
] as const;

export const additions = [
  {
    title: "A named team",
    body: "Product Manager, Product Designer, Software Engineer, and QA Engineer, each with a focused role.",
  },
  {
    title: "Written responsibilities",
    body: "Each role file states responsibilities, boundaries, collaboration, approval gates, and handoffs.",
  },
  {
    title: "Project-aware specializations",
    body: "Detected stack signals attach specializations to the Software Engineer role, with evidence recorded.",
  },
  {
    title: "One entry point",
    body: "/wrkrs hands an outcome to the Product Manager, which plans, delegates, and reports back for approval.",
  },
  {
    title: "Approval gates",
    body: "Plan, design, owner-testing, and release approvals are configured once and stated in every role.",
  },
  {
    title: "Diagnostics",
    body: "npx wrkrs check validates configuration, roles, ownership, drift, and the adapter without changing anything.",
  },
] as const;

export const workerDefinition =
  "A worker is a configured AI agent with a focused role, instructions, and access to the tools required for that role.";

export const team = [
  {
    id: "product-manager",
    title: "Product Manager",
    primary: true,
    body: "Turns an outcome into an approved, sequenced plan and coordinates the other workers.",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    primary: false,
    body: "Proposes flows, states, and copy that fit the existing product, for approval first.",
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    primary: false,
    body: "Implements the approved plan with tests. One role, as many specialized instances as needed.",
  },
  {
    id: "qa-engineer",
    title: "QA Engineer",
    primary: false,
    body: "Verifies the result against the acceptance criteria and reports evidence, not opinions.",
  },
] as const;

/** Exactly the paths `wrkrs init` creates, with their ownership mode. */
export const installedFiles = [
  { path: ".wrkrs/config.yaml", mode: "seeded", note: "roster, specializations, governance" },
  { path: ".wrkrs/schema.json", mode: "managed", note: "JSON Schema for config.yaml" },
  { path: ".wrkrs/manifest.json", mode: "managed", note: "ownership record with content hashes" },
  { path: ".wrkrs/roles/*.md", mode: "seeded", note: "portable role definitions" },
  { path: ".claude/agents/wrkrs-*.md", mode: "managed", note: "runtime agent projections" },
  { path: ".claude/skills/wrkrs/SKILL.md", mode: "managed", note: "/wrkrs entry point" },
] as const;

export const controls = [
  "Analysis is read-only. Nothing is written before you confirm the plan, or pass --yes explicitly.",
  "The plan shows every file to create, every existing file preserved, and full diffs.",
  "Existing instructions, settings, hooks, agents, skills, commands, and MCP configuration are never edited.",
  "Conflicting paths, symlinks, and unknown .wrkrs state block the install. Nothing is overwritten.",
  "Installs are journaled transactions with precondition rechecks, verification, and rollback.",
  "No permissions are granted or weakened, and nothing is committed, pushed, deployed, published, or released.",
] as const;

export const runtimes = [
  { name: "Claude Code", status: "Supported", supported: true },
  { name: "Cursor", status: "Planned", supported: false },
  { name: "Codex", status: "Planned", supported: false },
] as const;

export const projectFacts = [
  { label: "Source", value: "github.com/SmartScaleAI/wrkrs", href: repositoryUrl },
  { label: "License", value: "MIT" },
  { label: "Command", value: command, code: true },
  { label: "Requires", value: "Node.js 22.12+ and a Git worktree" },
  { label: "Configuration", value: ".wrkrs/ plus the runtime adapter files", code: true },
  { label: "Docs", value: "README", href: docsUrl },
] as const;

export const faq = [
  {
    question: "What is a worker?",
    answer:
      "A configured AI agent with a focused role, instructions, and access to the tools that role needs. Each is defined by a Markdown role file in your repository.",
  },
  {
    question: "Does wrkrs replace my coding agent?",
    answer:
      "No. wrkrs installs configuration; your coding agent runs the team. There is no hosted service, separate chat app, or new place to work.",
  },
  {
    question: "What does wrkrs install?",
    answer:
      "A .wrkrs/ directory (config.yaml, schema.json, manifest.json, role files) plus the runtime adapter files under .claude/. Nothing else.",
  },
  {
    question: "Where does the configuration live?",
    answer:
      "In your repository, versioned with Git. Seeded files are yours to edit; managed files are regenerated from them and tracked by hash in manifest.json.",
  },
  {
    question: "Will it overwrite my existing coding setup?",
    answer:
      "No. Existing instructions, settings, hooks, agents, skills, commands, and MCP configuration stay byte for byte. A conflicting path blocks the install.",
  },
  {
    question: "Can I review changes before installation?",
    answer:
      "Yes. npx wrkrs init shows the plan and full diffs, then waits for confirmation. --dry-run writes nothing; --json emits the plan for scripts.",
  },
  {
    question: "Which coding-agent runtimes are supported?",
    answer:
      "One runtime is supported today and more are planned. The runtime compatibility section above lists them.",
  },
  {
    question: "Is wrkrs open source?",
    answer: "Yes. The CLI is MIT licensed and developed in the open at github.com/SmartScaleAI/wrkrs.",
  },
  {
    question: "Does wrkrs automatically commit, push, or deploy code?",
    answer:
      "No. It writes configuration only after your approval and never commits, pushes, merges, deploys, publishes, or releases. The installed roles carry the same rule.",
  },
  {
    question: "Is wrkrs related to Cloudflare Workers?",
    answer:
      "No. In wrkrs, a worker is a configured AI agent with a role on your development team, not a serverless or edge function. There is no relationship to Cloudflare Workers.",
  },
] as const;
