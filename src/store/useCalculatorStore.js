import { create } from "zustand";

const useCalculatorStore = create((set) => ({
  //Core common denominators
  startCapital: 5000,
  monthlyRate: 1000,
  duration: 12, // meaning 12 months
  interestRate: 5, // for example 5%

  targetAmount: 50000, // new value for "savings calculator"

  activeScenarioId: null,
  activeCalculator: "compound-interest",

  //compare charts/scenarios
  comparisonScenario: null,
  setComparisonScenario: (scenario) => set({ comparisonScenario: scenario }),
  clearComparisonScenario: () => set({ comparisonScenario: null }),

  // to update individual range slider values
  updateValue: (key, value) => set({ [key]: value }),

  //load scenario and switchj the active tab
  loadScenario: (scenario) =>
    set({
      startCapital: scenario.startCapital,
      monthlyRate: scenario.monthlyRate,
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
