import React, { useState } from "react";
import PropTypes from "prop-types";
import Division from "../division/Division";
import "./Rankings.sass";
import { DivisionsType } from "../../types/rankings-history";

const P4P = "POUND-FOR-POUND";

const Rankings = React.memo(({ divisions, date, selectedDivisions }) => {
    const [selectedFighters, setSelectedFighters] = useState([]);

    return (
        <div className="divisions-container">
            {Object.keys(divisions)
                .sort((a, b) => (a.includes(P4P) ? -1 : b.includes(P4P) ? 1 : 0))
                .map((division) =>
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
    );
});

Rankings.propTypes = {
    date: PropTypes.string.isRequired,
    divisions: DivisionsType.isRequired,
    selectedDivisions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Rankings;
