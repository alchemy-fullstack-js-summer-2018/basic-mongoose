const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Artists API', () => {

    beforeEach(() => dropCollection('artists'));

    let artist;

    beforeEach(() => {
        const data = {
            name: 'Weezer',
            genre: 'alt/pop rock',
            famousAlbums: ['The Blue Album', 'Pinkerton'],
            style: 'group',
            numAlbums: 10,
            stillActive: true
        };

        return request
            .post('/api/artists')
            .send(data)
            .then(({ body }) => artist = body);
    });

    it('saves an artist', () => {
        assert.isOk(artist._id);
    });

    it('gets all artists out of db', () => {
        return request
            .get('/api/artists')
            .then(({ body }) => {
                assert.deepEqual(body, [artist]);
            });
    });

    it('gets one artist out of db', () => {
        return request
            .get(`/api/artists/${artist._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, artist);
            });
    });
});