let node = require('./node');

class BoardClass {
    constructor(colors = ['green', 'yellow', 'red'], rows = 6, cols = 6) {
        this.colors = colors
        this.rows = rows;
        this.cols = cols;
        this.board;
    }
    getNewBoard() {
        this.board = Array(this.rows).fill().map(row => {
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
        //every item should have that color
        return this.board.every(row => {
            return row.every(node => node.color === arbitraryColor)
        })
    }
    fillColors(target, replColor) {
        if (target.color === replColor) return
        let targetColor = target.color
        target.color = replColor;
        target.getNeighbors(this);

        target.neighbors.map(neighbor => {
            if (neighbor.color !== targetColor) return

            this.fillColors(neighbor, replColor)
        })
    }
    connectedSameColorScore(node) {
        let score = 1;
        if (node.fBeenEvaluated ) {
            return 0
        }
        
        node.fBeenEvaluated = true;
        node.getNeighbors(this)
        node.neighbors.map(neighbor => {
            if (neighbor.color !== node.color) return
            score+= this.connectedSameColorScore(neighbor)
        })
        node.fBeenEvaluated = false;
        return score;
    }
}
module.exports = BoardClass