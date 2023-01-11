import { types } from "./types";
import axios from "axios";
import queryString from 'query-string';

export const fetchFlightReports = (filters = {}) => ({
    type: types.FETCH_FLIGHT_REPORTS,
    payload: axios.get(`${window.location.origin}/api/flight-reports?${queryString.stringify(filters)}`)
})

export const fetchFlightReportSelector = (filters = {}) => ({
    type: types.FETCH_FLIGHT_REPORT_SELECTOR,
    payload: axios.get(`${window.location.origin}/api/selector/flight-reports?${queryString.stringify(filters)}`)
})

export const fetchFlightReportGraph = (filters = {}) => ({
    type: types.FETCH_FLIGHT_REPORT_GRAPH,
    payload: axios.get(`${window.location.origin}/api/flight-reports/graph?${queryString.stringify(filters)}`)
})

export const fetchFlightReport = (id) => ({
    type: types.FETCH_FLIGHT_REPORT,
    payload: axios.get(`${window.location.origin}/api/flight-reports/${id}`)
})

export const deleteFlightReport = id => ({
    type: types.DELETE_FLIGHT_REPORT,
    payload: axios.delete(`${window.location.origin}/api/flight-reports/${id}`),
    meta: { id }
});

export const updateFlightReport = (id, data) => ({
    type: types.UPDATE_FLIGHT_REPORT,
    payload: axios.put(`${window.location.origin}/api/flight-reports/${id}`, data),
});

export const createFlightReport = (data) => ({
    type: types.CREATE_FLIGHT_REPORT,
    payload: axios.post(`${window.location.origin}/api/flight-reports/`, data),
});

export const setCurrentFlightReport = (data) => ({
    type: types.SET_CURRENT_FLIGHT_REPORT,
    payload: data,
});