import React from "react";
import PropTypes from "prop-types";
import Timeline from "./timeline/Timeline";
import Rankings from "./rankings/Rankings";
import Settings from "./settings/Settings";
import ControlPanel from "./control-panel/ControlPanel";
import { RankingsHistoryType } from "../types/rankings-history";
import { formatDate } from "../utils";
import "./HistoricalUfcRankings.sass";

class HistoricalUfcRankings extends React.Component {
    constructor(props) {
        super(props);

        const { all_divisions } = props;

        const maxIndex = Object.keys(props.rankings_history).length - 1;

        this.state = {
            maxIndex: maxIndex,
            index: maxIndex,
            selectedDivisions: all_divisions,
            animationIntervalId: -1,
        };

        // Scroll control
        // window.addEventListener("wheel", (e) =>
        //     this.setIndex(this.state.index - Math.ceil(Math.round(e.deltaY) / 10))
        // );
    }

    componentDidMount = () => {
        window.addEventListener("keydown", this.handleKeyDown);
    };

    isAnimating = () => this.state.animationIntervalId > -1;

    toggleAnimation = () => {
        if (this.isAnimating()) {
            clearInterval(this.state.animationIntervalId);
            this.setState({ animationIntervalId: -1 });
        } else {
            const intervalId = setInterval(
                () =>
                    this.setState(({ index }) => {
                        const maxIdx = Object.keys(this.props.rankings_history).length - 1;

                        return { index: Math.min(index + 1, maxIdx) };
                    }),
                500
            );
            this.setState({ animationIntervalId: intervalId });
        }
    };

    handleKeyDown = (event) => {
        const maxIdx = Object.keys(this.props.rankings_history).length - 1;

        switch (event.keyCode) {
            case 37: // Left arrow
                this.setState((state) => ({
                    index: Math.min(state.index + 1, maxIdx),
                }));
                break;
            case 39: // Right arrow
                this.setState((state) => ({
                    index: Math.max(state.index - 1, 0),
                }));
                break;
            case 32: // Spacebar
                this.toggleAnimation();
        }
    };

    setIndex = (newIndex) =>
        this.setState({
            index: Math.min(Math.max(newIndex, 0), this.state.maxIndex),
        });

    render = () => {
        const { rankings_history, all_divisions } = this.props;
        const { index, selectedDivisions } = this.state;
        const dates = Object.keys(rankings_history);
        const date = Object.keys(rankings_history)[index];

        return (
            <div className="main-view-container">
                <p className="date">{formatDate(date)}</p>
                <div className="rankings-container">
                    <Rankings
                        date={date}
                        divisions={rankings_history[date]}
                        selectedDivisions={selectedDivisions}
                    />
                </div>
                <div className="bottom-bar">
                    <div className="spacer" />
                    <ControlPanel
                        index={index}
                        setIndex={this.setIndex}
                        maxIndex={this.state.maxIndex}
                        toggleAnimation={this.toggleAnimation}
                        isAnimating={this.isAnimating()}
                    />
                    <Settings
                        selectableDivisions={all_divisions}
                        selectedDivisions={selectedDivisions}
                        setSelectedDivisions={(divisions) =>
                            this.setState({ selectedDivisions: divisions })
                        }
                    />
                </div>

                {/* Absolute */}
                <Timeline dates={dates} index={index} />
            </div>
        );
    };
}

HistoricalUfcRankings.propTypes = {
    rankings_history: RankingsHistoryType.isRequired,
    all_divisions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HistoricalUfcRankings;
