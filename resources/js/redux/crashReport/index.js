import { types } from "./types";

export const initialState = {
    data: [],
    selector: [],
    current: {},
    loading: false,
    dataGraph: [],
    loadingGraph: false,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.DELETE_CRASH_REPORT}_PENDING`:
        case `${types.CREATE_CRASH_REPORT}_PENDING`:
        case `${types.UPDATE_CRASH_REPORT}_PENDING`:
        case `${types.FETCH_CRASH_REPORTS}_PENDING`:
        case `${types.FETCH_CRASH_REPORT_SELECTOR}_PENDING`:
        case `${types.FETCH_CRASH_REPORT}_PENDING`:
            return {
                ...state,
                loadingGraph: true,
            };


        case `${types.FETCH_CRASH_REPORT_GRAPH}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.UPDATE_CRASH_REPORT}_REJECTED`:
        case `${types.DELETE_CRASH_REPORT}_REJECTED`:
        case `${types.CREATE_CRASH_REPORT}_REJECTED`:
        case `${types.FETCH_CRASH_REPORT_SELECTOR}_REJECTED`:
            return {
                ...state,
                loading: false,
            };


        case `${types.FETCH_CRASH_REPORT_GRAPH}_REJECTED`:
            return {
                ...state,
                loadingGraph: false,
            };

        case `${types.FETCH_CRASH_REPORT_GRAPH}_FULFILLED`:
            return {
                ...state,
                loadingGraph: false,
                dataGraph: action.payload.data
            };

        case `${types.CREATE_CRASH_REPORT}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload.data.data]
            };

        case `${types.DELETE_CRASH_REPORT}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.UPDATE_CRASH_REPORT}_FULFILLED`:
        case `${types.SET_CRASH_REPORT_STATUS}_FULFILLED`:
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

        case `${types.FETCH_CRASH_REPORT}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };

        case `${types.FETCH_CRASH_REPORT_SELECTOR}_FULFILLED`:
            return {
                ...state,
                loading: false,
                selector: action.payload.data.data,
            };

        case `${types.FETCH_CRASH_REPORTS}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };

        case `${types.FETCH_CRASH_REPORT}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.FETCH_CRASH_REPORTS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
            };

        case `${types.SET_CURRENT_CRASH_REPORT}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        default:
            return state
    }
}