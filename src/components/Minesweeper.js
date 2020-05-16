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
            height: 16,
            timer: 0,
            timerInterval: null,
            width: 30,
        };
    }

    generateNewGame() {
        const blocks = [];
        for (let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                blocks.push({
                    x: j,
                    y: i,
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

    blockClicked() {
        console.log('Block clicked');
    }

    render() {
        return (
            <div className={"minesweeper-game"}>
                <Header onNewGameClick={()=> this.startTimer()} timer={this.state.timer} bombCount={this.state.bombCount}></Header>
                <Grid blocks={this.state.blocks} onBlockClick={this.blockClicked}/>
            </div>
        )
    }
}

export default Minesweeper;