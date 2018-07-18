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

});