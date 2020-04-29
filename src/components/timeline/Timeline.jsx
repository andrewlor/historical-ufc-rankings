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

    componentDidUpdate = (prevProps) => {
        if (prevProps.index != this.props.index) {
            this.updateDateLabelPosition();
        }
    };

    handleMouseDown = ({ clientY }) => {
        this.updateDateLabelIndex(clientY);
        this.setState({ mousedown: true });
    };

    handleMouseLeave = () => {
        this.setMouseDownFalse();
        this.hideHoverDateLabel();
    };

    handleMouseMove = ({ clientY }) => {
        if (this.state.mousedown) this.updateDateLabelIndex(clientY);
        this.updateHoverDateLabel(clientY);
    };

    setMouseDownFalse = () => this.setState({ mousedown: false });

    updateDateLabelIndex = (yPosition) => this.props.updateIndex(this.calculateIndex(yPosition));

    hideHoverDateLabel = () => (this.hoverDateLabelRef.current.style.left = "-200%");

    showHoverDateLabel = () => (this.hoverDateLabelRef.current.style.left = "0%");

    updateHoverDateLabel = (yPosition) => {
        const index = this.calculateIndex(yPosition);
        const nodeStyle = this.hoverDateContainerRef.current.style;

        const topPercentage = this.getRelativePositionPercentage(index);
        const offset = this.hoverDateContainerRef.current.clientHeight / 2;

        nodeStyle.top = `calc(${topPercentage}% - ${offset}px)`;

        this.setState({ hoverDateLabelIndex: index });
    };

    updateDateLabelPosition = () => {
        const { index } = this.props;
        const nodeStyle = this.dateContainerRef.current.style;

        const topPercentage = this.getRelativePositionPercentage(index);
        const offset = this.dateContainerRef.current.clientHeight / 2;

        nodeStyle.top = `calc(${topPercentage}% - ${offset}px)`;
    };

    calculateIndex = (yPosition) => {
        const length = this.props.dates.length - 1;
        const relativeYPositionPercentage =
            1 - (yPosition - 12) / this.timelimeRef.current.clientHeight;

        return Math.min(Math.max(Math.round(relativeYPositionPercentage * length), 0), length);
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
            <div
                className="timeline"
                ref={this.timelimeRef}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.setMouseDownFalse}
                onMouseLeave={this.handleMouseLeave}
                onMouseEnter={this.showHoverDateLabel}
                onMouseMove={this.handleMouseMove}
            >
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
