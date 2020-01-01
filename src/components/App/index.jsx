import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import SignInPage from "../SignIn/signInPage";
import SignUpPage from "../SignUp/signUpPage";
import AppLayout from "../Home/appLayout";
import * as ROUTER from "../../constants/routes";
import DashBoard from "./../DashBoard/DashBoard";

function App() {
    return (
        <Router>
            <Navigation />
            <Route exact path={ROUTER.DASHBOARD} component={DashBoard} />
            <Route exact path={ROUTER.HOME} component={AppLayout} />
            <Route exact path={ROUTER.SIGN_UP} component={SignUpPage} />
            <Route exact path={ROUTER.LANDING} component={SignInPage} />
        </Router>
    );
}

export default App;
