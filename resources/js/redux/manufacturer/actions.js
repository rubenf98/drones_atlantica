import { types } from "./types";
import axios from "axios";
import queryString from 'query-string';

export const fetchManufacturers = (filters = {}) => ({
    type: types.FETCH_MANUFACTURERS,
    payload: axios.get(`${window.location.origin}/api/manufacturers?${queryString.stringify(filters)}`)
})

export const fetchManufacturer = (id) => ({
    type: types.FETCH_MANUFACTURER,
    payload: axios.get(`${window.location.origin}/api/manufacturers/${id}`)
})

export const deleteManufacturer = id => ({
    type: types.DELETE_MANUFACTURER,
    payload: axios.delete(`${window.location.origin}/api/manufacturers/${id}`),
    meta: { id }
});

export const updateManufacturer = (id, data) => ({
    type: types.UPDATE_MANUFACTURER,
    payload: axios.put(`${window.location.origin}/api/manufacturers/${id}`, data),
});

export const createManufacturer = (data) => ({
    type: types.CREATE_MANUFACTURER,
    payload: axios.post(`${window.location.origin}/api/manufacturers`, data),
});

export const setCurrentManufacturer = (data) => ({
    type: types.SET_CURRENT_MANUFACTURER,
    payload: data,
});