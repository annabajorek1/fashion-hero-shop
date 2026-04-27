import type { TopProduct } from "@/types/analytics";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const TREND_ICON = {
  up: <TrendingUp size={13} className="text-green-600" />,
  flat: <Minus size={13} className="text-warm-gray" />,
  down: <TrendingDown size={13} className="text-red-500" />,
};

export function TopProductsTable({ data }: { data: TopProduct[] }) {
  return (
    <div className="bg-white border border-[#cdcdcd] rounded-lg p-5">
      <p className="text-label mb-4">Top produkty</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px] text-sm">
          <thead>
            <tr className="border-b border-[#e5e5e5]">
              {["Produkt", "Przychód", "Zamówienia", "Return rate", "CVR", "Trend"].map(
                (h) => (
                  <th
                    key={h}
                    className="pb-2 text-left text-[10px] uppercase tracking-wide text-warm-gray font-medium pr-4 last:pr-0"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((p, i) => (
              <tr
                key={p.productName}
                className={cn(
                  "border-b border-[#f0f0f0] last:border-0",
                  i % 2 === 1 && "bg-[#fafaf9]"
                )}
              >
                <td className="py-3 pr-4 font-medium text-charcoal">{p.productName}</td>
                <td className="py-3 pr-4 text-charcoal">
                  {p.revenue.toLocaleString("pl-PL")} PLN
                </td>
                <td className="py-3 pr-4 text-charcoal">{p.orders}</td>
                <td
                  className={cn(
                    "py-3 pr-4 font-medium",
                    p.returnRate <= 30
                      ? "text-green-600"
                      : p.returnRate <= 38
                      ? "text-charcoal"
                      : "text-red-500"
                  )}
                >
                  {p.returnRate}%
                </td>
                <td className="py-3 pr-4 text-charcoal">{p.cvr}%</td>
                <td className="py-3">{TREND_ICON[p.trend]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
