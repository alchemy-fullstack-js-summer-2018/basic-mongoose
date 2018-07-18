const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Artists API', () => {

    beforeEach(() => dropCollection('artists'));

    let weezer;

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
            .then(({ body }) => weezer = body);
    });

    it('returns 404 on a bad path', () => {
        return request
            .get('/api/nothere')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('saves an artist', () => {
        assert.isOk(weezer._id);
    });

    it('gets all artists out of db', () => {
        return request
            .get('/api/artists')
            .then(({ body }) => {
                assert.deepEqual(body, [weezer]);
            });
    });

    it('gets one artist out of db', () => {
        return request
            .get(`/api/artists/${weezer._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, weezer);
            });
    });

    it('updates and artist in the databse', () => {
        weezer.numAlbums = 6;
        return request
            .put(`/api/artists/${weezer._id}`)
            .send(weezer)
            .then(({ body }) => {
                assert.deepEqual(body, weezer);
            });
    });

    it('removes an item from the database', () => {
        return request
            .del(`/api/artists/${weezer._id}`)
            .then(({ body }) => {
                assert.strictEqual(body.removed, true);
            });
    });

    it('returns removed: false when the item doesnt exist', () => {
        return request
            .del('/api/artists/5b4f932cbbac922934298b5f')
            .then(({ body }) => {
                assert.strictEqual(body.removed, false);
            });
    });
});