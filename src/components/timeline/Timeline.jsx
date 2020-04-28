import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../utils";
import "./Timeline.sass";

class Timeline extends React.Component {
    state = {
        mousedown: false,
        hoverDateLabelIndex: -1,
    };

    constructor(props) {
        super(props);
        this.hoverDateLabelRef = React.createRef();
        this.dateContainerRef = React.createRef();
        this.hoverDateContainerRef = React.createRef();
        this.timelimeRef = React.createRef();
    }

    componentDidMount = () => {
        this.timelimeRef.current.addEventListener("mousedown", ({ clientY }) => {
            this.updateDateLabelIndex(clientY);
            this.setState({ mousedown: true });
        });

        this.timelimeRef.current.addEventListener("mouseup", this.setMouseDownFalse);
        this.timelimeRef.current.addEventListener("mouseleave", () => {
            this.setMouseDownFalse();
            this.hideHoverDateLabel();
        });
        this.timelimeRef.current.addEventListener("mouseenter", this.showHoverDateLabel);

        this.timelimeRef.current.addEventListener("mousemove", ({ clientY }) => {
            if (this.state.mousedown) this.updateDateLabelIndex(clientY);
            this.updateHoverDateLabel(clientY);
        });
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.index != this.props.index) {
            this.updateDateLabelPosition();
        }
    };

    setMouseDownFalse = () => this.setState({ mousedown: false });

    hideHoverDateLabel = () => {
        this.hoverDateLabelRef.current.style.left = "-200%";
    };

    showHoverDateLabel = () => {
        this.hoverDateLabelRef.current.style.left = "0%";
    };

    updateDateLabelIndex = (yPosition) => this.props.updateIndex(this.calculateIndex(yPosition));

    updateHoverDateLabel = (yPosition) => {
        const index = this.calculateIndex(yPosition);

        this.hoverDateContainerRef.current.style.top = `${this.getRelativePositionPercentage(
            index
        )}%`;

        this.setState({ hoverDateLabelIndex: index });
    };

    calculateIndex = (yPosition) => {
        const length = this.props.dates.length - 1;
        const relativeYPositionPercentage = 1 - yPosition / this.timelimeRef.current.clientHeight;

        return Math.round(relativeYPositionPercentage * length);
    };

    updateDateLabelPosition = () => {
        const { index } = this.props;
        this.dateContainerRef.current.style.top = `${this.getRelativePositionPercentage(index)}%`;
    };

    getRelativePositionPercentage = (index) => {
        const { dates } = this.props;
        const length = dates.length - 1;
        return ((length - index) / length) * 100;
    };

    render = () => {
        const { dates, index } = this.props;
        const { hoverDateLabelIndex } = this.state;
        return (
            <div ref={this.timelimeRef} className="timeline">
                <div ref={this.dateContainerRef} className="dateLabel">
                    <p>{formatDate(dates[index])}</p>
                </div>
                <div ref={this.hoverDateContainerRef} className="dateLabel hover">
                    <p ref={this.hoverDateLabelRef}>
                        {hoverDateLabelIndex >= 0 ? formatDate(dates[hoverDateLabelIndex]) : null}
                    </p>
                </div>
            </div>
        );
    };
}

Timeline.propTypes = {
    dates: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    index: PropTypes.number.isRequired,
};

export default Timeline;
