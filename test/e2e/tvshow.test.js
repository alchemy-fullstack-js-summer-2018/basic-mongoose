const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Tv Show API', () => {

    beforeEach(() => dropCollection('tvshows'));

    let show;

    beforeEach(() => {
        const data = {
            name: 'Stranger Things',
            genre: 'Sci-Fi',
            characters: ['Dustin', 'Eleven', 'Hopper', 'Dart']
        };

        return request
            .post('/api/tvshows')
            .send(data)
            .then(({ body }) => show = body);
    });

    it('saves a company', () => {
        assert.isOk(show._id);
    });
});