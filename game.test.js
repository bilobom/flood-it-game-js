const { expect} = require('chai');
const Board = require('./Board')
const game = require('./game')




describe('The Popular Game',  ()=> {

    let mockedBoard = [ ['green', 'red', 'yellow', 'red', 'red', 'green'],
                        ['red', 'yellow', 'yellow', 'yellow', 'red', 'green'],
                        ['green', 'red', 'green', 'green', 'red', 'green'],
                        ['yellow', 'green', 'green', 'red', 'red', 'yellow'],
                        ['yellow', 'red', 'green', 'green', 'green', 'green'],
                        ['green', 'red', 'green', 'yellow', 'yellow', 'red']]

    describe('The board',  ()=> {
        it('should create new board with dimension 6', () => {
            expect(new Board().getNewBoard()[0].length)
            .to.be.equal(6)
        });

        it('shouldt be filled all , ie: the goal of the game', () => {
            expect(mockedBoard.isGoalAttained)
                .to.be.equal(false)
        });

        it('should fill the colors', () => {
            expect(mockedBoard.isGoalAttained)
                .to.be.equal(false)
        });//fillColors

    });
    describe('The Game', () => {
        it('gets adjacent colors of a tile', () => {
            let adjacents = game.getAdjacentColors({ x: 0, y: 0 }, mockedBoard);
            expect(adjacents[0].color).to.be.equal('red');
            expect(adjacents[1].color).to.be.equal('red');
        });

        it('most colors in adjacents ', () => {
            let mostColor = game.getMostColor(mockedBoard);
            expect(mostColor).to.be.equal('red');
        });
    })
    

});
