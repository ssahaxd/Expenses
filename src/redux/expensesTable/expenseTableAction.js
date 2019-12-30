import {
    SET_EXPENSES,
    SET_LODING_TRUE,
    SET_LODING_FALSE,
    SET_SORTED_INFO,
    SET_FILTERED_INFO
} from "./expenseTableActionTypes";

export const setExpenses = expenses => {
    return {
        type: SET_EXPENSES,
        payload: expenses
    };
};

export const setLoadingTrue = () => {
    return {
        type: SET_LODING_TRUE
    };
};

export const setLoadingFalse = () => {
    return {
        type: SET_LODING_FALSE
    };
};

export const setFilteredInfo = filters => {
    return {
        type: SET_FILTERED_INFO,
        payload: filters
    };
};

export const setSortedInfo = sorter => {
    return {
        type: SET_SORTED_INFO,
        payload: sorter
    };
};
