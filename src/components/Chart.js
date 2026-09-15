import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const currencyFormatter = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });

    return (
      <div className="bg-surface-elevated border border-border-subtle p-4 rounded-lg shadow-xl">
        <p className="text-text-muted mb-2 font-medium">Year {label}</p>
        <div className="mb-3">
          <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">
            Active Scenario
          </p>
          <p className="text-secondary text-sm">
            Deposits:{" "}
            {currencyFormatter.format(payload[0]?.payload.totalPrincipal || 0)}
          </p>
          <p className="text-primary text-sm">
            Interest:{" "}
            {currencyFormatter.format(payload[0]?.payload.totalInterest || 0)}
          </p>
        </div>
        {payload[0]?.payload.compTotalPrincipal !== undefined && (
          <div className="pt-2 border-t border-border-subtle">
            <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1 mt-1">
              Comparison
            </p>
            <p className="text-text-muted text-sm">
              Deposits:{" "}
              {currencyFormatter.format(
                payload[0]?.payload.compTotalPrincipal || 0,
              )}
            </p>
            <p className="text-foreground text-sm">
              Interest:{" "}
              {currencyFormatter.format(
                payload[0]?.payload.compTotalInterest || 0,
              )}
            </p>
          </div>
        )}
      </div>
    );
  }
};

export default function Chart({ data, comparisonData }) {
  const mergedData = useMemo(() => {
    if (!comparisonData || comparisonData.length === 0) return data;

    const maxYears = Math.max(data.length, comparisonData.length);
    const merged = [];

    for (let i = 0; i < maxYears; i++) {
      const activeYear = data[i] || {};
      const compYear = comparisonData[i] || {};

      merged.push({
        year: i,
        // Active data
        totalPrincipal: activeYear.totalPrincipal,
        totalInterest: activeYear.totalInterest,
        // Comparison data
        compTotalPrincipal: compYear.totalPrincipal,
        compTotalInterest: compYear.totalInterest,
      });
    }

    return merged;
  }, [data, comparisonData]);

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={mergedData}
          margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
        >
          {/* Active Gradients */}
          <defs>
            <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-secondary)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-secondary)"
                stopOpacity={0}
              />
            </linearGradient>

            <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-primary)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-primary)"
                stopOpacity={0.2}
              />
            </linearGradient>

            {/* Comparison Gradients */}
            <linearGradient id="compPrincipal" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-text-muted)"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="var(--color-text-muted)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="compInterest" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-text-foreground)"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="var(--color-text-foreground)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border-subtle)"
            vertical={false}
          />
          <XAxis
            dataKey="year"
            stroke="var(--color-text-muted)"
            tickMargin={10}
          />
          <YAxis
            stroke="var(--color-text-muted)"
            tickFormatter={(val) => `€${val / 1000}k`}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />

          {comparisonData && (
            <>
              <Area
                type="monotone"
                dataKey="compTotalPrincipal"
                stackId="comparison"
                stroke="var(--color-text-muted)"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#compPrincipal)"
                connectNulls
              />
              <Area
                type="monotone"
                dataKey="compTotalInterest"
                stackId="comparison"
                stroke="var(--color-text-foreground)"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#compInterest)"
                connectNulls
              />
            </>
          )}

          <Area
            type="monotone"
            dataKey="totalPrincipal"
            stackId="1"
            stroke="var(--color-secondary)"
            strokeWidth={3}
            fill="url(#colorPrincipal)"
          />
          <Area
            type="monotone"
            dataKey="totalInterest" // This maps to the key in yearlyData array
            stackId="1"
            stroke="var(--color-primary)"
            strokeWidth={3}
            fill="url(#colorInterest)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
