import { createSlice } from '@reduxjs/toolkit';
import { fetchLedger } from '../thunks/ledgerThunks';
import { formatINRWithIndex } from '../utils/rupee-format/formatINRWithIndex';
import { calculateTotals } from '../utils/calculations/calculateTotals';

// initial state
const initialState = {
  ledger: {
    ledgerTime: '',
    totalDebitAmount: '',
    totalDebitAmountFormatted: '',
    totalCreditAmount: '',
    totalCreditAmountFormatted: '',
    totalCostCenterAmountDebit: '',
    totalCostCenterAmountDebitFormatted: '',
    totalCostCenterAmountCredit: '',
    totalCostCenterAmountCreditFormatted: '',
    ledgerTransactions: [
      {
        serialNumber: '',
        ledgerName: '',
        ledgerGroup: '',
        subGroup: '',
        tallyGroup: '',
        debitAmount: '',
        debitAmountFormatted: '',
        creditAmount: '',
        creditAmountFormatted: '',
        costCategory: '',
        costCenter: '',
        costCenterAmountDebit: '',
        costCenterAmountDebitFormatted: '',
        costCenterAmountDebitField: 'dr',
        costCenterAmountCredit: '',
        costCenterAmountCreditFormatted: '',
        costCenterAmountCreditField: 'cr',
      },
    ],
  },
  mode: 'create',
  focused: {
    focusedRow: null,
    focusedField: null,
  },
  loading: false,
  error: null,
};

// slice
const ledgerSlice = createSlice({
  name: 'ledger',
  initialState,
  reducers: {
    setModeLedger: (state, action) => {
      state.mode = action.payload;
      if (action.payload === 'create') {
        state.ledger = { ...initialState.ledger };
      }
    },
    updateTableFieldLedger: (state, action) => {
      const { index, field, value } = action.payload;

      if (state.ledger.ledgerTransactions[index]) {
        state.ledger.ledgerTransactions[index][field] = value;
      }
    },
    addTabledFieldLedger: state => {
      state.ledger.ledgerTransactions.push({
        serialNumber: '',
        ledgerName: '',
        ledgerGroup: '',
        subGroup: '',
        tallyGroup: '',
        debitAmount: '',
        debitAmountFormatted: '',
        creditAmount: '',
        creditAmountFormatted: '',
        costCategory: '',
        costCenter: '',
        costCenterAmountDebit: '',
        costCenterAmountDebitFormatted: '',
        costCenterAmountDebitField: 'dr',
        costCenterAmountCredit: '',
        costCenterAmountCreditFormatted: '',
        costCenterAmountCreditField: 'cr',
      });
    },
    setFocusedFieldForLedger: (state, action) => {
        const { rowIndex, fieldName } = action.payload;
        state.focused.focusedRow = rowIndex;
        state.focused.focusedField = fieldName;
    },
    clearFocusedRow: (state) => {
        state.focused.focusedRow = null;
    },
    formatDebitAmount: (state, action) => {
        const index = action.payload;
        const row = state.ledger.ledgerTransactions[index];

        if (!row) return;

        let rawValue = String(row.debitAmount || '').trim();
        const numericValue = parseFloat(rawValue.replace(/[^0-9.]/g, '')) || 0;

        if (rawValue.trim() === '') {
            row.debitAmount = '';
            row.debitAmountFormatted = '';
        } else {
            row.debitAmount = numericValue.toFixed(2);
            row.debitAmountFormatted = formatINRWithIndex(numericValue, index, 'debitAmount').formattedValue;
        }
        // Recalculate totals
        Object.assign(state.ledger, calculateTotals(state.ledger.ledgerTransactions));
    },
    formatCreditAmount: (state, action) => {
        const index = action.payload;
        const row = state.ledger.ledgerTransactions[index];

        if (!row) return;

        let rawValue = String(row.creditAmount || '').trim();
        const numericValue = parseFloat(rawValue.replace(/[^0-9.]/g, '')) || 0;

        if (rawValue.trim() === '') {
            row.creditAmount = '';
            row.creditAmountFormatted = '';
        } else {
            row.creditAmount = numericValue.toFixed(2);
            row.creditAmountFormatted = formatINRWithIndex(numericValue, index, 'creditAmount').formattedValue;
        }
        // Recalculate totals
        Object.assign(state.ledger, calculateTotals(state.ledger.ledgerTransactions));
    },
    formatCostCenterDebitAmount: (state, action) => {
        const index = action.payload;
        const row = state.ledger.ledgerTransactions[index];

        if (!row) return;

        let rawValue = String(row.costCenterAmountDebit || '').trim();
        const numericValue = parseFloat(rawValue.replace(/[^0-9.]/g, '')) || 0;

        if (rawValue.trim() === '') {
            row.costCenterAmountDebit = '';
            row.costCenterAmountDebitFormatted = '';
        } else {
            row.costCenterAmountDebit = numericValue.toFixed(2);
            row.costCenterAmountDebitFormatted = formatINRWithIndex(numericValue, index, 'costCenterAmountDebit').formattedValue;
        }
        // Recalculate totals
        Object.assign(state.ledger, calculateTotals(state.ledger.ledgerTransactions));
    },
    formatCostCenterCreditAmount: (state, action) => {
        const index = action.payload;
        const row = state.ledger.ledgerTransactions[index];

        if (!row) return;

        let rawValue = String(row.costCenterAmountCredit || '').trim();
        const numericValue = parseFloat(rawValue.replace(/[^0-9.]/g, '')) || 0;

        if (rawValue.trim() === '') {
            row.costCenterAmountCredit = '';
            row.costCenterAmountCreditFormatted = '';
        } else {
            row.costCenterAmountCredit = numericValue.toFixed(2);
            row.costCenterAmountCreditFormatted = formatINRWithIndex(numericValue, index, 'costCenterAmountDebit').formattedValue;
        }
        // Recalculate totals
        Object.assign(state.ledger, calculateTotals(state.ledger.ledgerTransactions));
    }
  },
  extraReducers: builder => {
    const handleError = (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    };
    builder
      .addCase(fetchLedger.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLedger.fulfilled, (state, action) => {
        state.ledger = action.payload;
        state.loading = false;
      })
      .addCase(fetchLedger.rejected, handleError);
  },
});
// export
export const { setModeLedger, updateTableFieldLedger, addTabledFieldLedger, setFocusedFieldForLedger, clearFocusedRow, formatDebitAmount, formatCreditAmount, formatCostCenterDebitAmount, formatCostCenterCreditAmount } = ledgerSlice.actions;
export default ledgerSlice.reducer;
