import { types } from "./types";
import axios from "axios";

export const fetchLocalizations = (filters = {}) => ({
    type: types.FETCH_LOCALIZATIONS,
    payload: axios.get(`${window.location.origin}/api/localizations?${JSON.stringify(filters)}`)
})

export const fetchLocalization = (id) => ({
    type: types.FETCH_LOCALIZATION,
    payload: axios.get(`${window.location.origin}/api/localizations/${id}`)
})

export const deleteLocalization = id => ({
    type: types.DELETE_LOCALIZATION,
    payload: axios.delete(`${window.location.origin}/api/localizations/${id}`),
    meta: { id }
});

export const updateLocalization = (id, data) => ({
    type: types.UPDATE_LOCALIZATION,
    payload: axios.put(`${window.location.origin}/api/localizations/${id}`, data),
});

export const createLocalization = (data) => ({
    type: types.CREATE_LOCALIZATION,
    payload: axios.post(`${window.location.origin}/api/localizations/`, data),
});

export const setCurrentLocalization = (data) => ({
    type: types.SET_CURRENT_LOCALIZATION,
    payload: data,
});