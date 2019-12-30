import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Firebase, { FirebaseContext } from "./components/Firebase/";
import App from "./components/App";
import store from "./redux/store";
import "./index.css";
import "antd/dist/antd.css";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
            <App />
        </FirebaseContext.Provider>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
