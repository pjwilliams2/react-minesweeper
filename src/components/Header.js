import * as React from "react";

export default function (props) {
    return (
        <div className={"minesweeper-header"}>
            <div className={"minesweeper-header-number"}>{props.bombCount}</div>
            <div onClick={props.onNewGameClick}>happy face</div>
            <div className={"minesweeper-header-number"}>{props.timer}</div>
        </div>
    )
}