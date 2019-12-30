import { combineReducers } from "redux";
import expenseTableReducer from "./expensesTable/expenseTableRecucer";

const rootReducer = combineReducers({
    expensesTable: expenseTableReducer
});

export default rootReducer;
