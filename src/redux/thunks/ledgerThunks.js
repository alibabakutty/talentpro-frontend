import { createAsyncThunk } from "@reduxjs/toolkit";
import { createLedgerMaster, getSpecificLedger, updateLedgerMaster } from "../../components/services/masterService";

// async actions for API calls
export const fetchLedger = createAsyncThunk('ledger/fetchLedger', async (id) => {
    try {
        const response = await getSpecificLedger(id);
        return response.data;
    } catch (error) {
        console.error('Error fetching ledger:', error);
        throw error;
    }
})

export const createLedger = createAsyncThunk('ledger/createLedger', async (data) => {
    const response = await createLedgerMaster(data);
    return response.data;
})

export const updateLedger = createAsyncThunk('ledger/updateLedger', async ({ id, data }) => {
    const response = await updateLedgerMaster(id, data);
    return response.data;
})