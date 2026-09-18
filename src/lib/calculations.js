export default function calculateCompoundInterest(
  startCapital,
  monthlyRate,
  duration,
  interestRate,
) {
  startCapital = Number(startCapital) || 0;
  monthlyRate = Number(monthlyRate) || 0;
  duration = Number(duration) || 0;
  interestRate = Number(interestRate) || 0;

  let currentCapital = startCapital;
  let totalPrincipal = startCapital;
  let yearlyData = [
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
  targetAmount,
  startCapital,
  duration,
  interestRate,
) {
  targetAmount = Number(targetAmount) || 0;
  startCapital = Number(startCapital) || 0;
  duration = Number(duration) || 0;
  interestRate = Number(interestRate) || 0;

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
  const yearlyData = [
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
