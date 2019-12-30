import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import CollectionsPage from "../common/modal";
import SignInPage from "../SignIn/";
import SignUpPage from "../SignUp/";
import AppLayout from "../Home/appLayout";
import * as ROUTER from "../../constants/routes";

function App() {
    return (
        <Router>
            <Navigation location={{ pathname: "/" }} />
            <Route path={ROUTER.HOME} component={AppLayout} />
            <Route path={ROUTER.SIGN_IN} component={SignInPage} />
            <Route path={ROUTER.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTER.LANDING} exact component={CollectionsPage} />
        </Router>
    );
}

export default App;
