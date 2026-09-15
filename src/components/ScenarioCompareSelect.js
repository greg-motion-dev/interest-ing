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
      <div className="text-secondary text-sm font-medium">
        Failed to load scenarios
      </div>
    );

  if (isLoading)
    return (
      <div className="text-text-muted text-sm animate-pulse">Loading...</div>
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
        className="text-text-muted text-sm font-medium"
      >
        Compare your current selection with a saved scenario:
      </label>
      <div className="relative">
        <select
          id="compare-select"
          value={comparisonScenario?._id || ""}
          onChange={handleSelect}
          className="bg-surface-elevated border border-border-subtle text-foreground text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent block w-full p-2.5 appearance-none cursor-pointer pr-10 transition-all"
        >
          <option value="">-- Select a scenario --</option>
          {availableScenarios.map((scenario) => (
            <option key={scenario._id} value={scenario._id}>
              {scenario.title} ({scenario.duration} yrs, {scenario.interestRate}
              %)
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-text-muted">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
