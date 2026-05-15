import { Eye, MapPin } from "lucide-react";
import { propertyListings } from "../data/mockData";

const statusStyles: Record<string, string> = {
  Tersedia: "text-brand-600",
  Reserved: "text-amber-700",
  Terjual: "text-muted",
};

export function PropertyListings() {
  return (
    <article className="rounded-xl border border-line bg-panel p-6">
      <header className="mb-4 flex items-center justify-between">
        <section>
          <h2 className="text-base font-semibold text-ink">Listing Properti</h2>
          <p className="text-sm text-muted">Performa iklan & leads</p>
        </section>
        <button type="button" className="text-sm font-medium text-brand-600 hover:text-brand-700">
          + Tambah listing
        </button>
      </header>

      <ul className="space-y-3">
        {propertyListings.map((prop) => (
          <li
            key={prop.title}
            className="rounded-lg border border-line p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
          >
            <section className="flex items-start justify-between gap-3">
              <section className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink">{prop.title}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                  <MapPin size={12} />
                  {prop.type}
                </p>
              </section>
              <span className={`shrink-0 text-xs font-semibold ${statusStyles[prop.status]}`}>
                {prop.status}
              </span>
            </section>
            <section className="mt-3 flex items-center justify-between">
              <p className="text-lg font-semibold text-ink">{prop.price}</p>
              <span className="flex items-center gap-3 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Eye size={12} />
                  {prop.views}
                </span>
                <span className="font-medium text-brand-600">{prop.leads} leads</span>
              </span>
            </section>
          </li>
        ))}
      </ul>
    </article>
  );
}
