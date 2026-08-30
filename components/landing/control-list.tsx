import { controls } from "@/lib/landing-content";

export function ControlList() {
  return (
    <ul className="mt-7 grid grid-cols-1 gap-x-12 border-t border-ink md:mt-9 md:grid-cols-[1fr_1fr]">
      {controls.map((item) => (
        <li
          className="relative max-w-none border-b border-line py-3.5 pl-7 text-[13.5px] leading-[1.6] text-grey-800 before:absolute before:top-[15px] before:left-0 before:font-mono before:text-[12px] before:text-check before:content-['✓'] md:max-w-[500px]"
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
