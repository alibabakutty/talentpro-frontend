import { useDispatch, useSelector } from 'react-redux';
import RightSideButton from '../../components/right-side-menu/RightSideButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
  addTabledFieldLedger,
  clearFocusedRow,
  formatCostCenterCreditAmount,
  formatCostCenterDebitAmount,
  formatCreditAmount,
  formatDebitAmount,
  setFocusedFieldForLedger,
  setModeLedger,
  updateTableFieldLedger,
} from '../slices/ledgerSlice';
import { fetchLedger } from '../thunks/ledgerThunks';
import handleLedgerSubmit from '../utils/submit/handleLedgerSubmit';

const LedgerMaster = () => {
  const { ledger, mode, focused } = useSelector(state => state.ledger);
  const { ledgerTransactions } = ledger;
  const { focusedRow, focusedField } = focused;
  const { datas } = useParams();
  const inputRef = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalCols = 11;

  useEffect(() => {
    const path = location.pathname;
    if (path === '/menu/ledger') {
      dispatch(setModeLedger('create'));
      console.log('Available mode:', 'create');
    } else if (path.startsWith('/ledgerMasterApi/displayLedger')) {
      dispatch(setModeLedger('display'));
      console.log('Available mode:', 'display');
    } else if (path.startsWith('/ledgerMasterApi/alterLedgerMaster')) {
      dispatch(setModeLedger('update'));
      console.log('Available mode:', 'update');
    }
  }, []);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
      inputRef.current[0].setSelectionRange(0, 0);
    }
  }, []);

  useEffect(() => {
    if (mode === 'display' || mode === 'update') {
      dispatch(fetchLedger(datas));
      console.log('Fetched Ledger:', datas);
    }
  }, [mode, datas, dispatch]);

  const handleInputChange = (index, field, value) => {
    dispatch(updateTableFieldLedger({ index, field, value }));
  };

  const handleKeyDownLedger = (e, rowIndex, colIndex) => {
    const currentIndex = rowIndex * totalCols + colIndex;
    const lastRowIndex = ledgerTransactions.length - 1;
    const lastColIndex = totalCols - 1;
    const key = e.key;

    if (key === 'ArrowRight') {
      if (inputRef.current[currentIndex + 1]) {
        inputRef.current[currentIndex + 1].focus();
        e.preventDefault();
      }
    } else if (key === 'ArrowLeft') {
      if (inputRef.current[currentIndex - 1]) {
        inputRef.current[currentIndex - 1].focus();
        e.preventDefault();
      }
    } else if (key === 'ArrowDown') {
      if (inputRef.current[currentIndex + totalCols]) {
        inputRef.current[currentIndex + totalCols].focus();
        e.preventDefault();
      }
    } else if (key === 'ArrowUp') {
      if (inputRef.current[currentIndex - totalCols]) {
        inputRef.current[currentIndex - totalCols].focus();
        e.preventDefault();
      }
    } else if (key === 'Enter') {
      e.preventDefault();

      if (rowIndex === lastRowIndex && colIndex === lastColIndex) {
        dispatch(addTabledFieldLedger());
        setTimeout(() => {
          const newIndex = (rowIndex + 1) * totalCols;
          inputRef.current[newIndex].focus();
        }, 0);
      } else {
        inputRef.current[currentIndex + 1].focus();
        inputRef.current[currentIndex + 1].setSelectionRange(0, 0);
      }
    } else if (key === 'Escape') {
      navigate(-1);
    }
  };

  const handleFieldFocus = (rowIndex, fieldName) => {
    dispatch(setFocusedFieldForLedger({ rowIndex, fieldName }));
  };

  const handleRupeeFormatBlur = index => {
    dispatch(formatDebitAmount(index));
    dispatch(formatCreditAmount(index));
    dispatch(formatCostCenterDebitAmount(index));
    dispatch(formatCostCenterCreditAmount(index));
    dispatch(clearFocusedRow());
  };

  const handleSubmit = e => {
    handleLedgerSubmit(e, mode, ledger, dispatch, navigate, datas, inputRef);
  };

  return (
    <>
      <div className="bg-[#493D9E] mt-10">
        <div className="w-[1229px] h-[78vh]">
          <table className="border border-slate-400 w-full">
            <thead className="text-[10px]">
              <tr className="border-t border-b border-slate-400">
                <th className="text-left pl-1">S.No.</th>
                <th className="text-left pl-1">Ledger Name</th>
                <th className="text-left pl-1">Ledger Group</th>
                <th className="text-left pl-1">Sub Group</th>
                <th className="text-left pl-1">Tally Group</th>
                <th className="text-left pl-1">Debit Amount</th>
                <th className="text-left pl-1">Credit Amount</th>
                <th className="text-left pl-1">Cost Category</th>
                <th className="text-left pl-1">Cost Center</th>
                <th className="text-left pl-1">Cost Center Debit Amount</th>
                <th className=""></th>
                <th className="text-left pl-1">Cost Center Credit Amount</th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody className="text-black">
              {ledgerTransactions.map((row, rowIndex) => {
                // calcualte base index for this row
                const rowBaseIndex = rowIndex * totalCols;
                return (
                  <tr key={rowIndex} className="leading-4">
                    <td>
                      <input
                        type="text"
                        name="serialNumber"
                        value={row.serialNumber || ''}
                        ref={input => (inputRef.current[rowBaseIndex + 0] = input)}
                        onChange={e => {
                          handleInputChange(rowIndex, 'serialNumber', e.target.value);
                        }}
                        onKeyDown={e => {
                          handleKeyDownLedger(e, rowIndex, 0);
                        }}
                        className="w-[30px] pl-0.5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        autoComplete="off"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="ledgerName"
                        value={row.ledgerName || ''}
                        ref={input => (inputRef.current[rowBaseIndex + 1] = input)}
                        onChange={e => {
                          handleInputChange(rowIndex, 'ledgerName', e.target.value);
                        }}
                        onKeyDown={e => {
                          handleKeyDownLedger(e, rowIndex, 1);
                        }}
                        className="w-[100px] pl-0.5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        autoComplete="off"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="ledgerGroup"
                        value={row.ledgerGroup || ''}
                        ref={input => (inputRef.current[rowBaseIndex + 2] = input)}
                        onChange={e => {
                          handleInputChange(rowIndex, 'ledgerGroup', e.target.value);
                        }}
                        onKeyDown={e => {
                          handleKeyDownLedger(e, rowIndex, 2);
                        }}
                        className="w-[100px] pl-0.5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        autoComplete="off"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="subGroup"
                        value={row.subGroup || ''}
                        ref={input => (inputRef.current[rowBaseIndex + 3] = input)}
                        onChange={e => {
                          handleInputChange(rowIndex, 'subGroup', e.target.value);
                        }}
                        onKeyDown={e => {
                          handleKeyDownLedger(e, rowIndex, 3);
                        }}
                        className="w-[100px] pl-0.5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        autoComplete="off"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="tallyGroup"
                        value={row.tallyGroup || ''}
                        ref={input => (inputRef.current[rowBaseIndex + 4] = input)}
                        onChange={e => {
                          handleInputChange(rowIndex, 'tallyGroup', e.target.value);
                        }}
                        onKeyDown={e => {
                          handleKeyDownLedger(e, rowIndex, 4);
                        }}
                        className="w-[100px] pl-0.5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        autoComplete="off"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="debitAmount"
                        value={
                          focusedRow === rowIndex && focusedField === 'debitAmount'
                            ? row.debitAmount
                            : row.debitAmountFormatted || ''
                        }
                        ref={input => (inputRef.current[rowBaseIndex + 5] = input)}
                        onChange={e => {
                          handleInputChange(rowIndex, 'debitAmount', e.target.value);
                        }}
                        onKeyDown={e => {
                          handleKeyDownLedger(e, rowIndex, 5);
                        }}
                        onFocus={() => handleFieldFocus(rowIndex, 'debitAmount')}
                        onBlur={() => handleRupeeFormatBlur(rowIndex)}
                        className="w-[100px] pl-0.5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        autoComplete="off"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="creditAmount"
                        value={
                          focusedRow === rowIndex && focusedField === 'creditAmount'
                            ? row.creditAmount
                            : row.creditAmountFormatted || ''
                        }
                        ref={input => (inputRef.current[rowBaseIndex + 6] = input)}
                        onChange={e => {
                          handleInputChange(rowIndex, 'creditAmount', e.target.value);
                        }}
                        onKeyDown={e => {
                          handleKeyDownLedger(e, rowIndex, 6);
                        }}
                        onFocus={() => handleFieldFocus(rowIndex, 'creditAmount')}
                        onBlur={() => handleRupeeFormatBlur(rowIndex)}
                        className="w-[100px] pl-0.5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        autoComplete="off"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="costCategory"
                        value={row.costCategory || ''}
                        ref={input => (inputRef.current[rowBaseIndex + 7] = input)}
                        onChange={e => {
                          handleInputChange(rowIndex, 'costCategory', e.target.value);
                        }}
                        onKeyDown={e => {
                          handleKeyDownLedger(e, rowIndex, 7);
                        }}
                        className="w-[100px] pl-0.5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        autoComplete="off"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="costCenter"
                        value={row.costCenter || ''}
                        ref={input => (inputRef.current[rowBaseIndex + 8] = input)}
                        onChange={e => {
                          handleInputChange(rowIndex, 'costCenter', e.target.value);
                        }}
                        onKeyDown={e => {
                          handleKeyDownLedger(e, rowIndex, 8);
                        }}
                        className="w-[100px] pl-0.5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        autoComplete="off"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="costCenterAmountDebit"
                        value={
                          focusedRow === rowIndex && focusedField === 'costCenterAmountDebit'
                            ? row.costCenterAmountDebit
                            : row.costCenterAmountDebitFormatted || ''
                        }
                        ref={input => (inputRef.current[rowBaseIndex + 9] = input)}
                        onChange={e => {
                          handleInputChange(rowIndex, 'costCenterAmountDebit', e.target.value);
                        }}
                        onKeyDown={e => {
                          handleKeyDownLedger(e, rowIndex, 9);
                        }}
                        onFocus={() => handleFieldFocus(rowIndex, 'costCenterAmountDebit')}
                        onBlur={() => handleRupeeFormatBlur(rowIndex)}
                        className="w-[100px] pl-0.5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        autoComplete="off"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="costCenterAmountDebitField"
                        value={row.costCenterAmountDebitField || ''}
                        onChange={e => {
                          handleInputChange(rowIndex, 'costCenterAmountDebitField', e.target.value);
                        }}
                        className="w-[40px] pl-0.5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        autoComplete="off"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="costCenterAmountCredit"
                        value={
                          focusedRow === rowIndex && focusedField === 'costCenterAmountCredit'
                            ? row.costCenterAmountCredit
                            : row.costCenterAmountCreditFormatted || ''
                        }
                        ref={input => (inputRef.current[rowBaseIndex + 10] = input)}
                        onChange={e => {
                          handleInputChange(rowIndex, 'costCenterAmountCredit', e.target.value);
                        }}
                        onKeyDown={e => {
                          handleKeyDownLedger(e, rowIndex, 10);
                        }}
                        onFocus={() => handleFieldFocus(rowIndex, 'costCenterAmountCredit')}
                        onBlur={() => handleRupeeFormatBlur(rowIndex)}
                        className="w-[100px] pl-0.5 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        autoComplete="off"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="costCenterAmountCreditField"
                        value={row.costCenterAmountCreditField || ''}
                        onChange={e => {
                          handleInputChange(
                            rowIndex,
                            'costCenterAmountCreditField',
                            e.target.value,
                          );
                        }}
                        className="w-[40px] pl-0.5 font-medium capitalize text-[12px] focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
                        autoComplete="off"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="h-[8vh] ">
          <div className='flex border border-double border-t border-slate-400 border-l-0 border-r-0 mt-1.5'>
            <h2 className="ml-[330px]">Totals</h2>
            <span className='ml-1'>:</span>
            <input
              type="text"
              name='totalDebitAmount'
              value={ledger.totalDebitAmountFormatted || ''}
              className="w-[100px] pl-0.5 ml-14 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
              readOnly
            />
            <input
              type="text"
              name='totalCreditAmount'
              value={ledger.totalCreditAmountFormatted || ''}
              className="w-[100px] pl-0.5 ml-2 font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
              readOnly
            />
            <input
              type="text"
              name='totalCostCenterAmountDebit'
              value={ledger.totalCostCenterAmountDebitFormatted || ''}
              className="w-[100px] pl-0.5 ml-[260px] font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
              readOnly
            />
            <input
              type="text"
              name='totalCostCenterAmountCredit'
              value={ledger.totalCostCenterAmountCreditFormatted || ''}
              className="w-[100px] pl-0.5 ml-[80px] font-medium text-[12px] capitalize focus:bg-yellow-200 focus:outline-none focus:border-blue-500 focus:border border border-transparent"
              autoComplete="off"
              readOnly
            />
          </div>
        </div>
        <div className="h-[6vh] flex items-center justify-center text-sm">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
          >
            {mode === 'create' ? 'Create' : mode === 'update' ? 'Update' : 'Save'}
          </button>
        </div>
        <RightSideButton />
      </div>
    </>
  );
};

export default LedgerMaster;
