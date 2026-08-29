export const workflow = [
  {
    number: "01",
    title: "Plan",
    owner: "Product Manager worker",
    description:
      "Clarifies the outcome, chooses the workers needed, and sets a clear approval gate.",
  },
  {
    number: "02",
    title: "Design",
    owner: "Product Designer worker",
    description:
      "Researches the market, maps the flow, and prepares the design for your review.",
  },
  {
    number: "03",
    title: "Build",
    owner: "Software Engineer workers",
    description:
      "Starts one or more engineer workers, specialized by stack and isolated by task.",
  },
  {
    number: "04",
    title: "Verify",
    owner: "QA Engineer worker",
    description:
      "Tests the result against the approved criteria, not just whether it compiles.",
  },
  {
    number: "05",
    title: "Release",
    owner: "You",
    description:
      "Keeps merge, deployment, and release decisions explicitly in your hands.",
  },
] as const;

export const principles = [
  {
    eyebrow: "Install",
    title: "Add the team safely.",
    body: "The CLI inspects your repository, explains every change, and preserves the Claude agents and configuration you already have.",
  },
  {
    eyebrow: "Configure",
    title: "Workers are plain text.",
    body: "Worker roles, specializations, tools, workflows, and approval rules live in readable files versioned with Git.",
  },
  {
    eyebrow: "Run",
    title: "Stay in your coding agent.",
    body: "Keep using Claude Code locally or in the cloud. Claude runs each worker as an AI agent; wrkrs supplies the team structure.",
  },
] as const;
