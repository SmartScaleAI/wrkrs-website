import Link from "next/link";
import { WrkrsMark } from "@/components/brand/wrkrs-mark";
import { cn } from "@/lib/utils";

/** The wrkrs lockup as a home link. The header passes a tighter gap and a larger mark. */
export function BrandLink({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-11 w-fit items-center gap-2.5 text-[16px] font-semibold tracking-tight",
        className,
      )}
      href="/"
      aria-label="wrkrs home"
    >
      <WrkrsMark className={markClassName} />
      <span>wrkrs</span>
    </Link>
  );
}
