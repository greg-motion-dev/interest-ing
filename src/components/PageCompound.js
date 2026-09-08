import useCalculatorStore from "@/store/useCalculatorStore";
import calculateCompoundInterest from "@/lib/calculations";
import MasterInputForm from "./MasterInputForm";
import ChartCompound from "./ChartCompound";

export default function PageCompound() {
  const startCapital = useCalculatorStore((state) => state.startCapital);
  const monthlyRate = useCalculatorStore((state) => state.monthlyRate);
  const duration = useCalculatorStore((state) => state.duration);
  const interestRate = useCalculatorStore((state) => state.interestRate);
  const setStartCapital = useCalculatorStore((state) => state.setStartCapital);

  const result = calculateCompoundInterest(
    startCapital,
    monthlyRate,
    duration,
    interestRate,
  );

  return (
    <div className="fw-full flex flex-col lg:flex-row gap-8 p-6">
      {/* left inputs */}
      <div className="w-full lg:w-1/3 bg-zinc-900 p-6 rounded-2xl">
        <MasterInputForm />
      </div>
      {/* right visualization & summary */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        {/* summary for now, needs more info */}
        <div className="bg-zinc-900 p-6 rounded-2xl flex justify-between items-center">
          <div>
            <p className="text-zinc-400 text-sm">Final Capital</p>
            <p className="text-3xl font-bold text-white">
              € {result.finalCapital.toFixed(0)}
            </p>
          </div>
        </div>

        {/* recharts */}
        <div className="bg-zinc-900 p-6 rounded-2xl h-[400px]">
          <ChartCompound data={result.yearlyData} />
        </div>
      </div>
    </div>
  );
}
