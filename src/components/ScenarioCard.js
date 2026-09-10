export default function ScenarioCard({
  title,
  type,
  startCapital,
  monthlyRate,
  duration,
  interestRate,
}) {
  const metrics = [
    { label: "Start Capital", value: startCapital, unit: "€" },
    { label: "Monthly Rate", value: monthlyRate, unit: "€" },
    { label: "Duration", value: duration, unit: "Years" },
    { label: "Interest Rate", value: interestRate, unit: "%" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
      <div className="flex justify-between items-start">
        <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
          placeholder 📈{type}
        </span>
        <h3>{title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          {metrics.map((metric) => (
            <div key={metric.label}>
              <span className="block text-gray-400 text-xs">
                {metric.label}
              </span>
              <span className="font-medium text-gray-800">
                {metric.value} {metric.unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
