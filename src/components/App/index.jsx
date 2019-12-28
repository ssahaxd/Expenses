import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import Landing from "../Landing";
import SignInPage from "../SignIn/";
import SignUpPage from "../SignUp/";

import * as ROUTER from "../../constants/routes";
import AppLayout from "../Home/appLayout";

function App() {
    return (
        <Router>
            <Navigation location={{ pathname: "/" }} />
            <Route path={ROUTER.HOME} component={AppLayout} />
            <Route path={ROUTER.SIGN_IN} component={SignInPage} />
            <Route path={ROUTER.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTER.LANDING} exact component={Landing} />
        </Router>
    );
}

export default App;
