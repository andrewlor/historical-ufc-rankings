import React from "react";
import Rankings from "./Rankings.jsx";

class HistoricalUfcRankings extends React.Component {
    state = {
        index: 0,
    };

    componentDidMount() {
        window.addEventListener("keydown", (event) => {
            const maxIdx = Object.keys(this.props.rankings_history).length - 1;

            switch (event.keyCode) {
                case 40:
                    this.setState((state) => ({
                        index: Math.min(state.index + 1, maxIdx),
                    }));
                    break;
                case 38:
                    this.setState((state) => ({
                        index: Math.max(state.index - 1, 0),
                    }));
                    break;
            }
        });
    }

    render = () => {
        const { rankings_history } = this.props;
        const date = Object.keys(rankings_history)[this.state.index];

        return (
            <Rankings
                key={date}
                date={date}
                divisions={rankings_history[date]}
            />
        );
    };
}

export default HistoricalUfcRankings;
