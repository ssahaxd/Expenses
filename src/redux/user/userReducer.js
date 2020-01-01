import { RESET_USER_ID, SET_USER } from "./userActionType";

const initialState = JSON.parse(localStorage.getItem("user")) || {
    uid: null,
    userInfo: {
        email: "",
        firstname: "",
        lastname: "",
        username: ""
    }
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
        default:
            return state;
    }
};

export default useReducer;
