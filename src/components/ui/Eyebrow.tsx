import type { HTMLAttributes } from "react";

type EyebrowProps = HTMLAttributes<HTMLDivElement> & {
  numeral: string;
  label: string;
  tone: "wine" | "gold";
};

/** Section label: roman numeral, rule, uppercase title. */
export function Eyebrow({ numeral, label, tone, className = "", ...rest }: EyebrowProps) {
  const text = tone === "wine" ? "text-wine" : "text-gold";
  const rule = tone === "wine" ? "bg-wine" : "bg-gold";
  return (
    <div
      className={`flex items-center gap-[18px] text-[11px] tracking-[.32em] uppercase ${text} ${className}`}
      {...rest}
    >
      <span className="font-serif text-[16px] tracking-[0]">{numeral}</span>
      <span className={`w-10 h-px ${rule}`} />
      <span>{label}</span>
    </div>
  );
}
