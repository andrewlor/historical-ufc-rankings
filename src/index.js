import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import SplashScreen from "./components/splash-screen/SplashScreen";

ReactDOM.render(
    <SplashScreen
        propNameToUrlMap={{
            rankings_history: env.RANKINGS_HISTORY_URL,
            all_divisions: env.ALL_DIVISIONS_URL,
        }}
    />,
    document.getElementById("root")
);
