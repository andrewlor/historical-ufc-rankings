import React, { useState } from "react";
import PropTypes from "prop-types";
import Division from "../division/Division";
import "./Rankings.sass";
import { formatDate } from "../../utils";

const Rankings = React.memo(({ divisions, date, selectedDivisions }) => {
    const [selectedFighters, setSelectedFighters] = useState([]);

    return (
        <>
            <h1 className="date">{formatDate(date)}</h1>
            <div className="rankings">
                {Object.keys(divisions).map((division) =>
                    selectedDivisions.includes(division) ? (
                        <Division
                            key={division}
                            title={division}
                            rankings={divisions[division]}
                            selectedFighters={selectedFighters}
                            setSelectedFighters={setSelectedFighters}
                        />
                    ) : null
                )}
            </div>
        </>
    );
});

Rankings.propTypes = {
    date: PropTypes.string.isRequired,
    divisions: PropTypes.object.isRequired,
    selectedDivisions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Rankings;
