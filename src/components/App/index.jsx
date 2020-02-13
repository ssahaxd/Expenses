import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import * as ROUTER from "../../constants/routes";
import DashBoard from "./../DashBoard/DashBoard";
import ExpenseDetails from "../DashBoard/ExpenseDetails/ExpenseDetails";

function App() {
    return (
        <Router>
            <Navigation />
            <Route exact path={ROUTER.DASHBOARD} component={DashBoard} />
            <Route path={ROUTER.EXPENSES} component={ExpenseDetails} />
            <Redirect to={ROUTER.DASHBOARD} />
        </Router>
    );
}

export default App;
