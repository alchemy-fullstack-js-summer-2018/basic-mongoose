/* unit test for model */
const chai = require('chai');
const { assert } = chai;
const Movie = require('../../lib/models/movie');

const getErrors = (validation, numberExpected) => {
    assert.isDefined(validation);
    const errors = validation.errors;
    assert.equal(Object.keys(errors).length, numberExpected);
    return errors;
};

describe('Movie model', () => {

    it('validates good model', () => {
        const data = {
            name: 'Spirited Away',
            director: 'Hayao Miyazaki',
            composer: 'Joe Hisashi',
            year: 2001,
            voices: {
                chihiro: 'Daveigh Chase',
                haku: 'Jason Marsden',
                yubaba: 'Suzanne'
            },
            runtime: 'just right',
            rating: 5,
            isPixar: true,
            languages: {
                1: 'English',
                2: 'Japanese'
            },
            keywords: ['Japan', 'Ghibli', 'Pixar', 'pig']
        };
        const movie = new Movie(data);

        const json = movie.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(movie.validateSync());
    });

    it('validates required fields', () => {
        const movie = new Movie({});
        const errors = getErrors(movie.validateSync(), 4);

        assert.equal(Object.keys(errors).length, 4);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.rating.kind, 'required');
        assert.equal(errors['languages.1'].kind, 'required');
        assert.equal(errors['languages.2'].kind, 'required');
    });

    it('has a min rating of 1', () => {
        const movie = new Movie({
            name: 'Tales of Earthsea',
            rating: 0,
            languages: {
                1: 'English',
                2: 'Japanese'
            }
        });
        const errors = getErrors(movie.validateSync(), 1);

        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.rating.kind, 'min');
    });

    it('restricts runtime to short, just right, or too long', () => {
        const movie = new Movie({
            name: 'Tale of Princess Kaguya',
            runtime: 'kinda long',
            rating: 3,
            languages: {
                1: 'English',
                2: 'Japanese'
            }
        });
        const errors = getErrors(movie.validateSync(), 1);

        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.runtime.kind, 'enum');
    });

});