/**
 * Data model for the hero terminal animation.
 *
 * The transcript is a flat, ordered list of script entries. Each entry describes
 * one rendered line plus its timing. `compileFrames` turns that list into a
 * deterministic timeline of frames; the component only ever advances a single
 * frame index, so there is one timer at a time and no ad-hoc intervals.
 */

export type TerminalLine =
  /** A shell prompt followed by a command the "user" types. */
  | { kind: "command"; command: string }
  /** An idle shell prompt with a caret and nothing typed. */
  | { kind: "prompt" }
  /** An empty line between a command and its output, or between commands. */
  | { kind: "blank" }
  /** The CLI banner: `┌ wrkrs v0.1.0`. */
  | { kind: "banner"; name: string; version: string }
  /** A `│` connector line that separates groups of output. */
  | { kind: "spacer" }
  /** A completed step: `◇ Project detected`. */
  | { kind: "step"; text: string; note?: string }
  /** A detail line under a step: `│ Swift · GitHub Actions`. */
  | { kind: "detail"; text: string }
  /** One line of the installation plan: `│ ADD  .wrkrs/config.yaml`. */
  | { kind: "plan"; action: "PRESERVE" | "ADD"; path: string }
  /** The confirmation prompt: `? Apply these changes? (y/N) y`. */
  | { kind: "confirm"; question: string; hint: string; answer: string }
  /** A validation result: `✓ Configuration valid`. */
  | { kind: "check"; text: string }
  /** The closing line of a command: `└ Installation complete`. */
  | { kind: "end"; text: string };

export interface LineTiming {
  /** Milliseconds between the previous entry settling and this line appearing. */
  delay: number;
  /** Extra milliseconds to linger once this line is on screen (important moments). */
  hold?: number;
}

export interface TypedTiming {
  /** Milliseconds the prompt sits with an empty caret before typing starts. */
  idle: number;
  /** Milliseconds between the last typed character and the simulated Enter key. */
  enter: number;
}

export type TypedLine = Extract<TerminalLine, { kind: "command" | "confirm" }>;
export type StaticLine = Exclude<TerminalLine, TypedLine>;

export type ScriptEntry =
  | (TypedLine & LineTiming & TypedTiming)
  | (StaticLine & LineTiming);

export interface TerminalFrame {
  /** Number of script entries rendered in full. */
  lines: number;
  /** When set, `script[lines]` is being typed and this many characters are visible. */
  typed?: number;
  /** The transcript is fading out before the loop restarts. */
  clearing?: boolean;
  /** How long this frame stays on screen before the next one. */
  duration: number;
}

/** How long the completed session stays on screen before the loop clears it. */
export const FINAL_HOLD_MS = 3800;

/** Length of the fade that clears the screen before the loop restarts. */
export const CLEAR_DURATION_MS = 450;

/** Fixed per-keystroke cadence. Deterministic on purpose: no randomness at render time. */
const KEY_DELAYS_MS = [72, 96, 58, 110, 78, 64, 92, 70, 84, 60] as const;

const keyDelay = (index: number) => KEY_DELAYS_MS[index % KEY_DELAYS_MS.length];

/**
 * The approved `wrkrs` installation flow, as it plays in the hero terminal.
 * Nothing is written before the confirmation prompt is answered.
 */
