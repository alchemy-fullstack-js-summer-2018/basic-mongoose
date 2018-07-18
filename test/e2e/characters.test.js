const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Companies API', () => {

    beforeEach(() => dropCollection('characters'));

    let character;

    beforeEach(() => {
        const data = {
            name: 'Brave Sir Robin',
            class: 'Paladin',

        };

        return request  
            .post('/api/characters')
            .send(data)
            .then(({ body }) => character = body);
    });

    it('saves a character', () => {
        assert.isOk(character._id);
    });
});