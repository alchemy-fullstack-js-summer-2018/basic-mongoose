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
    })

    it('saves a farm', () => {
        assert.isOk(farm._id);
    })
})
