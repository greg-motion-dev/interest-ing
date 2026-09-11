import useCalculatorStore from "@/store/useCalculatorStore";
import calculateCompoundInterest from "@/lib/calculations";
import MasterInputForm from "./MasterInputForm";
import ChartCompound from "./ChartCompound";
import ScenarioList from "./ScenarioList";

export default function PageCompound() {
  const startCapital = useCalculatorStore((state) => state.startCapital);
  const monthlyRate = useCalculatorStore((state) => state.monthlyRate);
  const duration = useCalculatorStore((state) => state.duration);
  const interestRate = useCalculatorStore((state) => state.interestRate);

  const result = calculateCompoundInterest(
    startCapital,
    monthlyRate,
    duration,
    interestRate,
  );

  const currencyFormatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const finalYearData = result.yearlyData[result.yearlyData.length - 1];
  const totalDeposits = finalYearData?.totalPrincipal || startCapital;
  const totalInterest = finalYearData?.totalInterest || 0;

  const resultMetrics = [
    {
      id: "final-capital",
      label: "Final Capital",
      value: currencyFormatter.format(result.finalCapital),
      valueColor: "text-white",
    },
    {
      id: "total-deposits",
      label: "Total Deposits",
      value: currencyFormatter.format(totalDeposits),
      valueColor: "text-white",
    },
    {
      id: "total-interest",
      label: "Interest Received",
      value: `+ ${currencyFormatter.format(totalInterest)}`,
      valueColor: "var(--color-primary-500)",
    },
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 p-6">
      {/* left inputs */}
      <div className="w-full lg:w-1/3 bg-zinc-900 p-6 rounded-2xl">
        <MasterInputForm />
      </div>
      {/* right visualization & summary */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        {/* summary for now, needs more info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {resultMetrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-zinc-900 p-6 rounded-2xl flex flex-col"
            >
              <p className="text-zinc-400 text-sm mb-1">{metric.label}</p>
              <p
                className={`text-2xl lg:text-3xl font-bold ${metric.valueColor}`}
              >
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* recharts */}
        <div className="bg-zinc-900 p-6 rounded-2xl h-[400px]">
          <ChartCompound data={result.yearlyData} />
        </div>
        <ScenarioList />
      </div>
    </div>
  );
}
