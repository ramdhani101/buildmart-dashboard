import {
  Building2,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { stats } from "../data/mockData";
import { CategoryChart } from "./CategoryChart";
import { Header } from "./Header";
import { LowStockList } from "./LowStockList";
import { OrdersTable } from "./OrdersTable";
import { PropertyListings } from "./PropertyListings";
import { SalesChart } from "./SalesChart";
import { StatCard } from "./StatCard";

export function Dashboard() {
  return (
    <>
      <Header
        title="Dashboard"
        subtitle="Ringkasan penjualan material bangunan & properti — Mei 2026"
      />

      <main className="flex-1 overflow-y-auto p-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          <StatCard
            label="Total Penjualan"
            value={stats.revenue.value}
            change={stats.revenue.change}
            up={stats.revenue.up}
            icon={<DollarSign size={20} />}
            accent="brand"
          />
          <StatCard
            label="Pesanan Aktif"
            value={stats.orders.value}
            change={stats.orders.change}
            up={stats.orders.up}
            icon={<ShoppingCart size={20} />}
          />
          <StatCard
            label="SKU Material"
            value={stats.materials.value}
            change={stats.materials.change}
            up={stats.materials.up}
            icon={<Package size={20} />}
          />
          <StatCard
            label="Listing Properti"
            value={stats.properties.value}
            change={stats.properties.change}
            up={stats.properties.up}
            icon={<Building2 size={20} />}
            accent="accent"
          />
          <StatCard
            label="Stok Menipis"
            value={stats.lowStock.value}
            change={stats.lowStock.change}
            up={stats.lowStock.up}
            icon={<TrendingUp size={20} />}
            accent="neutral"
          />
          <StatCard
            label="Leads Properti"
            value={stats.pendingLeads.value}
            change={stats.pendingLeads.change}
            up={stats.pendingLeads.up}
            icon={<Users size={20} />}
            accent="accent"
          />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <SalesChart />
          </section>
          <CategoryChart />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-3">
          <section className="xl:col-span-2">
            <OrdersTable />
          </section>
          <section className="space-y-6">
            <LowStockList />
            <PropertyListings />
          </section>
        </section>
      </main>
    </>
  );
}
