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
});