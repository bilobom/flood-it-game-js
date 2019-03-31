
let node = require('./node')
let Board = require('./Board')




const solveTheGame = (boardInstance) => {
    const start = boardInstance.board[0][0]
    let howManyMoves=0
    let closedSet = [];
    let openSet = [start]
    
    start.f = 1
    while (openSet.length > 0) {
        
        let winner = 0;
        openSet.map((node, i) => {
            if (node.f > openSet[winner].f) {
                winner = i;
            }
        })
        let current = openSet[winner]
        if (current.cameFrom){
            howManyMoves+=1;
            boardInstance.fillColors(current.cameFrom, current.color)
        }

        if (boardInstance.isGoalAttained()) {
            break;
        }
        openSet = openSet.filter((node) => current !== node)

        closedSet.push(current)

        current.getNeighbors(boardInstance)

        current.neighbors.map(neighbor => {

            if (!closedSet.includes(neighbor)) {
                neighbor.cameFrom = current;
                neighbor.fBeenEvaluated=true;
                let tentativeF = boardInstance.connectedSameColorScore(neighbor)

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
    return {
        boardInstance,
        howManyMoves
    };
}

module.exports = solveTheGame