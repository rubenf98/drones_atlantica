import { types } from "./types";
import axios from "axios";

export const fetchDroneTypes = (filters = {}) => ({
    type: types.FETCH_DRONE_TYPES,
    payload: axios.get(`${window.location.origin}/api/drone-type?${JSON.stringify(filters)}`)
})

export const fetchDroneType = (id) => ({
    type: types.FETCH_DRONE_TYPE,
    payload: axios.get(`${window.location.origin}/api/drone-type/${id}`)
})

export const deleteDroneType = id => ({
    type: types.DELETE_DRONE_TYPE,
    payload: axios.delete(`${window.location.origin}/api/drone-type/${id}`),
    meta: { id }
});

export const updateDroneType = (id, data) => ({
    type: types.UPDATE_DRONE_TYPE,
    payload: axios.put(`${window.location.origin}/api/drone-type/${id}`, data),
});

export const createDroneType = (data) => ({
    type: types.CREATE_DRONE_TYPE,
    payload: axios.post(`${window.location.origin}/api/drone-type/`, data),
});

export const setCurrentDroneType = (data) => ({
    type: types.SET_CURRENT_DRONE_TYPE,
    payload: data,
});