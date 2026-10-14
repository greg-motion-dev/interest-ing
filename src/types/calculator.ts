export type CalculatorType = "compound-interest" | "savings-plan";

export interface YearlyDataPoint {
  year: number;
  totalPrincipal: number;
  totalInterest: number;
  compTotalPrincipal?: number;
  compTotalInterest?: number;
}

export interface CompoundCalculationResult {
  finalCapital: number;
  yearlyData: YearlyDataPoint[];
}

export interface SavingsPlanCalculationResult {
  requiredMonthlyRate: number;
  finalCapital: number;
  yearlyData: YearlyDataPoint[];
}

export interface SliderConfig {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (val: number) => void;
  sliderName: string;
  unit: string;
  step?: number;
  sliderId?: string;
}

export interface SavedScenario {
  _id: string;
  title: string;
  type: CalculatorType;
  startCapital: number;
  monthlyRate: number;
  targetAmount: number;
  duration: number;
  interestRate: number;
  createdAt?: string;
  updatedAt?: string;
}
