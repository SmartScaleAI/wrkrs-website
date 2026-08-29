"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { TerminalChrome } from "@/components/terminal/terminal-chrome";
import {
  FINAL_FRAME_INDEX,
  setupScript,
  setupTerminalDescription,
  setupTerminalFrames,
  type ScriptEntry,
} from "@/components/terminal/setup-terminal-script";

const PROMPT_USER = "colin@MacBook-Pro";
const PROMPT_PATH = "zerro";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerReducedMotion = () => false;

function subscribeToDocumentVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

const getDocumentVisible = () => document.visibilityState === "visible";
const getServerDocumentVisible = () => true;

/**
 * The hero terminal: a looping, data-driven replay of `npx wrkrs init` and
 * `npx wrkrs check`. The server renders the completed session; on the client the
 * loop clears that state and replays from the first keystroke. Playback pauses
 * while the terminal is off screen or the tab is hidden, and never starts when
 * the visitor prefers reduced motion.
 */
export function SetupTerminalAnimation() {
  const visualRef = useRef<HTMLDivElement>(null);
  const [frameIndex, setFrameIndex] = useState(FINAL_FRAME_INDEX);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const documentVisible = useSyncExternalStore(
    subscribeToDocumentVisibility,
    getDocumentVisible,
    getServerDocumentVisible,
  );
  const playing = inView && documentVisible && !reducedMotion;

  useEffect(() => {
    const element = visualRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[entries.length - 1].isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setFrameIndex((index) => (index + 1) % setupTerminalFrames.length);
    }, setupTerminalFrames[frameIndex].duration);
    return () => window.clearTimeout(timer);
  }, [playing, frameIndex]);

  const frame = setupTerminalFrames[reducedMotion ? FINAL_FRAME_INDEX : frameIndex];
  const committed = setupScript.slice(0, frame.lines);
  const typing = frame.typed === undefined ? null : setupScript[frame.lines];

  return (
    <div
      ref={visualRef}
      className="terminal-visual"
      role="img"
      aria-label={setupTerminalDescription}
    >
      <TerminalChrome title="zerro — zsh — 118×32" />
      <div className="terminal-screen terminal-screen-hero">
        <div className={frame.clearing ? "terminal-buffer is-clearing" : "terminal-buffer"}>
          {committed.map((entry, index) => (
            <TerminalLine key={index} entry={entry} />
          ))}
          {typing ? <TerminalLine entry={typing} typed={frame.typed} /> : null}
        </div>
      </div>
    </div>
  );
}

function TerminalLine({ entry, typed }: { entry: ScriptEntry; typed?: number }) {
  switch (entry.kind) {
    case "command":
      return (
        <ShellPrompt>
          <strong>{typed === undefined ? entry.command : entry.command.slice(0, typed)}</strong>
          {typed === undefined ? null : <Caret idle={typed === 0} />}
        </ShellPrompt>
      );
    case "prompt":
      return (
        <ShellPrompt>
          <Caret idle />
        </ShellPrompt>
      );
    case "blank":
      return <div className="terminal-blank" />;
    case "banner":
      return (
        <div className="terminal-row">
          <span className="tree">┌</span>
          <p>
            <b>{entry.name}</b> <span className="terminal-dim">{entry.version}</span>
          </p>
        </div>
      );
    case "spacer":
      return (
        <div className="terminal-row terminal-spacer">
          <span className="tree">│</span>
          <p />
        </div>
      );
    case "step":
      return (
        <div className="terminal-row">
          <span className="terminal-green">◇</span>
          <p>
            {entry.text}
            {entry.note ? <> <span className="terminal-dim">{entry.note}</span></> : null}
          </p>
        </div>
      );
    case "detail":
      return (
        <div className="terminal-row terminal-detail">
          <span className="tree">│</span>
          <p>{entry.text}</p>
        </div>
      );
    case "plan":
      return (
        <div className="terminal-plan-row">
          <span className="tree">│</span>
          <b className={entry.action === "ADD" ? "plan-add" : "plan-preserve"}>{entry.action}</b>
          <code>{entry.path}</code>
        </div>
      );
    case "confirm":
      return (
        <div className="terminal-row">
          <span className="terminal-amber">?</span>
          <p>
            {entry.question} <span className="terminal-dim">{entry.hint}</span>{" "}
            <strong>{typed === undefined ? entry.answer : entry.answer.slice(0, typed)}</strong>
            {typed === undefined ? null : <Caret idle={typed === 0} />}
          </p>
        </div>
      );
    case "check":
      return (
        <div className="terminal-row">
          <span className="terminal-green">✓</span>
          <p>{entry.text}</p>
        </div>
      );
    case "end":
      return (
        <div className="terminal-row">
          <span className="terminal-green">└</span>
          <p>{entry.text}</p>
        </div>
      );
  }
}

function ShellPrompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell-prompt">
      <span className="prompt-user">{PROMPT_USER}</span>{" "}
      <span className="prompt-path">{PROMPT_PATH}</span>{" "}
      <span className="prompt-mark">%</span>{" "}
      {children}
    </div>
  );
}

function Caret({ idle }: { idle: boolean }) {
  return <span className={idle ? "terminal-caret is-idle" : "terminal-caret"} />;
}
