import React from "react";

class Rankings extends React.Component {
    render = () => {
        return (
            <div>
                {this.props.date}
                <table>
                    <tbody>
                        <tr>
                            {Object.keys(this.props.divisions).map(
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
                                )
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
}

export default Rankings;
