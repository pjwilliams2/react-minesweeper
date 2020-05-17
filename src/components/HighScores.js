import React from "react";

function renderScoreItems(scores, mostRecent) {
    const copy = scores.slice(0, 5);
    copy.sort((a, b) => a - b);

    return copy.map((score, index) => {
        return <li key={index} className={score === mostRecent ? 'highlighted-score' : null} >{(score / 1000).toFixed(3)} sec.</li>;
    });
}

export default function (props) {
    let message = <p>Your High Scores:</p>
    if (!props.scores || props.scores.length === 0) {
        message = <p>No High Scores</p>
    }

    return (
        <div className={"minesweeper-scores"}>
            {message}
            <ol>
                {renderScoreItems(props.scores, props.mostRecent)}
            </ol>
        </div>
    );
}