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
            platform: ['iOS', 'Android', 'Win', 'Mac'],
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

    it('validates requires fields', () => {
        const game = new RhythmGame({});
        const errors = getErrors(game.validateSync(), 3);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.platform.kind, 'user defined');
        assert.equal(errors['originCountry.country'].kind, 'required');
    });

    it('rating is > 0', () => {
        const game = new RhythmGame({
            name: 'Piano Tiles 2',
            platform: ['Android', 'iOS'],
            originCountry: {
                city: 'Beijing',
                country: 'China'
            },
            rating: 0
        });
        const errors = getErrors(game.validateSync(), 1);
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.rating.kind, 'min');
    });

    it('rating is < 11', () => {
        const game = new RhythmGame({
            name: 'Dancing Line',
            platform: ['Android', 'iOS'],
            originCountry: {
                city: 'Beijing',
                country: 'China'
            },
            rating: 11
        });
        const errors = getErrors(game.validateSync(), 1);
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.rating.kind, 'max');
    });

    it('limits choice of difficulty to easy, normal or hard', () => {
        const game = new RhythmGame({
            name: 'Geometry Dash',
            platform: 'iOS, Android, Win, Mac',
            difficulty: 'Supa Urutora Hado',
            originCountry: { country: 'Sweden' },
            freeVersion: true,
            releaseYear: 2013,
            rating: 10
        });
        const errors = getErrors(game.validateSync(), 1);
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.difficulty.kind, 'enum');
    });

    it('default freeVersion to false left empty', () => {
        const game = new RhythmGame({
            name: 'Beat Stomper',
            platform: 'Android, iOS',
            originCountry: { country: 'Taiwan' },
            rating: 6
        });
        assert.strictEqual(game.freeVersion, false);
    });
    
});
