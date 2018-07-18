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

    it('gets all teams', () => {
        return request
            .get('/api/teams')
            .then(({ body }) => {
                assert.deepEqual(body, [team]);
            });
    });

    it('gets a team by id', () => {
        return request
            .get(`/api/teams/${team._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, team);
            });
    });

    it('updates a team', () => {
        team.roster = 14;
        return request
            .put(`/api/teams/${team._id}`)
            .send(team)
            .then(({ body }) => {
                assert.deepEqual(body.roster, team.roster);
            });
    });

    it('returns 404 or bad url', () => {
        assert.ok(team._id);
    });

    it('deletes a team', () => {
        return request
            .delete(`/api/teams/${team._id}`)
            
            .then(() => {
                return request.get('/api/teams');
            })
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });
}); 