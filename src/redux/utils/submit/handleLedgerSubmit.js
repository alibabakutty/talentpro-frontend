import { setModeLedger } from "../../slices/ledgerSlice";
import { createLedger, updateLedger } from "../../thunks/ledgerThunks";

export const handleLedgerSubmit = async (e, mode, ledger, dispatch, navigate, datas, inputRef) => {
    if (e) e.preventDefault();

    try {
        const ledgerData = {
            ...ledger,
            ledgerTime: new Date().toISOString(),
            ledgerTransactions: ledger.ledgerTransactions?.map(transaction => ({
                ...transaction,
                debitAmount: parseFloat(String(transaction.debitAmount || '0').replace(/,/g, '')) || 0,
                creditAmount: parseFloat(String(transaction.creditAmount || '0').replace(/,/g, '')) || 0,
            })) || [],
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