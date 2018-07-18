const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Companies API', () => {

    beforeEach(() => dropCollection('characters'));

    let character;

    beforeEach(() => {
        const data = {
            name: 'Brave Sir Robin',
            class: 'Fighter',
            race: 'Human',
            hp: 6,
            description: 'So NOT brave. Riding into battle, well actually away from battle, behind his green-and-white checkered chicken crest.'

        };

        return request  
            .post('/api/characters')
            .send(data)
            .then(({ body }) => character = body);
    });

    it('saves a character', () => {
        assert.isOk(character._id);
    });

    it('gets all characters', () => {
        return request
            .get('/api/characters')
            .then(({ body }) => {
                assert.deepEqual(body, [character]);
            });
    });

    it('gets one character by Id', () => {
        return request
            .get(`/api/characters/${character._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, character);
            });
    });

    it('deletes a character', () => {
        return request
            .del(`/api/characters/${character._id}`)
            .then(res => {
                assert.equal(res.status, 200);
            });
    });

});