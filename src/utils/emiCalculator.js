export function calculateEmi({ price, downPayment, tenure, interestRate }) {
  // const downPayment = (price * 0.2) / 100;
  const loanAmount = price - downPayment;
  const monthlyRate = interestRate / 12 / 100;

  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1);

  const totalPayment = emi * tenure;
  const interestAmount = totalPayment - loanAmount;

  return {
    emi,
    totalPayment,
    interestAmount,
    loanAmount,
    downPayment,
  };
}
