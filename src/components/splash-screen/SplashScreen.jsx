import React from "react";
import PropTypes from "prop-types";
import "./SplashScreen.sass";
import HistoricalUfcRankings from "../HistoricalUfcRankings";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

class SplashScreen extends React.Component {
    state = {
        childProps: null,
        begin: false,
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

    isAppVisible = () => this.state.childProps && this.state.begin;

    render = () => (
        <>
            <div className="splash-screen" style={this.isAppVisible() ? { top: "-100%" } : {}}>
                <h1>Historical UFC Rankings</h1>
                <p>
                    An interactive data explorer for the history of the UFC rankings, since their
                    inception.
                </p>
                <p>Explore how UFC fighters have moved through the rankings through time.</p>
                {!this.isAppVisible() ? (
                    <button className="inverted" onClick={() => this.setState({ begin: true })}>
                        Begin
                    </button>
                ) : (
                    <CircularProgress thickness={2} />
                )}
            </div>
            {this.isAppVisible() ? <HistoricalUfcRankings {...this.state.childProps} /> : null}
        </>
    );
}

SplashScreen.propTypes = {
    propNameToUrlMap: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};

export default SplashScreen;
