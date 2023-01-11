import { types } from "./types";

export const initialState = {
    data: [],
    meta: {},
    current: {},
    loading: false,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.DELETE_OPERATOR}_PENDING`:
        case `${types.CREATE_OPERATOR}_PENDING`:
        case `${types.UPDATE_OPERATOR}_PENDING`:
        case `${types.FETCH_OPERATORS}_PENDING`:
        case `${types.FETCH_OPERATOR}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.UPDATE_OPERATOR}_REJECTED`:
        case `${types.DELETE_OPERATOR}_REJECTED`:
        case `${types.CREATE_OPERATOR}_REJECTED`:
            return {
                ...state,
                loading: false,
            };


        case `${types.CREATE_OPERATOR}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload.data.data]
            };

        case `${types.DELETE_OPERATOR}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.UPDATE_OPERATOR}_FULFILLED`:
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

        case `${types.FETCH_OPERATOR}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };


        case `${types.FETCH_OPERATORS}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };

        case `${types.FETCH_OPERATOR}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.FETCH_OPERATORS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
            };

        case `${types.SET_CURRENT_OPERATOR}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        default:
            return state
    }
}