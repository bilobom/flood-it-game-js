let node = require('./node');

class BoardClass {
    constructor(colors = ['green', 'yellow', 'red'], rows = 6, cols = 6) {
        this.colors = colors
        this.rows = rows;
        this.cols = cols;
    }
    getNewBoard() {
        let newBoard = [];
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                newBoard[i][j] = new node(i, j)
                newBoard[i][j].color = this.colors[Math.floor(Math.random() * this.colors.length)]
            }

        }
    }
    isGoalAttained = () => {
        let arbitraryColor = this.board[0][5].color
        this.board.every(row => {
            return row.every(node => node.color === arbitraryColor)
        })
    }
    fillColors = (target, replColor) => {
        if (target.color === replColor
            || !target.cameFrom) return
        target.getNeighbors(this.board);
        target.neighbors.map(neighbor=>{
            if(neighbor.color !== target.color)
            fillColors(target.cameFrom, target.color)
        })
        target.color = replColor;
        
    }
    connectedSameColorScore = (node) => {
        node.getNeighbors(this.board)
        node.neighbors.map(neighbor => {
            if (neighbor.color !== node.color || !neighbor.fBeenEvaluated) {
                return
            }
            node.fBeenEvaluated = true;
            node.f += 1;
            connectedSameColorScore(neighbor)
        })
        return node.f
    }
}
module.exports = BoardClass