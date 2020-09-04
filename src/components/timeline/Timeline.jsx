import React from "react";
import PropTypes from "prop-types";
import "./Timeline.sass";

const Timeline = React.memo(({ dates, index }) => {
    const calcTop = (date) => {
        const startDate = new Date(dates[dates.length - 1]);
        const endDate = new Date(dates[0]);
        const dateSpread = endDate - startDate;
        return `calc(${
            Math.round(((new Date(date) - startDate) / dateSpread) * 10000) / 100
        }% - 2px)`;
    };

    return (
        <>
            {dates.map((date, currIndex) => (
                <div
                    key={date}
                    className={`marker ${currIndex === index ? "highlighted" : ""}`}
                    style={{ top: calcTop(date) }}
                />
            ))}
        </>
    );
});

Timeline.propTypes = {
    dates: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    index: PropTypes.number.isRequired,
};

export default Timeline;
