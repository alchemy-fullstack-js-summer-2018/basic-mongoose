const chai = require('chai');
const { assert } = chai;
const Game = require('../../lib/models/game');

const getErrors = (validation, numberExpected) => {
    assert.isDefined(validation);
    const errors = validation.errors;
    assert.equal(Object.keys(errors).length, numberExpected);
    return errors;
};

describe('Game model', () => {

    it('Validates good model', () => {
        const data = {
            Name: 'Tekken 7',
            Origin: 'Japan',
            Console: ['PS4', 'Xbox'],
            Revenue: 1.6       
        };

        const game = new Game(data);
        const json = game.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(game.validateSync());
    });

    it('Validates required fields', () => {
        const game = new Game({});
        const validation = game.validateSync();
        assert.isDefined(validation);

        const errors = validation.errors;
        assert.equal(Object.keys(errors).length, 3);
        assert.equal(errors.Name.kind, 'required');
    });

    it('Revenue is at least $1 million', () => {
        const game = new Game({
            Name: ' Warframe',
            Origin: 'Canada',
            Console: ['PS4', 'PC'],
            Revenue: 2  
        });

        const errors = getErrors(game.validateSync(), 1);
        assert.equal(errors.Revenue.kind, 'min');
    });

    it('Revenue is at most $6 million', () => {
        const game = new Game({
            Name: ' Spyro',
            Origin: 'USA',
            Console: ['PS4', 'PC'],
            Revenue:  6 
        });

        const errors = getErrors(game.validateSync(), 1);
        assert.equal(errors.Revenue.kind, 'max');
    });

});