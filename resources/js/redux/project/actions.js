import { types } from "./types";
import axios from "axios";
import queryString from 'query-string';

export const fetchProjects = (filters = {}) => ({
    type: types.FETCH_PROJECTS,
    payload: axios.get(`${window.location.origin}/api/projects?${queryString.stringify(filters)}`)
})

export const fetchProjectsSelector = (filters = {}) => ({
    type: types.FETCH_PROJECTS_SELECTOR,
    payload: axios.get(`${window.location.origin}/api/selector/projects?${queryString.stringify(filters)}`)
})

export const fetchProject = (id) => ({
    type: types.FETCH_PROJECT,
    payload: axios.get(`${window.location.origin}/api/projects/${id}`)
})

export const deleteProject = id => ({
    type: types.DELETE_PROJECT,
    payload: axios.delete(`${window.location.origin}/api/projects/${id}`),
    meta: { id }
});

export const updateProject = (id, data) => ({
    type: types.UPDATE_PROJECT,
    payload: axios.put(`${window.location.origin}/api/projects/${id}`, data),
});

export const createProject = (data) => ({
    type: types.CREATE_PROJECT,
    payload: axios.post(`${window.location.origin}/api/projects`, data),
});

export const setCurrentProject = (data) => ({
    type: types.SET_CURRENT_PROJECT,
    payload: data,
});