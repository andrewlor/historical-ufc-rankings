import React from "react";
import PropTypes from "prop-types";
import Division from "../division/Division";
import "./Rankings.sass";

const Rankings = React.memo(({ divisions, date }) => {
    const dateString = new Date(date).toDateString();

    return (
        <>
            <h1 className="date">{dateString}</h1>
            <div className="rankings">
                {Object.keys(divisions).map((division) => (
                    <Division key={division} title={division} rankings={divisions[division]} />
                ))}
            </div>
        </>
    );
});

Rankings.propTypes = {
    date: PropTypes.string.isRequired,
    divisions: PropTypes.object.isRequired,
};

export default Rankings;
