import React from "react";
import Row from "./Row";

function renderRows(blocks, blockClickedHandler) {
    return blocks.map(rowBlocks => {
        return <Row block={rowBlocks} onBlockClick={blockClickedHandler} />;
    })
}

export default function (props) {
    return (
        <div className={"minesweeper-grid"}>
            {renderRows(props.blocks, props.onBlockClick)}
        </div>
    )
}