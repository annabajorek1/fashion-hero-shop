import type { SellerAnalytics } from "@/types/analytics";

function generateSalesTimeSeries() {
  const data = [];
  const baseDate = new Date("2026-03-28");
  // Revenue is higher on Fri/Sat, lower Mon/Tue
  const dayMultipliers = [0.75, 0.72, 0.85, 0.95, 1.15, 1.4, 1.1]; // Mon–Sun
  for (let i = 29; i >= 0; i--) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - i);
    const dow = d.getDay(); // 0=Sun
    const mult = dayMultipliers[dow === 0 ? 6 : dow - 1];
    const base = 2200;
    const jitter = (Math.sin(i * 1.7) * 600 + Math.cos(i * 0.9) * 400);
    const revenue = Math.round((base + jitter) * mult);
    const clamped = Math.max(820, Math.min(4480, revenue));
    const orders = Math.round(clamped / 205);
    data.push({
      date: d.toISOString().slice(0, 10),
      revenue: clamped,
      orders,
      avgOrderValue: Math.round(clamped / orders),
    });
  }
  return data;
}

export const urbanEdgeAnalytics: SellerAnalytics = {
  sellerId: "urban-edge",
  sellerName: "UrbanEdge",
  category: "Obuwie",

  kpi: {
    totalRevenue: 58_340,
    revenueChange: +12.4,
    totalOrders: 284,
    ordersChange: +8.7,
    avgOrderValue: 205,
    avgOrderValueChange: +3.4,
    returnRate: 34,
    returnRateChange: -1.2,
  },

  salesTimeSeries: generateSalesTimeSeries(),

  benchmark: {
    sellerPercentile: 78,
    category: "Obuwie",
    sellerReturnRate: 34,
    medianReturnRate: 39,
    top10ReturnRate: 28,
    revenueVsMedian: +41,
    avgOrderVsMedian: +18,
  },

  actionableInsights: [
    {
      id: "return-rate",
      metric: "Return rate",
      sellerValue: "34%",
      topSellerValue: "28%",
      insight:
        "Top 10% sprzedawców w kategorii Obuwie ma return rate 28% — Ty masz 34%. Najczęstsza różnica: szczegółowa tabela rozmiarów i zdjęcia buta na stopie (nie tylko produktowe).",
    },
    {
      id: "response-time",
      metric: "Czas odpowiedzi",
      sellerValue: "18h",
      topSellerValue: "4h",
      insight:
        "Top sprzedawcy odpowiadają na pytania kupujących średnio w 4h. Twój średni czas to 18h. Kupujący, którzy nie dostają odpowiedzi w 6h, rzadziej finalizują zakup.",
    },
    {
      id: "photo-freshness",
      metric: "Aktualność zdjęć",
      sellerValue: "8 mies.",
      topSellerValue: "60 dni",
      insight:
        "Top 25% sprzedawców odświeża zdjęcia produktów co 60 dni. Twoje najstarsze zdjęcia mają 8 miesięcy. Nowe zdjęcia zwiększają CVR średnio o 11% w tej kategorii.",
    },
  ],

  categoryTrends: [
    { productType: "Runner / jogging", avgPrice: 229, volumeShare: 34, trend: "up" },
    { productType: "Walker / casual", avgPrice: 199, volumeShare: 28, trend: "up" },
    { productType: "Trainer / siłownia", avgPrice: 249, volumeShare: 16, trend: "flat" },
    { productType: "Slip-on", avgPrice: 179, volumeShare: 12, trend: "flat" },
    { productType: "Hiker / outdoor", avgPrice: 289, volumeShare: 6, trend: "down" },
    { productType: "Pozostałe", avgPrice: 159, volumeShare: 4, trend: "down" },
  ],

  trafficSources: [
    { source: "Wyszukiwarka FH", sessions: 4_820, percentage: 48 },
    { source: "Strona kategorii", sessions: 2_610, percentage: 26 },
    { source: "Polecenia (social)", sessions: 1_310, percentage: 13 },
    { source: "Bezpośredni URL", sessions: 830, percentage: 8 },
    { source: "Email / newsletter", sessions: 510, percentage: 5 },
  ],

  conversionFunnel: [
    {
      productName: "Urban Runner Pro",
      views: 1_840,
      cartAdds: 312,
      purchases: 98,
      cvr: 5.3,
    },
    {
      productName: "City Walker Mesh",
      views: 1_520,
      cartAdds: 248,
      purchases: 74,
      cvr: 4.9,
    },
    {
      productName: "Street Slip-On",
      views: 980,
      cartAdds: 142,
      purchases: 38,
      cvr: 3.9,
    },
    {
      productName: "Trail Hiker Light",
      views: 760,
      cartAdds: 89,
      purchases: 22,
      cvr: 2.9,
    },
    {
      productName: "Classic Trainer",
      views: 640,
      cartAdds: 104,
      purchases: 34,
      cvr: 5.3,
    },
  ],

  topProducts: [
    {
      productName: "Urban Runner Pro",
      revenue: 18_620,
      orders: 98,
      returnRate: 29,
      cvr: 5.3,
      trend: "up",
    },
    {
      productName: "City Walker Mesh",
      revenue: 13_690,
      orders: 74,
      returnRate: 33,
      cvr: 4.9,
      trend: "up",
    },
    {
      productName: "Classic Trainer",
      revenue: 8_160,
      orders: 34,
      returnRate: 38,
      cvr: 5.3,
      trend: "flat",
    },
    {
      productName: "Street Slip-On",
      revenue: 6_460,
      orders: 38,
      returnRate: 41,
      cvr: 3.9,
      trend: "flat",
    },
    {
      productName: "Trail Hiker Light",
      revenue: 6_160,
      orders: 22,
      returnRate: 36,
      cvr: 2.9,
      trend: "down",
    },
  ],
};
