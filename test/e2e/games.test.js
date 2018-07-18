const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Games API', () => {

    beforeEach(() => dropCollection('games'));

    let game;

    beforeEach(() => {
        const data = {
            Name: 'Metal Gear Solid',
            Origin: {
                Country:'Japan',
            },
            Console: ['PS4', 'PC'],
            Revenue: 4,
            Philosophical: false       
        };

        return request
            .post('/api/games')
            .send(data)
            .then(({ body }) => body);
    });

    it('Saves a game', () => {
        assert.isOk(game._id);
    });

});