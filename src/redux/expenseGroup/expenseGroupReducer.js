import {
    SET_LODING_TRUE,
    SET_LODING_FALSE,
    SET_USER_EXP_GROUPS
} from "./expenseGroupActionType";

const initialState = {
    expGrLoading: false,
    userExpGropus: []
};

const expenseGroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LODING_TRUE:
            return {
                ...state,
                expGrLoading: true
            };
        case SET_LODING_FALSE:
            return {
                ...state,
                expGrLoading: false
            };
        case SET_USER_EXP_GROUPS:
            return {
                ...state,
                userExpGropus: [...action.payload]
            };
        default:
            return state;
    }
};

export default expenseGroupReducer;
