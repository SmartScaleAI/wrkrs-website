export function TerminalChrome({ title }: { title: string }) {
  return (
    <div className="terminal-chrome" aria-hidden="true">
      <div className="traffic-lights">
        <span className="traffic-close" />
        <span className="traffic-minimize" />
        <span className="traffic-expand" />
      </div>
      <span className="terminal-title">{title}</span>
    </div>
  );
}
