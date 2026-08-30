export const workflow = [
  {
    number: "01",
    title: "Plan",
    owner: "Product Manager",
    description:
      "Clarifies the outcome, chooses the agents needed, and sets a clear approval gate.",
  },
  {
    number: "02",
    title: "Design",
    owner: "Product Designer",
    description:
      "Researches the market, maps the flow, and prepares the design for your review.",
  },
  {
    number: "03",
    title: "Build",
    owner: "Software Engineers",
    description:
      "Starts one or more engineers, specialized by stack and isolated by task.",
  },
  {
    number: "04",
    title: "Verify",
    owner: "QA Engineer",
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
    title: "Roles are plain text.",
    body: "Roles, specializations, tools, workflows, and approval rules live in readable files versioned with Git.",
  },
  {
    eyebrow: "Run",
    title: "Stay in your coding agent.",
    body: "Keep using Claude Code locally or in the cloud. Claude runs the agents; wrkrs supplies the team structure.",
  },
] as const;
