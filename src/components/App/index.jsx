import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import SignInPage from "../SignIn/signInPage";
import SignUpPage from "../SignUp/signUpPage";
import AppLayout from "../Home/appLayout";
import * as ROUTER from "../../constants/routes";

function App() {
    return (
        <Router>
            <Navigation />
            <Route path={ROUTER.HOME} component={AppLayout} />
            <Route path={ROUTER.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTER.LANDING} exact component={SignInPage} />
        </Router>
    );
}

export default App;
