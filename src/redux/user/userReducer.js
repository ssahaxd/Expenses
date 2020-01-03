import {
    RESET_USER_ID,
    SET_USER,
    UPDATE_USER_EXP_GROUPS,
    SHOW_SIGNUP_TRUE,
    SHOW_SIGNUP_FALSE
} from "./userActionType";

const initialState = JSON.parse(localStorage.getItem("user")) || {
    showSignup: true,
    uid: null,
    userInfo: {
        email: "",
        firstname: "",
        lastname: "",
        username: ""
    },
    userExpGropus: [{ titel: "Hello" }]
};

const useReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                uid: action.payload.uid,
                userInfo: { ...action.payload.userInfo }
            };
        case RESET_USER_ID:
            return {
                ...state,
                uid: null,
                userInfo: { ...initialState.userInfo }
            };
        case UPDATE_USER_EXP_GROUPS:
            return {
                ...state,
                userExpGropus: { ...action.payload }
            };
        case SHOW_SIGNUP_TRUE:
            return {
                ...state,
                showSignup: true
            };
        case SHOW_SIGNUP_FALSE:
            return {
                ...state,
                showSignup: false
            };
        default:
            return state;
    }
};

export default useReducer;
