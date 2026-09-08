import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartCompound({ data }) {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-secondary-500)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-secondary-500)"
                stopOpacity={0}
              />
            </linearGradient>

            <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-primary-500)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-primary-500)"
                stopOpacity={0.2}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" stroke="#a1a1aa" />
          <YAxis stroke="#a1a1aa" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalPrincipal"
            stackId="1"
            stroke="var(--color-secondary-500)"
            strokeWidth={3}
            fill="url(#colorPrincipal)"
          />
          <Area
            type="monotone"
            dataKey="totalInterest" // This maps to the key in yearlyData array
            stackId="1"
            stroke="var(--color-primary-500)"
            strokeWidth={3}
            fill="url(#colorInterest)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
