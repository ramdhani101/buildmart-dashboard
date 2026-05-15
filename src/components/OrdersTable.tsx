import { recentOrders } from "../data/mockData";

const statusStyles: Record<string, string> = {
  Selesai: "bg-brand-100 text-brand-700",
  Dikirim: "bg-brand-50 text-brand-600 ring-1 ring-brand-200",
  Diproses: "bg-amber-50 text-amber-800 ring-1 ring-amber-200",
  Negosiasi: "bg-accent-500/10 text-accent-600 ring-1 ring-accent-500/30",
};

export function OrdersTable() {
  return (
    <article className="rounded-xl border border-line bg-panel">
      <header className="flex items-center justify-between border-b border-line px-6 py-4">
        <section>
          <h2 className="text-base font-semibold text-ink">Pesanan Terbaru</h2>
          <p className="text-sm text-muted">Material bangunan & properti</p>
        </section>
        <button type="button" className="text-sm font-medium text-brand-600 hover:text-brand-700">
          Lihat semua
        </button>
      </header>

      <section className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <th className="px-6 py-3 font-medium">ID</th>
              <th className="px-6 py-3 font-medium">Pelanggan</th>
              <th className="px-6 py-3 font-medium">Tipe</th>
              <th className="px-6 py-3 font-medium">Detail</th>
              <th className="px-6 py-3 font-medium">Total</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b border-line last:border-0 hover:bg-surface/80">
                <td className="px-6 py-4 font-medium text-brand-700">{order.id}</td>
                <td className="px-6 py-4 text-ink">{order.customer}</td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                      order.type === "Properti"
                        ? "bg-accent-500/10 text-accent-600"
                        : "bg-brand-100 text-brand-700"
                    }`}
                  >
                    {order.type}
                  </span>
                </td>
                <td className="max-w-[200px] truncate px-6 py-4 text-muted">{order.items}</td>
                <td className="px-6 py-4 font-medium text-ink">{order.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      statusStyles[order.status] ?? "bg-brand-100 text-brand-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </article>
  );
}
