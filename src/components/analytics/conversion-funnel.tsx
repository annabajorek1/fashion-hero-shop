import type { ConversionProduct } from "@/types/analytics";

function FunnelBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-warm-gray uppercase tracking-wide w-16 shrink-0 text-right">
        {label}
      </span>
      <div className="flex-1 h-5 bg-[#f5f4f1] rounded overflow-hidden">
        <div
          className="h-full rounded transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[12px] font-medium text-charcoal w-12 text-right shrink-0">
        {value.toLocaleString("pl-PL")}
      </span>
    </div>
  );
}

function ProductFunnel({ product }: { product: ConversionProduct }) {
  return (
    <div className="border border-[#e5e5e5] rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-charcoal">{product.productName}</p>
        <span className="text-[11px] bg-[#f5f4f1] px-2 py-0.5 rounded font-medium text-charcoal">
          CVR {product.cvr}%
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <FunnelBar label="Wyśw." value={product.views} max={product.views} color="#212121" />
        <FunnelBar label="Koszyk" value={product.cartAdds} max={product.views} color="#6b6b6b" />
        <FunnelBar label="Zakup" value={product.purchases} max={product.views} color="#a0a0a0" />
      </div>
    </div>
  );
}

export function ConversionFunnel({ data }: { data: ConversionProduct[] }) {
  return (
    <div className="bg-white border border-[#cdcdcd] rounded-lg p-5">
      <p className="text-label mb-1">Lejek konwersji — top 5 produktów</p>
      <p className="text-[12px] text-warm-gray mb-4">
        Wyświetlenia → dodanie do koszyka → zakup. CVR = wyświetlenia → zakup.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((p) => (
          <ProductFunnel key={p.productName} product={p} />
        ))}
      </div>
    </div>
  );
}
