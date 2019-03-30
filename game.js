
let node = require('./node')
let Board = require('./Board')




const solveTheGame = (board) => {
    const start = board[0][0]

    const closedSet = [];
    const openSet = [start]

    start.f = 1
    while (openSet.length > 0) {

        let winner = 0;
        openSet.map((node, i) => {
            if (node.f > openSet[winner].f) {
                winner = i;
            }
        })
        let current = openSet[winner]

        board.fillColors(current.cameFrom, current.color)

        if (board.isGoalAttained) {
            break;
        }
        openSet = openSet.filter((node) => current !== node)

        closedSet.push(current)

        current.getNeighbors(board)

        current.neighbors.map(neighbor => {

            if (!closedSet.includes(neighbor)) {
                neighbor.cameFrom = current;
                neighbor.fBeenEvaluated=true;
                let tentativeF = board.connectedSameColorScore(neighbor)

                if (openSet.includes(neighbor)) {
                    if (tentativeF <= neighbor.f) {
                        neighbor.f = tentativeF
                    }
                } else {
                    neighbor.f = tentativeF
                    openSet.push(neighbor)
                }
            }

        })
    }
    return board;
}

module.exports = solveTheGame