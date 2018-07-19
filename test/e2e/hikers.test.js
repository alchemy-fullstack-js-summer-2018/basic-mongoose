const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Hikers API', () => {

    beforeEach(() => dropCollection('hikers'));

    let hiker;

    beforeEach(() => {
        const data = {
            trailName: 'Boomer',
            longTrail: 'PCT',
            milesHiked: 2650,
            tripleCrown: false,
            gear: {
                backpack:{
                    brand: 'Klimt',
                    hipbelt: true
                }, 
                shoes: 'Altra',
                baseWeight: 10 
            },       
        };

        return request
            .post('/api/hikers')
            .send(data)
            .then(({ body }) => hiker = body);
    });

    it('saves a hiker', () => {
        assert.isOk(hiker._id);
    });
});