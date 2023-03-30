import { types } from "./types";
import axios from "axios";
import queryString from 'query-string';

export const fetchUsers = (filters = {}) => ({
    type: types.FETCH_USERS,
    payload: axios.get(`${window.location.origin}/api/users?${queryString.stringify(filters)}`)
})

export const fetchUser = (id) => ({
    type: types.FETCH_USER,
    payload: axios.get(`${window.location.origin}/api/users/${id}`)
})

export const deleteUser = id => ({
    type: types.DELETE_USER,
    payload: axios.delete(`${window.location.origin}/api/users/${id}`),
    meta: { id }
});

export const updateUser = (id, data) => ({
    type: types.UPDATE_USER,
    payload: axios.put(`${window.location.origin}/api/users/${id}`, data),
});

export const createUser = (data) => ({
    type: types.CREATE_USER,
    payload: axios.post(`${window.location.origin}/api/users`, data),
});

export const setCurrentUser = (data) => ({
    type: types.SET_CURRENT_USER,
    payload: data,
});