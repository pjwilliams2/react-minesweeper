import React from "react";
import Row from "./Row";

function renderRows(blocks, blockClickedHandler) {
    return blocks.map((rowBlocks, index) => {
        return <Row rowIndex={index} blocks={rowBlocks} onBlockClick={blockClickedHandler} key={index} />;
    })
}

export default function (props) {
    return (
        <div className={"minesweeper-grid"}>
            {renderRows(props.blocks, props.onBlockClick)}
        </div>
    )
}