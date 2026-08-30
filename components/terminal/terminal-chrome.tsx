import { cn } from "@/lib/utils";

const light =
  "size-[9px] rounded-[50%] shadow-[inset_0_0_0_.5px_rgba(0,0,0,.25),0_.5px_1px_rgba(0,0,0,.3)] md:size-[11px]";

export function TerminalChrome({ title }: { title: string }) {
  return (
    <div
      className="relative flex h-8 items-center justify-center border-b border-[#202020] bg-[linear-gradient(#383838,#2d2d2d)] font-[family-name:-apple-system,BlinkMacSystemFont,'Helvetica_Neue',sans-serif] text-[9px] font-medium text-grey-350 select-none text-shadow-[0_1px_rgba(0,0,0,.75)] md:h-9.5 md:text-[10px]"
      aria-hidden="true"
    >
      <div className="absolute left-2.5 flex gap-[5px] md:left-[13px] md:gap-[7px]">
        <span className={cn(light, "bg-[#ff5f57]")} />
        <span className={cn(light, "bg-[#febc2e]")} />
        <span className={cn(light, "bg-[#28c840]")} />
      </div>
      <span className="opacity-85">{title}</span>
    </div>
  );
}
