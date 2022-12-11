import React from "react";
import PropTypes from "prop-types";
import "./SplashScreen.sass";
import HistoricalUfcRankings from "../HistoricalUfcRankings";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";

class SplashScreen extends React.Component {
    state = {
        childProps: null,
        explore: false,
    };

    componentDidMount() {
        Promise.all(Object.values(this.props.propNameToUrlMap).map(axios.get)).then((values) => {
            this.setState({
                childProps: Object.keys(this.props.propNameToUrlMap).reduce(
                    (obj, k, i) => ({
                        ...obj,
                        [k]: values[i].data,
                    }),
                    {}
                ),
            });
        });
    }

    isAppVisible = () => this.state.childProps && this.state.explore;

    render = () => (
        <>
            <CSSTransition in={!this.isAppVisible()} timeout={500} classNames="top">
                <div className="splash-screen">
                    <h1>Historical UFC Rankings</h1>
                    <p>
                        An interactive data explorer for the history of the UFC rankings, since
                        their inception.
                    </p>
                    <p>Explore how UFC fighters have moved through the rankings through time.</p>
                    <div className="explore-container">
                        {!this.state.explore ? (
                            <button
                                className="inverted"
                                onClick={() => this.setState({ explore: true })}
                            >
                                Explore
                            </button>
                        ) : (
                            <CircularProgress thickness={2} />
                        )}
                    </div>
                </div>
            </CSSTransition>
            {this.isAppVisible() ? <HistoricalUfcRankings {...this.state.childProps} /> : null}
        </>
    );
}

SplashScreen.propTypes = {
    propNameToUrlMap: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};

export default SplashScreen;
