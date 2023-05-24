import { types } from "./types";
import axios from "axios";
import queryString from 'query-string';

export const fetchDrones = (filters = {}) => ({
    type: types.FETCH_DRONES,
    payload: axios.get(`${window.location.origin}/api/drones?${queryString.stringify(filters)}`)
})

export const fetchInoperationalDrones = () => ({
    type: types.FETCH_INOPERATIONAL_DRONES,
    payload: axios.get(`${window.location.origin}/api/inoperatinal-drones`)
})

export const fetchDrone = (id) => ({
    type: types.FETCH_DRONE,
    payload: axios.get(`${window.location.origin}/api/drones/${id}`)
})

export const deleteDrone = id => ({
    type: types.DELETE_DRONE,
    payload: axios.delete(`${window.location.origin}/api/drones/${id}`),
    meta: { id }
});

export const updateDrone = (id, data) => ({
    type: types.UPDATE_DRONE,
    payload: axios.post(`${window.location.origin}/api/drones/${id}`, data),
});

export const createDrone = (data) => ({
    type: types.CREATE_DRONE,
    payload: axios.post(`${window.location.origin}/api/drones`, data),
});

export const setCurrentDrone = (data) => ({
    type: types.SET_CURRENT_DRONE,
    payload: data,
});