import React from "react";
import PropTypes from "prop-types";
import "./SplashScreen.sass";
import HistoricalUfcRankings from "../HistoricalUfcRankings";
import axios from "axios";

class SplashScreen extends React.Component {
    state = {
        childProps: null,
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

    render = () =>
        !this.state.childProps ? (
            <div className="splash-screen">Loading...</div>
        ) : (
            <HistoricalUfcRankings {...this.state.childProps} />
        );
}

SplashScreen.propTypes = {
    propNameToUrlMap: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};

export default SplashScreen;