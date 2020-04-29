import React, { useState } from "react";
import "./Info.sass";

const Info = React.memo(() => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <>
            <div
                className="icon"
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
            >
                <p>?</p>
            </div>
            {showInfo ? (
                <p className="info">
                    Click and drag on the timeline on the left side of the screen to navigate
                    quickly. Use the left and right arrow keys to nagivate precisely.
                </p>
            ) : null}
        </>
    );
});

export default Info;
