import React from "react";
import PropTypes from "prop-types";
import Division from "../division/Division";
import "./Rankings.sass";
import { formatDate } from "../../utils";

const Rankings = React.memo(({ divisions, date }) => (
    <>
        <h1 className="date">Historical UFC Rankings: {formatDate(date)}</h1>
        <div className="rankings">
            {Object.keys(divisions).map((division) => (
                <Division key={division} title={division} rankings={divisions[division]} />
            ))}
        </div>
    </>
));

Rankings.propTypes = {
    date: PropTypes.string.isRequired,
    divisions: PropTypes.object.isRequired,
};

export default Rankings;
