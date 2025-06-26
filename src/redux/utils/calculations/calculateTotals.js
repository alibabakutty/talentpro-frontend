import { formatINRWithIndex } from "../rupee-format/formatINRWithIndex";

export const calculateTotals = (ledgerTransactions) => {
  let totalDebitAmount = 0;
  let totalCreditAmount = 0;
  let totalCostCenterAmountDebit = 0;
  let totalCostCenterAmountCredit = 0;

  ledgerTransactions.forEach((row) => {
    const debitAmount =
      parseFloat(
        String(row.debitAmount || '')
          .replace(/,/g, '')
          .replace(/[^\d.-]/g, ''),
      ) || 0;
    const creditAmount =
      parseFloat(
        String(row.creditAmount || '')
          .replace(/,/g, '')
          .replace(/[^\d.-]/g, ''),
      ) || 0;
    const costCenterAmountDebit =
      parseFloat(
        String(row.costCenterAmountDebit || '')
          .replace(/,/g, '')
          .replace(/[^\d.-]/g, ''),
      ) || 0;
    const costCenterAmountCredit =
      parseFloat(
        String(row.costCenterAmountCredit || '')
          .replace(/,/g, '')
          .replace(/[^\d.-]/g, ''),
      ) || 0;

    totalDebitAmount += debitAmount;
    totalCreditAmount += creditAmount;
    totalCostCenterAmountDebit += costCenterAmountDebit;
    totalCostCenterAmountCredit += costCenterAmountCredit;
  });

  return {
    totalDebitAmount: totalDebitAmount.toFixed(2),
    totalDebitAmountFormatted: formatINRWithIndex(totalDebitAmount),
    totalCreditAmount: totalCreditAmount.toFixed(2),
    totalCreditAmountFormatted: formatINRWithIndex(totalCreditAmount),
    totalCostCenterAmountDebit: totalCostCenterAmountDebit.toFixed(2),
    totalCostCenterAmountDebitFormatted: formatINRWithIndex(totalCostCenterAmountDebit),
    totalCostCenterAmountCredit: totalCostCenterAmountCredit.toFixed(2),
    totalCostCenterAmountCreditFormatted: formatINRWithIndex(totalCostCenterAmountCredit),
  };
};