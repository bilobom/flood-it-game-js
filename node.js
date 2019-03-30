class NodeClass{
    constructor(x,y,color){
        this.x = x;
        this.y = y;
        this.f = 1;
        this.color=color;
        this.cameFrom = null;
        this.neighbors=[];
    }
    getNeighbors (board) {
        if (this.x > 0)
            this.neighbors.push(board[this.x - 1][this.y])
        if (this.x < board.col - 1)
            this.neighbors.push(board[this.x + 1][this.y])
        if (this.y > 0)
            this.neighbors.push(board[this.x][this.y - 1])
        if (this.y < board.row - 1)
            this.neighbors.push(board[this.x][this.y + 1])
        return this.neighbors
    }
}


module.exports= NodeClass;