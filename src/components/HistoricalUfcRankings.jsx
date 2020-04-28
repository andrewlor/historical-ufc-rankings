import React from "react";
import PropTypes from "prop-types";
import Timeline from "./timeline/Timeline";
import Rankings from "./rankings/Rankings";

class HistoricalUfcRankings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: Object.keys(props.rankings_history).length - 1,
        };
    }

    componentDidMount = () => {
        window.addEventListener("keydown", this.handleKeyDown);
    };

    handleKeyDown = (event) => {
        const maxIdx = Object.keys(this.props.rankings_history).length - 1;

        switch (event.keyCode) {
            case 87: // W
                this.setState((state) => ({
                    index: Math.min(state.index + 1, maxIdx),
                }));
                break;
            case 83: // S
                this.setState((state) => ({
                    index: Math.max(state.index - 1, 0),
                }));
                break;
        }
    };

    render = () => {
        const { rankings_history } = this.props;
        const { index } = this.state;
        const dates = Object.keys(rankings_history);
        const date = Object.keys(rankings_history)[index];

        return (
            <>
                <Timeline
                    dates={dates}
                    index={index}
                    updateIndex={(index) => {
                        this.setState({ index: index });
                    }}
                />
                <Rankings date={date} divisions={rankings_history[date]} />
            </>
        );
    };
}

HistoricalUfcRankings.propTypes = {
    rankings_history: PropTypes.object.isRequired,
};

export default HistoricalUfcRankings;
