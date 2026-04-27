"use client";

import { useState } from "react";
import { urbanEdgeAnalytics } from "@/data/analyticsData";
import { ProGate } from "@/components/analytics/pro-gate";
import { KpiCards } from "@/components/analytics/kpi-cards";
import { SalesChart } from "@/components/analytics/sales-chart";
import { BenchmarkPanel } from "@/components/analytics/benchmark-panel";
import { ActionableInsights } from "@/components/analytics/actionable-insights";
import { CategoryTrends } from "@/components/analytics/category-trends";
import { TrafficSources } from "@/components/analytics/traffic-sources";
import { ConversionFunnel } from "@/components/analytics/conversion-funnel";
import { TopProductsTable } from "@/components/analytics/top-products-table";
import { cn } from "@/lib/utils";

const data = urbanEdgeAnalytics;

export default function SellerAnalyticsPage() {
  const [isPro, setIsPro] = useState(false);

  return (
    <main className="min-h-screen bg-[#ece9e2]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-label mb-1">Seller Portal</p>
            <h1 className="text-2xl md:text-3xl font-normal text-charcoal">
              {data.sellerName} — Analytics
            </h1>
            <p className="text-sm text-warm-gray mt-1">
              Kategoria: {data.category} · Ostatnie 30 dni
            </p>
          </div>

          {/* Free / Pro toggle */}
          <div className="flex items-center gap-1 bg-white border border-[#cdcdcd] rounded-lg p-1 self-start sm:self-auto">
            <button
              onClick={() => setIsPro(false)}
              className={cn(
                "px-4 py-1.5 text-sm rounded-md transition-all duration-200",
                !isPro
                  ? "bg-charcoal text-white font-medium"
                  : "text-warm-gray hover:text-charcoal"
              )}
            >
              Free
            </button>
            <button
              onClick={() => setIsPro(true)}
              className={cn(
                "px-4 py-1.5 text-sm rounded-md transition-all duration-200 flex items-center gap-1.5",
                isPro
                  ? "bg-charcoal text-white font-medium"
                  : "text-warm-gray hover:text-charcoal"
              )}
            >
              Pro
              {!isPro && (
                <span className="text-[9px] bg-[#e0dad0] text-charcoal px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide">
                  99 PLN/mies.
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Free banner when in Free mode */}
        {!isPro && (
          <div className="bg-white border border-[#cdcdcd] rounded-lg px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-charcoal">
                Widzisz plan Free — podstawowe statystyki
              </p>
              <p className="text-[12px] text-warm-gray">
                Przejdź na Pro, żeby odblokować benchmark, trendy kategorii, źródła ruchu i lejek konwersji.
              </p>
            </div>
            <button
              onClick={() => setIsPro(true)}
              className="btn-cta px-5 py-2 text-[12px] whitespace-nowrap self-start sm:self-auto"
            >
              Odblokuj Pro — 99 PLN/mies.
            </button>
          </div>
        )}

        {/* KPI Cards — Free + Pro */}
        <KpiCards kpi={data.kpi} />

        {/* Sales Chart — Free + Pro */}
        <SalesChart data={data.salesTimeSeries} />

        {/* Benchmark — Pro only */}
        <ProGate isPro={isPro} onUpgrade={() => setIsPro(true)}>
          <BenchmarkPanel data={data.benchmark} />
        </ProGate>

        {/* Actionable Insights — Pro only */}
        <ProGate isPro={isPro} onUpgrade={() => setIsPro(true)}>
          <ActionableInsights insights={data.actionableInsights} />
        </ProGate>

        {/* Category Trends — Pro only */}
        <ProGate isPro={isPro} onUpgrade={() => setIsPro(true)}>
          <CategoryTrends data={data.categoryTrends} />
        </ProGate>

        {/* Traffic Sources — Pro only */}
        <ProGate isPro={isPro} onUpgrade={() => setIsPro(true)}>
          <TrafficSources data={data.trafficSources} />
        </ProGate>

        {/* Conversion Funnel — Pro only */}
        <ProGate isPro={isPro} onUpgrade={() => setIsPro(true)}>
          <ConversionFunnel data={data.conversionFunnel} />
        </ProGate>

        {/* Top Products — Pro only */}
        <ProGate isPro={isPro} onUpgrade={() => setIsPro(true)}>
          <TopProductsTable data={data.topProducts} />
        </ProGate>

      </div>
    </main>
  );
}
