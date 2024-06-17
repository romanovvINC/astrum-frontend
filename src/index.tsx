import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import { Provider } from "react-redux";
import store from "./Redux/store";
import App from "./App";

import "react-notifications-component/dist/theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ReactNotifications />
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
