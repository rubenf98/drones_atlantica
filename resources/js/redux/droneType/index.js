import { types } from "./types";

export const initialState = {
    data: [],
    meta: {},
    current: {},
    loading: false,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.DELETE_DRONE_TYPE}_PENDING`:
        case `${types.CREATE_DRONE_TYPE}_PENDING`:
        case `${types.UPDATE_DRONE_TYPE}_PENDING`:
        case `${types.FETCH_DRONE_TYPES}_PENDING`:
        case `${types.FETCH_DRONE_TYPE}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.UPDATE_DRONE_TYPE}_REJECTED`:
        case `${types.DELETE_DRONE_TYPE}_REJECTED`:
        case `${types.CREATE_DRONE_TYPE}_REJECTED`:
            return {
                ...state,
                loading: false,
            };


        case `${types.CREATE_DRONE_TYPE}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload.data.data]
            };

        case `${types.DELETE_DRONE_TYPE}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.UPDATE_DRONE_TYPE}_FULFILLED`:
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

        case `${types.FETCH_DRONE_TYPE}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };


        case `${types.FETCH_DRONE_TYPES}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };

        case `${types.FETCH_DRONE_TYPE}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.FETCH_DRONE_TYPES}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
            };

        case `${types.SET_CURRENT_DRONE_TYPE}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        default:
            return state
    }
}