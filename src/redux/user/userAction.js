import { RESET_USER_ID, SET_USER } from "./userActionType";

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
