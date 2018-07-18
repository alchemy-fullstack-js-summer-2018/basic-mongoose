/* e2e testing */
const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./_db');

describe.only('Movies API', () => {

    beforeEach(() => dropCollection('movies'));

    let movie;

    beforeEach(() => {
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

        return request 
            .post('/api/movies')
            .send(data)
            .then(({ body }) => movie = body);
    });

    it('saves a movie', () => {
        assert.isOk(movie._id);
    });

    it('returns movie by id on GET', () => {
        return request  
            .get(`/api/movies/${movie._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, movie);
            });
    });

    
});