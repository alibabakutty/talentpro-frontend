export const calculateTotals = ledgerTransactions => {
  let totalDebitAmount = 0;
  let totalCreditAmount = 0;
  let totalCostCenterAmountDebit = 0;
  let totalCostCenterAmountCredit = 0;

  const updatedLedgerTransactions = ledgerTransactions.map((row, index) => {
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

    return {
        
    };
  });
};
