import useCalculatorStore from "@/store/useCalculatorStore";
import calculateCompoundInterest from "@/lib/calculations";
import MasterInputForm from "./MasterInputForm";
import Chart from "./Chart";
import ScenarioList from "./ScenarioList";
import ScenarioCompareSelect from "./ScenarioCompareSelect";
import { useEffect } from "react";

export default function PageCompound() {
  const {
    startCapital,
    monthlyRate,
    duration,
    interestRate,
    updateValue,
    comparisonScenario,
  } = useCalculatorStore();

  const result = calculateCompoundInterest(
    startCapital,
    monthlyRate,
    duration,
    interestRate,
  );

  const comparisonResult = comparisonScenario
    ? calculateCompoundInterest(
        comparisonScenario.startCapital,
        comparisonScenario.monthlyRate,
        comparisonScenario.duration,
        comparisonScenario.interestRate,
      )
    : null;

  const comparisonData = comparisonResult ? comparisonResult.yearlyData : null;

  const currencyFormatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const compoundSliders = [
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
      label: "Monthly Rate",
      min: 0,
      max: 10000,
      value: monthlyRate,
      onChange: (val) => updateValue("monthlyRate", val),
      sliderName: "monthlyRate",
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

  const finalYearData = result.yearlyData[result.yearlyData.length - 1];
  const totalDeposits = finalYearData?.totalPrincipal || startCapital;
  const totalInterest = finalYearData?.totalInterest || 0;

  const resultMetrics = [
    {
      id: "final-capital",
      label: "Final Capital",
      value: currencyFormatter.format(result.finalCapital),
      valueColor: "text-foreground",
    },
    {
      id: "total-deposits",
      label: "Total Deposits",
      value: currencyFormatter.format(totalDeposits),
      valueColor: "text-foreground",
    },
    {
      id: "total-interest",
      label: "Interest Received",
      value: `+ ${currencyFormatter.format(totalInterest)}`,
      valueColor: "text-gain",
    },
  ];

  const compoundSummaryText = `If you invest ${currencyFormatter.format(monthlyRate)} monthly for ${duration} ${duration === 1 ? "year" : "years"} at an interest rate of ${interestRate}%, you will end up with a final capital of ${currencyFormatter.format(result.finalCapital)}. This consists of ${currencyFormatter.format(totalDeposits)} in total deposits and ${currencyFormatter.format(totalInterest)} in interest or capital gains.`;

  useEffect(() => {
    updateValue("comparisonScenario", null);
  }, []);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 p-6">
      <div className="w-full lg:w-1/3 bg-surface border border-border-subtle p-6 rounded-2xl">
        <MasterInputForm sliders={compoundSliders} type="compound-interest" />
      </div>

      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {resultMetrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-surface border border-border-subtle p-6 rounded-2xl flex flex-col justify-between"
            >
              <p className="text-text-muted text-xs font-medium mb-1">
                {metric.label}
              </p>
              <p
                className={`text-xl lg:text-2xl font-bold tracking-tight ${metric.valueColor}`}
              >
                {metric.value}
              </p>
            </div>
          ))}
        </div>
        <div className="bg-surface border border-border-subtle p-6 rounded-2xl text-sm text-text-muted leading-relaxed">
          <p>
            If you invest{" "}
            <strong className="text-foreground font-semibold">
              {currencyFormatter.format(monthlyRate)}
            </strong>{" "}
            monthly for {duration} {duration === 1 ? "year" : "years"} at an
            interest rate of{" "}
            <strong className="text-foreground font-semibold">
              {interestRate}%
            </strong>
            , you will end up with a final capital of{" "}
            <strong className="text-primary font-bold">
              {currencyFormatter.format(result.finalCapital)}
            </strong>
            . This consists of{" "}
            <strong className="text-foreground font-semibold">
              {currencyFormatter.format(totalDeposits)}
            </strong>{" "}
            in total deposits and{" "}
            <strong className="text-gain font-bold">
              + {currencyFormatter.format(totalInterest)}
            </strong>{" "}
            in interest or capital gains.
          </p>
        </div>
        <ScenarioCompareSelect />
        <div className="bg-surface border border-border-subtle p-6 rounded-2xl h-[400px]">
          <Chart data={result.yearlyData} comparisonData={comparisonData} />
        </div>
        <ScenarioList />
      </div>
    </div>
  );
}
