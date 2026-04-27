import type { KpiSummary } from "@/types/analytics";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

function Delta({ value, inverted = false }: { value: number; inverted?: boolean }) {
  const positive = inverted ? value < 0 : value > 0;
  const neutral = value === 0;
  const label = value > 0 ? `+${value.toFixed(1)}%` : `${value.toFixed(1)}%`;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-[11px] font-medium",
        neutral && "text-warm-gray",
        positive && "text-green-600",
        !positive && !neutral && "text-red-500"
      )}
    >
      {neutral ? (
        <Minus size={11} />
      ) : positive ? (
        <TrendingUp size={11} />
      ) : (
        <TrendingDown size={11} />
      )}
      {label}
    </span>
  );
}

interface KpiCard {
  label: string;
  value: string;
  delta: number;
  deltaInverted?: boolean;
  sub?: string;
}

function Card({ label, value, delta, deltaInverted, sub }: KpiCard) {
  return (
    <div className="bg-white border border-[#cdcdcd] rounded-lg p-5 flex flex-col gap-2">
      <p className="text-label">{label}</p>
      <p className="text-2xl font-normal text-charcoal tracking-tight">{value}</p>
      <div className="flex items-center gap-2">
        <Delta value={delta} inverted={deltaInverted} />
        {sub && <span className="text-[11px] text-warm-gray">{sub}</span>}
      </div>
    </div>
  );
}

export function KpiCards({ kpi }: { kpi: KpiSummary }) {
  const cards: KpiCard[] = [
    {
      label: "Obrót (30 dni)",
      value: `${kpi.totalRevenue.toLocaleString("pl-PL")} PLN`,
      delta: kpi.revenueChange,
      sub: "vs poprzedni miesiąc",
    },
    {
      label: "Zamówienia",
      value: kpi.totalOrders.toString(),
      delta: kpi.ordersChange,
      sub: "vs poprzedni miesiąc",
    },
    {
      label: "Śr. wartość zamówienia",
      value: `${kpi.avgOrderValue} PLN`,
      delta: kpi.avgOrderValueChange,
      sub: "vs poprzedni miesiąc",
    },
    {
      label: "Return rate",
      value: `${kpi.returnRate}%`,
      delta: kpi.returnRateChange,
      deltaInverted: true,
      sub: "pp vs poprzedni miesiąc",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <Card key={c.label} {...c} />
      ))}
    </div>
  );
}
