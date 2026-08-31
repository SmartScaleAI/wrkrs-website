import { faq } from "@/lib/landing-content";

export function FaqList() {
  return (
    <div className="mt-7 grid max-w-[720px] grid-cols-1 gap-x-12 border-t border-ink md:mt-9 lg:max-w-none lg:grid-cols-[1fr_1fr]">
      {faq.map((item) => (
        <details className="group min-w-0 border-b border-line" key={item.question}>
          {/* The +/− marker is an ::after so the native disclosure triangle can be hidden. */}
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-3.5 text-[15px] font-[520] tracking-[-0.015em] after:flex-none after:font-mono after:text-[16px] after:text-[#6b6b6b] after:content-['+'] group-open:after:content-['−'] hover:text-black focus-visible:outline-offset-4 md:py-4 dark:after:text-grey-600 dark:hover:text-white [&::-webkit-details-marker]:hidden">
            {item.question}
          </summary>
          <p className="max-w-none pb-4.5 text-[14px] leading-[1.62] text-grey-700 md:max-w-[520px]">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
