import { Bell, Plus, Search } from "lucide-react";

type HeaderProps = {
  title: string;
  subtitle: string;
};

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-panel px-8 py-5">
      <section>
        <h1 className="font-display text-3xl text-ink">{title}</h1>
        <p className="mt-0.5 text-sm text-muted">{subtitle}</p>
      </section>

      <section className="flex items-center gap-3">
        <label className="relative hidden sm:block">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            placeholder="Cari pesanan, produk, properti..."
            className="w-72 rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-400"
          />
        </label>

        <button
          type="button"
          className="relative rounded-lg border border-line p-2 text-muted hover:bg-surface"
          aria-label="Notifikasi"
        >
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent-500" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Plus size={16} />
          Tambah Produk
        </button>

        <span className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-brand-200 text-sm font-semibold text-brand-800">
          AD
        </span>
      </section>
    </header>
  );
}
