import type { ActionableInsight } from "@/types/analytics";
import { Lightbulb } from "lucide-react";

function InsightCard({ insight }: { insight: ActionableInsight }) {
  return (
    <div className="border border-[#cdcdcd] rounded-lg p-4 flex gap-3">
      <div className="mt-0.5 shrink-0">
        <div className="w-7 h-7 rounded-full bg-[#212121] flex items-center justify-center">
          <Lightbulb size={14} color="white" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-3 text-[12px]">
          <span className="text-warm-gray">{insight.metric}:</span>
          <span className="font-medium text-charcoal">Ty — {insight.sellerValue}</span>
          <span className="text-green-700 font-medium">Top 10% — {insight.topSellerValue}</span>
        </div>
        <p className="text-sm text-[#333333] leading-relaxed">{insight.insight}</p>
      </div>
    </div>
  );
}

export function ActionableInsights({ insights }: { insights: ActionableInsight[] }) {
  return (
    <div className="bg-white border border-[#cdcdcd] rounded-lg p-5">
      <p className="text-label mb-1">Co robią lepsi od Ciebie</p>
      <p className="text-[12px] text-warm-gray mb-4">
        Dane, które widzi tylko platforma. Dostępne wyłącznie w planie Pro.
      </p>
      <div className="flex flex-col gap-3">
        {insights.map((ins) => (
          <InsightCard key={ins.id} insight={ins} />
        ))}
      </div>
    </div>
  );
}
