import React from "react";
import PropTypes from "prop-types";
import "./Division.sass";

const athleteUrl = (fighter) => {
    const fighterNameUrl = fighter.toLowerCase().replace(" ", "-");
    return `https://www.ufc.com/athlete/${fighterNameUrl}`;
};

const Division = React.memo(({ title, rankings }) => {
    return (
        <div className="division">
            <p className="title">{title}</p>
            {rankings.map(({ rank, fighter }) => (
                <p className="rank" key={fighter}>
                    {rank == 0 ? "C" : rank}{" "}
                    <a href={athleteUrl(fighter)} target="_blank">
                        {fighter}
                    </a>
                </p>
            ))}
        </div>
    );
});

Division.propTypes = {
    title: PropTypes.string.isRequired,
    rankings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Division;
