import type { CategoryTrend } from "@/types/analytics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const TREND_ICON = {
  up: <TrendingUp size={13} className="text-green-600" />,
  flat: <Minus size={13} className="text-warm-gray" />,
  down: <TrendingDown size={13} className="text-red-500" />,
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#cdcdcd] rounded-lg px-3 py-2 shadow-sm text-sm">
      <p className="text-warm-gray text-[11px] mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="font-medium text-charcoal">
          {p.name === "volumeShare" ? `${p.value}% rynku` : `${p.value} PLN śr. cena`}
        </p>
      ))}
    </div>
  );
}

export function CategoryTrends({ data }: { data: CategoryTrend[] }) {
  return (
    <div className="bg-white border border-[#cdcdcd] rounded-lg p-5">
      <p className="text-label mb-1">Trendy w kategorii Obuwie</p>
      <p className="text-[12px] text-warm-gray mb-4">
        Co kupują klienci — udział w rynku i średnie ceny według typu produktu.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-[11px] text-warm-gray uppercase tracking-wide mb-3">Udział wolumenu sprzedaży (%)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 0, right: 8, left: 4, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "#6b6b6b" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="productType"
                tick={{ fontSize: 11, fill: "#6b6b6b" }}
                axisLine={false}
                tickLine={false}
                width={110}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="volumeShare" fill="#212121" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <p className="text-[11px] text-warm-gray uppercase tracking-wide mb-3">Trendy popytu</p>
          <div className="flex flex-col gap-2">
            {data.map((d) => (
              <div
                key={d.productType}
                className="flex items-center justify-between py-2 border-b border-[#e5e5e5] last:border-0"
              >
                <span className="text-sm text-charcoal">{d.productType}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-warm-gray">{d.avgPrice} PLN</span>
                  {TREND_ICON[d.trend]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
