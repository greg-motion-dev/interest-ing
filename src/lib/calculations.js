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

  //loop through every month to add compound interest
  for (let month = 1; month <= duration; month++) {
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
