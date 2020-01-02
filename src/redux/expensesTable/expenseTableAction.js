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

export const setExpGrId = gid => {
    return {
        type: SET_EXP_GR_ID,
        payload: gid
    };
};

export const setShowingTableTrue = () => {
    return { type: SET_SHOWING_TABLE_TRUE };
};
export const setShowingTableFalse = () => {
    return { type: SET_SHOWING_TABLE_FALSE };
};

export const setExpenses = expenses => {
    return {
        type: SET_EXPENSES,
        payload: expenses
    };
};

export const setLoadingTrue = () => {
    return {
        type: SET_EXP_TABLE_LODING_TRUE
    };
};

export const setLoadingFalse = () => {
    return {
        type: SET_EXP_TABLE_LODING_FALSE
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
