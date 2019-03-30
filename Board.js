let node = require('./node');

class BoardClass {
    constructor(colors = ['green', 'yellow', 'red'], rows = 6, cols = 6) {
        this.colors = colors
        this.rows = rows;
        this.cols = cols;
        this.board
    }
    getNewBoard() {
        this.board = Array(this.rows).fill().map(row=>{
            return Array(this.cols).fill()
        });
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                newBoard[i][j] = new node(i, j, this.colors[Math.floor(Math.random() * this.colors.length)])
            }

        }
        return this.board;
    }
    isGoalAttained() {
        //console.log(this.board)
        let arbitraryColor = this.board[0][0].color
        //every color should be the same
        return this.board.every(row => {
            return row.every(node => node.color === arbitraryColor)
        })
    }
    fillColors(target, replColor) {
        if (target.color === replColor
            ) return

        target.color = replColor;

        target.getNeighbors(this.board);
        target.neighbors.map(neighbor => {
            if (neighbor.color !== target.color) return
            this.fillColors(neighbor, replColor)
        })
        console.log('-------------------------finished')
        return this.board
    }
    connectedSameColorScore(node) {
        if (node.color !== node.color || !node.fBeenEvaluated) {
            return
        }
        node.fBeenEvaluated = true;
        node.f += 1;
        node.getNeighbors(this.board)
        node.neighbors.map(neighbor => {
            this.connectedSameColorScore(neighbor)
        })
        return node.f
    }
}
module.exports = BoardClass