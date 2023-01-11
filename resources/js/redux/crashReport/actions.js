import { types } from "./types";
import axios from "axios";
import queryString from 'query-string';

export const fetchCrashReports = (filters = {}) => ({
    type: types.FETCH_CRASH_REPORTS,
    payload: axios.get(`${window.location.origin}/api/crash-reports?${queryString.stringify(filters)}`)
})

export const fetchCrashReportSelector = (filters = {}) => ({
    type: types.FETCH_CRASH_REPORT_SELECTOR,
    payload: axios.get(`${window.location.origin}/api/selector/crash-reports?${queryString.stringify(filters)}`)
})

export const fetchCrashReportGraph = (filters = {}) => ({
    type: types.FETCH_CRASH_REPORT_GRAPH,
    payload: axios.get(`${window.location.origin}/api/crash-reports/graph?${queryString.stringify(filters)}`)
})

export const fetchCrashReport = (id) => ({
    type: types.FETCH_CRASH_REPORT,
    payload: axios.get(`${window.location.origin}/api/crash-reports/${id}`)
})

export const deleteCrashReport = id => ({
    type: types.DELETE_CRASH_REPORT,
    payload: axios.delete(`${window.location.origin}/api/crash-reports/${id}`),
    meta: { id }
});

export const updateCrashReport = (id, data) => ({
    type: types.UPDATE_CRASH_REPORT,
    payload: axios.put(`${window.location.origin}/api/crash-reports/${id}`, data),
});

export const createCrashReport = (data) => ({
    type: types.CREATE_CRASH_REPORT,
    payload: axios.post(`${window.location.origin}/api/crash-reports/`, data),
});

export const setCurrentCrashReport = (data) => ({
    type: types.SET_CURRENT_CRASH_REPORT,
    payload: data,
});