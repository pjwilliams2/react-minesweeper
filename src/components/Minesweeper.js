import * as React from 'react';

import Header from "./Header";
import Grid from "./Grid";
import HighScores from "./HighScores";
import Utilities from "./Utilities";

class Minesweeper extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            blocks: [],
            bombsRemaining: 99,
            gameStatus: null,
            mostRecentScore: null,
            scores: [],
            timer: 0,
        };

        this.blockClickedHandler = this.blockClicked.bind(this);
        this.timerInterval = null;
        this.rows = 16;
        this.columns = 30;
        this.bombCapacity = 99;
        this.startTime = null;
        this.endTime = null;
    }

    componentDidMount() {
        this.resetGame();
        this.loadHighScores();
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

    loadHighScores() {
        this.setState({
            scores: JSON.parse(window.localStorage.getItem('highScores')) ?? []
        })
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
            return;
        }

        if (this.timerInterval === null) {
            this.startTimer();
            this.startTime = new Date();
        }

        const isFlagging = clickMode === 'flag';
        const blockValue = this.state.blocks[rowIndex][colIndex].value;
        let stopTimer = false;
        let changes = {};
        let checkForWin = false;

        if (isFlagging && blockMode === 'flagged') {
            const copy = this.state.blocks.slice();
            copy[rowIndex][colIndex].mode = 'hidden';

            changes = {
                blocks: copy,
                bombsRemaining: this.state.bombsRemaining + 1
            };
        } else if (isFlagging && blockMode === 'hidden') {
            const copy = this.state.blocks.slice();
            copy[rowIndex][colIndex].mode = 'flagged';

            changes = {
                blocks: copy,
                bombsRemaining: this.state.bombsRemaining - 1
            };
            checkForWin = true;
        } else if (!isFlagging && blockValue === 'bomb') {
            const copy = this.state.blocks.slice();
            copy[rowIndex][colIndex].mode = 'exploded';

            changes = {
                blocks: copy,
                gameStatus: 'lose'
            };
            stopTimer = true;
        } else {
            changes = {
                blocks: Utilities.revealBlocks(rowIndex, colIndex, this.state.blocks.slice())
            }
            checkForWin = true;
        }

        if (checkForWin) {
            if (this.didPlayerWin(changes.blocks)) {
                changes.gameStatus = 'win';
                stopTimer = true;
                this.endTime = new Date();
                const score = this.endTime.valueOf() - this.startTime.valueOf();
                changes.mostRecentScore = score;
                this.addAndStoreNewScore(score);
            }
        }

        this.setState(changes);

        if (stopTimer) {
            this.stopTimer();
        }
    }

    didPlayerWin(blockGrid) {
        return blockGrid.flat().every(block => {
            return (block.mode === 'visible' && Number.isInteger(block.value))
                || (block.value === 'bomb');
        });
    }

    addAndStoreNewScore(score) {
        let scores = this.state.scores.slice();
        scores.push(score);
        scores.sort((a, b) => a - b);
        scores = scores.slice(0, 100);

        this.setState({
            scores
        });
        window.localStorage.setItem('highScores', JSON.stringify(scores));
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
                <HighScores scores={this.state.scores} mostRecent={this.state.mostRecentScore} />
            </div>
        )
    }
}

export default Minesweeper;