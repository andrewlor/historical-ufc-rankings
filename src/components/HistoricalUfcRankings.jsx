import React from "react";
import PropTypes from "prop-types";
import Timeline from "./timeline/Timeline";
import Rankings from "./rankings/Rankings";
import Info from "./info/Info";
import Settings from "./settings/Settings";

class HistoricalUfcRankings extends React.Component {
    constructor(props) {
        super(props);

        const { all_divisions } = props;

        this.state = {
            index: Object.keys(props.rankings_history).length - 1,
            selectedDivisions: all_divisions,
        };
    }

    componentDidMount = () => {
        window.addEventListener("keydown", this.handleKeyDown);
    };

    handleKeyDown = (event) => {
        const maxIdx = Object.keys(this.props.rankings_history).length - 1;

        switch (event.keyCode) {
            case 37: // W
                this.setState((state) => ({
                    index: Math.min(state.index + 1, maxIdx),
                }));
                break;
            case 39: // S
                this.setState((state) => ({
                    index: Math.max(state.index - 1, 0),
                }));
                break;
        }
    };

    render = () => {
        const { rankings_history, all_divisions } = this.props;
        const { index, selectedDivisions } = this.state;
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
                <Rankings
                    date={date}
                    divisions={rankings_history[date]}
                    selectedDivisions={selectedDivisions}
                />
                <Info />
                <Settings
                    selectableDivisions={all_divisions}
                    selectedDivisions={selectedDivisions}
                    setSelectedDivisions={(divisions) =>
                        this.setState({ selectedDivisions: divisions })
                    }
                />
            </>
        );
    };
}

HistoricalUfcRankings.propTypes = {
    rankings_history: PropTypes.object.isRequired,
    all_divisions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HistoricalUfcRankings;
