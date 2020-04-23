import React from "react";
import PropTypes from "prop-types";
import "./Timeline.sass";

class Timeline extends React.Component {
    state = {
        mousedown: false,
    };

    constructor(props) {
        super(props);
        this.dateLabelRef = React.createRef();
        this.timelimeRef = React.createRef();
    }

    componentDidMount = () => {
        this.timelimeRef.current.addEventListener(
            "mousedown",
            ({ clientY }) => {
                this.adjustPosition(clientY);
                this.setState({ mousedown: true });
            }
        );

        this.timelimeRef.current.addEventListener("mouseup", () => {
            this.setState({ mousedown: false });
        });

        this.timelimeRef.current.addEventListener("mouseleave", () => {
            this.setState({ mousedown: false });
        });

        this.timelimeRef.current.addEventListener(
            "mousemove",
            ({ clientY }) => {
                if (this.state.mousedown) this.adjustPosition(clientY);
            }
        );
    };

    adjustPosition = (position) => {
        const length = this.props.dates.length - 1;
        const relativeYPositionPercentage =
            1 - position / this.timelimeRef.current.clientHeight;

        const newIndex = Math.round(relativeYPositionPercentage * length);
        this.props.updateIndex(newIndex);
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.index != this.props.index) {
            this.updateDateLabelPosition();
        }
    };

    updateDateLabelPosition = () => {
        const { dates, index } = this.props;
        const length = dates.length - 1;
        const relativePostionPercentage = ((length - index) / length) * 100;
        this.dateLabelRef.current.style.top = `${relativePostionPercentage}%`;
    };

    render = () => {
        const { dates, index } = this.props;
        return (
            <div ref={this.timelimeRef} className="timeline">
                <p ref={this.dateLabelRef}>{dates[index]}</p>
            </div>
        );
    };
}

Timeline.propTypes = {
    dates: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    index: PropTypes.number.isRequired,
};

export default Timeline;
