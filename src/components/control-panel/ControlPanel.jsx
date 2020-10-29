import React from "react";
import PropTypes from "prop-types";
import "./ControlPanel.sass";
import ChevronLeft from "../../../public/assets/img/chevron-left.png";
import ChevronRight from "../../../public/assets/img/chevron-right.png";
import Chevron2Left from "../../../public/assets/img/chevron-2-left.png";
import Chevron2Right from "../../../public/assets/img/chevron-2-right.png";
import Move10Left from "../../../public/assets/img/move-10-left.png";
import Move10Right from "../../../public/assets/img/move-10-right.png";

const ControlPanel = React.memo(({ index, setIndex, maxIndex }) => {
    return (
        <div className="control-panel">
            <img
                src={Chevron2Left}
                className={`clickable ${index === maxIndex ? "disabled" : ""}`}
                onClick={() => setIndex(maxIndex)}
            />
            <img
                src={Move10Left}
                className={`clickable ${index === maxIndex ? "disabled" : ""}`}
                onClick={() => setIndex(index + 10)}
            />
            <img
                src={ChevronLeft}
                className={`clickable ${index === maxIndex ? "disabled" : ""}`}
                onClick={() => setIndex(index + 1)}
            />
            <img
                src={ChevronRight}
                className={`clickable ${index === 0 ? "disabled" : ""}`}
                onClick={() => setIndex(index - 1)}
            />
            <img
                src={Move10Right}
                className={`clickable ${index === 0 ? "disabled" : ""}`}
                onClick={() => setIndex(index - 10)}
            />
            <img
                src={Chevron2Right}
                className={`clickable ${index === 0 ? "disabled" : ""}`}
                onClick={() => setIndex(0)}
            />
        </div>
    );
});

ControlPanel.propTypes = {
    setIndex: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    maxIndex: PropTypes.number.isRequired,
};

export default ControlPanel;
