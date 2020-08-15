import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import SplashScreen from "./components/splash-screen/SplashScreen";

ReactDOM.render(
    <SplashScreen
        propNameToUrlMap={{
            rankings_history:
                "https://historical-ufc-rankings.s3-us-west-2.amazonaws.com/data/rankings_history.json",
            all_divisions:
                "https://historical-ufc-rankings.s3-us-west-2.amazonaws.com/data/all_divisions.json",
        }}
    />,
    document.getElementById("root")
);
