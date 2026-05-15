import { AlertTriangle } from "lucide-react";
import { lowStockItems } from "../data/mockData";

export function LowStockList() {
  return (
    <article className="rounded-xl border border-line bg-panel p-6">
      <header className="mb-4 flex items-center gap-2">
        <AlertTriangle size={18} className="text-accent-600" />
        <section>
          <h2 className="text-base font-semibold text-ink">Stok Menipis</h2>
          <p className="text-sm text-muted">Perlu restock segera</p>
        </section>
      </header>

      <ul className="space-y-4">
        {lowStockItems.map((item) => {
          const pct = Math.min(100, Math.round((item.stock / item.min) * 100));
          return (
            <li key={item.sku}>
              <section className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{item.name}</span>
                <span className="text-muted">
                  {item.stock} / {item.min} {item.unit}
                </span>
              </section>
              <section className="h-2 overflow-hidden rounded-full bg-brand-100">
                <span
                  className={`block h-full rounded-full ${pct < 40 ? "bg-accent-500" : "bg-brand-500"}`}
                  style={{ width: `${pct}%` }}
                />
              </section>
              <p className="mt-1 text-xs text-muted">SKU: {item.sku}</p>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
