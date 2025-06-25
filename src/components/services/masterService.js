import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080"

// ADD
export const createLedgerMaster = (ledger) => axios.post(`${REST_API_BASE_URL}/ledgerMasterApi/addLedger`, ledger);

// GET Specific Data
export const getSpecificLedger = (ledgerTime) => axios.get(`${REST_API_BASE_URL}/ledgerMasterApi/displayLedger/${ledgerTime}`);

// GET ALL
export const listOfLedgers = () => axios.get(`${REST_API_BASE_URL}/ledgerMasterApi/allLedgers`);

// ALTER
export const updateLedgerMaster = (ledgerTime, ledger) => axios.put(`${REST_API_BASE_URL}/ledgerMasterApi/alterLedgerMaster/${ledgerTime}`, ledger);

// DELETE
export const deleteLedger = (id) => axios.delete(`${REST_API_BASE_URL}/ledgerMasterApi/deleteLedger/${id}`);