import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { salesTrend } from "../data/mockData";

export function SalesChart() {
  return (
    <article className="rounded-xl border border-line bg-panel p-6">
      <header className="mb-6">
        <h2 className="text-base font-semibold text-ink">Tren Penjualan</h2>
        <p className="text-sm text-muted">Material vs Properti — 6 bulan terakhir (juta Rp)</p>
      </header>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={salesTrend} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradMaterial" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a7350" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#4a7350" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradProperti" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c17f3a" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#c17f3a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8e6e1" vertical={false} />
          <XAxis dataKey="bulan" tick={{ fontSize: 12, fill: "#5c6760" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#5c6760" }} axisLine={false} tickLine={false} unit=" jt" />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e8e6e1",
              fontSize: 13,
            }}
            formatter={(value: number) => [`Rp ${value} jt`, ""]}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 13, paddingTop: 12 }} />
          <Area
            type="monotone"
            dataKey="material"
            name="Material Bangunan"
            stroke="#4a7350"
            strokeWidth={2}
            fill="url(#gradMaterial)"
          />
          <Area
            type="monotone"
            dataKey="properti"
            name="Properti"
            stroke="#c17f3a"
            strokeWidth={2}
            fill="url(#gradProperti)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </article>
  );
}
