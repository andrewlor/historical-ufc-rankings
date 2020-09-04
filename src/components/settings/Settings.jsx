import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Settings.sass";
import GearImage from "../../../public/assets/img/gear.png";
import CloseImage from "../../../public/assets/img/close.png";

const Settings = React.memo(({ selectableDivisions, selectedDivisions, setSelectedDivisions }) => {
    const [showBox, setShowBox] = useState(false);

    const isSelected = (division) => selectedDivisions.includes(division);
    const handleClick = (division) => () => {
        const newSelectedDivisions = isSelected(division)
            ? selectedDivisions.filter((d) => d !== division)
            : selectedDivisions.concat(division);
        setSelectedDivisions(newSelectedDivisions);
    };

    return (
        <>
            <img
                className="settings-icon clickable"
                onClick={() => setShowBox(!showBox)}
                src={GearImage}
            />
            {showBox ? (
                <>
                    <div className="settings-backdrop" />
                    <div className="settings-box">
                        <img
                            className="exit clickable"
                            src={CloseImage}
                            alt="Close"
                            onClick={() => setShowBox(!showBox)}
                        />
                        {selectableDivisions.map((division) => (
                            <div
                                className="selection"
                                key={division}
                                onClick={handleClick(division)}
                            >
                                <div
                                    className={`check-box clickable ${
                                        isSelected(division) ? "checked" : ""
                                    }`}
                                />
                                <p>{division}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : null}
        </>
    );
});

Settings.propTypes = {
    selectableDivisions: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedDivisions: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedDivisions: PropTypes.func,
};

export default Settings;
