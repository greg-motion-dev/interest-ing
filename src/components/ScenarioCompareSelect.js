import useSWR from "swr";
import useCalculatorStore from "@/store/useCalculatorStore";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function ScenarioCompareSelect() {
  const {
    activeScenarioId,
    activeCalculator,
    comparisonScenario,
    setComparisonScenario,
    clearComparisonScenario,
  } = useCalculatorStore();

  const {
    data: scenarios,
    error,
    isLoading,
  } = useSWR("/api/scenarios", fetcher);

  if (error)
    return (
      <div className="text-[var(--color-secondary-500)]">
        Failed to load scenarios
      </div>
    );

  if (isLoading)
    return (
      <div className="text-zinc-500 text-sm animate-pulse">Loading...</div>
    );

  if (!scenarios || scenarios.length === 0) return null;

  //only display scenarios of same type
  const availableScenarios = scenarios.filter(
    (scenario) =>
      scenario.type === activeCalculator && scenario._id !== activeScenarioId,
  );

  if (availableScenarios.length === 0) return null;

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      clearComparisonScenario();
      return;
    }
    const selected = availableScenarios.find((s) => s._id === selectedId);
    if (selected) {
      setComparisonScenario(selected);
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-6">
      <label
        htmlFor="compare-select"
        className="text-zinc-400 text-sm font-medium"
      >
        Compare your current selection with a saved scenario:
      </label>
      <select
        id="compare-select"
        value={comparisonScenario?._id || ""}
        onChange={handleSelect}
        className="bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none appearance-none cursor-pointer"
      >
        <option value="">-- Select a scenario --</option>
        {availableScenarios.map((scenario) => (
          <option key={scenario._id} value={scenario._id}>
            {scenario.title} ({scenario.duration} yrs, {scenario.interestRate}%)
          </option>
        ))}
      </select>
    </div>
  );
}
