const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Teams API', () => {
    
    beforeEach(() => dropCollection('teams'));

    let team;

    beforeEach(() => {
        const data = {
            name: 'Team',
            location: { state: 'OR' },
            roster: 13    
        };

        return request
            .post('/api/teams')
            .send(data)
            .then(({ body }) => team = body);
    });

    it('saves a team', () => {
        assert.isOk(team._id);
    });
});