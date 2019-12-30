import { combineReducers } from "redux";
import expenseReducer from "./expenses/expenseRecucer";

const rootReducer = combineReducers({
    expenses: expenseReducer
});

export default rootReducer;
