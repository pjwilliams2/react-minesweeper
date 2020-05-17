import * as React from 'react';

import Header from "./Header";
import Grid from "./Grid";



class Minesweeper extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            blocks: [],
            bombCount: 99,
            gameStatus: null,
            height: 16,
            timer: 0,
            timerInterval: null,
            width: 30,
        };
    }

    componentDidMount() {
        this.resetGame();
    }

    resetGame() {
        if (this.state.timerInterval !== null) {
            clearInterval(this.state.timerInterval);
            this.setState({
                timerInterval: null
            });
        }

        this.generateNewGame();
    }

    generateNewGame() {
        console.debug('Generating new game');
        const blocks = [];
        for (let i = 0; i < this.height; i++) {
            blocks.push([]);
            for(let j = 0; j < this.width; j++) {
                blocks[i].push({
                    mode: 'visible',
                    value: j
                });
            }
        }

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

    blockClicked(block) {
        if (this.state.timerInterval === null) {
            this.startTimer();
        }

        if (block.value === 'bomb') {
            this.setState({
                gameStatus: 'lose'
            });
        }
    }

    render() {
        return (
            <div className={"minesweeper-game"}>
                <Header onNewGameClick={()=> this.resetGame()}
                        timer={this.state.timer}
                        bombCount={this.state.bombCount}
                        gameStatus={this.state.gameStatus} />
                <Grid height={this.state.height}
                      width={this.state.width}
                      blocks={this.state.blocks}
                      onBlockClick={this.blockClicked}
                />
            </div>
        )
    }
}

export default Minesweeper;