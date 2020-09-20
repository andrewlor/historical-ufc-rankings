import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import SplashScreen from "./components/splash-screen/SplashScreen";

ReactDOM.render(
    <SplashScreen
        propNameToUrlMap={{
            rankings_history: process.env.RANKINGS_HISTORY_URL,
            all_divisions: process.env.ALL_DIVISIONS_URL,
        }}
    />,
    document.getElementById("root")
);
