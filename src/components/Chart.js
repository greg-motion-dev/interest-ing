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
      <div className="bg-surface-elevated border border-border-subtle p-4 rounded-xl shadow-xl backdrop-blur-md min-w-[220px]">
        <p className="text-text-muted mb-3 font-medium">Year {label}</p>

        <div className="flex flex-col gap-2 mb-3">
          <p className="text-xs text-foreground font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            Active Scenario
          </p>

          <div className="flex justify-between items-center text-sm">
            <span className="text-text-muted flex items-center gap-2">
              <svg width="12" height="4" className="overflow-visible">
                <line
                  x1="0"
                  y1="2"
                  x2="12"
                  y2="2"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeDasharray="2 2"
                />
              </svg>
              Interest{" "}
              <span className="text-[10px] text-text-muted opacity-75">
                (Dashed)
              </span>
            </span>
            <span className="font-medium text-foreground">
              {currencyFormatter.format(payload[0]?.payload.totalInterest || 0)}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-text-muted flex items-center gap-2">
              <span className="w-3 h-0.5 rounded-full bg-primary opacity-90 inline-block"></span>
              Deposits{" "}
              <span className="text-[10px] text-text-muted opacity-75">
                (Solid)
              </span>
            </span>
            <span className="font-medium text-foreground">
              {currencyFormatter.format(
                payload[0]?.payload.totalPrincipal || 0,
              )}
            </span>
          </div>
        </div>

        {payload[0]?.payload.compTotalPrincipal !== undefined && (
          <div className="flex flex-col gap-2 pt-1">
            <p className="text-xs text-foreground font-bold uppercase tracking-wider mb-1 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              Comparison
            </p>

            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted flex items-center gap-2">
                <svg width="12" height="4" className="overflow-visible">
                  <line
                    x1="0"
                    y1="2"
                    x2="12"
                    y2="2"
                    stroke="var(--color-secondary)"
                    strokeWidth="2"
                    strokeDasharray="2 2"
                  />
                </svg>
                Interest{" "}
                <span className="text-[10px] text-text-muted opacity-75">
                  (Dashed)
                </span>
              </span>
              <span className="font-medium text-foreground">
                {currencyFormatter.format(
                  payload[0]?.payload.compTotalInterest || 0,
                )}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted flex items-center gap-2">
                <span className="w-3 h-0.5 rounded-full bg-secondary opacity-90 inline-block"></span>
                Deposits{" "}
                <span className="text-[10px] text-text-muted opacity-75">
                  (Solid)
                </span>
              </span>
              <span className="font-medium text-foreground">
                {currencyFormatter.format(
                  payload[0]?.payload.compTotalPrincipal || 0,
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
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
        totalPrincipal: activeYear.totalPrincipal,
        totalInterest: activeYear.totalInterest,
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
          <defs>
            <linearGradient id="activePrincipal" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-primary)"
                stopOpacity={0.9}
              />
              <stop
                offset="95%"
                stopColor="var(--color-primary)"
                stopOpacity={0.1}
              />
            </linearGradient>

            <linearGradient id="activeInterest" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-primary)"
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor="var(--color-primary)"
                stopOpacity={0.1}
              />
            </linearGradient>

            <linearGradient id="compPrincipal" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-secondary)"
                stopOpacity={0.9}
              />
              <stop
                offset="95%"
                stopColor="var(--color-secondary)"
                stopOpacity={0.01}
              />
            </linearGradient>

            <linearGradient id="compInterest" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-secondary)"
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor="var(--color-secondary)"
                stopOpacity={0.1}
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
            domain={[0, "dataMax"]}
            type="number"
            allowDataOverflow
          />
          <YAxis
            stroke="var(--color-text-muted)"
            tickFormatter={(val) => `€${val / 1000}k`}
            width={60}
          />

          <Tooltip content={<CustomTooltip />} offset={20} />

          {comparisonData && (
            <>
              <Area
                type="monotone"
                dataKey="compTotalPrincipal"
                stackId="comparison"
                stroke="var(--color-secondary)"
                strokeWidth={2}
                fill="url(#compPrincipal)"
                connectNulls
              />
              <Area
                type="monotone"
                dataKey="compTotalInterest"
                stackId="comparison"
                stroke="var(--color-secondary)"
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
            stackId="active"
            stroke="var(--color-primary)"
            strokeWidth={3}
            fill="url(#activePrincipal)"
          />
          <Area
            type="monotone"
            dataKey="totalInterest"
            stackId="active"
            stroke="var(--color-primary)"
            strokeWidth={3}
            strokeDasharray="5 5"
            fill="url(#activeInterest)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
