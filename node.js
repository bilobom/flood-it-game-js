const node = (x, y) => {
    this.x = x;
    this.y = y;
    this.f = 1;
    this.neighbors;
    this.color;
    this.cameFrom = null;
    this.neighbors;
    getNeighbors = (board) => {
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
module.exports= node;