import React from "react";
import Block from "./Block";

function renderBlocks(blocks, blockClickedHandler) {
    return blocks.map(block => {
        return <Block block={block} onBlockClick={blockClickedHandler} />
    });
}

export default function (props) {
    return (
        <div className={"minesweeper-grid-row"}>
            {renderBlocks(props.blocks, props.onBlockClick)}
        </div>
    )
}