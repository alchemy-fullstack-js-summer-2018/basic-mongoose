const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('TV Shows API', () => {
    beforeEach(() => dropCollection('shows'));
    let westworldShow;
    let utopiaShow;
    let gameOfThronesShow;
    
    const westworld = {
        name: 'Westworld',
        firstAired: '2016',
        networkType: 'cable'
    };
    const utopia = {
        name: 'Utopia',
        firstAired: '2013',
        networkType: 'broadcast'
    };
    const gameOfThrones = {
        name: 'Game of Thrones',
        firstAired: '2011',
        networkType: 'cable'
    };

    beforeEach(() => {
        return request
            .post('/api/shows')
            .send(westworld)
            .then(({ body }) => westworldShow = body);
    });
    beforeEach(() => {
        return request
            .post('/api/shows')
            .send(utopia)
            .then(({ body }) => utopiaShow = body);
    });
    beforeEach(() => {
        return request
            .post('/api/shows')
            .send(gameOfThrones)
            .then(({ body }) => gameOfThronesShow = body);
    });

    it('saves a show', () => {
        assert.isOk(westworldShow._id);
    });

    it('gets all shows', () => {
        return request
            .get('/api/shows')
            .then(({ body }) => {
                assert.equal(body[0].name, westworldShow.name);
                assert.equal(body[1].name, utopiaShow.name);
                assert.equal(body[2].name, gameOfThronesShow.name);
                assert.equal(body[0].firstAired, westworldShow.firstAired);
                assert.equal(body[1].firstAired, utopiaShow.firstAired);
                assert.equal(body[2].firstAired, gameOfThronesShow.firstAired);
            });
    });

    it('gets a show by ID', () => {
        return request
            .get(`/api/shows/${utopiaShow._id}`)
            .then(({ body }) => {
                assert.deepEqual(body.firstAired, utopiaShow.firstAired);
            });
    });

    it('updates a show by ID', () => {
        utopiaShow.networkType = 'cable';
        return request
            .put(`/api/shows/${utopiaShow._id}`)
            .send(utopiaShow)
            .then(({ body }) => {
                assert.deepEqual(body.networkType, utopiaShow.networkType);
            });
    });

    it('removes a show by ID', () => {
        return request
            .del(`/api/shows/${westworldShow._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, { removed: true });
                return request.get('/api/shows');
            })
            .then(({ body }) => {
                assert.equal(body[0].name, utopiaShow.name);
                assert.equal(body[1].name, gameOfThronesShow.name);
                assert.equal(body[0].firstAired, utopiaShow.firstAired);
                assert.equal(body[1].firstAired, gameOfThronesShow.firstAired);
            });
    });

    it('returns false when attempting to remove non-existent show', () => {
        return request
            .del('/api/shows/5b4f8461ac58b3b0ad992dad')
            .then(({ body }) => {
                assert.deepEqual(body, { removed: false });
            });
    });

    it('sends a 404 error on bad path', () => {
        return request
            .get('/bad/path')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });
});