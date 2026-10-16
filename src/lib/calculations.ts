import type {
  YearlyDataPoint,
  CompoundCalculationResult,
  SavingsPlanCalculationResult,
} from "@/types/calculator";

export default function calculateCompoundInterest(
  startCapitalInput: number | string,
  monthlyRateInput: number | string,
  durationInput: number | string,
  interestRateInput: number | string,
): CompoundCalculationResult {
  const startCapital = Number(startCapitalInput) || 0;
  const monthlyRate = Number(monthlyRateInput) || 0;
  const duration = Number(durationInput) || 0;
  const interestRate = Number(interestRateInput) || 0;

  let currentCapital = startCapital;
  let totalPrincipal = startCapital;
  const yearlyData: YearlyDataPoint[] = [
    {
      year: 0,
      totalPrincipal: startCapital,
      totalInterest: 0,
    },
  ];

  const monthlyInterestRate = interestRate / 100 / 12;
  const durationInMonths = duration * 12;

  for (let month = 1; month <= durationInMonths; month++) {
    currentCapital += monthlyRate;
    currentCapital = currentCapital * (1 + monthlyInterestRate);
    totalPrincipal += monthlyRate;

    if (month % 12 === 0) {
      const year = month / 12;
      const totalInterest = currentCapital - totalPrincipal;
      yearlyData.push({ year, totalPrincipal, totalInterest });
    }
  }

  return {
    finalCapital: currentCapital,
    yearlyData,
  };
}

export function calculateSavingsPlan(
  targetAmountInput: number | string,
  startCapitalInput: number | string,
  durationInput: number | string,
  interestRateInput: number | string,
): SavingsPlanCalculationResult {
  const targetAmount = Number(targetAmountInput) || 0;
  const startCapital = Number(startCapitalInput) || 0;
  const duration = Number(durationInput) || 0;
  const interestRate = Number(interestRateInput) || 0;

  if (duration <= 0) {
    return {
      requiredMonthlyRate: 0,
      finalCapital: startCapital,
      yearlyData: [
        {
          year: 0,
          totalPrincipal: startCapital,
          totalInterest: 0,
        },
      ],
    };
  }

  const durationInMonths = duration * 12;
  const monthlyInterestRate = interestRate / 100 / 12;

  let requiredMonthlyRate = 0;

  if (monthlyInterestRate === 0) {
    requiredMonthlyRate = (targetAmount - startCapital) / durationInMonths;
  } else {
    const compoundFactor = Math.pow(1 + monthlyInterestRate, durationInMonths);
    const futureValueOfStartCapital = startCapital * compoundFactor;

    if (futureValueOfStartCapital >= targetAmount) {
      requiredMonthlyRate = 0;
    } else {
      requiredMonthlyRate =
        (targetAmount - futureValueOfStartCapital) *
        (monthlyInterestRate /
          ((compoundFactor - 1) * (1 + monthlyInterestRate)));
    }
  }

  requiredMonthlyRate = Math.max(0, requiredMonthlyRate);

  let currentCapital = startCapital;
  let totalPrincipal = startCapital;
  const yearlyData: YearlyDataPoint[] = [
    {
      year: 0,
      totalPrincipal: startCapital,
      totalInterest: 0,
    },
  ];

  for (let month = 1; month <= durationInMonths; month++) {
    currentCapital += requiredMonthlyRate;
    currentCapital = currentCapital * (1 + monthlyInterestRate);
    totalPrincipal += requiredMonthlyRate;

    if (month % 12 === 0) {
      const year = month / 12;
      const totalInterest = currentCapital - totalPrincipal;
      yearlyData.push({ year, totalPrincipal, totalInterest });
    }
  }

  return {
    requiredMonthlyRate,
    finalCapital: currentCapital,
    yearlyData,
  };
}
