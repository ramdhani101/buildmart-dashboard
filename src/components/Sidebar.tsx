import {
  BarChart3,
  Building2,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";
import { navItems } from "../data/mockData";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Package,
  Building2,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
};

type SidebarProps = {
  active: string;
  onNavigate: (id: string) => void;
};

export function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-line bg-panel">
      <header className="border-b border-line px-6 py-5">
        <section className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            BM
          </span>
          <section>
            <p className="font-display text-xl leading-tight text-ink">BuildMart</p>
            <p className="text-xs text-muted">Admin Panel</p>
          </section>
        </section>
      </header>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-600 text-white"
                  : "text-muted hover:bg-brand-50 hover:text-ink"
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.25 : 2} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <footer className="border-t border-line p-4">
        <section className="rounded-lg bg-brand-50 p-3">
          <p className="text-xs font-semibold text-brand-700">Paket Bisnis</p>
          <p className="mt-1 text-xs text-muted">Kelola hingga 5 cabang toko</p>
          <button
            type="button"
            className="mt-2 w-full rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"
          >
            Upgrade
          </button>
        </section>
      </footer>
    </aside>
  );
}
