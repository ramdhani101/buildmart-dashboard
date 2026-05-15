import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Sidebar } from "./components/Sidebar";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Ringkasan penjualan material bangunan & properti",
  },
  material: {
    title: "Material Bangunan",
    subtitle: "Kelola katalog semen, besi, keramik, dan lainnya",
  },
  properti: {
    title: "Properti",
    subtitle: "Kelola listing rumah, tanah, apartemen, dan ruko",
  },
  pesanan: { title: "Pesanan", subtitle: "Lacak semua transaksi material & properti" },
  pelanggan: { title: "Pelanggan", subtitle: "Database kontraktor, developer, dan pembeli" },
  laporan: { title: "Laporan", subtitle: "Analitik penjualan dan performa bisnis" },
  pengaturan: { title: "Pengaturan", subtitle: "Konfigurasi toko dan akun admin" },
};

function PlaceholderPage({ id }: { id: string }) {
  const page = pageTitles[id] ?? pageTitles.dashboard;
  return (
    <main className="flex flex-1 flex-col">
      <header className="border-b border-line bg-panel px-8 py-5">
        <h1 className="font-display text-3xl text-ink">{page.title}</h1>
        <p className="mt-0.5 text-sm text-muted">{page.subtitle}</p>
      </header>
      <section className="flex flex-1 items-center justify-center p-8">
        <article className="max-w-md rounded-xl border border-line bg-panel p-8 text-center">
          <p className="font-display text-2xl text-ink">Segera hadir</p>
          <p className="mt-2 text-sm text-muted">
            Halaman <strong>{page.title}</strong> sedang dalam pengembangan. Gunakan menu
            Dashboard untuk melihat ringkasan bisnis.
          </p>
        </article>
      </section>
    </main>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <div className="flex h-full min-h-screen">
      <Sidebar active={activeNav} onNavigate={setActiveNav} />
      <div className="flex min-w-0 flex-1 flex-col">
        {activeNav === "dashboard" ? <Dashboard /> : <PlaceholderPage id={activeNav} />}
      </div>
    </div>
  );
}
