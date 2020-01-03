import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import * as ROUTER from "../../constants/routes";
import DashBoard from "./../DashBoard/DashBoard";

function App() {
    return (
        <Router>
            <Navigation />
            <Route exact path={ROUTER.DASHBOARD} component={DashBoard} />
            <Redirect to={ROUTER.DASHBOARD} />
        </Router>
    );
}

export default App;
