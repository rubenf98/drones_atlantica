import { types } from "./types";
import axios from "axios";

export const fetchOperators = (filters = {}) => ({
    type: types.FETCH_OPERATORS,
    payload: axios.get(`${window.location.origin}/api/operators?${JSON.stringify(filters)}`)
})

export const fetchOperator = (id) => ({
    type: types.FETCH_OPERATOR,
    payload: axios.get(`${window.location.origin}/api/operators/${id}`)
})

export const deleteOperator = id => ({
    type: types.DELETE_OPERATOR,
    payload: axios.delete(`${window.location.origin}/api/operators/${id}`),
    meta: { id }
});

export const updateOperator = (id, data) => ({
    type: types.UPDATE_OPERATOR,
    payload: axios.put(`${window.location.origin}/api/operators/${id}`, data),
});

export const createOperator = (data) => ({
    type: types.CREATE_OPERATOR,
    payload: axios.post(`${window.location.origin}/api/operators`, data),
});

export const setCurrentOperator = (data) => ({
    type: types.SET_CURRENT_OPERATOR,
    payload: data,
});