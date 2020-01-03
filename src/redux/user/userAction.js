import {
    RESET_USER_ID,
    SET_USER,
    UPDATE_USER_EXP_GROUPS,
    SHOW_SIGNUP_TRUE,
    SHOW_SIGNUP_FALSE
} from "./userActionType";

export const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    };
};

export const setShowingSignUpTrue = () => {
    return {
        type: SHOW_SIGNUP_TRUE
    };
};
export const setShowingSignUpFalse = () => {
    return {
        type: SHOW_SIGNUP_FALSE
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
