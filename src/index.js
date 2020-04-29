import React from "react";
import ReactDOM from "react-dom";
import HistoricalUfcRankings from "./components/HistoricalUfcRankings";
import rankings_history from "../data/rankings_history.json";
import all_divisions from "../data/all_divisions.json";
import "./index.sass";

ReactDOM.render(
    <HistoricalUfcRankings rankings_history={rankings_history} all_divisions={all_divisions} />,
    document.getElementById("root")
);
