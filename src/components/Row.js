import React from "react";
import Block from "./Block";

function renderBlocks(rowIndex, blocks, blockClickedHandler) {
    return blocks.map((block, colIndex) => {
        return <Block rowIndex={rowIndex}
                      colIndex={colIndex}
                      block={block}
                      onBlockClick={blockClickedHandler}
                      key={`${rowIndex}.${colIndex}`} />
    });
}

export default function (props) {
    return (
        <div className={"minesweeper-grid-row"}>
            {renderBlocks(props.rowIndex, props.blocks, props.onBlockClick)}
        </div>
    )
}