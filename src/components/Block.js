import React from "react";


function renderContent(block) {
    let content;
    if (block.mode === 'flagged') {
        content = <span>F</span>;
    } else if (block.mode === 'exploded') {
        content = <div className={"exploded"}><img className={"bomb"} alt={"bomb"} src={"bomb.png"} /></div>;
    } else if (block.mode === 'visible' && block.value === 'bomb') {
        content = <img className={"bomb"} alt={"bomb"} src={"bomb.png"} />
    } else if (block.mode === 'visible' && block.value !== 0) {
        content = <span>{block.value}</span>
    } else {
        content = <span>&nbsp;</span>;
    }

    return content;
}

export default function (props) {
    let className = "minesweeper-block";
    if (Number.isInteger(props.block.value)) {
        className += ' value-' + props.block.value;
    }

    return (
        <button className={className}
                onClick={event => props.onBlockClick(props.rowIndex, props.colIndex, 'reveal', event)}
                onContextMenu={event => props.onBlockClick(props.rowIndex, props.colIndex, 'flag', event)}>
            {renderContent(props.block)}
        </button>
    );
}