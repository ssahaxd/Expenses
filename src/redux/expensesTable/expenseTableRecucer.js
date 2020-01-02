import {
    SET_EXPENSES,
    SET_EXP_TABLE_LODING_TRUE,
    SET_EXP_TABLE_LODING_FALSE,
    SET_SORTED_INFO,
    SET_FILTERED_INFO,
    SET_SHOWING_TABLE_FALSE,
    SET_SHOWING_TABLE_TRUE,
    SET_EXP_GR_ID
} from "./expenseTableActionTypes";

const initialState = {
    showingTable: false,
    expGrId: null,
    expenses: [],
    loading: false,
    filteredInfo: null,
    sortedInfo: null
};

const expenseTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EXPENSES:
            return {
                ...state,
                expenses: [...action.payload]
            };
        case SET_EXP_TABLE_LODING_TRUE:
            return {
                ...state,
                loading: true
            };
        case SET_EXP_TABLE_LODING_FALSE:
            return {
                ...state,
                loading: false
            };
        case SET_SORTED_INFO:
            return {
                ...state,
                sortedInfo: action.payload
            };
        case SET_FILTERED_INFO:
            return {
                ...state,
                filteredInfo: action.payload
            };
        case SET_SHOWING_TABLE_FALSE:
            return { ...state, showingTable: false };
        case SET_SHOWING_TABLE_TRUE:
            return { ...state, showingTable: true };
        case SET_EXP_GR_ID:
            return {
                ...state,
                expGrId: action.payload
            };
        default:
            return state;
    }
};

export default expenseTableReducer;
