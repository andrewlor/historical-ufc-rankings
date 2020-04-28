import React from "react";
import PropTypes from "prop-types";
import "./Division.sass";

const athleteUrl = (fighter) => {
    const fighterNameUrl = fighter.toLowerCase().replace(" ", "-");
    return `https://www.ufc.com/athlete/${fighterNameUrl}`;
};

const isChamp = (rank) => rank == 0;

const Division = React.memo(({ title, rankings }) => {
    return (
        <div className="division">
            <p className="title">{title}</p>
            {rankings.map(({ rank, fighter }) => (
                <div className={`rank ${rank == 0 ? "champ" : ""}`} key={fighter}>
                    {!isChamp(rank) ? <span className="bold">{rank} </span> : null}
                    <a href={athleteUrl(fighter)} target="_blank">
                        {fighter}
                    </a>
                    {isChamp(rank) ? <p>Champion</p> : null}
                </div>
            ))}
        </div>
    );
});

Division.propTypes = {
    title: PropTypes.string.isRequired,
    rankings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Division;
