import { GET_EXPENSES } from "./expenseTypes";

export const getExpenses = payload => {
    return {
        type: GET_EXPENSES,
        payload: payload
    };
};
