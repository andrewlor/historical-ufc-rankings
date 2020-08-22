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
        this.dateLabelRef = React.createRef();
        this.indicatorRef = React.createRef();
        this.dateLabelContainerRef = React.createRef();
        this.timelimeRef = React.createRef();
    }

    componentDidMount = () => this.updateIndicatorPosition();

    componentDidUpdate = (prevProps) => {
        if (prevProps.index != this.props.index) {
            this.updateIndicatorPosition();
        }
    };

    handleMouseDown = ({ clientY }) => {
        this.updateDateLabelIndex(clientY);
        this.setState({ mousedown: true });
    };

    handleMouseLeave = () => {
        this.setMouseDownFalse();
        this.hideDateLabel();
    };

    handleMouseMove = ({ clientY }) => {
        if (this.state.mousedown) this.updateDateLabelIndex(clientY);
        this.updateDateLabelPosition(clientY);
    };

    setMouseDownFalse = () => this.setState({ mousedown: false });

    updateDateLabelIndex = (yPosition) => this.props.updateIndex(this.calculateIndex(yPosition));

    hideDateLabel = () => (this.dateLabelRef.current.style.left = "-200%");

    showDateLabel = () => (this.dateLabelRef.current.style.left = "0%");

    updateDateLabelPosition = (yPosition) => {
        const index = this.calculateIndex(yPosition);
        const nodeStyle = this.dateLabelContainerRef.current.style;

        const topPercentage = this.getRelativePositionPercentage(index);
        const offset = this.dateLabelContainerRef.current.clientHeight / 2;

        nodeStyle.top = `calc(${topPercentage}% - ${offset}px)`;

        this.setState({ hoverDateLabelIndex: index });
    };

    updateIndicatorPosition = () => {
        const { index } = this.props;
        const nodeStyle = this.indicatorRef.current.style;

        const topPercentage = this.getRelativePositionPercentage(index);
        const offset = this.indicatorRef.current.clientHeight / 2;

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
                onMouseEnter={this.showDateLabel}
                onMouseMove={this.handleMouseMove}
            >
                <div ref={this.indicatorRef} className="indicator" />
                <div ref={this.dateLabelContainerRef} className="dateLabel">
                    <p ref={this.dateLabelRef}>
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
