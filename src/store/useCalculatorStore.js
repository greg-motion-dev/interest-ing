import { create } from "zustand";

const useCalculatorStore = create((set) => ({
  //main variables tahta re shared among all three calculators

  startCapital: 5000,
  monthlyRate: 1000,
  duration: 12, // meaning 12 months
  interestRate: 5, // for example 5%

  setStartCapital: (value) => set({ startCapital: value }),
  setMonthlyRate: (value) => set({ monthlyRate: value }),
  setDuration: (value) => set({ duration: value }),
  setInterestRate: (value) => set({ interestRate: value }),
}));

export default useCalculatorStore;
