const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Farms API', () => {

    beforeEach(() => dropCollection('farms'));

    let farm;

    beforeEach(() => {
        const data = {
            name: 'Rising River Farm',
            address: { state: 'WA' },
            rating: 4,
            organic: true,
            products: ['vegetables', 'fruits', 'herbs'],
            size: 'medium' 
        };

        return request
            .post('/api/farms')
            .send(data)
            .then(({ body }) => farm = body);
    });

    it('saves a farm', () => {
        assert.isOk(farm._id);
    });

    it('gets a list of farms', () => {
        return request
            .get('/api/farms')
            .then(({ body }) => {
                assert.deepEqual(body, [farm]);
            });
    });

    
    it('gets a farm by id', () => {
        return request
            .get(`/api/farms/${farm._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, farm);
            });
    });

    it('returns 404 on bad farm id', () => {
        return request
            .get('/bad farm id')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('updates a farm by id', () => {
        farm.rating = 5;
        return request
            .put(`/api/farms/${farm._id}`)
            .send(farm)
            .then(({ body }) => {
                assert.deepEqual(body, farm);
            });

    });

});
