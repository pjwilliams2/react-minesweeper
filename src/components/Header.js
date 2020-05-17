import * as React from "react";

export default function (props) {
    let emoji = '&#x1F600;';
    if (props.gameStatus === 'win') {
        emoji = '&#x1F60E;'
    } else if (props.gameStatus === 'lose') {
        emoji = '&#x1F92F;'
    }

    return (
        <div className={"minesweeper-header"}>
            <div className={"minesweeper-header-number"}>{props.bombCount}</div>
            <div onClick={props.onNewGameClick}><span role={"img"} aria-label={"Face emoji"} dangerouslySetInnerHTML={{__html: emoji}}></span></div>
            <div className={"minesweeper-header-number"}>{props.timer}</div>
        </div>
    )
}