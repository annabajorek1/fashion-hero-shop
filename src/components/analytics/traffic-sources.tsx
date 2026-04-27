import type { TrafficSource } from "@/types/analytics";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#212121", "#6b6b6b", "#a0a0a0", "#c8c8c8", "#e0dad0"];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: TrafficSource }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-[#cdcdcd] rounded-lg px-3 py-2 shadow-sm text-sm">
      <p className="font-medium text-charcoal">{d.source}</p>
      <p className="text-warm-gray text-[11px]">
        {d.sessions.toLocaleString("pl-PL")} sesji · {d.percentage}%
      </p>
    </div>
  );
}

interface LegendPayload {
  value: string;
  color: string;
}

function CustomLegend({ payload }: { payload?: LegendPayload[] }) {
  if (!payload) return null;
  return (
    <ul className="flex flex-col gap-1.5 mt-2">
      {payload.map((entry) => (
        <li key={entry.value} className="flex items-center gap-2 text-[12px] text-charcoal">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          {entry.value}
        </li>
      ))}
    </ul>
  );
}

export function TrafficSources({ data }: { data: TrafficSource[] }) {
  const total = data.reduce((s, d) => s + d.sessions, 0);

  return (
    <div className="bg-white border border-[#cdcdcd] rounded-lg p-5">
      <p className="text-label mb-1">Źródła ruchu</p>
      <p className="text-[12px] text-warm-gray mb-4">
        Skąd przychodzą kupujący na Twoje produkty.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="sessions"
              nameKey="source"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={2}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex-1 w-full">
          <p className="text-[11px] text-warm-gray mb-2">
            Łącznie: {total.toLocaleString("pl-PL")} sesji
          </p>
          <div className="flex flex-col gap-2">
            {data.map((d, i) => (
              <div key={d.source} className="flex items-center gap-2">
                <span
                  className="shrink-0 w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-sm text-charcoal flex-1">{d.source}</span>
                <span className="text-[12px] text-warm-gray">
                  {d.sessions.toLocaleString("pl-PL")}
                </span>
                <span className="text-[12px] font-medium text-charcoal w-8 text-right">
                  {d.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
