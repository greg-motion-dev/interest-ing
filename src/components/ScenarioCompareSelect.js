import useSWR from "swr";
import useCalculatorStore from "@/store/useCalculatorStore";
import { useState, useEffect, useRef } from "react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function ScenarioCompareSelect() {
  const {
    activeScenarioId,
    activeCalculator,
    comparisonScenario,
    setComparisonScenario,
    clearComparisonScenario,
  } = useCalculatorStore();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const {
    data: scenarios,
    error,
    isLoading,
  } = useSWR("/api/scenarios", fetcher);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  return (
    <div className="flex flex-col gap-2 mb-6 relative" ref={dropdownRef}>
      <label className="text-text-muted text-sm font-medium">
        Compare your current selection with a saved scenario:
      </label>

      {/* Custom Select Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border text-sm font-medium transition-all backdrop-blur-md  ${
          comparisonScenario
            ? "border-secondary text-secondary bg-secondary/10"
            : "border-border-subtle text-foreground bg-surface-elevated/50 hover:border-border"
        }`}
      >
        <span>
          {comparisonScenario
            ? `${comparisonScenario.title} (${comparisonScenario.duration} yrs, ${comparisonScenario.interestRate}%)`
            : "-- Select a scenario --"}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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
      </button>

      {/* Custom Dropdown Menu Options */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-surface border border-border-subtle rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl">
          {/* Clear Option */}
          <button
            type="button"
            onClick={() => {
              clearComparisonScenario();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-sm text-text-muted hover:bg-surface-elevated transition-colors border-b border-border-subtle"
          >
            -- None (Clear comparison) --
          </button>

          {availableScenarios.map((scenario) => {
            const isSelected = comparisonScenario?._id === scenario._id;
            return (
              <button
                key={scenario._id}
                type="button"
                onClick={() => {
                  setComparisonScenario(scenario);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors border-b border-border-subtle last:border-0 ${
                  isSelected
                    ? "bg-secondary/10 text-secondary font-semibold"
                    : "text-foreground hover:bg-surface-elevated"
                }`}
              >
                <span>
                  {scenario.title} ({scenario.duration} yrs,{" "}
                  {scenario.interestRate}
                  %)
                </span>
                {isSelected && (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary/20 text-secondary">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
