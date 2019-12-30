import { GET_EXPENSES } from "./expenseTypes";

const initialState = {
    expenses: []
};

const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EXPENSES:
            return {
                ...state,
                expenses: [...action.payload]
            };

        default:
            return state;
    }
};

export default expenseReducer;
