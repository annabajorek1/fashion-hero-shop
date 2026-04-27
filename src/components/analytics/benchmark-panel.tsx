import type { BenchmarkData } from "@/types/analytics";

function PercentileBar({ percentile }: { percentile: number }) {
  return (
    <div className="mt-4">
      <div className="flex justify-between text-[11px] text-warm-gray mb-1.5">
        <span>Bottom 10%</span>
        <span>Mediana</span>
        <span>Top 10%</span>
      </div>
      <div className="relative h-3 bg-[#e0dad0] rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-charcoal rounded-full transition-all duration-700"
          style={{ width: `${percentile}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-charcoal shadow transition-all duration-700"
          style={{ left: `calc(${percentile}% - 7px)` }}
        />
      </div>
      <p className="text-center text-[11px] text-warm-gray mt-1.5">
        Twój wynik: <strong className="text-charcoal">top {100 - percentile}%</strong> sprzedawców w kategorii
      </p>
    </div>
  );
}

function CompareRow({
  label,
  seller,
  median,
  top10,
  unit = "",
  lowerIsBetter = false,
}: {
  label: string;
  seller: string | number;
  median: string | number;
  top10: string | number;
  unit?: string;
  lowerIsBetter?: boolean;
}) {
  return (
    <div className="grid grid-cols-4 gap-2 py-2.5 border-b border-[#e5e5e5] last:border-0 text-sm">
      <span className="text-warm-gray text-[12px]">{label}</span>
      <span className="font-medium text-charcoal text-center">
        {seller}{unit}
      </span>
      <span className="text-warm-gray text-center">
        {median}{unit}
      </span>
      <span
        className={`text-center font-medium ${lowerIsBetter ? "text-green-600" : "text-charcoal"}`}
      >
        {top10}{unit}
      </span>
    </div>
  );
}

export function BenchmarkPanel({ data }: { data: BenchmarkData }) {
  return (
    <div className="bg-white border border-[#cdcdcd] rounded-lg p-5">
      <p className="text-label mb-1">Benchmark vs kategoria: {data.category}</p>
      <p className="text-[12px] text-warm-gray mb-4">
        Dane anonimowe — porównujesz się z innymi sprzedawcami w tej samej kategorii.
      </p>

      <PercentileBar percentile={data.sellerPercentile} />

      <div className="mt-6">
        <div className="grid grid-cols-4 gap-2 mb-1">
          <span />
          <span className="text-[10px] text-warm-gray uppercase tracking-wide text-center">Ty</span>
          <span className="text-[10px] text-warm-gray uppercase tracking-wide text-center">Mediana</span>
          <span className="text-[10px] text-warm-gray uppercase tracking-wide text-center">Top 10%</span>
        </div>
        <CompareRow
          label="Return rate"
          seller={data.sellerReturnRate}
          median={data.medianReturnRate}
          top10={data.top10ReturnRate}
          unit="%"
          lowerIsBetter
        />
        <CompareRow
          label="Przychód vs mediana"
          seller={`+${data.revenueVsMedian}`}
          median="0"
          top10="—"
          unit="%"
        />
        <CompareRow
          label="Śr. zamówienie vs mediana"
          seller={`+${data.avgOrderVsMedian}`}
          median="0"
          top10="—"
          unit="%"
        />
      </div>
    </div>
  );
}
