import { runtimes } from "@/lib/landing-content";
import { cn } from "@/lib/utils";

export function RuntimeList() {
  return (
    <ul className="border-t border-ink">
      {runtimes.map((runtime) => (
        <li
          className={cn(
            "grid min-h-15.5 grid-cols-[1fr_auto] items-center border-b border-line text-[14px]",
            runtime.supported ? "text-ink" : "text-grey-600",
          )}
          key={runtime.name}
        >
          <span>{runtime.name}</span>
          <span
            className={cn(
              "font-mono text-[9px] uppercase",
              runtime.supported &&
                "before:mr-2 before:inline-block before:size-1.5 before:rounded-[50%] before:bg-live before:content-['']",
            )}
          >
            {runtime.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