export const setupScript: readonly ScriptEntry[] = [
  { kind: "command", command: "npx wrkrs init", delay: 0, idle: 600, enter: 320 },
  { kind: "blank", delay: 0 },
  { kind: "banner", name: "wrkrs", version: "v0.1.0", delay: 420 },
  { kind: "spacer", delay: 90 },

  { kind: "step", text: "Git worktree resolved", delay: 260 },
  { kind: "detail", text: "SmartScaleAI/Zerro", delay: 110 },
  { kind: "spacer", delay: 0, hold: 520 },

  { kind: "step", text: "Project detected", delay: 340 },
  { kind: "detail", text: "Swift · GitHub Actions", delay: 110 },
  { kind: "spacer", delay: 0, hold: 520 },

  { kind: "step", text: "Coding agent configuration detected", delay: 300 },
  { kind: "detail", text: "CLAUDE.md · .claude/settings.json · 3 existing agents", delay: 110 },
  { kind: "spacer", delay: 0, hold: 420 },

  { kind: "step", text: "Worker roster proposed", delay: 300 },
  { kind: "detail", text: "Product Manager · Product Designer · Software Engineer · QA Engineer", delay: 110 },
  { kind: "detail", text: "Software Engineer specialization: macOS / Swift", delay: 110 },
  { kind: "spacer", delay: 0, hold: 520 },

  { kind: "step", text: "Installation plan", note: "(no files changed)", delay: 320 },
  { kind: "plan", action: "PRESERVE", path: "CLAUDE.md", delay: 70 },
  { kind: "plan", action: "PRESERVE", path: "existing .claude configuration", delay: 60 },
  { kind: "plan", action: "ADD", path: ".wrkrs/config.yaml", delay: 60 },
  { kind: "plan", action: "ADD", path: ".wrkrs/schema.json", delay: 60 },
  { kind: "plan", action: "ADD", path: ".wrkrs/manifest.json", delay: 60 },
  { kind: "plan", action: "ADD", path: ".wrkrs/roles/*.md", delay: 60 },
  { kind: "plan", action: "ADD", path: ".claude/agents/wrkrs-*.md", delay: 60 },
  { kind: "plan", action: "ADD", path: ".claude/skills/wrkrs/SKILL.md", delay: 60 },
  { kind: "spacer", delay: 0, hold: 1300 },

  { kind: "confirm", question: "Apply these changes?", hint: "(y/N)", answer: "y", delay: 160, idle: 1200, enter: 450 },
  { kind: "blank", delay: 0 },

  { kind: "step", text: "Preconditions rechecked", delay: 320 },
  { kind: "step", text: "Configuration written", delay: 280 },
  { kind: "step", text: "Runtime adapter installed", delay: 280 },
  { kind: "step", text: "Ownership manifest recorded", delay: 240 },
  { kind: "end", text: "Installation complete", delay: 200 },
  { kind: "blank", delay: 0, hold: 500 },

  { kind: "command", command: "npx wrkrs check", delay: 0, idle: 500, enter: 320 },
  { kind: "blank", delay: 0 },

  { kind: "check", text: "Configuration valid", delay: 420 },
  { kind: "check", text: "Worker roles valid", delay: 160 },
  { kind: "check", text: "Runtime adapter valid", delay: 160 },
  { kind: "check", text: "Ownership manifest valid", delay: 160 },
  { kind: "end", text: "Ready. Open your coding agent and start with the Product Manager worker.", delay: 260 },
  { kind: "blank", delay: 0 },

  { kind: "prompt", delay: 0, hold: FINAL_HOLD_MS },
];

/**
 * Compiles a script into a timeline of frames. Typed entries expand into one
 * frame per keystroke; every other entry becomes a single frame. Frames that
 * would last 0 ms are dropped, so lines with no delay appear together with the
 * line before them.
 */
export function compileFrames(script: readonly ScriptEntry[]): TerminalFrame[] {
  const frames: TerminalFrame[] = [];

  script.forEach((entry, index) => {
    if (entry.kind === "command" || entry.kind === "confirm") {
      const text = entry.kind === "command" ? entry.command : entry.answer;
      frames.push({ lines: index, typed: 0, duration: entry.idle });
      for (let count = 1; count <= text.length; count += 1) {
        frames.push({
          lines: index,
          typed: count,
          duration: count === text.length ? entry.enter : keyDelay(count),
        });
      }
    }

    const next = script[index + 1];
    frames.push({ lines: index + 1, duration: (entry.hold ?? 0) + (next?.delay ?? 0) });
  });

  frames.push({ lines: script.length, clearing: true, duration: CLEAR_DURATION_MS });

  return frames.filter((frame) => frame.duration > 0);
}

export const setupTerminalFrames: readonly TerminalFrame[] = compileFrames(setupScript);

/** The frame showing the complete session: the initial render and the reduced-motion state. */
export const FINAL_FRAME_INDEX = setupTerminalFrames.findIndex(
  (frame) => frame.lines === setupScript.length && !frame.clearing,
);

/** Total length of one loop, in milliseconds. */
export const LOOP_DURATION_MS = setupTerminalFrames.reduce((total, frame) => total + frame.duration, 0);

/** One concise description of the whole sequence for assistive technology. */
export const setupTerminalDescription =
  "Terminal animation showing npx wrkrs init inspecting the Zerro repository, proposing four AI workers, " +
  "preserving existing coding-agent configuration, waiting for approval, installing repository-owned files, " +
  "and validating the setup with npx wrkrs check.";
