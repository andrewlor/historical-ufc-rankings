import React from "react";
import PropTypes from "prop-types";
import "./Division.sass";
import PinImage from "../../../public/assets/img/pin.png";
import { DivisionType } from "../../types/rankings-history";
const athleteUrl = (fighter) => {
    const fighterNameUrl = fighter.toLowerCase().replace(" ", "-");
    return `https://www.ufc.com/athlete/${fighterNameUrl}`;
};

const Division = React.memo(({ title, rankings, selectedFighters, setSelectedFighters }) => {
    const isSelected = (fighter) => selectedFighters.includes(fighter);

    const isPoundForPound = !rankings.map(({ rank }) => rank).includes(0);

    const isChamp = (rank) => rank == 0 || (rank == 1 && isPoundForPound);

    const handlePinClick = (fighter) => () => {
        const newSelectedFighters = isSelected(fighter)
            ? selectedFighters.filter((d) => d !== fighter)
            : selectedFighters.concat(fighter);
        setSelectedFighters(newSelectedFighters);
    };

    const buildClassNames = (rank, fighter) => {
        return `rank\
            ${isChamp(rank) ? "champ" : ""}\
            ${isSelected(fighter) ? "selected" : ""}
        `;
    };

    return (
        <div className="division">
            <p className="title">{title}</p>
            {rankings.map(({ rank, fighter }) => (
                <div className={buildClassNames(rank, fighter)} key={`${rank}-${fighter}`}>
                    {!isChamp(rank) ? <span className="bold">{rank} </span> : null}
                    <a href={athleteUrl(fighter)} target="_blank">
                        {fighter}
                    </a>
                    {isChamp(rank) ? <p>{isPoundForPound ? "Top Rank" : "Champion"}</p> : null}
                    <img className="pin" src={PinImage} onClick={handlePinClick(fighter)} />
                </div>
            ))}
        </div>
    );
});

Division.propTypes = {
    title: PropTypes.string.isRequired,
    rankings: DivisionType.isRequired,
    selectedFighters: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedFighters: PropTypes.func.isRequired,
};

export default Division;
