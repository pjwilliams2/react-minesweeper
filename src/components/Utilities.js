const Utilities = {
    range: n => [...Array(n).keys()],

    newGameBoard: (rowLength, colLength, bombCount) => {
        const blockGrid = [];
        for (let i = 0; i < rowLength; i++) {
            blockGrid.push([]);
            for(let j = 0; j < colLength; j++) {
                blockGrid[i].push({
                    mode: 'hidden',
                    value: 0
                });
            }
        }

        // randomly add some bombs
        const arr = new Uint32Array(1)
        do {
            window.crypto.getRandomValues(arr);
            const row = arr[0] % rowLength;
            window.crypto.getRandomValues(arr);
            const col = arr[0] % colLength;

            if (blockGrid[row][col].value !== 'bomb') {
                blockGrid[row][col].value = 'bomb';
                bombCount--;
            }
        } while (bombCount > 0);

        const containsBomb = function (rowIndex, colIndex) {
            if (rowIndex < 0 || colIndex < 0 || rowIndex >= rowLength || colIndex >= colLength) {
                return false;
            }

            return blockGrid[rowIndex][colIndex].value === 'bomb';
        }

        // place numbers in grid
        blockGrid.forEach((blockRow, rowIndex) => {
            blockRow.forEach((block, colIndex) => {
                if (block.value === 'bomb') {
                    return;
                }

                block.value =
                    (containsBomb(rowIndex - 1, colIndex - 1) ? 1 : 0) +
                    (containsBomb(rowIndex - 1, colIndex) ? 1 : 0) +
                    (containsBomb(rowIndex - 1, colIndex + 1) ? 1 : 0) +
                    (containsBomb(rowIndex, colIndex - 1) ? 1 : 0) +
                    (containsBomb(rowIndex, colIndex + 1) ? 1 : 0) +
                    (containsBomb(rowIndex + 1, colIndex - 1) ? 1 : 0) +
                    (containsBomb(rowIndex + 1, colIndex) ? 1 : 0) +
                    (containsBomb(rowIndex + 1, colIndex + 1) ? 1 : 0);
            });
        });

        return blockGrid;
    },

    revealBlocks(rowIndex, colIndex, blockGrid, rowDir = 0, colDir = 0) {
        if (rowIndex < 0 || colIndex < 0 || rowIndex >= blockGrid.length || colIndex >= blockGrid[0].length) {
            return blockGrid;
        }

        const blockValue = blockGrid[rowIndex][colIndex].value;
        if (!Number.isInteger(blockValue) || blockGrid[rowIndex][colIndex].mode === 'visible') {
            return blockGrid;
        } else {
            blockGrid[rowIndex][colIndex].mode = 'visible';
        }

        if (blockValue !== 0) {
            return blockGrid;
        }

        //go left
        if (colDir <= 0) {
            blockGrid = this.revealBlocks(rowIndex, colIndex - 1, blockGrid, 0, -1);
        }

        //go right
        if (colDir >= 0) {
            blockGrid = this.revealBlocks(rowIndex, colIndex + 1, blockGrid, 0, 1);
        }

        //go up
        if (rowDir <= 0) {
            blockGrid = this.revealBlocks(rowIndex - 1, colIndex, blockGrid, -1, 0);
        }

        //go down
        if (rowDir >= 0) {
            blockGrid = this.revealBlocks(rowIndex + 1, colIndex, blockGrid, 1, 0);
        }

        //go up left
        if (colDir <= 0 && rowDir <= 0) {
            blockGrid = this.revealBlocks(rowIndex - 1, colIndex - 1, blockGrid, -1, -1);
        }

        //go up right
        if (colDir >= 0 && rowDir <= 0) {
            blockGrid = this.revealBlocks(rowIndex - 1, colIndex + 1, blockGrid, -1, 1);
        }

        //go down left
        if (colDir <= 0 && rowDir >= 0) {
            blockGrid = this.revealBlocks(rowIndex + 1, colIndex - 1, blockGrid, 1, -1);
        }

        //go down right
        if (colDir >= 0 && rowDir >= 0) {
            blockGrid = this.revealBlocks(rowIndex + 1, colIndex + 1, blockGrid, 1, 1);
        }

        return blockGrid;
    }
}

export default Utilities;