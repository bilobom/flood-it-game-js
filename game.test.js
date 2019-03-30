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
    injectedBoard = injectedBoard.map((row)=>{
        return row.map((ele)=>{
            const {x,y,color}= ele
            return new node(x,y,color)
        })
    })
    //stub getNewBoard to return me the mocked board instance
        
    let mockedBoard;
    sinon.stub(Board.prototype, 'getNewBoard').callsFake(() =>{
        return injectedBoard;
    });
    describe('The board', () => {
        beforeEach(() => {
            mockedBoard  = new Board(undefined, 3, 3)
            mockedBoard.board = mockedBoard.getNewBoard();
        });
        it('should create new board', () => {
            //console.log(new Board(undefined, 3, 3).isGoalAttained())
            expect(new Board(undefined, 3, 3).getNewBoard()[0].length)
                .to.be.equal(3)
        });

        it('shouldt be filled all with same color , ie: the goal of the game', () => {
            expect(mockedBoard.isGoalAttained())
                .to.be.equal(false)
        });

        it('should fill all connected node with the color', () => {
            console.log('----',mockedBoard.fillColors(mockedBoard.board[1][1], 'green'))
            let boardAfterFilling = mockedBoard.fillColors(mockedBoard.board[1][1], 'green')
            console.log(boardAfterFilling)
            expect(boardAfterFilling)
                .to.be.equal('green')
        });


        it('should get the correct cost or score for a node', () => {
            expect(mockedBoard.connectedSameColorScore(mockedBoard.board[2][1]))
                .to.be.equal(3)
            expect(mockedBoard.connectedSameColorScore(mockedBoard.board[1][2]))
                .to.be.equal(2)
        });
    });
    describe('A node', () => {
        it('should get the right neighbors', () => {
            expect(mockedBoard.board[1][2].getNeighbors()[0])
                .to.deep.include({ x: 0, y: 2, f: 1, color: 'green' });
            expect(mockedBoard.board[1][2].getNeighbors()[2])
                .to.deep.include({ x: 2, y: 2, f: 1, color: 'yellow' });
        });
    });
    describe('The Game Solver', () => {
        it('should solve the game and reach the goal ', () => {
            expect(gameSolver(mockedBoard).isGoalAttained())
                .to.be.equal(true)
        });
    })


});
