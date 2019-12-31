import { combineReducers } from "redux";
import expenseTableReducer from "./expensesTable/expenseTableRecucer";
import useReducer from "./user/userReducer";

const rootReducer = combineReducers({
    expensesTable: expenseTableReducer,
    user: useReducer
});

export default rootReducer;
