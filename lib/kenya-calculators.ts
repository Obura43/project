export const KENYA_PAYROLL_LAST_REVIEWED = 'June 2026';

export const PAYE_TAX_BANDS = [
  { lower: 0, upper: 24000, rate: 0.1, label: 'First KES 24,000 at 10%' },
  { lower: 24000, upper: 32333, rate: 0.25, label: 'Next KES 8,333 at 25%' },
  { lower: 32333, upper: 500000, rate: 0.3, label: 'Next KES 467,667 at 30%' },
  { lower: 500000, upper: 800000, rate: 0.325, label: 'Next KES 300,000 at 32.5%' },
  { lower: 800000, upper: Infinity, rate: 0.35, label: 'Amount above KES 800,000 at 35%' },
];

export const PERSONAL_RELIEF = 2400;
export const INSURANCE_RELIEF_RATE = 0.15;
export const INSURANCE_RELIEF_CAP = 5000;
export const AFFORDABLE_HOUSING_LEVY_RATE = 0.015;
export const AFFORDABLE_HOUSING_RELIEF_RATE = 0.15;
export const AFFORDABLE_HOUSING_RELIEF_CAP = 9000;
export const SHA_RATE = 0.0275;
export const SHA_MINIMUM = 300;
export const NSSF_RATE = 0.06;
export const NSSF_LOWER_EARNINGS_LIMIT = 9000;
export const NSSF_UPPER_EARNINGS_LIMIT = 108000;

export function money(value: number): number {
  return Math.round(Number.isFinite(value) ? value : 0);
}

export function calculateNssf(pensionableEarnings: number) {
  const earnings = Math.max(0, pensionableEarnings);
  const tier1Earnings = Math.min(earnings, NSSF_LOWER_EARNINGS_LIMIT);
  const tier2Earnings = Math.min(
    Math.max(earnings - NSSF_LOWER_EARNINGS_LIMIT, 0),
    NSSF_UPPER_EARNINGS_LIMIT - NSSF_LOWER_EARNINGS_LIMIT
  );
  const tier1Contribution = tier1Earnings * NSSF_RATE;
  const tier2Contribution = tier2Earnings * NSSF_RATE;
  const employeeContribution = tier1Contribution + tier2Contribution;

  return {
    pensionableEarnings: money(earnings),
    tier1Contribution: money(tier1Contribution),
    tier2Contribution: money(tier2Contribution),
    employeeContribution: money(employeeContribution),
    employerContribution: money(employeeContribution),
    totalContribution: money(employeeContribution * 2),
  };
}

export function calculateSha(monthlyIncome: number) {
  const income = Math.max(0, monthlyIncome);
  if (income <= 0) return 0;
  return money(Math.max(income * SHA_RATE, SHA_MINIMUM));
}

export function calculateAffordableHousingLevy(grossSalary: number) {
  const gross = Math.max(0, grossSalary);
  const employeeLevy = gross * AFFORDABLE_HOUSING_LEVY_RATE;
  const employerLevy = gross * AFFORDABLE_HOUSING_LEVY_RATE;

  return {
    employeeLevy: money(employeeLevy),
    employerLevy: money(employerLevy),
    totalLevy: money(employeeLevy + employerLevy),
    employeeRelief: money(
      Math.min(employeeLevy * AFFORDABLE_HOUSING_RELIEF_RATE, AFFORDABLE_HOUSING_RELIEF_CAP)
    ),
  };
}

export function calculatePayeBeforeRelief(taxablePay: number) {
  let tax = 0;
  for (const band of PAYE_TAX_BANDS) {
    if (taxablePay <= band.lower) continue;
    const taxableInBand = Math.min(taxablePay, band.upper) - band.lower;
    tax += taxableInBand * band.rate;
    if (taxablePay <= band.upper) break;
  }
  return tax;
}

export function calculatePaye(input: {
  grossSalary: number;
  pensionContribution?: number;
  insurancePremium?: number;
  otherDeductions?: number;
  includeAffordableHousingRelief?: boolean;
}) {
  const grossSalary = Math.max(0, input.grossSalary);
  const pensionContribution = Math.max(0, input.pensionContribution || 0);
  const insurancePremium = Math.max(0, input.insurancePremium || 0);
  const otherDeductions = Math.max(0, input.otherDeductions || 0);
  const nssf = calculateNssf(grossSalary);
  const sha = calculateSha(grossSalary);
  const affordableHousing = calculateAffordableHousingLevy(grossSalary);
  const taxablePay = Math.max(0, grossSalary - nssf.employeeContribution - pensionContribution);
  const payeBeforeRelief = calculatePayeBeforeRelief(taxablePay);
  const insuranceRelief = Math.min(insurancePremium * INSURANCE_RELIEF_RATE, INSURANCE_RELIEF_CAP);
  const affordableHousingRelief = input.includeAffordableHousingRelief === false
    ? 0
    : affordableHousing.employeeRelief;
  const totalRelief = PERSONAL_RELIEF + insuranceRelief + affordableHousingRelief;
  const paye = Math.max(0, payeBeforeRelief - totalRelief);
  const netPay = grossSalary - paye - nssf.employeeContribution - sha - affordableHousing.employeeLevy - otherDeductions;

  return {
    grossSalary: money(grossSalary),
    taxablePay: money(taxablePay),
    payeBeforeRelief: money(payeBeforeRelief),
    personalRelief: PERSONAL_RELIEF,
    insuranceRelief: money(insuranceRelief),
    affordableHousingRelief: money(affordableHousingRelief),
    totalRelief: money(totalRelief),
    paye: money(paye),
    sha,
    nssf: nssf.employeeContribution,
    affordableHousingLevy: affordableHousing.employeeLevy,
    otherDeductions: money(otherDeductions),
    netPay: money(netPay),
  };
}
