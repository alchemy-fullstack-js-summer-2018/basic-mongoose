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
            rating: 5,
            isPixar: true,
            keywords: ['Japan', 'Ghibli', 'Pixar', 'pig']
        };
        const movie = new Movie(data);

        const json = movie.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(movie.validateSync());
    });

    it('', () => {
        
    })

});