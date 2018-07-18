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
            Revenue: 1,
            Philosophical: false       
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
            Revenue: 0 
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

    it('Limits rating to good, great, perfect', () => {
        const game = new Game({
            Name: ' Splinter Cell',
            Origin: 'USA',
            Console: ['PS2', 'PC'],
            Revenue:  1,
            Rating: 'meh'
        });

        const errors = getErrors(game.validateSync(), 1);
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.Rating.kind, 'enum');
    });

    it('Deafults philosophical to true if not stated', () => {
        const game = new Game({
            Name: 'Bubsy',
            Origin: 'USA',
            Console: ['SNES', 'PC'],
            Revenue:  20,
            Rating: 'perfect'
        });

        assert.strictEqual(game.Philosophical, true);
    });    

});