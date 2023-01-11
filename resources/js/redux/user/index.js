import { types } from "./types";

export const initialState = {
    data: [],
    current: {},
    loading: false,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.DELETE_USER}_PENDING`:
        case `${types.CREATE_USER}_PENDING`:
        case `${types.UPDATE_USER}_PENDING`:
        case `${types.FETCH_USERS}_PENDING`:
        case `${types.FETCH_USER}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.UPDATE_USER}_REJECTED`:
        case `${types.DELETE_USER}_REJECTED`:
        case `${types.CREATE_USER}_REJECTED`:
            return {
                ...state,
                loading: false,
            };


        case `${types.CREATE_USER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload.data.data]
            };

        case `${types.DELETE_USER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.UPDATE_USER}_FULFILLED`:
        case `${types.SET_USER_STATUS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.map(
                    (record) =>
                        record.id === action.payload.data.data.id
                            ? action.payload.data.data
                            : record
                )
            };

        case `${types.FETCH_USER}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };


        case `${types.FETCH_USERS}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };

        case `${types.FETCH_USER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.FETCH_USERS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
            };

        case `${types.SET_CURRENT_USER}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        default:
            return state
    }
}