const chai = require('chai');
const { assert } = chai;
const RhythmGame = require('../../lib/models/rhythm-game');

const getErrors = (validation, numberExpected) => {
    assert.isDefined(validation);
    const errors = validation.errors;
    assert.equal(Object.keys(errors).length, numberExpected);
    return errors;
};

describe('Rhythm game model', () => {
    
    it('validates good model', () => {
        const data = {
            name: 'Geometry Dash',
            platform: 'iOS, Android, Win, Mac',
            difficulty: 'hard',
            originCountry: { country: 'Sweden' },
            freeVersion: true,
            releaseYear: 2013,
            rating: 10
        };

        const game = new RhythmGame(data);

        const json = game.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(game.validateSync());
    });
});