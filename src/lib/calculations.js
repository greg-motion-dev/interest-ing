export default function calculateCompoundInterest(
  startCapital,
  monthlyRate,
  duration,
  interestRate,
) {
  //prevent NaN by turning incoming values to numbers
  startCapital = Number(startCapital) || 0;
  monthlyRate = Number(monthlyRate) || 0;
  duration = Number(duration) || 0;
  interestRate = Number(interestRate) || 0;

  let currentCapital = startCapital;
  let totalPrincipal = startCapital; // reines Einzahlungskapital
  let yearlyData = [];

  // monthly interest rate of the annual interest rate
  const monthlyInterestRate = interestRate / 100 / 12;

  const durationInMonths = duration * 12;

  //loop through every month to add compound interest
  for (let month = 1; month <= durationInMonths; month++) {
    currentCapital = currentCapital * (1 + monthlyInterestRate);
    currentCapital += monthlyRate;
    totalPrincipal += monthlyRate;

    if (month % 12 === 0) {
      const year = month / 12;

      //pure interest gathered in a year
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
  targetAmount,
  startCapital,
  duration,
  interestRate,
) {
  //prevent NaN by turning incoming values to numbers
  targetAmount = Number(targetAmount) || 0;
  startCapital = Number(startCapital) || 0;
  duration = Number(duration) || 0;
  interestRate = Number(interestRate) || 0;

  const durationInMonths = duration * 12;
  const monthlyInterestRate = interestRate / 100 / 12;

  let requiredMonthlyRate = 0;

  // Handle 0% interest edge case to avoid division by zero
  if (monthlyInterestRate === 0) {
    requiredMonthlyRate = (targetAmount - startCapital) / durationInMonths;
  } else {
    const compoundFactor = Math.pow(1 + monthlyInterestRate, durationInMonths);
    const futureValueOfStartCapital = startCapital * compoundFactor;

    // If startCcapital alone already exceeds the target due to interest, no monthly rate is needed
    if (futureValueOfStartCapital >= targetAmount) {
      requiredMonthlyRate = 0;
    } else {
      requiredMonthlyRate =
        (targetAmount - futureValueOfStartCapital) *
        (monthlyInterestRate / (compoundFactor - 1));
    }
  }

  // How to prrevent negative savings rates
  requiredMonthlyRate = Math.max(0, requiredMonthlyRate);

  // Generate the chart data matching the exact structure of the compound calculator
  let currentCapital = startCapital;
  let totalPrincipal = startCapital;
  const yearlyData = [];

  for (let month = 1; month <= durationInMonths; month++) {
    currentCapital = currentCapital * (1 + monthlyInterestRate);
    currentCapital += requiredMonthlyRate;
    totalPrincipal += requiredMonthlyRate;

    if (month % 12 === 0) {
      const year = month / 12;
      const totalInterest = currentCapital - totalPrincipal;
      yearlyData.push({ year, totalPrincipal, totalInterest });
    }
  }

  return {
    requiredMonthlyRate,
    finalCapital: currentCapital, // Will match targetAmount
    yearlyData,
  };
}
