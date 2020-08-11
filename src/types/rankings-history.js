import PropTypes from "prop-types";

export const RankType = PropTypes.exact({
    fighter: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
});

export const DivisionType = PropTypes.arrayOf(RankType);

// Weight class as keys
export const DivisionsType = PropTypes.objectOf(DivisionType);

// Dates as keys
export const RankingsHistoryType = PropTypes.objectOf(DivisionsType);
