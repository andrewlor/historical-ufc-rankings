import React from "react";
import Division from "../division/Division";
import "./Rankings.sass";

class Rankings extends React.Component {
    render = () => {
        const { divisions, date } = this.props;
        const dateString = new Date(date).toDateString();

        return (
            <>
                <h1 className="date">{dateString}</h1>
                <div className="rankings">
                    {Object.keys(divisions).map((division) => (
                        <Division
                            key={division}
                            title={division}
                            rankings={divisions[division]}
                        />
                    ))}
                </div>
            </>
        );
    };
}

export default Rankings;

/*
                                (weightClass) => (
                                    <td key={weightClass}>
                                        {weightClass}
                                        {this.props.divisions[weightClass].map(
                                            (rank) => (
                                                <div key={rank.fighter}>
                                                    {rank.rank} {rank.fighter}
                                                </div>
                                            )
                                        )}
                                    </td>
                                )*/
