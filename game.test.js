const { expect } = require('chai');
const sinon = require('sinon')
const Board = require('./Board')
const gameSolver = require('./game')
const node = require('./node')
/*
_________________________
|red    |green  |green  |
|       |       |       |
|green  |red    |red    |
|       |       |       |
|green  |green  |yellow |
|_______|_______|_______|

*/
describe('The Popular Game', () => {

    var injectedBoard = [
        [
            { x: 0, y: 0, f: 1, color: 'red' },
            { x: 0, y: 1, f: 1, color: 'green' },
            { x: 0, y: 2, f: 1, color: 'green' }
        ],
        [
            { x: 1, y: 0, f: 1, color: 'green' },
            { x: 1, y: 1, f: 1, color: 'red' },
            { x: 1, y: 2, f: 1, color: 'red' }],
        [
            { x: 2, y: 0, f: 1, color: 'green' },
            { x: 2, y: 1, f: 1, color: 'green' },
            { x: 2, y: 2, f: 1, color: 'yellow' }
        ]
    ]
    
    //stub getNewBoard to return me the mocked board instance
    sinon.stub(Board.prototype, 'getNewBoard').callsFake(() => {
        return injectedBoard.map((row) => {
            return row.map((ele) => {
                const { x, y, color } = ele
                return new node(x, y, color)
            })
        });
    });

    describe('A node', () => {
        let mockedBoard
        beforeEach(() => {
            mockedBoard = new Board(undefined, 3, 3)
            mockedBoard.board = mockedBoard.getNewBoard();
        });

        it('should get the right neighbors', () => {
            expect(mockedBoard.board[1][2].getNeighbors(mockedBoard))
                .to.deep.include.members(
                    [
                        new node(0, 2, 'green'),
                        new node(2, 2, 'yellow'),
                        new node(1, 1, 'red')
                    ]);
        });
    });
    describe('The board', () => {
        let mockedBoard;
        beforeEach(() => {
            mockedBoard = new Board(undefined, 3, 3)
            mockedBoard.board = mockedBoard.getNewBoard();
        });

        it('should create new board', () => {
            expect(new Board(undefined, 3, 3).getNewBoard()[0].length)
                .to.be.equal(3)
        });

        it('should not be filled all with same color , ie: the goal of the game', () => {
            expect(mockedBoard.isGoalAttained())
                .to.be.equal(false)
        });

        it('should fill all connected node with the color', () => {
            mockedBoard.fillColors(mockedBoard.board[2][1], 'red')
            expect(mockedBoard.board[2][1].color).to.equal('red')
            expect(mockedBoard.board[2][0].color).to.equal('red')
            expect(mockedBoard.board[1][0].color).to.equal('red')
            expect(mockedBoard.board[1][1].color).to.equal('red')
        });


        it('should get the correct cost or score for a node', () => {
            expect(mockedBoard.connectedSameColorScore(mockedBoard.board[2][1]))
                .to.be.equal(3)
            expect(mockedBoard.connectedSameColorScore(mockedBoard.board[1][2]))
                .to.be.equal(2)
            expect(mockedBoard.connectedSameColorScore(mockedBoard.board[1][1]))
                .to.be.equal(2)
            expect(mockedBoard.connectedSameColorScore(mockedBoard.board[2][2]))
                .to.be.equal(1)
        });
    });

    describe('The Game Solver', () => {
        let mockedBoard;
        beforeEach(() => {
            mockedBoard = new Board(undefined, 3, 3)
            mockedBoard.board = mockedBoard.getNewBoard();
        });
        it('should solve the game and reach the goal ', () => {
            const { boardInstance,howManyMoves} = gameSolver(mockedBoard)

            expect(boardInstance.isGoalAttained())
                .to.be.equal(true)
            expect(howManyMoves).to.equal(3)
        });
    })


});
