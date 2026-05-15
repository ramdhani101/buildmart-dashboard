import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string;
  change: string;
  up?: boolean;
  icon: ReactNode;
  accent?: "brand" | "accent" | "neutral";
};

export function StatCard({ label, value, change, up = true, icon, accent = "brand" }: StatCardProps) {
  const accentBg =
    accent === "accent"
      ? "bg-accent-500/10 text-accent-600"
      : accent === "neutral"
        ? "bg-brand-100 text-brand-700"
        : "bg-brand-100 text-brand-600";

  return (
    <article className="rounded-xl border border-line bg-panel p-5">
      <section className="flex items-start justify-between">
        <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${accentBg}`}>
          {icon}
        </span>
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold ${
            up ? "text-brand-600" : "text-accent-600"
          }`}
        >
          {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
      </section>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </article>
  );
}
