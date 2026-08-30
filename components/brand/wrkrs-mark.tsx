import {
  WRKRS_SYMBOL_PATH,
  WRKRS_SYMBOL_TRANSFORM,
  WRKRS_SYMBOL_VIEW_BOX,
} from "@/components/brand/wrkrs-symbol";
import { cn } from "@/lib/utils";

/**
 * The wrkrs symbol as an inline, decorative SVG. It inherits `currentColor`, so
 * it renders as the black mark on light surfaces and the white mark on Ink.
 *
 * The symbol's 2048 canvas includes the brand's 12.5% clear space, so the box is
 * larger than the visible mark. The 18px default renders the symbol about 13.5px
 * tall next to 16px text: the same 0.84 symbol-to-text ratio as the official
 * lockup. Callers pass a `size-*` class for other contexts.
 */
export function WrkrsMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("size-[18px]", className)}
      viewBox={WRKRS_SYMBOL_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform={WRKRS_SYMBOL_TRANSFORM} fill="currentColor" stroke="none">
        <path d={WRKRS_SYMBOL_PATH} />
      </g>
    </svg>
  );
}
