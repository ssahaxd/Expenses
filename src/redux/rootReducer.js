import { combineReducers } from "redux";
import expenseTableReducer from "./expensesTable/expenseTableRecucer";
import useReducer from "./user/userReducer";
import expenseGroupReducer from "./expenseGroup/expenseGroupReducer";

const rootReducer = combineReducers({
    expensesTable: expenseTableReducer,
    user: useReducer,
    expGroup: expenseGroupReducer
});

export default rootReducer;
