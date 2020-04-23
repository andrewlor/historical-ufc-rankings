import React from "react";
import "./Division.sass";

class Division extends React.Component {
    render = () => {
        const { title, rankings } = this.props;

        return (
            <div className="division">
                <p className="title">{title}</p>
                {rankings.map(({ rank, fighter }) => (
                    <p className="rank" key={fighter}>
                        {rank == 0 ? "C" : rank} {fighter}
                    </p>
                ))}
            </div>
        );
    };
}

export default Division;
