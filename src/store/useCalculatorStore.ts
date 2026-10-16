import { create } from "zustand";
import type { CalculatorType, SavedScenario } from "@/types/calculator";

interface CalculatorState {
  // Core common denominators
  startCapital: number;
  monthlyRate: number;
  duration: number;
  interestRate: number;
  targetAmount: number;

  activeScenarioId: string | null;
  activeCalculator: CalculatorType;

  // Comparison state
  comparisonScenario: SavedScenario | null;
  setComparisonScenario: (scenario: SavedScenario | null) => void;
  clearComparisonScenario: () => void;

  // Value updater for range sliders
  updateValue: <K extends keyof CalculatorState>(
    key: K,
    value: CalculatorState[K],
  ) => void;

  // Scenario loading & tab actions
  loadScenario: (scenario: SavedScenario) => void;
  clearActiveScenario: () => void;
  setActiveCalculator: (type: CalculatorType) => void;
}

const useCalculatorStore = create<CalculatorState>((set) => ({
  // Core initial values
  startCapital: 5000,
  monthlyRate: 1000,
  duration: 12,
  interestRate: 5,
  targetAmount: 50000,

  activeScenarioId: null,
  activeCalculator: "compound-interest",

  // Compare charts/scenarios
  comparisonScenario: null,
  setComparisonScenario: (scenario) => set({ comparisonScenario: scenario }),
  clearComparisonScenario: () => set({ comparisonScenario: null }),

  // Update individual range slider or state values
  updateValue: (key, value) => set((state) => ({ ...state, [key]: value })),

  // Load scenario and switch active tab
  loadScenario: (scenario) =>
    set({
      startCapital: scenario.startCapital,
      monthlyRate: scenario.monthlyRate || 0,
      duration: scenario.duration,
      interestRate: scenario.interestRate,
      targetAmount: scenario.targetAmount || 50000,
      activeScenarioId: scenario._id,
      activeCalculator: scenario.type || "compound-interest",
      comparisonScenario: null, // clear comparison when loading new scenario
    }),

  clearActiveScenario: () =>
    set({ activeScenarioId: null, comparisonScenario: null }),

  setActiveCalculator: (type) =>
    set({
      activeCalculator: type,
      activeScenarioId: null,
    }),
}));

export default useCalculatorStore;
