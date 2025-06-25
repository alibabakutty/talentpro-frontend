import { configureStore } from "@reduxjs/toolkit";
import ledgerReducer from '../slices/ledgerSlice'

const store = configureStore({
    devTools: true,
    reducer: {
        ledger: ledgerReducer,
    },
})

export default store;