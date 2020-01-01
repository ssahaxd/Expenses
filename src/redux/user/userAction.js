import {
    RESET_USER_ID,
    SET_USER,
    UPDATE_USER_EXP_GROUPS
} from "./userActionType";

export const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    };
};

export const resetUid = () => {
    return {
        type: RESET_USER_ID
    };
};

export const updateUserExpGroup = groups => {
    return {
        type: UPDATE_USER_EXP_GROUPS,
        payload: groups
    };
};
