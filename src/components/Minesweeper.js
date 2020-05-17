import * as React from 'react';

import Header from "./Header";
import Grid from "./Grid";
import Utilities from "./Utilities";

class Minesweeper extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            blocks: [],
            bombsRemaining: 99,
            gameStatus: null,
            timer: 0,
        };

        this.blockClickedHandler = this.blockClicked.bind(this);
        this.timerInterval = null;
        this.rows = 16;
        this.columns = 30;
        this.bombCapacity = 99;
    }

    componentDidMount() {
        this.resetGame();
    }

    resetGame() {
        this.stopTimer();
        this.resetTimer();

        this.generateNewGame();

        this.setState({
            bombsRemaining: this.bombCapacity,
            gameStatus: null
        })
    }

    generateNewGame() {
        console.debug('Generating new game');
        const blocks = Utilities.newGameBoard(this.rows, this.columns, this.bombCapacity);


        this.setState({
            blocks
        });
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.setState(state => {
                return {
                    timer: state.timer + 1
                };
            });
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval !== null) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    resetTimer() {
        this.setState({
            timer: 0
        });
    }

    blockClicked(rowIndex, colIndex, clickMode, event) {
        event.preventDefault();

        const blockMode = this.state.blocks[rowIndex][colIndex].mode;
        if (blockMode === 'visible' || this.state.gameStatus === 'win' || this.state.gameStatus === 'lose') {
            // return;
        }

        if (this.timerInterval === null) {
            this.startTimer();
        }

        const isFlagging = clickMode === 'flag';
        const blockValue = this.state.blocks[rowIndex][colIndex].value;
        let stopTimer = false;

        if (isFlagging && blockMode === 'flagged') {
            this.setState(state => {
                const copy = state.blocks.slice();
                copy[rowIndex][colIndex].mode = 'hidden';

                return {
                    blocks: copy,
                    bombsRemaining: state.bombsRemaining + 1
                };
            });
        } else if (isFlagging && blockMode === 'hidden') {
            this.setState(state => {
                const copy = state.blocks.slice();
                copy[rowIndex][colIndex].mode = 'flagged';

                return {
                    blocks: copy,
                    bombsRemaining: state.bombsRemaining - 1
                };
            });
        } else if (!isFlagging && blockValue === 'bomb') {
            this.setState(state => {
                const copy = state.blocks.slice();
                copy[rowIndex][colIndex].mode = 'exploded';

                return {
                    blocks: copy,
                    gameStatus: 'lose'
                };
            });
            stopTimer = true;
        } else if (!isFlagging && blockValue === 0) {
            // reveal surrounding blocks

        } else {
            this.setState(state => {
                const copy = state.blocks.slice();
                copy[rowIndex][colIndex].mode = 'visible';

                return {
                    blocks: copy,
                };
            });
        }


        if (stopTimer) {
            this.stopTimer();
        }
    }

    checkForWinCondition(blockGrid) {
        return blockGrid.flat().every(block => {
            return (block.mode === 'flagged' && block.value === 'bomb')
                || (block.mode === 'visible' && Number.isInteger(block.value));
        });
    }

    render() {
        return (
            <div className={"minesweeper-game"}>
                <Header onNewGameClick={()=> this.resetGame()}
                        timer={this.state.timer}
                        bombCount={this.state.bombsRemaining}
                        gameStatus={this.state.gameStatus} />
                <Grid rows={this.rows}
                      columns={this.columns}
                      blocks={this.state.blocks}
                      onBlockClick={this.blockClickedHandler}
                />
            </div>
        )
    }
}

export default Minesweeper;