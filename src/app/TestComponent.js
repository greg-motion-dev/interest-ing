import useCalculatorStore from "@/store/useCalculatorStore";
import calculateCompoundInterest from "@/lib/calculations";

export function TestComponent() {
  const startCapital = useCalculatorStore((state) => state.startCapital);
  const monthlyRate = useCalculatorStore((state) => state.monthlyRate);
  const duration = useCalculatorStore((state) => state.duration);
  const interestRate = useCalculatorStore((state) => state.interestRate);
  const setStartCapital = useCalculatorStore((state) => state.setStartCapital);

  //test math engine inside the component with current store values

  const result = calculateCompoundInterest(
    startCapital,
    monthlyRate,
    duration,
    interestRate,
  );

  // will be deleted in final code
  console.log("Current Store Values:", {
    startCapital,
    monthlyRate,
    duration,
    interestRate,
  });
  console.log("Calculation Result:", result);

  return (
    <div className="p-6">
      <p> Current Startcapital: {startCapital} EUR</p>
      <p> Monthly Rate: {monthlyRate} EUR</p>
      <p>
        {" "}
        Duration: {duration} months ({Math.floor(duration / 12)} year(s))
      </p>
      <p> Interest Rate: {interestRate} %</p>

      <div className="p-4 bg-white dark:bg-black rounded border border-zinc-200 dark:border-zinc-800">
        <p>Final Capital: {result.finalCapital.toFixed(2)} </p>
        <p>Yearly Data Points: {result.yearlyData.length} </p>
      </div>

      <button
        onClick={() => setStartCapital(startCapital + 500)}
        className="bg-[var(--color-primary-500)] mt-5 text-white px-4 py-2 rounded"
      >
        add +500 EUR
      </button>
    </div>
  );
}
/*---TESTING CALCULATION---*/
