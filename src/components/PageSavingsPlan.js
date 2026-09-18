import useCalculatorStore from "@/store/useCalculatorStore";
import { calculateSavingsPlan } from "@/lib/calculations";
import MasterInputForm from "./MasterInputForm";
import Chart from "./Chart";
import ScenarioList from "./ScenarioList";
import ScenarioCompareSelect from "./ScenarioCompareSelect";
import ExpandableRateCard from "./ExpandableRateCard";
import { useEffect } from "react";

export default function PageSavingsPlan() {
  const {
    targetAmount,
    startCapital,
    duration,
    interestRate,
    updateValue,
    comparisonScenario,
  } = useCalculatorStore();

  const result = calculateSavingsPlan(
    targetAmount,
    startCapital,
    duration,
    interestRate,
  );

  const comparisonResult = comparisonScenario
    ? calculateSavingsPlan(
        comparisonScenario.targetAmount,
        comparisonScenario.startCapital,
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

  useEffect(() => {
    updateValue("comparisonScenario", null);
  }, []);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 sm:gap-8 pt-4 sm:pt-6">
      <div className="w-full lg:w-1/3 bg-surface border border-border-subtle p-4 sm:p-6 rounded-2xl">
        <MasterInputForm sliders={savingsSliders} type="savings-plan" />
      </div>

      <div className="w-full lg:w-2/3 flex flex-col gap-4 sm:gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ExpandableRateCard
            label="Required Monthly Rate"
            value={currencyFormatter.format(result.requiredMonthlyRate)}
            valueSize="text-xl lg:text-2xl tracking-tight"
            valueColor="text-primary"
            finalAmount={targetAmount}
            duration={duration}
            monthlyRate={result.requiredMonthlyRate}
            totalInterest={totalInterest}
          />

          <div className="bg-surface border border-border-subtle p-4 sm:p-6 rounded-2xl flex flex-col justify-between">
            <p className="text-text-muted text-xs font-medium mb-1">
              Total Deposits
            </p>
            <p className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">
              {currencyFormatter.format(totalDeposits)}
            </p>
          </div>

          <div className="bg-surface border border-border-subtle p-4 sm:p-6 rounded-2xl flex flex-col justify-between">
            <p className="text-text-muted text-xs font-medium mb-1">
              Interest Received
            </p>
            <p className="text-xl lg:text-2xl font-bold text-gain tracking-tight">
              + {currencyFormatter.format(totalInterest)}
            </p>
          </div>
        </div>
        <div className="bg-surface border border-border-subtle p-4 sm:p-6 rounded-2xl text-sm text-text-muted leading-relaxed">
          <p>
            To reach your target of{" "}
            <strong className="text-foreground font-semibold">
              {currencyFormatter.format(targetAmount)}
            </strong>{" "}
            over {duration} {duration === 1 ? "year" : "years"} at an interest
            rate of{" "}
            <strong className="text-foreground font-semibold">
              {interestRate}%
            </strong>
            , you need a required monthly rate of{" "}
            <strong className="text-primary font-bold">
              {currencyFormatter.format(result.requiredMonthlyRate)}
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

        <div className="bg-surface border border-border-subtle p-4 sm:p-6 rounded-2xl h-[400px]">
          <Chart data={result.yearlyData} comparisonData={comparisonData} />
        </div>

        <ScenarioList />
      </div>
    </div>
  );
}
