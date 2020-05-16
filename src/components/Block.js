



export default function (props) {
    let content;
    if (props.mode === 'hidden') {
        content = '';
    } else if (props.mode === 'flagged') {
        content = 'F';
    } else if (props.mode === 'visible') {
        content = props.value;
    }

    return (
        <div className={"minesweeper-block"}>{content}</div>
    )
}