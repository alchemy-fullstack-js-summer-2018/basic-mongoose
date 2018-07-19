const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Games API', () => {

    beforeEach(() => dropCollection('games'));

    let game;

    beforeEach(() => {
        const data = {
            Name: ' Warframe',
            Origin: {
                Country: 'Canada'
            },
            Console: ['PS4', 'PC'],
            Revenue: 1,
            Philosophical: false 
        };

        return request
            .post('/api/games')
            .send(data)
            .then(({ body }) => game = body);
    });

    it('Saves a game', () => {
        assert.isOk(game._id);
    });

    it('Gets a game by Id', () => {
        return request
            .get(`/api/games/${game._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, game);
            });
    });

    it('Updates a game', () => {
        game.Revenue = 4;
        return request
            .put(`/api/games/${game._id}`)
            .send(game)
            .then(({ body }) => {
                assert.deepEqual(body, game);
            });
    });

    it('It deletes a game', () => {
        return request 
            .delete(`/api/games/${game._id}`)
            .then(() => {
                return request.get('/api/games');
            })
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });

});