import React from "react";
import ReactDOM from "react-dom";
import HistoricalUfcRankings from "./HistoricalUfcRankings";
import rankings_history from "../data/rankings_history.js";

ReactDOM.render(
    <HistoricalUfcRankings rankings_history={rankings_history} />,
    document.getElementById("root")
);
