import useCalculatorStore from "@/store/useCalculatorStore";
import { calculateSavingsPlan } from "@/lib/calculations";
import MasterInputForm from "./MasterInputForm";
import Chart from "./Chart";
import ScenarioList from "./ScenarioList";
import ScenarioCompareSelect from "./ScenarioCompareSelect";
import ExpandableRateCard from "./ExpandableRateCard"; // <-- Import the new card

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

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 p-6">
      <div className="w-full lg:w-1/3 bg-surface border border-border-subtle p-6 rounded-2xl">
        <MasterInputForm sliders={savingsSliders} type="savings-plan" />
      </div>

      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        {/* Unpacked Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* The Smart Expandable AI Card */}
          <ExpandableRateCard
            label="Required Monthly Rate"
            value={currencyFormatter.format(result.requiredMonthlyRate)}
            valueColor="text-primary"
            finalAmount={targetAmount}
            duration={duration}
            monthlyRate={result.requiredMonthlyRate}
            totalInterest={totalInterest}
          />

          {/* Standard Metric 2 */}
          <div className="bg-surface border border-border-subtle p-6 rounded-2xl flex flex-col">
            <p className="text-text-muted text-sm mb-1">Total Deposits</p>
            <p className="text-2xl lg:text-3xl font-bold text-foreground">
              {currencyFormatter.format(totalDeposits)}
            </p>
          </div>

          {/* Standard Metric 3 */}
          <div className="bg-surface border border-border-subtle p-6 rounded-2xl flex flex-col">
            <p className="text-text-muted text-sm mb-1">Interest Received</p>
            <p className="text-2xl lg:text-3xl font-bold text-gain">
              + {currencyFormatter.format(totalInterest)}
            </p>
          </div>
        </div>

        <ScenarioCompareSelect />

        {/* The ActionPlanCard is gone, keeping the layout perfectly clean! */}

        <div className="bg-surface border border-border-subtle p-6 rounded-2xl h-[400px]">
          <Chart data={result.yearlyData} comparisonData={comparisonData} />
        </div>

        <ScenarioList />
      </div>
    </div>
  );
}
