import {
  WRKRS_SYMBOL_PATH,
  WRKRS_SYMBOL_TRANSFORM,
  WRKRS_SYMBOL_VIEW_BOX,
} from "@/components/brand/wrkrs-symbol";

/**
 * The wrkrs symbol as an inline, decorative SVG. It inherits `currentColor`, so
 * it renders as the black mark on light surfaces and the white mark on Ink.
 */
export function WrkrsMark() {
  return (
    <svg
      aria-hidden="true"
      className="wrkrs-mark"
      viewBox={WRKRS_SYMBOL_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform={WRKRS_SYMBOL_TRANSFORM} fill="currentColor" stroke="none">
        <path d={WRKRS_SYMBOL_PATH} />
      </g>
    </svg>
  );
}
