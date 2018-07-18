const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('TV Shows API', () => {
    beforeEach(() => dropCollection('shows'));
    let show;

    beforeEach(() => {
        const data = {
            name: 'Westworld',
            firstAired: '2016',
            networkType: 'cable'
        };

        return request
            .post('/api/shows')
            .send(data)
            .then(({ body }) => show = body);
    });

    it('saves a show', () => {
        assert.isOk(show._id);
    });
});