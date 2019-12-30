import {
    SET_EXPENSES,
    SET_LODING_TRUE,
    SET_LODING_FALSE,
    SET_SORTED_INFO,
    SET_FILTERED_INFO
} from "./expenseTableActionTypes";

const initialState = {
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
        case SET_LODING_TRUE:
            return {
                ...state,
                loading: true
            };
        case SET_LODING_FALSE:
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
        default:
            return state;
    }
};

export default expenseTableReducer;
