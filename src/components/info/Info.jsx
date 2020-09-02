import React, { useState } from "react";
import "./Info.sass";
import CloseImage from "../../../public/assets/img/close.png";

const Info = React.memo(() => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <>
            <div className="info-icon" onClick={() => setShowInfo(!showInfo)}>
                <p>?</p>
            </div>
            {showInfo ? (
                <>
                    <div className="info-backdrop" />
                    <div className="info-box">
                        <h2>How to use</h2>
                        <ul>
                            <li>
                                Click and drag on the timeline on the left side of the screen to
                                navigate dates quickly
                            </li>
                            <li>Use the left and right arrow keys to nagivate dates precisely</li>
                            <li>Use gear in the bottom right to filter divisions</li>
                            <li>
                                Click the pin beside a fighters name to highlight them, follow them
                                through the rankings!
                            </li>
                            <li>Tip: You can click on a fighters name to look at their profile</li>
                        </ul>
                        <p className="icon-source">Icons source: https://icons8.com</p>
                        <img
                            className="exit"
                            src={CloseImage}
                            alt="Close"
                            onClick={() => setShowInfo(!showInfo)}
                        />
                    </div>
                </>
            ) : null}
        </>
    );
});

export default Info;
