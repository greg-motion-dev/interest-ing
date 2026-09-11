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

  // to update individual range slider values
  updateValue: (key, value) => set({ [key]: value }),

  setActiveCalculator: (type) =>
    set({
      activeCalculator: type,
      activeScenarioId: null,
    }),

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
    }),

  clearActiveScenario: () => set({ activeScenarioId: null }),
}));

export default useCalculatorStore;
