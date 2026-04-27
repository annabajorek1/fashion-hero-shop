export interface DailySalesPoint {
  date: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
}

export interface KpiSummary {
  totalRevenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  avgOrderValue: number;
  avgOrderValueChange: number;
  returnRate: number;
  returnRateChange: number;
}

export interface BenchmarkData {
  sellerPercentile: number;
  category: string;
  sellerReturnRate: number;
  medianReturnRate: number;
  top10ReturnRate: number;
  revenueVsMedian: number;
  avgOrderVsMedian: number;
}

export interface ActionableInsight {
  id: string;
  metric: string;
  sellerValue: string;
  topSellerValue: string;
  insight: string;
}

export interface CategoryTrend {
  productType: string;
  avgPrice: number;
  volumeShare: number;
  trend: "up" | "flat" | "down";
}

export interface TrafficSource {
  source: string;
  sessions: number;
  percentage: number;
}

export interface ConversionProduct {
  productName: string;
  views: number;
  cartAdds: number;
  purchases: number;
  cvr: number;
}

export interface TopProduct {
  productName: string;
  revenue: number;
  orders: number;
  returnRate: number;
  cvr: number;
  trend: "up" | "flat" | "down";
}

export interface SellerAnalytics {
  sellerId: string;
  sellerName: string;
  category: string;
  kpi: KpiSummary;
  salesTimeSeries: DailySalesPoint[];
  benchmark: BenchmarkData;
  actionableInsights: ActionableInsight[];
  categoryTrends: CategoryTrend[];
  trafficSources: TrafficSource[];
  conversionFunnel: ConversionProduct[];
  topProducts: TopProduct[];
}
