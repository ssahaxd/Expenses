import {
    SET_LODING_FALSE,
    SET_LODING_TRUE,
    SET_USER_EXP_GROUPS
} from "./expenseGroupActionType";

export const setGrLoadingTrue = () => {
    return {
        type: SET_LODING_TRUE
    };
};

export const setGrLoadingFalse = () => {
    return {
        type: SET_LODING_FALSE
    };
};

export const setUserExpGroup = groups => {
    return {
        type: SET_USER_EXP_GROUPS,
        payload: groups
    };
};
