import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { categoryBreakdown } from "../data/mockData";

export function CategoryChart() {
  return (
    <article className="rounded-xl border border-line bg-panel p-6">
      <header className="mb-4">
        <h2 className="text-base font-semibold text-ink">Kategori Material</h2>
        <p className="text-sm text-muted">Distribusi penjualan per kategori (%)</p>
      </header>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={categoryBreakdown}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {categoryBreakdown.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value}%`, ""]} />
        </PieChart>
      </ResponsiveContainer>

      <ul className="mt-2 space-y-2">
        {categoryBreakdown.map((cat) => (
          <li key={cat.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: cat.color }} />
              {cat.name}
            </span>
            <span className="font-medium text-ink">{cat.value}%</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
