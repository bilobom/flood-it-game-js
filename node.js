class NodeClass{
    constructor(x,y,color){
        this.x = x;
        this.y = y;
        this.f = 1;
        this.color=color;
        this.cameFrom = null;
        this.fBeenEvaluated=false;
        this.neighbors=[];
    }
    getNeighbors (boardInstance) {
        if (this.neighbors.length) return this.neighbors
        if (this.x > 0)
            this.neighbors.push(boardInstance.board[this.x - 1][this.y])
        if (this.x < boardInstance.cols - 1)
            this.neighbors.push(boardInstance.board[this.x + 1][this.y])
        if (this.y > 0)
            this.neighbors.push(boardInstance.board[this.x][this.y - 1])
        if (this.y < boardInstance.rows - 1)
            this.neighbors.push(boardInstance.board[this.x][this.y + 1])
        return this.neighbors
    }
}


module.exports= NodeClass;