import type { DailySalesPoint } from "@/types/analytics";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
}

function formatRevenue(value: number) {
  return `${value.toLocaleString("pl-PL")} PLN`;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#cdcdcd] rounded-lg px-3 py-2 shadow-sm text-sm">
      <p className="text-warm-gray text-[11px] mb-1">{label && formatDate(label)}</p>
      <p className="font-medium text-charcoal">{formatRevenue(payload[0].value)}</p>
    </div>
  );
}

export function SalesChart({ data }: { data: DailySalesPoint[] }) {
  const chartData = data.map((d) => ({
    date: d.date,
    revenue: d.revenue,
  }));

  const ticks = chartData
    .filter((_, i) => i % 7 === 0 || i === chartData.length - 1)
    .map((d) => d.date);

  return (
    <div className="bg-white border border-[#cdcdcd] rounded-lg p-5">
      <p className="text-label mb-4">Przychód dzienny (ostatnie 30 dni)</p>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#212121" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#212121" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="date"
            ticks={ticks}
            tickFormatter={formatDate}
            tick={{ fontSize: 11, fill: "#6b6b6b" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
            tick={{ fontSize: 11, fill: "#6b6b6b" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#212121"
            strokeWidth={2}
            fill="url(#revenueGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#212121" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
