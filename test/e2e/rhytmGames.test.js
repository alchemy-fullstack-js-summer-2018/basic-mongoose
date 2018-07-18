const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('rhythm_games API', () => {

    beforeEach(() => dropCollection('rhythm_games'));
 
    function save(game) {
        return request
            .post('/api/rhythm_games')
            .send(game)
            .then(({ body }) => game = body);
    }
    
    let geometryDash;
    let pianoTiles2;
    let games = [];

    beforeEach(() => {
        return save({
            name: 'Geometry Dash',
            platform: ['iOS', 'Android', 'Win', 'Mac'],
            difficulty: 'hard',
            originCountry: { country: 'Sweden' },
            freeVersion: true,
            releaseYear: 2013,
            rating: 10
        })
            .then(data => {
                geometryDash = data;
                games[0] = geometryDash;
            });
    });

    beforeEach(() => {
        return save({
            name: 'Piano Tiles 2',
            platform: ['iOS', 'Android'],
            difficulty: 'normal',
            originCountry: {
                city: 'Beijing',
                country: 'China'
            },
            freeVersion: true,
            releaseYear: 2015,
            rating: 8
        })
            .then(data => {
                pianoTiles2 = data;
                games[1] = pianoTiles2;
            });
    });

    it('saves a game', () => {
        assert.isOk(geometryDash._id);
    });

    it('returns 404 on bad url, courtesy of express.js', () => {
        return request
            .get('/no-rhythm')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('gets a game by id', () => {
        return request
            .get(`/api/rhythm_games/${geometryDash._id}`)
            .then(res => {
                assert.deepEqual(res.body, geometryDash);
            });
    });

    it('gets all the games', () => {
        return request
            .get('/api/rhythm_games')
            .then(res => {
                assert.deepEqual(res.body, games);
            });
    });

    it('updates a game', () => {
        pianoTiles2.difficulty = 'easy';
        return request
            .put(`/api/rhythm_games/${pianoTiles2._id}`)
            .send(pianoTiles2)
            .then(({ body }) => {
                assert.equal(body.difficulty, 'easy');
            });
    });

    it('deletes one game', () => {
        return request
            .delete(`/api/rhythm_games/${pianoTiles2._id}`)
            .then(res => {
                assert.isTrue(res.body.removed);
            });
    });

    it('returns removed: false on bad id', () => {
        return request
            .delete('/api/rhythm_games/5b4f7a85a1499652c71fc405')
            .then(res => {
                assert.isFalse(res.body.removed);
            });
    });

});