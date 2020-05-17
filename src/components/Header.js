import * as React from "react";

export default function (props) {
    return (
        <div className={"minesweeper-header"}>
            <div className={"minesweeper-header-number"}>{props.bombCount}</div>
            <div onClick={props.onNewGameClick}><span role={"img"} aria-label={"Smiley face"}>&#x1F600;</span></div>
            <div className={"minesweeper-header-number"}>{props.timer}</div>
        </div>
    )
}