import { setModeLedger } from "../../slices/ledgerSlice";
import { createLedger, updateLedger } from "../../thunks/ledgerThunks";

export const handleLedgerSubmit = async (e, mode, ledger, dispatch, navigate, datas, inputRef) => {
    if (e) e.preventDefault();

    try {
        // Filter out transactions with empty ledgerName
        const filteredTransactions = ledger.ledgerTransactions
            ?.filter(transaction => transaction.ledgerName?.trim() !== '')
            ?.map(transaction => ({
                ...transaction,
                debitAmount: parseFloat(String(transaction.debitAmount || '0').replace(/,/g, '')) || 0,
                creditAmount: parseFloat(String(transaction.creditAmount || '0').replace(/,/g, '')) || 0,
                costCenterAmountDebit: parseFloat(String(transaction.costCenterAmountDebit || '0').replace(/,/g, '')) || 0,
                costCenterAmountCredit: parseFloat(String(transaction.costCenterAmountCredit || '0').replace(/,/g, '')) || 0,
            })) || [];

        const ledgerData = {
            ...ledger,
            ledgerTime: new Date().toISOString(),
            ledgerTransactions: filteredTransactions
        };

        if (mode === 'create') {
            await dispatch(createLedger(ledgerData));
            inputRef.current[0].focus();
            dispatch(setModeLedger('create'));
        } else if (mode === 'update') {
            await dispatch(updateLedger({ id: datas, data: ledgerData }));
        } else if (mode === 'display') {
            navigate(-1);
        }
    } catch (error) {
        console.error('Error submitting ledger:', error);
    }
}

export default handleLedgerSubmit;