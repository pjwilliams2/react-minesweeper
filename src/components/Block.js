import React from "react";


export default function (props) {
    let content;
    if (props.block.mode === 'hidden') {
        content = '';
    } else if (props.block.mode === 'flagged') {
        content = 'F';
    } else if (props.block.mode === 'visible') {
        content = props.value;
    }

    return (
        <div className={"minesweeper-block"} onClick={props.onBlockClick(props.block)}>{content}</div>
    )
}