import useCalculatorStore from "@/store/useCalculatorStore";
import { calculateSavingsPlan } from "@/lib/calculations";
import MasterInputForm from "./MasterInputForm";
import Chart from "./Chart";
import ScenarioList from "./ScenarioList";

export default function PageSavingsPlan() {
  const { targetAmount, startCapital, duration, interestRate, updateValue } =
    useCalculatorStore();

  const result = calculateSavingsPlan(
    targetAmount,
    startCapital,
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

  const savingsSliders = [
    {
      label: "Target Amount",
      min: 1000,
      max: 1000000,
      value: targetAmount,
      onChange: (val) => updateValue("targetAmount", val),
      sliderName: "targetAmount",
      unit: "€",
    },
    {
      label: "Start Capital",
      min: 0,
      max: 50000,
      value: startCapital,
      onChange: (val) => updateValue("startCapital", val),
      sliderName: "startCapital",
      unit: "€",
    },
    {
      label: "Duration",
      min: 0,
      max: 100,
      value: duration,
      onChange: (val) => updateValue("duration", val),
      sliderName: "duration",
      unit: "Years",
    },
    {
      label: "Interest Rate",
      min: 0,
      max: 15,
      value: interestRate,
      onChange: (val) => updateValue("interestRate", val),
      sliderName: "interestRate",
      unit: "%",
    },
  ];

  const resultMetrics = [
    {
      id: "required-rate",
      label: "Required Monthly Rate",
      value: currencyFormatter.format(result.requiredMonthlyRate),
      valueColor: "text-blue-400",
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
      valueColor: "text-emerald-400",
    },
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 p-6">
      <div className="w-full lg:w-1/3 bg-zinc-900 p-6 rounded-2xl">
        <MasterInputForm sliders={savingsSliders} type="savings-plan" />
      </div>

      <div className="w-full lg:w-2/3 flex flex-col gap-6">
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

        <div className="bg-zinc-900 p-6 rounded-2xl h-[400px]">
          <Chart data={result.yearlyData} />
        </div>

        <ScenarioList />
      </div>
    </div>
  );
}
