import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Settings.sass";

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
            <div className="settings-icon" onClick={() => setShowBox(!showBox)}>
                <p>Settings</p>
            </div>
            {showBox ? (
                <div className="settings-box">
                    {selectableDivisions.map((division) => (
                        <div className="selection" key={division} onClick={handleClick(division)}>
                            <p>{division}</p>
                            <div className={`check-box ${isSelected(division) ? "checked" : ""}`} />
                        </div>
                    ))}
                </div>
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