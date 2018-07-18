/* unit test for model */
const chai = require('chai');
const { assert } = chai;
const Movie = require('../../lib/models/movie');

describe('Movie model', () => {

    it('validates good model', () => {
        const data = {
            name: 'Spirited Away',
            director: 'Hayao Miyazaki',
            composer: 'Joe Hisashi',
            year: 2001,
            characters: {}
        };
        const movie = new Movie(data);

        const json = movie.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(movie.validateSync());
    });

});