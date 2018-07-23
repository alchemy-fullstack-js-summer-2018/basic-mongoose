const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Games API', () => {

    beforeEach(() => dropCollection('games'));

    let game;
    let game2;

    beforeEach(() => {
        const data = {
            Name: 'Warframe',
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

    beforeEach(() => {
        const data = {
            Name: 'Legend of Dragoon',
            Origin: {
                Country: 'Japan'
            },
            Console: ['PS1', 'PC'],
            Revenue: 2,
        };

        return request
            .post('/api/games')
            .send(data)
            .then(({ body }) => game2 = body);
    });

    it('Saves a game', () => {
        assert.isOk(game._id);
        assert.isOk(game2._id);
    });

    it('Gets a list of games', () => {
        return request
            .get('/api/games')
            .then(({ body }) => {
                console.log(body);
                assert.equal(body[0].Name, ['Warframe']);
                assert.equal(body[1].Name, ['Legend of Dragoon']);
            });
    });

    it('Gets a game by Id', () => {
        return request
            .get(`/api/games/${game._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, game);
            });
    });

    it('Updates a game by Id', () => {
        game.Revenue = 4;
        return request
            .put(`/api/games/${game._id}`)
            .send(game)
            .then(({ body }) => {
                assert.deepEqual(body, game);
            });
    });

    it('It deletes a game by Id', () => {
        return request 
            .delete(`/api/games/${game._id}`)
            .then(({ body }) => {
                assert.isTrue(body.removed);
            });
    });

    it('Returns removed: false on non-existent object', () => {
        return request
            .delete('/api/games/5b4f8bfe8990cdeff5998047')
            .then(({ body }) => {
                assert.isFalse(body.removed);
            });
    });

});